export interface Skill {
  name: string;
  icon: string;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export interface ExperienceItem {
  title: string;
  company: string;
  date: string;
  description: string;
  side: 'left' | 'right';
}

export interface GalleryItem {
  src: string;
  label: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  url: string;
  external?: boolean;
  gallery?: GalleryItem[];
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  honeypot?: string;
}
