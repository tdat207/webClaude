import React, { useState } from 'react';
import { Bookmark, DollarSign, Sparkles } from 'lucide-react';
import { SavedOutfitsList } from '../components/saved/SavedOutfitsList';
import { AffiliateStatsPanel } from '../components/saved/AffiliateStatsPanel';
import { getAffiliateClicks } from '../services/affiliateTracking';

export const SavedOutfitsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'outfits' | 'affiliate'>('outfits');
  const affiliateClicksCount = getAffiliateClicks().length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fadeIn">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-studio-border/60">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Tủ Đồ Đã Lưu & Kiếm Tiền Affiliate
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Quản lý các bộ phối bạn đã lưu và theo dõi doanh thu hoa hồng từ các lượt click mua hàng
          </p>
        </div>

        {/* TABS SELECTOR */}
        <div className="inline-flex p-1 rounded-2xl bg-studio-surface border border-studio-border">
          <button
            onClick={() => setActiveTab('outfits')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'outfits'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>Outfit Đã Lưu</span>
          </button>

          <button
            onClick={() => setActiveTab('affiliate')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'affiliate'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Thống Kê Affiliate</span>
            {affiliateClicksCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-950 text-emerald-300 font-extrabold border border-emerald-500/40">
                {affiliateClicksCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* CONTENT */}
      {activeTab === 'outfits' ? <SavedOutfitsList /> : <AffiliateStatsPanel />}
    </div>
  );
};
