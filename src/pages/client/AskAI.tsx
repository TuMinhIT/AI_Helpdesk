import { useEffect, useRef, useState } from "react";
import { Bot, Send, Sparkles, User, FileText, CheckCircle2, ArrowRight, ShieldCheck, HelpCircle, Layers, Ticket } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/app/store/authStore";
import { getAdminWorkspacePath, hasAllowedRole, IT_ENGINEER_ROLES } from "@/components/admin/common/adminRoles";

type ChatMessage = {
  id: string;
  sender: "ai" | "user";
  text: string;
  timestamp: string;
  troubleshootSteps?: string[];
  ragSource?: string;
  ticketProposal?: {
    issue: string;
    category: string;
    priority: "Urgent" | "High" | "Medium" | "Low";
    location: string;
  };
  createdTicketId?: string;
};

const initialMessages: ChatMessage[] = [
  {
    id: "m1",
    sender: "ai",
    text: "Xin chào! Tôi là CT IT Copilot. Tôi có thể hỗ trợ gì cho bạn hôm nay?",
    timestamp: "09:00",
  },
  {
    id: "m2",
    sender: "user",
    text: "Laptop của tôi không kết nối được Wi-Fi từ sáng nay.",
    timestamp: "09:01",
  },
  {
    id: "m3",
    sender: "ai",
    text: "Tôi hiểu bối cảnh sự cố kết nối mạng của bạn. Dựa trên tri thức IT SOP của CT Group, bạn hãy thử các bước sau:",
    timestamp: "09:01",
    troubleshootSteps: [
      "1. Tắt/bật lại Wi-Fi adapter trên máy tính.",
      "2. Quên mạng 'CTGroup-Staff' và nhập lại mật khẩu xác thực.",
    ],
    ragSource: "IT SOP - Network Troubleshooting (Đã kiểm chứng)",
  },
  {
    id: "m4",
    sender: "user",
    text: "Vẫn không vào được mạng, báo Limited Access.",
    timestamp: "09:02",
  },
  {
    id: "m5",
    sender: "ai",
    text: "Tôi đã tổng hợp thông tin sự cố để khởi tạo Ticket hỗ trợ kỹ thuật viên:",
    timestamp: "09:02",
    ticketProposal: {
      issue: "Wi-Fi Connectivity (Limited Access)",
      category: "Network",
      priority: "Medium",
      location: "CT Group Head Office - Tầng 4",
    },
  },
];

const presetQuestions = [
  "Laptop của tôi không kết nối được Wi-Fi",
  "Cần khôi phục mật khẩu tài khoản CTERP",
  "Hướng dẫn cấu hình kết nối VPN làm việc từ xa",
  "Máy tính bị treo và báo lỗi màn hình xanh (BSOD)",
];

