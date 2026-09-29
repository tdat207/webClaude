import React from 'react';
import { Shirt, SearchX } from 'lucide-react';
import { ClothingItem } from '../../types';
import { ItemCard } from './ItemCard';

interface ItemGridProps {
  items: ClothingItem[];
  onOpenDetail: (item: ClothingItem) => void;
  onResetFilters?: () => void;
}

export const ItemGrid: React.FC<ItemGridProps> = ({ items, onOpenDetail, onResetFilters }) => {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-studio-surface/50 border border-studio-border/60 rounded-2xl">
        <div className="w-14 h-14 rounded-2xl bg-studio-card flex items-center justify-center text-slate-500 mb-3 border border-studio-border">
          <SearchX className="w-7 h-7" />
        </div>
        <h3 className="text-base font-bold text-white mb-1">Không tìm thấy sản phẩm phù hợp</h3>
        <p className="text-xs text-slate-400 max-w-sm mb-4">
          Hãy thử tìm kiếm với từ khóa khác hoặc điều chỉnh lại bộ lọc phân loại phong cách.
        </p>
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition shadow-md"
          >
            Xóa bộ lọc tìm kiếm
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} onOpenDetail={onOpenDetail} />
      ))}
    </div>
  );
};
