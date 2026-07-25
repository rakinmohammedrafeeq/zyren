/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { useAuthContext } from '@/contexts/AuthContext';

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
  const navigate = useNavigate();
  const { login } = useAuthContext();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      try {
        // Decode token to get user info
        const payload = decodeJwtPayload(token);
        
        if (payload && payload.sub) {
          const email = payload.sub as string;
          const role = (payload.role as string) || 'USER';
          const provider = (payload.provider as string) || 'GOOGLE';
          
          // Use AuthContext login function to properly set up auth state
          login(token, email, role, provider);
          
          // Show success message
          toast.success(`Welcome back, ${email.split('@')[0]}!`);
          
          // Redirect to my-pastes
          setTimeout(() => {
            navigate('/my-pastes', { replace: true });
          }, 100);
        } else {
          throw new Error('Invalid token payload');
        }
        
      } catch (error) {
        console.error('OAuth error:', error);
        toast.error('Login failed. Please try again.');
        navigate('/login', { replace: true });
      }
    } else {
      // No token, redirect to login
      toast.error('No authentication token received');
      navigate('/login', { replace: true });
    }
  }, [navigate, login]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-lg font-medium mb-2">Completing sign-in...</p>
        <p className="text-sm text-muted-foreground">Please wait</p>
      </div>
    </div>
  );
}
