import { useState } from "react";
import { Key } from "lucide-react";
import ChangePasswordForm from "./ChangePasswordForm";
import { AUTH_FEATURES } from "@/app/authFeatures";

const SecurityTab = () => {
  const [showEdit, setShowEdit] = useState(false);

  return (
    <div className="w-full pt-3">
      {!AUTH_FEATURES.changePassword && (
        <p className="rounded-xl bg-gray-50 p-4 text-sm text-gray-500">
          Tính năng đổi mật khẩu sẽ khả dụng sau khi backend cung cấp API tương ứng.
        </p>
      )}
      {AUTH_FEATURES.changePassword && (
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <button
          onClick={() => setShowEdit(true)}
          className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 bg-blue-50 text-primary rounded-xl hover:bg-blue-100 transition-all duration-300 font-medium"
        >
          <Key className="w-4 h-4" />
          <span>Đổi mật khẩu</span>
        </button>
      </div>
      )}

      {showEdit && <ChangePasswordForm setShowEdit={setShowEdit} />}
    </div>
  );
};

export default SecurityTab;
