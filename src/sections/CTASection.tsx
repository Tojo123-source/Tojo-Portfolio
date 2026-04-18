import { useEffect, useRef } from 'react';
import { MessageCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items = section.querySelectorAll('.cta-item');
    gsap.set(items, { opacity: 0, y: 30 });

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 75%',
      once: true,
      onEnter: () => {
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.2,
        });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[50vh] flex items-center overflow-hidden"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/cta-bg.jpg)' }}
      />

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, rgba(15, 15, 15, 0.92) 0%, rgba(15, 15, 15, 0.7) 60%, rgba(15, 15, 15, 0.5) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-20">
        <h2 className="cta-item text-display-2 text-[#f5ebe0] max-w-[600px]">
          Prêt à donner vie à votre projet ?
        </h2>
        <p className="cta-item text-lg text-[#94a3b8] max-w-[480px] mt-4">
          Discutons de vos idées et créons ensemble quelque chose d'exceptionnel.
        </p>
        <a
          href="https://wa.me/261387729958"
          target="_blank"
          rel="noopener noreferrer"
          className="cta-item inline-flex items-center gap-2 px-8 py-4 bg-[#e76f51] text-white rounded-xl text-[0.9375rem] font-medium hover:bg-[#f4a261] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(244,162,97,0.3)] transition-all duration-200 mt-8"
        >
          <MessageCircle size={20} />
          Me contacter sur WhatsApp
        </a>
      </div>
    </section>
  );
}
