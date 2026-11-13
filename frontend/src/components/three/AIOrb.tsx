// import { Canvas, useFrame } from "@react-three/fiber";
// import { Float, OrbitControls } from "@react-three/drei";
// import { useRef } from "react";
// import type { Mesh } from "three";

// function AnimatedSphere() {
//   const sphereRef = useRef<Mesh>(null);

//   useFrame((state, delta) => {
//     if (!sphereRef.current) return;

//     sphereRef.current.rotation.y += delta * 0.3;
//     sphereRef.current.rotation.x += delta * 0.1;

//     const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.03;
//     sphereRef.current.scale.setScalar(scale);
//   });

//   return (
//     <Float speed={2} rotationIntensity={0.4} floatIntensity={0.5}>
//       <mesh ref={sphereRef}>
//         <icosahedronGeometry args={[1.5, 5]} />

//         <meshStandardMaterial
//           color="#6366f1"
//           metalness={0.7}
//           roughness={0.2}
//           wireframe
//           emissive="#7c3aed"
//           emissiveIntensity={0.5}
//         />
//       </mesh>
//     </Float>
//   );
// }

// export default function AIOrb() {
//   return (
//     <div className="h-[350px] w-full">
//       <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
//         <ambientLight intensity={0.5} />

//         <pointLight position={[5, 5, 5]} intensity={20} color="#8b5cf6" />

//         <pointLight position={[-5, -5, 3]} intensity={10} color="#06b6d4" />

//         <AnimatedSphere />

//         <OrbitControls
//           enableZoom={false}
//           enablePan={false}
//           autoRotate
//           autoRotateSpeed={0.5}
//         />
//       </Canvas>
//     </div>
//   );
// }

// import { useRef } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import {
//   Float,
//   OrbitControls,
//   Sparkles,
// } from "@react-three/drei";
// import type { Group, Mesh } from "three";

// function GlowingCore() {
//   const coreRef = useRef<Mesh>(null);

//   useFrame((state) => {
//     if (!coreRef.current) return;

//     const time = state.clock.elapsedTime;

//     const scale = 1 + Math.sin(time * 2) * 0.05;

//     coreRef.current.scale.setScalar(scale);
//     coreRef.current.rotation.y = time * 0.15;
//   });

//   return (
//     <group>
//       {/* Inner Solid Core */}
//       <mesh ref={coreRef}>
//         <icosahedronGeometry args={[0.9, 4]} />
//         <meshStandardMaterial
//           color="#818cf8"
//           emissive="#7c3aed"
//           emissiveIntensity={1.5}
//           metalness={0.5}
//           roughness={0.25}
//         />
//       </mesh>

//       {/* Outer Wireframe Shell */}
//       <mesh scale={1.45}>
//         <icosahedronGeometry args={[0.9, 2]} />
//         <meshBasicMaterial
//           color="#a78bfa"
//           wireframe
//           transparent
//           opacity={0.25}
//           depthWrite={false}
//         />
//       </mesh>

//       {/* Inner Light */}
//       <pointLight
//         color="#8b5cf6"
//         intensity={12}
//         distance={5}
//       />
//     </group>
//   );
// }

// function OrbitalRings() {
//   const ringsRef = useRef<Group>(null);

//   useFrame((_, delta) => {
//     if (!ringsRef.current) return;

//     ringsRef.current.rotation.y += delta * 0.15;
//     ringsRef.current.rotation.z += delta * 0.05;
//   });

//   return (
//     <group ref={ringsRef}>
//       <mesh rotation={[Math.PI / 3, 0, 0]}>
//         <torusGeometry args={[1.7, 0.012, 8, 128]} />
//         <meshBasicMaterial color="#818cf8" />
//       </mesh>

//       <mesh rotation={[0, Math.PI / 3, Math.PI / 4]}>
//         <torusGeometry args={[1.95, 0.009, 8, 128]} />
//         <meshBasicMaterial color="#22d3ee" />
//       </mesh>

//       <mesh rotation={[Math.PI / 2, 0, Math.PI / 5]}>
//         <torusGeometry args={[1.5, 0.01, 8, 128]} />
//         <meshBasicMaterial color="#c084fc" />
//       </mesh>
//     </group>
//   );
// }

// function AIOrbScene() {
//   return (
//     <Float
//       speed={1.5}
//       rotationIntensity={0.2}
//       floatIntensity={0.3}
//     >
//       <GlowingCore />

//       <OrbitalRings />

//       {/* Floating Particles */}
//       <Sparkles
//         count={80}
//         scale={5}
//         size={2}
//         speed={0.35}
//         color="#a78bfa"
//         opacity={0.7}
//       />
//     </Float>
//   );
// }

// export default function AIOrb() {
//   return (
//     <div className="h-full w-full">
//       <Canvas
//         camera={{
//           position: [0, 0, 6],
//           fov: 45,
//         }}
//         dpr={[1, 1.5]}
//         gl={{ antialias: true, alpha: true }}
//       >
//         <ambientLight intensity={0.5} />

//         <pointLight
//           position={[4, 4, 4]}
//           intensity={15}
//           color="#6366f1"
//         />

//         <pointLight
//           position={[-4, -3, 3]}
//           intensity={8}
//           color="#06b6d4"
//         />

//         <AIOrbScene />

//         <OrbitControls
//           enableZoom={false}
//           enablePan={false}
//           enableDamping
//           dampingFactor={0.05}
//           autoRotate
//           autoRotateSpeed={0.5}
//         />
//       </Canvas>
//     </div>
//   );
// }

// import { useRef } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { Float, OrbitControls, Sparkles, Stars } from "@react-three/drei";
// // import { EffectComposer, Bloom } from "@react-three/postprocessing";
// import { AdditiveBlending, DoubleSide } from "three";
// import type { Group, Mesh } from "three";

// // Central glowing AI Sun
// function AISun() {
//   const sunRef = useRef<Mesh>(null);

//   useFrame((state, delta) => {
//     if (!sunRef.current) return;

//     sunRef.current.rotation.y += delta * 0.25;

//     const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.035;

//     sunRef.current.scale.setScalar(pulse);
//   });

//   return (
//     <group>
//       <mesh ref={sunRef}>
//         <icosahedronGeometry args={[0.75, 4]} />
//         <meshStandardMaterial
//           color="#FFB300"
//           emissive="#FF6A00"
//           emissiveIntensity={3}
//           metalness={0.1}
//           roughness={0.35}
//         />
//       </mesh>

//       {/* Glowing outer shell */}
//       <mesh scale={1.15}>
//         <sphereGeometry args={[0.75, 32, 32]} />
//         <meshBasicMaterial
//           color="#FF9500"
//           transparent
//           opacity={0.12}
//           side={DoubleSide}
//           depthWrite={false}
//         />
//       </mesh>

//       {/* Geometric shell */}
//       <mesh scale={1.35}>
//         <icosahedronGeometry args={[0.75, 2]} />
//         <meshBasicMaterial
//           color="#c4b5fd"
//           wireframe
//           transparent
//           opacity={0.3}
//           blending={AdditiveBlending}
//           depthWrite={false}
//         />
//       </mesh>

//       <pointLight color="#FFB347" intensity={18} distance={7} />
//     </group>
//   );
// }

// type PlanetProps = {
//   radius: number;
//   size: number;
//   speed: number;
//   color: string;
//   tilt: number;
//   initialAngle: number;
// };

// // Revolving planet with its orbit
// function Planet({
//   radius,
//   size,
//   speed,
//   color,
//   tilt,
//   initialAngle,
// }: PlanetProps) {
//   const orbitRef = useRef<Group>(null);
//   const planetRef = useRef<Mesh>(null);

//   useFrame((_, delta) => {
//     if (orbitRef.current) {
//       orbitRef.current.rotation.y += delta * speed;
//     }

//     if (planetRef.current) {
//       planetRef.current.rotation.y += delta * 0.8;
//     }
//   });

//   return (
//     <group rotation={[tilt, 0, 0]}>
//       {/* Orbit path */}
//       <mesh rotation={[Math.PI / 2, 0, 0]}>
//         <torusGeometry args={[radius, 0.008, 6, 160]} />
//         <meshBasicMaterial
//           color={color}
//           transparent
//           opacity={0.35}
//           depthWrite={false}
//         />
//       </mesh>

