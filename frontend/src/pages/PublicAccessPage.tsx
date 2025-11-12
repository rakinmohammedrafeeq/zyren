import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthContext } from '@/contexts/AuthContext';
export default function PublicAccessPage() {
  const [code, setCode] = useState('');
  const navigate = useNavigate();
  const { token } = useAuthContext();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const systemTheme = prefersDark ? 'dark' : 'light';
      setTheme(systemTheme);
      document.documentElement.classList.toggle('dark', systemTheme === 'dark');
    }
  }, []);
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim()) {
      navigate(`/public/${code.trim()}`);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex flex-col">
      {}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-border/40 backdrop-blur-sm bg-background/80"
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-5xl">
          <Link to="/" className="flex items-center gap-2 text-lg font-semibold tracking-tight hover:opacity-80 transition-opacity">
            <img 
              src={
                theme === 'light'
                  ? "https://harmless-tapir-303.convex.cloud/api/storage/0fa135bb-61af-462c-bdbb-705fa1931cff"
                  : "https://harmless-tapir-303.convex.cloud/api/storage/ad0ffa05-6096-4828-a7ce-c0fbbef0f2cc"
              }
              alt="Zyren Logo" 
              className="h-7 w-7" 
            />
            <span>Zyren</span>
          </Link>
          <div className="flex items-center gap-2">
            <motion.div whileHover={{ scale: 1.05, rotate: 5 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" size="sm" onClick={toggleTheme} className="rounded-full w-9 h-9 p-0 transition-all duration-200">
                {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </Button>
            </motion.div>
            {!token && (
              <Link to="/login">
                <Button variant="outline" size="sm" className="rounded-full">
                  Sign Up
                </Button>
              </Link>
            )}
          </div>
        </div>
      </motion.header>
      {}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="w-full max-w-md space-y-8"
        >
          <div className="text-center space-y-3">
            <p className="text-foreground text-xl font-medium">
              Enter a paste code to view its content
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-primary/5 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500" />
            <div className="relative bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Enter paste code..."
                    className="h-12 text-base bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
                    required
                    minLength={8}
                    maxLength={8}
                    autoFocus
                  />
                </div>
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full rounded-full gap-2 h-12"
                  disabled={code.trim().length !== 8}
                >
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </motion.div>
          {!token && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center text-sm text-foreground/80"
            >
              Don't have a paste code?{' '}
              <Link to="/login" className="text-primary hover:underline font-medium">
                Create your own
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}