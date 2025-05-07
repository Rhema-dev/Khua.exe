import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sky } from '@react-three/drei'
import * as THREE from 'three'

function Ocean() {
  const ocean = useRef()
  const waves = useRef()
  
  useFrame(({ clock }) => {
    if (ocean.current) {
      // Animate wave surface
      ocean.current.position.y = Math.sin(clock.getElapsedTime()) * 0.2
      
      // Animate vertex positions for waves
      const positions = waves.current.geometry.attributes.position
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i)
        const z = positions.getZ(i)
        positions.setY(
          i,
          Math.sin(x * 0.5 + clock.getElapsedTime()) * 0.5 +
          Math.sin(z * 0.3 + clock.getElapsedTime() * 0.7) * 0.3
        )
      }
      positions.needsUpdate = true
    }
  })

  return (
    <group ref={ocean}>
      <mesh ref={waves} rotation={[-Math.PI/2, 0, 0]}>
        <planeGeometry args={[100, 100, 50, 50]} />
        <meshStandardMaterial 
          color="#006994"
          transparent
          opacity={0.9}
          roughness={0.1}
          metalness={0.5
        }
        />
      </mesh>
    </group>
  )
}

function Island() {
  return (
    <mesh position={[0, -2, 0]}>
      <sphereGeometry args={[5, 32, 32, 0, Math.PI * 2, 0, Math.PI/2]} />
      <meshStandardMaterial color="#3a5a40" roughness={0.7} />
    </mesh>
  )
}

export function OceanScene() {
  return (
    <>
      <color attach="background" args={['#87CEEB']} />
      <Sky sunPosition={[5, 1, 8]} />
      
      <Ocean />
      <Island />
      
      <OrbitControls 
        minDistance={10}
        maxDistance={50}
        minPolarAngle={0}
        maxPolarAngle={Math.PI/2}
      />
      
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <ambientLight intensity={0.3} />
    </>
  )
}