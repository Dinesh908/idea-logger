'use client';

import { useState, useEffect } from 'react';
import { Category } from '@/types/idea';
import { getCategories, getIdeas } from '@/lib/storage';
import { Archive, Folder, Plus, Lightbulb } from 'lucide-react';

interface SidebarProps {
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
  showArchived: boolean;
  onToggleArchived: () => void;
  onShowCreateCategory: () => void;
}

export default function Sidebar({
  selectedCategory,
  onCategorySelect,
  showArchived,
  onToggleArchived,
  onShowCreateCategory,
}: SidebarProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [ideaCounts, setIdeaCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const loadData = () => {
      const cats = getCategories();
      const ideas = getIdeas();
      
      setCategories(cats);
      
      // Count ideas per category
      const counts: Record<string, number> = { all: ideas.filter(i => !i.archived).length };
      cats.forEach(cat => {
        counts[cat.id] = ideas.filter(i => i.category === cat.id && !i.archived).length;
      });
      counts.archived = ideas.filter(i => i.archived).length;
      setIdeaCounts(counts);
    };

    loadData();
    const interval = setInterval(loadData, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-64 bg-notion-sidebar border-r border-notion-border h-screen flex flex-col">
      <div className="p-4 border-b border-notion-border">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-5 h-5 text-notion-text" />
          <h1 className="text-lg font-semibold text-notion-text">Idea Logger</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        <button
          onClick={() => onCategorySelect(null)}
          className={`w-full text-left px-3 py-2 rounded-md mb-1 flex items-center justify-between hover:bg-notion-hover transition-colors ${
            selectedCategory === null ? 'bg-notion-active' : ''
          }`}
        >
          <div className="flex items-center gap-2">
            <Folder className="w-4 h-4 text-notion-textSecondary" />
            <span className="text-sm text-notion-text">All Ideas</span>
          </div>
          <span className="text-xs text-notion-textSecondary">{ideaCounts.all || 0}</span>
        </button>

        <div className="my-4">
          <div className="flex items-center justify-between px-3 mb-2">
            <span className="text-xs font-medium text-notion-textSecondary uppercase">Categories</span>
            <button
              onClick={onShowCreateCategory}
              className="p-1 hover:bg-notion-hover rounded"
              title="Add Category"
            >
              <Plus className="w-3 h-3 text-notion-textSecondary" />
            </button>
          </div>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategorySelect(category.id)}
              className={`w-full text-left px-3 py-2 rounded-md mb-1 flex items-center justify-between hover:bg-notion-hover transition-colors ${
                selectedCategory === category.id ? 'bg-notion-active' : ''
              }`}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <span className="text-sm text-notion-text">{category.name}</span>
              </div>
              <span className="text-xs text-notion-textSecondary">
                {ideaCounts[category.id] || 0}
              </span>
            </button>
          ))}
        </div>

        <button
          onClick={onToggleArchived}
          className={`w-full text-left px-3 py-2 rounded-md mb-1 flex items-center justify-between hover:bg-notion-hover transition-colors ${
            showArchived ? 'bg-notion-active' : ''
          }`}
        >
          <div className="flex items-center gap-2">
            <Archive className="w-4 h-4 text-notion-textSecondary" />
            <span className="text-sm text-notion-text">Archived</span>
          </div>
          <span className="text-xs text-notion-textSecondary">{ideaCounts.archived || 0}</span>
        </button>
      </div>
    </div>
  );
}

