import { useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import * as THREE from 'three'

function AnimatedCamera() {
    const { camera } = useThree()
    const progress = useRef(0)
    const start = new THREE.Vector3(0, 100, 0)
    const end = new THREE.Vector3(100, 30, 30)
  
    const easeInOutQuad = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
  
    useFrame(() => {
      if (progress.current < 1) {
        progress.current += 0.01
        const eased = easeInOutQuad(progress.current)
        const newPosition = new THREE.Vector3().lerpVectors(start, end, eased)
        camera.position.copy(newPosition)
        camera.lookAt(0, 0, 0)
      }
    })
  
    return null
}

function Planet({ distance, size, color, speed, hasMoon, moonSize, moonDistance, initialAngle }) {
    const planetRef = useRef()
    const moonRef = useRef()
  
    useFrame(({ clock }) => {
      const t = clock.getElapsedTime() * speed + initialAngle
      const x = Math.cos(t) * distance
      const z = Math.sin(t) * distance
      planetRef.current.position.set(x, 0, z)
  
      if (hasMoon && moonRef.current) {
        const moonT = t * 2
        const moonX = Math.cos(moonT) * moonDistance + x
        const moonZ = Math.sin(moonT) * moonDistance + z
        moonRef.current.position.set(moonX, 0, moonZ)
      }
    })
  
    return (
      <group>
        <mesh ref={planetRef}>
          <sphereGeometry args={[size, 32, 32]} />
          <meshStandardMaterial color={color} />
        </mesh>
        {hasMoon && (
          <mesh ref={moonRef}>
            <sphereGeometry args={[moonSize, 16, 16]} />
            <meshStandardMaterial color="gray" />
          </mesh>
        )}
      </group>
    )
}

function AsteroidBelt() {
    const beltRef = useRef()
    const count = 200
    const asteroids = []
  
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = THREE.MathUtils.randFloat(24, 27)
      const x = Math.cos(angle) * radius * 2
      const z = Math.sin(angle) * radius * 2
      const y = THREE.MathUtils.randFloatSpread(0.5)
  
      asteroids.push(
        <mesh key={i} position={[x, y, z]}>
          <sphereGeometry args={[0.3, 6, 6]} />
          <meshStandardMaterial color="#888888" />
        </mesh>
      )
    }
  
    useFrame(() => {
      if (beltRef.current) {
        beltRef.current.rotation.y += 0.0005
      }
    })
  
    return <group ref={beltRef}>{asteroids}</group>
}

function Sun() {
    const ref = useRef()
    useFrame(() => {
      ref.current.rotation.y += 0.002
    })
    return (
      <mesh ref={ref}>
        <sphereGeometry args={[8, 64, 64]} />
        <meshStandardMaterial emissive="#ffaa00" emissiveIntensity={1} color="#ffcc33" />
      </mesh>
    )
}

function SaturnWithRings({ initialAngle = 0 }) {
    const planetRef = useRef()
    const ringRef = useRef()
  
    useFrame(({ clock }) => {
      const t = clock.getElapsedTime() * 0.15 + initialAngle
      const x = Math.cos(t) * 90
      const z = Math.sin(t) * 90 
      planetRef.current.position.set(x, 0, z)
      ringRef.current.position.set(x, 0, z)
    })
  
    return (
      <>
        <mesh ref={planetRef}>
          <sphereGeometry args={[4, 32, 32]} /> 
          <meshStandardMaterial color="#e0c173" />
        </mesh>
        <mesh ref={ringRef} rotation={[Math.PI / 2.8, 0, 0]}>
          <ringGeometry args={[5, 7, 64]} /> 
          <meshStandardMaterial color="#c2b280" side={THREE.DoubleSide} transparent opacity={0.5} />
        </mesh>
      </>
    )
}

export function SolarSystem() {
    return (
      <>
        <AnimatedCamera />
        <color attach="background" args={['black']} />
        <Stars radius={10} depth={100} count={10000} factor={5} fade />
        <pointLight position={[0, 0, 0]} intensity={10000} distance={100000000000000} />
  
        <Sun />
  
        <Planet name="Mercury" distance={20} size={1} color="#b5b5b5" speed={0.6} initialAngle={Math.random() * Math.PI * 2} />
        <Planet name="Venus" distance={28} size={1.4} color="#e6cc85" speed={0.4} initialAngle={Math.random() * Math.PI * 2} />
        <Planet name="Earth" distance={36} size={2} color="#3a9bdc" speed={0.3} hasMoon initialAngle={Math.random() * Math.PI * 2} />
        <Planet name="Mars" distance={44} size={1.6} color="#c1440e" speed={0.25} hasMoon moonSize={0.3} moonDistance={2.4} initialAngle={Math.random() * Math.PI * 2} />
        <AsteroidBelt />
        <Planet name="Jupiter" distance={66} size={5} color="#d9b38c" speed={0.2} initialAngle={Math.random() * Math.PI * 2} />
        <SaturnWithRings initialAngle={Math.random() * Math.PI * 2} />
        <Planet name="Uranus" distance={104} size={3} color="#8ce3d9" speed={0.1} initialAngle={Math.random() * Math.PI * 2} />
        <Planet name="Neptune" distance={120} size={3} color="#3e6cf5" speed={0.08} initialAngle={Math.random() * Math.PI * 2} />
  
        <Stars radius={3000} depth={60} count={10000} factor={7} fade />
        <OrbitControls />
      </>
    )
}