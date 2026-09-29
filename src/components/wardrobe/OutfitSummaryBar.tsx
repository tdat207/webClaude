import React, { useState } from 'react';
import { Bookmark, ShoppingBag, ExternalLink, Sparkles, Check, Share2 } from 'lucide-react';
import { useOutfitStore } from '../../store/outfitStore';
import { openAffiliateLink } from '../../services/affiliateTracking';
import { formatCurrencyVND } from '../../lib/utils';
import { toast } from '../../store/toastStore';

export const OutfitSummaryBar: React.FC = () => {
  const equippedItems = useOutfitStore((s) => s.equippedItems);
  const getTotalPrice = useOutfitStore((s) => s.getTotalPrice);
  const saveCurrentOutfit = useOutfitStore((s) => s.saveCurrentOutfit);

  const [isSaving, setIsSaving] = useState(false);
  const [outfitName, setOutfitName] = useState('');

  const itemsArray = Object.values(equippedItems).filter(Boolean) as any[];
  const itemCount = itemsArray.length;
  const totalPrice = getTotalPrice();

  const handleSaveOutfit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!outfitName.trim()) {
      saveCurrentOutfit(`Outfit của tôi (${itemCount} món)`);
    } else {
      saveCurrentOutfit(outfitName.trim());
    }
    setOutfitName('');
    setIsSaving(false);
  };

  const handleBuyAll = () => {
    if (itemsArray.length === 0) {
      toast.warning('Bạn chưa mặc trang phục nào để mua trọn bộ!');
      return;
    }

    itemsArray.forEach((item, index) => {
      // Small staggered timeout to prevent browser popup blocking multiple tabs
      setTimeout(() => {
        openAffiliateLink(item, 'fitting_page');
      }, index * 250);
    });

    toast.success(
      `Đang mở ${itemCount} liên kết mua sắm đối tác cho toàn bộ outfit!`,
      'Mua trọn bộ'
    );
  };

  return (
    <>
      <div className="sticky bottom-3 z-20 mt-4 p-3.5 sm:p-4 rounded-2xl bg-studio-surface/95 backdrop-blur-xl border border-studio-border/90 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Info */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center gap-2">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <div>
              <p className="text-xs text-slate-400">Đang mặc ({itemCount}/6 món)</p>
              <p className="text-base sm:text-lg font-extrabold text-white">
                {formatCurrencyVND(totalPrice)}
              </p>
            </div>
          </div>

          {/* Quick Slot Dots */}
          <div className="flex items-center gap-1">
            {['top', 'bottom', 'feet', 'head', 'face', 'accessory'].map((slot) => (
              <span
                key={slot}
                className={`w-2 h-2 rounded-full transition-all ${
                  (equippedItems as any)[slot] ? 'bg-indigo-400 w-3' : 'bg-slate-700'
                }`}
                title={slot}
              />
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setIsSaving(true)}
            disabled={itemCount === 0}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-studio-card hover:bg-slate-700 text-slate-200 border border-studio-border transition disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
          >
            <Bookmark className="w-4 h-4" />
            <span>Lưu Outfit</span>
          </button>

          <button
            onClick={handleBuyAll}
            disabled={itemCount === 0}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 transition shadow-lg shadow-emerald-700/30 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Mua trọn bộ ({itemCount})</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* SAVE OUTFIT MODAL */}
      {isSaving && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-md bg-studio-surface border border-studio-border rounded-2xl p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white">Đặt tên cho Outfit của bạn</h3>
            <p className="text-xs text-slate-400">
              Bộ trang phục gồm {itemCount} món đồ với tổng giá trị {formatCurrencyVND(totalPrice)}.
            </p>

            <form onSubmit={handleSaveOutfit} className="space-y-4">
              <input
                type="text"
                value={outfitName}
                onChange={(e) => setOutfitName(e.target.value)}
                placeholder="Ví dụ: Dạo phố cuối tuần, Đi tiệc tối..."
                autoFocus
                className="w-full px-4 py-2.5 bg-studio-card border border-studio-border rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
              />

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsSaving(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition shadow-md shadow-indigo-600/30"
                >
                  Lưu ngay
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
