import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sky, Stars } from "@react-three/drei";
import * as THREE from "three";

function Aurora() {
  const mesh = useRef();
  const count = 50;
  const ribbons = [];

  // Create ribbon-like aurora strands
  for (let i = 0; i < count; i++) {
    const width = 0.1 + Math.random() * 0.3;
    const height = 5 + Math.random() * 15;
    const x = (Math.random() - 0.5) * 100;
    const z = (Math.random() - 0.5) * 100;

    ribbons.push(
      <mesh key={i} position={[x, 0, z]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[width, height, 8, 32]} />
        <meshStandardMaterial
          color={
            new THREE.Color(
              0.1 + Math.random() * 0.3,
              0.5 + Math.random() * 0.5,
              0.3 + Math.random() * 0.4
            )
          }
          transparent
          opacity={0.7}
          side={THREE.DoubleSide}
          emissiveIntensity={0.5}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    );
  }

  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.rotation.y = clock.getElapsedTime() * 0.05;
      // Animate ribbons with wave motion
      mesh.current.children.forEach((ribbon, i) => {
        const wave = Math.sin(clock.getElapsedTime() * 0.5 + i * 0.2) * 0.5;
        ribbon.position.y = wave * 5;
      });
    }
  });

  return <group ref={mesh}>{ribbons}</group>;
}

export function AuroraScene() {
  return (
    <>
      <color attach="background" args={["#020817"]} />
      <Sky sunPosition={[0, -1, 0]} inclination={0} azimuth={0.25} />

      <Aurora />
      <Stars radius={20} depth={50} count={20000} factor={4} fade />

      <OrbitControls enablePan={false}  minPolarAngle={Math.PI / 2.2} maxPolarAngle={Math.PI / 2.2} />

      <ambientLight intensity={0.1} />
      <pointLight position={[0, -10, 0]} intensity={1} color="#00aaff" />
    </>
  );
}
