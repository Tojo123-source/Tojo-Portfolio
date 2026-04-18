import { useEffect, useRef } from 'react';
import { MapPin, Mail, Phone, Linkedin, Instagram, Youtube, Palette } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: 'Accueil', href: '#hero' },
  { label: 'Compétences', href: '#skills' },
  { label: 'Projets', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const serviceLinks = [
  'Développement Web',
  'Motion Design',
  'Montage Vidéo',
  'Conseil Digital',
];

const socialLinks = [
  { icon: <Linkedin size={18} />, href: '#', label: 'LinkedIn' },
  { icon: <Instagram size={18} />, href: '#', label: 'Instagram' },
  { icon: <Palette size={18} />, href: '#', label: 'Behance' },
  { icon: <Youtube size={18} />, href: '#', label: 'YouTube' },
];

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [showLegal, setShowLegal] = useState(false);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const cols = footer.querySelectorAll('.footer-col');
    gsap.set(cols, { opacity: 0, y: 20 });

    const trigger = ScrollTrigger.create({
      trigger: footer,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.to(cols, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.1,
        });
      },
    });

    return () => trigger.kill();
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer ref={footerRef} className="bg-[#0f0f0f] border-t border-[rgba(255,255,255,0.06)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="footer-col">
            <h3 className="text-lg font-bold text-[#f5ebe0] uppercase tracking-wide">
              Tojo Nambinina
            </h3>
            <p className="text-sm text-[#94a3b8] mt-2">
              Développeur Full-Stack & Motion Designer
            </p>
            <div className="flex items-center gap-2 mt-3 text-sm text-[#94a3b8]">
              <MapPin size={14} />
              Madagascar
            </div>
          </div>

          {/* Navigation */}
          <div className="footer-col">
            <h4 className="text-caption text-[#f5ebe0] mb-4">Navigation</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm text-[#94a3b8] hover:text-[#f5ebe0] transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer-col">
            <h4 className="text-caption text-[#f5ebe0] mb-4">Services</h4>
            <ul className="space-y-2">
              {serviceLinks.map((service) => (
                <li key={service}>
                  <span className="text-sm text-[#94a3b8]">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Mentions légales */}
          <div className="footer-col">
            <h4 className="text-caption text-[#f5ebe0] mb-4">Contact</h4>
            <div className="space-y-3">
              <a href="mailto:tojo.devpro@gmail.com" className="flex items-center gap-2 text-sm text-[#94a3b8] hover:text-[#f5ebe0] transition-colors">
                <Mail size={14} />
                tojo.devpro@gmail.com
              </a>
              <a href="tel:+261387729958" className="flex items-center gap-2 text-sm text-[#94a3b8] hover:text-[#f5ebe0] transition-colors">
                <Phone size={14} />
                +261 38 77 299 58
              </a>

              <div className="flex gap-3 mt-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-9 h-9 rounded-full bg-[rgba(255,255,255,0.06)] flex items-center justify-center text-[#94a3b8] hover:bg-[rgba(231,111,81,0.15)] hover:text-[#e76f51] transition-all"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Lien Mentions Légales */}
            <button
              onClick={() => setShowLegal(true)}
              className="mt-8 text-xs text-[#64748b] hover:text-[#94a3b8] transition-colors underline-offset-4 hover:underline"
            >
              Mentions légales • Politique de confidentialité
            </button>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-[rgba(255,255,255,0.06)] text-center sm:text-left">
          <p className="text-sm text-[#64748b]">
            © 2025 Tojo Nambinina. Tous droits réservés.
          </p>
        </div>
      </div>

      {/* Modal Mentions Légales */}
      {showLegal && (
        <LegalModal onClose={() => setShowLegal(false)} />
      )}
    </footer>
  );
}