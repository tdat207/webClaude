import React from 'react';
import { X, Star, ShoppingBag, ExternalLink, Check, Sparkles, ShieldCheck } from 'lucide-react';
import { ClothingItem } from '../../types';
import { useOutfitStore } from '../../store/outfitStore';
import { openAffiliateLink } from '../../services/affiliateTracking';
import { formatCurrencyVND } from '../../lib/utils';
import { CLOTHING_ITEMS } from '../../data/clothingItems';

interface ProductDetailModalProps {
  item: ClothingItem | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  const isEquipped = useOutfitStore((s) => s.isEquipped(item.id));
  const toggleItem = useOutfitStore((s) => s.toggleItem);
  const setSelectedItemForModal = useOutfitStore((s) => s.setSelectedItemForModal);

  const handleBuy = () => {
    openAffiliateLink(item, 'product_detail');
  };

  // Find complementary items with different category or same style
  const complementaryItems = CLOTHING_ITEMS.filter(
    (c) => c.id !== item.id && (c.styleTag === item.styleTag || c.category !== item.category)
  ).slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      {/* Backdrop click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-studio-surface border border-studio-border rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-studio-border">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              {item.styleTag}
            </span>
            <span className="text-xs text-slate-400">Slot: {item.category.toUpperCase()}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Image Box */}
            <div className="relative rounded-2xl overflow-hidden bg-studio-card border border-studio-border aspect-square">
              <img
                src={item.thumbnail}
                alt={item.name}
                className="w-full h-full object-cover object-center"
              />
              {item.originalPrice && (
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-rose-600 text-white font-bold text-xs shadow-md">
                  Giảm giá đặc biệt
                </div>
              )}
            </div>

            {/* Info Box */}
            <div className="flex flex-col justify-between space-y-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-1">
                  {item.brand}
                </p>
                <h2 className="text-lg font-bold text-white leading-snug mb-2">{item.name}</h2>

                {/* Rating & Reviews */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center text-amber-400">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span className="ml-1 text-sm font-semibold text-white">{item.rating}</span>
                  </div>
                  <span className="text-xs text-slate-400">({item.reviewCount} đánh giá xác thực)</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-2xl font-extrabold text-white">
                    {formatCurrencyVND(item.price)}
                  </span>
                  {item.originalPrice && (
                    <span className="text-sm text-slate-500 line-through">
                      {formatCurrencyVND(item.originalPrice)}
                    </span>
                  )}
                </div>

                {/* Specs */}
                <div className="space-y-1.5 text-xs text-slate-300 bg-studio-card/60 p-3 rounded-xl border border-studio-border/60">
                  <p>
                    <strong className="text-slate-400 font-normal">Chất liệu:</strong> {item.material}
                  </p>
                  <p>
                    <strong className="text-slate-400 font-normal">Tình trạng:</strong>{' '}
                    <span className="text-emerald-400 font-medium">Còn hàng tại đại lý</span>
                  </p>
                  <p className="flex items-center gap-1.5 pt-1 text-[11px] text-slate-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Cam kết chính hãng & đối tác uy tín</span>
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleBuy}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-700/30 transition text-sm"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Mua tại {item.merchantName}</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </button>

                <button
                  onClick={() => toggleItem(item)}
                  className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-semibold text-sm transition border ${
                    isEquipped
                      ? 'bg-rose-500/10 text-rose-300 border-rose-500/30 hover:bg-rose-500/20'
                      : 'bg-indigo-600 text-white border-indigo-500 hover:bg-indigo-500'
                  }`}
                >
                  {isEquipped ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Đang mặc trên 3D (Nhấn để tháo)</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Mặc thử lên nhân vật 3D</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Mô tả chi tiết sản phẩm
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed bg-studio-card/40 p-3.5 rounded-xl border border-studio-border/50">
              {item.description}
            </p>
          </div>

          {/* Complementary Suggestions */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Gợi ý phối đồ chuẩn gu</span>
            </h4>
            <div className="grid grid-cols-3 gap-2.5">
              {complementaryItems.map((comp) => (
                <div
                  key={comp.id}
                  onClick={() => setSelectedItemForModal(comp)}
                  className="bg-studio-card/80 hover:bg-studio-card border border-studio-border rounded-xl p-2 cursor-pointer transition text-left group"
                >
                  <div className="aspect-square rounded-lg overflow-hidden mb-1.5 bg-black/40">
                    <img
                      src={comp.thumbnail}
                      alt={comp.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition"
                    />
                  </div>
                  <p className="text-xs font-medium text-white truncate">{comp.name}</p>
                  <p className="text-[11px] text-indigo-400 font-semibold">{formatCurrencyVND(comp.price)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
