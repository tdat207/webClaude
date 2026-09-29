import React, { Suspense } from 'react';
import { useGLTF } from '@react-three/drei';
import { ClothingItem, SlotCategory } from '../../types';
import { DEFAULT_SLOT_OFFSETS } from '../../data/slotOffsets';
import { ProceduralClothing } from './ProceduralClothing';

interface ClothingSlotLoaderProps {
  slot: SlotCategory;
  item?: ClothingItem;
}

// Subcomponent to load GLB model if available
const GLBModel: React.FC<{ url: string }> = ({ url }) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene.clone()} />;
};

export const ClothingSlotLoader: React.FC<ClothingSlotLoaderProps> = ({ slot, item }) => {
  if (!item) return null;

  const defaultOffset = DEFAULT_SLOT_OFFSETS[slot];
  const itemOffset = item.modelData.offset || defaultOffset.position;
  const itemScale = item.modelData.scale || defaultOffset.scale;
  const itemRotation = item.modelData.rotation || defaultOffset.rotation;

  return (
    <group
      position={itemOffset}
      rotation={itemRotation}
      scale={itemScale}
    >
      {item.modelData.modelUrl ? (
        <Suspense fallback={<ProceduralClothing modelData={item.modelData} />}>
          <GLBModel url={item.modelData.modelUrl} />
        </Suspense>
      ) : (
        <ProceduralClothing modelData={item.modelData} />
      )}
    </group>
  );
};
