import { SlotCategory, SlotOffset } from '../types';

export const DEFAULT_SLOT_OFFSETS: Record<SlotCategory, SlotOffset> = {
  head: {
    position: [0, 0.98, 0],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
  },
  face: {
    position: [0, 0.93, 0.15],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
  },
  top: {
    position: [0, 0.42, 0],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
  },
  bottom: {
    position: [0, -0.18, 0],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
  },
  feet: {
    position: [0, -0.78, 0],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
  },
  accessory: {
    position: [0, 0.35, 0.05],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
  },
};