//       {/* Planet revolving around Sun */}
//       <group ref={orbitRef}>
//         <mesh
//           ref={planetRef}
//           position={[
//             Math.cos(initialAngle) * radius,
//             0,
//             Math.sin(initialAngle) * radius,
//           ]}
//         >
//           <sphereGeometry args={[size, 24, 24]} />
//           <meshStandardMaterial
//             color={color}
//             emissive={color}
//             emissiveIntensity={1.5}
//             roughness={0.3}
//             metalness={0.4}
//           />
//         </mesh>
//       </group>
//     </group>
//   );
// }

// function SolarSystem() {
//   return (
//     <Float speed={1} rotationIntensity={0.08} floatIntensity={0.15}>
//       <AISun />

//       <Planet
//         radius={1.15}
//         size={0.12}
//         speed={0.8}
//         color="#22d3ee"
//         tilt={0.25}
//         initialAngle={0}
//       />

//       <Planet
//         radius={1.55}
//         size={0.17}
//         speed={0.55}
//         color="#818cf8"
//         tilt={-0.2}
//         initialAngle={1.4}
//       />

//       <Planet
//         radius={1.95}
//         size={0.14}
//         speed={0.35}
//         color="#f472b6"
//         tilt={0.35}
//         initialAngle={2.5}
//       />

//       <Planet
//         radius={2.35}
//         size={0.21}
//         speed={0.22}
//         color="#67e8f9"
//         tilt={-0.35}
//         initialAngle={4}
//       />

//       {/* Floating energy particles */}
//       <Sparkles
//         count={100}
//         scale={6}
//         size={1.5}
//         speed={0.3}
//         color="#a78bfa"
//         opacity={0.65}
//       />
//     </Float>
//   );
// }

// export default function AIOrb() {
//   return (
//     <div className="h-full w-full">
//       <Canvas
//         camera={{
//           position: [0, 3.2, 7.5],
//           fov: 40,
//         }}
//         dpr={[1, 1.5]}
//         gl={{
//           alpha: true,
//           antialias: false,
//           powerPreference: "high-performance",
//         }}
//         style={{
//           background: "transparent",
//         }}
//       >
//         <ambientLight intensity={0.6} />

//         <pointLight position={[4, 5, 4]} intensity={12} color="#818cf8" />

//         <Stars
//           radius={30}
//           depth={20}
//           count={250}
//           factor={2}
//           saturation={0}
//           fade
//           speed={0.25}
//         />

//         <SolarSystem />

//         <OrbitControls
//           enableZoom={false}
//           enablePan={false}
//           enableDamping
//           autoRotate
//           autoRotateSpeed={0.35}
//         />
//         {/* 
//    <EffectComposer
//   multisampling={0}
//   autoClear={false}
// >
//   <Bloom
//     intensity={0.65}
//     luminanceThreshold={0.8}
//     luminanceSmoothing={0.3}
//     mipmapBlur
//   />
// </EffectComposer> */}
//       </Canvas>
//     </div>
//   );
// }


// import { useRef, useState } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import {
//   Float,
//   OrbitControls,
//   Sparkles,
//   Stars,
//   Trail,
//   Html,
// } from "@react-three/drei";
// import { AdditiveBlending, DoubleSide } from "three";
// import type { Group, Mesh } from "three";

// // 1. Central Glowing AI Core with Gyroscope Rings
// function AISun() {
//   const sunRef = useRef<Mesh>(null);
//   const ring1Ref = useRef<Mesh>(null);
//   const ring2Ref = useRef<Mesh>(null);
//   const wireframeRef = useRef<Mesh>(null);

//   useFrame((state, delta) => {
//     const t = state.clock.elapsedTime;

//     if (sunRef.current) {
//       sunRef.current.rotation.y += delta * 0.25;
//       const pulse = 1 + Math.sin(t * 2.5) * 0.04;
//       sunRef.current.scale.setScalar(pulse);
//     }

//     if (wireframeRef.current) {
//       wireframeRef.current.rotation.y -= delta * 0.15;
//       wireframeRef.current.rotation.x += delta * 0.1;
//     }

//     // Gyroscope holographic rings
//     if (ring1Ref.current) {
//       ring1Ref.current.rotation.x = Math.sin(t * 0.7) * 0.5 + 0.8;
//       ring1Ref.current.rotation.y += delta * 0.6;
//     }
//     if (ring2Ref.current) {
//       ring2Ref.current.rotation.y = Math.cos(t * 0.5) * 0.5 - 0.6;
//       ring2Ref.current.rotation.z -= delta * 0.5;
//     }
//   });

//   return (
//     <group>
//       {/* Inner Energy Core */}
//       <mesh ref={sunRef}>
//         <icosahedronGeometry args={[0.68, 4]} />
//         <meshStandardMaterial
//           color="#FFB300"
//           emissive="#FF5500"
//           emissiveIntensity={3.2}
//           metalness={0.2}
//           roughness={0.2}
//         />
//       </mesh>

//       {/* Soft Plasma Aura */}
//       <mesh scale={1.15}>
//         <sphereGeometry args={[0.72, 32, 32]} />
//         <meshBasicMaterial
//           color="#FF9500"
//           transparent
//           opacity={0.14}
//           side={DoubleSide}
//           depthWrite={false}
//           blending={AdditiveBlending}
//         />
//       </mesh>

//       {/* Neural Mesh Wireframe */}
//       <mesh ref={wireframeRef} scale={1.32}>
//         <icosahedronGeometry args={[0.72, 2]} />
//         <meshBasicMaterial
//           color="#c4b5fd"
//           wireframe
//           transparent
//           opacity={0.35}
//           blending={AdditiveBlending}
//           depthWrite={false}
//         />
//       </mesh>

//       {/* Holographic Gyro Ring 1 */}
//       <mesh ref={ring1Ref}>
//         <torusGeometry args={[1.02, 0.008, 16, 100]} />
//         <meshBasicMaterial
//           color="#38bdf8"
//           transparent
//           opacity={0.5}
//           blending={AdditiveBlending}
//         />
//       </mesh>

//       {/* Holographic Gyro Ring 2 */}
//       <mesh ref={ring2Ref}>
//         <torusGeometry args={[1.1, 0.006, 16, 100]} />
//         <meshBasicMaterial
//           color="#f472b6"
//           transparent
//           opacity={0.45}
//           blending={AdditiveBlending}
//         />
//       </mesh>

//       <pointLight color="#FFB347" intensity={20} distance={8} />
//     </group>
//   );
// }

// type PlanetProps = {
//   name: string;
//   radius: number;
//   size: number;
//   speed: number;
//   color: string;
//   tilt: number;
//   initialAngle: number;
//   hasRing?: boolean;
//   hasMoon?: boolean;
// };

// // 2. Interactive Revolving Planet with Trail, Ring & Moon
// function Planet({
//   name,
//   radius,
//   size,
//   speed,
//   color,
//   tilt,
//   initialAngle,
//   hasRing = false,
//   hasMoon = false,
// }: PlanetProps) {
//   const orbitRef = useRef<Group>(null);
//   const planetGroupRef = useRef<Group>(null);
//   const planetRef = useRef<Mesh>(null);
//   const moonOrbitRef = useRef<Group>(null);

//   const [hovered, setHovered] = useState(false);

//   useFrame((_, delta) => {
//     // Slow down orbit smoothly when hovered
//     const currentSpeed = hovered ? speed * 0.2 : speed;

//     if (orbitRef.current) {
//       orbitRef.current.rotation.y += delta * currentSpeed;
//     }

//     if (planetRef.current) {
//       planetRef.current.rotation.y += delta * 1.2;
//       const targetScale = hovered ? 1.35 : 1;
//       planetRef.current.scale.lerp(
//         { x: targetScale, y: targetScale, z: targetScale } as any,
//         0.1
//       );
//     }

//     if (moonOrbitRef.current) {
//       moonOrbitRef.current.rotation.y += delta * 2.5;
//     }
//   });

//   return (
//     <group rotation={[tilt, 0, 0]}>
//       {/* Subtle Orbit Track */}
//       <mesh rotation={[Math.PI / 2, 0, 0]}>
//         <torusGeometry args={[radius, hovered ? 0.012 : 0.006, 8, 160]} />
//         <meshBasicMaterial
//           color={color}
//           transparent
//           opacity={hovered ? 0.65 : 0.25}
//           depthWrite={false}
//           blending={AdditiveBlending}
//         />
//       </mesh>

