import { useEffect, useState } from "react";
import {
  Edit,
  Save,
  X,
  User,
  Camera,
  Mail,
  Phone,
  UserCircle,
  Calendar,
} from "lucide-react";
import Spinner from "@/components/common/Spinner";
import assets from "@/assets/index";
import SecurityTab from "./SecurityTab";
import { userService } from "@/services/userService";
import type { Profile } from "@/types/userType";


const ProfileTab = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState<Profile | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [draft, setDraft] = useState<Profile | undefined>();
  const userInfo = data;

  useEffect(() => {
    let active = true;
    void userService.getProfile().then((profile) => {
      if (active) {
        setData(profile);
        setIsLoading(false);
      }
    });
    return () => { active = false; };
  }, []);

  const startEditing = () => {
    setDraft(data);
    setIsEditing(true);
  };

  const updateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft) return;
    setIsLoading(true);
    const updated = await userService.updateProfile(draft);
    setData(updated);
    setIsEditing(false);
    setIsLoading(false);
  };

  return (
    <>
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="relative overflow-hidden border-gray-300 mb-5 pb-5">
          <div className="p-4 flex flex-col sm:flex-row items-center sm:items-start sm:space-x-6 text-center sm:text-left">
            {/* Avatar */}
            <div className="relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border border-gray-200">
                <img
                  src={assets.logo}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 p-1 bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 transition">
                <Camera className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {/* Thông tin */}
            <div className="mt-3 sm:mt-0">
              <h1 className="text-lg font-semibold text-gray-900 mb-0">
                {userInfo?.name || "Chưa cập nhật"}
              </h1>
              <p className="text-sm text-gray-600">{userInfo?.email || ""}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-start gap-4 mb-6">
          <div className="flex items-center space-x-3">
            <h2 className="text-xl font-bold text-gray-900">Chi tiết hồ sơ</h2>
            {isLoading && (
              <div className="ml-2 scale-75 origin-left">
                <Spinner />
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={startEditing}
            className="flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-full"
          >
            <Edit className="w-6 h-6" />
          </button>
        </div>

        {/* Read-only View */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 sm:p-6 rounded-xl">
          <div className="space-y-1">
            <label className="flex items-center space-x-2 text-sm text-gray-500 font-medium">
              <User className="w-4 h-4 text-gray-400" />
              <span>Họ và tên</span>
            </label>
            <p className="text-base font-semibold text-gray-900 px-1">
              {userInfo?.name || "Chưa cập nhật"}
            </p>
          </div>

          <div className="space-y-1">
            <label className="flex items-center space-x-2 text-sm text-gray-500 font-medium">
              <Mail className="w-4 h-4 text-gray-400" />
              <span>Email</span>
            </label>
            <p className="text-base font-semibold text-gray-900 px-1">
              {userInfo?.email || "Chưa cập nhật"}
            </p>
          </div>

          <div className="space-y-1">
            <label className="flex items-center space-x-2 text-sm text-gray-500 font-medium">
              <Phone className="w-4 h-4 text-gray-400" />
              <span>Số điện thoại</span>
            </label>
            <p className="text-base font-semibold text-gray-900 px-1">
              {userInfo?.phoneNumber || "Chưa cập nhật"}
            </p>
          </div>

          <div className="space-y-1">
            <label className="flex items-center space-x-2 text-sm text-gray-500 font-medium">
              <UserCircle className="w-4 h-4 text-gray-400" />
              <span>Giới tính</span>
            </label>
            <p className="text-base font-semibold text-gray-900 px-1">
              {userInfo?.gender || "Chưa cập nhật"}
            </p>
          </div>

          <div className="space-y-1">
            <label className="flex items-center space-x-2 text-sm text-gray-500 font-medium">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span>Ngày sinh</span>
            </label>
            <p className="text-base font-semibold text-gray-900 px-1">
              {userInfo?.dob
                ? new Date(userInfo.dob).toLocaleDateString("vi-VN")
                : "Chưa cập nhật"}
            </p>
          </div>
        </div>

        {/* Edit Modal Overlay */}
        {isEditing && (
          <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 overflow-hidden flex flex-col max-h-[90vh]">
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Edit className="w-5 h-5 text-primary" />

                </h3>Cập nhật thông tin hồ sơ
                <button
                  onClick={() => setIsEditing(false)}
                  className="p-2 rounded-full hover:bg-gray-200 text-gray-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto">
                <form id="edit-profile-form" onSubmit={updateProfile} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-sm font-bold text-gray-700">
                        <User className="w-4 h-4 text-gray-400" />
                        <span>Họ và tên</span>
                      </label>
                      <input
                        type="text"
                        value={draft?.name || ""}
                        onChange={(e) =>
                          setDraft(prev => prev ? { ...prev, name: e.target.value } : undefined)
                        }
                        required
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-primary rounded-xl outline-none transition-all duration-200"
                        placeholder="Nhập họ và tên"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-sm font-bold text-gray-700">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span>Email</span>
                      </label>
                      <input
                        type="email"
                        value={userInfo?.email || ""}
                        disabled={true}
                        className="w-full px-4 py-3 rounded-xl outline-none transition-all duration-200 border-2 border-transparent bg-gray-100 text-gray-500 cursor-not-allowed"
                        placeholder="Nhập email"
                      />
                      <p className="text-xs text-gray-400 mt-1">
                        Email không thể thay đổi
                      </p>
                    </div>

                    {/* Phone Field */}
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-sm font-bold text-gray-700">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span>Số điện thoại</span>
                      </label>
                      <input
                        type="tel"
                        value={draft?.phoneNumber || ""}
                        onChange={(e) =>
                          setDraft(prev => prev ? { ...prev, phoneNumber: e.target.value } : undefined)
                        }
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-primary rounded-xl outline-none transition-all duration-200"
                        placeholder="Nhập số điện thoại"
                      />
                    </div>

                    {/* Gender Field */}
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-sm font-bold text-gray-700">
                        <UserCircle className="w-4 h-4 text-gray-400" />
                        <span>Giới tính</span>
                      </label>
                      <select
                        value={draft?.gender == null ? "Nam" : draft.gender}
                        onChange={(e) =>
                          setDraft(prev => prev ? { ...prev, gender: e.target.value } : undefined)
                        }
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-primary rounded-xl outline-none transition-all duration-200 appearance-none cursor-pointer"
                      >
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                        <option value="Khác">Khác</option>
                      </select>
                    </div>

                    {/* Date of Birth Field */}
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-sm font-bold text-gray-700">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>Ngày sinh</span>
                      </label>
                      <input
                        type="date"
                        value={draft?.dob || ""}
                        onChange={(e) =>
                          setDraft(prev => prev ? { ...prev, dob: e.target.value } : undefined)
                        }
                        className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-primary rounded-xl outline-none transition-all duration-200 cursor-text"
                      />
                    </div>
                  </div>
                </form>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-gray-100 flex justify-end space-x-3 bg-gray-50/50">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2.5 bg-white text-gray-700 rounded-xl hover:bg-gray-100 transition-all duration-200 font-medium border border-gray-200"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  form="edit-profile-form"
                  className="px-6 py-2.5 bg-primary text-white rounded-xl hover:bg-blue-700 transition-all duration-300 font-medium shadow-md hover:shadow-lg disabled:opacity-70 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Lưu thay đổi</span>
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between items-start pt-8 flex-col">
          <div className="flex items-center space-x-3">
            <h2 className="text-xl font-bold text-gray-900">Bảo mật</h2>
          </div>
          <SecurityTab />
        </div>
      </div >
    </>
  );
};

export default ProfileTab;
