import { Link, useNavigate, useLocation } from 'react-router';
import { useAuthContext } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { LogOut, FileText, Users, Moon, Sun, Menu } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { KeyRound, User as UserIcon } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/* noinspection JSUnusedGlobalSymbols */
export function Navbar() {
  const { token, email, isAdmin, logout, provider } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const { scrollY } = useScroll();
  const navbarShadow = useTransform(
    scrollY,
    [0, 100],
    ['0 1px 3px rgba(0, 0, 0, 0.05)', '0 4px 12px rgba(0, 0, 0, 0.08)']
  );

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

  const handleLogoutClick = () => {
    setLogoutDialogOpen(true);
  };
  const handleLogoutConfirm = () => {
    logout();
    setLogoutDialogOpen(false);
    navigate('/login');
  };
  const handleLogoutCancel = () => {
    setLogoutDialogOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const [activeSection, setActiveSection] = useState<string>('');
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const navLinksRef = useRef<{ [key: string]: HTMLAnchorElement | null }>({});

  useEffect(() => {
    if (location.pathname !== '/') return;

    const handleScroll = () => {
      const sections = ['about', 'how-it-works', 'features', 'contact'];
      const scrollPosition = window.scrollY + 100;
      const sectionPositions = sections.map(id => {
        const section = document.getElementById(id);
        return section ? { id, top: section.offsetTop, bottom: section.offsetTop + section.offsetHeight } : null;
      }).filter(Boolean);

      let foundSection = '';
      for (const section of sectionPositions) {
        if (section && scrollPosition >= section.top && scrollPosition < section.bottom) {
          foundSection = `#${section.id}`;
          break;
        }
      }
      setActiveSection(foundSection);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    if (activeSection && navLinksRef.current[activeSection]) {
      const activeLink = navLinksRef.current[activeSection];
      if (activeLink) {
        const { offsetLeft, offsetWidth } = activeLink;
        setUnderlineStyle({ left: offsetLeft, width: offsetWidth });
      }
    } else {
      setUnderlineStyle({ left: 0, width: 0 });
    }
  }, [activeSection]);

  const isHashActive = (hash: string) => {
    if (location.pathname !== '/') return false;
    return activeSection === hash;
  };

  const getLinkClassName = (path: string) => {
    const baseClasses = "rounded-full px-3 py-1.5 transition-all duration-200";
    const activeClasses = isActive(path)
      ? "bg-primary/15 text-primary font-semibold ring-1 ring-primary/30 shadow-sm"
      : "text-foreground/80 hover:text-foreground hover:bg-accent/50";
    return `${baseClasses} ${activeClasses}`;
  };

  if (location.pathname === '/reset-password') {
    return (
      <motion.nav
        data-app-navbar
        style={{ boxShadow: navbarShadow }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-border/30 backdrop-blur-xl bg-background/50"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-end">
            <motion.div whileHover={{ scale: 1.05, rotate: 5 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" size="sm" onClick={toggleTheme} className="rounded-full w-9 h-9 p-0 transition-all duration-200" aria-label="Toggle theme">
                {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.nav>
    );
  }

  return (
    <>
      <motion.nav
        data-app-navbar
        style={{
          boxShadow: navbarShadow,
        }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-border/30 backdrop-blur-xl bg-background/50"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              to="/" 
              className="flex items-center gap-2.5 group"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <motion.img 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                src={theme === 'light' 
                  ? "https://harmless-tapir-303.convex.cloud/api/storage/0fa135bb-61af-462c-bdbb-705fa1931cff"
                  : "https://harmless-tapir-303.convex.cloud/api/storage/ad0ffa05-6096-4828-a7ce-c0fbbef0f2cc"
                }
                alt="Zyren Logo" 
                className="h-8 w-8 transition-all"
                loading="eager"
              />
              <span className="text-xl font-semibold tracking-tight group-hover:text-primary transition-colors duration-200">
                Zyren
              </span>
            </Link>

            {/* Center links */}
            {token ? (
              <div className="hidden md:flex items-center gap-1">
                <Link to="/my-pastes">
                  <Button variant="ghost" size="sm" className={getLinkClassName('/my-pastes')}>
                    <FileText className="h-4 w-4 mr-2" />
                    My Pastes
                  </Button>
                </Link>
                <Link to="/create-paste">
                  <Button variant="ghost" size="sm" className={getLinkClassName('/create-paste')}>
                    Create Paste
                  </Button>
                </Link>
                <Link to="/public">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full px-3 py-1.5 border-2 border-red-500 dark:border-red-500 text-red-500 bg-transparent hover:bg-red-500/10 shadow-md hover:shadow-lg ring-0"
                  >
                    Public Code
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-6 relative">
                <Link
                  to={location.pathname === '/' ? '#about' : '/#about'}
                  ref={(el) => { navLinksRef.current['#about'] = el; }}
                  className={`text-sm font-semibold transition-colors duration-200 no-underline ${isHashActive('#about') ? 'text-red-600 dark:text-red-400' : 'text-foreground/70 hover:text-red-600 dark:hover:text-red-400 focus-visible:text-red-600 dark:focus-visible:text-red-400'}`}
                >
                  About
                </Link>
                <Link
                  to={location.pathname === '/' ? '#how-it-works' : '/#how-it-works'}
                  ref={(el) => { navLinksRef.current['#how-it-works'] = el; }}
                  className={`text-sm font-semibold transition-colors duration-200 no-underline ${isHashActive('#how-it-works') ? 'text-red-600 dark:text-red-400' : 'text-foreground/70 hover:text-red-600 dark:hover:text-red-400 focus-visible:text-red-600 dark:focus-visible:text-red-400'}`}
                >
                  How It Works
                </Link>
                <Link
                  to={location.pathname === '/' ? '#features' : '/#features'}
                  ref={(el) => { navLinksRef.current['#features'] = el; }}
                  className={`text-sm font-semibold transition-colors duration-200 no-underline ${isHashActive('#features') ? 'text-red-600 dark:text-red-400' : 'text-foreground/70 hover:text-red-600 dark:hover:text-red-400 focus-visible:text-red-600 dark:focus-visible:text-red-400'}`}
                >
                  Features
                </Link>
                <Link
                  to={location.pathname === '/' ? '#contact' : '/#contact'}
                  ref={(el) => { navLinksRef.current['#contact'] = el; }}
                  className={`text-sm font-semibold transition-colors duration-200 no-underline ${isHashActive('#contact') ? 'text-red-600 dark:text-red-400' : 'text-foreground/70 hover:text-red-600 dark:hover:text-red-400 focus-visible:text-red-600 dark:focus-visible:text-red-400'}`}
                >
                  Contact
                </Link>
                {/* Animated underline */}
                <motion.div
                  className="absolute bottom-0 h-0.5 bg-red-600 dark:bg-red-400"
                  initial={{ left: 0, width: 0 }}
                  animate={{ 
                    left: underlineStyle.left, 
                    width: underlineStyle.width,
                    opacity: underlineStyle.width > 0 ? 1 : 0
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 30 
                  }}
                />
              </div>
            )}

            {/* Right controls */}
            <div className="md:hidden flex items-center gap-3">
              <motion.div whileHover={{ scale: 1.05, rotate: 5 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" size="sm" onClick={toggleTheme} className="rounded-full w-9 h-9 p-0 transition-all duration-200">
                  {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                </Button>
              </motion.div>
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="rounded-full w-9 h-9 p-0">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[280px] sm:w-[320px]">
                  <div className="flex flex-col gap-6 mt-8">
                    {token ? (
                      <>
                        <div className="flex flex-col gap-3">
                          <Link to="/my-pastes" onClick={() => setMobileMenuOpen(false)}>
                            <Button variant="ghost" size="sm" className={`w-full justify-start ${getLinkClassName('/my-pastes')}`}>
                              <FileText className="h-4 w-4 mr-2" />
                              My Pastes
                            </Button>
                          </Link>
                          <Link to="/create-paste" onClick={() => setMobileMenuOpen(false)}>
                            <Button variant="ghost" size="sm" className={`w-full justify-start ${getLinkClassName('/create-paste')}`}>
                              Create Paste
                            </Button>
                          </Link>
                          <Link to="/public" onClick={() => setMobileMenuOpen(false)}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full justify-start rounded-full border-2 border-red-500 dark:border-red-500 text-red-500 bg-transparent hover:bg-red-500/10 shadow-md hover:shadow-lg ring-0"
                            >
                              Public Code
                            </Button>
                          </Link>
                        </div>
                        <div className="border-t border-border/30 pt-4">
                          <div className="text-sm text-muted-foreground mb-3 px-2">{email}</div>
                          <Button variant="outline" size="sm" onClick={() => { setMobileMenuOpen(false); handleLogoutClick(); }} className="w-full justify-start">
                            <LogOut className="h-4 w-4 mr-2" />
                            Logout
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex flex-col gap-3">
                          <Link
                            to="/#about"
                            onClick={() => setMobileMenuOpen(false)}
                            className={`text-sm px-3 py-2 rounded-md transition-all duration-200 ${location.hash === '#about' ? 'text-foreground font-semibold bg-accent/70' : 'text-foreground/70 hover:text-foreground hover:bg-accent/50'}`}
                          >
                            About
                          </Link>
                          <Link
                            to="/#how-it-works"
                            onClick={() => setMobileMenuOpen(false)}
                            className={`text-sm px-3 py-2 rounded-md transition-all duration-200 ${location.hash === '#how-it-works' ? 'text-foreground font-semibold bg-accent/70' : 'text-foreground/70 hover:text-foreground hover:bg-accent/50'}`}
                          >
                            How It Works
                          </Link>
                          <Link
                            to="/#features"
                            onClick={() => setMobileMenuOpen(false)}
                            className={`text-sm px-3 py-2 rounded-md transition-all duration-200 ${location.hash === '#features' ? 'text-foreground font-semibold bg-accent/70' : 'text-foreground/70 hover:text-foreground hover:bg-accent/50'}`}
                          >
                            Features
                          </Link>
                          <Link
                            to="/#contact"
                            onClick={() => setMobileMenuOpen(false)}
                            className={`text-sm px-3 py-2 rounded-md transition-all duration-200 ${location.hash === '#contact' ? 'text-foreground font-semibold bg-accent/70' : 'text-foreground/70 hover:text-foreground hover:bg-accent/50'}`}
                          >
                            Contact
                          </Link>
                        </div>
                        <div className="border-t border-border/30 pt-4">
                          <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                            <Button size="sm" className="w-full rounded-full">Login</Button>
                          </Link>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Desktop right controls */}
            <div className="hidden md:flex items-center gap-3">
              {token ? (
                <>
                  <div className="flex items-center gap-1 rounded-full border border-border/40 bg-card/50 px-1.5 py-1">
                    <motion.div whileHover={{ scale: 1.05, rotate: 5 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleTheme}
                        className="rounded-full w-8 h-8 p-0 transition-all duration-200"
                      >
                        {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                      </Button>
                    </motion.div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="rounded-full w-9 h-9 p-0 hover:bg-accent/50 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:bg-accent/60"
                          aria-label="Open user menu"
                          aria-haspopup="menu"
                        >
                          <UserIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        sideOffset={8}
                        aria-label="User menu"
                        className="w-60 rounded-xl p-1 bg-popover/95 backdrop-blur-md border border-border/50 shadow-xl"
                      >
                        <div className="px-2 pt-2 pb-1">
                          <div className="text-sm font-semibold">{isAdmin ? 'Admin' : 'User'}</div>
                          <div className="text-xs text-muted-foreground truncate">{email}</div>
                          {provider === 'GOOGLE' && (
                            <div className="mt-1 text-[11px] text-muted-foreground">Signed in with Google</div>
                          )}
                        </div>
                        <DropdownMenuSeparator className="my-1 h-px bg-border/60" />
                        {provider !== 'GOOGLE' && (
                          <DropdownMenuItem
                            className="gap-2 rounded-lg px-2.5 py-2 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:bg-accent/60 data-[highlighted]:bg-accent/60 hover:bg-accent/60"
                            onClick={() => navigate('/forgot-password')}
                          >
                            <KeyRound className="h-4 w-4" />
                            <span>Change Password</span>
                          </DropdownMenuItem>
                        )}
                        {isAdmin && (
                          <DropdownMenuItem
                            className="gap-2 rounded-lg px-2.5 py-2 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:bg-accent/60 data-[highlighted]:bg-accent/60 hover:bg-accent/60"
                            onClick={() => navigate('/admin/users')}
                          >
                            <Users className="h-4 w-4" />
                            <span>Admin Panel</span>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator className="my-1 h-px bg-border/60" />
                        <DropdownMenuItem
                          className="gap-2 rounded-lg px-2.5 py-2 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:bg-destructive/15 text-destructive focus:text-destructive hover:bg-destructive/10 data-[highlighted]:bg-destructive/15"
                          onClick={handleLogoutClick}
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Sign Out</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </>
              ) : (
                <>
                  <motion.div whileHover={{ scale: 1.05, rotate: 5 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="ghost" size="sm" onClick={toggleTheme} className="rounded-full w-9 h-9 p-0 transition-all duration-200">
                      {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                    </Button>
                  </motion.div>
                  <Link to="/login">
                    <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }}>
                      <Button size="sm" className="rounded-full transition-all duration-200 hover:shadow-md">Login</Button>
                    </motion.div>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.nav>

      <Dialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogDescription>
              Are you sure you want to log out? You'll need to log in again to access your pastes.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={handleLogoutCancel}>
              Cancel
            </Button>
            <Button onClick={handleLogoutConfirm}>
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
