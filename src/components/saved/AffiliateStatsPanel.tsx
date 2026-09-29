import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  MousePointerClick,
  DollarSign,
  Store,
  Clock,
  Trash2,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import {
  getAffiliateStats,
  clearAffiliateHistory,
  AffiliateStats,
} from '../../services/affiliateTracking';
import { formatCurrencyVND, formatDate } from '../../lib/utils';
import { toast } from '../../store/toastStore';

export const AffiliateStatsPanel: React.FC = () => {
  const [stats, setStats] = useState<AffiliateStats>(getAffiliateStats());

  useEffect(() => {
    setStats(getAffiliateStats());
  }, []);

  const handleClear = () => {
    if (window.confirm('Bạn có chắc muốn xóa lịch sử thống kê click affiliate?')) {
      clearAffiliateHistory();
      setStats(getAffiliateStats());
      toast.info('Đã xóa dữ liệu thống kê');
    }
  };

  const productStatsArray = Object.entries(stats.clicksByProduct).map(([id, data]) => ({
    id,
    ...data,
  }));

  return (
    <div className="space-y-6">
      {/* 3 SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Clicks */}
        <div className="p-5 rounded-2xl bg-studio-surface border border-studio-border shadow-lg flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
            <MousePointerClick className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Lượt click mua sắm
            </p>
            <p className="text-2xl font-black text-white">{stats.totalClicks}</p>
            <p className="text-[11px] text-emerald-400 font-medium">Tracking đối tác thời gian thực</p>
          </div>
        </div>

        {/* Estimated GMV */}
        <div className="p-5 rounded-2xl bg-studio-surface border border-studio-border shadow-lg flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Tổng giá trị đơn hàng (GMV)
            </p>
            <p className="text-2xl font-black text-white">
              {formatCurrencyVND(stats.totalEstimatedGMV)}
            </p>
            <p className="text-[11px] text-slate-400">Ước tính từ sản phẩm đã chuyển đổi</p>
          </div>
        </div>

        {/* Estimated Commission */}
        <div className="p-5 rounded-2xl bg-studio-surface border border-studio-border shadow-lg flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Hoa hồng ước tính (~8%)
            </p>
            <p className="text-2xl font-black text-emerald-400">
              {formatCurrencyVND(stats.totalEstimatedCommission)}
            </p>
            <p className="text-[11px] text-slate-400">Doanh thu affiliate kiếm tiền</p>
          </div>
        </div>
      </div>

      {/* CLICKS BREAKDOWN BY PRODUCT */}
      <div className="p-6 rounded-3xl bg-studio-surface border border-studio-border shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Store className="w-5 h-5 text-indigo-400" />
              <span>Thống kê hiệu quả theo sản phẩm</span>
            </h3>
            <p className="text-xs text-slate-400">
              Các mặt hàng thời trang được người dùng quan tâm và bấm nút Mua ngay nhiều nhất
            </p>
          </div>

          {stats.totalClicks > 0 && (
            <button
              onClick={handleClear}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition border border-rose-500/20"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Xóa lịch sử</span>
            </button>
          )}
        </div>

        {productStatsArray.length === 0 ? (
          <div className="py-8 text-center text-slate-400 text-xs">
            Chưa có lượt click affiliate nào được ghi nhận. Hãy thử bấm nút "Mua ngay" trên các sản phẩm!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-studio-card/80 text-slate-400 uppercase font-semibold text-[10px] tracking-wider border-b border-studio-border">
                <tr>
                  <th className="py-3 px-4">Tên sản phẩm</th>
                  <th className="py-3 px-4">Thương hiệu</th>
                  <th className="py-3 px-4 text-center">Số lượt click</th>
                  <th className="py-3 px-4 text-right">Tổng GMV</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-studio-border/50 text-slate-200">
                {productStatsArray.map((row) => (
                  <tr key={row.id} className="hover:bg-white/5 transition">
                    <td className="py-3 px-4 font-semibold text-white">{row.product}</td>
                    <td className="py-3 px-4 text-slate-400">{row.brand}</td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold">
                        {row.count}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-emerald-400">
                      {formatCurrencyVND(row.gmv)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* RECENT CLICK HISTORY LOGS */}
      {stats.recentClicks.length > 0 && (
        <div className="p-6 rounded-3xl bg-studio-surface border border-studio-border shadow-xl space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-400" />
            <span>Lịch sử click gần đây (Mới nhất)</span>
          </h3>

          <div className="space-y-2">
            {stats.recentClicks.map((click) => (
              <div
                key={click.id}
                className="p-3 rounded-xl bg-studio-card/60 border border-studio-border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
              >
                <div>
                  <span className="font-semibold text-white">{click.productName}</span>{' '}
                  <span className="text-slate-400">({click.brand})</span>
                  <p className="text-[11px] text-slate-400">
                    Sàn: <strong className="text-slate-300">{click.merchantName}</strong> | Nguồn:{' '}
                    <span className="text-indigo-400">{click.source}</span>
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-bold text-emerald-400">{formatCurrencyVND(click.price)}</span>
                  <span className="text-slate-500 text-[11px]">{formatDate(click.timestamp)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
