import React, { useRef, useState, useEffect } from 'react';
import { Camera, X, RefreshCw, AlertCircle } from 'lucide-react';

interface WebcamCaptureProps {
  onCapture: (base64: string) => void;
  onClose: () => void;
}

export const WebcamCapture: React.FC<WebcamCaptureProps> = ({ onCapture, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      setError(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' },
        audio: false,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err: any) {
      console.error('Camera error', err);
      setError('Không thể mở webcam. Vui lòng cấp quyền truy cập camera trên trình duyệt.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const handleTakeSnapshot = () => {
    // 3-second countdown for fun fashion pose!
    setCountdown(3);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(interval);
          snapPhoto();
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const snapPhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Flip horizontally for natural mirror feel
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      stopCamera();
      onCapture(dataUrl);
    }
  };

  return (
    <div className="relative rounded-3xl overflow-hidden bg-black border border-studio-border/80 shadow-2xl flex flex-col items-center justify-center p-4">
      {/* Top Close Button */}
      <button
        onClick={() => {
          stopCamera();
          onClose();
        }}
        className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md transition"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Camera View or Error */}
      <div className="relative w-full max-w-xl aspect-video rounded-2xl overflow-hidden bg-studio-card flex items-center justify-center">
        {error ? (
          <div className="p-6 text-center text-rose-400 space-y-3">
            <AlertCircle className="w-10 h-10 mx-auto" />
            <p className="text-sm">{error}</p>
            <button
              onClick={startCamera}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-studio-surface border border-studio-border text-white hover:bg-white/10 transition"
            >
              Thử lại
            </button>
          </div>
        ) : (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover transform -scale-x-100"
            />

            {/* Countdown Overlay */}
            {countdown !== null && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-10">
                <span className="text-7xl font-extrabold text-white animate-ping">
                  {countdown}
                </span>
              </div>
            )}
          </>
        )}
      </div>

      {/* Hidden canvas for taking snapshot */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Bottom Controls */}
      {!error && (
        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={handleTakeSnapshot}
            disabled={countdown !== null}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/40 transition disabled:opacity-50"
          >
            <Camera className="w-5 h-5" />
            <span>Chụp ảnh ngay</span>
          </button>
        </div>
      )}
    </div>
  );
};
