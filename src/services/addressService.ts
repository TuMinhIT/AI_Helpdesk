import type { Address, AddressInput } from "@/types/AddressType";

const addressesByUser: Record<string, Address[]> = {
  "usr-employee-01": [
    {
      id: "address-demo-01",
      label: "Văn phòng",
      detail: "CT Group Head Office - Tầng 4",
      phone: "0977 111 222",
      isDefault: true,
    },
  ],
};

export const addressService = {
  getByUser: async (userId: string): Promise<Address[]> =>
    (addressesByUser[userId] ?? []).map((address) => ({ ...address })),

  add: async (userId: string, input: AddressInput): Promise<Address> => {
    const next: Address = { ...input, id: `address-demo-${Date.now()}` };
    const current = addressesByUser[userId] ?? [];
    if (next.isDefault) current.forEach((address) => { address.isDefault = false; });
    addressesByUser[userId] = [...current, next];
    return { ...next };
  },

  remove: async (userId: string, addressId: string): Promise<void> => {
    addressesByUser[userId] = (addressesByUser[userId] ?? []).filter((address) => address.id !== addressId);
  },

  setDefault: async (userId: string, addressId: string): Promise<void> => {
    addressesByUser[userId] = (addressesByUser[userId] ?? []).map((address) => ({
      ...address,
      isDefault: address.id === addressId,
    }));
  },
};
