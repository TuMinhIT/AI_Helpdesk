import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Bot,
  CheckCircle2,
  Headphones,
  ShieldCheck,
  Sparkles,
  Ticket,
} from "lucide-react";
import { useAuth } from "@/app/store/authStore";
import {
  getAdminWorkspacePath,
  hasAllowedRole,
  IT_ENGINEER_ROLES,
} from "@/components/admin/common/adminRoles";

const clientFeatures = [
  {
    icon: Bot,
    title: "Trao đổi với AI",
    description: "Mô tả sự cố bằng ngôn ngữ tự nhiên và nhận hướng dẫn xử lý theo từng bước.",
    accent: "bg-cyan-50 text-cyan-700",
  },
  {
    icon: BookOpen,
    title: "Tra cứu Knowledge Base",
    description: "Tìm nhanh IT SOP và các bài hướng dẫn đã được chuẩn hóa cho nhân viên.",
    accent: "bg-indigo-50 text-indigo-700",
  },
  {
    icon: Ticket,
    title: "Tạo ticket đúng tuyến",
    description: "AI tổng hợp thông tin, đề xuất mức độ ưu tiên và chuyển đến đúng đội IT.",
    accent: "bg-emerald-50 text-emerald-700",
  },
];

const Home = () => {
  const { user } = useAuth();
  const canAccessITWorkspace = hasAllowedRole(user?.role, IT_ENGINEER_ROLES);
  const adminWorkspacePath = getAdminWorkspacePath(user?.role);

  return (
    <div className="bg-slate-50 text-slate-900">
      <section className="relative isolate overflow-hidden bg-slate-950 text-white">
        <div className="pointer-events-none absolute -left-40 -top-48 h-[34rem] w-[34rem] rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-48 right-[-8rem] h-[32rem] w-[32rem] rounded-full bg-indigo-500/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.08fr_0.92fr] lg:px-8 lg:py-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-cyan-200">
              <Sparkles className="h-4 w-4 text-yellow-300" />
              CT Group · Employee IT Hub
            </div>

            <h1 className="mt-6 max-w-3xl text-4xl font-black leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Hỗ trợ IT rõ ràng hơn,
              <span className="block bg-gradient-to-r from-cyan-300 via-teal-200 to-emerald-300 bg-clip-text text-transparent">
                với AI Copilot.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              Một điểm đến cho mọi yêu cầu IT: tìm hướng dẫn, xử lý sự cố và tạo ticket với đầy đủ thông tin để đội ngũ hỗ trợ phản hồi nhanh hơn.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/ask-ai"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-5 py-3.5 text-sm font-black text-slate-950 shadow-xl shadow-cyan-500/20 transition hover:-translate-y-0.5 hover:bg-cyan-300"
              >
                <Bot className="h-5 w-5" />
                Bắt đầu với AI Chat
                <ArrowRight className="h-4 w-4" />
              </Link>

              {canAccessITWorkspace ? (
                <Link
                  to={adminWorkspacePath}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3.5 text-sm font-bold text-white transition hover:border-cyan-300/50 hover:bg-white/10"
                >
                  <Headphones className="h-5 w-5 text-cyan-300" />
                  Mở IT Workspace
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-5 py-3.5 text-sm font-bold text-white transition hover:border-cyan-300/50 hover:bg-white/10"
                >
                  <ShieldCheck className="h-5 w-5 text-cyan-300" />
                  Đăng nhập CTERP
                </Link>
              )}
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold text-slate-400">
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Hướng dẫn theo SOP
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Routing đúng đội IT
              </span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-4 rounded-[2rem] bg-cyan-400/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.08] p-5 shadow-2xl backdrop-blur-xl sm:p-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/25">
                    <Bot className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-bold text-white">CTERP AI Copilot</p>
                    <p className="mt-0.5 text-xs text-cyan-200">Sẵn sàng hỗ trợ nhân viên</p>
                  </div>
                </div>
                <span className="flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2.5 py-1 text-[11px] font-bold text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Online
                </span>
              </div>

              <div className="space-y-3 py-5">
                <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-cyan-400 px-4 py-3 text-sm font-semibold text-slate-950">
                  Laptop của tôi không kết nối được Wi-Fi.
                </div>
                <div className="max-w-[92%] rounded-2xl rounded-tl-sm border border-white/10 bg-slate-900/80 px-4 py-3 text-sm leading-6 text-slate-200">
                  Tôi đã tìm thấy hướng dẫn xử lý phù hợp và có thể tạo ticket nếu sự cố vẫn tiếp diễn.
                </div>
              </div>

              <div className="rounded-2xl border border-cyan-300/15 bg-cyan-300/10 p-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-200">
                  <ShieldCheck className="h-4 w-4" /> AI-assisted support
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  Từ mô tả sự cố đến hướng dẫn và ticket, mọi bước đều được gói gọn trong một cuộc hội thoại.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto -mt-8 max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {clientFeatures.map(({ icon: Icon, title, description, accent }) => (
            <div
              key={title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-900/5 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${accent}`}>
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="mt-4 text-base font-extrabold text-slate-900">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
        <div className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-600">Bắt đầu ngay</p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">Bạn đang gặp vấn đề IT?</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Hãy để AI Copilot giúp bạn tìm câu trả lời trước khi chuyển tiếp đến đội ngũ hỗ trợ.
            </p>
          </div>
          <Link
            to="/ask-ai"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-cyan-900"
          >
            Mở cuộc trò chuyện <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
