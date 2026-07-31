import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ExternalLink } from 'lucide-react';
import { projects } from '@/data';

gsap.registerPlugin(ScrollTrigger);

const categories = ['Tous', 'Application Web', 'Site Vitrine', 'Landing Page'];

const projectCovers: Record<string, string> = {
  novaskol: '/projects/novaskol/novaskol-01-dashboard.png',
  'toiture-pro': '/projects/toiture-pro/cover.png',
  'electricien-sigma': '/projects/electricien-sigma/cover.png',
  greenleaf: '/projects/greenleaf/cover.png',
  elagage: '/images/project-elagage.jpg',
  toiture: '/images/project-toiture.jpg',
};

const projectCoverStyles: Record<string, string> = {
  novaskol: 'linear-gradient(135deg, #0F2A26, #12151B)',
  'toiture-pro': 'linear-gradient(135deg, #241611, #12151B)',
  'electricien-sigma': 'linear-gradient(135deg, #0F1A24, #12151B)',
  greenleaf: 'linear-gradient(135deg, #0F241A, #12151B)',
  elagage: 'linear-gradient(135deg, #1A240F, #12151B)',
  toiture: 'linear-gradient(135deg, #241611, #12151B)',
};

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('Tous');
  const [previewProject, setPreviewProject] = useState<typeof projects[0] | null>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const fallbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const filteredProjects =
    activeFilter === 'Tous' ? projects : projects.filter((p) => p.category === activeFilter);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll('.proj-card');
    gsap.set(cards, { opacity: 0, y: 40 });

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 75%',
      once: true,
      onEnter: () => {
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.08,
        });
      },
    });

    return () => trigger.kill();
  }, [activeFilter]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!previewProject) return;
      if (e.key === 'Escape') setPreviewProject(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [previewProject]);

  const openPreview = (project: typeof projects[0]) => {
    setPreviewProject(project);
    setIframeLoaded(false);
    setShowFallback(false);

    if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current);
    fallbackTimerRef.current = setTimeout(() => {
      if (!iframeLoaded && project.external) {
        setShowFallback(true);
      }
    }, 4000);
  };

  const handleIframeLoad = () => {
    setIframeLoaded(true);
    if (fallbackTimerRef.current) clearTimeout(fallbackTimerRef.current);
  };

  const gallery = previewProject?.gallery;
  const hasGallery = gallery && gallery.length > 0;
  const coverImage = previewProject ? projectCovers[previewProject.id] : null;
  const coverStyle = previewProject ? projectCoverStyles[previewProject.id] : null;

  return (
    <section ref={sectionRef} id="projects" className="bg-ink section-padding">
      <div className="max-w-[1400px] mx-auto px-[8vw]">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
          <div>
            <div className="eyebrow mb-4">RÉALISATIONS</div>
            <h2 className="font-serif text-4xl lg:text-5xl mb-4">Projets sélectionnés</h2>
            <p className="max-w-[560px]" style={{ color: '#8A8F99' }}>
              Cliquez sur un projet pour ouvrir la galerie complète.
            </p>
          </div>
          <div className="filters flex flex-wrap gap-2 mt-8 lg:mt-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              className="proj-card group"
              onClick={() => openPreview(project)}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
            >
              <div
                className="relative h-[190px] flex items-center justify-center overflow-hidden"
                style={{ background: coverStyle || projectCoverStyles.novaskol }}
              >
                {projectCovers[project.id] ? (
                  <img
                    src={projectCovers[project.id]}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    loading="lazy"
                  />
                ) : (
                  <span className="font-mono text-xs relative z-10" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    [ COVER — {project.id} ]
                  </span>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
                <motion.div
                  className="play-overlay"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="play-btn">▶</div>
                </motion.div>
              </div>
              <div className="p-5">
                <span className="proj-tag font-mono text-[10px] uppercase tracking-wider" style={{ color: '#35D0C0', letterSpacing: '0.08em' }}>
                  {project.category}
                </span>
                <h3 className="font-manrope font-bold text-lg mt-2 mb-1.5">{project.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#8A8F99' }}>
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {previewProject && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setPreviewProject(null)}
          >
            <div
              className="absolute inset-0"
              style={{ background: 'rgba(10, 12, 16, 0.95)' }}
            />
            <motion.div
              className="relative z-10 w-full max-w-[1200px] h-[85vh] rounded-mockup overflow-hidden border-line bg-panel flex flex-col"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-5 py-3 border-b border-line">
                <h3 className="font-medium">{previewProject.title}</h3>
                <div className="flex items-center gap-3">
                  <a
                    href={previewProject.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-sm flex items-center gap-1 transition-colors"
                    style={{ color: '#8A8F99' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#F2F3F5'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#8A8F99'}
                  >
                    Ouvrir
                    <ExternalLink size={12} />
                  </a>
                  <button
                    onClick={() => setPreviewProject(null)}
                    className="w-9 h-9 rounded-full bg-panel/50 flex items-center justify-center hover:bg-panel/80 transition-colors"
                  >
                    <X size={18} style={{ color: '#F2F3F5' }} />
                  </button>
                </div>
              </div>

              {hasGallery ? (
                <div className="flex-1 overflow-y-auto p-4 lg:p-6" style={{ maxHeight: 'calc(85vh - 60px)' }}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {gallery.map((item, idx) => (
                      <figure
                        key={idx}
                        className="group relative overflow-hidden rounded-lg border border-line/50 bg-panel transition-colors duration-300 hover:border-teal"
                      >
                        <img
                          src={item.src}
                          alt={`${previewProject.title} - ${item.label}`}
                          className="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                          loading="lazy"
                        />
                        <figcaption className="absolute inset-x-0 bottom-0 flex items-center gap-2 px-3 py-2 bg-gradient-to-t from-ink/95 via-ink/70 to-transparent">
                          <span className="font-mono text-[10px] text-teal shrink-0">
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          <span className="text-[0.8125rem] font-semibold text-text truncate">
                            {item.label}
                          </span>
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex-1 relative overflow-hidden">
                  {!iframeLoaded && !showFallback && (
                    <div className="absolute inset-0 flex items-center justify-center z-10 bg-ink">
                      <div className="text-center">
                        <div className="w-10 h-10 border-2 border-teal border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                        <p className="font-mono text-sm" style={{ color: '#8A8F99' }}>Chargement du site...</p>
                      </div>
                    </div>
                  )}
                  {showFallback && coverImage && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-ink z-20">
                      <img
                        src={coverImage}
                        alt={`${previewProject.title} - Aperçu`}
                        className="max-w-full max-h-[60vh] object-contain mb-4"
                      />
                      <a
                        href={previewProject.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                      >
                        Ouvrir le site dans un nouvel onglet
                        <ExternalLink size={16} />
                      </a>
                    </div>
                  )}
                  <iframe
                    ref={iframeRef}
                    src={previewProject.url}
                    className={`w-full h-full border-0 ${iframeLoaded || showFallback ? '' : 'invisible'}`}
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                    title={previewProject.title}
                    onLoad={handleIframeLoad}
                    style={{ display: showFallback ? 'none' : 'block' }}
                  />
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}