//       {/* Revolving Group */}
//       <group ref={orbitRef}>
//         <group
//           ref={planetGroupRef}
//           position={[
//             Math.cos(initialAngle) * radius,
//             0,
//             Math.sin(initialAngle) * radius,
//           ]}
//         >
//           {/* Glowing Comet Trail */}
//           <Trail
//             width={size * 2.2}
//             length={6}
//             color={color}
//             attenuation={(t) => t * t}
//           >
//             <mesh
//               ref={planetRef}
//               onPointerOver={(e) => {
//                 e.stopPropagation();
//                 setHovered(true);
//                 document.body.style.cursor = "pointer";
//               }}
//               onPointerOut={() => {
//                 setHovered(false);
//                 document.body.style.cursor = "auto";
//               }}
//             >
//               <sphereGeometry args={[size, 28, 28]} />
//               <meshStandardMaterial
//                 color={color}
//                 emissive={color}
//                 emissiveIntensity={hovered ? 2.5 : 1.5}
//                 roughness={0.25}
//                 metalness={0.5}
//               />
//             </mesh>
//           </Trail>

//           {/* Optional Saturn-like Ring */}
//           {hasRing && (
//             <mesh rotation={[Math.PI / 2.4, 0.2, 0]}>
//               <ringGeometry args={[size * 1.4, size * 2.1, 32]} />
//               <meshBasicMaterial
//                 color={color}
//                 side={DoubleSide}
//                 transparent
//                 opacity={0.55}
//                 blending={AdditiveBlending}
//               />
//             </mesh>
//           )}

//           {/* Optional Orbiting Moon */}
//           {hasMoon && (
//             <group ref={moonOrbitRef}>
//               <mesh position={[size * 1.9, 0, 0]}>
//                 <sphereGeometry args={[size * 0.28, 16, 16]} />
//                 <meshStandardMaterial
//                   color="#ffffff"
//                   emissive="#e2e8f0"
//                   emissiveIntensity={1.2}
//                 />
//               </mesh>
//             </group>
//           )}

//           {/* Sci-Fi Tooltip on Hover */}
//           {hovered && (
//             <Html distanceFactor={8} position={[0, size + 0.25, 0]} center>
//               <div
//                 style={{
//                   background: "rgba(15, 23, 42, 0.85)",
//                   border: `1px solid ${color}`,
//                   color: "#fff",
//                   padding: "4px 10px",
//                   borderRadius: "999px",
//                   fontSize: "11px",
//                   fontFamily: "monospace",
//                   letterSpacing: "0.08em",
//                   whiteSpace: "nowrap",
//                   boxShadow: `0 0 12px ${color}`,
//                   pointerEvents: "none",
//                 }}
//               >
//                 {name}
//               </div>
//             </Html>
//           )}
//         </group>
//       </group>
//     </group>
//   );
// }

// function SolarSystem() {
//   return (
//     <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.18}>
//       <AISun />

//       <Planet
//         name="NLP ENGINE"
//         radius={1.25}
//         size={0.11}
//         speed={0.85}
//         color="#22d3ee"
//         tilt={0.25}
//         initialAngle={0}
//       />

//       <Planet
//         name="VISION CORE"
//         radius={1.65}
//         size={0.16}
//         speed={0.55}
//         color="#818cf8"
//         tilt={-0.2}
//         initialAngle={1.4}
//         hasMoon
//       />

//       <Planet
//         name="NEURAL MEMORY"
//         radius={2.1}
//         size={0.14}
//         speed={0.38}
//         color="#f472b6"
//         tilt={0.32}
//         initialAngle={2.5}
//         hasRing
//       />

//       <Planet
//         name="REASONING NODE"
//         radius={2.55}
//         size={0.19}
//         speed={0.24}
//         color="#34d399"
//         tilt={-0.3}
//         initialAngle={4}
//       />

//       {/* Multi-layered Cosmic Dust */}
//       <Sparkles
//         count={120}
//         scale={6.5}
//         size={1.8}
//         speed={0.35}
//         color="#a78bfa"
//         opacity={0.7}
//       />
//       <Sparkles
//         count={60}
//         scale={4}
//         size={1.2}
//         speed={0.5}
//         color="#38bdf8"
//         opacity={0.6}
//       />
//     </Float>
//   );
// }

// export default function AIOrb() {
//   return (
//     <div className="h-full w-full">
//       <Canvas
//         camera={{
//           position: [1, 6.2, 7.8],
//           fov: 40,
//         }}
//         dpr={[1, 2]}
//         gl={{
//           alpha: true,
//           antialias: true,
//           powerPreference: "high-performance",
//         }}
//         style={{
//           background: "transparent",
//         }}
//       >
//         <ambientLight intensity={0.6} />
//         <pointLight position={[4, 5, 4]} intensity={12} color="#818cf8" />

//         <Stars
//           radius={30}
//           depth={20}
//           count={350}
//           factor={2.5}
//           saturation={0.5}
//           fade
//           speed={0.3}
//         />

//         <SolarSystem />

//         <OrbitControls
//           enableZoom={false}
//           enablePan={false}
//           enableDamping
//           autoRotate
//           autoRotateSpeed={0.3}
//         />
//       </Canvas>
//     </div>
//   );
// }



// import { useEffect, useMemo, useRef } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import {
//   Float,
//   MeshDistortMaterial,
//   OrbitControls,
//   Sparkles,
//   Stars,
//   Trail,
// } from "@react-three/drei";
// // import { EffectComposer, Bloom } from "@react-three/postprocessing";
// import { AdditiveBlending, DoubleSide, MathUtils, Object3D } from "three";
// import type {
//   Group,
//   InstancedMesh,
//   Mesh,
//   MeshBasicMaterial,
//   ShaderMaterial,
// } from "three";

// /* ---------------- Corona shader (fresnel glow) ---------------- */
// const coronaVertex = /* glsl */ `
//   varying vec3 vNormal;
//   varying vec3 vView;
//   void main() {
//     vNormal = normalize(normalMatrix * normal);
//     vec4 mv = modelViewMatrix * vec4(position, 1.0);
//     vView = normalize(-mv.xyz);
//     gl_Position = projectionMatrix * mv;
//   }
// `;

// const coronaFragment = /* glsl */ `
//   uniform vec3 uColor;
//   uniform float uTime;
//   varying vec3 vNormal;
//   varying vec3 vView;
//   void main() {
//     float f = pow(1.0 - abs(dot(vNormal, vView)), 2.5);
//     float flicker = 0.85 + 0.15 * sin(uTime * 3.0);
//     gl_FragColor = vec4(uColor, f * flicker);
//   }
// `;

// /* ---------------- Central AI Sun ---------------- */
// function AISun() {
//   const sunRef = useRef<Mesh>(null);
//   const wireRef = useRef<Mesh>(null);
//   const coronaRef = useRef<ShaderMaterial>(null);
//   const burst = useRef(0);

//   const uniforms = useMemo(
//     () => ({
//       uColor: { value: { r: 1, g: 0.55, b: 0.1 } },
//       uTime: { value: 0 },
//     }),
//     []
//   );

//   useFrame((state, delta) => {
//     burst.current = MathUtils.damp(burst.current, 0, 3, delta);

//     if (sunRef.current) {
//       sunRef.current.rotation.y += delta * 0.25;
//       const pulse =
//         1 + Math.sin(state.clock.elapsedTime * 2) * 0.035 + burst.current * 0.25;
//       sunRef.current.scale.setScalar(pulse);
//     }

//     if (wireRef.current) {
//       wireRef.current.rotation.y -= delta * 0.15;
//       wireRef.current.rotation.x += delta * 0.05;
//     }

//     if (coronaRef.current) {
//       coronaRef.current.uniforms.uTime.value = state.clock.elapsedTime;
//     }
//   });

//   return (
//     <group>
//       {/* Core (lava-like distortion) */}
//       <mesh
//         ref={sunRef}
//         onClick={() => (burst.current = 1)}
//         onPointerOver={() => (document.body.style.cursor = "pointer")}
//         onPointerOut={() => (document.body.style.cursor = "auto")}
//       >
//         <icosahedronGeometry args={[0.75, 5]} />
//         <MeshDistortMaterial
//           color="#FFB300"
//           emissive="#FF6A00"
//           emissiveIntensity={2.5}
//           distort={0.28}
//           speed={2}
//           roughness={0.4}
//           metalness={0.1}
//         />
//       </mesh>

//       {/* Fresnel corona */}
//       <mesh scale={1.55}>
//         <sphereGeometry args={[0.75, 48, 48]} />
//         <shaderMaterial
//           ref={coronaRef}
//           args={[
//             {
//               uniforms,
//               vertexShader: coronaVertex,
//               fragmentShader: coronaFragment,
//               transparent: true,
//               blending: AdditiveBlending,
//               depthWrite: false,
//             },
//           ]}
//         />
//       </mesh>

