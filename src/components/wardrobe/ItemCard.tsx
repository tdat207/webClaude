import React from 'react';
import { Star, ExternalLink, Check, ShoppingBag, Info } from 'lucide-react';
import { ClothingItem } from '../../types';
import { useOutfitStore } from '../../store/outfitStore';
import { openAffiliateLink } from '../../services/affiliateTracking';
import { formatCurrencyVND, classNames } from '../../lib/utils';
import { toast } from '../../store/toastStore';

interface ItemCardProps {
  item: ClothingItem;
  onOpenDetail: (item: ClothingItem) => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item, onOpenDetail }) => {
  const isEquipped = useOutfitStore((s) => s.isEquipped(item.id));
  const toggleItem = useOutfitStore((s) => s.toggleItem);

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    openAffiliateLink(item, 'fitting_page');
    toast.info(`Mở ${item.merchantName}: ${item.name}`, 'Liên kết đối tác');
  };

  const handleToggleWear = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleItem(item);
  };

  const discountPercent = item.originalPrice
    ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
    : null;

  const isTikTok = item.merchantName.toLowerCase().includes('tiktok');

  return (
    <div
      onClick={() => onOpenDetail(item)}
      className={classNames(
        'group relative bg-[#151923] hover:bg-[#1a1f2c] border rounded-2xl overflow-hidden transition-all duration-200 flex flex-col cursor-pointer shadow-md hover:shadow-xl hover:-translate-y-0.5',
        isEquipped
          ? 'border-indigo-500 ring-2 ring-indigo-500/20'
          : 'border-studio-border/70 hover:border-slate-500/50'
      )}
    >
      {/* THUMBNAIL CONTAINER */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#0d0f15]">
        <img
          src={item.thumbnail}
          alt={item.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-300"
          loading="lazy"
        />

        {/* Discount Badge */}
        {discountPercent && discountPercent > 0 && (
          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-lg bg-rose-600 text-white text-[11px] font-bold shadow-md">
            -{discountPercent}%
          </div>
        )}

        {/* Merchant Tag Badge (Shopee Mall / TikTok Shop) */}
        <div
          className={classNames(
            'absolute top-2 right-2 px-2 py-0.5 rounded-lg text-[10px] font-bold shadow-sm',
            isTikTok
              ? 'bg-black/90 text-white border border-white/20'
              : 'bg-orange-600/95 text-white'
          )}
        >
          {item.merchantName}
        </div>

        {/* Equipped Status Indicator */}
        {isEquipped && (
          <div className="absolute bottom-2 left-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-indigo-600 text-white text-[11px] font-semibold shadow-lg">
            <Check className="w-3 h-3 stroke-[3]" />
            <span>Đang mặc</span>
          </div>
        )}

        {/* Info button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenDetail(item);
          }}
          className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-black/60 hover:bg-black/90 text-slate-300 hover:text-white backdrop-blur-sm transition"
          title="Xem chi tiết"
        >
          <Info className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* CONTENT INFO */}
      <div className="p-3.5 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Rating */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-semibold text-slate-300 truncate max-w-[120px]">
              {item.brand}
            </span>
            <div className="flex items-center gap-1 text-amber-400">
              <Star className="w-3 h-3 fill-amber-400" />
              <span className="text-[11px] font-medium text-slate-300">{item.rating}</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="text-xs sm:text-sm font-semibold text-white line-clamp-2 leading-snug group-hover:text-indigo-300 transition">
            {item.name}
          </h3>
        </div>

        {/* Price & Action Buttons */}
        <div className="mt-3 pt-2.5 border-t border-studio-border/50">
          <div className="flex items-baseline gap-1.5 mb-2.5">
            <span className="text-sm sm:text-base font-bold text-white">
              {formatCurrencyVND(item.price)}
            </span>
            {item.originalPrice && (
              <span className="text-[11px] text-slate-500 line-through">
                {formatCurrencyVND(item.originalPrice)}
              </span>
            )}
          </div>

          {/* TWO PRIMARY BUTTONS: "Mặc thử" & "Mua ngay" */}
          <div className="grid grid-cols-2 gap-1.5">
            <button
              onClick={handleToggleWear}
              className={classNames(
                'flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-semibold transition',
                isEquipped
                  ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30 hover:bg-rose-500/25'
                  : 'bg-studio-card hover:bg-slate-700 text-slate-200 border border-studio-border'
              )}
            >
              {isEquipped ? 'Tháo ra' : 'Mặc thử'}
            </button>

            <button
              onClick={handleBuyNow}
              className={classNames(
                'flex items-center justify-center gap-1 py-2 px-2 rounded-xl text-xs font-bold text-white transition shadow-sm',
                isTikTok
                  ? 'bg-zinc-800 hover:bg-zinc-700 border border-white/20'
                  : 'bg-orange-600 hover:bg-orange-500'
              )}
              title={`Mua ngay tại ${item.merchantName}`}
            >
              <ShoppingBag className="w-3 h-3" />
              <span>Mua ngay</span>
              <ExternalLink className="w-2.5 h-2.5 opacity-80" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
