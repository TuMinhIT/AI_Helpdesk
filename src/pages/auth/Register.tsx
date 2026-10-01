import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import assets from "@/assets/index";
import authService from "@/services/authService";

const service = authService();

const Register = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setUserName("");
    setEmail("");
    setPassword("");
    setPhoneNumber("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName || !email || password.length < 6) {
      toast.error("Vui lòng nhập đầy đủ và mật khẩu từ 6 ký tự!");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await service.register({ name: userName, email, password, phoneNumber });
      if (result.success) {
        resetForm();
        toast.success(result.message || "Tạo tài khoản thành công!");
        navigate("/login");
      } else {
        toast.error(result.message || "Không thể tạo tài khoản.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Side - Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${assets.logo})` }}
        />
        <div className="absolute inset-0 bg-primary/80" />

        <div className="relative z-10 flex flex-col justify-center items-center text-center px-12 py-20 w-full text-white">
          <div className="mb-8 transform hover:scale-105 transition-transform duration-500">
            <h1 className="text-5xl font-bold mb-4 tracking-wide">
              CTERP AI IT COPILOT
            </h1>
            <div className="w-20 h-1 bg-secondary mx-auto rounded-full"></div>
          </div>

          <p className="text-xl mb-8 leading-relaxed max-w-md">
            Tạo tài khoản để sử dụng Employee AI Chat và các dịch vụ hỗ trợ IT.
          </p>
        </div>
      </div>

      {/* Right Side - Register Form */}
      <div className="w-full lg:w-1/2 flex justify-center items-center p-8">
        <div className="w-full max-w-md">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100"
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-primary mb-2">
                Tạo Tài Khoản
              </h1>
              <p className="text-gray-600">
                Nhập thông tin của bạn để bắt đầu
              </p>
              <div className="w-16 h-1 bg-secondary mx-auto mt-3 rounded-full"></div>
            </div>

            {/* Họ và tên */}
            <div className="flex flex-col mb-4">
              <label className="mb-1 text-gray-600 font-medium">Họ và tên</label>
              <input
                className="pl-3 pr-4 rounded-xl border border-gray-300 w-full py-2.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                type="text"
                required
                placeholder="Nhập họ và tên"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            {/* Email */}
            <div className="flex flex-col mb-4">
              <label className="mb-1 text-gray-600 font-medium">Email</label>
              <input
                className="pl-3 pr-4 rounded-xl border border-gray-300 w-full py-2.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                type="email"
                required
                placeholder="Nhập email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Số điện thoại */}
            <div className="flex flex-col mb-4">
              <label className="mb-1 text-gray-600 font-medium">Số điện thoại</label>
              <input
                className="pl-3 pr-4 rounded-xl border border-gray-300 w-full py-2.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                type="text"
                required
                placeholder="Nhập số điện thoại"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="flex flex-col mb-6">
              <label className="mb-1 text-gray-600 font-medium">Mật khẩu</label>
              <input
                className="pl-3 pr-4 rounded-xl border border-gray-300 w-full py-2.5 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                type="password"
                required
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Điều khoản */}
            <div className="text-sm text-gray-600 mb-6">
              Khi nhấn "Đăng ký", bạn đồng ý với{" "}
              <span className="text-primary font-medium cursor-pointer hover:underline">
                điều khoản dịch vụ
              </span>{" "}
              của chúng tôi.
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="block w-full bg-primary py-3 rounded-xl hover:bg-blue-700 hover:-translate-y-1 transition-all duration-300 text-white font-bold text-lg mb-4 shadow-md"
            >
              {isSubmitting ? "Đang tạo tài khoản..." : "Đăng Ký"}
            </button>

            <div className="flex justify-center items-center text-sm mt-4">
              <span className="text-gray-600">
                Đã có tài khoản?
                <Link to={"/login"} className="ml-2 text-secondary font-semibold hover:text-orange-600 transition-colors">
                  Đăng nhập tại đây
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
