import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bookmark, Shirt, Trash2, ArrowRight, Sparkles } from 'lucide-react';
import { useOutfitStore } from '../../store/outfitStore';
import { formatCurrencyVND, formatDate } from '../../lib/utils';

export const SavedOutfitsList: React.FC = () => {
  const navigate = useNavigate();
  const savedOutfits = useOutfitStore((s) => s.savedOutfits);
  const loadSavedOutfit = useOutfitStore((s) => s.loadSavedOutfit);
  const deleteSavedOutfit = useOutfitStore((s) => s.deleteSavedOutfit);

  const handleWear = (id: string) => {
    loadSavedOutfit(id);
    navigate('/');
  };

  if (savedOutfits.length === 0) {
    return (
      <div className="py-16 px-4 text-center rounded-3xl bg-studio-surface border border-studio-border flex flex-col items-center justify-center space-y-3">
        <div className="w-14 h-14 rounded-2xl bg-studio-card flex items-center justify-center text-slate-500 border border-studio-border">
          <Bookmark className="w-7 h-7" />
        </div>
        <h3 className="text-base font-bold text-white">Chưa có Outfit nào được lưu</h3>
        <p className="text-xs text-slate-400 max-w-sm">
          Hãy phối đồ cho nhân vật 3D của bạn và bấm "Lưu Outfit" để xem lại bất cứ lúc nào!
        </p>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/30"
        >
          <Shirt className="w-4 h-4" />
          <span>Đến phòng phối đồ 3D ngay</span>
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {savedOutfits.map((outfit) => {
        const items = Object.values(outfit.equippedItems).filter(Boolean) as any[];

        return (
          <div
            key={outfit.id}
            className="p-6 rounded-3xl bg-studio-surface border border-studio-border hover:border-indigo-500/50 transition-all duration-300 shadow-xl flex flex-col justify-between space-y-5"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">{outfit.name}</h3>
                  <p className="text-[11px] text-slate-400">{formatDate(outfit.createdAt)}</p>
                </div>

                <button
                  onClick={() => deleteSavedOutfit(outfit.id)}
                  className="p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition"
                  title="Xóa outfit này"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Items Thumbnails Grid */}
              <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-thin">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="relative w-14 h-14 rounded-xl overflow-hidden bg-studio-card border border-studio-border shrink-0 group"
                    title={`${item.category}: ${item.name}`}
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-[10px] text-white font-bold">
                      {item.category}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom: Price & Wear CTA */}
            <div className="pt-3 border-t border-studio-border/60 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">
                  Tổng giá trị ({items.length} món)
                </span>
                <p className="text-base font-extrabold text-white">
                  {formatCurrencyVND(outfit.totalPrice)}
                </p>
              </div>

              <button
                onClick={() => handleWear(outfit.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition shadow-md shadow-indigo-600/30"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Mặc lại lên 3D</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
