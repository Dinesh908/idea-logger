export interface Idea {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  archived: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
}

