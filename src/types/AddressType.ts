export type Address = {
  id: string;
  label: string;
  detail: string;
  phone: string;
  isDefault: boolean;
};

export type AddressInput = Omit<Address, "id">;