//       {/* Geometric wireframe shell */}
//       <mesh ref={wireRef} scale={1.35}>
//         <icosahedronGeometry args={[0.75, 2]} />
//         <meshBasicMaterial
//           color="#c4b5fd"
//           wireframe
//           transparent
//           opacity={0.3}
//           blending={AdditiveBlending}
//           depthWrite={false}
//         />
//       </mesh>

//       <pointLight color="#FFB347" intensity={18} distance={7} />
//     </group>
//   );
// }

// /* ---------------- Expanding energy rings ---------------- */
// function PulseRings() {
//   const refs = useRef<(Mesh | null)[]>([]);

//   useFrame(({ clock }) => {
//     refs.current.forEach((m, i) => {
//       if (!m) return;
//       const t = (clock.elapsedTime * 0.35 + i / 3) % 1;
//       m.scale.setScalar(1 + t * 4.5);
//       (m.material as MeshBasicMaterial).opacity = (1 - t) * 0.35;
//     });
//   });

//   return (
//     <>
//       {[0, 1, 2].map((i) => (
//         <mesh
//           key={i}
//           ref={(el) => {
//             refs.current[i] = el;
//           }}
//           rotation={[-Math.PI / 2, 0, 0]}
//         >
//           <ringGeometry args={[0.95, 1, 64]} />
//           <meshBasicMaterial
//             color="#c4b5fd"
//             transparent
//             depthWrite={false}
//             side={DoubleSide}
//             blending={AdditiveBlending}
//           />
//         </mesh>
//       ))}
//     </>
//   );
// }

// /* ---------------- Planet (trail + optional ring / moon) ---------------- */
// type PlanetProps = {
//   radius: number;
//   size: number;
//   speed: number;
//   color: string;
//   tilt: number;
//   initialAngle: number;
//   hasRing?: boolean;
//   hasMoon?: boolean;
// };

// function Planet({
//   radius,
//   size,
//   speed,
//   color,
//   tilt,
//   initialAngle,
//   hasRing = false,
//   hasMoon = false,
// }: PlanetProps) {
//   const orbitRef = useRef<Group>(null);
//   const planetRef = useRef<Mesh>(null);
//   const moonRef = useRef<Group>(null);

//   useFrame((_, delta) => {
//     if (orbitRef.current) orbitRef.current.rotation.y += delta * speed;
//     if (planetRef.current) planetRef.current.rotation.y += delta * 0.8;
//     if (moonRef.current) moonRef.current.rotation.y += delta * 2.5;
//   });

//   return (
//     <group rotation={[tilt, 0, 0]}>
//       {/* Orbit path */}
//       <mesh rotation={[Math.PI / 2, 0, 0]}>
//         <torusGeometry args={[radius, 0.008, 6, 160]} />
//         <meshBasicMaterial
//           color={color}
//           transparent
//           opacity={0.35}
//           depthWrite={false}
//         />
//       </mesh>

//       <group ref={orbitRef} rotation={[0, initialAngle, 0]}>
//         <group position={[radius, 0, 0]}>
//           <Trail
//             width={size * 6}
//             length={6}
//             color={color}
//             attenuation={(t) => t * t}
//           >
//             <mesh ref={planetRef}>
//               <sphereGeometry args={[size, 24, 24]} />
//               <meshStandardMaterial
//                 color={color}
//                 emissive={color}
//                 emissiveIntensity={1.5}
//                 roughness={0.3}
//                 metalness={0.4}
//                 toneMapped={false}
//               />
//             </mesh>
//           </Trail>

//           {hasRing && (
//             <mesh rotation={[Math.PI / 2.4, 0, 0]}>
//               <ringGeometry args={[size * 1.5, size * 2.2, 64]} />
//               <meshBasicMaterial
//                 color={color}
//                 transparent
//                 opacity={0.5}
//                 side={DoubleSide}
//                 depthWrite={false}
//               />
//             </mesh>
//           )}

//           {hasMoon && (
//             <group ref={moonRef}>
//               <mesh position={[size * 2.4, 0, 0]}>
//                 <sphereGeometry args={[size * 0.3, 16, 16]} />
//                 <meshStandardMaterial
//                   color="#e5e7eb"
//                   emissive="#e5e7eb"
//                   emissiveIntensity={0.6}
//                 />
//               </mesh>
//             </group>
//           )}
//         </group>
//       </group>
//     </group>
//   );
// }

// /* ---------------- Asteroid belt ---------------- */
// function AsteroidBelt({ count = 260 }: { count?: number }) {
//   const meshRef = useRef<InstancedMesh>(null);
//   const groupRef = useRef<Group>(null);

//   useEffect(() => {
//     if (!meshRef.current) return;
//     const dummy = new Object3D();

//     for (let i = 0; i < count; i++) {
//       const angle = Math.random() * Math.PI * 2;
//       const r = 2.75 + Math.random() * 0.45;
//       dummy.position.set(
//         Math.cos(angle) * r,
//         (Math.random() - 0.5) * 0.15,
//         Math.sin(angle) * r
//       );
//       dummy.rotation.set(
//         Math.random() * Math.PI,
//         Math.random() * Math.PI,
//         Math.random() * Math.PI
//       );
//       dummy.scale.setScalar(0.015 + Math.random() * 0.03);
//       dummy.updateMatrix();
//       meshRef.current.setMatrixAt(i, dummy.matrix);
//     }
//     meshRef.current.instanceMatrix.needsUpdate = true;
//   }, [count]);

//   useFrame((_, delta) => {
//     if (groupRef.current) groupRef.current.rotation.y += delta * 0.06;
//   });

//   return (
//     <group ref={groupRef}>
//       <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
//         <dodecahedronGeometry args={[1, 0]} />
//         <meshStandardMaterial
//           color="#94a3b8"
//           roughness={0.8}
//           emissive="#475569"
//           emissiveIntensity={0.4}
//         />
//       </instancedMesh>
//     </group>
//   );
// }

// /* ---------------- Comet ---------------- */
// function Comet() {
//   const ref = useRef<Mesh>(null);

//   useFrame(({ clock }) => {
//     if (!ref.current) return;
//     const t = clock.elapsedTime * 0.5;
//     ref.current.position.set(
//       Math.cos(t) * 4.2,
//       Math.sin(t * 1.3) * 0.9,
//       Math.sin(t) * 2.6
//     );
//   });

//   return (
//     <Trail
//       width={1.2}
//       length={10}
//       color="#fde68a"
//       attenuation={(t) => t * t}
//     >
//       <mesh ref={ref}>
//         <sphereGeometry args={[0.05, 12, 12]} />
//         <meshBasicMaterial color="#fff7ed" toneMapped={false} />
//       </mesh>
//     </Trail>
//   );
// }

// /* ---------------- Solar system ---------------- */
// function SolarSystem() {
//   const rig = useRef<Group>(null);

//   // Mouse parallax
//   useFrame((state) => {
//     if (!rig.current) return;
//     rig.current.rotation.y = MathUtils.lerp(
//       rig.current.rotation.y,
//       state.pointer.x * 0.35,
//       0.04
//     );
//     rig.current.rotation.x = MathUtils.lerp(
//       rig.current.rotation.x,
//       -state.pointer.y * 0.2,
//       0.04
//     );
//   });

//   return (
//     <group ref={rig}>
//       <Float speed={1} rotationIntensity={0.08} floatIntensity={0.15}>
//         <AISun />
//         <PulseRings />

//         <Planet
//           radius={1.15}
//           size={0.12}
//           speed={0.8}
//           color="#22d3ee"
//           tilt={0.25}
//           initialAngle={0}
//         />
//         <Planet
//           radius={1.55}
//           size={0.17}
//           speed={0.55}
//           color="#818cf8"
//           tilt={-0.2}
//           initialAngle={1.4}
//           hasRing
//         />
//         <Planet
//           radius={1.95}
//           size={0.14}
//           speed={0.35}
//           color="#f472b6"
//           tilt={0.35}
//           initialAngle={2.5}
//           hasMoon
//         />
//         <Planet
//           radius={2.35}
//           size={0.21}
//           speed={0.22}
//           color="#67e8f9"
//           tilt={-0.35}
//           initialAngle={4}
//         />

//         <AsteroidBelt />
//         <Comet />

