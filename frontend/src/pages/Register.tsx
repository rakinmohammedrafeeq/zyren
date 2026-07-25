import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router';
import { useAuthContext } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { validatePassword } from '@/lib/passwordValidation';
import api from '@/lib/api';
import googleIcon from '@/assets/google-icon.svg';

const GOOGLE_ICON_URL = googleIcon;
export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const { login, token } = useAuthContext();
  const navigate = useNavigate();
  if (token) {
    return <Navigate to="/my-pastes" replace />;
  }
  const isFormValid =
    email &&
    password &&
    confirmPassword &&
    password === confirmPassword &&
    acceptedTerms;
  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (value) {
      const validation = validatePassword(value, email);
      setPasswordErrors(validation.errors);
    } else {
      setPasswordErrors([]);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      return;
    }
    const validation = validatePassword(password, email);
    if (!validation.isValid) {
      setPasswordErrors(validation.errors);
      toast.error('Please fix the password requirements');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (!acceptedTerms) {
      toast.error('Please accept the Terms & Conditions and Privacy Policy');
      return;
    }
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set('email', email);
      params.set('password', password);
      await api.post('/auth/register', params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        suppressErrorToast: true, 
      });
      const loginParams = new URLSearchParams();
      loginParams.set('email', email);
      loginParams.set('password', password);
      const loginResp = await api.post('/auth/login', loginParams, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        suppressErrorToast: true, 
      });
      const data = loginResp.data; 
      const tokenValue = data.token as string;
      login(tokenValue, email, data.role, data.provider ?? null);
      toast.success('Registration successful!');
      navigate('/my-pastes');
    } catch (error) {
      type Err = { response?: { data?: { message?: string } } };
      const err = error as Err;
      toast.error(err.response?.data?.message || 'Registration failed. Please try again.');
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
              <CardTitle className="text-xl font-semibold text-black dark:text-white">Join Zyren</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">Create your account and start using AI-powered paste management</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-black dark:text-gray-200">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email"
                    autoFocus
                    className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-black dark:text-gray-200">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => handlePasswordChange(e.target.value)}
                      required
                      placeholder="Enter your password"
                      className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 pr-10"
                      maxLength={32}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {passwordErrors.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {passwordErrors.map((error, index) => (
                        <div key={index} className="flex items-start gap-2 text-xs text-destructive">
                          <AlertCircle className="h-3 w-3 mt-0.5 flex-shrink-0" />
                          <span>{error}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Password must contain: 8+ characters, uppercase, lowercase, number, and special character (!@#$%^&*_-+)
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium text-black dark:text-gray-200">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      placeholder="Re-enter your password"
                      className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 pr-10"
                      maxLength={32}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {password !== confirmPassword && confirmPassword && (
                    <p className="text-red-500 text-xs">Passwords do not match</p>
                  )}
                </div>
                <div className="flex items-start gap-2 text-sm leading-relaxed">
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="mt-1 accent-red-500"
                  />

                  <p className="text-gray-700 dark:text-gray-300">
                    I agree to the{" "}
                    <Link to="/terms" className="text-red-500 hover:underline">
                      Terms & Conditions
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-red-500 hover:underline">
                      Privacy Policy
                    </Link>
                  </p>
                </div>
                <button
                  type="submit"
                  disabled={!isFormValid || loading}
                  className={`w-full py-2 rounded-lg font-medium transition transition-all duration-200 ${
                    isFormValid && !loading
                      ? "bg-red-500 hover:bg-red-600 text-white"
                      : "bg-gray-400 dark:bg-neutral-700 text-gray-200 cursor-not-allowed"
                  }`}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />Registering...
                    </>
                  ) : (
                    'Register'
                  )}
                </button>
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
                <div className="text-sm text-center">
                  Already have an account?{' '}
                  <Link to="/login" className="text-primary hover:underline">
                    Login
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}