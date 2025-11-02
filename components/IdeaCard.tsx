'use client';

import { Idea, Category } from '@/types/idea';
import { Edit2, Archive, ArchiveRestore, Trash2, Tag } from 'lucide-react';
import { format } from 'date-fns';

interface IdeaCardProps {
  idea: Idea;
  category: Category | null;
  onEdit: (idea: Idea) => void;
  onArchive: (idea: Idea) => void;
  onDelete: (idea: Idea) => void;
}

export default function IdeaCard({ idea, category, onEdit, onArchive, onDelete }: IdeaCardProps) {
  const handleArchive = (e: React.MouseEvent) => {
    e.stopPropagation();
    onArchive(idea);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this idea?')) {
      onDelete(idea);
    }
  };

  return (
    <div
      onClick={() => onEdit(idea)}
      className="bg-white border border-notion-border rounded-lg p-4 hover:shadow-sm transition-all cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-base font-medium text-notion-text flex-1 line-clamp-2">
          {idea.title || 'Untitled'}
        </h3>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(idea);
            }}
            className="p-1.5 hover:bg-notion-hover rounded"
            title="Edit"
          >
            <Edit2 className="w-4 h-4 text-notion-textSecondary" />
          </button>
          <button
            onClick={handleArchive}
            className="p-1.5 hover:bg-notion-hover rounded"
            title={idea.archived ? 'Unarchive' : 'Archive'}
          >
            {idea.archived ? (
              <ArchiveRestore className="w-4 h-4 text-notion-textSecondary" />
            ) : (
              <Archive className="w-4 h-4 text-notion-textSecondary" />
            )}
          </button>
          <button
            onClick={handleDelete}
            className="p-1.5 hover:bg-notion-hover rounded"
            title="Delete"
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </button>
        </div>
      </div>

      {idea.content && (
        <p className="text-sm text-notion-textSecondary mb-3 line-clamp-3">
          {idea.content}
        </p>
      )}

      <div className="flex items-center gap-3 flex-wrap">
        {category && (
          <span
            className="text-xs px-2 py-1 rounded-full text-white"
            style={{ backgroundColor: category.color }}
          >
            {category.name}
          </span>
        )}
        
        {idea.tags && idea.tags.length > 0 && (
          <div className="flex items-center gap-1 flex-wrap">
            <Tag className="w-3 h-3 text-notion-textSecondary" />
            {idea.tags.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs text-notion-textSecondary bg-notion-hover px-2 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <span className="text-xs text-notion-textSecondary ml-auto">
          {format(new Date(idea.updatedAt), 'MMM d, yyyy')}
        </span>
      </div>
    </div>
  );
}

