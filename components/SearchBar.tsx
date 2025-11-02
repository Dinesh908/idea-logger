'use client';

import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-notion-textSecondary" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search ideas..."
        className="w-full pl-10 pr-4 py-2 border border-notion-border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-notion-text bg-white"
      />
    </div>
  );
}