//         {/* Floating energy particles (2 layers) */}
//         <Sparkles
//           count={100}
//           scale={6}
//           size={1.5}
//           speed={0.3}
//           color="#a78bfa"
//           opacity={0.65}
//         />
//         <Sparkles
//           count={50}
//           scale={5}
//           size={2.5}
//           speed={0.5}
//           color="#22d3ee"
//           opacity={0.5}
//         />
//       </Float>
//     </group>
//   );
// }

// export default function AIOrb() {
//   return (
//     <div className="h-full w-full">
//       <Canvas
//         camera={{ position: [1, 3.2, 7.5], fov: 50 }}
//         dpr={[1, 1.5]}
//         gl={{
//           alpha: true,
//           antialias: false,
//           powerPreference: "high-performance",
//         }}
//         style={{ background: "transparent" }}
//       >
//         <ambientLight intensity={0.6} />
//         <pointLight position={[4, 5, 4]} intensity={12} color="#818cf8" />

//         <Stars
//           radius={30}
//           depth={20}
//           count={250}
//           factor={2}
//           saturation={0}
//           fade
//           speed={0.25}
//         />

//         <SolarSystem />

//         <OrbitControls
//           enableZoom={false}
//           enablePan={false}
//           enableDamping
//           autoRotate
//           autoRotateSpeed={0.35}
//         />

//         {/*
//         <EffectComposer multisampling={0} autoClear={false}>
//           <Bloom
//             intensity={0.65}
//             luminanceThreshold={0.8}
//             luminanceSmoothing={0.3}
//             mipmapBlur
//           />
//         </EffectComposer>
//         */}
//       </Canvas>
//     </div>
//   );
// }

// import { useEffect, useMemo, useRef, useState } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import {
//   Float,
//   Html,
//   Line,
//   MeshDistortMaterial,
//   OrbitControls,
//   Sparkles,
//   Stars,
//   Trail,
// } from "@react-three/drei";
// // import { EffectComposer, Bloom } from "@react-three/postprocessing";
// import { AdditiveBlending, Color, DoubleSide, MathUtils, Object3D } from "three";
// import type {
//   Group,
//   InstancedMesh,
//   Mesh,
//   MeshBasicMaterial,
//   PointLight,
//   ShaderMaterial,
// } from "three";

// /* ---------------- Modes / themes ---------------- */
// type Mode = "idle" | "thinking" | "speaking";

// const MODES: Mode[] = ["idle", "thinking", "speaking"];

// const THEMES = {
//   idle: {
//     core: "#FFB300",
//     emissive: "#FF6A00",
//     corona: "#ff8c1a",
//     distort: 0.25,
//     orbit: 1,
//     rings: 0.35,
//     beam: 0.5,
//   },
//   thinking: {
//     core: "#a78bfa",
//     emissive: "#6d28d9",
//     corona: "#8b5cf6",
//     distort: 0.55,
//     orbit: 2.5,
//     rings: 0.9,
//     beam: 1.6,
//   },
//   speaking: {
//     core: "#f9a8d4",
//     emissive: "#db2777",
//     corona: "#ec4899",
//     distort: 0.4,
//     orbit: 1.4,
//     rings: 0.6,
//     beam: 1,
//   },
// };

// type Theme = (typeof THEMES)[Mode];

// /* ---------------- Corona shader (fresnel glow) ---------------- */
// const coronaVertex = /* glsl */ `
//   varying vec3 vNormal;
//   varying vec3 vView;
//   void main() {
//     vNormal = normalize(normalMatrix * normal);
//     vec4 mv = modelViewMatrix * vec4(position, 1.0);
//     vView = normalize(-mv.xyz);
//     gl_Position = projectionMatrix * mv;
//   }
// `;

// const coronaFragment = /* glsl */ `
//   uniform vec3 uColor;
//   uniform float uTime;
//   varying vec3 vNormal;
//   varying vec3 vView;
//   void main() {
//     float f = pow(1.0 - abs(dot(vNormal, vView)), 2.5);
//     float flicker = 0.85 + 0.15 * sin(uTime * 3.0);
//     gl_FragColor = vec4(uColor, f * flicker);
//   }
// `;

// /* ---------------- Central AI Sun ---------------- */
// function AISun({ theme, onToggle }: { theme: Theme; onToggle: () => void }) {
//   const sunRef = useRef<Mesh>(null);
//   const wireRef = useRef<Mesh>(null);
//   const coronaRef = useRef<ShaderMaterial>(null);
//   const burst = useRef(0);

//   const uniforms = useMemo(
//     () => ({ uColor: { value: new Color("#ff8c1a") }, uTime: { value: 0 } }),
//     []
//   );
//   const target = useMemo(() => new Color(theme.corona), [theme.corona]);

//   useFrame((state, delta) => {
//     burst.current = MathUtils.damp(burst.current, 0, 3, delta);

//     if (sunRef.current) {
//       sunRef.current.rotation.y += delta * 0.25 * theme.orbit;
//       const pulse =
//         1 + Math.sin(state.clock.elapsedTime * 2) * 0.035 + burst.current * 0.25;
//       sunRef.current.scale.setScalar(pulse);
//     }

//     if (wireRef.current) {
//       wireRef.current.rotation.y -= delta * 0.15 * theme.orbit;
//       wireRef.current.rotation.x += delta * 0.05;
//     }

//     if (coronaRef.current) {
//       coronaRef.current.uniforms.uTime.value = state.clock.elapsedTime;
//       coronaRef.current.uniforms.uColor.value.lerp(target, delta * 3);
//     }
//   });

//   return (
//     <group>
//       <mesh
//         ref={sunRef}
//         onClick={() => {
//           burst.current = 1;
//           onToggle();
//         }}
//         onPointerOver={() => (document.body.style.cursor = "pointer")}
//         onPointerOut={() => (document.body.style.cursor = "auto")}
//       >
//         <icosahedronGeometry args={[0.75, 5]} />
//         <MeshDistortMaterial
//           color={theme.core}
//           emissive={theme.emissive}
//           emissiveIntensity={2.5}
//           distort={theme.distort}
//           speed={2 * theme.orbit}
//           roughness={0.4}
//           metalness={0.1}
//         />
//       </mesh>

//       <mesh scale={1.55}>
//         <sphereGeometry args={[0.75, 48, 48]} />
//         <shaderMaterial
//           ref={coronaRef}
//           args={[
//             {
//               uniforms,
//               vertexShader: coronaVertex,
//               fragmentShader: coronaFragment,
//               transparent: true,
//               blending: AdditiveBlending,
//               depthWrite: false,
//             },
//           ]}
//         />
//       </mesh>

//       <mesh ref={wireRef} scale={1.35}>
//         <icosahedronGeometry args={[0.75, 2]} />
//         <meshBasicMaterial
//           color="#c4b5fd"
//           wireframe
//           transparent
//           opacity={0.3}
//           blending={AdditiveBlending}
//           depthWrite={false}
//         />
//       </mesh>

//       <pointLight color={theme.corona} intensity={18} distance={7} />
//     </group>
//   );
// }

// /* ---------------- Expanding energy rings ---------------- */
// function PulseRings({ rate, color }: { rate: number; color: string }) {
//   const refs = useRef<(Mesh | null)[]>([]);
//   const phase = useRef(0);

//   useFrame((_, delta) => {
//     phase.current += delta * rate;
//     refs.current.forEach((m, i) => {
//       if (!m) return;
//       const t = (phase.current + i / 3) % 1;
//       m.scale.setScalar(1 + t * 4.5);
//       (m.material as MeshBasicMaterial).opacity = (1 - t) * 0.35;
//     });
//   });

//   return (
//     <>
//       {[0, 1, 2].map((i) => (
//         <mesh
//           key={i}
//           ref={(el) => {
//             refs.current[i] = el;
//           }}
//           rotation={[-Math.PI / 2, 0, 0]}
//         >
//           <ringGeometry args={[0.95, 1, 64]} />
//           <meshBasicMaterial
//             color={color}
//             transparent
//             depthWrite={false}
//             side={DoubleSide}
//             blending={AdditiveBlending}
//           />
//         </mesh>
//       ))}
//     </>
//   );
// }

// /* ---------------- Planet (hover label, beam, trail, ring/moon) ---------------- */
// type PlanetProps = {
//   label: string;
//   desc: string;
//   radius: number;
//   size: number;
//   speed: number;
//   color: string;
//   tilt: number;
//   initialAngle: number;
//   speedMul: number;
//   beamSpeed: number;
//   hasRing?: boolean;
//   hasMoon?: boolean;
// };

