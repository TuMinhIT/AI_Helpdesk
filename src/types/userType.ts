export type User = {
  id: string;
  name: string;
  email: string;
  phoneNumber: string | null;
  address?: string;
  avatar?: string | null;
  role: string;
  isActive?: boolean | null;
  createAt?: string;
  updateAt?: string | null;
  gender?: string | null;
  dob?: string | null;
};

export type Profile = User;
