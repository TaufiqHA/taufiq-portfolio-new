export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  fullDescription?: string;
  challenges?: string[];
  solutions?: string[];
  results?: string;
  year?: string;
  client?: string;
}

export type Page = 'home' | 'work' | 'contact' | 'project-detail';