// function Planet({
//   label,
//   desc,
//   radius,
//   size,
//   speed,
//   color,
//   tilt,
//   initialAngle,
//   speedMul,
//   beamSpeed,
//   hasRing = false,
//   hasMoon = false,
// }: PlanetProps) {
//   const orbitRef = useRef<Group>(null);
//   const planetRef = useRef<Mesh>(null);
//   const moonRef = useRef<Group>(null);
//   const pulseRef = useRef<Mesh>(null);
//   const beamPhase = useRef(initialAngle);
//   const [hovered, setHovered] = useState(false);

//   useFrame((_, delta) => {
//     const k = hovered ? 0.1 : 1;

//     if (orbitRef.current) orbitRef.current.rotation.y += delta * speed * speedMul * k;

//     if (planetRef.current) {
//       planetRef.current.rotation.y += delta * 0.8;
//       const s = MathUtils.lerp(planetRef.current.scale.x, hovered ? 1.5 : 1, 0.15);
//       planetRef.current.scale.setScalar(s);
//     }

//     if (moonRef.current) moonRef.current.rotation.y += delta * 2.5;

//     // Data pulse travelling planet -> sun
//     beamPhase.current += delta * beamSpeed * 0.6;
//     if (pulseRef.current) {
//       pulseRef.current.position.x = -radius * (beamPhase.current % 1);
//     }
//   });

//   return (
//     <group rotation={[tilt, 0, 0]}>
//       {/* Orbit path */}
//       <mesh rotation={[Math.PI / 2, 0, 0]}>
//         <torusGeometry args={[radius, 0.008, 6, 160]} />
//         <meshBasicMaterial color={color} transparent opacity={0.35} depthWrite={false} />
//       </mesh>

//       <group ref={orbitRef} rotation={[0, initialAngle, 0]}>
//         <group position={[radius, 0, 0]}>
//           {/* Beam to sun */}
//           <Line
//             points={[
//               [0, 0, 0],
//               [-radius, 0, 0],
//             ]}
//             color={color}
//             transparent
//             opacity={hovered ? 0.7 : 0.2}
//             lineWidth={1}
//           />
//           <mesh ref={pulseRef}>
//             <sphereGeometry args={[0.025, 8, 8]} />
//             <meshBasicMaterial color={color} toneMapped={false} />
//           </mesh>

//           <Trail width={size * 6} length={6} color={color} attenuation={(t) => t * t}>
//             <mesh ref={planetRef}>
//               <sphereGeometry args={[size, 24, 24]} />
//               <meshStandardMaterial
//                 color={color}
//                 emissive={color}
//                 emissiveIntensity={1.5}
//                 roughness={0.3}
//                 metalness={0.4}
//                 toneMapped={false}
//               />
//             </mesh>
//           </Trail>

//           {/* Invisible bigger hit-area for easy hover */}
//           <mesh
//             onPointerOver={(e) => {
//               e.stopPropagation();
//               setHovered(true);
//               document.body.style.cursor = "pointer";
//             }}
//             onPointerOut={() => {
//               setHovered(false);
//               document.body.style.cursor = "auto";
//             }}
//           >
//             <sphereGeometry args={[size * 2.2, 12, 12]} />
//             <meshBasicMaterial transparent opacity={0} depthWrite={false} />
//           </mesh>

//           {hasRing && (
//             <mesh rotation={[Math.PI / 2.4, 0, 0]}>
//               <ringGeometry args={[size * 1.5, size * 2.2, 64]} />
//               <meshBasicMaterial
//                 color={color}
//                 transparent
//                 opacity={0.5}
//                 side={DoubleSide}
//                 depthWrite={false}
//               />
//             </mesh>
//           )}

//           {hasMoon && (
//             <group ref={moonRef}>
//               <mesh position={[size * 2.4, 0, 0]}>
//                 <sphereGeometry args={[size * 0.3, 16, 16]} />
//                 <meshStandardMaterial
//                   color="#e5e7eb"
//                   emissive="#e5e7eb"
//                   emissiveIntensity={0.6}
//                 />
//               </mesh>
//             </group>
//           )}

//           {hovered && (
//             <Html
//               center
//               distanceFactor={8}
//               position={[0, size * 3, 0]}
//               style={{ pointerEvents: "none" }}
//             >
//               <div
//                 style={{
//                   padding: "6px 10px",
//                   borderRadius: 8,
//                   background: "rgba(15,23,42,0.85)",
//                   border: `1px solid ${color}`,
//                   color: "#fff",
//                   whiteSpace: "nowrap",
//                   fontSize: 12,
//                   textAlign: "center",
//                 }}
//               >
//                 <div style={{ fontWeight: 600, color }}>{label}</div>
//                 <div style={{ opacity: 0.75, fontSize: 10 }}>{desc}</div>
//               </div>
//             </Html>
//           )}
//         </group>
//       </group>
//     </group>
//   );
// }

// /* ---------------- Asteroid belt ---------------- */
// function AsteroidBelt({ count = 260 }: { count?: number }) {
//   const meshRef = useRef<InstancedMesh>(null);
//   const groupRef = useRef<Group>(null);

//   useEffect(() => {
//     if (!meshRef.current) return;
//     const dummy = new Object3D();

//     for (let i = 0; i < count; i++) {
//       const angle = Math.random() * Math.PI * 2;
//       const r = 2.75 + Math.random() * 0.45;
//       dummy.position.set(
//         Math.cos(angle) * r,
//         (Math.random() - 0.5) * 0.15,
//         Math.sin(angle) * r
//       );
//       dummy.rotation.set(
//         Math.random() * Math.PI,
//         Math.random() * Math.PI,
//         Math.random() * Math.PI
//       );
//       dummy.scale.setScalar(0.015 + Math.random() * 0.03);
//       dummy.updateMatrix();
//       meshRef.current.setMatrixAt(i, dummy.matrix);
//     }
//     meshRef.current.instanceMatrix.needsUpdate = true;
//   }, [count]);

//   useFrame((_, delta) => {
//     if (groupRef.current) groupRef.current.rotation.y += delta * 0.06;
//   });

//   return (
//     <group ref={groupRef}>
//       <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
//         <dodecahedronGeometry args={[1, 0]} />
//         <meshStandardMaterial
//           color="#94a3b8"
//           roughness={0.8}
//           emissive="#475569"
//           emissiveIntensity={0.4}
//         />
//       </instancedMesh>
//     </group>
//   );
// }

// /* ---------------- Comet ---------------- */
// function Comet() {
//   const ref = useRef<Mesh>(null);

//   useFrame(({ clock }) => {
//     if (!ref.current) return;
//     const t = clock.elapsedTime * 0.5;
//     ref.current.position.set(
//       Math.cos(t) * 4.2,
//       Math.sin(t * 1.3) * 0.9,
//       Math.sin(t) * 2.6
//     );
//   });

//   return (
//     <Trail width={1.2} length={10} color="#fde68a" attenuation={(t) => t * t}>
//       <mesh ref={ref}>
//         <sphereGeometry args={[0.05, 12, 12]} />
//         <meshBasicMaterial color="#fff7ed" toneMapped={false} />
//       </mesh>
//     </Trail>
//   );
// }

// /* ---------------- Solar system ---------------- */
// function SolarSystem({ mode, onToggle }: { mode: Mode; onToggle: () => void }) {
//   const rig = useRef<Group>(null);
//   const lightRef = useRef<PointLight>(null);
//   const theme = THEMES[mode];

//   useFrame((state) => {
//     // Mouse parallax
//     if (rig.current) {
//       rig.current.rotation.y = MathUtils.lerp(
//         rig.current.rotation.y,
//         state.pointer.x * 0.35,
//         0.04
//       );
//       rig.current.rotation.x = MathUtils.lerp(
//         rig.current.rotation.x,
//         -state.pointer.y * 0.2,
//         0.04
//       );
//     }
//     // Cursor-following light
//     if (lightRef.current) {
//       lightRef.current.position.set(state.pointer.x * 4, state.pointer.y * 3, 3);
//     }
//   });

//   const common = { speedMul: theme.orbit, beamSpeed: theme.beam };

//   return (
//     <>
//       <pointLight ref={lightRef} intensity={10} color={theme.corona} />

//       <group ref={rig}>
//         <Float speed={1} rotationIntensity={0.08} floatIntensity={0.15}>
//           <AISun theme={theme} onToggle={onToggle} />
//           <PulseRings rate={theme.rings} color={theme.corona} />

