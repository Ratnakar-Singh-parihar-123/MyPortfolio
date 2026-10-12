import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  Cpu,
  Briefcase,
  FileText,
  Share2,
  ArrowLeft,
  Code2,
  ChevronRight,
} from "lucide-react";
import { DASHBOARD_NAV } from "../data/roleDashboard";
import horoLogo from "../assets/heroImg/hero.jpeg";

/* =========================================================
   ⚙️  PROFILE CONFIG — change these
========================================================= */
const PROFILE = {
  name: "Ratnakar Singh Parihar",
  role: "Full-Stack Developer",
  avatar: horoLogo,
  homeUrl: "/",
};
/* ========================================================= */

const ICONS = {
  LayoutDashboard,
  Users,
  FolderKanban,
  Cpu,
  Briefcase,
  FileText,
  Share2,
  Code2,
};

/* ---------- Avatar with graceful fallback ---------- */
const Avatar = ({ src, name, size = 40 }) => {
  const [failed, setFailed] = useState(false);
  const initials = (name || "?")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  if (!src || failed) {
    return (
      <span
        className="flex items-center justify-center font-bold text-white bg-gradient-to-br from-indigo-500 to-violet-600"
        style={{
          width: size,
          height: size,
          borderRadius: 12,
          fontSize: size * 0.38,
        }}
      >
        {initials}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      onError={() => setFailed(true)}
      className="object-cover"
      style={{
        width: size,
        height: size,
        borderRadius: 12,
      }}
    />
  );
};

const RoleDashboardSidebar = ({ onNavigate }) => {
  const { pathname } = useLocation();

  const isActive = (path, ready) => {
    if (!ready) return false;
    if (path === "/role-dashboard") return pathname === "/role-dashboard";
    return pathname === path || pathname.startsWith(path + "/");
  };

  return (
    <aside
      className="
        role-dashboard__sidebar
        flex h-screen flex-col
        w-[248px] lg:w-[264px]
        border-r border-slate-200/70 dark:border-slate-800/70
        bg-white/85 dark:bg-slate-950/80
        backdrop-blur-xl
      "
      aria-label="Dashboard navigation"
    >
      {/* ==================== PROFILE BRAND ==================== */}
      <div className="px-3.5 pt-4 pb-3 border-b border-slate-200/70 dark:border-slate-800/70">
        <Link
          to={PROFILE.homeUrl}
          onClick={onNavigate}
          aria-label={`Go to ${PROFILE.name}'s home page`}
          className="
            group relative flex items-center gap-3 rounded-2xl
            border border-slate-200/80 dark:border-slate-800/80
            bg-gradient-to-br from-slate-50/80 to-white
            dark:from-slate-900/60 dark:to-slate-950/60
            p-2.5
            transition-all duration-300
            hover:border-indigo-400/50 hover:shadow-lg hover:shadow-indigo-500/[0.08]
            hover:-translate-y-0.5
            focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40
          "
        >
          {/* soft glow */}
          <span className="absolute w-20 h-20 transition-opacity duration-500 rounded-full opacity-0 pointer-events-none -right-6 -top-6 bg-indigo-500/15 blur-2xl group-hover:opacity-100" />

          {/* avatar with ring */}
          <span className="relative shrink-0">
            <span className="absolute inset-0 transition-opacity duration-300 opacity-0 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 blur-sm group-hover:opacity-70" />
            <span className="relative block shadow-sm rounded-xl ring-2 ring-white dark:ring-slate-900">
              <Avatar src={PROFILE.avatar} name={PROFILE.name} size={42} />
            </span>
            {/* online dot */}
            <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
              <span className="absolute inline-flex w-full h-full rounded-full opacity-75 bg-emerald-500 animate-ping" />
              <span className="relative inline-flex w-3 h-3 border-2 border-white rounded-full bg-emerald-500 dark:border-slate-950" />
            </span>
          </span>

          {/* text */}
          <span className="relative flex-1 min-w-0">
            <span className="block truncate text-[13px] font-bold leading-tight text-slate-900 dark:text-white">
              {PROFILE.name}
            </span>
            <span className="mt-0.5 block truncate text-[10.5px] font-medium text-slate-500 dark:text-slate-500">
              {PROFILE.role}
            </span>
          </span>

          {/* chevron */}
          <ChevronRight
            size={15}
            className="relative shrink-0 text-slate-300 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-indigo-500 dark:text-slate-700"
          />
        </Link>
      </div>

      {/* ==================== NAV ==================== */}
      <nav
        className="
          flex-1 px-3 py-4 space-y-1
          overflow-y-auto
          [scrollbar-width:none]
          [-ms-overflow-style:none]
          [&::-webkit-scrollbar]:hidden
        "
      >
        <div className="px-2 pb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400 dark:text-slate-500">
          Workspace
        </div>

        {DASHBOARD_NAV.map((item) => {
          const Icon = ICONS[item.icon];
          const active = isActive(item.path, item.ready);

          const baseClass = `
            group relative flex items-center gap-3 w-full
            px-3 py-2.5 rounded-xl text-sm
            transition-all duration-200
            focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40
          `;

          /* ---------- coming soon ---------- */
          if (!item.ready) {
            return (
              <div
                key={item.id}
                aria-disabled="true"
                title="Coming soon"
                className={`${baseClass} cursor-not-allowed opacity-55 text-slate-500 dark:text-slate-500`}
              >
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-500/5 dark:bg-slate-400/5">
                  <Icon size={16} strokeWidth={1.9} />
                </span>
                <span className="flex-1 text-left">{item.label}</span>
                <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-400 dark:bg-slate-800/70 dark:text-slate-500">
                  Soon
                </span>
              </div>
            );
          }

          /* ---------- active / normal ---------- */
          return (
            <Link
              key={item.id}
              to={item.path}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={`
                ${baseClass}
                ${
                  active
                    ? "bg-indigo-500/[0.08] dark:bg-indigo-400/[0.10] font-semibold text-indigo-700 dark:text-indigo-300"
                    : "font-medium text-slate-700 hover:bg-slate-100/70 dark:text-slate-300 dark:hover:bg-slate-900/70"
                }
              `}
            >
              {/* left accent bar for active */}
              {active && (
                <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-indigo-500 dark:bg-indigo-400" />
              )}

              <span
                className={`
                  flex h-8 w-8 items-center justify-center rounded-lg transition-colors
                  ${
                    active
                      ? "bg-indigo-500/15 text-indigo-600 dark:text-indigo-300"
                      : "bg-slate-500/5 text-slate-500 group-hover:text-slate-700 dark:bg-slate-400/5 dark:text-slate-400 dark:group-hover:text-slate-200"
                  }
                `}
              >
                <Icon size={16} strokeWidth={1.9} />
              </span>

              <span className="flex-1 text-left">{item.label}</span>

              {active && (
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* ==================== BACK ==================== */}
      <div className="p-3 border-t border-slate-200/70 dark:border-slate-800/70">
        <Link
          to="/"
          onClick={onNavigate}
          className="
            group flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium
            text-slate-700 dark:text-slate-300
            hover:bg-slate-100/70 dark:hover:bg-slate-900/70
            transition-all duration-200
            focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40
          "
        >
          <span className="flex items-center justify-center w-8 h-8 transition-colors rounded-lg bg-slate-500/5 text-slate-500 group-hover:text-slate-700 dark:bg-slate-400/5 dark:text-slate-400 dark:group-hover:text-slate-200">
            <ArrowLeft size={16} strokeWidth={1.9} />
          </span>
          <span className="flex-1 text-left">Back to Portfolio</span>
        </Link>
      </div>
    </aside>
  );
};

export default RoleDashboardSidebar;
