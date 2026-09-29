import React, { useRef, useState } from 'react';
import { UploadCloud, Image, Sparkles } from 'lucide-react';

interface PhotoUploaderProps {
  onImageSelected: (base64: string) => void;
  isLoading: boolean;
}

export const PhotoUploader: React.FC<PhotoUploaderProps> = ({ onImageSelected, isLoading }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        onImageSelected(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  // Sample photos for immediate one-click testing
  const samplePhotos = [
    {
      title: 'Set Streetwear Đơn Giản',
      url: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=400&q=80',
    },
    {
      title: 'Áo Khoác Biker Cá Tính',
      url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=400&q=80',
    },
    {
      title: 'Phong Cách Tối Giản Hàn Quốc',
      url: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=400&q=80',
    },
  ];

  const handleSelectSample = async (url: string) => {
    try {
      // Convert external image to base64 via canvas or fetch
      const res = await fetch(url);
      const blob = await res.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageSelected(reader.result as string);
      };
      reader.readAsDataURL(blob);
    } catch {
      // Direct pass
      onImageSelected(url);
    }
  };

  return (
    <div className="space-y-4">
      {/* DRAG & DROP BOX */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center ${
          isDragOver
            ? 'border-indigo-400 bg-indigo-500/10 scale-[1.01]'
            : 'border-studio-border/80 bg-studio-surface/60 hover:bg-studio-surface hover:border-indigo-500/50'
        } ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        <div className="w-16 h-16 rounded-2xl bg-indigo-600/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-4 shadow-inner">
          <UploadCloud className="w-8 h-8" />
        </div>

        <h3 className="text-base sm:text-lg font-bold text-white mb-1.5">
          Tải lên ảnh trang phục hoặc tủ đồ
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 max-w-sm mb-4">
          Kéo thả ảnh vào đây, hoặc nhấn để chọn file từ thiết bị của bạn (JPG, PNG, WEBP).
        </p>

        <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/30 transition">
          <Image className="w-4 h-4" />
          <span>Chọn ảnh từ máy tính</span>
        </span>
      </div>

      {/* SAMPLES SECTION */}
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Hoặc thử ngay với ảnh mẫu có sẵn:</span>
        </p>
        <div className="grid grid-cols-3 gap-3">
          {samplePhotos.map((s, idx) => (
            <div
              key={idx}
              onClick={() => handleSelectSample(s.url)}
              className="group relative rounded-xl overflow-hidden aspect-[4/3] bg-studio-card cursor-pointer border border-studio-border hover:border-indigo-500 transition shadow-sm"
            >
              <img
                src={s.url}
                alt={s.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-2">
                <span className="text-[11px] font-medium text-white truncate">{s.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
