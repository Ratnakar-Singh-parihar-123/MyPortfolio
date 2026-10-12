import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Search,
  X,
  UserRound,
  Trophy,
  Target,
  Flame,
  ExternalLink,
  Award,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Loader2,
  RefreshCw,
  CalendarDays,
  BarChart3,
  Code2,
  Crown,
  Zap,
  RotateCcw,
  Clock3,
  Activity,
  ArrowUpRight,
} from "lucide-react";

import { LEETCODE_USERNAME, LEETCODE_API_BASE } from "../../../config/leetcode";
import {
  fetchLeetCodeProfile,
  extractUsername,
  isValidUsername,
  fmt,
  pct,
} from "../../../data/leetcodeApi";

/* =========================================================
   Helpers
========================================================= */

const cn = (...classes) => classes.filter(Boolean).join(" ");

const getCount = (value) => {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
};

const formatDate = (timestamp) => {
  if (!timestamp) return "Date unavailable";

  const n = Number(timestamp);
  const date = new Date(n < 1e12 ? n * 1000 : n);

  if (Number.isNaN(date.getTime())) return "Date unavailable";

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const normalizeCalendar = (data) => {
  if (!data) return {};

  if (typeof data === "string") {
    try {
      return normalizeCalendar(JSON.parse(data));
    } catch {
      return {};
    }
  }

  if (typeof data === "object" && !Array.isArray(data)) {
    if (data.submissionCalendar) {
      return normalizeCalendar(data.submissionCalendar);
    }

    return data;
  }

  return {};
};

const getLanguageColor = (language = "") => {
  const lang = language.toLowerCase();

  if (lang.includes("java")) return "text-orange-500 bg-orange-500/10";
  if (lang.includes("python")) return "text-blue-500 bg-blue-500/10";
  if (lang.includes("javascript")) return "text-yellow-600 bg-yellow-500/10";
  if (lang.includes("typescript")) return "text-sky-500 bg-sky-500/10";
  if (lang.includes("cpp") || lang.includes("c++"))
    return "text-violet-500 bg-violet-500/10";

  return "text-indigo-500 bg-indigo-500/10";
};

/* =========================================================
   Shared UI
========================================================= */

const Card = ({ children, className = "" }) => (
  <section
    className={cn(
      "min-w-0 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm shadow-slate-900/[0.02]",
      "dark:border-slate-800/80 dark:bg-slate-950/60 sm:p-5",
      className,
    )}
  >
    {children}
  </section>
);

const SectionHeader = ({
  icon: Icon,
  title,
  subtitle,
  accent = "indigo",
  right,
}) => {
  const accents = {
    indigo: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-300",
    violet: "bg-violet-500/10 text-violet-600 dark:text-violet-300",
    amber: "bg-amber-500/10 text-amber-600 dark:text-amber-300",
    emerald: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-300",
    cyan: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-300",
  };

  return (
    <div className="flex items-center gap-3 mb-5">
      <span
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
          accents[accent],
        )}
      >
        <Icon size={18} />
      </span>

      <div className="flex-1 min-w-0">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-0.5 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
            {subtitle}
          </p>
        )}
      </div>

      {right}
    </div>
  );
};

const ProgressBar = ({ value, color = "bg-indigo-500" }) => (
  <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
    <div
      className={cn("h-full rounded-full transition-all duration-700", color)}
      style={{ width: `${Math.min(100, Math.max(0, getCount(value)))}%` }}
    />
  </div>
);

const Skeleton = () => (
  <div className="space-y-5" aria-label="Loading LeetCode profile">
    <div className="h-44 animate-pulse rounded-2xl bg-slate-200/70 dark:bg-slate-800/70" />

    <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="h-32 animate-pulse rounded-2xl bg-slate-200/70 dark:bg-slate-800/70"
        />
      ))}
    </div>

    <div className="grid gap-5 xl:grid-cols-2">
      <div className="h-64 animate-pulse rounded-2xl bg-slate-200/70 dark:bg-slate-800/70" />
      <div className="h-64 animate-pulse rounded-2xl bg-slate-200/70 dark:bg-slate-800/70" />
    </div>
  </div>
);