//           <Planet
//             label="Vision"
//             desc="Image understanding"
//             radius={1.15}
//             size={0.12}
//             speed={0.8}
//             color="#22d3ee"
//             tilt={0.25}
//             initialAngle={0}
//             {...common}
//           />
//           <Planet
//             label="Language"
//             desc="Text generation"
//             radius={1.55}
//             size={0.17}
//             speed={0.55}
//             color="#818cf8"
//             tilt={-0.2}
//             initialAngle={1.4}
//             hasRing
//             {...common}
//           />
//           <Planet
//             label="Memory"
//             desc="Context & recall"
//             radius={1.95}
//             size={0.14}
//             speed={0.35}
//             color="#f472b6"
//             tilt={0.35}
//             initialAngle={2.5}
//             hasMoon
//             {...common}
//           />
//           <Planet
//             label="Reasoning"
//             desc="Logic & planning"
//             radius={2.35}
//             size={0.21}
//             speed={0.22}
//             color="#67e8f9"
//             tilt={-0.35}
//             initialAngle={4}
//             {...common}
//           />

//           <AsteroidBelt />
//           <Comet />

//           <Sparkles count={100} scale={6} size={1.5} speed={0.3} color="#a78bfa" opacity={0.65} />
//           <Sparkles
//             count={50}
//             scale={5}
//             size={2.5}
//             speed={0.5 * theme.orbit}
//             color={theme.corona}
//             opacity={0.5}
//           />
//         </Float>
//       </group>
//     </>
//   );
// }

// /* ---------------- Main ---------------- */
// export default function AIOrb({ mode }: { mode?: Mode }) {
//   const [internal, setInternal] = useState<Mode>("idle");
//   const current = mode ?? internal;

//   const handleToggle = () => {
//     if (mode) return; // controlled from outside
//     setInternal((m) => MODES[(MODES.indexOf(m) + 1) % MODES.length]);
//   };

//   return (
//     <div className="relative h-full w-full">
//       <Canvas
//         camera={{ position: [0, 3.2, 7.5], fov: 40 }}
//         dpr={[1, 1.5]}
//         gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
//         style={{ background: "transparent" }}
//       >
//         <ambientLight intensity={0.6} />
//         <pointLight position={[4, 5, 4]} intensity={12} color="#818cf8" />

//         <Stars radius={30} depth={20} count={250} factor={2} saturation={0} fade speed={0.25} />

//         <SolarSystem mode={current} onToggle={handleToggle} />

//         <OrbitControls
//           enableZoom={false}
//           enablePan={false}
//           enableDamping
//           autoRotate
//           autoRotateSpeed={0.35}
//         />

//         {/*
//         <EffectComposer multisampling={0} autoClear={false}>
//           <Bloom intensity={0.65} luminanceThreshold={0.8} luminanceSmoothing={0.3} mipmapBlur />
//         </EffectComposer>
//         */}
//       </Canvas>

//       <div className="pointer-events-none absolute bottom-3 w-full text-center text-xs uppercase tracking-widest text-white/60">
//         {current}
//       </div>
//     </div>
//   );
// }



import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { ThreeEvent } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  OrbitControls,
  Sparkles,
  Stars,
} from "@react-three/drei";
import { AdditiveBlending, Color, MathUtils, Vector3 } from "three";
import type { Group, Mesh, Points } from "three";

/* ---------------- Modes / themes ---------------- */
type Mode = "idle" | "thinking" | "speaking";
const MODES: Mode[] = ["idle", "thinking", "speaking"];

const THEMES = {
  idle: {
    a: new Color("#22d3ee"),
    b: new Color("#818cf8"),
    core: "#6366f1",
    speed: 1,
    breath: 0.02,
  },
  thinking: {
    a: new Color("#a78bfa"),
    b: new Color("#f472b6"),
    core: "#c026d3",
    speed: 2.6,
    breath: 0.035,
  },
  speaking: {
    a: new Color("#fbbf24"),
    b: new Color("#fb7185"),
    core: "#f97316",
    speed: 1.6,
    breath: 0.03,
  },
};

/* ---------------- Network data ---------------- */
const RADIUS = 1.6;
const NODE_COUNT = 420;
const NEIGHBORS = 3;
const SIGNAL_COUNT = 60;

