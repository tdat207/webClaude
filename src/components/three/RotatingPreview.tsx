import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ClothingItem, SlotCategory } from '../../types';
import { MannequinAvatar } from './MannequinAvatar';
import { ClothingSlotLoader } from './ClothingSlotLoader';
import { StudioLighting } from './StudioLighting';

interface RotatingModelProps {
  items: ClothingItem[];
}

const RotatingModel: React.FC<RotatingModelProps> = ({ items }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.7; // Smooth slow rotation
    }
  });

  const slotsMap: Partial<Record<SlotCategory, ClothingItem>> = {};
  items.forEach((item) => {
    slotsMap[item.category] = item;
  });

  const slotKeys: SlotCategory[] = ['head', 'face', 'top', 'bottom', 'feet', 'accessory'];

  return (
    <group ref={groupRef} position={[0, -0.1, 0]} scale={[1.1, 1.1, 1.1]}>
      <MannequinAvatar gender="male" color="#e2e8f0" />
      {slotKeys.map((slot) => (
        <ClothingSlotLoader key={slot} slot={slot} item={slotsMap[slot]} />
      ))}
    </group>
  );
};

interface RotatingPreviewProps {
  items: ClothingItem[];
  className?: string;
}

export const RotatingPreview: React.FC<RotatingPreviewProps> = ({ items, className = 'h-64' }) => {
  return (
    <div className={`relative w-full overflow-hidden rounded-xl bg-gradient-to-b from-[#181b26] to-[#0e1017] ${className}`}>
      {/* Studio Radial Glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_40%,rgba(99,102,241,0.12),transparent_70%)]" />
      
      <Canvas
        camera={{ position: [0, 0.4, 2.7], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        <StudioLighting preset="studio" />
        <RotatingModel items={items} />
      </Canvas>
    </div>
  );
};