/* =========================================================
   Solved statistics
========================================================= */

const DifficultyCard = ({ label, solved, total, color, trackColor }) => {
  const progress = total > 0 ? Math.min(100, (solved / total) * 100) : 0;

  return (
    <div className="rounded-xl border border-slate-200/70 bg-slate-50/70 p-3.5 dark:border-slate-800/70 dark:bg-slate-900/40 sm:p-4">
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className={cn("text-xs font-bold", color)}>{label}</span>
        <span className="text-[11px] text-slate-500 dark:text-slate-400">
          {progress.toFixed(1)}%
        </span>
      </div>

      <div className="flex items-baseline gap-1.5">
        <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          {fmt(solved)}
        </span>
        <span className="text-xs text-slate-400">/ {fmt(total)}</span>
      </div>

      <div className="mt-3">
        <ProgressBar value={progress} color={trackColor} />
      </div>
    </div>
  );
};

const DifficultySection = ({ profile }) => (
  <Card>
    <SectionHeader
      icon={BarChart3}
      title="Problem Solving"
      subtitle="Your solved problems by difficulty"
      accent="amber"
    />

    <div className="mb-5 flex items-center gap-4 rounded-xl bg-indigo-500/[0.06] p-4 dark:bg-indigo-400/[0.06]">
      <div className="flex items-center justify-center w-12 h-12 text-indigo-500 shrink-0 rounded-xl bg-indigo-500/10 dark:text-indigo-300">
        <Target size={23} />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
          Total problems solved
        </p>
        <p className="mt-0.5 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {fmt(profile.totalSolved)}
        </p>
      </div>

      <div className="text-right">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Total questions
        </p>
        <p className="mt-1 text-sm font-bold text-slate-800 dark:text-slate-200">
          {fmt(profile.totalQuestions)}
        </p>
      </div>
    </div>

    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      <DifficultyCard
        label="Easy"
        solved={profile.easySolved}
        total={profile.totalEasy}
        color="text-emerald-500"
        trackColor="bg-emerald-500"
      />

      <DifficultyCard
        label="Medium"
        solved={profile.mediumSolved}
        total={profile.totalMedium}
        color="text-amber-500"
        trackColor="bg-amber-500"
      />

      <DifficultyCard
        label="Hard"
        solved={profile.hardSolved}
        total={profile.totalHard}
        color="text-rose-500"
        trackColor="bg-rose-500"
      />
    </div>
  </Card>
);

/* =========================================================
   Submission heatmap
========================================================= */

