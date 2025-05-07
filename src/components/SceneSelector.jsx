import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { SolarSystem } from './scenes/SolarSystem'
import { GalacticNebula } from './scenes/GalacticNebula'
import { AuroraScene } from './scenes/AuroraScene'
import { BMWInSpace } from './scenes/BMWInSpace'
import { RobotInSpace } from './scenes/RobotInSpace'
import { OceanScene } from './scenes/OceanScene'
import { FloatingIslandsScene } from './scenes/FloatingIslandsScene'
import './ThreeScene.css'

export function SceneSelector() {
  const [currentScene, setCurrentScene] = useState('solarSystem')

  const scenes = {
    solarSystem: <SolarSystem />,
    galacticNebula: <GalacticNebula />,
    aurora: <AuroraScene />,
    bmwinspace: <BMWInSpace />,
    robotinspace: <RobotInSpace />
    // ocean: <OceanScene />,
    // floatingIslands: <FloatingIslandsScene />
  }

  return (
    <div className="scene-selector">
      <div className="canvas-container">
        <Canvas camera={{ position: [0, 50, 100], fov: 60 }}>
          {scenes[currentScene]}
        </Canvas>
      </div>

      <div className="dropdown-container">
        <select
          value={currentScene}
          onChange={(e) => setCurrentScene(e.target.value)}
          className="scene-dropdown"
        >
          <option value="solarSystem">Solar System</option>
          <option value="galacticNebula">Galactic Nebula</option>
          <option value="aurora">Aurora Borealis</option>
          <option value="bmwinspace">BMW M4 G82</option>
          <option value="robotinspace">Robot</option>
          {/* <option value="ocean">Ocean Waves</option> */}
          {/* <option value="floatingIslands">Floating Islands</option> */}
        </select>
      </div>
    </div>
  )
}