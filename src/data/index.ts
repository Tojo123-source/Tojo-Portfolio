import type { SkillCategory, ExperienceItem, Project, Testimonial } from '@/types';

export const skillCategories: SkillCategory[] = [
  {
    title: 'Développement Web',
    skills: [
      { name: 'React / Next.js', proficiency: 5, icon: 'Code2' },
      { name: 'TypeScript', proficiency: 5, icon: 'FileCode2' },
      { name: 'Tailwind CSS', proficiency: 5, icon: 'Paintbrush' },
      { name: 'Node.js / Express', proficiency: 4, icon: 'Server' },
      { name: 'Supabase / PostgreSQL', proficiency: 4, icon: 'Database' },
      { name: 'Python / Django', proficiency: 3, icon: 'Terminal' },
      { name: 'Git / CI/CD', proficiency: 4, icon: 'GitBranch' },
    ],
  },
  {
    title: 'Motion Design & Création',
    skills: [
      { name: 'Adobe After Effects', proficiency: 5, icon: 'Clapperboard' },
      { name: 'Adobe Premiere Pro', proficiency: 5, icon: 'Film' },
      { name: 'Adobe Photoshop', proficiency: 4, icon: 'Image' },
      { name: 'Adobe Illustrator', proficiency: 4, icon: 'PenTool' },
      { name: 'CapCut Studio', proficiency: 5, icon: 'Scissors' },
      { name: 'Figma', proficiency: 4, icon: 'Layout' },
      { name: 'Blender 3D', proficiency: 3, icon: 'Box' },
    ],
  },
];

export const experiences: ExperienceItem[] = [
  {
    title: 'Développeur Full-Stack Freelance',
    company: 'Indépendant',
    date: '2024 – Présent',
    description: 'Conception et développement de sites vitrines, applications web et systèmes de gestion. Spécialisation React/TypeScript et motion design.',
    side: 'left',
  },
  {
    title: 'Modérateur de Contenu',
    company: 'Société Shakti Outsourcing',
    date: 'Juin 2023 – Décembre 2024',
    description: 'Modération de contenu, analyse de données, gestion de communauté en environnement international.',
    side: 'right',
  },
  {
    title: 'Licence en Communication Audiovisuelle',
    company: 'Université E-Media',
    date: '2021 – 2024',
    description: 'Formation en production vidéo, motion design, graphisme et développement web.',
    side: 'left',
  },
  {
    title: 'Baccalauréat Scientifique',
    company: 'Lycée',
    date: '2020',
    description: 'Mention Assez Bien, série Scientifique.',
    side: 'right',
  },
];

export const projects: Project[] = [
  {
    id: 'novaskol',
    title: 'Novaskol - Système de Gestion Scolaire',
    category: 'Application Web',           // ← Important pour le filtre
    description: 'Plateforme complète de gestion scolaire : inscriptions, notes, absences, paiements, emploi du temps et plus. Développé avec React, TypeScript et Supabase.',
    image: '/images/project-novaskol.jpg', // ← Mets ici une belle image de couverture
    url: '',                               // On laisse vide car ce n’est pas un site public
    isApp: true,                           // ← Nouveau flag pour détecter que c’est une app avec screenshots
  },
  {
  
    id: 'toiture-pro',
    title: 'Toiture Pro 95',
    category: 'Landing Page',
    description: 'Landing page optimisée pour un artisan couvreur avec formulaire de devis.',
    image: '/images/project-toiture-pro.jpg',
    url: 'https://toiture-pro-95.vercel.app',
  },
  {
    id: 'electricien',
    title: 'Electricien Sigma',
    category: 'Site Vitrine',
    description: 'Site vitrine pour un électricien professionnel avec services et formulaire de contact.',
    image: '/images/project-electricien.jpg',
    url: 'https://site-electricien-sigma.vercel.app',
  },
  {
    id: 'greenleaf',
    title: 'Greenleaf Resto',
    category: 'Site Vitrine',
    description: 'Site web élégant pour un restaurant avec menu interactif et réservation en ligne.',
    image: '/images/project-greenleaf.jpg',
    url: 'https://greenleaf-resto.vercel.app',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Marie L.',
    role: 'Directrice',
    company: 'École Primaire Saint-Joseph',
    avatar: '/images/avatar-1.jpg',
    rating: 5,
    quote: 'Tojo a créé notre système de gestion scolaire NOVASKOL. Une plateforme intuitive qui a transformé notre administration quotidienne.',
  },
  {
    id: 2,
    name: 'Pierre D.',
    role: 'Entrepreneur',
    company: 'Toiture Pro 95',
    avatar: '/images/avatar-2.jpg',
    rating: 5,
    quote: 'Site vitrine professionnel livré en 5 jours. Design moderne, responsive et optimisé SEO. Résultats immédiats sur nos appels.',
  },
  {
    id: 3,
    name: 'Sophie K.',
    role: 'Responsable Marketing',
    company: 'Greenleaf',
    avatar: '/images/avatar-3.jpg',
    rating: 4,
    quote: 'Le motion design pour notre campagne réseaux sociaux a dépassé toutes nos attentes. Engagement +300%.',
  },
  {
    id: 4,
    name: 'Jean R.',
    role: 'Propriétaire',
    company: 'Urgence Toiture',
    avatar: '/images/avatar-4.jpg',
    rating: 5,
    quote: 'Travail sérieux et à l\'écoute. Le site reflète parfaitement notre image d\'entreprise.',
  },
  {
    id: 5,
    name: 'Claire B.',
    role: 'Fondatrice',
    company: 'E-Media Creatives',
    avatar: '/images/avatar-5.jpg',
    rating: 5,
    quote: 'Tojo est un talent rare. Son sens du design et sa maîtrise technique sont impressionnants.',
  },
  {
    id: 6,
    name: 'Antoine M.',
    role: 'Directeur',
    company: 'Shakti Outsourcing',
    avatar: '/images/avatar-6.jpg',
    rating: 4,
    quote: 'Excellente collaboration sur nos projets de contenu vidéo. Créativité et rigueur réunies.',
  },
];

export const interests = [
  'Lecture',
  'Basket-ball',
  'Photographie',
  'Musique',
  'Animation',
  'Créativité',
  'Cinématographie',
];

export const strengths = [
  'Autonomie',
  'Résolution de problèmes',
  'Travail sous pression',
  'Esprit d\'équipe',
  'Adaptabilité',
  'Attention aux détails',
];
