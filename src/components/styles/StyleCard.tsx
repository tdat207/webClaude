import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, ExternalLink, Check, ShoppingBag } from 'lucide-react';
import { StylePreset, ClothingItem } from '../../types';
import { CLOTHING_ITEMS } from '../../data/clothingItems';
import { RotatingPreview } from '../three/RotatingPreview';
import { useOutfitStore } from '../../store/outfitStore';
import { openAffiliateLink } from '../../services/affiliateTracking';
import { formatCurrencyVND } from '../../lib/utils';

interface StyleCardProps {
  preset: StylePreset;
}

export const StyleCard: React.FC<StyleCardProps> = ({ preset }) => {
  const navigate = useNavigate();
  const applyStylePreset = useOutfitStore((s) => s.applyStylePreset);

  const styleItems = preset.itemIds
    .map((id) => CLOTHING_ITEMS.find((c) => c.id === id))
    .filter(Boolean) as ClothingItem[];

  const totalPrice = styleItems.reduce((acc, item) => acc + item.price, 0);

  const handleApply = () => {
    applyStylePreset(preset);
    navigate('/');
  };

  return (
    <div className="bg-studio-surface border border-studio-border hover:border-indigo-500/60 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col group">
      {/* 3D TURNTABLE PREVIEW OF STYLE OUTFIT */}
      <div className="relative">
        <RotatingPreview items={styleItems} className="h-72" />

        {/* Color Palette Chips */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 p-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
          {preset.colorPalette.map((col, idx) => (
            <span
              key={idx}
              className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-sm"
              style={{ backgroundColor: col }}
              title={col}
            />
          ))}
        </div>

        {/* Badge: 3D Auto Rotate */}
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-semibold text-slate-300 flex items-center gap-1.5 pointer-events-none">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>3D Tự động xoay</span>
        </div>
      </div>

      {/* BODY CONTENT */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
        <div className="space-y-3">
          {/* Header */}
          <div>
            <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
              {preset.tags.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-300 text-[10px] font-semibold border border-indigo-500/20"
                >
                  {t}
                </span>
              ))}
            </div>

            <h3 className="text-xl font-black text-white group-hover:text-indigo-400 transition">
              {preset.vietnameseName}
            </h3>
            <p className="text-xs text-indigo-300 font-medium italic mb-2">{preset.name}</p>
            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
              {preset.description}
            </p>
          </div>

          {/* Included Items List */}
          <div className="space-y-2 pt-2 border-t border-studio-border/60">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Trọn bộ outfit ({styleItems.length} món):
            </p>
            <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1 scrollbar-thin">
              {styleItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-2 p-1.5 rounded-xl bg-studio-card/70 hover:bg-studio-card text-xs transition"
                >
                  <div className="flex items-center gap-2 truncate">
                    <img
                      src={item.thumbnail}
                      alt={item.name}
                      className="w-7 h-7 rounded-lg object-cover shrink-0"
                    />
                    <span className="text-slate-300 truncate">{item.name}</span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-semibold text-white">{formatCurrencyVND(item.price)}</span>
                    <button
                      onClick={() => openAffiliateLink(item, 'style_gallery')}
                      className="p-1 text-slate-400 hover:text-emerald-400 transition"
                      title={`Mua tại ${item.merchantName}`}
                    >
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="pt-3 border-t border-studio-border/60 flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Tổng giá trị</span>
            <p className="text-base font-extrabold text-white">{formatCurrencyVND(totalPrice)}</p>
          </div>

          <button
            onClick={handleApply}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30 transition group-hover:scale-105"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Áp dụng phong cách</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
