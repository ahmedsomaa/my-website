import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import { useMode } from "@/context/ModeContext";

export default function SiteLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const { mode } = useMode();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground relative overflow-x-hidden">
      {mode === "raw" && (
        <>
          <div className="pointer-events-none fixed inset-0 grid-bg-fine opacity-70 z-0" />
          <div className="pointer-events-none fixed inset-x-0 top-0 h-px bg-foreground/20 animate-scan z-10" />
        </>
      )}
      <SiteHeader />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 relative z-[1]"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <SiteFooter />
    </div>
  );
}