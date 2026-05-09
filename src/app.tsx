import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { getBookingContactHref, getCalComBookingUrl } from "@/data/portfolio";
import Index from "./pages/index.tsx";
import NotFound from "./pages/not-found.tsx";
import About from "./pages/about.tsx";
import WorkIndex from "./pages/work-index.tsx";
import WorkCaseStudy from "./pages/work-case-study.tsx";
import BlogIndex from "./pages/blog-index.tsx";
import { ModeProvider } from "./context/mode-context";
import SiteLayout from "./components/layout/site-layout";

function ContactPathRedirect() {
  useEffect(() => {
    const cal = getCalComBookingUrl();
    const href = getBookingContactHref();
    if (cal) window.location.replace(href);
    else window.location.href = href;
  }, []);
  return (
    <div className="mx-auto max-w-4xl px-6 py-20 font-mono-pair text-xs uppercase tracking-[0.2em] text-muted-foreground">
      Redirecting…
    </div>
  );
}

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ModeProvider>
        <BrowserRouter>
          <SiteLayout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Navigate to="/work" replace />} />
              <Route path="/work" element={<WorkIndex />} />
              <Route path="/work/:slug" element={<WorkCaseStudy />} />
              <Route path="/blog" element={<BlogIndex />} />
              <Route path="/contact" element={<ContactPathRedirect />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </SiteLayout>
        </BrowserRouter>
      </ModeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
