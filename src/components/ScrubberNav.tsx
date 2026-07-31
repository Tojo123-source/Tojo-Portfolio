import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, ChevronRight } from 'lucide-react';

const sections = [
  { id: 'hero', label: 'ACCUEIL' },
  { id: 'skills', label: 'COMPÉTENCES' },
  { id: 'projects', label: 'PROJETS' },
  { id: 'contact', label: 'CONTACT' },
];

export function ScrubberNav() {
  const [playheadPos, setPlayheadPos] = useState(0);
  const [timecode, setTimecode] = useState('00:00:00:00');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const max = document.body.scrollHeight - window.innerHeight;
      const pct = Math.min(100, Math.max(0, (scrollTop / max) * 100));
      setPlayheadPos(pct);

      const totalFrames = Math.floor((pct / 100) * 3600);
      const f = totalFrames % 60;
      const s = Math.floor(totalFrames / 60) % 60;
      const m = Math.floor(totalFrames / 3600) % 60;
      setTimecode(`00:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}:${String(f).padStart(2, '0')}`);

      setVisible(scrollTop > window.innerHeight * 0.3);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: 'rgba(10, 12, 16, 0.72)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          borderBottom: '1px solid #252A33',
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: visible ? 1 : 0,
          y: visible ? 0 : -20,
          pointerEvents: visible ? 'auto' : 'none',
        }}
        transition={{ duration: 0.4 }}
      >
        <div className="max-w-[1400px] mx-auto px-[8vw]">
          <div className="flex items-center justify-between h-[72px]">
            <span className="font-serif text-xl tracking-wide">
              TOJO<span className="text-teal">.</span>NAMBININA
            </span>

            <div className="hidden lg:flex items-center gap-10">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollTo(section.id)}
                  className="text-sm font-semibold text-muted hover:text-text transition-colors duration-200"
                >
                  {section.label}
                </button>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-3">
<a
                href="/cv/CV.pdf"
                download
                className="btn btn-ghost text-sm px-4 py-2 gap-1.5"
              >
                <Download size={14} />
                CV
              </a>
              <a
                href="https://www.linkedin.com/in/tojonah-randria-56ab52327"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary text-sm px-5 py-2.5 gap-2"
              >
                Contact
                <ChevronRight size={14} />
              </a>
            </div>
          </div>

          <div className="relative h-9">
            <div className="absolute left-[8vw] right-[8vw] top-1/2 h-px -translate-y-1/2" style={{ background: '#252A33' }} />
            <div id="ticks" className="absolute inset-0">
              {sections.map((section, i) => {
                const pct = (i / (sections.length - 1)) * 100;
                return (
                  <motion.div
                    key={section.id}
                    className="absolute"
                    style={{ left: `${pct}%`, top: '50%', transform: 'translate(-50%, -50%)' }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * i, duration: 0.5 }}
                  >
                    <div className="w-px h-[10px]" style={{ background: '#252A33' }} />
                    <span
                      className="hidden lg:block absolute -top-6 left-1/2 -translate-x-1/2 font-mono text-[10px] whitespace-nowrap opacity-70"
                      style={{ color: '#8A8F99' }}
                    >
                      {section.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>
            <motion.div
              className="absolute top-1/2 w-3 h-3 rounded-full"
              style={{
                left: `${playheadPos}%`,
                transform: 'translate(-50%, -50%)',
                background: '#FF5A4E',
                boxShadow: '0 0 0 4px rgba(255, 90, 78, 0.15)',
              }}
              animate={{ left: `${playheadPos}%` }}
              transition={{ duration: 0.15, ease: 'linear' }}
            />
            <div className="absolute right-[8vw] top-1/2 -translate-y-1/2 font-mono text-xs" style={{ color: '#35D0C0' }}>
              {timecode}
            </div>
          </div>
        </div>
      </motion.nav>

      <motion.div
        className="lg:hidden fixed bottom-6 right-6 z-50"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
<a
          href="/cv/CV.pdf"
          download
          className="btn btn-ghost w-12 h-12 p-0 justify-center"
          aria-label="Télécharger CV"
        >
          <Download size={20} />
        </a>
      </motion.div>
    </>
  );
}