import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@/core/theme/ThemeContext';
import { MotionProvider } from '@/core/motion/MotionProvider';
import { ScrollProvider } from '@/core/scroll/ScrollContext';
import { SoundProvider } from '@/core/audio/SoundManager';
// Background & Utilities
import { BackgroundEngine } from '@/core/background/BackgroundEngine';
import { GlobalPlanetaryCanvas } from '@/core/background/GlobalPlanetaryCanvas';
import { Navbar } from '@/modules/navigation/Navbar';
import { Footer } from '@/modules/navigation/Footer';
import { NoiseTexture } from '@/primitives/NoiseTexture';
import { ScrollProgress } from '@/primitives/ScrollProgress';
import { DeveloperCliModal } from '@/modules/cli/DeveloperCliModal';
import { ScrollToTop } from '@/core/router/ScrollToTop';

// Pages
import { HomePage } from '@/pages/HomePage';
import { AboutPage } from '@/pages/AboutPage';
import { NowPage } from '@/pages/NowPage';
import { ProjectsPage } from '@/pages/ProjectsPage';
import { ProjectSlugPage } from '@/pages/ProjectSlugPage';
import { AppsPage } from '@/pages/AppsPage';
import { AppSlugPage } from '@/pages/AppSlugPage';
import { TechScriptPage } from '@/pages/TechScriptPage';
import { TechnologiesPage } from '@/pages/TechnologiesPage';
import { WorkflowPage } from '@/pages/WorkflowPage';
import { JourneyPage } from '@/pages/JourneyPage';
import { ConnectPage } from '@/pages/ConnectPage';
import { ResumePage } from '@/pages/ResumePage';
import { BlogPage } from '@/pages/BlogPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { PreloaderSequence } from '@/primitives/PreloaderSequence';

const AppContent: React.FC = () => {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`' || e.key === '~' || (e.ctrlKey && e.key.toLowerCase() === 'k')) {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {showIntro && (
        <PreloaderSequence onComplete={() => setShowIntro(false)} />
      )}
      <ScrollToTop />
      <BackgroundEngine />
      <GlobalPlanetaryCanvas />
      <ScrollProgress />
      <NoiseTexture />

      <div className="min-h-screen flex flex-col relative z-10">
        <Navbar onOpenCli={() => setTerminalOpen(true)} />

        <main className="flex-1 w-full relative pb-24 md:pb-0">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/now" element={<NowPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:slug" element={<ProjectSlugPage />} />
            <Route path="/apps" element={<AppsPage />} />
            <Route path="/apps/:slug" element={<AppSlugPage />} />
            <Route path="/techscript" element={<TechScriptPage />} />
            <Route path="/technologies" element={<TechnologiesPage />} />
            <Route path="/workflow" element={<WorkflowPage />} />
            <Route path="/journey" element={<JourneyPage />} />
            <Route path="/connect" element={<ConnectPage />} />
            <Route path="/contact" element={<Navigate to="/connect" replace />} />
            <Route path="/resume" element={<ResumePage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        <Footer />
        <DeveloperCliModal isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />
      </div>
    </>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <MotionProvider>
          <ScrollProvider>
            <SoundProvider>
              <AppContent />
            </SoundProvider>
          </ScrollProvider>
        </MotionProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
