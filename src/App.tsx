import React, { useState, useEffect, useCallback } from 'react';
import { ThemeProvider } from '@/core/theme/ThemeContext';
import { MotionProvider } from '@/core/motion/MotionProvider';
import { ScrollProvider } from '@/core/scroll/ScrollContext';
import { SoundProvider } from '@/core/audio/SoundManager';
import { MouseProvider } from '@/core/cursor/MouseProvider';
import { BackgroundEngine } from '@/core/background/BackgroundEngine';
import { GlobalPlanetaryCanvas } from '@/core/background/GlobalPlanetaryCanvas';
import { Navbar } from '@/modules/navigation/Navbar';
import { Footer } from '@/modules/navigation/Footer';
import { PreloaderSequence } from '@/primitives/PreloaderSequence';
import { CustomCursor } from '@/primitives/CustomCursor';
import { NoiseTexture } from '@/primitives/NoiseTexture';
import { ScrollProgress } from '@/primitives/ScrollProgress';
import { DeveloperCliModal } from '@/modules/cli/DeveloperCliModal';
import { HeroModule } from '@/modules/hero/HeroModule';
import { ProjectsModule } from '@/modules/projects/ProjectsModule';
import { TechScriptPlayground } from '@/modules/techscript/TechScriptPlayground';
import { SkillConstellationModule } from '@/modules/skills/SkillConstellationModule';
import { GithubEngineModule } from '@/modules/github/GithubEngineModule';
import { AboutModule } from '@/modules/about/AboutModule';
import { ContactModule } from '@/modules/contact/ContactModule';

const AppContent: React.FC = () => {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [preloaderFinished, setPreloaderFinished] = useState(false);
  const [preloaderUnmount, setPreloaderUnmount] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setPreloaderFinished(true);
    setTimeout(() => setPreloaderUnmount(true), 800);
  }, []);

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
      <BackgroundEngine />
      <GlobalPlanetaryCanvas />
      <ScrollProgress />
      <CustomCursor />

      {!preloaderUnmount && (
        <PreloaderSequence onComplete={handlePreloaderComplete} />
      )}

      <div
        className="min-h-screen flex flex-col relative"
        style={{
          opacity: preloaderFinished ? 1 : 0,
          pointerEvents: preloaderFinished ? 'auto' : 'none',
          transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <NoiseTexture />
        <Navbar />

        <main className="flex-1 w-full">
          <HeroModule />
          <ProjectsModule />
          <SkillConstellationModule />
          <TechScriptPlayground />
          <GithubEngineModule />
          <AboutModule />
          <ContactModule />
        </main>

        <Footer />
        <DeveloperCliModal isOpen={terminalOpen} onClose={() => setTerminalOpen(false)} />
      </div>
    </>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <MotionProvider>
        <ScrollProvider>
          <SoundProvider>
            <MouseProvider>
              <AppContent />
            </MouseProvider>
          </SoundProvider>
        </ScrollProvider>
      </MotionProvider>
    </ThemeProvider>
  );
};

export default App;
