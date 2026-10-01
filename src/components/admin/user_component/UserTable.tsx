import { useState } from "react";
import assets from "@/assets/index";
import type { User } from "@/types/userType";

type UserTableProps = {
  displayed: User[];
  loading: boolean;
};

const UserTable = ({ displayed, loading }: UserTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.max(1, Math.ceil(displayed.length / itemsPerPage));
  const currentData = displayed.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  if (loading) return <div className="flex min-h-56 items-center justify-center"><span className="text-sm text-slate-500">Đang tải người dùng...</span></div>;

  return <><div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm"><table className="w-full min-w-[900px] text-left text-sm"><thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500"><tr><th className="px-5 py-4">Người dùng</th><th className="px-5 py-4">Liên hệ</th><th className="px-5 py-4">Vai trò</th><th className="px-5 py-4">Giới tính / Ngày sinh</th><th className="px-5 py-4">Trạng thái</th></tr></thead><tbody className="divide-y divide-slate-100">{currentData.map((user) => <tr key={user.id} className="hover:bg-slate-50/70"><td className="px-5 py-4"><div className="flex items-center gap-3"><img src={user.avatar || assets.logo} alt={user.name} className="h-10 w-10 rounded-full border border-slate-100 bg-slate-50 object-cover" /><div><p className="font-semibold text-slate-800">{user.name || "Chưa cập nhật"}</p><p className="mt-1 text-xs text-slate-400">ID: {user.id.slice(0, 8)}…</p></div></div></td><td className="px-5 py-4"><p className="text-slate-700">{user.email}</p><p className="mt-1 text-xs text-slate-500">{user.phoneNumber || "Chưa có số điện thoại"}</p></td><td className="px-5 py-4"><span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">{user.role || "User"}</span></td><td className="px-5 py-4 text-slate-600">{user.gender || "-"}<span className="mx-2 text-slate-300">·</span>{user.dob ? new Date(user.dob).toLocaleDateString("vi-VN") : "-"}</td><td className="px-5 py-4"><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${user.isActive === false ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700"}`}>{user.isActive === false ? "Vô hiệu hóa" : "Hoạt động"}</span></td></tr>)}{currentData.length === 0 && <tr><td colSpan={5} className="px-5 py-14 text-center text-slate-500">Không tìm thấy người dùng.</td></tr>}</tbody></table></div>{totalPages > 1 && <div className="flex items-center justify-center gap-3 pt-4"><button type="button" onClick={() => setCurrentPage((page) => Math.max(1, page - 1))} disabled={currentPage === 1} className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm disabled:opacity-40">Trước</button><span className="text-sm text-slate-500">Trang {currentPage} / {totalPages}</span><button type="button" onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))} disabled={currentPage === totalPages} className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm disabled:opacity-40">Sau</button></div>}</>;
};

export default UserTable;
