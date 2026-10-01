import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Filter, Clock, ArrowRight, ShieldAlert, Cpu, UserCheck, Bot } from "lucide-react";

interface TicketItem {
  id: string;
  title: string;
  category: "Hardware" | "Network" | "Account" | "M365";
  priority: "Urgent" | "High" | "Medium" | "Low";
  sla: string;
  slaWarning?: boolean;
  assignee: string;
  isAiRouted?: boolean;
  isAutoBot?: boolean;
  createdTime: string;
}

const mockTickets: TicketItem[] = [
  {
    id: "#IT-0128",
    title: "Màn hình xanh BSOD liên tục khi khởi động",
    category: "Hardware",
    priority: "Urgent",
    sla: "45m",
    slaWarning: true,
    assignee: "Kỹ sư Tuấn",
    createdTime: "10 phút trước",
  },
  {
    id: "#IT-0129",
    title: "Không kết nối Wi-Fi (Limited Access)",
    category: "Network",
    priority: "Medium",
    sla: "2h 15m",
    assignee: "AI Routed",
    isAiRouted: true,
    createdTime: "25 phút trước",
  },
  {
    id: "#IT-0130",
    title: "Quên mật khẩu đăng nhập hệ thống CTERP",
    category: "Account",
    priority: "Low",
    sla: "3h 50m",
    assignee: "Auto-Bot",
    isAutoBot: true,
    createdTime: "40 phút trước",
  },
  {
    id: "#IT-0131",
    title: "Cấp quyền truy cập thư mục Sharepoint Dự án",
    category: "M365",
    priority: "Medium",
    sla: "1h 30m",
    assignee: "Kỹ sư Linh",
    createdTime: "1 giờ trước",
  },
  {
    id: "#IT-0132",
    title: "Lỗi kết nối VPN công ty từ xa",
    category: "Network",
    priority: "High",
    sla: "1h 10m",
    assignee: "AI Routed",
    isAiRouted: true,
    createdTime: "1.5 giờ trước",
  },
];

const ITServiceDeskPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const navigate = useNavigate();

  const filteredTickets = mockTickets.filter((t) => {
    const matchesSearch =
      t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.assignee.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCat = selectedCategory === "All" || t.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      {/* Page Title & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-700 bg-cyan-50 px-2.5 py-1 rounded-md border border-cyan-200">
              CTERP Operations
            </span>
            <span className="text-xs text-slate-400">Screen 02</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-1">
            IT Service Desk — Ticket Inbox
          </h1>
          <p className="text-sm text-slate-500">
            Quản lý yêu cầu hỗ trợ, trạng thái SLA đếm ngược và phân luồng xử lý AI Routing
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/ask-ai"
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-bold transition-all shadow-md flex items-center gap-2"
          >
            <Bot className="w-4 h-4 text-cyan-400" />
            <span>Mở Employee Chat</span>
          </Link>
        </div>
      </div>

      {/* Control Bar: Search & Category Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm ticket (Mã ID, tiêu đề, người xử lý)..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white transition-all"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {["All", "Hardware", "Network", "Account", "M365"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-slate-900 text-cyan-400 shadow-sm"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-600"
              }`}
            >
              {cat === "All" ? "Tất cả Category" : cat}
            </button>
          ))}
          <button className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Table Container (Matching Screen 02 Wireframe) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 text-slate-300 text-xs uppercase font-bold tracking-wider border-b border-slate-800">
                <th className="py-4 px-6">Ticket ID</th>
                <th className="py-4 px-6">Tiêu đề yêu cầu</th>
                <th className="py-4 px-6">Phân loại</th>
                <th className="py-4 px-6">Priority</th>
                <th className="py-4 px-6">Thời gian SLA</th>
                <th className="py-4 px-6">Phụ trách</th>
                <th className="py-4 px-6 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-800">
              {filteredTickets.map((ticket) => (
                <tr
                  key={ticket.id}
                  onClick={() => navigate(`/admin/tickets/${ticket.id.replace('#', '')}`)}
                  className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                >
                  {/* Ticket ID */}
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className="font-bold text-slate-900 group-hover:text-cyan-600 transition-colors">
                      {ticket.id}
                    </span>
                    <span className="block text-[11px] text-slate-400 font-normal">
                      {ticket.createdTime}
                    </span>
                  </td>

                  {/* Title */}
                  <td className="py-4 px-6">
                    <p className="font-semibold text-slate-900 line-clamp-1">
                      {ticket.title}
                    </p>
                  </td>

                  {/* Category */}
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200">
                      {ticket.category}
                    </span>
                  </td>

                  {/* Priority Badge */}
                  <td className="py-4 px-6 whitespace-nowrap">
                    {ticket.priority === "Urgent" && (
                      <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 font-bold text-xs border border-red-200 flex items-center gap-1.5 w-fit animate-pulse">
                        <ShieldAlert className="w-3.5 h-3.5 text-red-600" /> Urgent
                      </span>
                    )}
                    {ticket.priority === "High" && (
                      <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 font-bold text-xs border border-amber-200">
                        High
                      </span>
                    )}
                    {ticket.priority === "Medium" && (
                      <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-semibold text-xs border border-blue-200">
                        Medium
                      </span>
                    )}
                    {ticket.priority === "Low" && (
                      <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-medium text-xs border border-slate-200">
                        Low
                      </span>
                    )}
                  </td>

                  {/* SLA Countdown Timer */}
                  <td className="py-4 px-6 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 font-bold text-slate-700">
                      <Clock className={`w-4 h-4 ${ticket.slaWarning ? "text-amber-500 animate-bounce" : "text-slate-400"}`} />
                      <span>{ticket.sla}</span>
                      {ticket.slaWarning && (
                        <span className="text-amber-600 font-bold text-xs" title="Sắp hết hạn SLA!">
                          ⚠️
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Assignee / Routing Tag */}
                  <td className="py-4 px-6 whitespace-nowrap">
                    {ticket.isAiRouted && (
                      <span className="px-3 py-1 rounded-full bg-cyan-50 text-cyan-700 text-xs font-bold border border-cyan-200 flex items-center gap-1 w-fit">
                        <Bot className="w-3.5 h-3.5 text-cyan-600" /> AI Routed
                      </span>
                    )}
                    {ticket.isAutoBot && (
                      <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold border border-purple-200 flex items-center gap-1 w-fit">
                        <Cpu className="w-3.5 h-3.5 text-purple-600" /> Auto-Bot
                      </span>
                    )}
                    {!ticket.isAiRouted && !ticket.isAutoBot && (
                      <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold flex items-center gap-1 w-fit">
                        <UserCheck className="w-3.5 h-3.5 text-slate-500" /> {ticket.assignee}
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-6 text-right whitespace-nowrap">
                    <Link
                      to={`/admin/tickets/${ticket.id.replace('#', '')}`}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-700 text-xs font-bold transition-all inline-flex items-center gap-1"
                    >
                      <span>Phân tích Copilot</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer info */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
          <span>Hiển thị {filteredTickets.length} / {mockTickets.length} Ticket trong hệ thống CTERP</span>
          <span className="font-semibold text-slate-700">Tự động cập nhật theo thời gian thực ⚡</span>
        </div>
      </div>
    </div>
  );
};

export default ITServiceDeskPage;
