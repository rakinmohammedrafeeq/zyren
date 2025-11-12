import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
interface AuthContextType {
  token: string | null;
  email: string | null;
  role: string | null;
  isAdmin: boolean;
  login: (token: string, email: string, role: string) => void;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [email, setEmail] = useState<string | null>(localStorage.getItem('email'));
  const [role, setRole] = useState<string | null>(localStorage.getItem('role'));
  const login = (newToken: string, newEmail: string, newRole: string) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('email', newEmail);
    localStorage.setItem('role', newRole);
    setToken(newToken);
    setEmail(newEmail);
    setRole(newRole);
  };
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    setToken(null);
    setEmail(null);
    setRole(null);
  };
  const isAdmin = role === 'ADMIN';
  return (
    <AuthContext.Provider value={{ token, email, role, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return context;
}