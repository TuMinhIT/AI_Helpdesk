import { Link } from "react-router-dom";
import { BarChart3, TrendingUp, CheckCircle2, Bot, ShieldAlert, Sparkles, AlertCircle, ArrowUpRight } from "lucide-react";

const OverViewPage = () => {
  return (
    <div className="space-y-6">
      {/* Page Title & Breadcrumb Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-700 bg-cyan-50 px-2.5 py-1 rounded-md border border-cyan-200">
              CTERP Management
            </span>
            <span className="text-xs text-slate-400">Screen 04</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-1">
            IT Intelligence Dashboard
          </h1>
          <p className="text-sm text-slate-500">
            Bảng điều khiển chiến lược hiệu suất IT Service Desk & phân tích AI theo thời gian thực
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/tickets"
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-bold transition-all shadow-md flex items-center gap-2"
          >
            <span>Mở Ticket Inbox</span>
            <ArrowUpRight className="w-4 h-4 text-cyan-400" />
          </Link>
        </div>
      </div>

      {/* Mandatory Notice Banner (Matching Page 12 of Proposal) */}
      <div className="p-4 bg-cyan-50/80 border border-cyan-200 rounded-2xl flex items-start gap-3 text-cyan-900 text-xs font-medium">
        <AlertCircle className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-cyan-950">Ghi chú dữ liệu minh họa:</span> Toàn bộ số liệu bên dưới là <strong>Illustrative / Prototype Data</strong>, chỉ nhằm minh họa bố cục dashboard — không phản ánh dữ liệu vận hành thực tế của CT Group.
        </div>
      </div>

      {/* KPI Statistic Cards Grid (Screen 04 Header Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Total Tickets */}
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2 hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Tổng Ticket</span>
            <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 font-bold">
              <BarChart3 className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-slate-900">1,420</span>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-0.5">
              <TrendingUp className="w-3.5 h-3.5" /> +12%
            </span>
          </div>
          <p className="text-xs text-slate-400">Tổng số ghi nhận trong kỳ báo cáo</p>
        </div>

        {/* Open Tickets */}
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2 hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Đang mở (Open)</span>
            <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 font-bold">
              <ShieldAlert className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-amber-600">85</span>
            <span className="text-xs text-slate-400">Đang được xử lý</span>
          </div>
          <p className="text-xs text-slate-400">Yêu cầu chưa đóng trong hệ thống</p>
        </div>

        {/* SLA Performance */}
        <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2 hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">SLA Đạt</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 font-bold">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-emerald-600">96.4%</span>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Đạt KPI</span>
          </div>
          <p className="text-xs text-slate-400">Tỷ lệ ticket xử lý đúng hạn SLA</p>
        </div>

        {/* AI Auto-Resolve */}
        <div className="p-5 bg-gradient-to-br from-slate-900 to-cyan-950 text-white rounded-2xl border border-cyan-500/30 shadow-md space-y-2">
          <div className="flex items-center justify-between text-cyan-300">
            <span className="text-xs font-bold uppercase tracking-wider">AI Auto-Resolve</span>
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold">
              <Bot className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-cyan-300">42%</span>
            <span className="text-xs font-bold text-cyan-400 bg-cyan-500/20 px-2 py-0.5 rounded border border-cyan-500/30">
              Tự động hóa
            </span>
          </div>
          <p className="text-xs text-cyan-200/80">Số ticket được AI tự động giải quyết</p>
        </div>

      </div>

      {/* Main Analytics Grid (Top Issues vs Automation Opportunities) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Top Issues Bar Progress Chart (Screen 04 Section 1) */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Vấn đề phổ biến (Top Issues)</h2>
              <p className="text-xs text-slate-500">Phân bố chủng loại lỗi ghi nhận nhiều nhất</p>
            </div>
            <span className="text-xs font-semibold text-cyan-600 bg-cyan-50 px-2.5 py-1 rounded">CTERP Analytics</span>
          </div>

          <div className="space-y-4">
            {/* Account & IAM */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span>Account & IAM (Khôi phục mật khẩu, phân quyền)</span>
                <span className="text-cyan-700 font-extrabold">38%</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div className="bg-slate-900 h-full rounded-full w-[38%]" />
              </div>
            </div>

            {/* Network / VPN */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span>Network / VPN (Lỗi kết nối Wi-Fi, VPN)</span>
                <span className="text-cyan-700 font-extrabold">25%</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div className="bg-cyan-600 h-full rounded-full w-[25%]" />
              </div>
            </div>

            {/* Microsoft 365 */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span>Microsoft 365 (Outlook, Teams, Sharepoint)</span>
                <span className="text-cyan-700 font-extrabold">18%</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div className="bg-cyan-400 h-full rounded-full w-[18%]" />
              </div>
            </div>

            {/* Hardware */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span>Hardware (Màn hình xanh BSOD, máy in)</span>
                <span className="text-cyan-700 font-extrabold">12%</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div className="bg-slate-400 h-full rounded-full w-[12%]" />
              </div>
            </div>

            {/* Other */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                <span>Khác (Phần mềm chuyên môn)</span>
                <span className="text-slate-500 font-bold">7%</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div className="bg-slate-300 h-full rounded-full w-[7%]" />
              </div>
            </div>
          </div>
        </div>

        {/* Automation Opportunities List (Screen 04 Section 2) */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Cơ hội tự động hóa (Automation Opportunities)</h2>
              <p className="text-xs text-slate-500">Đề xuất ưu tiên AI Bot tự động hóa cho Ban Quản Lý</p>
            </div>
            <Sparkles className="w-5 h-5 text-amber-500" />
          </div>

          <div className="space-y-3">
            {/* Opportunity 1 */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Reset Pass ERP / CTERP Account</h3>
                <p className="text-xs text-slate-500 mt-0.5">Tự động xác thực OTP & reset mật khẩu tự động qua Bot</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold border border-red-200 whitespace-nowrap">
                Ưu tiên cao
              </span>
            </div>

            {/* Opportunity 2 */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Cấp quyền M365 / Sharepoint</h3>
                <p className="text-xs text-slate-500 mt-0.5">Quy trình phê duyệt cấp quyền tự động qua AI Agent API</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold border border-red-200 whitespace-nowrap">
                Ưu tiên cao
              </span>
            </div>

            {/* Opportunity 3 */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Hướng dẫn Kết nối VPN lỗi</h3>
                <p className="text-xs text-slate-500 mt-0.5">Khắc phục sự cố tương tác bằng tài liệu AI RAG Self-Service</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold border border-amber-200 whitespace-nowrap">
                Trung bình
              </span>
            </div>

            {/* Opportunity 4 */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Lỗi Phần cứng & Máy in</h3>
                <p className="text-xs text-slate-500 mt-0.5">Cần sự can thiệp trực tiếp của Kỹ sư IT tại chỗ</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-slate-200 text-slate-700 text-xs font-bold whitespace-nowrap">
                Thấp
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OverViewPage;
