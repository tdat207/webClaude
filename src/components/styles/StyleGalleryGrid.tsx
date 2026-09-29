import React, { useState } from 'react';
import { Sparkles, Shuffle, Filter } from 'lucide-react';
import { STYLE_PRESETS } from '../../data/styles';
import { StyleCard } from './StyleCard';
import { StylePreset } from '../../types';

export const StyleGalleryGrid: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string>('Tất cả');
  const [presets, setPresets] = useState<StylePreset[]>(STYLE_PRESETS);

  const tags = ['Tất cả', 'Streetwear', 'Minimalist', 'Vintage', 'Office', 'Y2K', 'Sporty'];

  const filtered = presets.filter((p) => {
    if (selectedTag === 'Tất cả') return true;
    return (
      p.tags.some((t) => t.toLowerCase().includes(selectedTag.toLowerCase())) ||
      p.name.toLowerCase().includes(selectedTag.toLowerCase())
    );
  });

  const handleShuffle = () => {
    const shuffled = [...presets].sort(() => Math.random() - 0.5);
    setPresets(shuffled);
  };

  return (
    <div className="space-y-6">
      {/* Top Filter & Shuffle Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Tag Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTag(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition border ${
                selectedTag === t
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/25'
                  : 'bg-studio-surface text-slate-300 border-studio-border hover:bg-studio-card hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Shuffle / Randomize Style Button ("Xem phong cách khác") */}
        <button
          onClick={handleShuffle}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-studio-surface hover:bg-studio-card border border-studio-border text-slate-200 transition shadow-sm"
        >
          <Shuffle className="w-4 h-4 text-indigo-400" />
          <span>Xem phong cách khác (Đổi vị trí)</span>
        </button>
      </div>

      {/* Grid of Styles */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map((preset) => (
          <StyleCard key={preset.id} preset={preset} />
        ))}
      </div>
    </div>
  );
};
