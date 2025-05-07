import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sky } from '@react-three/drei'
import * as THREE from 'three'

function FloatingIsland({ position, size, color }) {
  const island = useRef()
  
  useFrame(({ clock }) => {
    if (island.current) {
      // Gentle floating animation
      island.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.3 + position[1]
    }
  })

  return (
    <group ref={island} position={position}>
      <mesh>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>
      <Waterfall position={[0, -size, 0]} />
    </group>
  )
}

function Waterfall({ position }) {
  const particles = useRef()
  const count = 200
  const positions = new Float32Array(count * 3)
  
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 2
    positions[i * 3 + 1] = -Math.random() * 5
    positions[i * 3 + 2] = (Math.random() - 0.5) * 2
  }

  useFrame(() => {
    if (particles.current) {
      particles.current.rotation.x += 0.001
    }
  })

  return (
    <points ref={particles} position={position}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        attach="material"
        size={0.1}
        sizeAttenuation={true}
        color="#aaddff"
        transparent
        opacity={0.8}
      />
    </points>
  )
}

export function FloatingIslandsScene() {
  return (
    <>
      <color attach="background" args={['#a2d2ff']} />
      <Sky sunPosition={[5, 1, 8]} />
      
      <FloatingIsland position={[0, 5, 0]} size={3} color="#588157" />
      <FloatingIsland position={[-10, 8, -5]} size={2} color="#3a5a40" />
      <FloatingIsland position={[8, 6, 3]} size={2.5} color="#344e41" />
      
      <OrbitControls 
        minDistance={5}
        maxDistance={30}
      />
      
      <directionalLight
        position={[10, 10, 10]}
        intensity={1}
        castShadow
      />
      <ambientLight intensity={0.4} />
    </>
  )
}