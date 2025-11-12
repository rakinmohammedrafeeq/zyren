import { useAuthContext } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';
export function useAuth() {
  const { token, email, role, isAdmin } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(false);
  }, []);
  const isAuthenticated = !!token;
  return {
    isLoading,
    isAuthenticated,
    user: token ? { email, role, isAdmin } : null,
    token,
    email,
    role,
    isAdmin,
  };
}