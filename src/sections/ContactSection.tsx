import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useContactForm } from '@/hooks/useContactForm';

gsap.registerPlugin(ScrollTrigger);

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { form, onSubmit, status } = useContactForm();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items = section.querySelectorAll('.contact-reveal');
    gsap.set(items, { opacity: 0, y: 30 });

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 75%',
      once: true,
      onEnter: () => {
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
        });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="bg-ink section-padding">
      <div className="max-w-[1400px] mx-auto px-[8vw]">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20">
          {/* Contact Info */}
          <div className="contact-reveal">
            <div className="eyebrow mb-4">CONTACT</div>
            <h2 className="font-serif text-4xl lg:text-5xl mb-4">Discutons</h2>
            <p className="mb-10" style={{ color: '#8A8F99', lineHeight: '1.6' }}>
              Ouvert aux opportunités en CDI comme en mission freelance. Réponse sous 24 à 48h.
            </p>

            <div className="space-y-0">
              <div className="info-row flex items-center gap-4 py-4 border-t border-line">
                <div className="info-ic">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="field-label">Email</div>
                  <a href="mailto:tojo.devpro@gmail.com" className="font-bold text-base hover:text-teal transition-colors">
                    tojo.devpro@gmail.com
                  </a>
                </div>
              </div>
              <div className="info-row flex items-center gap-4 py-4 border-t border-line">
                <div className="info-ic">
                  <Phone size={18} />
                </div>
                <div>
                  <div className="field-label">Téléphone / WhatsApp</div>
                  <a href="tel:+261387729958" className="font-bold text-base hover:text-teal transition-colors">
                    +261 38 77 299 58
                  </a>
                </div>
              </div>
              <div className="info-row flex items-center gap-4 py-4 border-t border-line border-b border-line">
                <div className="info-ic">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="field-label">Localisation</div>
                  <span className="font-bold text-base">Madagascar</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-reveal">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
              <div className="field">
                <label htmlFor="name" className="field-label">Nom</label>
                <input
                  {...form.register('name')}
                  id="name"
                  type="text"
                  className="field-input"
                  placeholder="Votre nom"
                  aria-invalid={form.formState.errors.name ? 'true' : 'false'}
                />
                {form.formState.errors.name && (
                  <p className="mt-1 text-sm text-red-400" role="alert">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>

              <div className="field">
                <label htmlFor="email" className="field-label">Email</label>
                <input
                  {...form.register('email')}
                  id="email"
                  type="email"
                  className="field-input"
                  placeholder="votre@email.com"
                  aria-invalid={form.formState.errors.email ? 'true' : 'false'}
                />
                {form.formState.errors.email && (
                  <p className="mt-1 text-sm text-red-400" role="alert">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div className="field">
                <label htmlFor="message" className="field-label">Message</label>
                <textarea
                  {...form.register('message')}
                  id="message"
                  rows={5}
                  className="field-input resize-y min-h-[120px]"
                  placeholder="Décrivez votre besoin..."
                  aria-invalid={form.formState.errors.message ? 'true' : 'false'}
                />
                {form.formState.errors.message && (
                  <p className="mt-1 text-sm text-red-400" role="alert">
                    {form.formState.errors.message.message}
                  </p>
                )}
              </div>

              {/* Honeypot field */}
              <div className="absolute left-[-9999px]" aria-hidden="true">
                <input {...form.register('honeypot')} tabIndex={-1} autoComplete="off" />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn btn-primary submit mt-2"
              >
                {status === 'loading' ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Envoi en cours...
                  </>
                ) : (
                  <>
                    Envoyer le message
                    <Send size={16} />
                  </>
                )}
              </button>

              <AnimatePresence mode="wait">
                {status === 'success' && (
                  <motion.div
                    className="flex items-center gap-2 text-green-400 text-sm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <CheckCircle size={16} />
                    Message envoyé avec succès !
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div
                    className="flex items-center gap-2 text-red-400 text-sm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <AlertCircle size={16} />
                    Une erreur est survenue. Réessayez.
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}