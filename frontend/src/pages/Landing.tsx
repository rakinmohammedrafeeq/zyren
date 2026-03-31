import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router";
import { useAuthContext } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileText, Lock, Clock, Share2, ChevronDown, ArrowUp, File, Upload, Link as LinkIcon, MoreHorizontal, Loader2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { toast } from "sonner";
import api from "@/lib/api";
export default function Landing() {
  const { token } = useAuthContext();
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const update = () => setReduceMotion(!!mql?.matches);
    update();
    mql?.addEventListener?.('change', update);
    return () => mql?.removeEventListener?.('change', update);
  }, []);
  type Burst = {
    id: number;
    x: number;
    y: number;
    icon: "share" | "upload" | "paper";
    rotate: number;
    scale: number;
    lifeMs: number;
  };
  const [bursts, setBursts] = useState<Burst[]>([]);
  const nextId = useRef(1);
  const handleClick = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotate = (Math.random() * 40 - 20) | 0;
    const scale = 0.9 + Math.random() * 0.5;
    const choices: Burst["icon"][] = ["share", "upload", "paper"];
    const icon = choices[Math.floor(Math.random() * choices.length)];
    const lifeMs = 750 + Math.round(Math.random() * 350);
    const id = nextId.current++;
    setBursts(prev => [...prev, { id, x, y, rotate, scale, icon, lifeMs }].slice(-12));
    window.setTimeout(() => {
      setBursts(prev => prev.filter(b => b.id !== id));
    }, lifeMs);
  }, []);
  type Particle = {
    id: number;
    variant: "dot" | "icon";
    left: string;
    top: number;
    delay: number;
    duration: number;
    opacity: number;
    dx: number;
    dy: number;
    size: number;
    icon?: "file" | "link" | "share-dots";
  };

  const particles = useMemo<Particle[]>(() => (
    Array.from({ length: 35 }).map((_, i) => {
      const rand = Math.random();
      const top = Math.random() * 100;
      const left = `${Math.random() * 100}%`;
      const delay = Math.random() * 3;
      const duration = 4 + Math.random() * 4;
      const opacity = 0.25 + Math.random() * 0.3;
      const dx = (Math.random() > 0.5 ? 1 : -1) * (40 + Math.random() * 80);
      const dy = (Math.random() > 0.5 ? 1 : -1) * (40 + Math.random() * 80);
      if (rand < 0.4) {
        return { id: i, variant: "dot" as const, left, top, delay, duration, opacity, dx, dy, size: 4 + Math.random() * 4 };
      }
      if (rand < 0.65) {
        return { id: i, variant: "icon" as const, icon: "file" as const, left, top, delay, duration, opacity, dx, dy, size: 24 + Math.random() * 12 };
      }
      if (rand < 0.85) {
        return { id: i, variant: "icon" as const, icon: "link" as const, left, top, delay, duration, opacity, dx, dy, size: 20 + Math.random() * 10 };
      }
      return { id: i, variant: "icon" as const, icon: "share-dots" as const, left, top, delay, duration, opacity, dx, dy, size: 18 + Math.random() * 10 };
    })
  ), []);
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <Navbar />
      {}
      <motion.section
        id="hero"
        style={{ opacity }}
        className="relative overflow-hidden flex flex-col items-center justify-center px-4 py-12 min-h-[90svh]"
        onClick={handleClick}
      >
        {}
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
          {particles.map((p) =>
            p.variant === "dot" ? (
              <motion.span
                key={`dot-${p.id}`}
                className="absolute rounded-full will-change-transform bg-red-600 dark:bg-red-400"
                style={{ left: p.left, top: `${p.top}%`, width: p.size, height: p.size, opacity: p.opacity }}
                initial={{ x: 0, y: 0 }}
                animate={reduceMotion ? { x: 0, y: 0 } : { x: p.dx, y: p.dy }}
                transition={reduceMotion ? { duration: 0 } : { delay: p.delay, duration: p.duration, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              />
            ) : (
              <motion.div
                key={`icon-${p.id}`}
                className="absolute will-change-transform text-red-600 dark:text-red-400"
                style={{ left: p.left, top: `${p.top}%`, opacity: p.opacity }}
                initial={{ x: 0, y: 0 }}
                animate={reduceMotion ? { x: 0, y: 0 } : { x: p.dx, y: p.dy }}
                transition={reduceMotion ? { duration: 0 } : { delay: p.delay, duration: p.duration, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              >
                {p.icon === "file" ? (
                  <File size={p.size} strokeWidth={1.5} />
                ) : p.icon === "link" ? (
                  <LinkIcon size={p.size} strokeWidth={1.5} />
                ) : (
                  <MoreHorizontal size={p.size} strokeWidth={1.5} />
                )}
              </motion.div>
            )
          )}
        </div>
        {}
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          aria-hidden="true"
          style={{
            background: 'radial-gradient(circle at 50% 40%, rgba(239, 68, 68, 0.28) 0%, rgba(239, 68, 68, 0.12) 25%, transparent 60%)'
          }}
        />
        {}
        <div className="pointer-events-none absolute left-0 right-0 bottom-0 -z-20 overflow-hidden h-32 md:h-48" aria-hidden="true">
          <motion.svg
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            className="absolute bottom-0 left-0 h-32 md:h-48 w-[200%] opacity-40 fill-primary/40 will-change-transform"
            animate={reduceMotion ? { x: "0%" } : { x: ["0%", "-50%"] }}
            transition={reduceMotion ? { duration: 0 } : { duration: 14, repeat: Infinity, ease: "linear" }}
          >
            {}
            <path d="M0,80 C240,140 480,20 720,60 C960,100 1200,60 1440,100 L1440,120 L0,120 Z" />
            <path d="M0,80 C240,140 480,20 720,60 C960,100 1200,60 1440,100 L1440,120 L0,120 Z" transform="translate(1440, 0)" />
          </motion.svg>
          <motion.svg
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            className="absolute bottom-0 left-0 h-28 md:h-40 w-[200%] opacity-30 fill-primary/30 will-change-transform"
            animate={reduceMotion ? { x: "0%" } : { x: ["0%", "-50%"] }}
            transition={reduceMotion ? { duration: 0 } : { duration: 18, repeat: Infinity, ease: "linear" }}
          >
            {}
            <path d="M0,90 C240,60 480,120 720,80 C960,40 1200,100 1440,60 L1440,120 L0,120 Z" />
            <path d="M0,90 C240,60 480,120 720,80 C960,40 1200,100 1440,60 L1440,120 L0,120 Z" transform="translate(1440, 0)" />
          </motion.svg>
          <motion.svg
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            className="absolute bottom-0 left-0 h-24 md:h-32 w-[200%] opacity-20 fill-primary/20 will-change-transform"
            animate={reduceMotion ? { x: "0%" } : { x: ["0%", "-50%"] }}
            transition={reduceMotion ? { duration: 0 } : { duration: 24, repeat: Infinity, ease: "linear" }}
          >
            {}
            <path d="M0,100 C240,80 480,100 720,90 C960,80 1200,100 1440,90 L1440,120 L0,120 Z" />
            <path d="M0,100 C240,80 480,100 720,90 C960,80 1200,100 1440,90 L1440,120 L0,120 Z" transform="translate(1440, 0)" />
          </motion.svg>
        </div>
        {}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 md:h-20 z-0"
        >
          <div className="w-full h-full bg-gradient-to-b from-transparent to-background" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8 -mt-16 md:-mt-24">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-4"
          >
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight leading-tight">
              Store. Share.{" "}
              <span className="bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent">
                Secure.
              </span>
            </h1>
            <motion.div className="text-lg md:text-xl text-foreground/90 max-w-2xl mx-auto leading-relaxed space-y-2">
              <p>
                Stop losing snippets or sharing things the messy way.
              </p>
              <p>
                Zyren lets you save your code, notes, and files in one place — keep them private, set expiry when needed, or share instantly with a simple code.
              </p>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            {token ? (
              <>
                <Link to="/my-pastes">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                    <Button size="lg" className="rounded-full px-8 h-12 text-base shadow-lg hover:shadow-xl transition-all duration-200">
                      My Pastes →
                    </Button>
                  </motion.div>
                </Link>
                <Link to="/create-paste">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                    <Button size="lg" variant="outline" className="rounded-full px-8 h-12 text-base backdrop-blur-sm bg-background/50 border-border/50 hover:bg-background/80 shadow-md hover:shadow-lg transition-all duration-200">
                      Create Paste →
                    </Button>
                  </motion.div>
                </Link>
              </>
            ) : (
              <>
                <Link to="/login">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                    <Button size="lg" className="rounded-full px-8 h-12 text-base shadow-lg hover:shadow-xl transition-all duration-200">
                      Get Started →
                    </Button>
                  </motion.div>
                </Link>
                <Link to="/public">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                    <Button size="lg" variant="outline" className="rounded-full px-8 h-12 text-base backdrop-blur-sm bg-background/50 border-border/50 hover:bg-background/80 shadow-md hover:shadow-lg transition-all duration-200">
                      Explore Public Codes →
                    </Button>
                  </motion.div>
                </Link>
              </>
            )}
          </motion.div>
        </div>
        {}
        <div className="pointer-events-none absolute inset-0 z-40">
          {bursts.map((b) => (
            <motion.div
              key={b.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: b.x, top: b.y }}
              initial={{ opacity: 0, y: 0, scale: 0.85, rotate: b.rotate }}
              animate={reduceMotion ? { opacity: 1 } : { opacity: [0, 1, 0], y: -60, scale: [0.85, b.scale * 1.2] }}
              transition={{ duration: b.lifeMs / 1000, ease: "easeOut" }}
            >
              <div className="text-red-600 dark:text-red-400">
                {b.icon === "share" && <Share2 className="size-5" />}
                {b.icon === "upload" && <Upload className="size-5" />}
                {b.icon === "paper" && <FileText className="size-5" />}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
      {}
      <section id="about" className="py-16 px-4 bg-background transition-colors">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.01, transition: { duration: 0.3 } }}
            className="space-y-6 text-center relative group"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition duration-500" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight transition-colors duration-200 hover:text-primary mb-8 md:mb-10">About Zyren</h2>
              <div className="space-y-4 text-lg text-foreground/90 leading-relaxed">
                <p>
                  Zyren is a modern, full-stack platform built to make sharing text, code, and media simple, secure, and efficient.
                </p>
                <p>
                  Whether you're a developer saving reusable code, a student organizing notes, or someone sharing quick snippets — Zyren provides a clean interface, JWT-based security, expiring links, and seamless public sharing through unique codes.
                </p>
                <p>
                  Designed for performance, privacy, and scalability, Zyren ensures your content is always accessible, manageable, and protected.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      {}
      <section id="how-it-works" className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className=""
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center transition-colors duration-200 hover:text-primary">How Zyren Works</h2>
            <p className="mt-1 mb-12 text-base md:text-lg text-foreground/90 text-center">A simple flow to create, store, and share securely.</p>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { step: "1", title: "Create a paste with title, content, and optional media" },
                { step: "2", title: "Choose privacy settings (private or public access)" },
                { step: "3", title: "Zyren securely stores data with authentication and ownership checks" },
                { step: "4", title: "Share using a unique public code — accessible instantly anywhere" },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className="relative group"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-accent/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition duration-500" />
                  <div className="relative bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 p-8 h-full shadow-sm transition-all duration-200 hover:shadow-lg hover:border-primary/40 hover:-translate-y-1">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                        {item.step}
                      </div>
                      <p className="text-lg leading-relaxed pt-2">{item.title}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      {}
      <section id="features" className="py-16 px-4 bg-background transition-colors">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className=""
          >
            <h2 className="mb-2 text-3xl md:text-4xl font-bold tracking-tight text-center transition-colors duration-200 hover:text-primary">Features</h2>
            <p className="text-base md:text-lg text-foreground/90 text-center mb-12">Built with modern technologies like Spring Boot, React, JWT, and Cloudinary for a fast and secure experience.</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Lock,
                  title: "Secure Storage",
                  description: "JWT-based authentication with strict ownership control ensures your private data stays protected.",
                },
                {
                  icon: Share2,
                  title: "Public Code Sharing",
                  description: "Generate unique shareable codes to instantly share pastes without requiring login.",
                },
                {
                  icon: Clock,
                  title: "Expiring Pastes",
                  description: "Set expiry timers with automated cleanup for temporary or sensitive content.",
                },
                {
                  icon: FileText,
                  title: "Media Support",
                  description: "Attach images, PDFs, and files via Cloudinary with secure access and deletion control.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.2 } }}
                  className="group relative"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/40 to-accent/30 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition duration-500" />
                  <div className="relative p-8 rounded-xl backdrop-blur-md bg-card/40 border border-border/40 shadow-sm hover:shadow-lg hover:border-primary/40 transition-all duration-200 h-full">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    <div className="relative space-y-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold text-lg">{feature.title}</h3>
                      <p className="text-sm text-foreground/90 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      {}
      <motion.section
        id="faq"
        className="py-16 px-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-center transition-colors duration-200 hover:text-primary">Frequently Asked Questions</h2>
            <p className="mt-0.5 mb-12 text-base md:text-lg text-foreground/90 text-center">Everything you need to know about Zyren</p>
            <div className="space-y-4">
              {[
                {
                  question: "Is Zyren free to use?",
                  answer: "Yes, Zyren is free to use for creating, managing, and sharing pastes. Future enhancements may introduce additional features.",
                },
                {
                  question: "Can I create private pastes?",
                  answer: "Yes. Private pastes are protected using authentication and can only be accessed and managed by you.",
                },
                {
                  question: "Do users need an account to view public pastes?",
                  answer: "No. Public pastes can be accessed instantly using a unique code — no login required.",
                },
                {
                  question: "Can I edit or delete my pastes later?",
                  answer: "Yes. You have full control over your pastes and can edit or delete them anytime. Ownership is strictly enforced.",
                },
                {
                  question: "How long do pastes last?",
                  answer: "You can set an optional expiry time. Expired pastes are automatically handled by the system and cleaned up periodically.",
                },
                {
                  question: "What types of content can I share?",
                  answer: "You can share text, code snippets, and optional media files such as images or documents.",
                },
                {
                  question: "Is my data secure?",
                  answer: "Yes. Zyren uses JWT-based authentication, secure backend validation, and ownership checks to protect your data.",
                },
                {
                  question: "Can I share pastes with specific people?",
                  answer: "Currently, sharing is done via public codes. Anyone with the code can access the paste.",
                },
                {
                  question: "Is there a limit to paste size?",
                  answer: "Paste size limits depend on system constraints and media upload limits configured in the backend.",
                },
                {
                  question: "Can I upload files or media?",
                  answer: "Yes. Zyren supports media uploads such as images and files using secure cloud storage integration.",
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ x: 4, transition: { duration: 0.2 } }}
                  className="relative group"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-accent/20 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition duration-300" />
                  <div className="relative bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 overflow-hidden shadow-sm transition-all duration-300 group-hover:shadow-lg group-hover:border-primary/40">
                    <button
                      type="button"
                      id={`faq-header-${index}`}
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpenFaq(openFaq === index ? null : index); } }}
                      aria-controls={`faq-panel-${index}`}
                      aria-expanded={openFaq === index}
                      className={`w-full px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between text-left transition-colors rounded-md ${openFaq === index ? 'bg-muted/30' : 'hover:bg-muted/20'}`}
                    >
                      <span className="font-semibold text-lg">{faq.question}</span>
                      <motion.div
                        animate={{ rotate: openFaq === index ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      </motion.div>
                    </button>
                    <motion.div
                      id={`faq-panel-${index}`}
                      role="region"
                      aria-labelledby={`faq-header-${index}`}
                      initial={false}
                      animate={{
                        height: openFaq === index ? "auto" : 0,
                        opacity: openFaq === index ? 1 : 0,
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 sm:px-6 pb-4 text-foreground/90 leading-relaxed text-sm md:text-base">
                        {faq.answer}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>
      {}
      <section id="impact" className="py-16 px-4 bg-primary">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white dark:text-black">Ready to get started?</h2>
            <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed text-white dark:text-black mb-10">
              Start creating, managing, and sharing your content securely with Zyren — fast, reliable, and built for real-world usage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link to="/login">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <Button size="lg" className="rounded-full px-8 h-12 text-base shadow-lg hover:shadow-xl transition-all duration-200 bg-white dark:bg-black text-black dark:text-white hover:bg-white/90 dark:hover:bg-black/90">
                    Get Started →
                  </Button>
                </motion.div>
              </Link>
              <Link to="/public">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <Button size="lg" variant="outline" className="rounded-full px-8 h-12 text-base backdrop-blur-sm bg-white/20 border-white dark:bg-black/20 dark:border-black text-white dark:text-black hover:bg-white hover:text-primary dark:hover:bg-gray-900 dark:hover:text-primary shadow-md hover:shadow-lg transition-all duration-200">
                    Explore Public Codes →
                  </Button>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      {}
      <section id="contact" className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="text-center space-y-3">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight transition-colors duration-200 hover:text-primary">Get In Touch</h2>
              <p className="text-lg text-foreground/90 leading-relaxed mb-10">
                Have questions, feedback, or ideas? Reach out — we’d love to hear from you.
              </p>
            </div>
            {}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -6, scale: 1.01, transition: { duration: 0.2 } }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/40 to-accent/30 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition duration-500" />
              <div className="relative bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 p-8 shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-200">
                <form className="space-y-6" onSubmit={async (e) => {
                  e.preventDefault();
                  setContactLoading(true);
                  const form = e.currentTarget as HTMLFormElement;
                  const fd = new FormData(form);
                  const name = (fd.get('name') || '').toString();
                  const email = (fd.get('email') || '').toString();
                  const message = (fd.get('message') || '').toString();
                  try {
                      await api.post('/contact', { name, email, message }, { suppressErrorToast: true });
                      toast.success('Message sent successfully');
                    form.reset();
                  } catch (err) {
                    const e2 = err as { response?: { data?: { message?: string } } };
                    toast.error(e2.response?.data?.message || 'Failed to send message. Please try again.');
                  } finally {
                    setContactLoading(false);
                  }
                }}>
                  <div className="space-y-2">
                    <Label htmlFor="contact-name" className="text-sm font-medium">Name</Label>
                    <Input
                      id="contact-name"
                      name="name"
                      type="text"
                      placeholder="Your name"
                      className="h-11 bg-background/50 border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/40 focus:outline-none placeholder:text-muted-foreground/60 transition-colors"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email" className="text-sm font-medium">Email</Label>
                    <Input
                      id="contact-email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      className="h-11 bg-background/50 border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/40 focus:outline-none placeholder:text-muted-foreground/60 transition-colors"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-message" className="text-sm font-medium">Message</Label>
                    <Textarea
                      id="contact-message"
                      name="message"
                      placeholder="Your message..."
                      className="min-h-32 bg-background/50 border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/40 focus:outline-none placeholder:text-muted-foreground/60 transition-colors resize-none"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full rounded-full h-12 text-base shadow-lg hover:shadow-xl transition-all duration-200"
                    disabled={contactLoading}
                  >
                    {contactLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Sending...</> : 'Send Message'}
                  </Button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      {}
      {showScrollTop && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <ArrowUp className="h-5 w-5 mx-auto" />
        </motion.button>
      )}
    </div>
  );
}
