import { Navigate } from 'react-router';
import { useAuthContext } from '@/contexts/AuthContext';
import { ReactNode } from 'react';
interface ProtectedRouteProps {
  children: ReactNode;
  adminOnly?: boolean;
}
export function ProtectedRoute({ children, adminOnly = false }: ProtectedRouteProps) {
  const { token, isAdmin } = useAuthContext();
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  if (adminOnly && !isAdmin) {
    return <Navigate to="/my-pastes" replace />;
  }
  return <>{children}</>;
}