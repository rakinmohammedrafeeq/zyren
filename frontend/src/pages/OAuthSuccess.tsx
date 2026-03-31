/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from 'react';

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

/* noinspection JSUnusedGlobalSymbols */
export default function OAuthSuccess() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      localStorage.setItem('token', token);
      const payload = decodeJwtPayload(token);
      if ((payload?.role as string | undefined) !== undefined) {
        localStorage.setItem('role', payload?.role as string);
      }
      if ((payload?.provider as string | undefined) !== undefined) {
        localStorage.setItem('provider', payload?.provider as string);
      }
      if ((payload?.sub as string | undefined) !== undefined) {
        localStorage.setItem('email', payload?.sub as string);
      }
      window.location.href = '/';
    }
  }, []);

  return null;
}
