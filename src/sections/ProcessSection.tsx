import { useEffect, useRef } from 'react';
import { FileText, Lightbulb, Palette, Code, Rocket } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionHeader } from '@/components/SectionHeader';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    icon: <FileText size={28} />,
    title: 'Brief',
    description: "Analyse de vos besoins, objectifs et contraintes pour bien comprendre votre projet.",
    color: '#e76f51',
  },
  {
    icon: <Lightbulb size={28} />,
    title: 'Concept & Storyboard',
    description: "Élaboration de la stratégie créative et du storyboard pour visualiser le résultat.",
    color: '#f4a261',
  },
  {
    icon: <Palette size={28} />,
    title: 'Design / Montage',
    description: "Création des maquettes, montage vidéo et animations selon les meilleures pratiques.",
    color: '#2a9d8f',
  },
  {
    icon: <Code size={28} />,
    title: 'Développement',
    description: "Intégration technique avec code propre, responsive et optimisé pour les performances.",
    color: '#e76f51',
  },
  {
    icon: <Rocket size={28} />,
    title: 'Livraison & Optimisation',
    description: "Tests, déploiement et optimisations SEO pour garantir le succès de votre projet.",
    color: '#f4a261',
  },
];

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items = section.querySelectorAll('.process-step');
    gsap.set(items, { opacity: 0, y: 40 });

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.15,
        });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#0f0f0f] section-padding">
      <div className="max-w-[1400px] mx-auto">
        <SectionHeader
          label="PROCESSUS"
          title="Mon Process Créatif"
          subtitle="Une méthodologie éprouvée pour des résultats exceptionnels à chaque projet."
          centered
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-14">
          {steps.map((step, index) => (
            <div
              key={index}
              className="process-step glass-card rounded-2xl p-6 text-center group hover:-translate-y-2 transition-transform duration-300"
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
                style={{ backgroundColor: `${step.color}20`, color: step.color }}
              >
                {step.icon}
              </div>
              <span className="text-caption text-[#94a3b8] mb-2 block">
                Étape {index + 1}
              </span>
              <h3 className="text-lg font-semibold text-[#f5ebe0] mb-2">{step.title}</h3>
              <p className="text-sm text-[#94a3b8] leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
