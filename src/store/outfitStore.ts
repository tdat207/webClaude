import { create } from 'zustand';
import { ClothingItem, EquippedItems, SavedOutfit, SlotCategory, StylePreset } from '../types';
import { CLOTHING_ITEMS } from '../data/clothingItems';
import { STYLE_PRESETS } from '../data/styles';
import { generateId } from '../lib/utils';
import { toast } from './toastStore';

export type CameraView = 'full' | 'upper' | 'lower' | 'head';
export type LightingPreset = 'studio' | 'sunset' | 'cyberpunk' | 'clean';

const SAVED_OUTFITS_KEY = 'fashion3d_saved_outfits';

function loadInitialSavedOutfits(): SavedOutfit[] {
  try {
    const raw = localStorage.getItem(SAVED_OUTFITS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to load saved outfits', e);
    return [];
  }
}

function saveSavedOutfitsToStorage(outfits: SavedOutfit[]) {
  try {
    localStorage.setItem(SAVED_OUTFITS_KEY, JSON.stringify(outfits));
  } catch (e) {
    console.error('Failed to save outfits to localStorage', e);
  }
}

// Initial equipped outfit: Streetwear preset default
const initialPreset = STYLE_PRESETS[0];
const initialEquipped: EquippedItems = {};
initialPreset.itemIds.forEach((id) => {
  const item = CLOTHING_ITEMS.find((c) => c.id === id);
  if (item) {
    initialEquipped[item.category] = item;
  }
});

interface OutfitState {
  equippedItems: EquippedItems;
  savedOutfits: SavedOutfit[];
  cameraView: CameraView;
  autoRotate360: boolean;
  lightingPreset: LightingPreset;
  screenshotTrigger: number;
  isCapturing: boolean;
  avatarGender: 'male' | 'female';
  skinTone: string;
  selectedItemForModal: ClothingItem | null;

  // Actions
  equipItem: (item: ClothingItem) => void;
  unequipItem: (category: SlotCategory) => void;
  toggleItem: (item: ClothingItem) => void;
  isEquipped: (itemId: string) => boolean;
  clearOutfit: () => void;
  applyStylePreset: (preset: StylePreset) => void;
  randomizeOutfit: () => void;
  
  setCameraView: (view: CameraView) => void;
  setAutoRotate360: (enabled: boolean) => void;
  toggleAutoRotate360: () => void;
  setLightingPreset: (preset: LightingPreset) => void;
  triggerScreenshot: () => void;
  setIsCapturing: (val: boolean) => void;
  setAvatarGender: (gender: 'male' | 'female') => void;
  setSkinTone: (tone: string) => void;
  setSelectedItemForModal: (item: ClothingItem | null) => void;

  saveCurrentOutfit: (name: string, notes?: string) => SavedOutfit;
  deleteSavedOutfit: (id: string) => void;
  loadSavedOutfit: (id: string) => void;
  getTotalPrice: () => number;
}

export const useOutfitStore = create<OutfitState>((set, get) => ({
  equippedItems: initialEquipped,
  savedOutfits: loadInitialSavedOutfits(),
  cameraView: 'full',
  autoRotate360: false,
  lightingPreset: 'studio',
  screenshotTrigger: 0,
  isCapturing: false,
  avatarGender: 'male',
  skinTone: '#e8be9e',
  selectedItemForModal: null,

  equipItem: (item) => {
    set((state) => ({
      equippedItems: {
        ...state.equippedItems,
        [item.category]: item,
      },
    }));
    toast.success(`Đã mặc: ${item.name}`);
  },

  unequipItem: (category) => {
    const current = get().equippedItems[category];
    if (!current) return;
    set((state) => {
      const updated = { ...state.equippedItems };
      delete updated[category];
      return { equippedItems: updated };
    });
    toast.info(`Đã cởi: ${current.name}`);
  },

  toggleItem: (item) => {
    const current = get().equippedItems[item.category];
    if (current?.id === item.id) {
      get().unequipItem(item.category);
    } else {
      get().equipItem(item);
    }
  },

  isEquipped: (itemId) => {
    const { equippedItems } = get();
    return Object.values(equippedItems).some((item) => item?.id === itemId);
  },

  clearOutfit: () => {
    set({ equippedItems: {} });
    toast.info('Đã tháo toàn bộ trang phục');
  },

  applyStylePreset: (preset) => {
    const newEquipped: EquippedItems = {};
    preset.itemIds.forEach((id) => {
      const item = CLOTHING_ITEMS.find((c) => c.id === id);
      if (item) {
        newEquipped[item.category] = item;
      }
    });
    set({ equippedItems: newEquipped });
    toast.success(`Đã áp dụng phong cách "${preset.name}"!`);
  },

  randomizeOutfit: () => {
    const currentGender = get().avatarGender;
    const categories: SlotCategory[] = ['top', 'bottom', 'feet', 'head', 'face', 'accessory'];
    const newEquipped: EquippedItems = {};

    categories.forEach((cat) => {
      const available = CLOTHING_ITEMS.filter(
        (i) => i.category === cat && (i.gender === 'unisex' || i.gender === currentGender)
      );
      if (available.length > 0) {
        const chance = (cat === 'top' || cat === 'bottom' || cat === 'feet') ? 1.0 : 0.4;
        if (Math.random() < chance) {
          const randomIndex = Math.floor(Math.random() * available.length);
          newEquipped[cat] = available[randomIndex];
        }
      }
    });

    set({ equippedItems: newEquipped });
    toast.success(`Đã tạo một bộ phối đồ ngẫu nhiên cho ${currentGender === 'male' ? 'Nam' : 'Nữ'}!`);
  },

  setCameraView: (view) => set({ cameraView: view }),
  setAutoRotate360: (enabled) => set({ autoRotate360: enabled }),
  toggleAutoRotate360: () => set((state) => ({ autoRotate360: !state.autoRotate360 })),
  setLightingPreset: (preset) => set({ lightingPreset: preset }),
  triggerScreenshot: () => set((state) => ({ screenshotTrigger: state.screenshotTrigger + 1 })),
  setIsCapturing: (val) => set({ isCapturing: val }),
  setAvatarGender: (gender) => {
    const currentEquipped = get().equippedItems;
    const updatedEquipped: EquippedItems = {};

    // Keep unisex and matching gender items
    Object.entries(currentEquipped).forEach(([slot, item]) => {
      if (item && (item.gender === 'unisex' || item.gender === gender)) {
        (updatedEquipped as any)[slot] = item;
      }
    });

    // If top or bottom became empty, auto-pick a default piece for the new gender
    if (!updatedEquipped.top) {
      const defaultTop = CLOTHING_ITEMS.find((c) => c.category === 'top' && (c.gender === gender || c.gender === 'unisex'));
      if (defaultTop) updatedEquipped.top = defaultTop;
    }
    if (!updatedEquipped.bottom) {
      const defaultBottom = CLOTHING_ITEMS.find((c) => c.category === 'bottom' && (c.gender === gender || c.gender === 'unisex'));
      if (defaultBottom) updatedEquipped.bottom = defaultBottom;
    }

    set({ avatarGender: gender, equippedItems: updatedEquipped });
    toast.info(`Đã đổi sang người mẫu ${gender === 'male' ? 'Nam' : 'Nữ'} và cập nhật trang phục`);
  },
  setSkinTone: (tone) => set({ skinTone: tone }),
  setSelectedItemForModal: (item) => set({ selectedItemForModal: item }),

  saveCurrentOutfit: (name, notes) => {
    const state = get();
    const totalPrice = state.getTotalPrice();
    const newOutfit: SavedOutfit = {
      id: generateId(),
      name: name || `Outfit phối ngày ${new Date().toLocaleDateString('vi-VN')}`,
      createdAt: new Date().toISOString(),
      equippedItems: { ...state.equippedItems },
      totalPrice,
      notes,
    };

    const updated = [newOutfit, ...state.savedOutfits];
    set({ savedOutfits: updated });
    saveSavedOutfitsToStorage(updated);
    toast.success(`Đã lưu outfit: ${newOutfit.name}`);
    return newOutfit;
  },

  deleteSavedOutfit: (id) => {
    set((state) => {
      const updated = state.savedOutfits.filter((o) => o.id !== id);
      saveSavedOutfitsToStorage(updated);
      return { savedOutfits: updated };
    });
    toast.info('Đã xóa outfit đã lưu');
  },

  loadSavedOutfit: (id) => {
    const outfit = get().savedOutfits.find((o) => o.id === id);
    if (outfit) {
      set({ equippedItems: { ...outfit.equippedItems } });
      toast.success(`Đã mặc lại outfit "${outfit.name}"`);
    }
  },

  getTotalPrice: () => {
    const { equippedItems } = get();
    return Object.values(equippedItems).reduce((sum, item) => sum + (item?.price || 0), 0);
  },
}));
