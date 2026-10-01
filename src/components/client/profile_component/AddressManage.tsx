import { MapPin, PlusCircle, Trash2, Home } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Spinner from "@/components/common/Spinner";
import { addressService } from "@/services/addressService";
import type { Address } from "@/types/AddressType";

const AddressManage = ({ user_id }: { user_id: string }) => {
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [addressDraft, setAddressDraft] = useState({
    label: "",
    detail: "",
    phone: "",
    isDefault: false,
  });

  const [addressData, setAddressData] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user_id) return;
    let active = true;
    void addressService.getByUser(user_id).then((addresses) => {
      if (active) {
        setAddressData(addresses);
        setIsLoading(false);
      }
    });
    return () => { active = false; };
  }, [user_id]);

  const loadAddresses = async () => {
    const addresses = await addressService.getByUser(user_id);
    setAddressData(addresses);
    setIsLoading(false);
  };

  const saveAddress = async () => {
    if (addressDraft.label === "" || addressDraft.detail === "" || addressDraft.phone === "") {
      toast.warning("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    setIsLoading(true);
    await addressService.add(user_id, addressDraft);
    await loadAddresses();
    setIsAddingAddress(false);
    setAddressDraft({ label: "", detail: "", phone: "", isDefault: false });
    toast.success("Thêm địa chỉ thành công!");
  };

  return (
    <div className="w-full">
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-sm">
          <Spinner />
        </div>
      )}
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <label className="flex items-center space-x-2 text-lg font-bold text-gray-900">
          <MapPin className="w-5 h-5 text-primary" />
          <span>Sổ địa chỉ</span>
        </label>
        <button
          type="button"
          onClick={() => {
            setIsAddingAddress(!isAddingAddress);
            setAddressDraft({
              label: "",
              detail: "",
              phone: "",
              isDefault: false,
            });
          }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-primary font-medium rounded-xl hover:bg-blue-100 transition-colors"
        >
          <PlusCircle className="w-4 h-4" /> 
          <span>Thêm địa chỉ mới</span>
        </button>
      </div>

      <div className="space-y-4">
        {addressData && addressData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addressData.map((addr, idx) => {
              const addressId = addr.id;
              return (
              <div
                key={addressId || idx}
                className={`relative p-5 rounded-2xl border transition-all duration-300 ${
                  addr.isDefault 
                    ? "border-blue-200 bg-blue-50/30 shadow-sm" 
                    : "border-gray-100 bg-white hover:border-gray-300 hover:shadow-md"
                }`}
              >
                {addr.isDefault && (
                  <div className="absolute top-0 right-0 px-3 py-1 bg-primary text-white text-xs font-semibold rounded-bl-lg rounded-tr-2xl shadow-sm">
                    Mặc định
                  </div>
                )}
                
                <div className="flex items-start gap-3 mb-2">
                  <div className="mt-1 p-1.5 bg-gray-100 rounded-lg text-gray-600">
                    <Home className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">
                      {addr.label || `Địa chỉ ${idx + 1}`}
                    </div>
                    {addr.phone && (
                      <div className="text-sm font-medium text-gray-600 mt-0.5">
                        {addr.phone}
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-sm text-gray-600 mt-3 mb-4 line-clamp-2 min-h-[40px]">
                  {addr.detail || "Chưa có mô tả địa chỉ"}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  {!addr.isDefault ? (
                    <button
                      type="button"
                      onClick={async () => {
                        if (!addressId) return;
                        setIsLoading(true);
                        await addressService.setDefault(user_id, addressId);
                        await loadAddresses();
                      }}
                      className="text-sm font-medium text-primary hover:text-blue-700 transition-colors"
                    >
                      Đặt mặc định
                    </button>
                  ) : (
                    <div></div> // Empty div to keep flex-between spacing
                  )}

                  <button
                    type="button"
                    onClick={async () => {
                      if (!addressId) return;
                      setIsLoading(true);
                      await addressService.remove(user_id, addressId);
                      await loadAddresses();
                      toast.success("Đã xóa địa chỉ.");
                    }}
                    className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                    title="Xóa địa chỉ"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              );
            })}
          </div>
        ) : (
          !isAddingAddress && (
            <div className="text-center py-10 px-4 bg-gray-50 border border-gray-100 rounded-2xl border-dashed">
              <MapPin className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">Bạn chưa lưu địa chỉ nào</p>
              <p className="text-sm text-gray-400 mt-1">Thêm địa chỉ để thuận tiện hơn cho việc đặt dịch vụ</p>
            </div>
          )
        )}

        {isAddingAddress && (
          <div className="p-6 border border-gray-200 rounded-2xl bg-white shadow-sm mt-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Thêm địa chỉ mới</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">Tên gợi nhớ</label>
                  <input
                    type="text"
                    value={addressDraft.label}
                    onChange={(e) => setAddressDraft((s) => ({ ...s, label: e.target.value }))}
                    placeholder="VD: Nhà, Cơ quan..."
                    className="w-full px-4 py-2.5 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-primary rounded-xl outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-700">Số điện thoại</label>
                  <input
                    type="tel"
                    value={addressDraft.phone}
                    onChange={(e) => setAddressDraft((s) => ({ ...s, phone: e.target.value }))}
                    maxLength={10}
                    placeholder="Số điện thoại liên hệ"
                    className="w-full px-4 py-2.5 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-primary rounded-xl outline-none transition-all"
                  />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Địa chỉ chi tiết</label>
                <textarea
                  rows={3}
                  value={addressDraft.detail}
                  onChange={(e) => setAddressDraft((s) => ({ ...s, detail: e.target.value }))}
                  placeholder="Số nhà, tên đường, phường/xã, quận/huyện..."
                  className="w-full px-4 py-2.5 bg-gray-50 border-2 border-transparent focus:bg-white focus:border-primary rounded-xl outline-none transition-all resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-colors ${
                    addressDraft.isDefault ? "bg-primary border-primary" : "border-gray-300 group-hover:border-primary"
                  }`}>
                    {addressDraft.isDefault && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                  </div>
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={addressDraft.isDefault}
                    onChange={(e) => setAddressDraft((s) => ({ ...s, isDefault: e.target.checked }))}
                  />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Đặt làm địa chỉ mặc định</span>
                </label>
                
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingAddress(false);
                      setAddressDraft({ label: "", detail: "", phone: "", isDefault: false });
                    }}
                    className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    Hủy
                  </button>
                  <button
                    type="button"
                    onClick={() => saveAddress()}
                    className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl font-medium text-white bg-primary hover:bg-blue-700 shadow-md hover:shadow-lg transition-all"
                  >
                    Lưu địa chỉ
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressManage;
