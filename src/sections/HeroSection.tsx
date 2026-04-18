import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Code2, Film, Globe, ChevronDown } from 'lucide-react';
import gsap from 'gsap';

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to(labelRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0.3)
      .to(nameRef.current, { opacity: 1, y: 0, duration: 0.8 }, 0.5)
      .to(taglineRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0.7)
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.5 }, 0.9)
      .to(cardsRef.current?.children || [], {
        opacity: 1,
        x: 0,
        duration: 0.7,
        stagger: 0.15,
      }, 0.6);
  }, []);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full min-h-[100dvh] overflow-hidden flex items-end"
    >
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster="/images/hero-poster.jpg"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, rgba(15, 15, 15, 0.75) 0%, rgba(26, 26, 46, 0.6) 50%, rgba(15, 15, 15, 0.8) 100%)',
        }}
      />

      {/* Grain Texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 pb-16 lg:pb-24 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12">
        {/* Left Content */}
        <div className="max-w-[600px]">
          <span
            ref={labelRef}
            className="text-caption text-[#f4a261] block mb-4 opacity-0 translate-y-5"
          >
            DÉVELOPPEUR FULL-STACK & MOTION DESIGNER
          </span>
          <h1
            ref={nameRef}
            className="text-display-1 text-[#f5ebe0] opacity-0 translate-y-8"
            style={{ textShadow: '0 4px 24px rgba(0,0,0,0.5)' }}
          >
            Tojo
            <br />
            Nambinina
          </h1>
          <p
            ref={taglineRef}
            className="text-lg lg:text-xl text-[#94a3b8] mt-5 max-w-[520px] opacity-0 translate-y-5"
          >
            Créateur de contenus numériques qui marquent les esprits. Je conçois
            des expériences web et à la Communication en Audiovisuel et Numérique.
          </p>
          <div ref={ctaRef} className="flex flex-wrap gap-4 mt-8 opacity-0 translate-y-4">
            <button
              onClick={() => scrollTo('#projects')}
              className="px-7 py-3.5 bg-[#e76f51] text-white rounded-xl text-[0.9375rem] font-medium hover:bg-[#f4a261] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(244,162,97,0.3)] transition-all duration-200"
            >
              Découvrir mes projets
            </button>
            <button
              onClick={() => scrollTo('#contact')}
              className="px-7 py-3.5 border border-[rgba(255,255,255,0.2)] text-[#f5ebe0] rounded-xl text-[0.9375rem] font-medium hover:bg-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.4)] transition-all duration-200"
            >
              Me contacter
            </button>
          </div>
        </div>

        {/* Right Info Cards */}
        <div ref={cardsRef} className="hidden lg:flex flex-col gap-4 w-[280px] flex-shrink-0">
          {[
            {
              icon: <Code2 size={24} className="text-[#e76f51]" />,
              title: 'Développement Web',
              text: 'Sites vitrines, applications web, systèmes de gestion scolaire. React, TypeScript, Supabase.',
            },
            {
              icon: <Film size={24} className="text-[#f4a261]" />,
              title: 'Motion Design & Vidéo',
              text: 'Montage dynamique, motion design, contenus créatifs pour réseaux sociaux. After Effects, Premiere Pro.',
            },
            {
              icon: <Globe size={24} className="text-[#2a9d8f]" />,
              title: 'Disponible',
              text: 'Ouvert aux collaborations freelance et opportunités internationales.',
              badge: 'OPEN TO WORK',
            },
          ].map((card, i) => (
            <div
              key={i}
              className="glass-card rounded-2xl p-5 opacity-0 translate-x-10"
            >
              <div className="flex items-center gap-3 mb-2">
                {card.icon}
                <h3 className="text-[1.125rem] font-semibold text-[#f5ebe0]">{card.title}</h3>
              </div>
              <p className="text-sm text-[#94a3b8] leading-relaxed">{card.text}</p>
              {'badge' in card && card.badge && (
                <span className="inline-block mt-3 px-3 py-1 rounded-full text-[0.6875rem] font-semibold bg-[rgba(42,157,143,0.15)] text-[#2a9d8f]">
                  {card.badge}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1.5 }}
      >
        <ChevronDown size={24} className="text-[#f5ebe0] animate-bounce-chevron" />
      </motion.div>
    </section>
  );
}
