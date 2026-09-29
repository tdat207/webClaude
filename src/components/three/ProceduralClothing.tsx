import React from 'react';
import { ModelData } from '../../types';

interface ProceduralClothingProps {
  modelData: ModelData;
}

export const ProceduralClothing: React.FC<ProceduralClothingProps> = ({ modelData }) => {
  const {
    geometryType = 'tshirt',
    color = '#6366f1',
    secondaryColor = '#ffffff',
    roughness = 0.7,
    metalness = 0.1,
  } = modelData;

  switch (geometryType) {
    // ================= TOPS =================
    case 'hoodie':
      return (
        <group>
          {/* Main Torso */}
          <mesh position={[0, 0, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.31, 0.28, 0.58, 24]} />
            <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
          </mesh>
          {/* Kangaroo Pocket */}
          <mesh position={[0, -0.08, 0.18]} castShadow>
            <boxGeometry args={[0.28, 0.16, 0.08]} />
            <meshStandardMaterial color={secondaryColor} roughness={roughness} metalness={metalness} />
          </mesh>
          {/* Hood in Back */}
          <mesh position={[0, 0.26, -0.12]} rotation={[0.4, 0, 0]} castShadow>
            <sphereGeometry args={[0.22, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.7]} />
            <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
          </mesh>
          {/* Left Sleeve */}
          <mesh position={[-0.38, -0.05, 0]} rotation={[0, 0, 0.22]} castShadow>
            <cylinderGeometry args={[0.11, 0.09, 0.46, 16]} />
            <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
          </mesh>
          {/* Right Sleeve */}
          <mesh position={[0.38, -0.05, 0]} rotation={[0, 0, -0.22]} castShadow>
            <cylinderGeometry args={[0.11, 0.09, 0.46, 16]} />
            <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
          </mesh>
          {/* Ribbed Bottom Hem */}
          <mesh position={[0, -0.3, 0]}>
            <cylinderGeometry args={[0.29, 0.29, 0.06, 24]} />
            <meshStandardMaterial color={secondaryColor} roughness={roughness} metalness={metalness} />
          </mesh>
        </group>
      );

    case 'jacket':
      return (
        <group>
          {/* Leather Jacket Torso */}
          <mesh position={[0, 0, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.32, 0.29, 0.55, 24]} />
            <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
          </mesh>
          {/* Asymmetrical Lapel / Zipper */}
          <mesh position={[0.04, 0, 0.17]} castShadow>
            <boxGeometry args={[0.02, 0.52, 0.03]} />
            <meshStandardMaterial color={secondaryColor} roughness={0.2} metalness={0.9} />
          </mesh>
          {/* Biker Collar */}
          <mesh position={[0, 0.24, 0.06]} rotation={[-0.2, 0, 0]} castShadow>
            <torusGeometry args={[0.2, 0.04, 8, 24, Math.PI * 1.3]} />
            <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
          </mesh>
          {/* Left Sleeve */}
          <mesh position={[-0.38, -0.04, 0]} rotation={[0, 0, 0.25]} castShadow>
            <cylinderGeometry args={[0.11, 0.09, 0.45, 16]} />
            <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
          </mesh>
          {/* Right Sleeve */}
          <mesh position={[0.38, -0.04, 0]} rotation={[0, 0, -0.25]} castShadow>
            <cylinderGeometry args={[0.11, 0.09, 0.45, 16]} />
            <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
          </mesh>
        </group>
      );

    case 'blazer':
      return (
        <group>
          {/* Blazer Body */}
          <mesh position={[0, -0.02, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.32, 0.31, 0.6, 24]} />
            <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
          </mesh>
          {/* V-neck lapel inner shirt view */}
          <mesh position={[0, 0.12, 0.15]}>
            <planeGeometry args={[0.14, 0.24]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.8} />
          </mesh>
          {/* Lapel edges */}
          <mesh position={[-0.07, 0.1, 0.17]} rotation={[0, 0, -0.25]} castShadow>
            <boxGeometry args={[0.06, 0.28, 0.03]} />
            <meshStandardMaterial color={secondaryColor} roughness={roughness} metalness={metalness} />
          </mesh>
          <mesh position={[0.07, 0.1, 0.17]} rotation={[0, 0, 0.25]} castShadow>
            <boxGeometry args={[0.06, 0.28, 0.03]} />
            <meshStandardMaterial color={secondaryColor} roughness={roughness} metalness={metalness} />
          </mesh>
          {/* Button */}
          <mesh position={[0, -0.05, 0.18]}>
            <sphereGeometry args={[0.015, 8, 8]} />
            <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Sleeves */}
          <mesh position={[-0.37, -0.06, 0]} rotation={[0, 0, 0.2]} castShadow>
            <cylinderGeometry args={[0.1, 0.085, 0.47, 16]} />
            <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
          </mesh>
          <mesh position={[0.37, -0.06, 0]} rotation={[0, 0, -0.2]} castShadow>
            <cylinderGeometry args={[0.1, 0.085, 0.47, 16]} />
            <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
          </mesh>
        </group>
      );

    case 'shirt':
      return (
        <group>
          {/* Shirt Torso */}
          <mesh position={[0, 0, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.29, 0.27, 0.52, 24]} />
            <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
          </mesh>
          {/* Cuban Collar */}
          <mesh position={[0, 0.24, 0.05]} rotation={[-0.3, 0, 0]}>
            <torusGeometry args={[0.18, 0.03, 8, 24, Math.PI * 1.2]} />
            <meshStandardMaterial color={secondaryColor} roughness={roughness} metalness={metalness} />
          </mesh>
          {/* Front Buttons */}
          {[-0.12, -0.02, 0.08, 0.18].map((y, idx) => (
            <mesh key={idx} position={[0, y, 0.16]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.012, 0.012, 0.01, 8]} />
              <meshStandardMaterial color="#f8fafc" roughness={0.3} metalness={0.2} />
            </mesh>
          ))}
          {/* Half Sleeves */}
          <mesh position={[-0.34, 0.05, 0]} rotation={[0, 0, 0.35]} castShadow>
            <cylinderGeometry args={[0.1, 0.09, 0.26, 16]} />
            <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
          </mesh>
          <mesh position={[0.34, 0.05, 0]} rotation={[0, 0, -0.35]} castShadow>
            <cylinderGeometry args={[0.1, 0.09, 0.26, 16]} />
            <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
          </mesh>
        </group>
      );

    case 'croptop':
      return (
        <group>
          {/* Croptop Torso (High waist cut) */}
          <mesh position={[0, 0.08, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.26, 0.22, 0.34, 24]} />
            <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
          </mesh>
          {/* Scoop / Round Neck */}
          <mesh position={[0, 0.24, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.13, 0.018, 12, 24]} />
            <meshStandardMaterial color={secondaryColor} roughness={roughness} metalness={metalness} />
          </mesh>
          {/* Baby Tee Cap Sleeves */}
          <mesh position={[-0.28, 0.14, 0]} rotation={[0, 0, 0.4]} castShadow>
            <cylinderGeometry args={[0.08, 0.07, 0.16, 16]} />
            <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
          </mesh>
          <mesh position={[0.28, 0.14, 0]} rotation={[0, 0, -0.4]} castShadow>
            <cylinderGeometry args={[0.08, 0.07, 0.16, 16]} />
            <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
          </mesh>
        </group>
      );

    case 'cardigan':
      return (
        <group>
          {/* Cardigan Torso */}
          <mesh position={[0, 0, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.28, 0.26, 0.54, 24]} />
            <meshStandardMaterial color={color} roughness={0.9} metalness={0.05} />
          </mesh>
          {/* V-neck Inner top */}
          <mesh position={[0, 0.1, 0.14]}>
            <planeGeometry args={[0.12, 0.22]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.8} />
          </mesh>
          {/* Front Button Band */}
          <mesh position={[0, -0.06, 0.15]}>
            <boxGeometry args={[0.03, 0.4, 0.015]} />
            <meshStandardMaterial color={secondaryColor} roughness={0.8} />
          </mesh>
          {/* Knit Sleeves */}
          <mesh position={[-0.34, -0.02, 0]} rotation={[0, 0, 0.25]} castShadow>
            <cylinderGeometry args={[0.095, 0.08, 0.46, 16]} />
            <meshStandardMaterial color={color} roughness={0.9} metalness={0.05} />
          </mesh>
          <mesh position={[0.34, -0.02, 0]} rotation={[0, 0, -0.25]} castShadow>
            <cylinderGeometry args={[0.095, 0.08, 0.46, 16]} />
            <meshStandardMaterial color={color} roughness={0.9} metalness={0.05} />
          </mesh>
        </group>
      );

    case 'tshirt':
    default:
      return (
        <group>
          {/* T-Shirt Body */}
          <mesh position={[0, 0, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.285, 0.265, 0.52, 24]} />
            <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
          </mesh>
          {/* Ribbed Collar */}
          <mesh position={[0, 0.24, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.15, 0.022, 12, 24]} />
            <meshStandardMaterial color={secondaryColor} roughness={roughness} metalness={metalness} />
          </mesh>
          {/* Left Short Sleeve */}
          <mesh position={[-0.32, 0.06, 0]} rotation={[0, 0, 0.35]} castShadow>
            <cylinderGeometry args={[0.095, 0.085, 0.22, 16]} />
            <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
          </mesh>
          {/* Right Short Sleeve */}
          <mesh position={[0.32, 0.06, 0]} rotation={[0, 0, -0.35]} castShadow>
            <cylinderGeometry args={[0.095, 0.085, 0.22, 16]} />
            <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
          </mesh>
        </group>
      );

    // ================= BOTTOMS =================
    case 'jeans':
      return (
        <group>
          {/* Waistband */}
          <mesh position={[0, 0.22, 0]} castShadow>
            <cylinderGeometry args={[0.255, 0.245, 0.1, 24]} />
            <meshStandardMaterial color={secondaryColor} roughness={roughness} metalness={metalness} />
          </mesh>
          {/* Hips */}
          <mesh position={[0, 0.12, 0]} castShadow>
            <cylinderGeometry args={[0.25, 0.23, 0.15, 24]} />
            <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
          </mesh>
          {/* Left Leg */}
          <mesh position={[-0.13, -0.22, 0]} castShadow>
            <cylinderGeometry args={[0.115, 0.105, 0.58, 20]} />
            <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
          </mesh>
          {/* Right Leg */}
          <mesh position={[0.13, -0.22, 0]} castShadow>
            <cylinderGeometry args={[0.115, 0.105, 0.58, 20]} />
            <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
          </mesh>
          {/* Cuffs */}
          <mesh position={[-0.13, -0.5, 0]}>
            <cylinderGeometry args={[0.11, 0.11, 0.04, 20]} />
            <meshStandardMaterial color={secondaryColor} roughness={roughness} metalness={metalness} />
          </mesh>
          <mesh position={[0.13, -0.5, 0]}>
            <cylinderGeometry args={[0.11, 0.11, 0.04, 20]} />
            <meshStandardMaterial color={secondaryColor} roughness={roughness} metalness={metalness} />
          </mesh>
        </group>
      );

    case 'cargopants':
      return (
        <group>
          {/* Waist */}
          <mesh position={[0, 0.22, 0]} castShadow>
            <cylinderGeometry args={[0.26, 0.25, 0.1, 24]} />
            <meshStandardMaterial color={secondaryColor} roughness={roughness} metalness={metalness} />
          </mesh>
          {/* Hips */}
          <mesh position={[0, 0.12, 0]} castShadow>
            <cylinderGeometry args={[0.255, 0.24, 0.16, 24]} />
            <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
          </mesh>
          {/* Left Baggy Leg */}
          <mesh position={[-0.14, -0.22, 0]} castShadow>
            <cylinderGeometry args={[0.125, 0.115, 0.58, 20]} />
            <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
          </mesh>
          {/* Right Baggy Leg */}
          <mesh position={[0.14, -0.22, 0]} castShadow>
            <cylinderGeometry args={[0.125, 0.115, 0.58, 20]} />
            <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
          </mesh>
          {/* 3D Cargo Pockets on sides */}
          <mesh position={[-0.27, -0.18, 0]} castShadow>
            <boxGeometry args={[0.06, 0.18, 0.12]} />
            <meshStandardMaterial color={secondaryColor} roughness={roughness} metalness={metalness} />
          </mesh>
          <mesh position={[0.27, -0.18, 0]} castShadow>
            <boxGeometry args={[0.06, 0.18, 0.12]} />
            <meshStandardMaterial color={secondaryColor} roughness={roughness} metalness={metalness} />
          </mesh>
        </group>
      );

    case 'shorts':
      return (
        <group>
          {/* Waist */}
          <mesh position={[0, 0.22, 0]} castShadow>
            <cylinderGeometry args={[0.25, 0.24, 0.08, 24]} />
            <meshStandardMaterial color={secondaryColor} roughness={roughness} metalness={metalness} />
          </mesh>
          {/* Hips */}
          <mesh position={[0, 0.12, 0]} castShadow>
            <cylinderGeometry args={[0.245, 0.23, 0.16, 24]} />
            <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
          </mesh>
          {/* Left Short Leg */}
          <mesh position={[-0.13, -0.06, 0]} castShadow>
            <cylinderGeometry args={[0.12, 0.115, 0.24, 20]} />
            <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
          </mesh>
          {/* Right Short Leg */}
          <mesh position={[0.13, -0.06, 0]} castShadow>
            <cylinderGeometry args={[0.12, 0.115, 0.24, 20]} />
            <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
          </mesh>
        </group>
      );

    case 'skirt':
      return (
        <group>
          {/* High Waistband */}
          <mesh position={[0, 0.22, 0]} castShadow>
            <cylinderGeometry args={[0.22, 0.24, 0.08, 24]} />
            <meshStandardMaterial color={secondaryColor} roughness={roughness} metalness={metalness} />
          </mesh>
          {/* Flared A-Line Skirt Body */}
          <mesh position={[0, 0.02, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.24, 0.42, 0.44, 28, 1, false]} />
            <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
          </mesh>
        </group>
      );

    // ================= FEET =================
    case 'sneakers':
      return (
        <group>
          {/* Left Sneaker */}
          <group position={[-0.14, 0, 0.02]}>
            {/* Chunky Sole */}
            <mesh position={[0, -0.04, 0.04]} castShadow>
              <boxGeometry args={[0.13, 0.06, 0.27]} />
              <meshStandardMaterial color="#ffffff" roughness={0.3} metalness={0.05} />
            </mesh>
            {/* Upper */}
            <mesh position={[0, 0.02, 0.03]} castShadow>
              <boxGeometry args={[0.12, 0.09, 0.24]} />
              <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
            </mesh>
            {/* Brand Accent Stripe */}
            <mesh position={[0, 0.03, 0.04]}>
              <boxGeometry args={[0.125, 0.03, 0.16]} />
              <meshStandardMaterial color={secondaryColor} roughness={roughness} metalness={0.2} />
            </mesh>
            {/* Laces Area */}
            <mesh position={[0, 0.07, 0.06]}>
              <boxGeometry args={[0.07, 0.02, 0.12]} />
              <meshStandardMaterial color="#ffffff" roughness={0.8} />
            </mesh>
          </group>

          {/* Right Sneaker */}
          <group position={[0.14, 0, 0.02]}>
            {/* Chunky Sole */}
            <mesh position={[0, -0.04, 0.04]} castShadow>
              <boxGeometry args={[0.13, 0.06, 0.27]} />
              <meshStandardMaterial color="#ffffff" roughness={0.3} metalness={0.05} />
            </mesh>
            {/* Upper */}
            <mesh position={[0, 0.02, 0.03]} castShadow>
              <boxGeometry args={[0.12, 0.09, 0.24]} />
              <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
            </mesh>
            {/* Brand Accent Stripe */}
            <mesh position={[0, 0.03, 0.04]}>
              <boxGeometry args={[0.125, 0.03, 0.16]} />
              <meshStandardMaterial color={secondaryColor} roughness={roughness} metalness={0.2} />
            </mesh>
            {/* Laces Area */}
            <mesh position={[0, 0.07, 0.06]}>
              <boxGeometry args={[0.07, 0.02, 0.12]} />
              <meshStandardMaterial color="#ffffff" roughness={0.8} />
            </mesh>
          </group>
        </group>
      );

    case 'boots':
      return (
        <group>
          {/* Left Boot */}
          <group position={[-0.14, 0.02, 0.02]}>
            {/* Sole */}
            <mesh position={[0, -0.06, 0.03]} castShadow>
              <boxGeometry args={[0.13, 0.07, 0.27]} />
              <meshStandardMaterial color="#111827" roughness={0.5} metalness={0.1} />
            </mesh>
            {/* Foot Body */}
            <mesh position={[0, -0.01, 0.04]} castShadow>
              <boxGeometry args={[0.12, 0.08, 0.25]} />
              <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
            </mesh>
            {/* High Shaft */}
            <mesh position={[0, 0.1, -0.01]} castShadow>
              <cylinderGeometry args={[0.085, 0.08, 0.18, 16]} />
              <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
            </mesh>
          </group>

          {/* Right Boot */}
          <group position={[0.14, 0.02, 0.02]}>
            {/* Sole */}
            <mesh position={[0, -0.06, 0.03]} castShadow>
              <boxGeometry args={[0.13, 0.07, 0.27]} />
              <meshStandardMaterial color="#111827" roughness={0.5} metalness={0.1} />
            </mesh>
            {/* Foot Body */}
            <mesh position={[0, -0.01, 0.04]} castShadow>
              <boxGeometry args={[0.12, 0.08, 0.25]} />
              <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
            </mesh>
            {/* High Shaft */}
            <mesh position={[0, 0.1, -0.01]} castShadow>
              <cylinderGeometry args={[0.085, 0.08, 0.18, 16]} />
              <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
            </mesh>
          </group>
        </group>
      );

    case 'loafers':
      return (
        <group>
          {/* Left Loafer */}
          <group position={[-0.14, 0, 0.03]}>
            <mesh position={[0, -0.04, 0.03]} castShadow>
              <boxGeometry args={[0.12, 0.06, 0.26]} />
              <meshStandardMaterial color="#0f172a" roughness={0.4} metalness={0.1} />
            </mesh>
            <mesh position={[0, 0.01, 0.04]} castShadow>
              <boxGeometry args={[0.11, 0.06, 0.23]} />
              <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
            </mesh>
            {/* Metal Bit */}
            <mesh position={[0, 0.04, 0.06]}>
              <boxGeometry args={[0.06, 0.015, 0.02]} />
              <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.1} />
            </mesh>
          </group>

          {/* Right Loafer */}
          <group position={[0.14, 0, 0.03]}>
            <mesh position={[0, -0.04, 0.03]} castShadow>
              <boxGeometry args={[0.12, 0.06, 0.26]} />
              <meshStandardMaterial color="#0f172a" roughness={0.4} metalness={0.1} />
            </mesh>
            <mesh position={[0, 0.01, 0.04]} castShadow>
              <boxGeometry args={[0.11, 0.06, 0.23]} />
              <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
            </mesh>
            {/* Metal Bit */}
            <mesh position={[0, 0.04, 0.06]}>
              <boxGeometry args={[0.06, 0.015, 0.02]} />
              <meshStandardMaterial color="#d4af37" metalness={0.9} roughness={0.1} />
            </mesh>
          </group>
        </group>
      );

    case 'maryjane':
      return (
        <group>
          {/* Left Mary Jane */}
          <group position={[-0.13, 0, 0.03]}>
            <mesh position={[0, -0.04, 0.03]} castShadow>
              <boxGeometry args={[0.11, 0.06, 0.24]} />
              <meshStandardMaterial color="#09090b" roughness={0.3} metalness={0.2} />
            </mesh>
            <mesh position={[0, 0.01, 0.04]} castShadow>
              <boxGeometry args={[0.1, 0.05, 0.22]} />
              <meshStandardMaterial color={color} roughness={0.2} metalness={0.3} />
            </mesh>
            {/* Ankle Strap */}
            <mesh position={[0, 0.04, 0.02]}>
              <boxGeometry args={[0.11, 0.015, 0.02]} />
              <meshStandardMaterial color="#ffffff" roughness={0.3} />
            </mesh>
          </group>
          {/* Right Mary Jane */}
          <group position={[0.13, 0, 0.03]}>
            <mesh position={[0, -0.04, 0.03]} castShadow>
              <boxGeometry args={[0.11, 0.06, 0.24]} />
              <meshStandardMaterial color="#09090b" roughness={0.3} metalness={0.2} />
            </mesh>
            <mesh position={[0, 0.01, 0.04]} castShadow>
              <boxGeometry args={[0.1, 0.05, 0.22]} />
              <meshStandardMaterial color={color} roughness={0.2} metalness={0.3} />
            </mesh>
            {/* Ankle Strap */}
            <mesh position={[0, 0.04, 0.02]}>
              <boxGeometry args={[0.11, 0.015, 0.02]} />
              <meshStandardMaterial color="#ffffff" roughness={0.3} />
            </mesh>
          </group>
        </group>
      );

    // ================= HEAD =================
    case 'cap':
      return (
        <group position={[0, 0.02, 0]}>
          {/* Cap Crown Dome */}
          <mesh position={[0, 0, 0]} castShadow>
            <sphereGeometry args={[0.18, 20, 20, 0, Math.PI * 2, 0, Math.PI * 0.52]} />
            <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
          </mesh>
          {/* Front Curved Visor */}
          <mesh position={[0, -0.02, 0.17]} rotation={[0.25, 0, 0]} castShadow>
            <cylinderGeometry args={[0.16, 0.17, 0.02, 16, 1, false, -Math.PI * 0.45, Math.PI * 0.9]} />
            <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
          </mesh>
          {/* Button on top */}
          <mesh position={[0, 0.18, 0]}>
            <sphereGeometry args={[0.015, 8, 8]} />
            <meshStandardMaterial color={secondaryColor} roughness={0.5} />
          </mesh>
        </group>
      );

    case 'beanie':
      return (
        <group position={[0, 0.02, 0]}>
          {/* Beanie Main */}
          <mesh position={[0, 0.04, 0]} castShadow>
            <sphereGeometry args={[0.185, 20, 20, 0, Math.PI * 2, 0, Math.PI * 0.65]} />
            <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
          </mesh>
          {/* Folded Cuff Ring */}
          <mesh position={[0, -0.04, 0]}>
            <torusGeometry args={[0.18, 0.035, 12, 24]} />
            <meshStandardMaterial color={secondaryColor} roughness={roughness} metalness={metalness} />
          </mesh>
        </group>
      );

    case 'buckethat':
      return (
        <group position={[0, 0.04, 0]}>
          {/* Flat Crown */}
          <mesh position={[0, 0.05, 0]} castShadow>
            <cylinderGeometry args={[0.16, 0.175, 0.13, 24]} />
            <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
          </mesh>
          {/* Sloping Brim */}
          <mesh position={[0, -0.03, 0]} rotation={[0, 0, 0]} castShadow>
            <cylinderGeometry args={[0.18, 0.28, 0.04, 24, 1, true]} />
            <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
          </mesh>
        </group>
      );

    case 'beret':
      return (
        <group position={[0, 0.05, 0]} rotation={[0.15, 0, -0.15]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.22, 0.16, 0.07, 24]} />
            <meshStandardMaterial color={color} roughness={0.9} metalness={0.0} />
          </mesh>
          <mesh position={[0, 0.04, 0]}>
            <sphereGeometry args={[0.015, 8, 8]} />
            <meshStandardMaterial color={secondaryColor} />
          </mesh>
        </group>
      );

    // ================= FACE =================
    case 'sunglasses':
      return (
        <group position={[0, 0, 0]}>
          {/* Left Lens */}
          <mesh position={[-0.065, 0, 0]} castShadow>
            <boxGeometry args={[0.065, 0.045, 0.01]} />
            <meshStandardMaterial color="#09090b" roughness={0.1} metalness={0.9} />
          </mesh>
          {/* Right Lens */}
          <mesh position={[0.065, 0, 0]} castShadow>
            <boxGeometry args={[0.065, 0.045, 0.01]} />
            <meshStandardMaterial color="#09090b" roughness={0.1} metalness={0.9} />
          </mesh>
          {/* Frame Bridge */}
          <mesh position={[0, 0.01, 0]}>
            <boxGeometry args={[0.025, 0.008, 0.012]} />
            <meshStandardMaterial color={color} roughness={0.2} metalness={0.4} />
          </mesh>
          {/* Temples (Arms) going back */}
          <mesh position={[-0.105, 0, -0.08]} rotation={[0, 0.05, 0]}>
            <boxGeometry args={[0.008, 0.015, 0.16]} />
            <meshStandardMaterial color={color} roughness={0.2} metalness={0.4} />
          </mesh>
          <mesh position={[0.105, 0, -0.08]} rotation={[0, -0.05, 0]}>
            <boxGeometry args={[0.008, 0.015, 0.16]} />
            <meshStandardMaterial color={color} roughness={0.2} metalness={0.4} />
          </mesh>
        </group>
      );

    case 'glasses':
      return (
        <group position={[0, 0, 0]}>
          {/* Left Circular Frame */}
          <mesh position={[-0.06, 0, 0]}>
            <torusGeometry args={[0.026, 0.003, 12, 24]} />
            <meshStandardMaterial color={color} roughness={0.2} metalness={0.9} />
          </mesh>
          {/* Right Circular Frame */}
          <mesh position={[0.06, 0, 0]}>
            <torusGeometry args={[0.026, 0.003, 12, 24]} />
            <meshStandardMaterial color={color} roughness={0.2} metalness={0.9} />
          </mesh>
          {/* Bridge */}
          <mesh position={[0, 0.015, 0]}>
            <boxGeometry args={[0.025, 0.003, 0.005]} />
            <meshStandardMaterial color={color} roughness={0.2} metalness={0.9} />
          </mesh>
        </group>
      );

    // ================= ACCESSORY =================
    case 'bag':
      return (
        <group position={[0, 0, 0]}>
          {/* Crossbody Bag Pouch */}
          <mesh position={[-0.22, -0.15, 0.15]} rotation={[0.1, 0.3, -0.15]} castShadow>
            <boxGeometry args={[0.18, 0.22, 0.08]} />
            <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
          </mesh>
          {/* Buckle */}
          <mesh position={[-0.22, -0.14, 0.2]} rotation={[0.1, 0.3, -0.15]}>
            <boxGeometry args={[0.06, 0.04, 0.02]} />
            <meshStandardMaterial color={secondaryColor} roughness={0.2} metalness={0.9} />
          </mesh>
          {/* Diagonal Strap across torso */}
          <mesh position={[-0.05, 0.02, 0.16]} rotation={[0, 0, 0.8]}>
            <boxGeometry args={[0.55, 0.04, 0.01]} />
            <meshStandardMaterial color="#18181b" roughness={0.8} />
          </mesh>
        </group>
      );

    case 'necklace':
      return (
        <group position={[0, 0, 0]}>
          {/* Cuban Chain Link Loop */}
          <mesh position={[0, -0.05, 0.12]} rotation={[0.5, 0, 0]}>
            <torusGeometry args={[0.13, 0.012, 12, 32, Math.PI * 1.4]} />
            <meshStandardMaterial color={color} roughness={0.15} metalness={0.95} />
          </mesh>
        </group>
      );

    case 'watch':
      return (
        <group position={[0, 0, 0]}>
          {/* Watch Case */}
          <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.03, 0.03, 0.015, 24]} />
            <meshStandardMaterial color={color} roughness={0.2} metalness={0.9} />
          </mesh>
          {/* Dial Face */}
          <mesh position={[0, 0, 0.01]} rotation={[Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.024, 24]} />
            <meshStandardMaterial color={secondaryColor} roughness={0.3} metalness={0.5} />
          </mesh>
          {/* Bracelet Strap */}
          <mesh position={[0, 0, 0]}>
            <torusGeometry args={[0.04, 0.01, 12, 24]} />
            <meshStandardMaterial color={color} roughness={0.2} metalness={0.9} />
          </mesh>
        </group>
      );
  }
};
