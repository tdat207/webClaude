import React from 'react';
import { LightingPreset } from '../../store/outfitStore';

interface StudioLightingProps {
  preset?: LightingPreset;
}

export const StudioLighting: React.FC<StudioLightingProps> = ({ preset = 'studio' }) => {
  if (preset === 'sunset') {
    return (
      <>
        <ambientLight intensity={0.6} color="#fed7aa" />
        {/* Key warm golden light */}
        <directionalLight
          position={[3, 4, 3]}
          intensity={1.8}
          color="#f97316"
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        {/* Cool fill light */}
        <directionalLight position={[-3, 2, -2]} intensity={0.7} color="#38bdf8" />
        {/* Purple rim light */}
        <directionalLight position={[0, 4, -4]} intensity={1.2} color="#ec4899" />
      </>
    );
  }

  if (preset === 'cyberpunk') {
    return (
      <>
        <ambientLight intensity={0.4} color="#1e1b4b" />
        {/* Neon Cyan key */}
        <directionalLight
          position={[-3, 3, 2]}
          intensity={1.8}
          color="#06b6d4"
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        {/* Neon Magenta fill */}
        <directionalLight position={[3, 2, 2]} intensity={1.6} color="#d946ef" />
        {/* Yellow-Green rim */}
        <directionalLight position={[0, 4, -3]} intensity={1.4} color="#a3e635" />
      </>
    );
  }

  if (preset === 'clean') {
    return (
      <>
        <ambientLight intensity={1.1} color="#ffffff" />
        <directionalLight position={[2, 5, 3]} intensity={1.2} color="#ffffff" />
        <directionalLight position={[-2, 3, -2]} intensity={0.6} color="#f8fafc" />
      </>
    );
  }

  // Default: Pro Fashion Studio Light
  return (
    <>
      <ambientLight intensity={0.75} color="#f8fafc" />
      {/* Key Light: warm neutral */}
      <directionalLight
        position={[3, 5, 4]}
        intensity={1.4}
        color="#fffbeb"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-2}
        shadow-camera-right={2}
        shadow-camera-top={2}
        shadow-camera-bottom={-2}
        shadow-bias={-0.0001}
      />
      {/* Fill Light: soft cool tone */}
      <directionalLight position={[-3, 3, 3]} intensity={0.8} color="#e0f2fe" />
      {/* Rim Light: crisp edge highlight from back-top */}
      <directionalLight position={[0, 4, -4]} intensity={1.2} color="#eef2ff" />
      {/* Foot fill to light shoes properly */}
      <directionalLight position={[0, -1, 2]} intensity={0.4} color="#ffffff" />
    </>
  );
};
