import { Navigate, Route, Routes } from "react-router-dom";
import ClientLayout from "../layouts/ClientLayout";
import Home from "@/pages/client/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import AskAI from "@/pages/client/AskAI";
import { useAuth } from "../app/store/authStore";
import ProfilePage from "@/pages/client/ProfilePage";
import AdminLayout from "@/layouts/AdminLayout";
import AdminRoute from "@/components/admin/common/AdminRoute";
import {
  getAdminWorkspacePath,
  hasAllowedRole,
  IT_ENGINEER_ROLES,
  IT_MANAGER_ROLES,
  IT_STAFF_ROLES,
} from "@/components/admin/common/adminRoles";
import OverViewPage from "@/pages/admin/OverViewPage";
import KnowledgeBasePage from "@/pages/admin/KnowledgeBasePage";
import ITServiceDeskPage from "@/pages/admin/ITServiceDeskPage";
import AITicketAnalysisPage from "@/pages/admin/AITicketAnalysisPage";

const AdminEntry = () => {
  const { user } = useAuth();

  if (hasAllowedRole(user?.role, IT_MANAGER_ROLES)) return <OverViewPage />;

  return <Navigate to={getAdminWorkspacePath(user?.role)} replace />;
};

function AppRouter() {
  const { accessToken, isSessionReady } = useAuth();
  const authLoading = <div aria-busy="true" className="min-h-screen" />;

  return (
    <Routes>
      <Route path="/" element={<ClientLayout />}>
        <Route index element={<Home />} />
        <Route path="ask-ai" element={<AskAI />} />
        <Route path="contact" element={<Navigate to="/ask-ai" replace />} />
        <Route path="profile" element={accessToken ? <ProfilePage /> : <Navigate to="/login" replace />}
        />
      </Route>

      <Route
        path="login"
        element={!isSessionReady ? authLoading : !accessToken ? <Login /> : <Navigate to="/" replace />}
      />
      <Route
        path="register"
        element={!isSessionReady ? authLoading : !accessToken ? <Register /> : <Navigate to="/" replace />}
      />

      <Route element={<AdminRoute allowedRoles={IT_STAFF_ROLES} />}>
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<AdminEntry />} />
          <Route path="dashboard" element={<Navigate to="/admin" replace />} />

          <Route element={<AdminRoute allowedRoles={IT_ENGINEER_ROLES} />}>
            <Route path="tickets" element={<ITServiceDeskPage />} />
            <Route path="tickets/:id" element={<AITicketAnalysisPage />} />
            <Route path="knowledge-base" element={<KnowledgeBasePage />} />
            <Route path="knowledge-base/new" element={<KnowledgeBasePage />} />
            <Route path="knowledge-base/:id/edit" element={<KnowledgeBasePage />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRouter;
