import React, { useState, useMemo } from 'react';
import { CharacterViewer } from '../components/three/CharacterViewer';
import { EquippedSidebar } from '../components/wardrobe/EquippedSidebar';
import { CategoryTabs, ActiveCategory } from '../components/wardrobe/CategoryTabs';
import { ItemGrid } from '../components/wardrobe/ItemGrid';
import { OutfitSummaryBar } from '../components/wardrobe/OutfitSummaryBar';
import { ProductDetailModal } from '../components/wardrobe/ProductDetailModal';
import { CLOTHING_ITEMS } from '../data/clothingItems';
import { useOutfitStore } from '../store/outfitStore';

export const FittingPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>('all');
  const [selectedStyle, setSelectedStyle] = useState<string>('Tất cả phong cách');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const avatarGender = useOutfitStore((s) => s.avatarGender);
  const selectedItemForModal = useOutfitStore((s) => s.selectedItemForModal);
  const setSelectedItemForModal = useOutfitStore((s) => s.setSelectedItemForModal);

  // Items matching selected gender (Nam or Nu + Unisex)
  const genderMatchedItems = useMemo(() => {
    return CLOTHING_ITEMS.filter((item) => {
      if (item.gender === 'unisex') return true;
      return item.gender === avatarGender;
    });
  }, [avatarGender]);

  // Category counts computation for the current gender
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: genderMatchedItems.length,
      top: 0,
      bottom: 0,
      feet: 0,
      head: 0,
      face: 0,
      accessory: 0,
    };
    genderMatchedItems.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, [genderMatchedItems]);

  // Filtered items computation
  const filteredItems = useMemo(() => {
    return genderMatchedItems.filter((item) => {
      // Category filter
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      // Style filter
      if (selectedStyle !== 'Tất cả phong cách' && item.styleTag !== selectedStyle) {
        return false;
      }
      // Text search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesBrand = item.brand.toLowerCase().includes(query);
        const matchesTags = item.tags.some((t) => t.toLowerCase().includes(query));
        if (!matchesName && !matchesBrand && !matchesTags) {
          return false;
        }
      }
      return true;
    });
  }, [genderMatchedItems, activeCategory, selectedStyle, searchQuery]);

  const handleResetFilters = () => {
    setActiveCategory('all');
    setSelectedStyle('Tất cả phong cách');
    setSearchQuery('');
  };

  return (
    <div className="max-w-[1680px] mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* HEADER BANNER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-studio-border/50">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Phòng Thử Đồ 3D Thời Trang
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Tự do thử nghiệm các phong cách, xoay 360°, xuất ảnh và mua sắm trực tiếp qua liên kết đối tác
          </p>
        </div>
      </div>

      {/* 3-COLUMN MODERN LAYOUT:
          - Col 1 (Bên trái): Khung dọc Đồ Đang Mặc (EquippedSidebar)
          - Col 2 (Ở giữa): Bảng Nhân Vật 3D (CharacterViewer) - 100% thoáng, không bị che
          - Col 3 (Bên phải): Danh mục Sản Phẩm & Chọn Đồ (CategoryTabs & ItemGrid)
      */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* CỘT 1 (BÊN TRÁI BẢNG NHÂN VẬT): KHUNG DỌC ĐỒ ĐANG MẶC (3 / 12 COLS) */}
        <div className="lg:col-span-3 xl:col-span-3 sticky top-20 z-10 order-2 lg:order-1">
          <EquippedSidebar onSelectCategory={(cat) => setActiveCategory(cat)} />
        </div>

        {/* CỘT 2 (Ở GIỮA): PHÒNG THỬ ĐỒ 3D (5 / 12 COLS) */}
        <div className="lg:col-span-5 xl:col-span-5 sticky top-20 z-10 order-1 lg:order-2">
          <CharacterViewer />
        </div>

        {/* CỘT 3 (BÊN PHẢI): DANH MỤC SẢN PHẨM & CHỌN ĐỒ (4 / 12 COLS) */}
        <div className="lg:col-span-4 xl:col-span-4 space-y-4 order-3">
          {/* Category Tabs, Search & Filters */}
          <CategoryTabs
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            selectedStyle={selectedStyle}
            onSelectStyle={setSelectedStyle}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            categoryCounts={categoryCounts}
          />

          {/* Product Items Grid */}
          <ItemGrid
            items={filteredItems}
            onOpenDetail={(item) => setSelectedItemForModal(item)}
            onResetFilters={handleResetFilters}
          />

          {/* Bottom Summary Bar on smaller viewports */}
          <div className="lg:hidden">
            <OutfitSummaryBar />
          </div>
        </div>
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        item={selectedItemForModal}
        onClose={() => setSelectedItemForModal(null)}
      />
    </div>
  );
};
