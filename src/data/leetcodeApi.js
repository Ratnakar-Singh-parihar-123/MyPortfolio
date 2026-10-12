import { LEETCODE_API_BASE, LEETCODE_FALLBACK_BASE } from "../config/leetcode";

/**
 * Normalize anything a user types into a bare username.
 */
export function extractUsername(input) {
  if (!input) return "";
  let s = String(input).trim().replace(/\/+$/, "").replace(/^@/, "");

  try {
    if (/^https?:\/\//i.test(s)) {
      const u = new URL(s);
      const parts = u.pathname.split("/").filter(Boolean);
      return parts[parts.length - 1] || "";
    }
  } catch {
    /* ignore */
  }

  const m = s.match(/leetcode\.com\/(?:u\/)?([^/?#]+)/i);
  if (m) return m[1];
  return s;
}

export function isValidUsername(username) {
  return /^[a-zA-Z0-9_-]{1,30}$/.test(username);
}

/* =========================================================
   fetch helpers
========================================================= */

async function fetchJSON(url, signal) {
  // cache-bust: append a unique param so no CDN / browser cache
  const bust = `${url.includes("?") ? "&" : "?"}_t=${Date.now()}`;
  const res = await fetch(`${url}${bust}`, {
    signal,
    cache: "no-store",
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    const err = new Error(`Request failed (${res.status})`);
    err.status = res.status;
    throw err;
  }

  const data = await res.json();

  if (data && typeof data === "object" && Array.isArray(data.errors)) {
    const err = new Error(data.errors[0]?.message || "Unavailable");
    err.status = 404;
    throw err;
  }

  return data;
}

/* =========================================================
   NORMALIZERS — convert tashif API → shape the UI expects
========================================================= */

const pickSolved = (acSubmissionNum, difficulty) =>
  acSubmissionNum?.find((x) => x.difficulty === difficulty)?.count ?? 0;

function normalizeTashif({ stats, profileResp, contests }) {
  const p = profileResp?.profile || {};
  const d = profileResp?.data || {};
  const acNum = profileResp?.submitStats?.acSubmissionNum || [];

  // merge profile + stats into a single "profile" object
  const profile = {
    // identity
    username: profileResp?.username || d.username || "",
    name: p.realName || d.displayName || "",
    avatar: p.userAvatar || d.avatar || "",
    about: p.aboutMe || d.bio || "",
    country: p.countryName || d.country || "",
    company: p.company || d.company || "",
    school: p.school || d.institution || "",
    ranking: p.ranking ?? stats?.ranking ?? null,
    reputation: p.reputation ?? stats?.reputation ?? 0,

    // solved counts (prefer stats for totals; fall back to profile stats)
    totalSolved: stats?.totalSolved ?? pickSolved(acNum, "All"),
    easySolved: stats?.easySolved ?? pickSolved(acNum, "Easy"),
    mediumSolved: stats?.mediumSolved ?? pickSolved(acNum, "Medium"),
    hardSolved: stats?.hardSolved ?? pickSolved(acNum, "Hard"),
    totalEasy: stats?.totalEasy ?? 0,
    totalMedium: stats?.totalMedium ?? 0,
    totalHard: stats?.totalHard ?? 0,
    totalQuestions: stats?.totalQuestions ?? 0,

    // misc
    contributionPoint:
      profileResp?.contributions?.points ?? stats?.contributionPoints ?? 0,
    acceptanceRate: stats?.acceptanceRate ?? null,
    submissionCalendar:
      profileResp?.submissionCalendar || stats?.submissionCalendar || {},
    badges: profileResp?.badges || [],
    activeBadge: profileResp?.activeBadge || null,
    githubUrl: profileResp?.githubUrl || "",
    linkedinUrl: profileResp?.linkedinUrl || "",
    websites: p.websites || d.websites || [],
  };

  // contest — tashif returns "status":"error" when user has no contest history
  const contest =
    contests && contests.status !== "error"
      ? {
          contestRating: contests.rating || 0,
          contestGlobalRanking: contests.globalRanking || 0,
          contestAttend: contests.attendedContestsCount || 0,
          contestTopPercentage: contests.topPercentage || 0,
          contestBadges: contests.badge || null,
          contestHistory: contests.contestHistory || [],
        }
      : null;

  // heatmap: tashif puts it under profile.submissionCalendar, but if profile
  // didn't have it, fall back to stats (base endpoint also returns it)
  const heatmap =
    profile.submissionCalendar && Object.keys(profile.submissionCalendar).length
      ? profile.submissionCalendar
      : stats?.submissionCalendar || {};

  return {
    profile,
    contest,
    heatmap,
    recentSubmissions: profileResp?.recentSubmissions || [],
    activeYears: [],
    source: "tashif",
  };
}

/* =========================================================
   PRIMARY fetch — tashif API (live, no cache)
========================================================= */

async function fetchFromTashif(username, signal) {
  const u = encodeURIComponent(username);

  const [stats, profileResp, contests] = await Promise.allSettled([
    fetchJSON(`${LEETCODE_API_BASE}/${u}`, signal),
    fetchJSON(`${LEETCODE_API_BASE}/${u}/profile`, signal),
    fetchJSON(`${LEETCODE_API_BASE}/${u}/contests`, signal),
  ]);

  if (profileResp.status === "rejected" && stats.status === "rejected") {
    throw profileResp.reason || stats.reason;
  }

  const payload = {
    stats: stats.status === "fulfilled" ? stats.value : null,
    profileResp: profileResp.status === "fulfilled" ? profileResp.value : null,
    contests: contests.status === "fulfilled" ? contests.value : null,
  };

  // If the API says "user not found", tashif returns {status:"error"} on the
  // base endpoint too — detect that so we can show a proper 404.
  if (payload.stats?.status === "error" && !payload.profileResp?.profile) {
    const err = new Error(payload.stats.message || "User not found");
    err.status = 404;
    throw err;
  }

  return normalizeTashif(payload);
}

/* =========================================================
   FALLBACK fetch — alfa API (may be cached, but works)
   Merges the /:username + /:username/profile endpoints so we
   get avatar/name as well as stats.
========================================================= */

async function fetchFromAlfa(username, signal) {
  const u = encodeURIComponent(username);

  const [userInfo, stats, contest, calendar] = await Promise.allSettled([
    fetchJSON(`${LEETCODE_FALLBACK_BASE}/${u}`, signal),
    fetchJSON(`${LEETCODE_FALLBACK_BASE}/${u}/profile`, signal),
    fetchJSON(`${LEETCODE_FALLBACK_BASE}/${u}/contest`, signal),
    fetchJSON(`${LEETCODE_FALLBACK_BASE}/${u}/calendar`, signal),
  ]);

  if (stats.status === "rejected") throw stats.reason;

  const info = userInfo.status === "fulfilled" ? userInfo.value : {};
  const s = stats.value || {};
  const c = contest.status === "fulfilled" ? contest.value : null;
  const cal = calendar.status === "fulfilled" ? calendar.value : null;

  let heatmap = {};
  if (cal?.submissionCalendar) {
    try {
      heatmap = JSON.parse(cal.submissionCalendar);
    } catch {
      heatmap = {};
    }
  }

  const profile = {
    username: info.username || s.username || username,
    name: info.name || "",
    avatar: info.avatar || "",
    about: info.about || "",
    country: info.country || "",
    company: info.company || "",
    school: info.school || "",
    ranking: info.ranking ?? s.ranking ?? null,
    reputation: info.reputation ?? s.reputation ?? 0,

    totalSolved: s.totalSolved ?? 0,
    easySolved: s.easySolved ?? 0,
    mediumSolved: s.mediumSolved ?? 0,
    hardSolved: s.hardSolved ?? 0,
    totalEasy: s.totalEasy ?? 0,
    totalMedium: s.totalMedium ?? 0,
    totalHard: s.totalHard ?? 0,
    totalQuestions: s.totalQuestions ?? 0,

    contributionPoint: s.contributionPoint ?? 0,
    submissionCalendar: heatmap,
    badges: [],
    activeBadge: null,
    githubUrl: info.gitHub || "",
    linkedinUrl: info.linkedIN || "",
    websites: info.websites || [],
  };

  return {
    profile,
    contest: c,
    heatmap,
    recentSubmissions: s.recentSubmissions || [],
    activeYears: cal?.activeYears || [],
    source: "alfa",
  };
}

/* =========================================================
   PUBLIC — try tashif first, fall back to alfa
========================================================= */

export async function fetchLeetCodeProfile(username, signal) {
  try {
    return await fetchFromTashif(username, signal);
  } catch (primaryErr) {
    if (primaryErr?.name === "AbortError") throw primaryErr;

    // Only fall back on network / server errors, not on 404
    if (primaryErr?.status === 404) throw primaryErr;

    try {
      return await fetchFromAlfa(username, signal);
    } catch (fallbackErr) {
      // If fallback also failed, surface whichever error is more useful
      throw fallbackErr?.status === 404 ? fallbackErr : primaryErr;
    }
  }
}

/* =========================================================
   formatters
========================================================= */

export const fmt = (n) => {
  if (n === null || n === undefined || n === "") return "—";
  const num = Number(n);
  if (Number.isNaN(num)) return String(n);
  if (num >= 1_000_000)
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return num.toLocaleString();
};

export const pct = (solved, total) =>
  !total || total <= 0 ? 0 : Math.min(100, Math.round((solved / total) * 100));
