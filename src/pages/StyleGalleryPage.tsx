import React from 'react';
import { StyleGalleryGrid } from '../components/styles/StyleGalleryGrid';
import { Compass, Sparkles } from 'lucide-react';

export const StyleGalleryPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fadeIn">
      {/* HEADER BANNER */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Bộ sưu tập phong cách 3D độc quyền</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Style Gallery — Khám Phá Phong Cách
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          Mỗi thẻ là một nhân vật 3D avatar mặc outfit mẫu hoàn chỉnh và tự động xoay 360°.
          Chọn một phong cách để áp dụng ngay lên nhân vật của bạn cùng danh sách mua sắm đối tác!
        </p>
      </div>

      {/* STYLE GALLERY GRID */}
      <StyleGalleryGrid />
    </div>
  );
};
