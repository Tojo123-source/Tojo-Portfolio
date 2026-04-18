import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ExternalLink } from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';
import { projects } from '@/data';

gsap.registerPlugin(ScrollTrigger);

const categories = ['Tous', 'Application Web', 'Site Vitrine', 'Landing Page'];

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('Tous');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState('');
  const [selectedNovaskol, setSelectedNovaskol] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);

  const filteredProjects = activeFilter === 'Tous'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  // Animation GSAP à chaque changement de filtre
  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.project-card');
    if (!cards || cards.length === 0) return;

    gsap.set(cards, { opacity: 0, y: 60 });
    gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.1,
    });
  }, [activeFilter]);

  // Fermeture modals avec Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPreviewUrl(null);
        setSelectedNovaskol(false);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const openProject = (project: any) => {
    if (project.id === 'novaskol') {
      setSelectedNovaskol(true);
    } else {
      setPreviewUrl(project.url);
      setPreviewTitle(project.title);
    }
  };

  // URLs des screenshots Novaskol
  const novaskolImages = Array.from({ length: 23 }, (_, i) => 
    `/images/novaskol/1 (${i + 1}).png`
  );

  return (
    <section ref={sectionRef} id="projects" className="bg-[#0f0f0f] py-20 lg:py-28">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <SectionHeader
          label="RÉALISATIONS"
          title="Projets Sélectionnés"
          subtitle="Quelques exemples de mon travail. Cliquez sur un projet pour voir les détails."
        />

        {/* Filtres */}
        <div className="flex flex-wrap justify-center gap-3 mt-10 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === cat
                  ? 'bg-[#e76f51] text-white shadow-lg shadow-[#e76f51]/40'
                  : 'bg-[rgba(255,255,255,0.06)] text-[#94a3b8] hover:bg-[rgba(255,255,255,0.15)] hover:text-[#f5ebe0]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grille Responsive Moderne */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              className="project-card group cursor-pointer"
              onClick={() => openProject(project)}
              whileHover={{ y: -12 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <div className="relative overflow-hidden rounded-3xl aspect-[16/10] shadow-2xl">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="mt-6 px-2">
                <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-[rgba(231,111,81,0.15)] text-[#e76f51]">
                  {project.category}
                </span>
                <h3 className="text-2xl font-semibold text-[#f5ebe0] mt-4 line-clamp-1">
                  {project.title}
                </h3>
                <p className="text-[#94a3b8] mt-3 line-clamp-3 text-[15px]">
                  {project.description}
                </p>

                <div className="mt-5 flex items-center gap-2 text-[#f4a261] text-sm font-medium group-hover:gap-3 transition-all">
                  Voir le projet
                  <ExternalLink size={17} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal Iframe pour les sites classiques */}
      <AnimatePresence>
        {previewUrl && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-8 bg-black/95"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0" onClick={() => setPreviewUrl(null)} />

            <motion.div
              className="relative z-10 w-full max-w-[1250px] h-[85vh] bg-[#1a1a2e] rounded-3xl overflow-hidden border border-white/10 flex flex-col"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                <h3 className="text-[#f5ebe0] font-medium text-lg">{previewTitle}</h3>
                <div className="flex items-center gap-4">
                  <a
                    href={previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-[#94a3b8] hover:text-white transition-colors"
                  >
                    Ouvrir en grand <ExternalLink size={16} />
                  </a>
                  <button
                    onClick={() => setPreviewUrl(null)}
                    className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              <iframe
                src={previewUrl}
                className="flex-1 w-full border-0"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                title={previewTitle}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Galerie Novaskol */}
      <AnimatePresence>
        {selectedNovaskol && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0" onClick={() => setSelectedNovaskol(false)} />

            <motion.div
              className="relative z-10 w-full max-w-6xl bg-[#1a1a2e] rounded-3xl overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex justify-between items-center p-6 border-b border-white/10">
                <h2 className="text-2xl font-semibold text-white">Novaskol - Système de Gestion Scolaire</h2>
                <button 
                  onClick={() => setSelectedNovaskol(false)}
                  className="text-white hover:text-[#e76f51] transition-colors"
                >
                  <X size={28} />
                </button>
              </div>

              <div className="p-8 max-h-[78vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {novaskolImages.map((imgUrl, index) => (
                    <motion.div
                      key={index}
                      className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.02 }}
                      whileHover={{ scale: 1.03 }}
                    >
                      <img
                        src={imgUrl}
                        alt={`Novaskol screenshot ${index + 1}`}
                        className="w-full h-auto object-contain"
                        loading="lazy"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="p-6 text-center text-[#94a3b8] text-sm border-t border-white/10">
                23 captures d'écran • Application complète de gestion scolaire
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}