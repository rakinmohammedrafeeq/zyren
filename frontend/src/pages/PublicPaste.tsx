import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Loader2, Copy, Sparkles, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuthContext } from '@/contexts/AuthContext';
import api from '@/lib/api';
import { MediaPreview } from '@/components/MediaPreview';
import Linkify from "linkify-react";

interface Paste {
  id: number;
  title: string;
  content: string;
  code: string;
  createdAt: string;
  expiryAt?: string;
  mediaUrl?: string;
  mediaPublicId?: string;
  mediaType?: string;
}

// noinspection JSUnusedGlobalSymbols
const PublicPaste = () => {
  const { code } = useParams();
  const [paste, setPaste] = useState<Paste | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const { token } = useAuthContext();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const updateTheme = () => {
      setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    };
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  useEffect(() => {
    const fetchPublicPaste = async () => {
      try {
        const response = await api.get(`/public/${code}`, {
          suppressErrorToast: true,
        });
        setPaste(response.data);
      } catch {
        setPaste(null);
      } finally {
        setLoading(false);
      }
    };
    fetchPublicPaste();
  }, [code]);

  const copyContent = () => {
    if (paste) {
      navigator.clipboard.writeText(paste.content);
      setCopied(true);
      toast.success('Content copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  if (!paste) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6 max-w-md"
        >
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">Paste not found</h1>
            <p className="text-muted-foreground">This paste may have expired or doesn't exist.</p>
          </div>
          <Link to="/">
            <Button size="lg" className="rounded-full">
              Go Home
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-10"
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
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="rounded-full w-9 h-9 p-0"
            >
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
            {!token && (
              <Link to="/login">
                <Button variant="outline" size="sm" className="rounded-full gap-2">
                  <Sparkles className="h-3.5 w-3.5" />
                  Create your own
                </Button>
              </Link>
            )}
          </div>
        </div>
      </motion.header>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-8"
        >
          <div className="space-y-3">
            <h1 className="text-4xl font-bold tracking-tight">{paste.title}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>
                Created{' '}
                {new Date(paste.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
              {paste.expiryAt && (
                <>
                  <span>•</span>
                  <span>
                    Expires{' '}
                    {new Date(paste.expiryAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </>
              )}
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-primary/5 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-500" />
            <div className="relative bg-white dark:bg-neutral-900 text-black dark:text-white rounded-xl border border-border/50 overflow-hidden">
              {/* media preview */}
              {paste.mediaUrl && paste.mediaPublicId && paste.mediaType && (
                <div className="p-6 border-b border-border/50">
                  <MediaPreview
                    media={{
                      secureUrl: paste.mediaUrl,
                      publicId: paste.mediaPublicId,
                      resourceType: paste.mediaType,
                    }}
                    isPublicView={true}
                  />
                </div>
              )}
              {/* content card header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-border/50">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Content</span>
                <Button onClick={copyContent} size="sm" variant="ghost" className="rounded-full gap-2 h-8">
                  <Copy className="h-3.5 w-3.5" />
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
              </div>
              {/* content body */}
              <div className="p-6">
                <div className="whitespace-pre-wrap break-words text-black dark:text-white">
                  <Linkify
                    options={{
                      target: "_blank",
                      rel: "noopener noreferrer",
                      defaultProtocol: "https",
                      className: "text-blue-600 dark:text-blue-400 underline hover:opacity-80 break-all",
                    }}
                  >
                    {paste.content ?? ''}
                  </Linkify>
                </div>
              </div>
            </div>
          </motion.div>
          {!token && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center justify-center pt-8"
            >
              <div className="text-center space-y-4 p-8 rounded-xl bg-muted/30 backdrop-blur-sm border border-border/40">
                <p className="text-sm text-muted-foreground">Want to create and share your own pastes?</p>
                <Link to="/login">
                  <Button size="lg" className="rounded-full gap-2">
                    <Sparkles className="h-4 w-4" />
                    Get Started Free
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default PublicPaste;
