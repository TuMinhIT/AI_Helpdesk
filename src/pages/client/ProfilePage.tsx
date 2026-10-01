import { Settings } from "lucide-react";
import ProfileTab from "@/components/client/profile_component/ProfileTab";


const ProfilePage = () => {

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-100 bg-white">
            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Settings className="w-6 h-6 text-primary" />
              Cài đặt tài khoản
            </h3>
          </div>

          <div className="flex flex-col md:flex-row">
            <div className="flex-1 p-6 md:p-8 bg-white min-h-[500px]">
              <ProfileTab />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
