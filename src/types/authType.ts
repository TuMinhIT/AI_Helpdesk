

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
};


export type ChangePasswordRequest = {
  userId: string;
  oldPassword: string;
  newPassword: string;
};

export type ResetPasswordRequest = {
  email: string;
  newPassword: string;
};

export type AuthPayload = {
  accessToken: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
};
