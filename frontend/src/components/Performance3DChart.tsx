
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, Text } from "@react-three/drei";
// import { useState } from "react";

// type PerformancePoint = {
//   attempt: number;
//   score: number;
// };

// type Props = {
//   data: PerformancePoint[];
// };

// function ScoreBar({
//   attempt,
//   score,
//   index,
//   total,
// }: PerformancePoint & { index: number; total: number }) {
//   const [hovered, setHovered] = useState(false);

//   const height = Math.max(score, 0.1);
//   const x = index * 1.5 - ((total - 1) * 1.5) / 2;

//   return (
//     <group position={[x, 0, 0]}>
//       <mesh
//         position={[0, height / 2, 0]}
//         onPointerOver={(event) => {
//           event.stopPropagation();
//           setHovered(true);
//         }}
//         onPointerOut={() => setHovered(false)}
//       >
//         <boxGeometry args={[0.8, height, 0.8]} />
//         <meshStandardMaterial
//           color={hovered ? "#22d3ee" : "#818cf8"}
//           metalness={0.4}
//           roughness={0.3}
//         />
//       </mesh>

//       <Text position={[0, height + 0.5, 0]} fontSize={0.3} color="white">
//         {score}/10
//       </Text>

//       <Text position={[0, -0.5, 0]} fontSize={0.25} color="#94a3b8">
//         A{attempt}
//       </Text>
//     </group>
//   );
// }

// export default function Performance3DChart({ data }: Props) {
//   // Keep the 3D view readable when history becomes large.
//   const visibleData = data.slice(-10);

//   return (
//     <div className="h-80 w-full">
//       <Canvas
//         camera={{
//           position: [9, 9, 14],
//           fov: 50,
//         }}
//       >
//         <ambientLight intensity={0.7} />
//         <directionalLight position={[5, 10, 5]} intensity={2} />

//         <gridHelper args={[20, 20, "#334155", "#1e293b"]} />

//         {visibleData.map((item, index) => (
//           <ScoreBar
//             key={item.attempt}
//             {...item}
//             index={index}
//             total={visibleData.length}
//           />
//         ))}

//         <OrbitControls
//           enablePan={false}
//           minDistance={8}
//           maxDistance={30}
//         />
//       </Canvas>
//     </div>
//   );
// }


import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Billboard, Sparkles } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";

type PerformancePoint = {
  attempt: number;
  score: number;
};

type Props = {
  data: PerformancePoint[];
};

// Low score = red/orange, mid = green, high = cyan
const getScoreColor = (score: number) => {
  const t = THREE.MathUtils.clamp(score / 10, 0, 1);
  return new THREE.Color().setHSL(0.02 + t * 0.5, 0.85, 0.55);
};

function ScoreBar({
  attempt,
  score,
  index,
  total,
  onHoverChange,
}: PerformancePoint & {
  index: number;
  total: number;
  onHoverChange: (v: boolean) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);
  const labelRef = useRef<THREE.Group>(null);
  const current = useRef(0.01);

  const targetHeight = Math.max(score, 0.1);
  const x = index * 1.5 - ((total - 1) * 1.5) / 2;
  const color = getScoreColor(score);

  useFrame((state, delta) => {
    // staggered grow-in animation
    if (state.clock.elapsedTime < index * 0.08) return;

    current.current = THREE.MathUtils.damp(current.current, targetHeight, 4, delta);
    const h = current.current;

    if (meshRef.current) {
      const s = THREE.MathUtils.damp(
        meshRef.current.scale.x,
        hovered ? 1.15 : 1,
        8,
        delta
      );
      meshRef.current.scale.set(s, h, s);
      meshRef.current.position.y = h / 2;
    }
    if (labelRef.current) {
      labelRef.current.position.y = h + (hovered ? 0.9 : 0.65);
    }
  });

  return (
    <group position={[x, 0, 0]}>
      <mesh
        ref={meshRef}
        scale={[1, 0.01, 1]}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          onHoverChange(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          onHoverChange(false);
          document.body.style.cursor = "auto";
        }}
      >
        <cylinderGeometry args={[0.4, 0.4, 1, 40]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 0.9 : 0.25}
          metalness={0.5}
          roughness={0.25}
        />
      </mesh>

      {/* Score label, always faces camera */}
      <group ref={labelRef}>
        <Billboard>
          <Text
            fontSize={hovered ? 0.42 : 0.32}
            color="white"
            outlineWidth={0.02}
            outlineColor="#0b1020"
            anchorY="middle"
          >
            {score}/10
          </Text>
        </Billboard>
      </group>

      {/* Attempt label on the floor */}
      <Text
        position={[0, 0.01, 0.9]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.28}
        color={hovered ? "#ffffff" : "#94a3b8"}
      >
        A{attempt}
      </Text>

      {/* Glow ring under bar */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.45, 0.6, 40]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={hovered ? 0.9 : 0.4}
        />
      </mesh>
    </group>
  );
}

export default function Performance3DChart({ data }: Props) {
  // Keep the 3D view readable when history becomes large.
  const visibleData = data.slice(-10);
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="h-80 w-full overflow-hidden rounded-2xl border border-slate-700/60 bg-gradient-to-b from-slate-900 to-slate-950 shadow-xl shadow-indigo-500/10">
      <Canvas camera={{ position: [9, 8, 13], fov: 50 }} dpr={[1, 2]}>
        <color attach="background" args={["#0b1020"]} />
        <fog attach="fog" args={["#0b1020", 18, 40]} />

        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1.8} />
        <pointLight position={[-8, 6, -4]} intensity={40} color="#818cf8" />
        <pointLight position={[8, 4, 6]} intensity={30} color="#22d3ee" />

        {/* Floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
          <circleGeometry args={[14, 64]} />
          <meshStandardMaterial color="#0f172a" metalness={0.6} roughness={0.4} />
        </mesh>
        <gridHelper args={[20, 20, "#334155", "#1e293b"]} />

        {/* Floating particles */}
        <Sparkles
          count={60}
          scale={[16, 8, 10]}
          size={2}
          speed={0.3}
          color="#818cf8"
        />

        {visibleData.map((item, index) => (
          <ScoreBar
            key={item.attempt}
            {...item}
            index={index}
            total={visibleData.length}
            onHoverChange={setIsHovering}
          />
        ))}

        <OrbitControls
          enablePan={false}
          minDistance={8}
          maxDistance={30}
          maxPolarAngle={Math.PI / 2.05}
          autoRotate={!isHovering}
          autoRotateSpeed={0.6}
          enableDamping
        />
      </Canvas>
    </div>
  );
}