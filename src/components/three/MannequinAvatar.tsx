import React from 'react';

interface MannequinAvatarProps {
  gender?: 'male' | 'female';
  color?: string;
}

export const MannequinAvatar: React.FC<MannequinAvatarProps> = ({
  gender = 'male',
  color = '#e8be9e',
}) => {
  const isFemale = gender === 'female';
  const shoulderWidth = isFemale ? 0.28 : 0.38;
  const chestUpper = isFemale ? 0.23 : 0.28;
  const waistRadius = isFemale ? 0.16 : 0.22;
  const hipRadius = isFemale ? 0.26 : 0.22;
  const armRadius = isFemale ? 0.038 : 0.052;
  const legRadius = isFemale ? 0.068 : 0.082;

  return (
    <group position={[0, 0, 0]}>
      {/* Studio Pedestal / Rotating Platform */}
      <group position={[0, -0.84, 0]}>
        <mesh receiveShadow>
          <cylinderGeometry args={[0.65, 0.7, 0.04, 48]} />
          <meshStandardMaterial color="#1e2433" roughness={0.4} metalness={0.6} />
        </mesh>
        <mesh position={[0, 0.022, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.55, 0.58, 48]} />
          <meshBasicMaterial color="#6366f1" />
        </mesh>
      </group>

      {/* ================= HEAD & HAIR ================= */}
      <group position={[0, 0.96, 0]}>
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[isFemale ? 0.125 : 0.138, 32, 32]} />
          <meshStandardMaterial color={color} roughness={0.35} metalness={0.15} />
        </mesh>

        {/* Female Stylized Hair Bun */}
        {isFemale ? (
          <>
            <mesh position={[0, 0.08, -0.11]} castShadow>
              <sphereGeometry args={[0.075, 16, 16]} />
              <meshStandardMaterial color="#2d221e" roughness={0.7} />
            </mesh>
            <mesh position={[0, 0.04, 0.02]} rotation={[-0.2, 0, 0]}>
              <sphereGeometry args={[0.13, 20, 20, 0, Math.PI * 2, 0, Math.PI * 0.45]} />
              <meshStandardMaterial color="#2d221e" roughness={0.7} />
            </mesh>
          </>
        ) : (
          /* Male Short Stylized Hair */
          <mesh position={[0, 0.04, 0]} rotation={[-0.1, 0, 0]}>
            <sphereGeometry args={[0.142, 20, 20, 0, Math.PI * 2, 0, Math.PI * 0.45]} />
            <meshStandardMaterial color="#1f2937" roughness={0.8} />
          </mesh>
        )}

        {/* Chin / Jaw */}
        <mesh position={[0, -0.06, 0.04]} rotation={[0.4, 0, 0]} castShadow>
          <coneGeometry args={[isFemale ? 0.065 : 0.085, 0.11, 16]} />
          <meshStandardMaterial color={color} roughness={0.35} metalness={0.15} />
        </mesh>
      </group>

      {/* Neck */}
      <mesh position={[0, 0.8, 0]} castShadow>
        <cylinderGeometry args={[isFemale ? 0.048 : 0.06, isFemale ? 0.058 : 0.07, 0.12, 24]} />
        <meshStandardMaterial color={color} roughness={0.35} metalness={0.15} />
      </mesh>

      {/* ================= TORSO ================= */}
      {/* Upper Chest */}
      <mesh position={[0, 0.58, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[chestUpper, waistRadius + 0.02, 0.32, 24]} />
        <meshStandardMaterial color={color} roughness={0.35} metalness={0.15} />
      </mesh>

      {/* Female Bust Contours */}
      {isFemale && (
        <group position={[0, 0.58, 0.1]}>
          <mesh position={[-0.08, 0, 0]} rotation={[0.2, 0.1, 0]} castShadow>
            <sphereGeometry args={[0.075, 16, 16]} />
            <meshStandardMaterial color={color} roughness={0.35} metalness={0.15} />
          </mesh>
          <mesh position={[0.08, 0, 0]} rotation={[0.2, -0.1, 0]} castShadow>
            <sphereGeometry args={[0.075, 16, 16]} />
            <meshStandardMaterial color={color} roughness={0.35} metalness={0.15} />
          </mesh>
        </group>
      )}

      {/* Narrow Waist */}
      <mesh position={[0, 0.35, 0]} castShadow>
        <cylinderGeometry args={[waistRadius + 0.02, waistRadius, 0.2, 24]} />
        <meshStandardMaterial color={color} roughness={0.35} metalness={0.15} />
      </mesh>

      {/* Pelvis / Hips (Feminine Curves or Masculine Straight) */}
      <mesh position={[0, 0.18, 0]} castShadow>
        <cylinderGeometry args={[waistRadius, hipRadius, 0.18, 24]} />
        <meshStandardMaterial color={color} roughness={0.35} metalness={0.15} />
      </mesh>

      {/* ================= ARMS & HANDS ================= */}
      {/* Left Arm */}
      <group>
        <mesh position={[-shoulderWidth, 0.68, 0]} castShadow>
          <sphereGeometry args={[isFemale ? 0.052 : 0.065, 16, 16]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.3} metalness={0.3} />
        </mesh>
        <mesh position={[-shoulderWidth - 0.02, 0.52, 0]} rotation={[0, 0, 0.1]} castShadow>
          <cylinderGeometry args={[armRadius, armRadius * 0.9, 0.26, 16]} />
          <meshStandardMaterial color={color} roughness={0.35} metalness={0.15} />
        </mesh>
        <mesh position={[-shoulderWidth - 0.045, 0.38, 0]} castShadow>
          <sphereGeometry args={[armRadius * 0.9, 16, 16]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.3} metalness={0.3} />
        </mesh>
        <mesh position={[-shoulderWidth - 0.045, 0.24, 0.03]} rotation={[-0.1, 0, 0.05]} castShadow>
          <cylinderGeometry args={[armRadius * 0.85, armRadius * 0.75, 0.24, 16]} />
          <meshStandardMaterial color={color} roughness={0.35} metalness={0.15} />
        </mesh>
        <mesh position={[-shoulderWidth - 0.045, 0.08, 0.05]} castShadow>
          <boxGeometry args={[0.035, 0.08, 0.05]} />
          <meshStandardMaterial color={color} roughness={0.35} metalness={0.15} />
        </mesh>
      </group>

      {/* Right Arm */}
      <group>
        <mesh position={[shoulderWidth, 0.68, 0]} castShadow>
          <sphereGeometry args={[isFemale ? 0.052 : 0.065, 16, 16]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.3} metalness={0.3} />
        </mesh>
        <mesh position={[shoulderWidth + 0.02, 0.52, 0]} rotation={[0, 0, -0.1]} castShadow>
          <cylinderGeometry args={[armRadius, armRadius * 0.9, 0.26, 16]} />
          <meshStandardMaterial color={color} roughness={0.35} metalness={0.15} />
        </mesh>
        <mesh position={[shoulderWidth + 0.045, 0.38, 0]} castShadow>
          <sphereGeometry args={[armRadius * 0.9, 16, 16]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.3} metalness={0.3} />
        </mesh>
        <mesh position={[shoulderWidth + 0.045, 0.24, 0.03]} rotation={[-0.1, 0, -0.05]} castShadow>
          <cylinderGeometry args={[armRadius * 0.85, armRadius * 0.75, 0.24, 16]} />
          <meshStandardMaterial color={color} roughness={0.35} metalness={0.15} />
        </mesh>
        <mesh position={[shoulderWidth + 0.045, 0.08, 0.05]} castShadow>
          <boxGeometry args={[0.035, 0.08, 0.05]} />
          <meshStandardMaterial color={color} roughness={0.35} metalness={0.15} />
        </mesh>
      </group>

      {/* ================= LEGS & FEET ================= */}
      {/* Left Leg */}
      <group>
        <mesh position={[-0.11, 0.08, 0]} castShadow>
          <sphereGeometry args={[isFemale ? 0.055 : 0.065, 16, 16]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.3} metalness={0.3} />
        </mesh>
        <mesh position={[-0.11, -0.16, 0]} castShadow>
          <cylinderGeometry args={[legRadius, legRadius * 0.8, 0.42, 20]} />
          <meshStandardMaterial color={color} roughness={0.35} metalness={0.15} />
        </mesh>
        <mesh position={[-0.11, -0.38, 0]} castShadow>
          <sphereGeometry args={[legRadius * 0.75, 16, 16]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.3} metalness={0.3} />
        </mesh>
        <mesh position={[-0.11, -0.58, 0]} castShadow>
          <cylinderGeometry args={[legRadius * 0.75, legRadius * 0.6, 0.38, 20]} />
          <meshStandardMaterial color={color} roughness={0.35} metalness={0.15} />
        </mesh>
        <mesh position={[-0.11, -0.79, 0.05]} castShadow>
          <boxGeometry args={[isFemale ? 0.075 : 0.085, 0.05, 0.19]} />
          <meshStandardMaterial color={color} roughness={0.35} metalness={0.15} />
        </mesh>
      </group>

      {/* Right Leg */}
      <group>
        <mesh position={[0.11, 0.08, 0]} castShadow>
          <sphereGeometry args={[isFemale ? 0.055 : 0.065, 16, 16]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.3} metalness={0.3} />
        </mesh>
        <mesh position={[0.11, -0.16, 0]} castShadow>
          <cylinderGeometry args={[legRadius, legRadius * 0.8, 0.42, 20]} />
          <meshStandardMaterial color={color} roughness={0.35} metalness={0.15} />
        </mesh>
        <mesh position={[0.11, -0.38, 0]} castShadow>
          <sphereGeometry args={[legRadius * 0.75, 16, 16]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.3} metalness={0.3} />
        </mesh>
        <mesh position={[0.11, -0.58, 0]} castShadow>
          <cylinderGeometry args={[legRadius * 0.75, legRadius * 0.6, 0.38, 20]} />
          <meshStandardMaterial color={color} roughness={0.35} metalness={0.15} />
        </mesh>
        <mesh position={[0.11, -0.79, 0.05]} castShadow>
          <boxGeometry args={[isFemale ? 0.075 : 0.085, 0.05, 0.19]} />
          <meshStandardMaterial color={color} roughness={0.35} metalness={0.15} />
        </mesh>
      </group>
    </group>
  );
};
