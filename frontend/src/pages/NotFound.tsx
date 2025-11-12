import { motion } from "framer-motion";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
export default function NotFound() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  useEffect(() => {
    const updateTheme = () => {
      setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
    };
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex flex-col">
      {}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-border/40 backdrop-blur-sm bg-background/80"
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-5xl">
          <Link
            to="/"
            className="flex items-center gap-2 text-lg font-semibold tracking-tight hover:opacity-80 transition-opacity"
          >
            <img
              src={
                theme === "light"
                  ? "https://harmless-tapir-303.convex.cloud/api/storage/0fa135bb-61af-462c-bdbb-705fa1931cff"
                  : "https://harmless-tapir-303.convex.cloud/api/storage/ad0ffa05-6096-4828-a7ce-c0fbbef0f2cc"
              }
              alt="Zyren Logo"
              className="h-7 w-7"
            />
            <span>Zyren</span>
          </Link>
        </div>
      </motion.header>
      {}
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6 max-w-md"
        >
          <div className="space-y-2">
            <h1 className="text-6xl font-extrabold tracking-tight">404</h1>
            <p className="text-base text-foreground/90">Page not found</p>
          </div>
          <div className="flex items-center justify-center gap-3 pt-2">
            <Link to="/">
              <Button size="lg" className="rounded-full">
                Go Home
              </Button>
            </Link>
            <Link to="/public">
              <Button variant="outline" size="lg" className="rounded-full">
                Public Code
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}