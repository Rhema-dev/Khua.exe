import { Canvas } from '@react-three/fiber'
import { SceneSelector } from './SceneSelector'
import './ThreeScene.css'

export default function ThreeScene() {
  return (
    <div className="three-scene-container">
        <SceneSelector/>
    </div>
  )
}