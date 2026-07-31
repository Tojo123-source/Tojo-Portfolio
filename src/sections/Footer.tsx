import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const items = footer.querySelectorAll('.footer-reveal');
    gsap.set(items, { opacity: 0, y: 20 });

    const trigger = ScrollTrigger.create({
      trigger: footer,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
        });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <footer ref={footerRef} className="bg-ink border-t border-line">
      <div className="max-w-[1400px] mx-auto px-[8vw] py-12">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="footer-reveal font-mono text-sm" style={{ color: '#8A8F99' }}>
            © 2026 TOJO NAMBININA — REC <span className="text-red" style={{ animation: 'pulse 1.6s infinite' }}>●</span>
          </div>
          <div className="footer-reveal flex gap-8">
            <a
              href="https://www.linkedin.com/in/tojonah-randria-56ab52327"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm transition-colors hover:text-teal"
              style={{ color: '#8A8F99' }}
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/Tojo123-source"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm transition-colors hover:text-teal"
              style={{ color: '#8A8F99' }}
            >
              GitHub
            </a>
            <a
              href="#"
              className="text-sm transition-colors hover:text-teal"
              style={{ color: '#8A8F99' }}
            >
              Instagram
            </a>
            <a
              href="#"
              className="text-sm transition-colors hover:text-teal"
              style={{ color: '#8A8F99' }}
            >
              YouTube
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}