export type JwtPayload = {
  sub?: string;
  role?: string;
  provider?: string;
  [key: string]: unknown;
};

const base64UrlDecode = (value: string): string => {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
  const padded = normalized + '='.repeat((4 - (normalized.length % 4)) % 4);
  return atob(padded);
};

export const decodeJwtPayload = (token: string): JwtPayload | null => {
  try {
    const [, payload] = token.split('.');
    if (!payload) {
      return null;
    }
    const decoded = base64UrlDecode(payload);
    return JSON.parse(decoded) as JwtPayload;
  } catch {
    return null;
  }
};

export const getRoleFromToken = (token?: string | null): string | null => {
  if (!token) return null;
  return decodeJwtPayload(token)?.role ?? null;
};

export const getProviderFromToken = (token?: string | null): string | null => {
  if (!token) return null;
  return decodeJwtPayload(token)?.provider ?? null;
};

export const getEmailFromToken = (token?: string | null): string | null => {
  if (!token) return null;
  return decodeJwtPayload(token)?.sub ?? null;
};

