import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, MessageCircle } from 'lucide-react';

const navLinks = [
  { label: 'Accueil', href: '#hero' },
  { label: 'Compétences', href: '#skills' },
  { label: 'Expérience', href: '#experience' },
  { label: 'Projets', href: '#projects' },
  { label: 'Témoignages', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export function Navigation() {
  const [visible, setVisible] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.5);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: visible ? 1 : 0,
          y: visible ? 0 : -20,
          pointerEvents: visible ? 'auto' : 'none',
        }}
        transition={{ duration: 0.4 }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: 'rgba(15, 15, 15, 0.8)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}
        />
        <div className="relative w-full max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between">
          <span className="text-[0.875rem] font-bold uppercase tracking-[0.08em] text-[#f5ebe0]">
            Tojo Nambinina
          </span>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-[0.875rem] font-medium text-[#94a3b8] hover:text-[#f5ebe0] transition-colors duration-200"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href="https://wa.me/261387729958"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center hover:scale-110 transition-transform duration-200"
            >
              <MessageCircle size={18} className="text-white" />
            </a>
          </div>

          <button
            className="lg:hidden text-[#f5ebe0]"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[60] bg-[#0f0f0f] flex flex-col items-center justify-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              className="absolute top-6 right-6 text-[#f5ebe0]"
              onClick={() => setMobileOpen(false)}
            >
              <X size={28} />
            </button>
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-2xl font-semibold text-[#f5ebe0] hover:text-[#e76f51] transition-colors"
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
