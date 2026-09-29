import React from 'react';
import {
  Shirt,
  Footprints,
  Sparkles,
  Glasses,
  Smile,
  Layers,
  X,
  Plus,
  Trash2,
  Bookmark,
  ShoppingBag,
  ExternalLink,
} from 'lucide-react';
import { SlotCategory } from '../../types';
import { useOutfitStore } from '../../store/outfitStore';
import { openAffiliateLink } from '../../services/affiliateTracking';
import { formatCurrencyVND } from '../../lib/utils';
import { toast } from '../../store/toastStore';

interface EquippedSidebarProps {
  onSelectCategory?: (cat: any) => void;
  onOpenSaveModal?: () => void;
}

export const EquippedSidebar: React.FC<EquippedSidebarProps> = ({
  onSelectCategory,
  onOpenSaveModal,
}) => {
  const { equippedItems, unequipItem, clearOutfit, getTotalPrice } = useOutfitStore();

  const slots: { key: SlotCategory; label: string; icon: any }[] = [
    { key: 'top', label: 'Áo', icon: Shirt },
    { key: 'bottom', label: 'Quần / Váy', icon: Layers },
    { key: 'feet', label: 'Giày / Dép', icon: Footprints },
    { key: 'head', label: 'Mũ / Nón', icon: Sparkles },
    { key: 'face', label: 'Kính / Mặt', icon: Glasses },
    { key: 'accessory', label: 'Phụ kiện', icon: Smile },
  ];

  const itemsArray = Object.values(equippedItems).filter(Boolean) as any[];
  const equippedCount = itemsArray.length;
  const totalPrice = getTotalPrice();

  const handleBuyAll = () => {
    if (itemsArray.length === 0) {
      toast.warning('Bạn chưa mặc món đồ nào!');
      return;
    }
    itemsArray.forEach((item, index) => {
      setTimeout(() => {
        openAffiliateLink(item, 'fitting_page');
      }, index * 200);
    });
    toast.success(`Đang mở ${equippedCount} link mua sắm Shopee / TikTok Shop!`);
  };

  return (
    <div className="w-full bg-[#10131b] border border-studio-border/80 rounded-3xl p-4 shadow-xl flex flex-col justify-between h-[640px] lg:h-[720px]">
      {/* HEADER */}
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-studio-border/60">
          <div>
            <h2 className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
              <span>Đồ Đang Mặc</span>
              <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-extrabold">
                {equippedCount}/6
              </span>
            </h2>
            <p className="text-[11px] text-slate-400">Các món đã gắn lên model 3D</p>
          </div>

          {equippedCount > 0 && (
            <button
              onClick={clearOutfit}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition"
              title="Cởi tất cả"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* 6 SLOTS VERTICAL STACK */}
        <div className="space-y-2 mt-3 overflow-y-auto max-h-[460px] pr-1 scrollbar-thin">
          {slots.map(({ key, label, icon: Icon }) => {
            const item = equippedItems[key];

            if (item) {
              return (
                <div
                  key={key}
                  className="group relative p-2 rounded-2xl bg-[#161a25] border border-studio-border/70 hover:border-indigo-500/50 transition flex items-center gap-2.5 shadow-sm"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.name}
                    className="w-11 h-11 rounded-xl object-cover shrink-0 bg-[#0d0f15]"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
                      <Icon className="w-3 h-3" />
                      <span>{label}</span>
                    </div>
                    <p className="text-xs font-semibold text-white truncate leading-snug">
                      {item.name}
                    </p>
                    <p className="text-[11px] font-bold text-slate-300">
                      {formatCurrencyVND(item.price)}
                    </p>
                  </div>
                  <button
                    onClick={() => unequipItem(key)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/15 transition shrink-0"
                    title={`Tháo ${item.name}`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              );
            }

            // Empty slot placeholder
            return (
              <div
                key={key}
                onClick={() => onSelectCategory && onSelectCategory(key)}
                className="p-2.5 rounded-2xl border border-dashed border-studio-border/60 hover:border-indigo-500/60 hover:bg-white/[0.02] cursor-pointer transition flex items-center justify-between text-slate-400 group"
              >
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-studio-surface flex items-center justify-center text-slate-500 group-hover:text-indigo-400 transition">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-medium text-slate-400 group-hover:text-slate-200 transition">
                    {label}
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 group-hover:text-indigo-400 font-semibold flex items-center gap-0.5">
                  <Plus className="w-3 h-3" />
                  <span>Chọn</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* FOOTER: TOTAL PRICE & ACTIONS */}
      <div className="pt-3 border-t border-studio-border/60 space-y-2.5">
        <div className="flex items-baseline justify-between">
          <span className="text-xs text-slate-400 font-medium">Tổng giá trị:</span>
          <span className="text-base font-black text-white">
            {formatCurrencyVND(totalPrice)}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onOpenSaveModal && onOpenSaveModal()}
            disabled={equippedCount === 0}
            className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-semibold bg-studio-card hover:bg-slate-700 text-slate-200 border border-studio-border transition disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Lưu bộ</span>
          </button>

          <button
            onClick={handleBuyAll}
            disabled={equippedCount === 0}
            className="flex items-center justify-center gap-1 py-2 px-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition shadow-sm shadow-emerald-700/30 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Mua trọn bộ</span>
            <ExternalLink className="w-2.5 h-2.5 opacity-80" />
          </button>
        </div>
      </div>
    </div>
  );
};
