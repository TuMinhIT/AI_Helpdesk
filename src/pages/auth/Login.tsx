import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  LoaderCircle,
  Mail,
  ShieldCheck,
  Sparkles,
  Ticket,
} from "lucide-react";
import { useAuth } from "@/app/store/authStore";
import authService from "@/services/authService";
import assets from "@/assets/index";
import { AUTH_FEATURES } from "@/app/authFeatures";
import { getAdminWorkspacePath } from "@/components/admin/common/adminRoles";

const service = authService();

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isPending, setIsPending] = useState(false);

  const { accessToken, user, login } = useAuth();

  useEffect(() => {
    if (accessToken) {
      navigate(getAdminWorkspacePath(user?.role), { replace: true });
    }
  }, [accessToken, navigate, user?.role]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError("");

    if (!email.trim() || !password) {
      setSubmitError("Vui lòng nhập email và mật khẩu.");
      return;
    }

    try {
      setIsPending(true);
      const response = await service.loginUser({ email: email.trim(), password });
      if (response.success && response.data?.accessToken) {
        login(response.data);
        toast.success("Đăng nhập thành công!");
        navigate(getAdminWorkspacePath(response.data.user?.role), { replace: true });
        return;
      }

      const message = response.message || "Email hoặc mật khẩu không chính xác.";
      setSubmitError(message);
      toast.error(message);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Đăng nhập thất bại. Vui lòng thử lại.";
      setSubmitError(message);
      toast.error(message);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-slate-950">
      <div className="grid min-h-screen lg:grid-cols-[minmax(0,1.08fr)_minmax(420px,0.92fr)]">
        <aside className="relative hidden overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 px-10 py-10 text-white lg:flex lg:flex-col xl:px-16">
          <img src={assets.logo} alt="CT Group aerial campus" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-screen" />
          <div className="pointer-events-none absolute inset-0 bg-slate-950/70" />
          <div className="pointer-events-none absolute -left-24 top-20 h-80 w-80 rounded-full bg-cyan-500/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 right-0 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />

          <Link to="/" className="relative z-10 inline-flex w-fit items-center gap-3">
            <img src={assets.logo} alt="CT Group" className="h-11 w-14 rounded-2xl object-cover shadow-lg shadow-cyan-500/25" />
            <span>
              <span className="block text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">CT Group · CTERP</span>
              <span className="block text-lg font-black tracking-tight">AI IT Copilot</span>
            </span>
          </Link>

          <div className="relative z-10 my-auto max-w-2xl py-16">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1.5 text-xs font-semibold text-cyan-200">
              <Sparkles size={14} className="text-yellow-300" />
              Intelligent IT Service Management
            </div>
            <h1 className="max-w-2xl text-4xl font-black leading-tight tracking-tight xl:text-6xl">
              Hỗ trợ IT nhanh hơn với
              <span className="block bg-gradient-to-r from-cyan-300 via-teal-200 to-emerald-300 bg-clip-text text-transparent">
                AI Copilot
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 xl:text-lg">
              Mô tả sự cố bằng ngôn ngữ tự nhiên, tra cứu IT SOP, nhận hướng dẫn từng bước và tạo ticket chuẩn hóa khi cần hỗ trợ kỹ thuật.
            </p>

            <div className="mt-10 grid max-w-xl gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <Sparkles size={19} className="text-cyan-300" />
                <p className="mt-3 text-sm font-semibold">AI hiểu yêu cầu</p>
                <p className="mt-1 text-xs leading-5 text-slate-400">Không cần chọn category thủ công.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <Ticket size={19} className="text-cyan-300" />
                <p className="mt-3 text-sm font-semibold">Tạo ticket</p>
                <p className="mt-1 text-xs leading-5 text-slate-400">Xác nhận trước khi chuyển IT.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <ShieldCheck size={19} className="text-cyan-300" />
                <p className="mt-3 text-sm font-semibold">Routing thông minh</p>
                <p className="mt-1 text-xs leading-5 text-slate-400">Đúng team theo loại sự cố.</p>
              </div>
            </div>
          </div>

          <p className="relative z-10 text-xs text-slate-500">CTERP App · IT Support & Service Management</p>
        </aside>

        <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-6 sm:px-8 sm:py-10">
          <div className="w-full max-w-md">
            <div className="mb-6 flex items-center justify-between lg:hidden">
              <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-slate-900">
                <img src={assets.logo} alt="CT Group" className="h-9 w-12 rounded-xl object-cover" />
                <span>CTERP AI IT Copilot</span>
              </Link>
              <Link to="/" className="text-sm font-semibold text-slate-500 hover:text-cyan-700">
                Trang chủ
              </Link>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/5 sm:p-8">
              <div className="mb-8">
                <Link to="/" className="hidden items-center gap-1.5 text-sm font-semibold text-slate-400 transition hover:text-cyan-700 lg:inline-flex">
                  <ArrowLeft size={15} /> Về trang chủ
                </Link>
                <div className="mt-5">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-600">CTERP workspace</p>
                  <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950">Đăng nhập</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Đăng nhập để sử dụng Employee AI Chat hoặc mở workspace IT theo vai trò của bạn.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="login-email" className="mb-2 block text-sm font-semibold text-slate-700">
                    Email công việc
                  </label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      id="login-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="name@ctgroup.com"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="login-password" className="mb-2 block text-sm font-semibold text-slate-700">
                    Mật khẩu
                  </label>
                  <div className="relative">
                    <KeyRound className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      id="login-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Nhập mật khẩu của bạn"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-100"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((visible) => !visible)}
                      aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                      className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 transition hover:bg-slate-200 hover:text-slate-700"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {submitError && (
                  <p role="alert" className="rounded-xl border border-red-100 bg-red-50 px-3 py-2.5 text-sm leading-5 text-red-700">
                    {submitError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-slate-900/15 transition hover:-translate-y-0.5 hover:bg-cyan-900 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {isPending && <LoaderCircle size={18} className="animate-spin" />}
                  {isPending ? "Đang xác thực..." : "Đăng nhập CTERP"}
                </button>
              </form>

              <div className="mt-5 flex items-center justify-between gap-3 text-sm">
                {AUTH_FEATURES.passwordReset ? (
                  <Link to="/forgot-password" className="font-semibold text-slate-500 hover:text-cyan-700">
                    Quên mật khẩu?
                  </Link>
                ) : (
                  <Link to="/ask-ai" className="font-semibold text-slate-500 hover:text-cyan-700">
                    Cần hỗ trợ đăng nhập?
                  </Link>
                )}
                <Link to="/register" className="font-bold text-cyan-700 hover:text-cyan-900">
                  Tạo tài khoản
                </Link>
              </div>

              <div className="mt-7 flex items-start gap-2 border-t border-slate-100 pt-5 text-xs leading-5 text-slate-400">
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-500" />
                <span>Workspace sẽ tự động được chọn theo role tài khoản sau khi đăng nhập.</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Login;
