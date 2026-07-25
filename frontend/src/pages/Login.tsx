import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router';
import { useAuthContext } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2, Eye, EyeOff } from 'lucide-react';
import api from '@/lib/api';
import googleIcon from '@/assets/google-icon.svg';

const GOOGLE_ICON_URL = googleIcon;

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login, token } = useAuthContext();
  const navigate = useNavigate();
  if (token) {
    return <Navigate to="/my-pastes" replace />;
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set('email', email);
      params.set('password', password);
      const response = await api.post('/auth/login', params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        suppressErrorToast: true, 
      });
      const data = response.data;
      const tokenValue = data.token as string;
      login(tokenValue, email, data.role);
      toast.success('Login successful!');
      navigate('/my-pastes');
    } catch (error) {
      type Err = { response?: { data?: { message?: string } } };
      const err = error as Err;
      const message = err.response?.data?.message || 'Invalid credentials. Please try again.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full mx-auto mt-10">
          <Card className="bg-white dark:bg-neutral-900 p-6 rounded-xl shadow-lg space-y-4">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-black dark:text-white">
                Welcome Back to Zyren
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Sign in to access your pastes and AI-powered features
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email"
                    autoFocus
                    className="w-full px-3 py-2 rounded-md bg-transparent border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Enter your password"
                      className="w-full px-3 py-2 rounded-md bg-transparent border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 text-white pr-10"
                      maxLength={32}
                      minLength={8}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <Button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-white rounded-md" disabled={loading}>
                  {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Logging in...</> : 'Login'}
                </Button>
                <div className="flex items-center gap-2 my-4">
                  <div className="flex-1 h-px bg-gray-300 dark:bg-neutral-700" />
                  <span className="text-sm text-gray-500">OR</span>
                  <div className="flex-1 h-px bg-gray-300 dark:bg-neutral-700" />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const backendUrl = import.meta.env.VITE_API_BASE_URL?.replace('/api', '') || 'http://localhost:8080';
                    window.location.href = `${backendUrl}/oauth2/authorization/google`;
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border bg-white text-black border-gray-300 hover:bg-gray-100 dark:bg-neutral-800 dark:text-white dark:border-neutral-700 dark:hover:bg-neutral-700 transition"
                >
                  <img src={GOOGLE_ICON_URL} alt="Google" className="w-5 h-5" />
                  Continue with Google
                </button>
                <div className="text-sm text-center space-y-2">
                  <Link to="/forgot-password" className="text-primary hover:underline block">
                    Forgot password?
                  </Link>
                  <div>
                    Don't have an account?{' '}
                    <Link to="/register" className="text-primary hover:underline">
                      Register
                    </Link>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}