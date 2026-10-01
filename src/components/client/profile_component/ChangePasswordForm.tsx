import { useState, type FormEvent } from "react";
import { toast } from "react-toastify";
import { Lock, Key, AlertTriangle, CheckCircle2, Shield } from "lucide-react";
import Spinner from "@/components/common/Spinner";
type ChangePasswordFormProps = {
  setShowEdit: (open: boolean) => void;
};

const ChangePasswordForm = ({ setShowEdit }: ChangePasswordFormProps) => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });


  const handleChangePassword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp!");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error("Mật khẩu mới phải có ít nhất 6 ký tự!");
      return;
    }
    const confirmed = window.confirm(
      "Bạn có chắc chắn muốn đổi mật khẩu không?"
    );
    if (confirmed) {
      // call hook 
    }
  };

  const isPending = false;

  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, text: "", color: "" };

    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    const levels = [
      { text: "Rất yếu", color: "bg-red-500" },
      { text: "Yếu", color: "bg-orange-500" },
      { text: "Trung bình", color: "bg-yellow-500" },
      { text: "Mạnh", color: "bg-blue-500" },
      { text: "Rất mạnh", color: "bg-green-500" },
    ];

    return { strength, ...levels[Math.min(strength - 1, 4)] };
  };
  return (
    <>
      {isPending && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-white/50 backdrop-blur-sm">
          <Spinner />
        </div>
      )}

      {/* Modal Overlay */}
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
        <div className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-md shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
          <button
            onClick={() => {
              setShowEdit(false);
              setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
            }}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Lock className="w-5 h-5 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Đổi mật khẩu</h3>
          </div>

          <form onSubmit={handleChangePassword} className="space-y-6">
            {/* Current Password */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-3">
                <Lock className="w-4 h-4 text-indigo-600" />
                <span>Mật khẩu hiện tại</span>
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      currentPassword: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-primary rounded-xl outline-none transition-all duration-200"
                  placeholder="Nhập mật khẩu hiện tại"
                  required
                />
              </div>
            </div>

            {/* New Password */}
            <div>
              <div className="flex flex-row justify-between">
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-3">
                  <Key className="w-4 h-4 text-indigo-600" />
                  <span>Mật khẩu mới</span>
                </label>
                {/* Password Strength Indicator */}
                {passwordData.newPassword && (
                  <div className="mt-3">
                    <span
                      className={`flex-end flex text-sm font-medium  text-blue-600 `}
                    >
                      {getPasswordStrength(passwordData.newPassword).text}
                    </span>
                  </div>
                )}
              </div>

              <div className="relative">
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-primary rounded-xl outline-none transition-all duration-200"
                  placeholder="Nhập mật khẩu mới"
                  required
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700 mb-3">
                <Key className="w-4 h-4 text-indigo-600" />
                <span>Xác nhận mật khẩu mới</span>
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className={`w-full px-4 py-3 bg-gray-50 border-2 outline-none rounded-xl transition-all duration-200 ${passwordData.confirmPassword && passwordData.newPassword !== passwordData.confirmPassword
                      ? "border-red-300 focus:border-red-500 focus:bg-white"
                      : "border-transparent focus:bg-white focus:border-primary"
                    }`}
                  placeholder="Xác nhận mật khẩu mới"
                  required
                />
              </div>

              {passwordData.confirmPassword && (
                <div className="mt-2 flex items-center space-x-2">
                  {passwordData.newPassword === passwordData.confirmPassword ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-600">
                        Mật khẩu khớp
                      </span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-red-600">
                        Mật khẩu không khớp
                      </span>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-6 mt-6 border-t border-gray-100">
              <button
                type="button"
                onClick={() => {
                  setShowEdit(false);
                  setPasswordData({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                  });
                }}
                className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={passwordData.newPassword !== passwordData.confirmPassword || !passwordData.newPassword}
                className="px-5 py-2.5 bg-primary text-white rounded-xl hover:bg-blue-700 transition-all duration-300 font-medium shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Shield className="w-4 h-4" />
                <span>Cập nhật mật khẩu</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangePasswordForm;
