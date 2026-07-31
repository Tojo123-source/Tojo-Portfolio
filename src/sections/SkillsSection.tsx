import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code2, FileCode2, Paintbrush, Server, Database, Terminal, GitBranch, Zap } from 'lucide-react';
import { Clapperboard, Film, Image, PenTool, Scissors, Layout, Box } from 'lucide-react';
import { skillCategories } from '@/data';

gsap.registerPlugin(ScrollTrigger);

const devIcons: Record<string, React.ReactNode> = {
  Code2: <Code2 size={18} className="skill-icon text-muted transition-colors duration-200" />,
  FileCode2: <FileCode2 size={18} className="skill-icon text-muted transition-colors duration-200" />,
  Paintbrush: <Paintbrush size={18} className="skill-icon text-muted transition-colors duration-200" />,
  Server: <Server size={18} className="skill-icon text-muted transition-colors duration-200" />,
  Database: <Database size={18} className="skill-icon text-muted transition-colors duration-200" />,
  Terminal: <Terminal size={18} className="skill-icon text-muted transition-colors duration-200" />,
  GitBranch: <GitBranch size={18} className="skill-icon text-muted transition-colors duration-200" />,
  Zap: <Zap size={18} className="skill-icon text-muted transition-colors duration-200" />,
};

const motionIcons: Record<string, React.ReactNode> = {
  Clapperboard: <Clapperboard size={18} className="skill-icon text-muted transition-colors duration-200" />,
  Film: <Film size={18} className="skill-icon text-muted transition-colors duration-200" />,
  Image: <Image size={18} className="skill-icon text-muted transition-colors duration-200" />,
  PenTool: <PenTool size={18} className="skill-icon text-muted transition-colors duration-200" />,
  Scissors: <Scissors size={18} className="skill-icon text-muted transition-colors duration-200" />,
  Layout: <Layout size={18} className="skill-icon text-muted transition-colors duration-200" />,
  Box: <Box size={18} className="skill-icon text-muted transition-colors duration-200" />,
};

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [cardsRefs] = useState<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll('.skill-card');
    const cutLine = section.querySelector('.cut-line');

    gsap.set(cards, { opacity: 0, y: 30 });
    gsap.set(cutLine, { height: '0%' });

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 75%',
      once: true,
      onEnter: () => {
        gsap.to(cutLine, {
          height: '100%',
          duration: 1.2,
          ease: 'power2.out',
        });

        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.06,
          ease: 'power2.out',
          delay: 0.2,
        });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="bg-ink section-padding">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div>
            <div className="eyebrow mb-4">COMPÉTENCES</div>
            <h2 className="font-serif text-4xl lg:text-5xl">Ma stack technique</h2>
          </div>
          <p className="max-w-[340px] text-sm" style={{ color: '#8A8F99' }}>
            Deux disciplines, un seul réflexe : livrer quelque chose de propre.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-16 relative">
          {/* Développement Web */}
          <div className="skill-group relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-lg bg-panel border-line flex items-center justify-center text-teal">
                <Code2 size={16} />
              </div>
              <h3 className="font-manrope font-extrabold text-base tracking-wide">DÉVELOPPEMENT WEB</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {skillCategories[0].skills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  ref={(el) => { if (el) cardsRefs[i] = el; }}
                  className="skill-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  {devIcons[skill.icon] || <Code2 size={18} className="skill-icon text-muted" />}
                  <span className="font-medium text-sm">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Motion & Création */}
          <div className="skill-group relative">
            <div className="cut-line hidden lg:block absolute left-[30px] top-0 bottom-0 w-0" style={{ borderLeft: '1px dashed #252A33' }} />
            <div className="lg:pl-[60px] pt-16 lg:pt-0">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-lg bg-panel border-line flex items-center justify-center text-teal">
                  <Clapperboard size={16} />
                </div>
                <h3 className="font-manrope font-extrabold text-base tracking-wide">MOTION & CRÉATION</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {skillCategories[1].skills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    ref={(el) => { if (el) cardsRefs[skillCategories[0].skills.length + i] = el; }}
                    className="skill-card"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  >
                    {motionIcons[skill.icon] || <Clapperboard size={18} className="skill-icon text-muted" />}
                    <span className="font-medium text-sm">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}