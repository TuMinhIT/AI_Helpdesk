import { Link } from "react-router-dom";
import { Bot, Sparkles, Ticket } from "lucide-react";
import { useAuth } from "@/app/store/authStore";
import { hasAllowedRole, IT_ENGINEER_ROLES } from "@/components/admin/common/adminRoles";

const Home = () => {
  const { user } = useAuth();
  const canAccessITWorkspace = hasAllowedRole(user?.role, IT_ENGINEER_ROLES);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900">
      {/* Hero Section */}
      <section className="relative w-full bg-slate-950 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden text-white border-b border-slate-800">
        {/* Glow effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold tracking-wide uppercase">
            <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
            Proposal Prototype — CT Group (Nhóm 13)
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight max-w-4xl mx-auto">
            Intelligent AI Agent for <br />
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
              IT Support & Service Management
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal">
            Lớp trí tuệ nhân tạo (AI Layer) vận hành xuyên suốt vòng đời yêu cầu IT trên nền tảng CTERP App — Từ tiếp nhận, chẩn đoán RAG đến điều phối Ticket & hỗ trợ Kỹ sư.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/ask-ai"
              className="w-full sm:w-auto px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-2xl shadow-xl shadow-cyan-500/20 transition-all hover:scale-105 flex items-center justify-center gap-3 text-base"
            >
              <Bot className="w-6 h-6" />
              <span>Trải nghiệm Employee AI Chat</span>
            </Link>

            {canAccessITWorkspace && (
              <Link
                to="/admin/tickets"
                className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 font-bold rounded-2xl transition-all flex items-center justify-center gap-3 text-base"
              >
                <Ticket className="w-5 h-5 text-cyan-400" />
                <span>IT Service Desk Operations</span>
              </Link>
            )}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
