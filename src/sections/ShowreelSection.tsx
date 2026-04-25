import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Play } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionHeader } from '@/components/SectionHeader';

gsap.registerPlugin(ScrollTrigger);

type LocalVideoCardProps = {
  title: string;
  src: string;
  poster?: string;
};

type ExternalVideoCardProps = {
  title: string;
  poster?: string;
  href?: string;
};

function LocalVideoCard({ title, src, poster }: LocalVideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = async () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      return;
    }

    setHasError(false);
    setIsLoading(true);

    try {
      await videoRef.current.play();
    } catch {
      setIsLoading(false);
      setHasError(true);
    }
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
          preload="metadata"
          playsInline
          controls
          onEnded={() => setIsPlaying(false)}
          onPause={() => {
            setIsPlaying(false);
            setIsLoading(false);
          }}
          onPlay={() => {
            setIsPlaying(true);
            setIsLoading(false);
            setHasError(false);
          }}
          onWaiting={() => setIsLoading(true)}
          onCanPlay={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
        >
          <source src={src} type="video/mp4" />
          Votre navigateur ne prend pas en charge cette video.
        </video>

        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <div className="flex flex-col items-center gap-4 px-6 text-center">
              <motion.button
                onClick={() => void togglePlay()}
                className="flex h-20 w-20 items-center justify-center rounded-full bg-[rgba(231,111,81,0.9)] transition-all duration-300 hover:scale-110 hover:bg-[#e76f51]"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Play size={32} className="ml-1 text-white" fill="white" />
              </motion.button>

              {isLoading && (
                <p className="text-sm text-[#f5ebe0]">
                  Chargement de la video...
                </p>
              )}

              {hasError && (
                <p className="text-sm text-[#f5ebe0]">
                  La video ne peut pas etre lue pour le moment.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ExternalVideoCard({ title, poster, href }: ExternalVideoCardProps) {
  return (
    <div className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.02)] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
      <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-[#f4a261]">
        {title}
      </p>

      <div className="relative aspect-video overflow-hidden rounded-xl bg-black">
        <img
          src={poster}
          alt={title}
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 flex items-center justify-center bg-black/35">
          <div className="flex flex-col items-center gap-4 px-6 text-center">
            {href ? (
              <>
                <motion.a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-[rgba(231,111,81,0.9)] transition-all duration-300 hover:scale-110 hover:bg-[#e76f51]"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ExternalLink size={30} className="text-white" />
                </motion.a>

                <p className="max-w-md text-sm text-[#f5ebe0]">
                  Le film s&apos;ouvre dans un nouvel onglet pour une lecture plus fluide.
                </p>
              </>
            ) : (
              <p className="max-w-md text-sm text-[#f5ebe0]">
                Le lien externe du film sera ajoute ici apres upload sur Drive, YouTube ou Vimeo.
              </p>
            )}
          </div>
        </div>
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
          <LocalVideoCard
            title="Showreel"
            src="/videos/hero-bg.mp4"
            poster="/images/showreel-poster.jpg"
          />
          <ExternalVideoCard
            title="Film XUL VF"
            poster="/images/xul.jpg"
          />
        </div>
      </div>
    </section>
  );
}
