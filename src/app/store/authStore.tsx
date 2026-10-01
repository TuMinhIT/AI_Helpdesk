import { create } from "zustand";
import type { User } from "@/types/userType";

export type AuthUser = Pick<User, "id" | "name" | "email" | "role"> | null;

interface AuthState {
  accessToken: string;
  user: AuthUser;
  isSessionReady: boolean;
  login: (data: { accessToken: string; user: NonNullable<AuthUser> }) => void;
  setAccessToken: (accessToken: string) => void;
  markSessionReady: () => void;
  logout: () => void;
}

const getStoredUser = (): AuthUser => {
  const storedUser = localStorage.getItem("user");
  if (!storedUser) return null;

  try {
    const parsed = JSON.parse(storedUser) as NonNullable<AuthUser>;
    return parsed && typeof parsed.id === "string" ? parsed : null;
  } catch {
    return null;
  }
};

export const useAuth = create<AuthState>((set) => ({
  accessToken: localStorage.getItem("accessToken") || "",
  user: getStoredUser(),
  isSessionReady: true,

  login: ({ accessToken, user }) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("user", JSON.stringify(user));
    set({
      accessToken,
      user,
      isSessionReady: true,
    });
  },

  setAccessToken: (accessToken) => {
    localStorage.setItem("accessToken", accessToken);
    set({ accessToken, isSessionReady: true });
  },

  markSessionReady: () => {
    set({ isSessionReady: true });
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    set({
      accessToken: "",
      user: null,
      isSessionReady: true,
    });
    window.location.href = "/login";
  },
}));
