import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

const decodeJwtPayload = (token: string): Record<string, unknown> | null => {
  try {
    const base64 = token.split('.')[1];
    if (!base64) return null;
    const json = atob(base64.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decodeURIComponent(escape(json))) as Record<string, unknown>;
  } catch {
    return null;
  }
};

interface AuthContextType {
  token: string | null;
  email: string | null;
  role: string | null;
  provider: string | null;
  isAdmin: boolean;
  login: (token: string, email: string, role: string, provider?: string | null) => void;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
/* noinspection JSUnusedGlobalSymbols */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [email, setEmail] = useState<string | null>(localStorage.getItem('email'));
  const [role, setRole] = useState<string | null>(localStorage.getItem('role'));
  const [provider, setProvider] = useState<string | null>(localStorage.getItem('provider'));

  useEffect(() => {
    if (!token) return;
    const payload = decodeJwtPayload(token);
    if (payload?.role && payload.role !== role) {
      localStorage.setItem('role', payload.role as string);
      setRole(payload.role as string);
    }
    if (payload?.provider && payload.provider !== provider) {
      localStorage.setItem('provider', payload.provider as string);
      setProvider(payload.provider as string);
    }
  }, [token, role, provider]);

  const login = (newToken: string, newEmail: string, newRole: string, newProvider?: string | null) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('email', newEmail);

    const payload = decodeJwtPayload(newToken);
    const roleValue = (newRole || (payload?.role as string) || null) as string | null;
    const providerValue = (newProvider || (payload?.provider as string) || null) as string | null;

    if (roleValue) {
      localStorage.setItem('role', roleValue);
    }
    if (providerValue) {
      localStorage.setItem('provider', providerValue);
    }

    setToken(newToken);
    setEmail(newEmail);
    setRole(roleValue);
    setProvider(providerValue);
  };
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    localStorage.removeItem('provider');
    setToken(null);
    setEmail(null);
    setRole(null);
    setProvider(null);
  };
  const roleFromToken = token ? (decodeJwtPayload(token)?.role as string | null) : null;
  const isAdmin = (roleFromToken || role) === 'ADMIN';
  return (
    <AuthContext.Provider value={{ token, email, role: roleFromToken || role, provider, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
/* noinspection JSUnusedGlobalSymbols */
export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return context;
}