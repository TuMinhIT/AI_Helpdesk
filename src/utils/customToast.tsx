import { toast, type ToastOptions } from "react-toastify";
import type { ReactNode } from "react";

export const showSuccess = (message: string) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

export const showError = (message: string) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};

export const showWarning = (message: string) => {
  toast.warning(message, {
    position: "top-center",
    autoClose: 3000,
  });
};

export const showCustom = (message: ReactNode, options: ToastOptions = {}) => {
  toast(message, {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    style: {
      background: "#1f2937",
      color: "#f9fafb",
      borderRadius: "8px",
    },
    ...options,
  });
};
