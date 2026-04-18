import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionHeader } from '@/components/SectionHeader';

gsap.registerPlugin(ScrollTrigger);

export function ShowreelSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const container = section.querySelector('.showreel-container');
    gsap.set(container, { opacity: 0, y: 40, scale: 0.95 });

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(container, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
        });
      },
    });

    return () => trigger.kill();
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section ref={sectionRef} id="showreel" className="bg-[#0f0f0f] section-padding">
      <div className="max-w-[1000px] mx-auto">
        <SectionHeader
          label="SHOWREEL"
          title="Mon Univers en Mouvement"
          subtitle="Un aperçu de ce que je pourrai faire en motion design et montage vidéo. Inspiré par Dripping Light"
          centered
        />

        <div className="showreel-container relative mt-12 aspect-video rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.08)] shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            poster="/images/showreel-poster.jpg"
            onEnded={() => setIsPlaying(false)}
            onPause={() => setIsPlaying(false)}
            onPlay={() => setIsPlaying(true)}
          >
            <source src="/videos/hero-bg.mp4" type="video/mp4" />
          </video>

          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <motion.button
                onClick={togglePlay}
                className="w-20 h-20 rounded-full bg-[rgba(231,111,81,0.9)] flex items-center justify-center hover:bg-[#e76f51] hover:scale-110 transition-all duration-300"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Play size={32} className="text-white ml-1" fill="white" />
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
