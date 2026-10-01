
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "@/app/appRouter";
import { BrowserRouter } from "react-router-dom";
import AppProviders from "@/app/providers";

createRoot(document.getElementById("root")!).render(

  <AppProviders>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AppProviders>,
);
