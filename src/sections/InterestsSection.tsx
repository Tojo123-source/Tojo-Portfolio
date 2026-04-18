import { useEffect, useRef } from 'react';
import {
  BookOpen, Activity, Camera, Music, Sparkles, Film, Users, Brain,
  Target, Zap, Clock, Heart,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionHeader } from '@/components/SectionHeader';
import { interests, strengths } from '@/data';

gsap.registerPlugin(ScrollTrigger);

const interestIcons: Record<string, React.ReactNode> = {
  'Lecture': <BookOpen size={20} />,
  'Basket-ball': <Activity size={20} />,
  'Photographie': <Camera size={20} />,
  'Musique': <Music size={20} />,
  'Animation': <Sparkles size={20} />,
  'Créativité': <Film size={20} />,
  'Cinématographie': <Camera size={20} />,
};

const strengthIcons: Record<string, React.ReactNode> = {
  'Autonomie': <Zap size={20} />,
  'Résolution de problèmes': <Brain size={20} />,
  'Travail sous pression': <Clock size={20} />,
  "Esprit d'équipe": <Users size={20} />,
  'Adaptabilité': <Target size={20} />,
  'Attention aux détails': <Heart size={20} />,
};

export function InterestsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items = section.querySelectorAll('.interest-item');
    gsap.set(items, { opacity: 0, y: 20, scale: 0.95 });

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(items, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.06,
        });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#0f0f0f] section-padding">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Interests */}
          <div>
            <SectionHeader label="PASSIONS" title="Intérêts & Loisirs" />
            <div className="flex flex-wrap gap-3 mt-8">
              {interests.map((interest) => (
                <div
                  key={interest}
                  className="interest-item glass-card rounded-full px-5 py-3 flex items-center gap-2.5 text-[#f5ebe0] hover:bg-[rgba(231,111,81,0.1)] hover:border-[rgba(231,111,81,0.3)] transition-all duration-200 cursor-default"
                >
                  <span className="text-[#e76f51]">{interestIcons[interest] || <Sparkles size={20} />}</span>
                  <span className="text-sm font-medium">{interest}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Strengths */}
          <div>
            <SectionHeader label="ATOUTS" title="Points Forts" />
            <div className="flex flex-wrap gap-3 mt-8">
              {strengths.map((strength) => (
                <div
                  key={strength}
                  className="interest-item glass-card rounded-full px-5 py-3 flex items-center gap-2.5 text-[#f5ebe0] hover:bg-[rgba(244,162,97,0.1)] hover:border-[rgba(244,162,97,0.3)] transition-all duration-200 cursor-default"
                >
                  <span className="text-[#f4a261]">{strengthIcons[strength] || <Zap size={20} />}</span>
                  <span className="text-sm font-medium">{strength}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
