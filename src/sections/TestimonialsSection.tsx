import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Quote } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionHeader } from '@/components/SectionHeader';
import { StarRating } from '@/components/StarRating';
import { testimonials } from '@/data';

gsap.registerPlugin(ScrollTrigger);

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [selectedTestimonial, setSelectedTestimonial] = useState<number | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (isAutoPlaying && selectedTestimonial === null) {
      intervalRef.current = setInterval(next, 5000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isAutoPlaying, selectedTestimonial, next]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items = section.querySelectorAll('.testimonial-item');
    gsap.set(items, { opacity: 0, y: 40 });

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

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedTestimonial(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const activeTestimonial = testimonials[current];

  return (
    <section ref={sectionRef} id="testimonials" className="bg-[#0f0f0f] section-padding overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <SectionHeader
          label="TÉMOIGNAGES"
          title="Ce que disent mes clients"
          subtitle="La satisfaction de mes clients est ma plus belle récompense."
          centered
        />

        {/* Rating Summary */}
        <div className="testimonial-item flex items-center justify-center gap-4 mt-8">
          <div className="flex items-center gap-2">
            <StarRating rating={5} size={20} />
          </div>
          <span className="text-[#94a3b8] text-sm">4.9/5 sur Google</span>
        </div>

        {/* Main Carousel */}
        <div className="testimonial-item relative mt-12 max-w-[800px] mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="glass-card rounded-3xl p-8 lg:p-12 cursor-pointer"
              onClick={() => setSelectedTestimonial(current)}
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              <Quote size={32} className="text-[#e76f51] opacity-50 mb-4" />
              <p className="text-lg lg:text-xl text-[#f5ebe0] leading-relaxed italic">
                "{activeTestimonial.quote}"
              </p>
              <div className="flex items-center gap-4 mt-8">
                <img
                  src={activeTestimonial.avatar}
                  alt={activeTestimonial.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-[#f5ebe0]">{activeTestimonial.name}</h4>
                  <p className="text-sm text-[#94a3b8]">
                    {activeTestimonial.role}, {activeTestimonial.company}
                  </p>
                  <StarRating rating={activeTestimonial.rating} size={14} />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-14 w-10 h-10 rounded-full bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-[#f5ebe0] hover:bg-[rgba(255,255,255,0.15)] transition-colors z-10"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-14 w-10 h-10 rounded-full bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.1)] flex items-center justify-center text-[#f5ebe0] hover:bg-[rgba(255,255,255,0.15)] transition-colors z-10"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Dots */}
        <div className="testimonial-item flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === current ? 'bg-[#e76f51] w-8' : 'bg-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.4)]'
              }`}
            />
          ))}
        </div>

        {/* Thumbnail Row */}
        <div className="testimonial-item flex justify-center gap-4 mt-10">
          {testimonials.map((t, index) => (
            <button
              key={t.id}
              onClick={() => setCurrent(index)}
              className={`relative w-12 h-12 lg:w-14 lg:h-14 rounded-full overflow-hidden transition-all duration-300 ${
                index === current
                  ? 'ring-2 ring-[#e76f51] ring-offset-2 ring-offset-[#0f0f0f] scale-110'
                  : 'opacity-50 hover:opacity-80'
              }`}
            >
              <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedTestimonial !== null && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="absolute inset-0 bg-[rgba(0,0,0,0.8)] backdrop-blur-sm"
              onClick={() => setSelectedTestimonial(null)}
            />
            <motion.div
              className="relative z-10 glass-card rounded-3xl p-8 max-w-[500px] w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <button
                onClick={() => setSelectedTestimonial(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[rgba(255,255,255,0.1)] flex items-center justify-center hover:bg-[rgba(255,255,255,0.2)] transition-colors"
              >
                <X size={18} className="text-[#f5ebe0]" />
              </button>
              <div className="flex items-center gap-4 mb-6">
                <img
                  src={testimonials[selectedTestimonial].avatar}
                  alt={testimonials[selectedTestimonial].name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-xl font-semibold text-[#f5ebe0]">
                    {testimonials[selectedTestimonial].name}
                  </h4>
                  <p className="text-sm text-[#94a3b8]">
                    {testimonials[selectedTestimonial].role}
                  </p>
                  <p className="text-sm text-[#94a3b8]">
                    {testimonials[selectedTestimonial].company}
                  </p>
                  <StarRating rating={testimonials[selectedTestimonial].rating} size={16} />
                </div>
              </div>
              <Quote size={24} className="text-[#e76f51] opacity-50 mb-3" />
              <p className="text-lg text-[#f5ebe0] leading-relaxed italic">
                "{testimonials[selectedTestimonial].quote}"
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
