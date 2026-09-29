import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  RotateCcw,
  Camera,
  Trash2,
  Shuffle,
  Eye,
  Shirt,
  Layers,
  Smile,
} from 'lucide-react';
import { useOutfitStore, CameraView } from '../../store/outfitStore';
import { SlotCategory } from '../../types';
import { MannequinAvatar } from './MannequinAvatar';
import { ClothingSlotLoader } from './ClothingSlotLoader';
import { StudioLighting } from './StudioLighting';
import { CameraControls } from './CameraControls';
import { ScreenshotCapture } from './ScreenshotCapture';
import { classNames } from '../../lib/utils';

export const CharacterViewer: React.FC = () => {
  const {
    equippedItems,
    cameraView,
    setCameraView,
    autoRotate360,
    toggleAutoRotate360,
    triggerScreenshot,
    clearOutfit,
    randomizeOutfit,
    avatarGender,
    setAvatarGender,
    skinTone,
    setSkinTone,
  } = useOutfitStore();

  const slots: { key: SlotCategory; label: string }[] = [
    { key: 'top', label: 'Áo' },
    { key: 'bottom', label: 'Quần' },
    { key: 'feet', label: 'Giày' },
    { key: 'head', label: 'Mũ' },
    { key: 'face', label: 'Kính/Mặt' },
    { key: 'accessory', label: 'Phụ kiện' },
  ];

  const cameraButtons: { key: CameraView; label: string; icon: any }[] = [
    { key: 'full', label: 'Toàn thân', icon: Eye },
    { key: 'upper', label: 'Thân trên', icon: Shirt },
    { key: 'lower', label: 'Quần & Giày', icon: Layers },
    { key: 'head', label: 'Gương mặt', icon: Smile },
  ];

  const skinToneOptions = [
    { label: 'Da sáng', color: '#fae8d8' },
    { label: 'Tự nhiên (Châu Á)', color: '#e8be9e' },
    { label: 'Bánh mật', color: '#c28b62' },
    { label: 'Ngăm', color: '#8d5524' },
    { label: 'Ma-nơ-canh', color: '#e2e8f0' },
  ];

  const equippedCount = Object.values(equippedItems).filter(Boolean).length;

  return (
    <div className="relative w-full h-[640px] lg:h-[720px] bg-[#10131b] rounded-3xl overflow-hidden border border-studio-border/80 shadow-2xl flex flex-col select-none">
      {/* Studio Radial Backdrop */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_40%,rgba(99,102,241,0.08),transparent_70%)]" />

      {/* TOP BAR: GENDER & SKIN TONE SELECTOR */}
      <div className="absolute top-4 inset-x-4 z-10 flex flex-wrap items-center justify-between gap-3 pointer-events-auto">
        {/* Gender Nam / Nữ */}
        <div className="flex items-center gap-1.5 bg-[#171b26]/90 backdrop-blur-md px-1.5 py-1 rounded-2xl border border-studio-border/70 shadow-md">
          <button
            onClick={() => setAvatarGender('male')}
            className={classNames(
              'px-3.5 py-1 rounded-xl text-xs font-bold transition',
              avatarGender === 'male' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            )}
          >
            Nam
          </button>
          <button
            onClick={() => setAvatarGender('female')}
            className={classNames(
              'px-3.5 py-1 rounded-xl text-xs font-bold transition',
              avatarGender === 'female' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            )}
          >
            Nữ
          </button>
        </div>

        {/* Skin Tone Palette Swatches */}
        <div className="flex items-center gap-1.5 bg-[#171b26]/90 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-studio-border/70 shadow-md">
          <span className="text-[11px] font-medium text-slate-400 mr-1 hidden sm:inline">Màu da:</span>
          {skinToneOptions.map((st) => (
            <button
              key={st.color}
              onClick={() => setSkinTone(st.color)}
              className={classNames(
                'w-5 h-5 rounded-full transition-transform border',
                skinTone === st.color
                  ? 'ring-2 ring-indigo-500 scale-125 border-white shadow-md'
                  : 'border-white/20 hover:scale-110'
              )}
              style={{ backgroundColor: st.color }}
              title={st.label}
            />
          ))}
        </div>
      </div>

      {/* 3D CANVAS (CHARACTER SIZED PROMINENTLY, 100% UNOBSTRUCTED) */}
      <div className="flex-1 w-full h-full relative cursor-grab active:cursor-grabbing">
        <Canvas
          shadows
          camera={{ position: [0, 0.15, 2.3], fov: 42 }}
          gl={{
            antialias: true,
            preserveDrawingBuffer: true,
            powerPreference: 'high-performance',
          }}
        >
          <StudioLighting preset="studio" />
          
          <Suspense fallback={null}>
            {/* Scaled and centered to fill viewport prominently */}
            <group position={[0, -0.05, 0]} scale={[1.22, 1.22, 1.22]}>
              <MannequinAvatar gender={avatarGender} color={skinTone} />
              {slots.map(({ key }) => (
                <ClothingSlotLoader key={key} slot={key} item={equippedItems[key]} />
              ))}
            </group>
          </Suspense>

          <CameraControls />
          <ScreenshotCapture />
        </Canvas>
      </div>

      {/* BOTTOM CONTROLS BAR: CAMERA VIEWS & QUICK ACTIONS */}
      <div className="absolute bottom-4 inset-x-4 z-10 flex flex-col sm:flex-row items-center justify-between gap-2.5 pointer-events-auto">
        {/* Camera Views Selector */}
        <div className="inline-flex p-1 rounded-2xl bg-[#171b26]/90 backdrop-blur-md border border-studio-border/80 shadow-xl gap-1">
          {cameraButtons.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setCameraView(key)}
              className={classNames(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition',
                cameraView === key
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              )}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Action Buttons: 360, Camera PNG, Shuffle, Clear */}
        <div className="flex items-center gap-1.5 bg-[#171b26]/90 backdrop-blur-md p-1 rounded-2xl border border-studio-border/80 shadow-xl">
          <button
            onClick={toggleAutoRotate360}
            className={classNames(
              'p-2 rounded-xl text-xs font-medium transition flex items-center gap-1',
              autoRotate360
                ? 'bg-indigo-600 text-white'
                : 'text-slate-300 hover:bg-white/5 hover:text-white'
            )}
            title={autoRotate360 ? 'Dừng xoay' : 'Xoay 360°'}
          >
            <RotateCcw className={classNames('w-4 h-4', autoRotate360 && 'animate-spin')} />
            <span className="hidden sm:inline text-xs font-semibold">
              {autoRotate360 ? 'Đang xoay' : '360°'}
            </span>
          </button>

          <button
            onClick={triggerScreenshot}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition flex items-center gap-1"
            title="Chụp ảnh xuất PNG"
          >
            <Camera className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline text-xs font-semibold">Chụp ảnh</span>
          </button>

          <button
            onClick={randomizeOutfit}
            className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition"
            title="Phối ngẫu nhiên"
          >
            <Shuffle className="w-4 h-4 text-indigo-400" />
          </button>

          <button
            onClick={clearOutfit}
            className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition"
            title="Cởi sạch đồ"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
