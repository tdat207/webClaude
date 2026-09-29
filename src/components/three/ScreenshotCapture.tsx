import React, { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { useOutfitStore } from '../../store/outfitStore';
import { toast } from '../../store/toastStore';

export const ScreenshotCapture: React.FC = () => {
  const { gl } = useThree();
  const screenshotTrigger = useOutfitStore((s) => s.screenshotTrigger);
  const lastTriggerRef = useRef(0);

  useEffect(() => {
    // Only capture when user explicitly clicks the camera button
    if (screenshotTrigger === 0 || screenshotTrigger <= lastTriggerRef.current) {
      return;
    }
    lastTriggerRef.current = screenshotTrigger;

    try {
      const dataUrl = gl.domElement.toDataURL('image/png');
      const link = document.createElement('a');
      const dateStr = new Date().toISOString().slice(0, 10);
      link.download = `style3d-outfit-${dateStr}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      const itemsCount = Object.keys(useOutfitStore.getState().equippedItems).length;
      toast.success(`Đã lưu ảnh outfit về máy (${itemsCount} món)`, 'Chụp ảnh thành công');
    } catch (err) {
      console.error('Failed to take screenshot', err);
      toast.error('Không thể chụp ảnh. Vui lòng thử lại.');
    }
  }, [screenshotTrigger, gl]);

  return null;
};
