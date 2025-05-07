import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import "./3DViewer.css";

function Model({ modelPath }) {
  const { scene } = useGLTF(modelPath);

  // Apply scale ONLY if the BMW model is selected
  const isBMW = modelPath.includes("bmw_m4_g82");
  const scale = isBMW ? [150, 150, 150] : [1, 1, 1];

  return <primitive object={scene} scale={scale} />;
}

export default function ModelViewer() {
  const [model, setModel] = useState("/assets/models/robot/scene.gltf");

  return (
    <div>
      <div className="viewer3d-title-bar"></div>
      <div className="viewer3d-content">
        {/* Model selector dropdown */}
        <select
          onChange={(e) => setModel(e.target.value)}
          className="viewer3d-select"
        >
          <option value="/assets/models/robot/scene.gltf">Robot</option>
          <option value="/assets/models/bmw_m4_g82/scene.gltf">BMW M4 G82</option>
        </select>

        {/* 3D Canvas */}
        <div className="viewer3d-canvas-container">
          <Canvas
            camera={{ position: [5, 5, 5], fov: 75 }}
            gl={{ preserveDrawingBuffer: true }}
          >
            <ambientLight intensity={10} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <Suspense fallback={null}>
              <Model modelPath={model} />
              <OrbitControls
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
              />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </div>
  );
}