import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Star,
  ShoppingBag,
  ExternalLink,
  Sparkles,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
} from 'lucide-react';
import { CLOTHING_ITEMS } from '../data/clothingItems';
import { useOutfitStore } from '../store/outfitStore';
import { openAffiliateLink } from '../services/affiliateTracking';
import { formatCurrencyVND } from '../lib/utils';
import { toast } from '../store/toastStore';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const item = CLOTHING_ITEMS.find((c) => c.id === id);
  const isEquipped = useOutfitStore((s) => (item ? s.isEquipped(item.id) : false));
  const toggleItem = useOutfitStore((s) => s.toggleItem);

  if (!item) {
    return (
      <div className="max-w-2xl mx-auto py-20 px-4 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Không tìm thấy sản phẩm</h2>
        <p className="text-sm text-slate-400">Sản phẩm này có thể đã ngừng cung cấp hoặc không tồn tại.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại trang phối đồ</span>
        </Link>
      </div>
    );
  }

  const handleBuy = () => {
    openAffiliateLink(item, 'product_detail');
    toast.info(`Mở liên kết đối tác ${item.merchantName}`);
  };

  const handleToggleAndGo = () => {
    toggleItem(item);
    navigate('/');
  };

  const related = CLOTHING_ITEMS.filter((c) => c.id !== item.id && c.category !== item.category).slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fadeIn">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Quay lại</span>
      </button>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left: Product Image */}
        <div className="relative aspect-square rounded-3xl overflow-hidden bg-studio-surface border border-studio-border shadow-2xl">
          <img
            src={item.thumbnail}
            alt={item.name}
            className="w-full h-full object-cover object-center"
          />
          {item.originalPrice && (
            <div className="absolute top-4 left-4 px-3 py-1 rounded-xl bg-rose-600 text-white font-bold text-xs shadow-md">
              Giảm giá đặc biệt
            </div>
          )}
          <div className="absolute top-4 right-4 px-3 py-1 rounded-xl bg-black/70 backdrop-blur-md text-slate-300 font-semibold text-xs border border-white/10">
            {item.styleTag}
          </div>
        </div>

        {/* Right: Info & Actions */}
        <div className="space-y-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-1">
              Thương hiệu: {item.brand}
            </p>
            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-3">
              {item.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center text-amber-400">
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="ml-1 text-sm font-bold text-white">{item.rating}</span>
              </div>
              <span className="text-xs text-slate-400">
                ({item.reviewCount} đánh giá từ người mua đối tác)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-black text-white">
                {formatCurrencyVND(item.price)}
              </span>
              {item.originalPrice && (
                <span className="text-base text-slate-500 line-through">
                  {formatCurrencyVND(item.originalPrice)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-slate-300 leading-relaxed bg-studio-surface p-4 rounded-2xl border border-studio-border mb-6">
              {item.description}
            </p>

            {/* Highlights */}
            <div className="space-y-2 text-xs text-slate-300 mb-6">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Slot xương 3D: <strong className="text-white uppercase">{item.category}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-indigo-400" />
                <span>Chất liệu vải: <strong className="text-white">{item.material}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-amber-400" />
                <span>Hỗ trợ đổi trả trong 7 ngày theo chính sách đối tác</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handleBuy}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-xl shadow-emerald-700/30 transition text-sm"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Mua ngay tại {item.merchantName} (Mở tab mới)</span>
              <ExternalLink className="w-4 h-4 opacity-80" />
            </button>

            <button
              onClick={handleToggleAndGo}
              className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-2xl font-bold text-sm transition border ${
                isEquipped
                  ? 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                  : 'bg-indigo-600 text-white border-indigo-500 hover:bg-indigo-500 shadow-lg shadow-indigo-600/30'
              }`}
            >
              {isEquipped ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Đang mặc — Xem ngay tại Phòng Thử 3D</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Mặc thử & Đến phòng phối 3D</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="pt-8 border-t border-studio-border/60 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Gợi ý phối cùng món đồ này</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {related.map((rel) => (
            <Link
              key={rel.id}
              to={`/product/${rel.id}`}
              className="p-3.5 rounded-2xl bg-studio-surface border border-studio-border hover:border-indigo-500/50 transition flex items-center gap-3 group"
            >
              <img
                src={rel.thumbnail}
                alt={rel.name}
                className="w-16 h-16 rounded-xl object-cover shrink-0"
              />
              <div className="overflow-hidden">
                <p className="text-[11px] text-slate-400 font-semibold">{rel.brand}</p>
                <p className="text-xs font-bold text-white truncate group-hover:text-indigo-400 transition">
                  {rel.name}
                </p>
                <p className="text-xs font-extrabold text-indigo-400 mt-1">
                  {formatCurrencyVND(rel.price)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
