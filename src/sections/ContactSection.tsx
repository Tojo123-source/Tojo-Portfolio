import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, MessageCircle, Send, CheckCircle, AlertCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionHeader } from '@/components/SectionHeader';
import { useContactForm } from '@/hooks/useContactForm';

gsap.registerPlugin(ScrollTrigger);

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { form, onSubmit, status } = useContactForm();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items = section.querySelectorAll('.contact-item');
    gsap.set(items, { opacity: 0, y: 30 });

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.1,
        });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="bg-[#0f0f0f] section-padding relative">
      <div className="max-w-[1400px] mx-auto">
        <SectionHeader
          label="CONTACT"
          title="Travaillons Ensemble"
          subtitle="Vous avez un projet en tête ? N'hésitez pas à me contacter."
          centered
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-14 max-w-[1000px] mx-auto">
          {/* Contact Info */}
          <div className="contact-item space-y-6">
            <div className="glass-card rounded-2xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[rgba(231,111,81,0.15)] flex items-center justify-center flex-shrink-0">
                <Mail size={22} className="text-[#e76f51]" />
              </div>
              <div>
                <h4 className="text-sm text-[#94a3b8]">Email</h4>
                <a href="mailto:tojo.devpro@gmail.com" className="text-[#f5ebe0] font-medium hover:text-[#e76f51] transition-colors">
                  tojo.devpro@gmail.com
                </a>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[rgba(244,162,97,0.15)] flex items-center justify-center flex-shrink-0">
                <Phone size={22} className="text-[#f4a261]" />
              </div>
              <div>
                <h4 className="text-sm text-[#94a3b8]">Téléphone</h4>
                <a href="tel:+261387729958" className="text-[#f5ebe0] font-medium hover:text-[#f4a261] transition-colors">
                  +261 38 77 299 58
                </a>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[rgba(42,157,143,0.15)] flex items-center justify-center flex-shrink-0">
                <MapPin size={22} className="text-[#2a9d8f]" />
              </div>
              <div>
                <h4 className="text-sm text-[#94a3b8]">Localisation</h4>
                <span className="text-[#f5ebe0] font-medium">Madagascar</span>
              </div>
            </div>

            <a
              href="https://wa.me/261387729958"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card rounded-2xl p-6 flex items-center gap-4 hover:bg-[rgba(37,211,102,0.1)] hover:border-[rgba(37,211,102,0.3)] transition-all duration-200 group"
            >
              <div className="w-12 h-12 rounded-xl bg-[rgba(37,211,102,0.15)] flex items-center justify-center flex-shrink-0 group-hover:bg-[rgba(37,211,102,0.25)]">
                <MessageCircle size={22} className="text-[#25D366]" />
              </div>
              <div>
                <h4 className="text-sm text-[#94a3b8]">WhatsApp</h4>
                <span className="text-[#f5ebe0] font-medium group-hover:text-[#25D366] transition-colors">
                  Discuter sur WhatsApp
                </span>
              </div>
            </a>
          </div>

          {/* Contact Form */}
          <div className="contact-item relative">
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="glass-card rounded-2xl p-6 lg:p-8 space-y-5"
            >
              <div>
                <label className="block text-sm text-[#94a3b8] mb-2">Nom</label>
                <input
                  {...form.register('name')}
                  className="w-full px-4 py-3 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-[#f5ebe0] placeholder:text-[#64748b] focus:outline-none focus:border-[#e76f51] focus:ring-1 focus:ring-[#e76f51] transition-all"
                  placeholder="Votre nom"
                />
                {form.formState.errors.name && (
                  <p className="text-sm text-red-400 mt-1">{form.formState.errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm text-[#94a3b8] mb-2">Email</label>
                <input
                  {...form.register('email')}
                  type="email"
                  className="w-full px-4 py-3 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-[#f5ebe0] placeholder:text-[#64748b] focus:outline-none focus:border-[#e76f51] focus:ring-1 focus:ring-[#e76f51] transition-all"
                  placeholder="votre@email.com"
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-red-400 mt-1">{form.formState.errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm text-[#94a3b8] mb-2">Message</label>
                <textarea
                  {...form.register('message')}
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-[#f5ebe0] placeholder:text-[#64748b] focus:outline-none focus:border-[#e76f51] focus:ring-1 focus:ring-[#e76f51] transition-all resize-none"
                  placeholder="Parlez-moi de votre projet..."
                />
                {form.formState.errors.message && (
                  <p className="text-sm text-red-400 mt-1">{form.formState.errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3.5 bg-[#e76f51] text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-[#f4a261] hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(244,162,97,0.3)] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send size={18} />
                    Envoyer le message
                  </>
                )}
              </button>

              {/* Messages d'erreur et succès en bas du formulaire */}
              <AnimatePresence mode="wait">
                {status === 'error' && (
                  <motion.div
                    className="flex items-center gap-2 text-red-400 text-sm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <AlertCircle size={16} />
                    Une erreur est survenue. Veuillez réessayer.
                  </motion.div>
                )}
              </AnimatePresence>
            </form>

            {/* Animation de succès centrée (overlay) */}
            <AnimatePresence>
              {status === 'success' && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center bg-[#0f0f0f]/95 backdrop-blur-xl rounded-2xl z-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className="text-center"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="mx-auto w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-6">
                      <CheckCircle size={60} className="text-green-500" />
                    </div>
                    <h3 className="text-2xl font-semibold text-[#f5ebe0] mb-2">Message envoyé !</h3>
                    <p className="text-[#94a3b8] max-w-[280px]">
                      Merci ! Je vous répondrai très bientôt.
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}