const Heatmap = ({ calendar }) => {
  const { cells, total, activeDays, maxCount } = useMemo(() => {
    const map = normalizeCalendar(calendar);
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const start = new Date(today);
    start.setDate(start.getDate() - 363);
    start.setDate(start.getDate() - start.getDay());

    const result = [];
    let sum = 0;
    let days = 0;
    let max = 0;

    for (let i = 0; i < 364; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);

      const key = String(Math.floor(date.getTime() / 1000));
      const count = getCount(map[key]);

      result.push({ date, count });
      sum += count;

      if (count > 0) days += 1;
      max = Math.max(max, count);
    }

    return {
      cells: result,
      total: sum,
      activeDays: days,
      maxCount: max,
    };
  }, [calendar]);

  const levelClass = (count) => {
    if (!count) return "bg-slate-100 dark:bg-slate-800/80";

    const ratio = count / Math.max(1, maxCount);

    if (ratio > 0.75) return "bg-emerald-600";
    if (ratio > 0.5) return "bg-emerald-500/80";
    if (ratio > 0.25) return "bg-emerald-500/55";

    return "bg-emerald-500/30";
  };

  return (
    <Card>
      <SectionHeader
        icon={CalendarDays}
        title="Submission Activity"
        subtitle="Daily activity over the last 12 months"
        accent="emerald"
      />

      <div className="grid grid-cols-2 gap-3 mb-5 sm:grid-cols-3">
        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Submissions
          </p>
          <p className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
            {fmt(total)}
          </p>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Active days
          </p>
          <p className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
            {fmt(activeDays)}
          </p>
        </div>

        <div className="col-span-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 sm:col-span-1">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Most active day
          </p>
          <p className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
            {fmt(maxCount)}
          </p>
        </div>
      </div>

      <div className="pb-2 overflow-x-auto">
        <div
          className="grid w-max gap-[3px]"
          style={{
            gridAutoFlow: "column",
            gridTemplateRows: "repeat(7, 12px)",
          }}
        >
          {cells.map((cell, index) => (
            <div
              key={index}
              title={`${cell.date.toLocaleDateString("en-IN")}: ${cell.count} submission(s)`}
              className={cn(
                "h-3 w-3 rounded-[3px] transition-colors",
                levelClass(cell.count),
              )}
            />
          ))}
        </div>
      </div>

      <div className="mt-3 flex items-center gap-1.5 text-[10px] text-slate-500 dark:text-slate-400">
        <span>Less</span>
        {[0, 1, 2, 3].map((level) => (
          <span
            key={level}
            className={cn(
              "h-3 w-3 rounded-[3px]",
              level === 0
                ? "bg-slate-100 dark:bg-slate-800"
                : level === 1
                  ? "bg-emerald-500/30"
                  : level === 2
                    ? "bg-emerald-500/55"
                    : "bg-emerald-600",
            )}
          />
        ))}
        <span>More</span>
      </div>
    </Card>
  );
};

/* =========================================================
   Recent submissions
========================================================= */

const RecentSubmissions = ({ submissions, username }) => {
  const recent = Array.isArray(submissions) ? submissions.slice(0, 8) : [];

  return (
    <Card>
      <SectionHeader
        icon={Code2}
        title="Recent Submissions"
        subtitle="Latest submissions returned by the API"
        accent="violet"
        right={
          <a
            href={`https://leetcode.com/u/${encodeURIComponent(username)}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-500 hover:text-indigo-600 dark:text-indigo-300"
            title="Opens your profile — click the Submissions tab there"
          >
            View all <ArrowUpRight size={13} />
          </a>
        }
      />

      {recent.length === 0 ? (
        <div className="p-6 text-center border border-dashed rounded-xl border-slate-200 dark:border-slate-800">
          <Activity size={23} className="mx-auto mb-2 text-slate-400" />
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            No recent submissions available
          </p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            The API did not return recent submission records.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
          {recent.map((submission, index) => {
            const accepted =
              String(submission.statusDisplay || "").toLowerCase() ===
              "accepted";

            return (
              <a
                key={`${submission.titleSlug || submission.title}-${submission.timestamp ?? index}`}
                href={
                  submission.titleSlug
                    ? `https://leetcode.com/problems/${submission.titleSlug}/`
                    : `https://leetcode.com/u/${encodeURIComponent(username)}/`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 py-3 group first:pt-0 last:pb-0"
              >
                <span
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                    accepted
                      ? "bg-emerald-500/10 text-emerald-500"
                      : "bg-amber-500/10 text-amber-500",
                  )}
                >
                  {accepted ? <CheckCircle2 size={17} /> : <Clock3 size={17} />}
                </span>

                <span className="flex-1 min-w-0">
                  <span className="block text-sm font-semibold truncate text-slate-800 group-hover:text-indigo-500 dark:text-slate-200 dark:group-hover:text-indigo-300">
                    {submission.title || "Untitled problem"}
                  </span>

                  <span className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                    <span>{formatDate(submission.timestamp)}</span>
                    <span
                      className={cn(
                        "rounded-md px-1.5 py-0.5 font-semibold",
                        getLanguageColor(submission.lang),
                      )}
                    >
                      {submission.lang || "Unknown language"}
                    </span>
                  </span>
                </span>

                <span
                  className={cn(
                    "shrink-0 text-[10px] font-bold",
                    accepted ? "text-emerald-500" : "text-amber-500",
                  )}
                >
                  {submission.statusDisplay || "Unknown"}
                </span>
              </a>
            );
          })}
        </div>
      )}
    </Card>
  );
};

