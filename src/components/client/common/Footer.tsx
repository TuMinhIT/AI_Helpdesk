import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import assets from "@/assets/index";

const Footer = () => (
  <footer className="w-full border-t border-slate-800 bg-slate-950 text-white">
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
      <div className="space-y-4 text-sm text-slate-300">
        <div className="flex items-center gap-3">
          <img src={assets.logo} alt="CT Group" className="h-10 w-12 shrink-0 rounded-xl object-cover shadow-md shadow-cyan-600/30" />
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-cyan-400">CT GROUP</span>
            <span className="text-base font-extrabold text-white">CTERP AI IT Copilot</span>
          </div>
        </div>
        <p className="text-xs leading-6 text-slate-400">
          Trợ lý AI hỗ trợ nhân viên tự tra cứu hướng dẫn IT, khắc phục sự cố và tạo yêu cầu hỗ trợ.
        </p>
        <div className="space-y-2 text-xs text-slate-400">
          <div className="flex items-center gap-2"><MapPin size={15} className="shrink-0 text-cyan-400" /> CT Group Head Office</div>
          <div className="flex items-center gap-2"><Mail size={15} className="shrink-0 text-cyan-400" /> it-copilot@ctgroupvietnam.com</div>
          <div className="flex items-center gap-2"><Phone size={15} className="shrink-0 text-cyan-400" /> IT Support Hotline: Ext 108</div>
        </div>
      </div>

      <nav aria-label="Client footer navigation" className="flex flex-col gap-3">
        <p className="mb-1 text-sm font-bold uppercase tracking-wider text-cyan-400">Client workspace</p>
        <Link to="/ask-ai" className="text-sm text-slate-300 transition hover:text-cyan-400">Employee AI Chat / Tạo yêu cầu</Link>
        <Link to="/profile" className="text-sm text-slate-300 transition hover:text-cyan-400">Hồ sơ tài khoản</Link>
        <Link to="/login" className="text-sm text-slate-300 transition hover:text-cyan-400">Đăng nhập CTERP</Link>
      </nav>

      <div className="space-y-3">
        <p className="text-sm font-bold uppercase tracking-wider text-cyan-400">AI hỗ trợ bạn</p>
        <ul className="space-y-2 text-xs leading-5 text-slate-400">
          <li>• Mô tả sự cố bằng ngôn ngữ tự nhiên</li>
          <li>• Tra cứu Knowledge Base và hướng dẫn từng bước</li>
          <li>• Xác nhận tạo ticket sau khi AI phân loại</li>
          <li>• Theo dõi yêu cầu cùng đội IT Support</li>
        </ul>
      </div>
    </div>
    <div className="border-t border-slate-800 bg-slate-900 px-4 py-4 text-center text-xs text-slate-500">
      © 2026 CT Group — CTERP AI IT Copilot Platform
    </div>
  </footer>
);

export default Footer;
