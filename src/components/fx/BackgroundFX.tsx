// components/fx/BackgroundFX.tsx (도형 크기·간격 조정)
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Suspense, useRef } from "react";
import type { Mesh } from "three";

type Vec3 = [number, number, number];

type FloatingBlobProps = {
  color?: string;
  position?: Vec3;
  size?: number; // 반지름
  wobble?: number; // 상하 진폭
  speed?: number; // 흔들림 속도
};

function FloatingBlob({
  color = "#00E5FF",
  position = [0, 0, 0],
  size = 1.2,
  wobble = 0.25,
  speed = 0.6,
}: FloatingBlobProps) {
  const ref = useRef<Mesh | null>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!ref.current) return;
    const [, baseY] = position;
    ref.current.position.set(
      position[0],
      baseY + Math.sin(t * speed) * wobble,
      position[2]
    );
    ref.current.rotation.y += 0.002;
  });

  return (
    <mesh ref={ref} position={position}>
      <icosahedronGeometry args={[size, 1]} />
      <meshPhysicalMaterial
        transmission={0.9}
        roughness={0.1}
        thickness={1.2}
        color={color}
        opacity={0.25}
        transparent
      />
    </mesh>
  );
}

export default function BackgroundFX() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
        <Suspense fallback={null}>
          <Environment preset="city" />
          {/* 그룹을 화면 뒤로 살짝 밀고, X는 좌우 벌리고, Y는 상하 크게 벌림 */}
          <group position={[0, 0, -2]}>
            {/* 상단 오른쪽 멀리, 큰 사이즈 */}
            <FloatingBlob
              color="#9FDC2F" // 진한 라임
              position={[2.4, 1.6, -2]}
              size={1.6}
              wobble={0.28}
              speed={0.55}
            />
            {/* 하단 왼쪽 멀리, 조금 작은 사이즈 */}
            <FloatingBlob
              color="#00C2A8" // 티얼
              position={[-2.6, -1.8, -1.6]}
              size={1.1}
              wobble={0.22}
              speed={0.7}
            />
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
}
