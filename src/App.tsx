import { useState, useEffect } from 'react';
import { ScrubberNav } from '@/components/ScrubberNav';
import { LoadingScreen } from '@/components/LoadingScreen';
import { WhatsAppFAB } from '@/components/WhatsAppFAB';
import { HeroSection } from '@/sections/HeroSection';
import { SkillsSection } from '@/sections/SkillsSection';
import { ExperienceSection } from '@/sections/ExperienceSection';
import { ProjectsSection } from '@/sections/ProjectsSection';
import { ShowreelSection } from '@/sections/ShowreelSection';
import { InterestsSection } from '@/sections/InterestsSection';
import { CTASection } from '@/sections/CTASection';
import { ContactSection } from '@/sections/ContactSection';
import { Footer } from '@/sections/Footer';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      <ScrubberNav />
      <main>
        <HeroSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <ShowreelSection />
        <InterestsSection />
        <CTASection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppFAB />
    </>
  );
}

export default App;
