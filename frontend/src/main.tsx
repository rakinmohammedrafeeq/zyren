import { Toaster } from "@/components/ui/sonner";
import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, useLocation } from "react-router";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import "./index.css";
import Landing from "./pages/Landing.tsx";
import NotFound from "./pages/NotFound.tsx";
import "./types/global.d.ts";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import CreatePaste from "./pages/CreatePaste";
import MyPastes from "./pages/MyPastes";
import EditPaste from "./pages/EditPaste";
import PublicPaste from "./pages/PublicPaste";
import PublicAccessPage from "./pages/PublicAccessPage";
import AdminUsers from "./pages/AdminUsers";
import AdminUserPastes from "./pages/AdminUserPastes";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import OAuthSuccess from "./pages/OAuthSuccess";
import { MainLayout } from "./components/MainLayout";
import { PublicLayout } from "./components/PublicLayout";

function RouteSyncer() {
  const location = useLocation();
  useEffect(() => {
    window.parent.postMessage(
      { type: "iframe-route-change", path: location.pathname },
      "*",
    );
  }, [location.pathname]);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data?.type === "navigate") {
        if (event.data.direction === "back") window.history.back();
        if (event.data.direction === "forward") window.history.forward();
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname, location.hash]);
  return null;
}

function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/public" element={<PublicAccessPage />} />
        <Route path="/public/:code" element={<PublicPaste />} />
      </Route>

      <Route element={<MainLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/oauth-success" element={<OAuthSuccess />} />
        <Route
          path="/create-paste"
          element={
            <ProtectedRoute>
              <CreatePaste />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-pastes"
          element={
            <ProtectedRoute>
              <MyPastes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-paste/:id"
          element={
            <ProtectedRoute>
              <EditPaste />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute adminOnly>
              <AdminUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users/:userId/pastes"
          element={
            <ProtectedRoute adminOnly>
              <AdminUserPastes />
            </ProtectedRoute>
          }
        />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <RouteSyncer />
        <AppRoutes />
      </BrowserRouter>
      <Toaster />
    </AuthProvider>
  </StrictMode>,
);