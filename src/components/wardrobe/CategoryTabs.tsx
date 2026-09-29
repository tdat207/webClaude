import React from 'react';
import {
  Layers,
  Shirt,
  Footprints,
  Sparkles,
  Search,
  SlidersHorizontal,
  Glasses,
  Smile,
} from 'lucide-react';
import { SlotCategory } from '../../types';
import { classNames } from '../../lib/utils';

export type ActiveCategory = 'all' | SlotCategory;

interface CategoryTabsProps {
  activeCategory: ActiveCategory;
  onSelectCategory: (cat: ActiveCategory) => void;
  selectedStyle: string;
  onSelectStyle: (style: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  categoryCounts: Record<string, number>;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  activeCategory,
  onSelectCategory,
  selectedStyle,
  onSelectStyle,
  searchQuery,
  onSearchChange,
  categoryCounts,
}) => {
  const tabs: { key: ActiveCategory; label: string; icon: any }[] = [
    { key: 'all', label: 'Tất cả', icon: Layers },
    { key: 'top', label: 'Áo', icon: Shirt },
    { key: 'bottom', label: 'Quần', icon: Layers },
    { key: 'feet', label: 'Giày', icon: Footprints },
    { key: 'head', label: 'Mũ & Tóc', icon: Sparkles },
    { key: 'face', label: 'Kính & Mặt', icon: Glasses },
    { key: 'accessory', label: 'Phụ kiện', icon: Smile },
  ];

  const styles = [
    'Tất cả phong cách',
    'Streetwear',
    'Minimalist',
    'Vintage',
    'Office',
    'Y2K',
    'Sporty',
  ];

  return (
    <div className="space-y-3">
      {/* Search & Style Filter Row */}
      <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-between">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tìm áo, quần jean, sneaker, blazer, kính..."
            className="w-full pl-9 pr-4 py-2 bg-studio-surface border border-studio-border rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
          />
        </div>

        {/* Style Dropdown Selector */}
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-slate-400 shrink-0 hidden sm:block" />
          <select
            value={selectedStyle}
            onChange={(e) => onSelectStyle(e.target.value)}
            className="bg-studio-surface border border-studio-border text-slate-300 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500 transition"
          >
            {styles.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Category Pills Slider */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-thin">
        {tabs.map(({ key, label, icon: Icon }) => {
          const isActive = activeCategory === key;
          const count = categoryCounts[key] || 0;

          return (
            <button
              key={key}
              onClick={() => onSelectCategory(key)}
              className={classNames(
                'flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition border shrink-0',
                isActive
                  ? 'bg-indigo-600/90 text-white border-indigo-500 shadow-md shadow-indigo-600/20'
                  : 'bg-studio-surface/80 text-slate-300 border-studio-border hover:bg-studio-surface hover:text-white'
              )}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{label}</span>
              <span
                className={classNames(
                  'px-1.5 py-0.5 rounded-full text-[10px] font-semibold',
                  isActive ? 'bg-indigo-900/60 text-indigo-200' : 'bg-studio-card text-slate-400'
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
