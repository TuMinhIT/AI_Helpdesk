import { QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import type { PropsWithChildren } from "react";
import { queryClient } from "./queryClient";

export const AppProviders = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>
    {children}
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  </QueryClientProvider>
);

export default AppProviders;
