import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionHeader } from '@/components/SectionHeader';
import { experiences } from '@/data';

gsap.registerPlugin(ScrollTrigger);

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const line = lineRef.current;
    if (!section || !line) return;

    const cards = section.querySelectorAll('.timeline-card');
    const dates = section.querySelectorAll('.timeline-date');

    gsap.set(line, { scaleY: 0, transformOrigin: 'top' });
    gsap.set(cards, { opacity: 0, x: (i) => (experiences[i].side === 'left' ? -40 : 40) });
    gsap.set(dates, { opacity: 0 });

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 75%',
      once: true,
      onEnter: () => {
        gsap.to(line, {
          scaleY: 1,
          duration: 1,
          ease: 'power2.inOut',
        });
        gsap.to(cards, {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.2,
          delay: 0.3,
        });
        gsap.to(dates, {
          opacity: 1,
          duration: 0.4,
          stagger: 0.2,
          delay: 0.6,
        });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="bg-[#0f0f0f] section-padding">
      <div className="max-w-[900px] mx-auto">
        <SectionHeader label="PARCOURS" title="Expérience & Formation" />

        <div className="relative mt-14">
          {/* Timeline Line */}
          <div
            ref={lineRef}
            className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2"
            style={{
              background: 'linear-gradient(to bottom, #e76f51, #f4a261)',
            }}
          />

          {/* Timeline Items */}
          <div className="flex flex-col gap-10">
            {experiences.map((item, index) => (
              <div
                key={index}
                className={`relative flex items-start ${
                  item.side === 'left'
                    ? 'lg:flex-row'
                    : 'lg:flex-row-reverse'
                }`}
              >
                {/* Dot */}
                <div className="absolute left-6 lg:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#e76f51] border-4 border-[#0f0f0f] z-10 mt-6" />

                {/* Spacer for alternating layout */}
                <div className="hidden lg:block lg:w-1/2" />

                {/* Card */}
                <div className="ml-14 lg:ml-0 lg:w-1/2 timeline-card">
                  <div
                    className={`glass-card rounded-2xl p-6 ${
                      item.side === 'left' ? 'lg:mr-10' : 'lg:ml-10'
                    }`}
                  >
                    <h3 className="text-lg font-semibold text-[#f5ebe0]">{item.title}</h3>
                    <p className="text-sm text-[#94a3b8] mt-1">{item.company}</p>
                    <span className="timeline-date text-caption text-[#f4a261] mt-2 block">
                      {item.date}
                    </span>
                    <p className="text-sm text-[#94a3b8] mt-3 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
