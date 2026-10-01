import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Sparkles, ArrowLeft, Paperclip, CheckCircle2, ShieldAlert, Cpu, AlertTriangle, FileText, Check, CornerUpRight, User } from "lucide-react";

const AITicketAnalysisPage = () => {
  const { id } = useParams<{ id: string }>();
  const ticketId = id ? `#${id}` : "#IT-2026-00128";

  const [isResolved, setIsResolved] = useState(false);
  const [isEscalated, setIsEscalated] = useState(false);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-4">
          <Link
            to="/admin/tickets"
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-700 bg-cyan-50 px-2.5 py-1 rounded-md border border-cyan-200">
                Screen 03 — IT Engineer Copilot
              </span>
              <span className="text-xs text-slate-400">IT Operations</span>
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 mt-1">
              AI Ticket Analysis {ticketId}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 rounded-full bg-red-100 text-red-700 text-xs font-bold border border-red-200 flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5" /> Urgent SLA (45m còn lại)
          </span>
        </div>
      </div>

      {/* Main 2-Column Layout (Matching Wireframe Screen 03) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Ticket Context Info (40% width on Desktop) */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-slate-500" />
              Thông tin Ticket & Người yêu cầu
            </h2>
            <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold">
              Mã: {ticketId}
            </span>
          </div>

          <div className="space-y-4 text-sm text-slate-700">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Người gửi:
              </span>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="w-9 h-9 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-xs">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Lê Văn A</p>
                  <p className="text-xs text-slate-500">Phòng Kế toán — CT Group Head Office</p>
                </div>
              </div>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Mô tả chi tiết sự cố:
              </span>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 font-medium leading-relaxed text-slate-800">
                BSOD (Màn hình xanh) lặp lại liên tục sau khi khởi động máy từ 2 ngày nay. Máy tự ngắt và hiện mã lỗi DRIVER_IRQL_NOT_LESS_OR_EQUAL.
              </div>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                File đính kèm:
              </span>
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer">
                  <Paperclip className="w-3.5 h-3.5 text-slate-500" />
                  <span>dump.dmp</span>
                  <span className="text-[10px] text-slate-400 font-normal">(2.4 MB)</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer">
                  <Paperclip className="w-3.5 h-3.5 text-slate-500" />
                  <span>crash.log</span>
                  <span className="text-[10px] text-slate-400 font-normal">(128 KB)</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>Thiết bị: Dell Latitude 5420</span>
              <span>Windows 11 Enterprise (22H2)</span>
            </div>
          </div>
        </div>

        {/* Right Column: AI Diagnosis & Copilot (60% width on Desktop) */}
        <div className="lg:col-span-6 bg-gradient-to-br from-cyan-950 via-slate-900 to-slate-950 p-6 rounded-2xl border border-cyan-500/30 text-white shadow-xl space-y-6 flex flex-col justify-between">
          
          <div className="space-y-5">
            {/* Copilot Header */}
            <div className="flex items-center justify-between pb-4 border-b border-cyan-500/20">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white leading-tight">✦ AI Diagnosis & Copilot</h2>
                  <p className="text-xs text-cyan-400 font-medium">Được huấn luyện trên dữ liệu 10,000+ ticket IT lịch sử</p>
                </div>
              </div>
              <span className="text-xs bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full font-bold border border-cyan-500/30">
                AI Confidence: 95%
              </span>
            </div>

            {/* AI Diagnosis: Nguyên nhân tiềm năng */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                Nguyên nhân tiềm năng (Potential Root Cause):
              </h3>
              
              <div className="space-y-2.5">
                <div className="p-3.5 bg-slate-900/80 rounded-xl border border-cyan-500/30 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-white">• Driver hiển thị lỗi thời / xung đột VGA</span>
                    <span className="text-cyan-400 font-extrabold">75% độ tin cậy</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-cyan-400 h-full rounded-full w-[75%]" />
                  </div>
                </div>

                <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-300">• Bản cập nhật Windows KB503... chưa tương thích</span>
                    <span className="text-slate-400">20% độ tin cậy</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-slate-500 h-full rounded-full w-[20%]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Suggested Resolution Steps */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-cyan-400" />
                Gợi ý giải quyết (Suggested Resolution):
              </h3>
              
              <div className="p-4 bg-slate-900/90 rounded-xl border border-cyan-500/30 space-y-2 text-xs text-slate-200 font-medium">
                <p className="flex items-start gap-2">
                  <span className="font-bold text-cyan-400">1.</span>
                  <span>Rollback Display Driver về phiên bản OEM chính thức của Dell.</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="font-bold text-cyan-400">2.</span>
                  <span>Chạy công cụ chẩn đoán RAM test (`mdsched.exe`) để kiểm tra bộ nhớ.</span>
                </p>
                <div className="pt-2 border-t border-slate-800 text-[11px] text-cyan-300 font-semibold flex items-center gap-1">
                  <span>📄 Tìm thấy 12 ticket tương tự đã xử lý thành công trong cơ sở tri thức.</span>
                </div>
              </div>
            </div>

            {/* Status Notifications */}
            {isResolved && (
              <div className="p-3.5 bg-emerald-950/90 border border-emerald-500/50 rounded-xl text-emerald-300 text-xs font-bold flex items-center gap-2 animate-fade-in">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Ticket đã được đánh dấu Đã xử lý (Resolved) & ghi nhận đáp ứng SLA đúng hạn!</span>
              </div>
            )}

            {isEscalated && (
              <div className="p-3.5 bg-amber-950/90 border border-amber-500/50 rounded-xl text-amber-300 text-xs font-bold flex items-center gap-2 animate-fade-in">
                <CornerUpRight className="w-5 h-5 text-amber-400 shrink-0" />
                <span>Đã chuyển cấp thành công tới Đội ngũ Kỹ sư Chuyên sâu Level 2 (SysAdmin Team)!</span>
              </div>
            )}

          </div>

          {/* Action Footer (Screen 03 Buttons) */}
          <div className="pt-4 border-t border-cyan-500/20 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                setIsEscalated(true);
                setIsResolved(false);
              }}
              className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 border border-slate-700 shadow-sm"
            >
              <CornerUpRight className="w-4 h-4 text-slate-300" />
              <span>Chuyển cấp (Escalate)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsResolved(true);
                setIsEscalated(false);
              }}
              className="px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30"
            >
              <Check className="w-4 h-4" />
              <span>Đánh dấu Đã xử lý (Resolve)</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AITicketAnalysisPage;
