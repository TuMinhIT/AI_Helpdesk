export type ValidationError = {
  field: string;
  message: string;
};

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errorMessage?: string;
  errors?: ValidationError[];
}

export interface ApiErrorResponse {
  success?: boolean;
  message?: string;
  errorMessage?: string;
  errors?: ValidationError[];
  data?: unknown;
}

export type ApiErrorDetails = {
  status: number;
  message: string;
  errors: ValidationError[];
  data?: unknown;
};