/* =========================================================
   Main page
========================================================= */

const LeetCodeProfile = () => {
  const reduceMotion = useReducedMotion();

  const [username, setUsername] = useState(LEETCODE_USERNAME);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);

  const abortRef = useRef(null);
  const requestIdRef = useRef(0);
  const dataRef = useRef(null); // keeps `data` out of the dep array to prevent loops

  const load = useCallback(async (requestedUsername, options = {}) => {
    const uname = String(requestedUsername || "").trim();
    if (!uname) return;

    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    const requestId = ++requestIdRef.current;

    setError("");

    if (options.refresh && dataRef.current) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      const result = await fetchLeetCodeProfile(uname, controller.signal);

      if (requestId !== requestIdRef.current) return;

      if (!result || (!result.profile && !result.totalSolved)) {
        throw new Error("The API returned an unexpected profile response.");
      }

      setData(result);
      dataRef.current = result;
      setUsername(uname);
    } catch (err) {
      if (err?.name === "AbortError") return;
      if (requestId !== requestIdRef.current) return;

      const message = String(err?.message || "");

      setError(
        err?.status === 404
          ? `No LeetCode profile found for "${uname}". Check the username and try again.`
          : /failed to fetch|networkerror|load failed/i.test(message)
            ? "The public API could not be reached. It may be waking up or temporarily unavailable. Please retry."
            : message || "Unable to load this LeetCode profile.",
      );
    } finally {
      if (requestId === requestIdRef.current) {
        setLoading(false);
        setRefreshing(false);
      }
    }
  }, []); // stable — no re-creation, no infinite loop

  useEffect(() => {
    load(LEETCODE_USERNAME);

    return () => {
      abortRef.current?.abort();
    };
  }, [load]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const extracted = extractUsername(query);

    if (!extracted) {
      setError("Enter a LeetCode username or profile URL.");
      return;
    }

    if (!isValidUsername(extracted)) {
      setError("Enter a valid username using letters, numbers, _ or -.");
      return;
    }

    load(extracted);
  };

  const backToMine = () => {
    setQuery("");
    load(LEETCODE_USERNAME);
  };

  const profile = data?.profile ?? {};
  const contest = data?.contest || null;

  const calendar = useMemo(
    () =>
      normalizeCalendar(
        data?.heatmap ||
          data?.submissionCalendar ||
          profile?.submissionCalendar ||
          data?.calendar,
      ),
    [data, profile],
  );

  const submissions =
    data?.recentSubmissions ||
    profile?.recentSubmissions ||
    data?.submission ||
    [];

  const isOwnProfile =
    username.toLowerCase() === LEETCODE_USERNAME.toLowerCase();

  const solved = getCount(profile.totalSolved);
  const easy = getCount(profile.easySolved);
  const medium = getCount(profile.mediumSolved);
  const hard = getCount(profile.hardSolved);

  const totalQuestions =
    getCount(profile.totalQuestions) ||
    getCount(profile.totalEasy) +
      getCount(profile.totalMedium) +
      getCount(profile.totalHard);

  const overallProgress = pct(solved, totalQuestions);

  const fadeClass = reduceMotion
    ? ""
    : "animate-[fadeUp_0.4s_cubic-bezier(0.22,1,0.36,1)_both]";

  return (
    <main className="mx-auto w-full min-w-0 max-w-[1500px] space-y-5 pb-8 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-indigo-500 dark:text-indigo-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Coding workspace
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
            LeetCode Dashboard
          </h1>

          <p className="max-w-2xl mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            Track problem-solving progress, review submissions, and explore your
            coding activity in one place.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {!isOwnProfile && (
            <button
              type="button"
              onClick={backToMine}
              disabled={loading}
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 text-xs font-semibold text-slate-700 transition hover:border-slate-300 disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
            >
              <RotateCcw size={14} />
              My profile
            </button>
          )}

          <button
            type="button"
            onClick={() => load(username, { refresh: true })}
            disabled={loading || refreshing}
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-slate-900 px-3.5 text-xs font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
          >
            <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
            Refresh stats
          </button>
        </div>
      </div>

      {/* Search */}
      <Card className="!p-3 sm:!p-4">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2.5 sm:flex-row"
        >
          <div className="relative flex h-11 min-w-0 flex-1 items-center gap-2.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 transition focus-within:border-indigo-500/50 focus-within:ring-2 focus-within:ring-indigo-500/10 dark:border-slate-800 dark:bg-slate-900/60">
            <Search size={16} className="shrink-0 text-slate-400" />

            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search username or paste a LeetCode profile URL"
              aria-label="Search LeetCode username"
              className="flex-1 h-full min-w-0 text-sm bg-transparent outline-none text-slate-800 placeholder:text-slate-400 dark:text-white"
            />

            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="flex items-center justify-center rounded-lg h-7 w-7 shrink-0 text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="inline-flex items-center justify-center gap-2 px-5 text-sm font-bold text-white transition bg-indigo-600 h-11 rounded-xl hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <Search size={15} />
            )}
            Search profile
          </button>
        </form>
      </Card>

      {/* Loading */}
      {loading && <Skeleton />}

      {/* Error */}
      {!loading && error && (
        <Card className={fadeClass}>
          <div className="flex flex-col items-center py-12 text-center">
            <span className="flex items-center justify-center mb-4 h-14 w-14 rounded-2xl bg-rose-500/10 text-rose-500">
              <AlertCircle size={25} />
            </span>

            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Unable to load profile
            </h2>

            <p className="max-w-md mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              {error}
            </p>

            <button
              type="button"
              onClick={() => load(username)}
              className="inline-flex items-center h-10 gap-2 px-4 mt-5 text-sm font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700"
            >
              <RefreshCw size={14} />
              Try again
            </button>
          </div>
        </Card>
      )}

      {/* Profile content */}
      {!loading && !error && data && (
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-5 sm:space-y-6"
        >
          {/* Profile hero */}
          <Card className="relative overflow-hidden">
            <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-indigo-500/[0.07] blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 left-1/3 h-48 w-48 rounded-full bg-violet-500/[0.06] blur-3xl" />

            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
              {profile.avatar ? (
                <img
                  src={profile.avatar}
                  alt={`${profile.username || username} avatar`}
                  referrerPolicy="no-referrer"
                  className="object-cover w-20 h-20 border shadow-sm shrink-0 rounded-2xl border-slate-200 dark:border-slate-700 sm:h-24 sm:w-24"
                />
              ) : (
                <div className="flex items-center justify-center w-20 h-20 text-indigo-500 shrink-0 rounded-2xl bg-indigo-500/10 sm:h-24 sm:w-24">
                  <UserRound size={32} />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl font-extrabold tracking-tight break-words text-slate-900 dark:text-white sm:text-2xl">
                    {profile.name || profile.username || username}
                  </h2>

                  <span className="rounded-full border border-indigo-500/20 bg-indigo-500/[0.07] px-2.5 py-1 font-mono text-[11px] font-semibold text-indigo-600 dark:text-indigo-300">
                    @{profile.username || username}
                  </span>
                </div>

                {profile.about && (
                  <p className="max-w-2xl mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                    {profile.about}
                  </p>
                )}

                <div className="flex flex-wrap items-center gap-2 mt-4">
                  {profile.country && (
                    <span className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-[11px] font-semibold text-slate-600 dark:bg-slate-900 dark:text-slate-300">
                      {profile.country}
                    </span>
                  )}

                  {profile.company && (
                    <span className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-[11px] font-semibold text-slate-600 dark:bg-slate-900 dark:text-slate-300">
                      {profile.company}
                    </span>
                  )}

                  {profile.school && (
                    <span className="rounded-lg bg-slate-100 px-2.5 py-1.5 text-[11px] font-semibold text-slate-600 dark:bg-slate-900 dark:text-slate-300">
                      {profile.school}
                    </span>
                  )}

                  <a
                    href={`https://leetcode.com/u/${encodeURIComponent(profile.username || username)}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Opens profile — click Submissions tab there"
                    className="group rounded-xl border border-slate-200 p-4 transition hover:border-emerald-300 hover:bg-emerald-500/[0.03] dark:border-slate-800 dark:hover:border-emerald-500/40"
                  >
                    <p className="mt-3 text-sm font-bold text-slate-900 dark:text-white">
                      View on LeetCode
                    </p>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      Open profile & submissions
                    </p>
                  </a>
                </div>
              </div>

              <div className="shrink-0 rounded-2xl border border-slate-200/80 bg-white/80 p-4 dark:border-slate-800 dark:bg-slate-900/60 sm:min-w-[150px]">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                  <Trophy size={14} className="text-amber-500" />
                  Global rank
                </div>

                <p className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  #{fmt(profile.ranking)}
                </p>

                <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                  LeetCode ranking
                </p>
              </div>
            </div>
          </Card>

          {/* Summary cards */}
          <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
            {[
              {
                label: "Problems solved",
                value: fmt(solved),
                description: `${overallProgress}% of listed questions`,
                icon: Target,
                tone: "text-indigo-500 bg-indigo-500/10",
              },
              {
                label: "Total questions",
                value: fmt(totalQuestions),
                description: "Available on LeetCode",
                icon: CheckCircle2,
                tone: "text-emerald-500 bg-emerald-500/10",
              },
              {
                label: "Contribution",
                value: fmt(profile.contributionPoint),
                description: "Contribution points",
                icon: Flame,
                tone: "text-orange-500 bg-orange-500/10",
              },
              {
                label: "Reputation",
                value: fmt(profile.reputation),
                description: "Community score",
                icon: TrendingUp,
                tone: "text-violet-500 bg-violet-500/10",
              },
            ].map((item) => (
              <Card
                key={item.label}
                className="transition hover:-translate-y-0.5"
              >
                <div
                  className={cn(
                    "mb-4 flex h-10 w-10 items-center justify-center rounded-xl",
                    item.tone,
                  )}
                >
                  <item.icon size={19} />
                </div>

                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {item.label}
                </p>

                <p className="mt-1.5 break-words text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  {item.value}
                </p>

                <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                  {item.description}
                </p>
              </Card>
            ))}
          </div>

          {/* Problem progress */}
          <DifficultySection profile={profile} />

          {/* Contest and quick links */}
          <div className="grid min-w-0 gap-5 xl:grid-cols-2">
            <Card>
              <SectionHeader
                icon={Trophy}
                title="Contest Performance"
                subtitle="Competitive programming statistics"
                accent="violet"
              />

              {contest?.contestRating != null ? (
                <>
                  <div className="p-5 text-white rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600">
                    <div className="flex items-center gap-2 text-xs font-semibold text-white/80">
                      <Crown size={15} />
                      Contest rating
                    </div>

                    <p className="mt-2 text-4xl font-extrabold tracking-tight">
                      {Math.round(getCount(contest.contestRating))}
                    </p>

                    <p className="mt-2 text-xs text-white/75">
                      {contest.contestAttend != null
                        ? `${fmt(contest.contestAttend)} contests attended`
                        : "Rating returned by the contest API"}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <div className="rounded-xl bg-slate-50 p-3.5 dark:bg-slate-900/60">
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Contest global rank
                      </p>
                      <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                        {contest.contestGlobalRanking != null
                          ? fmt(contest.contestGlobalRanking)
                          : "—"}
                      </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-3.5 dark:bg-slate-900/60">
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Top percentage
                      </p>
                      <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                        {contest.contestTopPercentage != null
                          ? `${contest.contestTopPercentage}%`
                          : "—"}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="p-5 border border-dashed rounded-xl border-slate-200 dark:border-slate-800">
                  <div className="flex items-start gap-3">
                    <span className="flex items-center justify-center h-9 w-9 shrink-0 rounded-xl bg-violet-500/10 text-violet-500">
                      <Trophy size={17} />
                    </span>

                    <div>
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                        Contest data unavailable
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                        Profile statistics are still available. Contest
                        statistics will appear when the API returns them.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </Card>

            <Card>
              <SectionHeader
                icon={Zap}
                title="Quick Actions"
                subtitle="Continue your problem-solving journey"
                accent="amber"
              />

              <div className="grid gap-3 sm:grid-cols-2">
                <a
                  href="https://leetcode.com/problemset/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-xl border border-slate-200 p-4 transition hover:border-indigo-300 hover:bg-indigo-500/[0.03] dark:border-slate-800 dark:hover:border-indigo-500/40"
                >
                  <span className="flex items-center justify-center text-indigo-500 h-9 w-9 rounded-xl bg-indigo-500/10">
                    <Code2 size={18} />
                  </span>

                  <p className="mt-3 text-sm font-bold text-slate-900 dark:text-white">
                    Practice problems
                  </p>

                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Explore the problem set
                  </p>

                  <ArrowUpRight
                    size={15}
                    className="mt-3 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-indigo-500"
                  />
                </a>

                <a
                  href={`https://leetcode.com/u/${encodeURIComponent(profile.username || username)}/submissions/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-xl border border-slate-200 p-4 transition hover:border-emerald-300 hover:bg-emerald-500/[0.03] dark:border-slate-800 dark:hover:border-emerald-500/40"
                >
                  <span className="flex items-center justify-center h-9 w-9 rounded-xl bg-emerald-500/10 text-emerald-500">
                    <Activity size={18} />
                  </span>

                  <p className="mt-3 text-sm font-bold text-slate-900 dark:text-white">
                    View submissions
                  </p>

                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    Review your activity
                  </p>

                  <ArrowUpRight
                    size={15}
                    className="mt-3 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-emerald-500"
                  />
                </a>
              </div>

              <div className="mt-4 flex items-start gap-3 rounded-xl bg-slate-50 p-3.5 dark:bg-slate-900/60">
                <Award size={17} className="mt-0.5 shrink-0 text-amber-500" />
                <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                  Keep practising consistently. Your progress will update when
                  you refresh this dashboard and the API provides new data.
                </p>
              </div>
            </Card>
          </div>

          {/* Submission calendar */}
          <Heatmap calendar={calendar} />

          {/* Recent submissions */}
          <RecentSubmissions
            submissions={submissions}
            username={profile.username || username}
          />

          {/* Footer */}
          <div className="flex flex-col items-center justify-between gap-2 pt-4 text-center border-t border-slate-200/70 dark:border-slate-800/70 sm:flex-row sm:text-left">
            <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
              Data provided by{" "}
              <a
                href="https://github.com/alfaArghya/alfa-leetcode-api"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-indigo-500 hover:underline dark:text-indigo-300"
              >
                alfa-leetcode-api
              </a>
              . Not affiliated with LeetCode.
            </p>

            <a
              href={LEETCODE_API_BASE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 transition hover:text-indigo-500 dark:text-slate-400"
            >
              API source <ExternalLink size={12} />
            </a>
          </div>
        </motion.div>
      )}
    </main>
  );
};

export default LeetCodeProfile;
