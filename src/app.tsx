import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LazyMotion, domAnimation } from "framer-motion";
import Index from "./pages/index.tsx";
import { ModeProvider } from "./context/mode-context";
import SiteLayout from "./components/layout/site-layout";

const About = lazy(() => import("./pages/about.tsx"));
const WorkIndex = lazy(() => import("./pages/work-index.tsx"));
const WorkCaseStudy = lazy(() => import("./pages/work-case-study.tsx"));
const NotFound = lazy(() => import("./pages/not-found.tsx"));

const App = () => (
  <LazyMotion features={domAnimation} strict>
    <ModeProvider>
      <BrowserRouter>
        <SiteLayout>
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/work" element={<WorkIndex />} />
              <Route path="/work/:slug" element={<WorkCaseStudy />} />
              {/* <Route path="/writing" element={<BlogIndex />} /> */}
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </SiteLayout>
      </BrowserRouter>
    </ModeProvider>
  </LazyMotion>
);

export default App;