const AskAI = () => {
  const { user } = useAuth();
  const canAccessITWorkspace = hasAllowedRole(user?.role, IT_ENGINEER_ROLES);
  const adminWorkspacePath = getAdminWorkspacePath(user?.role);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState<"chat" | "troubleshoot" | "kb" | "ticket">("chat");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const messageSequenceRef = useRef(0);

  const nextMessageId = (sender: ChatMessage["sender"]) => {
    messageSequenceRef.current += 1;
    return `${sender}-${messageSequenceRef.current}`;
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    const query = text.trim();
    if (!query || isTyping) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = {
      id: nextMessageId("user"),
      sender: "user",
      text: query,
      timestamp: timeStr,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      let responseMsg: ChatMessage;

      if (query.toLowerCase().includes("vẫn không") || query.toLowerCase().includes("lỗi") || query.toLowerCase().includes("tạo ticket")) {
        responseMsg = {
          id: nextMessageId("ai"),
          sender: "ai",
          text: "Tôi đã thu thập đủ dữ liệu sự cố để chuyển giao cho IT Support.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          ticketProposal: {
            issue: query,
            category: query.toLowerCase().includes("wifi") || query.toLowerCase().includes("mạng") ? "Network" : "Hardware",
            priority: "Medium",
            location: "CT Group Head Office - Tầng 4",
          },
        };
      } else {
        responseMsg = {
          id: nextMessageId("ai"),
          sender: "ai",
          text: "Tôi đã phân tích yêu cầu của bạn. Dưới đây là quy trình xử lý theo tài liệu IT SOP:",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          troubleshootSteps: [
            "1. Kiểm tra lại thông tin tài khoản và kết nối mạng nội bộ.",
            "2. Đảm bảo dịch vụ chứng thực MFA đã hoạt động trên thiết bị.",
            "3. Thử khởi động lại ứng dụng hoặc hệ thống CTERP.",
          ],
          ragSource: "IT SOP - Enterprise User Management Guide",
        };
      }

      setMessages((prev) => [...prev, responseMsg]);
      setIsTyping(false);
    }, 1000);
  };

  const handleConfirmTicket = (msgId: string) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === msgId) {
          return {
            ...msg,
            createdTicketId: "#IT-2026-0129",
          };
        }
        return msg;
      })
    );
  };

  return (
    <div className="min-h-[calc(100dvh-4rem)] overflow-x-hidden bg-slate-100 px-2 py-3 sm:px-6 sm:py-5 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100dvh-7rem)] max-w-7xl grid-cols-1 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl lg:min-h-[780px] lg:grid-cols-12 lg:gap-6">
        
        {/* Left Navigation Panel (Screen 01 - Wireframe Sidebar) */}
        <div className="flex flex-col justify-between border-b border-slate-800 bg-slate-900 p-4 text-slate-300 sm:p-5 lg:col-span-3 lg:border-b-0 lg:border-r">
          <div>
            {/* Header Badge */}
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4 sm:pb-6">
              <div className="w-10 h-10 rounded-xl bg-cyan-600 flex items-center justify-center text-white shadow-lg shadow-cyan-600/30">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-base font-bold text-white leading-tight">CTERP AI Copilot</h2>
                <p className="text-xs text-cyan-400 font-medium">Employee AI Assistant</p>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="mt-4 space-y-1.5 sm:mt-6 sm:space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 px-3 mb-2">
                Chức năng cốt lõi
              </div>
              
              <button
                onClick={() => setActiveTab("chat")}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition-all sm:px-4 sm:py-3 ${
                  activeTab === "chat"
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                    : "hover:bg-slate-800 text-slate-400"
                }`}
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>AI Conversation</span>
              </button>

              <button
                onClick={() => setActiveTab("troubleshoot")}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition-all sm:px-4 sm:py-3 ${
                  activeTab === "troubleshoot"
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                    : "hover:bg-slate-800 text-slate-400"
                }`}
              >
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Troubleshooting</span>
              </button>

              <button
                onClick={() => setActiveTab("kb")}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition-all sm:px-4 sm:py-3 ${
                  activeTab === "kb"
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                    : "hover:bg-slate-800 text-slate-400"
                }`}
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>Knowledge Base</span>
              </button>

              <button
                onClick={() => setActiveTab("ticket")}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition-all sm:px-4 sm:py-3 ${
                  activeTab === "ticket"
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                    : "hover:bg-slate-800 text-slate-400"
                }`}
              >
                <Ticket className="w-4 h-4 text-cyan-400" />
                <span>Create Ticket</span>
              </button>
            </div>
          </div>

          {/* IT Service Desk quick link */}
          {canAccessITWorkspace && (
            <div className="mt-4 border-t border-slate-800 pt-4 sm:pt-6">
              <Link
                to={adminWorkspacePath}
                className="flex items-center justify-between rounded-xl bg-slate-800/80 p-3 text-xs font-semibold text-slate-300 transition-colors hover:bg-slate-800"
              >
                <span>Xem IT Service Desk</span>
                <ArrowRight className="h-4 w-4 text-cyan-400" />
              </Link>
            </div>
          )}
        </div>

        {/* Main Conversation Area (Screen 01 Layout) */}
        <div className="flex min-h-0 flex-col bg-slate-50/50 lg:col-span-9">
          
          {/* Top Chat Header */}
          <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-white p-4 shadow-xs sm:p-5">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <div>
                <h1 className="text-lg font-bold text-slate-900">Screen 01 — Employee AI Chat</h1>
                <p className="text-xs text-slate-500">Tương tác tự nhiên & Khắc phục sự cố IT theo thời gian thực</p>
              </div>
            </div>
            <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-cyan-50 text-cyan-700 text-xs font-bold border border-cyan-200">
              CTERP App Prototype
            </span>
          </div>

          {/* Chat Stream View */}
          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-3 sm:p-6">
            {messages.map((msg) => {
              const isUser = msg.sender === "user";
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-white font-bold shadow-sm ${
                      isUser ? "bg-slate-900" : "bg-cyan-600"
                    }`}
                  >
                    {isUser ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                  </div>

                  {/* Message Bubble Container */}
                  <div className="max-w-[88%] space-y-2 sm:max-w-[75%]">
                    <div
                      className={`p-4 rounded-2xl text-sm leading-relaxed shadow-xs ${
                        isUser
                          ? "bg-slate-900 text-white rounded-tr-none"
                          : "bg-white border border-slate-200 text-slate-800 rounded-tl-none"
                      }`}
                    >
                      <p>{msg.text}</p>

                      {/* RAG & Troubleshooting Guide Block */}
                      {msg.troubleshootSteps && (
                        <div className="mt-3 p-3.5 bg-cyan-50/80 border border-cyan-200 rounded-xl space-y-2 text-slate-900">
                          <div className="font-bold text-cyan-900 text-xs uppercase tracking-wide flex items-center gap-1.5">
                            <ShieldCheck className="w-4 h-4 text-cyan-600" />
                            Khắc phục sự cố:
                          </div>
                          <ul className="space-y-1 text-xs text-slate-700 font-medium pl-1">
                            {msg.troubleshootSteps.map((step, idx) => (
                              <li key={idx}>{step}</li>
                            ))}
                          </ul>
                          {msg.ragSource && (
                            <div className="pt-2 border-t border-cyan-200/60 text-[11px] text-cyan-700 font-medium flex items-center gap-1">
                              <FileText className="w-3.5 h-3.5" />
                              <span>Nguồn: {msg.ragSource}</span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Interactive Ticket Creation Proposal Block */}
                      {msg.ticketProposal && (
                        <div className="mt-3 p-4 bg-slate-900 text-white rounded-xl space-y-3 border border-slate-800 shadow-md">
                          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                              Phiếu hỗ trợ đề xuất:
                            </span>
                            <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[11px] font-semibold border border-amber-500/30">
                              {msg.ticketProposal.priority} Priority
                            </span>
                          </div>

                          <div className="space-y-1.5 text-xs text-slate-300">
                            <p>• <strong className="text-white">Issue:</strong> {msg.ticketProposal.issue}</p>
                            <p>• <strong className="text-white">Category:</strong> {msg.ticketProposal.category}</p>
                            <p>• <strong className="text-white">Địa điểm:</strong> {msg.ticketProposal.location}</p>
                          </div>

                          {msg.createdTicketId ? (
                            <div className="p-3 bg-emerald-950/80 border border-emerald-500/40 rounded-lg text-emerald-300 text-xs flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                              <span>
                                Đã xác nhận tạo thành công Ticket <strong className="text-white">{msg.createdTicketId}</strong> (Đã routing tới Network Team).
                              </span>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleConfirmTicket(msg.id)}
                              className="w-full py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                              Xác nhận tạo Ticket
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <span className="text-[11px] text-slate-400 block px-1">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex gap-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-600 flex items-center justify-center text-white">
                  <Bot className="w-5 h-5" />
                </div>
                <div className="p-4 bg-white border border-slate-200 rounded-2xl rounded-tl-none shadow-xs flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce delay-150" />
                  <div className="w-2 h-2 rounded-full bg-cyan-500 animate-bounce delay-300" />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Presets & Input Bar */}
          <div className="space-y-3 border-t border-slate-200 bg-white p-3 sm:p-4">
            {/* Presets */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-xs font-semibold text-slate-400 whitespace-nowrap flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5" /> Gợi ý:
              </span>
              {presetQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-cyan-50 hover:text-cyan-700 text-slate-600 text-xs font-medium whitespace-nowrap transition-colors border border-slate-200"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(input);
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Mô tả sự cố hoặc câu hỏi cần IT hỗ trợ..."
                className="flex-1 bg-slate-100 text-slate-900 px-4 py-3 rounded-xl text-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:bg-white transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="flex shrink-0 items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-50 sm:px-5"
              >
                <span>Gửi</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AskAI;
