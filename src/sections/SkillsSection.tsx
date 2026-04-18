import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Code2, FileCode2, Paintbrush, Server, Database, Terminal, GitBranch,
  Clapperboard, Film, Image, PenTool, Scissors, Layout, Box,
} from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';
import { skillCategories } from '@/data';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 size={22} className="text-[#e76f51]" />,
  FileCode2: <FileCode2 size={22} className="text-[#e76f51]" />,
  Paintbrush: <Paintbrush size={22} className="text-[#e76f51]" />,
  Server: <Server size={22} className="text-[#e76f51]" />,
  Database: <Database size={22} className="text-[#e76f51]" />,
  Terminal: <Terminal size={22} className="text-[#e76f51]" />,
  GitBranch: <GitBranch size={22} className="text-[#e76f51]" />,
  Clapperboard: <Clapperboard size={22} className="text-[#f4a261]" />,
  Film: <Film size={22} className="text-[#f4a261]" />,
  Image: <Image size={22} className="text-[#f4a261]" />,
  PenTool: <PenTool size={22} className="text-[#f4a261]" />,
  Scissors: <Scissors size={22} className="text-[#f4a261]" />,
  Layout: <Layout size={22} className="text-[#f4a261]" />,
  Box: <Box size={22} className="text-[#f4a261]" />,
};

export function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll('.skill-card');
    const dots = section.querySelectorAll('.proficiency-dot');

    gsap.set(cards, { opacity: 0, y: 30, x: (i) => (i % 2 === 0 ? -20 : 20) });
    gsap.set(dots, { scale: 0 });

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          onComplete: () => {
            gsap.to(dots, {
              scale: 1,
              duration: 0.3,
              stagger: 0.03,
              ease: 'back.out(2)',
            });
          },
        });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="bg-[#0f0f0f] section-padding">
      <div className="max-w-[1400px] mx-auto">
        <SectionHeader
          label="COMPÉTENCES"
          title="Ma Stack Technique"
          subtitle="Les technologies et outils que j'utilise au quotidien pour donner vie à vos projets."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-16">
          {skillCategories.map((category, catIdx) => (
            <div key={catIdx}>
              <h3 className="text-xl font-semibold text-[#f5ebe0] mb-6">{category.title}</h3>
              <div className="flex flex-col gap-3">
                {category.skills.map((skill, skillIdx) => (
                    <div
                      key={skillIdx}
                      className="skill-card glass-card rounded-xl px-5 py-4 flex items-center gap-4"
                    >
                      {iconMap[skill.icon] || <Code2 size={22} className="text-[#e76f51]" />}
                      <span className="flex-1 text-[0.9375rem] font-medium text-[#f5ebe0]">
                        {skill.name}
                      </span>
                      <div className="flex gap-1.5">
                        {[1, 2, 3, 4, 5].map((dot) => (
                          <div
                            key={dot}
                            className={`proficiency-dot w-2 h-2 rounded-full ${
                              dot <= skill.proficiency
                                ? 'bg-[#e76f51]'
                                : 'bg-[rgba(255,255,255,0.1)]'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Section Divider */}
        <div
          className="w-[60%] h-px mx-auto mt-20"
          style={{
            background:
              'linear-gradient(to right, transparent 0%, rgba(231, 111, 81, 0.3) 50%, transparent 100%)',
          }}
        />
      </div>
    </section>
  );
}
