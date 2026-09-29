import React, { useState } from 'react';
import { Key, X, Check, ExternalLink, ShieldAlert } from 'lucide-react';
import { getStoredGeminiApiKey, saveStoredGeminiApiKey } from '../../services/geminiVisionService';
import { toast } from '../../store/toastStore';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose }) => {
  const [apiKey, setApiKey] = useState(getStoredGeminiApiKey());

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveStoredGeminiApiKey(apiKey);
    toast.success('Đã lưu cấu hình Google Gemini API Key!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />
      <div className="relative w-full max-w-md bg-studio-surface border border-studio-border rounded-3xl p-6 shadow-2xl space-y-5 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Google Gemini API Key</h3>
              <p className="text-[11px] text-slate-400">Dùng cho tính năng Phân tích ảnh tủ đồ AI</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Nhập Gemini API Key của bạn (Tùy chọn):
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full px-4 py-2.5 bg-studio-card border border-studio-border rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition font-mono"
            />
          </div>

          <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-slate-300 space-y-1.5">
            <p className="font-semibold text-indigo-300 flex items-center gap-1.5">
              <span>💡 Chế độ Demo Sẵn Sàng:</span>
            </p>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Nếu bạn không có API key hoặc để trống, hệ thống sẽ tự động chuyển sang{' '}
              <strong className="text-slate-200">Chế độ Mô Phỏng AI Thông Minh</strong> để bạn có thể trải nghiệm toàn bộ quy trình ngay lập tức mà không gặp bất kỳ lỗi nào!
            </p>
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-indigo-400 hover:underline pt-1"
            >
              <span>Lấy Gemini API Key miễn phí tại Google AI Studio</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition"
            >
              Đóng
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition shadow-md shadow-indigo-600/30"
            >
              Lưu cấu hình
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
