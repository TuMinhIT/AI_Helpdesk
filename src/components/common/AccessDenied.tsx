import { Link } from "react-router-dom";

const AccessDenied = () => (
  <main className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
    <p className="text-sm font-semibold uppercase tracking-wide text-red-500">403</p>
    <h1 className="text-2xl font-bold text-gray-900">Bạn không có quyền truy cập</h1>
    <p className="max-w-md text-gray-600">
      Tài khoản hiện tại không có quyền sử dụng khu vực này.
    </p>
    <Link to="/" className="rounded-lg bg-primary px-5 py-2.5 font-medium text-white hover:bg-blue-700">
      Về trang chủ
    </Link>
  </main>
);

export default AccessDenied;
