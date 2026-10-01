import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { useAuth } from "@/app/store/authStore";
import type { ApiResponse } from "@/types/apiResponse";
import { ApiError, normalizeApiError } from "./apiError";
import { API_ROUTES } from "./apiRoutes";

const baseURL = import.meta.env.VITE_BACKEND_URL;

type RetryableRequest = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

type RefreshPayload = {
  accessToken: string;
};

type RefreshResponse = ApiResponse<RefreshPayload>;

const isRoute = (url: string | undefined, route: string) =>
  Boolean(url && (url === route || url.endsWith(route)));

const isRefreshRequest = (url: string | undefined) =>
  isRoute(url, API_ROUTES.auth.refresh);

const isAuthRequest = (url: string | undefined) =>
  [
    API_ROUTES.auth.login,
    API_ROUTES.auth.register,
    API_ROUTES.auth.refresh,
    API_ROUTES.auth.logout,
  ].some((route) => isRoute(url, route));

const hasAuthorizationHeader = (config: InternalAxiosRequestConfig) =>
  Boolean(config.headers?.Authorization || config.headers?.authorization);

export const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const accessToken = useAuth.getState().accessToken;

  if (accessToken && !isRefreshRequest(config.url)) {
    config.headers.Authorization = "Bearer " + accessToken;
  } else {
    delete config.headers.Authorization;
  }
  return config;
});

let refreshPromise: Promise<string> | null = null;

const refreshAccessToken = (): Promise<string> => {
  if (refreshPromise) return refreshPromise;

  refreshPromise = api
    .post<RefreshResponse>(API_ROUTES.auth.refresh, undefined, {
      withCredentials: true,
    })
    .then((response) => {
      const refreshResponse = response.data;
      const accessToken = refreshResponse.success
        ? refreshResponse.data?.accessToken
        : undefined;

      if (!accessToken) {
        throw new ApiError(
          refreshResponse.message || "Refresh endpoint did not return an access token",
          401,
        );
      }

      useAuth.getState().setAccessToken(accessToken);
      return accessToken;
    })
    .catch((error: unknown) => {
      const normalizedError = normalizeApiError(error);
      useAuth.getState().logout();
      throw normalizedError;
    })
    .finally(() => {
      refreshPromise = null;
    });

  return refreshPromise;
};

api.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    const axiosError = axios.isAxiosError(error)
      ? (error as AxiosError<unknown>)
      : undefined;
    const originalRequest = axiosError?.config as RetryableRequest | undefined;
    const isRefresh = isRefreshRequest(originalRequest?.url);

    if (
      !originalRequest ||
      originalRequest._retry ||
      isRefresh ||
      isAuthRequest(originalRequest.url) ||
      !hasAuthorizationHeader(originalRequest)
    ) {
      return Promise.reject(normalizeApiError(error));
    }

    if (axiosError?.response?.status !== 401) {
      return Promise.reject(normalizeApiError(error));
    }

    originalRequest._retry = true;

    try {
      const accessToken = await refreshAccessToken();
      originalRequest.headers.Authorization = "Bearer " + accessToken;
      return api(originalRequest);
    } catch (refreshError: unknown) {
      return Promise.reject(normalizeApiError(refreshError));
    }
  },
);

export default api;
