import { useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Stars, Point, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

function NebulaParticles({ count = 5000 }) {
  const particles = useRef()
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  
  // Create random particle positions and colors
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 200
    positions[i * 3 + 1] = (Math.random() - 0.5) * 200
    positions[i * 3 + 2] = (Math.random() - 0.5) * 200
    
    // Create a colorful nebula effect
    colors[i * 3] = 0.1 + Math.random() * 0.4 // Reds
    colors[i * 3 + 1] = 0.1 + Math.random() * 0.3 // Greens
    colors[i * 3 + 2] = 0.5 + Math.random() * 0.5 // Blues
  }

  useFrame(({ clock }) => {
    if (particles.current) {
      particles.current.rotation.x = clock.getElapsedTime() * 0.05
      particles.current.rotation.y = clock.getElapsedTime() * 0.03
    }
  })

  return (
    <points ref={particles}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        attach="material"
        size={0.5}
        sizeAttenuation={true}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function PulsingStar() {
  const star = useRef()
  const [pulseDirection] = useState(Math.random() > 0.5 ? 1 : -1)
  
  useFrame(({ clock }) => {
    if (star.current) {
      const pulse = Math.sin(clock.getElapsedTime() * 2) * 0.2 + 1
      star.current.scale.set(pulse, pulse, pulse)
    }
  })

  return (
    <mesh ref={star} position={[0, 0, 0]}>
      <sphereGeometry args={[3, 32, 32]} />
      <meshStandardMaterial
        color="#ffffff"
        emissive="#ffaa77"
        emissiveIntensity={2}
      />
    </mesh>
  )
}

function NebulaCore() {
  const core = useRef()
  
  useFrame(() => {
    if (core.current) {
      core.current.rotation.y += 0.001
    }
  })

  return (
    <mesh ref={core}>
      <sphereGeometry args={[10, 64, 64]} />
      <meshStandardMaterial
        color="#441188"
        emissive="#aa44ff"
        emissiveIntensity={0.5}
        transparent
        opacity={0.3}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

export function GalacticNebula() {
  return (
    <>
      <color attach="background" args={['#000011']} />
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#ffaa77" />
      
      <NebulaParticles count={10000} />
      <NebulaCore />
      <PulsingStar />
      
      {/* Distant stars */}
      <Stars
        radius={500}
        depth={100}
        count={5000}
        factor={7}
        saturation={0}
        fade
        speed={0.5}
      />
      
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        zoomSpeed={0.5}
        autoRotate
        autoRotateSpeed={0.3}
      />
    </>
  )
}