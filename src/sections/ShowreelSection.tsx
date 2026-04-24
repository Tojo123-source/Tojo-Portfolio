import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionHeader } from '@/components/SectionHeader';

gsap.registerPlugin(ScrollTrigger);

type VideoCardProps = {
  title: string;
  src: string;
  poster?: string;
};

function VideoCard({ title, src, poster }: VideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      return;
    }

    void videoRef.current.play();
  };

  return (
    <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
      <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-[#f4a261]">
        {title}
      </p>

      <div className="relative aspect-video overflow-hidden rounded-xl">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          poster={poster}
          controls={isPlaying}
          onEnded={() => setIsPlaying(false)}
          onPause={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
        >
          <source src={src} type="video/mp4" />
        </video>

        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <motion.button
              onClick={togglePlay}
              className="flex h-20 w-20 items-center justify-center rounded-full bg-[rgba(231,111,81,0.9)] transition-all duration-300 hover:scale-110 hover:bg-[#e76f51]"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Play size={32} className="ml-1 text-white" fill="white" />
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}

export function ShowreelSection() {
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section ref={sectionRef} id="showreel" className="bg-[#0f0f0f] section-padding">
      <div className="mx-auto max-w-[1000px]">
        <SectionHeader
          label="SHOWREEL"
          title="Mon Univers en Mouvement"
          subtitle="Un apercu de ce que je peux faire en motion design et montage video."
          centered
        />

        <div className="showreel-container mt-12 space-y-8">
          <VideoCard
            title="Showreel"
            src="/videos/hero-bg.mp4"
            poster="/images/showreel-poster.jpg"
          />
          <VideoCard title="Film XUL VF" src="/videos/XUL VF.mp4" />
        </div>
      </div>
    </section>
  );
}
