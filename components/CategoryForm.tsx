'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface CategoryFormProps {
  onSave: (name: string, color: string) => void;
  onClose: () => void;
}

const colorOptions = [
  '#4a90e2', '#50c878', '#ff6b6b', '#f39c12', '#9b59b6',
  '#e74c3c', '#1abc9c', '#3498db', '#e67e22', '#95a5a6',
];

export default function CategoryForm({ onSave, onClose }: CategoryFormProps) {
  const [name, setName] = useState('');
  const [color, setColor] = useState(colorOptions[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave(name.trim(), color);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md m-4">
        <div className="border-b border-notion-border p-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-notion-text">New Category</h2>
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
              Category Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-notion-border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-notion-text"
              placeholder="Enter category name..."
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-notion-text mb-2">
              Color
            </label>
            <div className="flex gap-2 flex-wrap">
              {colorOptions.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`w-10 h-10 rounded-full border-2 transition-all ${
                    color === c ? 'border-notion-text scale-110' : 'border-notion-border'
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
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
              disabled={!name.trim()}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

