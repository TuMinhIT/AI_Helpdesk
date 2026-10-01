import type {
  AuthPayload,
  ChangePasswordRequest,
  LoginRequest,
  RegisterRequest,
  ResetPasswordRequest,
} from "@/types/authType";
import type { ApiResponse } from "@/types/apiResponse";
import { MOCK_PASSWORD, mockUsers } from "./mockData";

type AuthResponse = ApiResponse<AuthPayload>;

const wait = async () => Promise.resolve();

const authService = () => {
  const loginUser = async (input: LoginRequest): Promise<AuthResponse> => {
    await wait();
    const user = mockUsers.find(
      (candidate) => candidate.email.toLowerCase() === input.email.toLowerCase() && input.password === MOCK_PASSWORD,
    );

    if (!user) {
      return { success: false, message: "Email hoặc mật khẩu không chính xác.", data: null as unknown as AuthPayload };
    }

    return {
      success: true,
      message: "Đăng nhập thành công.",
      data: {
        accessToken: `mock-access-token-${user.id}`,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    };
  };

  const register = async (input: RegisterRequest): Promise<ApiResponse<unknown>> => {
    await wait();
    if (mockUsers.some((user) => user.email.toLowerCase() === input.email.toLowerCase())) {
      return { success: false, message: "Email đã tồn tại trong dữ liệu demo.", data: null };
    }

    mockUsers.push({
      id: `usr-demo-${mockUsers.length + 1}`,
      name: input.name,
      email: input.email,
      phoneNumber: input.phoneNumber,
      role: "User",
      isActive: true,
    });
    return { success: true, message: "Tạo tài khoản demo thành công.", data: null };
  };

  const logout = async (): Promise<ApiResponse<unknown>> => ({
    success: true,
    message: "Đã đăng xuất.",
    data: null,
  });

  const loginGoogle = async (): Promise<AuthResponse> => ({
    success: false,
    message: "Google Login chưa được bật trong bản demo.",
    data: null as unknown as AuthPayload,
  });

  const changePassword = async (input: ChangePasswordRequest): Promise<ApiResponse<unknown>> => {
    void input;
    return { success: true, message: "Đổi mật khẩu demo thành công.", data: null };
  };

  const resetPassword = async (input: ResetPasswordRequest): Promise<ApiResponse<unknown>> => {
    void input;
    return { success: true, message: "Đặt lại mật khẩu demo thành công.", data: null };
  };

  return { register, loginGoogle, loginUser, logout, resetPassword, changePassword };
};

export default authService;
