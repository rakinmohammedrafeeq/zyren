import { Link, useLocation, useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Linkedin, Github, Loader2, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import api from '@/lib/api';

interface Creator {
  name: string;
  linkedin?: string;
  github?: string;
  buyMeACoffee?: string;
}

const creators: Creator[] = [
  {
    name: 'Rakin Mohammed Rafeeq',
    linkedin: 'https://www.linkedin.com/in/rakinmohammedrafeeq',
    github: 'https://github.com/rakinmohammedrafeeq',
    buyMeACoffee: 'https://buymeacoffee.com/rakinmohammedrafeeq',
  },
  {
    name: 'Rayan Mohammed Rafeeq',
    linkedin: 'https://www.linkedin.com/in/rayan-mohammed-rafeeq',
    github: 'https://github.com/Rayan-Mohammed-Rafeeq',
    buyMeACoffee: 'https://buymeacoffee.com/rayanmohammedrafeeq',
  },
];

export function Footer() {
  const location = useLocation();
  const navigate = useNavigate();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [newsletterLoading, setNewsletterLoading] = useState(false);
  const [linkedInModalOpen, setLinkedInModalOpen] = useState(false);
  const [gitHubModalOpen, setGitHubModalOpen] = useState(false);
  const [buyMeACoffeeModalOpen, setBuyMeACoffeeModalOpen] = useState(false);
  useEffect(() => {
    const updateTheme = () => {
      setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    };
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    return () => observer.disconnect();
  }, []);
  const isHomePage = location.pathname === '/';
  const handleBrandClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (!isHomePage) {
      navigate('/');
    }
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };
  const handlePublicCodeClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === '/public') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="border-t border-border/30 backdrop-blur-sm bg-background/50 py-16"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {}
          <motion.div 
            className="space-y-4"
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
          >
            <Link to="/" onClick={handleBrandClick} className="flex items-center gap-2.5 w-fit">
              <img 
                src={theme === 'light'
                  ? "https://harmless-tapir-303.convex.cloud/api/storage/0fa135bb-61af-462c-bdbb-705fa1931cff"
                  : "https://harmless-tapir-303.convex.cloud/api/storage/ad0ffa05-6096-4828-a7ce-c0fbbef0f2cc"
                }
                alt="Zyren Logo" 
                className="h-7 w-7 transition-all" 
                loading="lazy"
              />
              <h3 className="text-lg font-semibold tracking-tight">Zyren</h3>
            </Link>
            <p className="text-sm text-foreground/70 leading-relaxed">
              A secure platform for storing, managing, and sharing text and code snippets — privately or publicly — with instant access through shareable codes.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setLinkedInModalOpen(true)}
                className="inline-flex w-6 h-6 items-center justify-center text-foreground/60 hover:text-primary hover:scale-110 transition-all duration-200 cursor-pointer"
              >
                <Linkedin className="size-5" strokeWidth={1.8} />
              </button>
              <button
                onClick={() => setGitHubModalOpen(true)}
                className="inline-flex w-6 h-6 items-center justify-center text-foreground/60 hover:text-primary hover:scale-110 transition-all duration-200 cursor-pointer"
              >
                <Github className="size-5" strokeWidth={1.8} />
              </button>
              <button
                onClick={() => setBuyMeACoffeeModalOpen(true)}
                className="inline-flex w-6 h-6 items-center justify-center text-foreground/60 hover:text-primary hover:scale-110 transition-all duration-200 cursor-pointer"
              >
                <svg
                  className="size-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20.216 6.415l-.132-.666c-.119-.598-.388-1.163-1.001-1.379-.197-.069-.42-.098-.57-.241-.152-.143-.196-.366-.231-.572-.065-.378-.125-.756-.192-1.133-.057-.325-.102-.69-.25-.987-.195-.4-.597-.634-.996-.788a5.723 5.723 0 00-.626-.194c-1-.263-2.05-.36-3.077-.416a25.834 25.834 0 00-3.7.062c-.915.083-1.88.184-2.75.5-.318.116-.646.256-.888.501-.297.302-.393.77-.177 1.146.154.267.415.456.692.58.36.162.737.284 1.123.366 1.075.238 2.189.331 3.287.37 1.218.05 2.437.01 3.65-.118.299-.033.598-.073.896-.119.352-.054.578-.513.474-.834-.124-.383-.457-.531-.834-.473-.466.074-.96.108-1.382.146-1.177.08-2.358.082-3.536.006a22.228 22.228 0 01-1.157-.107c-.086-.01-.18-.025-.258-.036-.243-.036-.484-.08-.724-.13-.111-.027-.111-.185 0-.212h.005c.277-.06.557-.108.838-.147h.002c.131-.009.263-.032.394-.048a25.076 25.076 0 013.426-.12c.674.019 1.347.067 2.017.144l.228.031c.267.04.533.088.798.145.392.085.895.113 1.07.542.055.137.08.288.111.431l.319 1.484a.237.237 0 01-.199.284h-.003c-.037.006-.075.01-.112.015a36.704 36.704 0 01-4.743.295 37.059 37.059 0 01-4.699-.304c-.14-.017-.293-.042-.417-.06-.326-.048-.649-.108-.973-.161-.393-.065-.768-.032-1.123.161-.29.16-.527.404-.675.701-.154.316-.199.66-.267 1-.069.34-.176.707-.135 1.056.087.753.613 1.365 1.37 1.502a39.69 39.69 0 0011.343.376.483.483 0 01.535.53l-.071.697-1.018 9.907c-.041.41-.047.832-.125 1.237-.122.637-.553 1.028-1.182 1.171-.577.131-1.165.2-1.756.205-.656.004-1.31-.025-1.966-.022-.699.004-1.556-.06-2.095-.58-.475-.458-.54-1.174-.605-1.793l-.731-7.013-.322-3.094c-.037-.351-.286-.695-.678-.678-.336.015-.718.3-.678.679l.228 2.185.949 9.112c.147 1.344 1.174 2.068 2.446 2.272.742.12 1.503.144 2.257.156.966.016 1.942.053 2.892-.122 1.408-.258 2.465-1.198 2.616-2.657.34-3.332.683-6.663 1.024-9.995l.215-2.087a.484.484 0 01.39-.426c.402-.078.787-.212 1.074-.518.26-.275.346-.616.381-.943.045-.4.028-.808.012-1.209-.016-.363-.112-.717-.204-1.067z" />
                </svg>
              </button>
            </div>
          </motion.div>
          {}
          <motion.div 
            className="space-y-4"
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
          >
            <h3 className="text-lg font-semibold tracking-tight text-foreground">Platform</h3>
            <nav className="flex flex-col space-y-3">
              {isHomePage ? (
                <>
                  <a href="#about" className="text-sm text-foreground/70 hover:text-primary transition-colors duration-200">About</a>
                  <a href="#how-it-works" className="text-sm text-foreground/70 hover:text-primary transition-colors duration-200">How It Works</a>
                  <a href="#features" className="text-sm text-foreground/70 hover:text-primary transition-colors duration-200">Features</a>
                  <a href="#contact" className="text-sm text-foreground/70 hover:text-primary transition-colors duration-200">Contact</a>
                </>
              ) : (
                <>
                  <Link to="/#about" className="text-sm text-foreground/70 hover:text-primary transition-colors duration-200">About</Link>
                  <Link to="/#how-it-works" className="text-sm text-foreground/70 hover:text-primary transition-colors duration-200">How It Works</Link>
                  <Link to="/#features" className="text-sm text-foreground/70 hover:text-primary transition-colors duration-200">Features</Link>
                  <Link to="/#contact" className="text-sm text-foreground/70 hover:text-primary transition-colors duration-200">Contact</Link>
                </>
              )}
              <Link to="/public" onClick={handlePublicCodeClick} className="text-sm text-foreground/70 hover:text-primary transition-colors duration-200">Public Code</Link>
            </nav>
          </motion.div>
          {}
          <motion.div 
            className="space-y-4"
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
          >
            <h3 className="text-lg font-semibold tracking-tight text-foreground">Stay Updated</h3>
            <p className="text-sm text-foreground/70 leading-relaxed">
              Subscribe to our newsletter for updates, releases, and product improvements.
            </p>
            <form className="space-y-2" onSubmit={async (e) => {
              e.preventDefault();
              setNewsletterLoading(true);
              const formEl = e.currentTarget as HTMLFormElement;
              const fd = new FormData(formEl);
              const email = (fd.get('email') || '').toString();
              try {
                await api.post('/newsletter/subscribe', { email }, { suppressErrorToast: true });
                toast.success('Successfully subscribed to newsletter!');
                formEl.reset();
              } catch (error) {
                const err = error as { response?: { data?: { message?: string } } };
                toast.error(err.response?.data?.message || 'Failed to subscribe. Please try again.');
              } finally {
                setNewsletterLoading(false);
              }
            }}>
              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="h-10 bg-background/50 border-border/50 focus:border-primary/50 transition-colors"
                required
              />
              <Button type="submit" className="w-full h-10 rounded-full" disabled={newsletterLoading}>
                {newsletterLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Subscribing...</> : 'Subscribe'}
              </Button>
            </form>
          </motion.div>
        </div>
        {}
        <div className="pt-8 border-t border-border/30">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            <p className="text-xs text-foreground/60">© 2026 Zyren. Powerful, simple, secure text & code sharing.</p>
            <div className="flex gap-6">
              <Link to="/privacy" className="text-foreground/60 hover:text-primary transition-colors duration-200">Privacy</Link>
              <Link to="/terms" className="text-foreground/60 hover:text-primary transition-colors duration-200">Terms</Link>
              {isHomePage ? (
                <a href="#faq" className="text-foreground/60 hover:text-primary transition-colors duration-200">FAQ</a>
              ) : (
                <Link to="/#faq" className="text-foreground/60 hover:text-primary transition-colors duration-200">FAQ</Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* LinkedIn Modal */}
      <Dialog open={linkedInModalOpen} onOpenChange={setLinkedInModalOpen}>
        <DialogContent className="border-border/30 bg-background/80 backdrop-blur-md">
          <DialogHeader>
            <DialogTitle className="text-xl text-foreground flex items-center gap-2">
              <Linkedin className="size-5 text-primary" />
              LinkedIn Profiles
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {creators.map((creator) => (
              <motion.div
                key={creator.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border/20"
              >
                <div>
                  <p className="font-medium text-foreground">{creator.name}</p>
                </div>
                {creator.linkedin && (
                  <a
                    href={creator.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
                  >
                    <span className="text-sm font-medium">View LinkedIn</span>
                    <ExternalLink className="size-4" />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* GitHub Modal */}
      <Dialog open={gitHubModalOpen} onOpenChange={setGitHubModalOpen}>
        <DialogContent className="border-border/30 bg-background/80 backdrop-blur-md">
          <DialogHeader>
            <DialogTitle className="text-xl text-foreground flex items-center gap-2">
              <Github className="size-5 text-primary" />
              GitHub Profiles
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {creators.map((creator) => (
              <motion.div
                key={creator.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border/20"
              >
                <div>
                  <p className="font-medium text-foreground">{creator.name}</p>
                </div>
                {creator.github && (
                  <a
                    href={creator.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
                  >
                    <span className="text-sm font-medium">View GitHub</span>
                    <ExternalLink className="size-4" />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Buy Me a Coffee Modal */}
      <Dialog open={buyMeACoffeeModalOpen} onOpenChange={setBuyMeACoffeeModalOpen}>
        <DialogContent className="border-border/30 bg-background/80 backdrop-blur-md">
          <DialogHeader>
            <DialogTitle className="text-xl text-foreground flex items-center gap-2">
              <svg className="size-5 text-primary" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.216 6.415l-.132-.666c-.119-.598-.388-1.163-1.001-1.379-.197-.069-.42-.098-.57-.241-.152-.143-.196-.366-.231-.572-.065-.378-.125-.756-.192-1.133-.057-.325-.102-.69-.25-.987-.195-.4-.597-.634-.996-.788a5.723 5.723 0 00-.626-.194c-1-.263-2.05-.36-3.077-.416a25.834 25.834 0 00-3.7.062c-.915.083-1.88.184-2.75.5-.318.116-.646.256-.888.501-.297.302-.393.77-.177 1.146.154.267.415.456.692.58.36.162.737.284 1.123.366 1.075.238 2.189.331 3.287.37 1.218.05 2.437.01 3.65-.118.299-.033.598-.073.896-.119.352-.054.578-.513.474-.834-.124-.383-.457-.531-.834-.473-.466.074-.96.108-1.382.146-1.177.08-2.358.082-3.536.006a22.228 22.228 0 01-1.157-.107c-.086-.01-.18-.025-.258-.036-.243-.036-.484-.08-.724-.13-.111-.027-.111-.185 0-.212h.005c.277-.06.557-.108.838-.147h.002c.131-.009.263-.032.394-.048a25.076 25.076 0 013.426-.12c.674.019 1.347.067 2.017.144l.228.031c.267.04.533.088.798.145.392.085.895.113 1.07.542.055.137.08.288.111.431l.319 1.484a.237.237 0 01-.199.284h-.003c-.037.006-.075.01-.112.015a36.704 36.704 0 01-4.743.295 37.059 37.059 0 01-4.699-.304c-.14-.017-.293-.042-.417-.06-.326-.048-.649-.108-.973-.161-.393-.065-.768-.032-1.123.161-.29.16-.527.404-.675.701-.154.316-.199.66-.267 1-.069.34-.176.707-.135 1.056.087.753.613 1.365 1.37 1.502a39.69 39.69 0 0011.343.376.483.483 0 01.535.53l-.071.697-1.018 9.907c-.041.41-.047.832-.125 1.237-.122.637-.553 1.028-1.182 1.171-.577.131-1.165.2-1.756.205-.656.004-1.31-.025-1.966-.022-.699.004-1.556-.06-2.095-.58-.475-.458-.54-1.174-.605-1.793l-.731-7.013-.322-3.094c-.037-.351-.286-.695-.678-.678-.336.015-.718.3-.678.679l.228 2.185.949 9.112c.147 1.344 1.174 2.068 2.446 2.272.742.12 1.503.144 2.257.156.966.016 1.942.053 2.892-.122 1.408-.258 2.465-1.198 2.616-2.657.34-3.332.683-6.663 1.024-9.995l.215-2.087a.484.484 0 01.39-.426c.402-.078.787-.212 1.074-.518.26-.275.346-.616.381-.943.045-.4.028-.808.012-1.209-.016-.363-.112-.717-.204-1.067z" />
              </svg>
              Support the Creators
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {creators.map((creator) => (
              <motion.div
                key={creator.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between p-4 rounded-lg bg-background/50 border border-border/20"
              >
                <div>
                  <p className="font-medium text-foreground">{creator.name}</p>
                </div>
                {creator.buyMeACoffee && (
                  <a
                    href={creator.buyMeACoffee}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
                  >
                    <span className="text-sm font-medium">Buy Me a Coffee</span>
                    <ExternalLink className="size-4" />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </motion.footer>
  );
}