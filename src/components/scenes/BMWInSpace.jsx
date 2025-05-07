import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, useGLTF, Float, Environment } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

// Load your custom BMW M4 G82 model
function BMWModel() {
  const gltf = useGLTF('/assets/models/bmw_m4_g82/scene.gltf'); // Replace with your model path
  const modelRef = useRef();

  // Slow rotation animation
  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.1; // Rotate slowly
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
      <primitive
        ref={modelRef}
        object={gltf.scene}
        scale={[1500, 1500, 1500]} // Adjust scale as needed
        position={[0, -0.5, 0]}
      />
    </Float>
  );
}

// Space Environment
function SpaceScene() {
  return (
    <>
      <Stars radius={80} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Environment preset="night" /> {/* Adds a dark space-like ambient */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#0066ff" />
      <BMWModel />
    </>
  );
}

export function BMWInSpace() {
  return (
    <>
    <OrbitControls />
      <SpaceScene />
    </>
    
     
  );
}