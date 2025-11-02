'use client';

import { useState, useEffect } from 'react';
import { Idea, Category } from '@/types/idea';
import { getCategories } from '@/lib/storage';
import { X } from 'lucide-react';

interface IdeaFormProps {
  idea: Idea | null;
  onSave: (idea: Partial<Idea>) => void;
  onClose: () => void;
}

export default function IdeaForm({ idea, onSave, onClose }: IdeaFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    setCategories(getCategories());
  }, []);

  useEffect(() => {
    if (idea) {
      setTitle(idea.title);
      setContent(idea.content);
      setCategory(idea.category);
      setTags(idea.tags || []);
    } else {
      setTitle('');
      setContent('');
      setCategory('');
      setTags([]);
    }
  }, [idea]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      title: title.trim(),
      content: content.trim(),
      category: category || undefined,
      tags: tags.filter(Boolean),
    });
    onClose();
  };

  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
        <div className="sticky top-0 bg-white border-b border-notion-border p-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-notion-text">
            {idea ? 'Edit Idea' : 'New Idea'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-notion-hover rounded"
          >
            <X className="w-5 h-5 text-notion-textSecondary" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-notion-text mb-2">
              Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-notion-border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-notion-text"
              placeholder="Enter idea title..."
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-notion-text mb-2">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-2 border border-notion-border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-notion-text min-h-[150px] resize-none"
              placeholder="Describe your idea..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-notion-text mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-notion-border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-notion-text"
            >
              <option value="">No Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-notion-text mb-2">
              Tags
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagInputKeyDown}
                className="flex-1 px-3 py-2 border border-notion-border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-notion-text"
                placeholder="Add a tag and press Enter..."
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Add
              </button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-notion-hover text-notion-text rounded text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-notion-border">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-notion-textSecondary hover:bg-notion-hover rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title.trim()}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {idea ? 'Update' : 'Create'} Idea
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

