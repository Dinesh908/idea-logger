'use client';

import { useState, useEffect, useMemo } from 'react';
import { Idea, Category } from '@/types/idea';
import {
  getIdeas,
  saveIdeas,
  addIdea,
  updateIdea,
  deleteIdea,
  toggleArchiveIdea,
  getCategories,
  addCategory,
} from '@/lib/storage';
import Sidebar from '@/components/Sidebar';
import IdeaCard from '@/components/IdeaCard';
import IdeaForm from '@/components/IdeaForm';
import CategoryForm from '@/components/CategoryForm';
import SearchBar from '@/components/SearchBar';
import { Plus } from 'lucide-react';

export default function Home() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showArchived, setShowArchived] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingIdea, setEditingIdea] = useState<Idea | null>(null);
  const [showIdeaForm, setShowIdeaForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);

  useEffect(() => {
    setIdeas(getIdeas());
    setCategories(getCategories());
  }, []);

  const handleSaveIdea = (ideaData: Partial<Idea>) => {
    if (editingIdea) {
      const updated = updateIdea(editingIdea.id, ideaData);
      if (updated) {
        setIdeas(getIdeas());
      }
    } else {
      addIdea({
        title: ideaData.title || '',
        content: ideaData.content || '',
        category: ideaData.category || '',
        tags: ideaData.tags || [],
        archived: false,
      });
      setIdeas(getIdeas());
    }
    setEditingIdea(null);
    setShowIdeaForm(false);
  };

  const handleEditIdea = (idea: Idea) => {
    setEditingIdea(idea);
    setShowIdeaForm(true);
  };

  const handleArchiveIdea = (idea: Idea) => {
    toggleArchiveIdea(idea.id);
    setIdeas(getIdeas());
  };

  const handleDeleteIdea = (idea: Idea) => {
    deleteIdea(idea.id);
    setIdeas(getIdeas());
  };

  const handleCreateCategory = (name: string, color: string) => {
    addCategory({ name, color });
    setCategories(getCategories());
  };

  const filteredIdeas = useMemo(() => {
    let filtered = ideas;

    // Filter by archive status
    filtered = filtered.filter((idea) => idea.archived === showArchived);

    // Filter by category
    if (selectedCategory && !showArchived) {
      filtered = filtered.filter((idea) => idea.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (idea) =>
          idea.title.toLowerCase().includes(query) ||
          idea.content.toLowerCase().includes(query) ||
          idea.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [ideas, selectedCategory, showArchived, searchQuery]);

  const getCategoryById = (id: string | null): Category | null => {
    if (!id) return null;
    return categories.find((c) => c.id === id) || null;
  };

  return (
    <div className="flex h-screen overflow-hidden bg-notion-bg">
      <Sidebar
        selectedCategory={selectedCategory}
        onCategorySelect={(cat) => {
          setSelectedCategory(cat);
          setShowArchived(false);
        }}
        showArchived={showArchived}
        onToggleArchived={() => {
          setShowArchived(!showArchived);
          setSelectedCategory(null);
        }}
        onShowCreateCategory={() => setShowCategoryForm(true)}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b border-notion-border bg-white px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-notion-text">
              {showArchived ? 'Archived Ideas' : selectedCategory ? getCategoryById(selectedCategory)?.name || 'Ideas' : 'All Ideas'}
            </h2>
            <button
              onClick={() => {
                setEditingIdea(null);
                setShowIdeaForm(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              New Idea
            </button>
          </div>
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-notion-sidebar">
          {filteredIdeas.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="mb-4">
                <svg
                  className="w-24 h-24 text-notion-textSecondary opacity-30"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-notion-text mb-2">
                {searchQuery
                  ? 'No ideas match your search'
                  : showArchived
                  ? 'No archived ideas'
                  : 'No ideas yet'}
              </h3>
              <p className="text-sm text-notion-textSecondary mb-4">
                {searchQuery
                  ? 'Try a different search term'
                  : showArchived
                  ? 'Archived ideas will appear here'
                  : 'Create your first idea to get started'}
              </p>
              {!searchQuery && !showArchived && (
                <button
                  onClick={() => {
                    setEditingIdea(null);
                    setShowIdeaForm(true);
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Create Your First Idea
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredIdeas.map((idea) => (
                <IdeaCard
                  key={idea.id}
                  idea={idea}
                  category={getCategoryById(idea.category)}
                  onEdit={handleEditIdea}
                  onArchive={handleArchiveIdea}
                  onDelete={handleDeleteIdea}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Modals */}
      {showIdeaForm && (
        <IdeaForm
          idea={editingIdea}
          onSave={handleSaveIdea}
          onClose={() => {
            setShowIdeaForm(false);
            setEditingIdea(null);
          }}
        />
      )}

      {showCategoryForm && (
        <CategoryForm
          onSave={handleCreateCategory}
          onClose={() => setShowCategoryForm(false)}
        />
      )}
    </div>
  );
}

