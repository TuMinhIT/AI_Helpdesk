import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/app/store/authStore";
import {
  BookOpen,
  Cpu,
  LayoutDashboard,
  Sparkles,
  Ticket,
  X,
} from "lucide-react";
import {
  hasAllowedRole,
  IT_ENGINEER_ROLES,
  IT_MANAGER_ROLES,
  normalizeRole,
} from "./adminRoles";
import assets from "@/assets/index";

const Sidebar = ({
  mobi,
  setSidebarOpen,
}: {
  mobi?: boolean;
  setSidebarOpen?: (open: boolean) => void;
}) => {
  const { user } = useAuth();
  const location = useLocation();
  const canViewDashboard = hasAllowedRole(user?.role, IT_MANAGER_ROLES);
  const canViewITWorkspace = hasAllowedRole(user?.role, IT_ENGINEER_ROLES);
  const roleLabel = normalizeRole(user?.role ?? "employee") || "employee";

  const closeMobile = () => setSidebarOpen?.(false);
  const isActive = (path: string, exact = false) => {
    if (exact) return location.pathname === path;
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const getLinkClass = (path: string, exact = false) => {
    const baseClass =
      "group mb-2 flex items-center rounded-xl px-3 py-3 text-sm font-medium transition sm:px-4";
    const activeClass =
      "border border-cyan-500/30 bg-cyan-500/10 font-semibold text-cyan-300 shadow-sm";
    const inactiveClass = "text-slate-400 hover:bg-slate-800 hover:text-slate-100";
    return `${baseClass} ${isActive(path, exact) ? activeClass : inactiveClass}`;
  };

  const getIconClass = (path: string, exact = false) =>
    `mr-3 h-5 w-5 shrink-0 transition-colors ${
      isActive(path, exact) ? "text-cyan-400" : "text-slate-400 group-hover:text-slate-200"
    }`;

  return (
    <div className="flex h-full min-h-screen flex-col border-r border-slate-800/80 bg-slate-950">
      <div className="flex min-h-16 shrink-0 items-center justify-between border-b border-slate-800/80 px-4 sm:min-h-20 sm:px-6">
        <Link to="/admin" onClick={closeMobile} className="flex min-w-0 items-center gap-3 group">
          <img src={assets.logo} alt="CT Group" className="h-10 w-10 shrink-0 rounded-xl object-cover shadow-lg shadow-cyan-600/30 transition group-hover:scale-105" />
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-[10px] font-bold tracking-wider text-cyan-400">CT GROUP · CTERP</span>
            <span className="truncate text-base font-black leading-none tracking-tight text-white sm:text-lg">IT SERVICE DESK</span>
          </div>
        </Link>
        {mobi && (
          <button
            type="button"
            onClick={closeMobile}
            aria-label="Đóng menu điều hành"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white lg:hidden"
          >
            <X size={20} />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-5 sm:px-4 sm:py-6">
        <div className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
          {roleLabel} workspace
        </div>

        <nav aria-label="Admin navigation">
          {canViewDashboard && (
            <Link to="/admin" onClick={closeMobile} className={getLinkClass("/admin", true)}>
              <LayoutDashboard className={getIconClass("/admin", true)} />
              <span>IT Intelligence Dashboard</span>
            </Link>
          )}

          {canViewITWorkspace && (
            <>
              <Link to="/admin/tickets" onClick={closeMobile} className={getLinkClass("/admin/tickets", true)}>
                <Ticket className={getIconClass("/admin/tickets", true)} />
                <span className="flex min-w-0 flex-1 items-center justify-between gap-2">
                  <span className="truncate">IT Service Desk Inbox</span>
                  <span className="rounded-full bg-red-500/20 px-2 py-0.5 text-xs font-bold text-red-400">85</span>
                </span>
              </Link>

              <Link to="/admin/tickets/IT-2026-00128" onClick={closeMobile} className={getLinkClass("/admin/tickets/IT-2026-00128", true)}>
                <Cpu className={getIconClass("/admin/tickets/IT-2026-00128", true)} />
                <span>AI Engineer Copilot</span>
              </Link>

              <div className="mb-3 mt-6 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                Knowledge & configuration
              </div>

              <Link to="/admin/knowledge-base" onClick={closeMobile} className={getLinkClass("/admin/knowledge-base")}>
                <BookOpen className={getIconClass("/admin/knowledge-base")} />
                <span>Knowledge Base (RAG)</span>
              </Link>
            </>
          )}

          <Link
            to="/ask-ai"
            onClick={closeMobile}
            className="my-4 flex items-center rounded-xl border border-cyan-500/30 bg-gradient-to-r from-cyan-950 to-slate-900 px-3 py-3 text-sm font-semibold text-cyan-300 shadow-md transition hover:border-cyan-400 sm:px-4"
          >
            <Sparkles className="mr-3 h-5 w-5 shrink-0 text-yellow-300" />
            <span>Employee AI Chat</span>
          </Link>
        </nav>
      </div>

      <div className="shrink-0 border-t border-slate-800/80 p-3 sm:p-4">
        <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/80 p-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-cyan-500/40 bg-cyan-600/20 text-sm font-bold text-cyan-400">
            IT
          </div>
          <div className="flex min-w-0 flex-col">
            <span className="truncate text-sm font-semibold text-slate-200">
              {user?.name || user?.email?.split("@")[0] || "IT User"}
            </span>
            <span className="truncate text-xs text-cyan-400">{roleLabel}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
