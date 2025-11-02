import { Idea, Category } from '@/types/idea';

const IDEAS_KEY = 'idea-logger-ideas';
const CATEGORIES_KEY = 'idea-logger-categories';

// Ideas
export const getIdeas = (): Idea[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(IDEAS_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveIdeas = (ideas: Idea[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(IDEAS_KEY, JSON.stringify(ideas));
};

export const addIdea = (idea: Omit<Idea, 'id' | 'createdAt' | 'updatedAt'>): Idea => {
  const ideas = getIdeas();
  const newIdea: Idea = {
    ...idea,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  ideas.unshift(newIdea);
  saveIdeas(ideas);
  return newIdea;
};

export const updateIdea = (id: string, updates: Partial<Idea>): Idea | null => {
  const ideas = getIdeas();
  const index = ideas.findIndex((idea) => idea.id === id);
  if (index === -1) return null;
  
  ideas[index] = {
    ...ideas[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  saveIdeas(ideas);
  return ideas[index];
};

export const deleteIdea = (id: string): void => {
  const ideas = getIdeas().filter((idea) => idea.id !== id);
  saveIdeas(ideas);
};

export const toggleArchiveIdea = (id: string): Idea | null => {
  const ideas = getIdeas();
  const idea = ideas.find((i) => i.id === id);
  if (!idea) return null;
  return updateIdea(id, { archived: !idea.archived });
};

// Categories
export const getCategories = (): Category[] => {
  if (typeof window === 'undefined') return defaultCategories;
  const stored = localStorage.getItem(CATEGORIES_KEY);
  return stored ? JSON.parse(stored) : defaultCategories;
};

export const saveCategories = (categories: Category[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
};

export const addCategory = (category: Omit<Category, 'id'>): Category => {
  const categories = getCategories();
  const newCategory: Category = {
    ...category,
    id: Date.now().toString(),
  };
  categories.push(newCategory);
  saveCategories(categories);
  return newCategory;
};

const defaultCategories: Category[] = [
  { id: '1', name: 'Personal', color: '#4a90e2' },
  { id: '2', name: 'Work', color: '#50c878' },
  { id: '3', name: 'Creative', color: '#ff6b6b' },
  { id: '4', name: 'Learning', color: '#f39c12' },
  { id: '5', name: 'Random', color: '#9b59b6' },
];

