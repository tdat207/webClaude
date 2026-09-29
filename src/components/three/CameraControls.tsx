import React, { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls as DreiOrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useOutfitStore, CameraView } from '../../store/outfitStore';

interface ViewTarget {
  position: [number, number, number];
  target: [number, number, number];
}

const VIEW_PRESETS: Record<CameraView, ViewTarget> = {
  full: {
    position: [0, 0.15, 2.3],
    target: [0, 0.08, 0],
  },
  upper: {
    position: [0, 0.45, 1.45],
    target: [0, 0.42, 0],
  },
  lower: {
    position: [0, -0.32, 1.6],
    target: [0, -0.42, 0],
  },
  head: {
    position: [0, 0.88, 1.15],
    target: [0, 0.88, 0],
  },
};

export const CameraControls: React.FC = () => {
  const controlsRef = useRef<any>(null);
  const { camera } = useThree();
  const cameraView = useOutfitStore((s) => s.cameraView);
  const autoRotate360 = useOutfitStore((s) => s.autoRotate360);

  const desiredPos = useRef(new THREE.Vector3(...VIEW_PRESETS[cameraView].position));
  const desiredTarget = useRef(new THREE.Vector3(...VIEW_PRESETS[cameraView].target));
  const isTransitioning = useRef(false);

  useEffect(() => {
    const preset = VIEW_PRESETS[cameraView];
    desiredPos.current.set(...preset.position);
    desiredTarget.current.set(...preset.target);
    isTransitioning.current = true;
  }, [cameraView]);

  useFrame((_, delta) => {
    if (isTransitioning.current && controlsRef.current) {
      // Smooth lerp camera position and orbit target
      const lerpSpeed = Math.min(delta * 4.5, 1);
      camera.position.lerp(desiredPos.current, lerpSpeed);
      controlsRef.current.target.lerp(desiredTarget.current, lerpSpeed);
      controlsRef.current.update();

      if (
        camera.position.distanceTo(desiredPos.current) < 0.02 &&
        controlsRef.current.target.distanceTo(desiredTarget.current) < 0.02
      ) {
        camera.position.copy(desiredPos.current);
        controlsRef.current.target.copy(desiredTarget.current);
        isTransitioning.current = false;
      }
    }
  });

  return (
    <DreiOrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.08}
      minDistance={0.9}
      maxDistance={5.2}
      minPolarAngle={0.2}
      maxPolarAngle={Math.PI / 2 + 0.08}
      autoRotate={autoRotate360}
      autoRotateSpeed={2.8}
    />
  );
};
