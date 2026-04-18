export interface Skill {
  name: string;
  proficiency: number;
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

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  url: string;
  isApp?: boolean;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  quote: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