function buildNetwork() {
  const pts = new Float32Array(NODE_COUNT * 3);
  const seeds = new Float32Array(NODE_COUNT);
  const golden = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < NODE_COUNT; i++) {
    const y = 1 - (i / (NODE_COUNT - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const th = golden * i;
    const j = 1 + (Math.random() - 0.5) * 0.1;
    pts[i * 3] = Math.cos(th) * r * RADIUS * j;
    pts[i * 3 + 1] = y * RADIUS * j;
    pts[i * 3 + 2] = Math.sin(th) * r * RADIUS * j;
    seeds[i] = Math.random();
  }

  const seen = new Set<number>();
  const edges: number[] = [];

  for (let i = 0; i < NODE_COUNT; i++) {
    const d = new Float32Array(NODE_COUNT);
    const idx: number[] = [];
    for (let j = 0; j < NODE_COUNT; j++) {
      if (j === i) {
        d[j] = Infinity;
      } else {
        const dx = pts[i * 3] - pts[j * 3];
        const dy = pts[i * 3 + 1] - pts[j * 3 + 1];
        const dz = pts[i * 3 + 2] - pts[j * 3 + 2];
        d[j] = dx * dx + dy * dy + dz * dz;
      }
      idx.push(j);
    }
    idx.sort((p, q) => d[p] - d[q]);

    for (let n = 0; n < NEIGHBORS; n++) {
      const j = idx[n];
      const key = Math.min(i, j) * NODE_COUNT + Math.max(i, j);
      if (!seen.has(key)) {
        seen.add(key);
        edges.push(i, j);
      }
    }
  }

  const edgeCount = edges.length / 2;
  // 6 floats per edge: start xyz, end xyz
  const lines = new Float32Array(edgeCount * 6);
  for (let e = 0; e < edgeCount; e++) {
    const a = edges[e * 2];
    const b = edges[e * 2 + 1];
    lines.set(pts.subarray(a * 3, a * 3 + 3), e * 6);
    lines.set(pts.subarray(b * 3, b * 3 + 3), e * 6 + 3);
  }

  return { pts, seeds, lines, edgeCount };
}

/* ---------------- Shared GLSL ---------------- */
const common = /* glsl */ `
  uniform float uTime;
  uniform vec3 uPointer;
  uniform float uRipple;
  uniform float uBreath;
  uniform float uSpeed;

  vec3 displace(vec3 p) {
    vec3 n = normalize(p);
    float breath = sin(uTime * 1.5 * uSpeed + dot(n, vec3(3.0, 2.0, 4.0))) * uBreath;
    float d = distance(n, uPointer);
    float push = exp(-d * d * 6.0) * uRipple;
    return p * (1.0 + breath + push * 0.35);
  }
`;

const pointsVertex = /* glsl */ `
  ${common}
  attribute float aSeed;
  uniform float uSize;
  varying vec3 vLocal;
  varying float vTw;
  void main() {
    vec3 p = displace(position);
    vLocal = p;
    vTw = 0.6 + 0.4 * sin(uTime * 2.0 + aSeed * 20.0);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = uSize * vTw * (6.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const pointsFragment = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying vec3 vLocal;
  varying float vTw;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float a = pow(1.0 - d * 2.0, 2.0);
    vec3 c = mix(uColorA, uColorB, smoothstep(-1.6, 1.6, vLocal.y));
    gl_FragColor = vec4(c * 1.4, a * vTw);
  }
`;

const linesVertex = /* glsl */ `
  ${common}
  varying vec3 vLocal;
  void main() {
    vec3 p = displace(position);
    vLocal = p;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const linesFragment = /* glsl */ `
  uniform float uTime;
  uniform float uSpeed;
  uniform float uOpacity;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  varying vec3 vLocal;
  void main() {
    float wave = 0.5 + 0.5 * sin(vLocal.y * 6.0 - uTime * 2.0 * uSpeed);
    vec3 c = mix(uColorA, uColorB, smoothstep(-1.6, 1.6, vLocal.y));
    gl_FragColor = vec4(c, uOpacity * (0.35 + 0.65 * wave));
  }
`;

const signalVertex = /* glsl */ `
  ${common}
  attribute vec3 aStart;
  attribute vec3 aEnd;
  attribute float aProgress;
  uniform float uSize;
  void main() {
    vec3 p = displace(mix(aStart, aEnd, aProgress));
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_PointSize = uSize * (6.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const signalFragment = /* glsl */ `
  uniform vec3 uColorA;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float a = pow(1.0 - d * 2.0, 1.5);
    gl_FragColor = vec4(mix(uColorA, vec3(1.0), 0.7) * 1.6, a);
  }
`;

/* ---------------- Neural orb ---------------- */
function NeuralOrb({ mode, onToggle }: { mode: Mode; onToggle: () => void }) {
  const groupRef = useRef<Group>(null);
  const coreRef = useRef<Mesh>(null);
  const signalRef = useRef<Points>(null);

  const hovering = useRef(false);
  const pointerTarget = useRef(new Vector3(0, 0, 1));
  const rippleTarget = useRef(0);

  const net = useMemo(buildNetwork, []);

  // Signals state
  const sig = useMemo(() => {
    const aStart = new Float32Array(SIGNAL_COUNT * 3);
    const aEnd = new Float32Array(SIGNAL_COUNT * 3);
    const aProgress = new Float32Array(SIGNAL_COUNT);
    const edge = new Uint32Array(SIGNAL_COUNT);
    const speed = new Float32Array(SIGNAL_COUNT);
    const zeros = new Float32Array(SIGNAL_COUNT * 3);

    const assign = (s: number, e: number) => {
      edge[s] = e;
      aStart.set(net.lines.subarray(e * 6, e * 6 + 3), s * 3);
      aEnd.set(net.lines.subarray(e * 6 + 3, e * 6 + 6), s * 3);
    };

    for (let s = 0; s < SIGNAL_COUNT; s++) {
      assign(s, Math.floor(Math.random() * net.edgeCount));
      aProgress[s] = Math.random();
      speed[s] = 0.4 + Math.random() * 0.8;
    }
    return { aStart, aEnd, aProgress, edge, speed, zeros, assign };
  }, [net]);

  // Shared uniforms (same inner objects used by all 3 materials)
  const shared = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new Vector3(0, 0, 1) },
      uRipple: { value: 0 },
      uBreath: { value: 0.02 },
      uSpeed: { value: 1 },
      uColorA: { value: new Color("#22d3ee") },
      uColorB: { value: new Color("#818cf8") },
    }),
    []
  );
  const pointU = useMemo(() => ({ ...shared, uSize: { value: 10 } }), [shared]);
  const lineU = useMemo(() => ({ ...shared, uOpacity: { value: 0.22 } }), [shared]);
  const signalU = useMemo(() => ({ ...shared, uSize: { value: 26 } }), [shared]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const th = THEMES[mode];

    shared.uTime.value = t;
    shared.uSpeed.value = MathUtils.damp(shared.uSpeed.value, th.speed, 3, delta);

    let breath = th.breath;
    if (mode === "speaking") {
      breath += Math.abs(Math.sin(t * 7) * Math.sin(t * 3.1)) * 0.05;
    }
    shared.uBreath.value = MathUtils.damp(shared.uBreath.value, breath, 6, delta);

    shared.uColorA.value.lerp(th.a, delta * 3);
    shared.uColorB.value.lerp(th.b, delta * 3);

    // Ripple: hover > thinking auto-orbit > none
    if (!hovering.current) {
      if (mode === "thinking") {
        pointerTarget.current
          .set(Math.cos(t * 1.2), Math.sin(t * 0.8) * 0.6, Math.sin(t * 1.2))
          .normalize();
        rippleTarget.current = 1;
      } else {
        rippleTarget.current = 0;
      }
    }
    shared.uPointer.value.lerp(pointerTarget.current, 0.1);
    shared.uRipple.value = MathUtils.damp(shared.uRipple.value, rippleTarget.current, 4, delta);

    // Rotation
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12 * shared.uSpeed.value;
      groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.15;
    }

    // Core pulse
    if (coreRef.current) {
      coreRef.current.scale.setScalar(
        0.4 * (1 + shared.uBreath.value * 3 + Math.sin(t * 2) * 0.03)
      );
    }

    // Signals
    if (signalRef.current) {
      const geo = signalRef.current.geometry;
      let changed = false;
      for (let s = 0; s < SIGNAL_COUNT; s++) {
        sig.aProgress[s] += delta * sig.speed[s] * shared.uSpeed.value;
        if (sig.aProgress[s] >= 1) {
          sig.aProgress[s] = 0;
          sig.assign(s, Math.floor(Math.random() * net.edgeCount));
          changed = true;
        }
      }
      geo.attributes.aProgress.needsUpdate = true;
      if (changed) {
        geo.attributes.aStart.needsUpdate = true;
        geo.attributes.aEnd.needsUpdate = true;
      }
    }
  });

  const handleMove = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    hovering.current = true;
    const local = e.object.worldToLocal(e.point.clone()).normalize();
    pointerTarget.current.copy(local);
    rippleTarget.current = 1;
  };

  return (
    <group ref={groupRef}>
      {/* Invisible hit-sphere for hover + click */}
      <mesh
        onPointerMove={handleMove}
        onPointerOut={() => {
          hovering.current = false;
          document.body.style.cursor = "auto";
        }}
        onPointerOver={() => (document.body.style.cursor = "pointer")}
        onClick={onToggle}
      >
        <sphereGeometry args={[RADIUS * 1.05, 24, 24]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Nodes */}
      <points frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[net.pts, 3]} />
          <bufferAttribute attach="attributes-aSeed" args={[net.seeds, 1]} />
        </bufferGeometry>
        <shaderMaterial
          args={[
            {
              uniforms: pointU,
              vertexShader: pointsVertex,
              fragmentShader: pointsFragment,
              transparent: true,
              blending: AdditiveBlending,
              depthWrite: false,
            },
          ]}
        />
      </points>

      {/* Connections */}
      <lineSegments frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[net.lines, 3]} />
        </bufferGeometry>
        <shaderMaterial
          args={[
            {
              uniforms: lineU,
              vertexShader: linesVertex,
              fragmentShader: linesFragment,
              transparent: true,
              blending: AdditiveBlending,
              depthWrite: false,
            },
          ]}
        />
      </lineSegments>

      {/* Travelling signals */}
      <points ref={signalRef} frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[sig.zeros, 3]} />
          <bufferAttribute attach="attributes-aStart" args={[sig.aStart, 3]} />
          <bufferAttribute attach="attributes-aEnd" args={[sig.aEnd, 3]} />
          <bufferAttribute attach="attributes-aProgress" args={[sig.aProgress, 1]} />
        </bufferGeometry>
        <shaderMaterial
          args={[
            {
              uniforms: signalU,
              vertexShader: signalVertex,
              fragmentShader: signalFragment,
              transparent: true,
              blending: AdditiveBlending,
              depthWrite: false,
            },
          ]}
        />
      </points>

      {/* Glowing core */}
      <mesh ref={coreRef} scale={0.4}>
        <sphereGeometry args={[1, 32, 32]} />
        <MeshDistortMaterial
          color={THEMES[mode].core}
          emissive={THEMES[mode].core}
          emissiveIntensity={2.2}
          distort={0.45}
          speed={2.5}
          roughness={0.3}
          toneMapped={false}
        />
      </mesh>
      <pointLight color={THEMES[mode].core} intensity={10} distance={6} />
    </group>
  );
}

/* ---------------- Main ---------------- */
export default function AIOrb({ mode }: { mode?: Mode }) {
  const [internal, setInternal] = useState<Mode>("idle");
  const current = mode ?? internal;

  const handleToggle = () => {
    if (mode) return; // controlled from outside
    setInternal((m) => MODES[(MODES.indexOf(m) + 1) % MODES.length]);
  };

  return (
    <div className="relative h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.4} />

        <Stars radius={30} depth={20} count={200} factor={2} saturation={0} fade speed={0.25} />

        <Float speed={1} rotationIntensity={0.05} floatIntensity={0.2}>
          <NeuralOrb mode={current} onToggle={handleToggle} />
          <Sparkles count={60} scale={5} size={2} speed={0.3} color="#a78bfa" opacity={0.5} />
        </Float>

        <OrbitControls enableZoom={false} enablePan={false} enableDamping />
      </Canvas>

      <div className="pointer-events-none absolute bottom-3 w-full text-center text-xs uppercase tracking-widest text-white/60">
        {current}
      </div>
    </div>
  );
}