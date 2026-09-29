import React, { useState } from 'react';
import {
  ScanLine,
  UploadCloud,
  Camera,
  Sparkles,
  Key,
  AlertCircle,
  Loader2,
  CheckCircle,
} from 'lucide-react';
import { PhotoUploader } from '../components/scan/PhotoUploader';
import { WebcamCapture } from '../components/scan/WebcamCapture';
import { ScanResultPanel } from '../components/scan/ScanResultPanel';
import {
  analyzeWardrobePhoto,
  getStoredGeminiApiKey,
} from '../services/geminiVisionService';
import { AIAnalysisResult } from '../types';
import { toast } from '../store/toastStore';
import { ApiKeyModal } from '../components/common/ApiKeyModal';

export const WardrobeScanPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upload' | 'webcam'>('upload');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [scannedImage, setScannedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AIAnalysisResult | null>(null);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);

  const hasApiKey = Boolean(getStoredGeminiApiKey());

  const handleProcessImage = async (base64Image: string) => {
    setScannedImage(base64Image);
    setIsLoading(true);
    setAnalysisResult(null);

    try {
      setLoadingStep('Đang chuẩn bị dữ liệu hình ảnh...');
      await new Promise((r) => setTimeout(r, 400));

      setLoadingStep(
        hasApiKey
          ? 'Đang gửi ảnh tới Google Gemini Vision API...'
          : 'Đang phân tích hình ảnh bằng AI Stylist...'
      );

      const result = await analyzeWardrobePhoto(base64Image);

      setLoadingStep('Đang đối chiếu sản phẩm phù hợp từ catalog thời trang...');
      await new Promise((r) => setTimeout(r, 400));

      setAnalysisResult(result);
      toast.success(
        `Nhận diện thành công ${result.detectedItems.length} món đồ!`,
        'Phân tích hoàn tất'
      );
    } catch (err: any) {
      console.error('Scan error', err);
      toast.error('Có lỗi xảy ra trong quá trình phân tích ảnh. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
      setLoadingStep('');
    }
  };

  const handleReset = () => {
    setScannedImage(null);
    setAnalysisResult(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 animate-fadeIn">
      {/* HEADER HERO */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Multimodal Gemini AI Vision</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Phân Tích Tủ Đồ Bằng AI
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          Tải lên ảnh hoặc chụp trực tiếp qua webcam món đồ bạn đang có. AI Stylist sẽ nhận diện màu
          sắc, phom dáng và gợi ý các món phối hoàn hảo kèm liên kết mua sắm và thử ngay trên 3D!
        </p>

        {/* API Status Badge */}
        <div className="flex items-center justify-center gap-2 pt-1 text-xs">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-medium border ${
              hasApiKey
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${hasApiKey ? 'bg-emerald-400' : 'bg-amber-400'}`}
            />
            {hasApiKey ? 'Chế độ Trực tiếp: Google Gemini API' : 'Chế độ Trải nghiệm Thông minh (Offline Ready)'}
          </span>

          <button
            onClick={() => setIsApiKeyModalOpen(true)}
            className="text-slate-400 hover:text-white underline text-[11px] transition"
          >
            Đổi Key
          </button>
        </div>
      </div>

      {/* MAIN SCANNER AREA */}
      {!analysisResult && !isLoading && (
        <div className="max-w-3xl mx-auto space-y-6">
          {/* TABS: UPLOAD vs WEBCAM */}
          <div className="flex items-center justify-center p-1 rounded-2xl bg-studio-surface border border-studio-border max-w-sm mx-auto">
            <button
              onClick={() => setActiveTab('upload')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold transition ${
                activeTab === 'upload'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <UploadCloud className="w-4 h-4" />
              <span>Tải ảnh lên</span>
            </button>

            <button
              onClick={() => setActiveTab('webcam')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold transition ${
                activeTab === 'webcam'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>Chụp Webcam</span>
            </button>
          </div>

          {/* TAB CONTENTS */}
          {activeTab === 'upload' ? (
            <PhotoUploader onImageSelected={handleProcessImage} isLoading={isLoading} />
          ) : (
            <WebcamCapture
              onCapture={handleProcessImage}
              onClose={() => setActiveTab('upload')}
            />
          )}
        </div>
      )}

      {/* LOADING STATE WITH PROGRESS */}
      {isLoading && (
        <div className="max-w-md mx-auto p-8 rounded-3xl bg-studio-surface border border-studio-border text-center space-y-4 shadow-2xl">
          <div className="relative w-16 h-16 mx-auto">
            <Loader2 className="w-16 h-16 text-indigo-500 animate-spin" />
            <Sparkles className="w-6 h-6 text-amber-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <h3 className="text-lg font-bold text-white">AI Stylist đang phân tích...</h3>
          <p className="text-xs text-indigo-300 font-medium animate-pulse">{loadingStep}</p>
          <div className="w-full bg-studio-card rounded-full h-1.5 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full w-2/3 animate-pulse rounded-full" />
          </div>
        </div>
      )}

      {/* RESULTS DISPLAY */}
      {analysisResult && scannedImage && (
        <ScanResultPanel
          result={analysisResult}
          imagePreview={scannedImage}
          onReset={handleReset}
        />
      )}

      {/* GEMINI MODAL */}
      <ApiKeyModal isOpen={isApiKeyModalOpen} onClose={() => setIsApiKeyModalOpen(false)} />
    </div>
  );
};
