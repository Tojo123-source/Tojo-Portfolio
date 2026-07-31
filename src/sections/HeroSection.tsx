import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Download, Linkedin } from 'lucide-react';
import gsap from 'gsap';

type WaveformBar = { delay: number; height: number };

function makeWaveformBars(): WaveformBar[] {
  return Array.from({ length: 28 }, () => ({
    delay: Math.random() * 1.6,
    height: 20 + Math.random() * 36,
  }));
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const waveformRef = useRef<HTMLDivElement>(null);
  const [waveformBars] = useState<WaveformBar[]>(makeWaveformBars);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to('.hero-eyebrow', { opacity: 1, y: 0, duration: 0.6 }, 0.2)
      .to('.hero-name', { opacity: 1, y: 0, duration: 0.8 }, 0.4)
      .to('.hero-tagline', { opacity: 1, y: 0, duration: 0.6 }, 0.6)
      .to('.hero-cta', { opacity: 1, y: 0, duration: 0.5 }, 0.8)
      .to('.hero-scope', { opacity: 1, x: 0, duration: 0.7 }, 0.5);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100dvh] flex flex-col justify-center bg-ink pt-40"
    >
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-20"
        poster="/images/hero-poster.jpg"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(135deg, rgba(10, 12, 16, 0.9) 0%, rgba(18, 21, 27, 0.8) 50%, rgba(10, 12, 16, 0.95) 100%)',
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
      <div className="relative z-10 max-w-[1400px] mx-auto px-[8vw] pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-12 lg:gap-20 items-end">
          {/* Left Content */}
          <div>
            <div className="hero-eyebrow eyebrow mb-6 opacity-0 translate-y-4">
              <span className="dot" />
              DÉVELOPPEUR WEB — DISPONIBLE
            </div>
            <h1 className="hero-name font-serif opacity-0 translate-y-6 mb-6">
              Tojo<br /><em className="text-teal italic">Nambinina</em>
            </h1>
            <p className="hero-tagline text-lg lg:text-xl max-w-[520px] opacity-0 translate-y-4 mb-10" style={{ color: '#8A8F99', lineHeight: '1.6' }}>
              Développeur web orienté produit, avec un œil affûté par plusieurs années en montage et motion design. Je code proprement — et je sais aussi pourquoi une interface doit respirer.
            </p>
            <div className="hero-cta flex flex-wrap gap-3 opacity-0 translate-y-4">
              <button
                onClick={() => scrollTo('#projects')}
                className="btn btn-primary"
              >
                Voir mes projets
                <ChevronRight size={16} />
              </button>
              <a
                href="/cv/CV.pdf"
                download
                className="btn btn-ghost flex items-center gap-2"
              >
                <Download size={16} />
                Télécharger le CV
              </a>
              <a
                href="https://www.linkedin.com/in/tojonah-randria-56ab52327?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost flex items-center gap-2"
              >
                <Linkedin size={16} />
                LinkedIn
              </a>
            </div>
          </div>

          {/* Right Scope Panel */}
          <motion.div
            className="hero-scope relative"
            style={{
              background: '#12151B',
              border: '1px solid #252A33',
              borderRadius: '14px',
              padding: '22px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease: 'easeOut' }}
          >
            <div className="flex items-center gap-2 font-mono text-xs" style={{ color: '#35D0C0' }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#35D0C0' }} />
              SYSTEM.STATUS — EN LIGNE
            </div>

            <div ref={waveformRef} className="waveform flex items-end gap-[3px] h-[56px]">
              {waveformBars.map((bar, i) => (
                <span
                  key={i}
                  className="flex-1 rounded-[2px]"
                  style={{
                    background: 'linear-gradient(to top, #1E7A70, #35D0C0)',
                    height: `${bar.height}px`,
                    animationDelay: `${bar.delay}s`,
                  }}
                />
              ))}
            </div>

            <div className="flex justify-between font-mono text-[11px]" style={{ color: '#8A8F99' }}>
              <span>REACT · TS · NODE</span>
              <span>AE · PR · FIGMA</span>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full mx-auto mb-2"
            style={{ background: '#FF5A4E', boxShadow: '0 0 8px #FF5A4E' }}
            animate={{ opacity: [1, 0.25, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
          <p className="font-mono text-[10px] text-center uppercase tracking-wider" style={{ color: '#8A8F99' }}>
            SCROLL
          </p>
        </motion.div>
      </div>
    </section>
  );
}