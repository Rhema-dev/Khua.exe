  import { Suspense, useState } from "react";
  import { Canvas } from "@react-three/fiber";
  import { OrbitControls, useGLTF } from "@react-three/drei";
  import "./3DViewer.css";

  function Model({ modelPath }) {
    // This will automatically load the .gltf, .bin, and textures
    const { scene } = useGLTF(modelPath);
    return <primitive object={scene} />;
  }

  export default function ModelViewer() {
    const [model, setModel] = useState("/assets/models/robot/scene.gltf"); // Path to your .gltf file

    return (
      <div>
        <div className="viewer3d-title-bar"></div>
        <div className="viewer3d-content">
        

          {/* 3D Canvas */}
          <div className="viewer3d-canvas-container">
  {/* Model selector dropdown */}
          <select
            onChange={(e) => setModel(e.target.value)}
            className="viewer3d-select"
          >
            <option value="assets/models/robot/scene.gltf">Robot</option>
            {/* <option value="assets/models/asus-rog-zephyrus-duo-16/source/asus-rog-zephyrus-duo-16.glb">Asus</option> */}
            <option value="assets/models/robot/scene.gltf">Robot</option>
            <option value="assets/models/robot/scene.gltf">Robot</option>
            <option value="assets/models/robot/scene.gltf">Robot</option>
            <option value="assets/models/robot/scene.gltf">Robot</option>
            {/* Add other models as needed */}
          </select>

            <Canvas
              camera={{ position: [5, 5, 5], fov: 75 }}
              gl={{ preserveDrawingBuffer: true }} // For screenshots
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
