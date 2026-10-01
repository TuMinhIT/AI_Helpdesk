import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Bot,
  Home,
  LogIn,
  LogOut,
  Menu,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";
import { useAuth } from "@/app/store/authStore";
import ShopName from "./ShopName";

const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  `inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition ${isActive
    ? "bg-cyan-50 text-cyan-700"
    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
  }`;

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { accessToken, user, logout } = useAuth();

  const closeMobileMenu = () => setMobileOpen(false);
  const handleLogout = () => {
    closeMobileMenu();
    logout();
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-3 px-4 py-2 sm:min-h-20 sm:px-6 lg:px-8">
        <div className="min-w-0 shrink-0">
          <ShopName />
        </div>

        <nav aria-label="Client navigation" className="hidden items-center gap-1 lg:flex">
          <NavLink to="/" end className={getNavLinkClass}>
            <Home size={16} /> Trang chủ
          </NavLink>
          <NavLink
            to="/ask-ai"
            className={({ isActive }) =>
              `inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition ${isActive
                ? "bg-slate-950 text-cyan-300 shadow-lg shadow-cyan-900/20"
                : "bg-slate-900 text-cyan-300 hover:bg-cyan-900"
              }`
            }
          >
            <Sparkles size={16} className="text-yellow-300" /> Employee AI Chat
          </NavLink>
        </nav>

        <div className="hidden items-center gap-2 sm:flex">
          {accessToken ? (
            <>
              <Link
                to="/profile"
                className="inline-flex max-w-44 items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              >
                <UserRound size={17} className="shrink-0 text-cyan-600" />
                <span className="truncate">{user?.name || "Tài khoản"}</span>
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:opacity-60"
              >
                <LogOut size={16} />
                <span className="hidden md:inline">Đăng xuất</span>
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-2 text-sm font-bold text-white transition hover:bg-cyan-900"
            >
              <LogIn size={16} /> Đăng nhập
            </Link>
          )}
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? "Đóng menu" : "Mở menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
          className="rounded-xl border border-slate-200 p-2.5 text-slate-700 transition hover:bg-slate-100 sm:hidden"
        >
          {mobileOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {mobileOpen && (
        <>
          <button
            type="button"
            aria-label="Đóng menu"
            onClick={closeMobileMenu}
            className="fixed inset-0 top-16 z-40 bg-slate-950/30 sm:hidden"
          />
          <div className="absolute inset-x-0 top-full z-50 border-b border-slate-200 bg-white p-4 shadow-xl sm:hidden">
            <nav aria-label="Mobile client navigation" className="grid gap-2">
              <NavLink to="/" end onClick={closeMobileMenu} className={getNavLinkClass}>
                <Home size={17} /> Trang chủ
              </NavLink>
              <NavLink to="/ask-ai" onClick={closeMobileMenu} className={getNavLinkClass}>
                <Bot size={17} className="text-cyan-600" /> Employee AI Chat
              </NavLink>
              {accessToken ? (
                <>
                  <Link
                    to="/profile"
                    onClick={closeMobileMenu}
                    className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100"
                  >
                    <UserRound size={17} className="text-cyan-600" /> Hồ sơ tài khoản
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-left text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-60"
                  >
                    <LogOut size={17} /> Đăng xuất
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-3 py-2 text-sm font-bold text-white"
                >
                  <LogIn size={17} /> Đăng nhập CTERP
                </Link>
              )}
            </nav>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
