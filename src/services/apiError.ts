import axios from "axios";
import type { ApiErrorResponse } from "@/types/apiResponse";

export class ApiError extends Error {
  readonly status: number;
  readonly errors: unknown[];
  readonly data: unknown;

  constructor(
    message: string,
    status = 0,
    errors: unknown[] = [],
    data?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
    this.data = data;
  }
}

export const normalizeApiError = (error: unknown): ApiError => {
  if (error instanceof ApiError) return error;

  if (axios.isAxiosError(error)) {
    const payload = error.response?.data as ApiErrorResponse | undefined;
    return new ApiError(
      payload?.message || payload?.errorMessage || error.message || "Request failed",
      error.response?.status ?? 0,
      payload?.errors ?? [],
      payload?.data,
    );
  }

  if (error instanceof Error) {
    return new ApiError(error.message);
  }

  return new ApiError("Unknown request error");
};
