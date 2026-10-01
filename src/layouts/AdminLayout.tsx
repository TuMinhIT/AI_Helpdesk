import { useMemo, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Bell, LogOut, Menu, ShieldCheck, X } from "lucide-react";
import Sidebar from "@/components/admin/common/Sidebar";
import { useAuth } from "@/app/store/authStore";
import { normalizeRole } from "@/components/admin/common/adminRoles";
import assets from "@/assets/index";

const pageTitles: Record<string, string> = {
  "/admin": "IT Intelligence Dashboard",
  "/admin/tickets": "IT Service Desk Inbox",
  "/admin/knowledge-base": "Knowledge Base (RAG)",
};

const getRoleLabel = (role?: string) => {
  switch (normalizeRole(role ?? "")) {
    case "admin":
    case "itadmin":
      return "System Admin";
    case "itmanager":
    case "manager":
      return "IT Manager";
    case "itengineer":
    case "engineer":
      return "IT Engineer";
    case "itsupport":
    case "support":
    case "helpdesk":
      return "IT Support";
    default:
      return "IT Operations";
  }
};

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const pageTitle = useMemo(() => {
    if (location.pathname.startsWith("/admin/tickets/")) return "AI Ticket Analysis";
    if (location.pathname.startsWith("/admin/knowledge-base/")) return "Knowledge Base Editor";
    return pageTitles[location.pathname] ?? "IT Operations";
  }, [location.pathname]);

  const handleLogout = () => logout();

  return (
    <div className="flex min-h-screen min-w-0 overflow-x-hidden bg-slate-50">
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[min(18rem,calc(100vw-1rem))] transform bg-slate-900 text-slate-300 transition-transform duration-300 ease-in-out lg:static lg:w-72 lg:translate-x-0 lg:flex-shrink-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <Sidebar mobi={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </aside>

      {sidebarOpen && (
        <button
          type="button"
          aria-label="Đóng menu điều hành"
          className="fixed inset-0 z-40 cursor-default bg-slate-950/55 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex min-h-screen min-w-0 flex-1 flex-col overflow-hidden">
        <header className="sticky top-0 z-30 flex min-h-16 items-center justify-between gap-3 border-b border-slate-200 bg-white px-3 shadow-sm sm:min-h-20 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              aria-label={sidebarOpen ? "Đóng menu điều hành" : "Mở menu điều hành"}
              aria-expanded={sidebarOpen}
              onClick={() => setSidebarOpen((open) => !open)}
              className="rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 lg:hidden"
            >
              {sidebarOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
            <div className="min-w-0">
              <p className="hidden text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-600 sm:block">
                CTERP / IT Operations
              </p>
              <h1 className="truncate text-base font-bold text-slate-900 sm:text-xl">{pageTitle}</h1>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <span className="hidden items-center gap-1.5 rounded-full bg-cyan-50 px-3 py-1.5 text-xs font-bold text-cyan-700 md:inline-flex">
              <ShieldCheck size={14} /> {getRoleLabel(user?.role)}
            </span>
            <button
              type="button"
              aria-label="Thông báo"
              className="relative rounded-xl p-2 text-slate-400 transition hover:bg-cyan-50 hover:text-cyan-700"
            >
              <Bell size={19} />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full border-2 border-white bg-red-500" />
            </button>
            <div className="hidden h-8 w-px bg-slate-200 sm:block" />
            <Link to="/profile" className="hidden items-center gap-2 sm:flex">
              <span className="hidden max-w-40 truncate text-right text-sm font-semibold text-slate-700 md:block">
                {user?.name || user?.email || "IT User"}
              </span>
              <img
                src={assets.logo}
                className="h-9 w-9 rounded-full border-2 border-cyan-100 object-cover"
                alt="Ảnh đại diện"
              />
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              aria-label="Đăng xuất"
              title="Đăng xuất"
              className="rounded-xl p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-60"
            >
              <LogOut size={19} />
            </button>
          </div>
        </header>

        <main className="min-h-0 flex-1 overflow-auto p-3 sm:p-5 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
