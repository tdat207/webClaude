import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  CheckCircle2,
  ShoppingBag,
  ExternalLink,
  Shirt,
  RotateCcw,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { AIAnalysisResult, ClothingItem } from '../../types';
import { CLOTHING_ITEMS } from '../../data/clothingItems';
import { useOutfitStore } from '../../store/outfitStore';
import { openAffiliateLink } from '../../services/affiliateTracking';
import { formatCurrencyVND } from '../../lib/utils';
import { toast } from '../../store/toastStore';

interface ScanResultPanelProps {
  result: AIAnalysisResult;
  imagePreview: string;
  onReset: () => void;
}

export const ScanResultPanel: React.FC<ScanResultPanelProps> = ({
  result,
  imagePreview,
  onReset,
}) => {
  const navigate = useNavigate();
  const equipItem = useOutfitStore((s) => s.equipItem);
  const isEquipped = useOutfitStore((s) => s.isEquipped);

  const recommendedItems = result.recommendedProductIds
    .map((id) => CLOTHING_ITEMS.find((c) => c.id === id))
    .filter(Boolean) as ClothingItem[];

  const handleEquipAndNavigate = (item: ClothingItem) => {
    equipItem(item);
    toast.success(`Đã thêm ${item.name} vào nhân vật 3D!`);
  };

  const handleApplyAllAndGo = () => {
    recommendedItems.forEach((item) => {
      equipItem(item);
    });
    toast.success(`Đã áp dụng các món đồ gợi ý lên phòng thử 3D!`);
    navigate('/');
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* TOP HEADER: PHOTO & OVERALL STYLIST SCORE */}
      <div className="p-6 rounded-3xl bg-studio-surface border border-studio-border shadow-xl grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Scanned Image */}
        <div className="relative rounded-2xl overflow-hidden aspect-square max-w-[220px] mx-auto md:mx-0 bg-black border border-studio-border">
          <img
            src={imagePreview}
            alt="Scanned wardrobe"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-semibold text-white border border-white/20">
            Ảnh đã quét
          </div>
        </div>

        {/* Score & Style Evaluation */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs uppercase tracking-wider text-indigo-400 font-bold">
                Phân tích bởi Stylist AI
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                Phong cách: {result.dominantStyle}
              </h2>
            </div>

            {/* Score Badge */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-300">
              <TrendingUp className="w-5 h-5 text-indigo-400" />
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Điểm phối đồ</p>
                <p className="text-lg font-black text-white">{result.overallScore} / 100</p>
              </div>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed bg-studio-card/60 p-4 rounded-2xl border border-studio-border/60">
            {result.critique}
          </p>

          <div className="flex items-center gap-3 pt-1">
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-studio-card hover:bg-slate-700 text-slate-300 border border-studio-border transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Quét ảnh khác</span>
            </button>

            <button
              onClick={handleApplyAllAndGo}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/30"
            >
              <Shirt className="w-3.5 h-3.5" />
              <span>Thử toàn bộ gợi ý trên 3D Fitting</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* DETECTED ITEMS & STYLING TIPS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Detected Items */}
        <div className="p-6 rounded-3xl bg-studio-surface border border-studio-border shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>Món đồ nhận diện được ({result.detectedItems.length})</span>
          </h3>

          <div className="space-y-2.5">
            {result.detectedItems.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-studio-card border border-studio-border flex items-center justify-between gap-3"
              >
                <div>
                  <p className="text-sm font-semibold text-white">{item.name}</p>
                  <p className="text-xs text-slate-400">
                    Phân loại: <span className="text-indigo-300">{item.category.toUpperCase()}</span> | Màu: {item.color}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {Math.round(item.confidence * 100)}% độ chính xác
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actionable Tips */}
        <div className="p-6 rounded-3xl bg-studio-surface border border-studio-border shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>Lời khuyên nâng tầm Outfit</span>
          </h3>

          <div className="space-y-3">
            {result.stylingTips.map((tip, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-studio-card/80 border border-studio-border flex items-start gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-indigo-600/20 border border-indigo-500/40 text-indigo-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-snug">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RECOMMENDED COMPLEMENTARY PRODUCTS WITH AFFILIATE LINKS */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-indigo-400" />
              <span>Gợi ý mua thêm để hoàn thiện outfit</span>
            </h3>
            <p className="text-xs text-slate-400">
              Đối chiếu tủ đồ của bạn với danh mục sản phẩm thời trang thịnh hành nhất
            </p>
          </div>

          <button
            onClick={() => navigate('/')}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition flex items-center gap-1"
          >
            <span>Đến trang Thử đồ 3D đầy đủ</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recommendedItems.map((prod) => {
            const equipped = isEquipped(prod.id);
            return (
              <div
                key={prod.id}
                className="bg-studio-surface border border-studio-border rounded-2xl p-3.5 flex flex-col justify-between shadow-lg hover:border-slate-500/50 transition group"
              >
                <div>
                  <div className="relative aspect-square rounded-xl overflow-hidden mb-3 bg-studio-card">
                    <img
                      src={prod.thumbnail}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-semibold text-white">
                      Slot: {prod.category.toUpperCase()}
                    </div>
                  </div>

                  <p className="text-xs font-semibold text-slate-400 mb-0.5">{prod.brand}</p>
                  <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-2 mb-2">
                    {prod.name}
                  </h4>
                </div>

                <div className="pt-2 border-t border-studio-border/60">
                  <p className="text-sm font-extrabold text-white mb-2.5">
                    {formatCurrencyVND(prod.price)}
                  </p>

                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      onClick={() => handleEquipAndNavigate(prod)}
                      className={`py-1.5 px-2 rounded-xl text-xs font-semibold transition border ${
                        equipped
                          ? 'bg-indigo-600/30 text-indigo-300 border-indigo-500/40'
                          : 'bg-studio-card hover:bg-slate-700 text-slate-200 border-studio-border'
                      }`}
                    >
                      {equipped ? 'Đã mặc' : 'Thử lên 3D'}
                    </button>

                    <button
                      onClick={() => openAffiliateLink(prod, 'ai_recommendation')}
                      className="py-1.5 px-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition flex items-center justify-center gap-1 shadow-sm shadow-emerald-700/30"
                      title={`Mua tại ${prod.merchantName}`}
                    >
                      <span>Mua</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
