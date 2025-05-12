import { Suspense, useState } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { 
  FaTimes, 
  FaArrowsAlt, 
  FaPalette, 
  FaLightbulb 
} from "react-icons/fa";
import "./3DViewer.css";

function Model({ modelPath }) {
  const { scene } = useGLTF(modelPath);
  const isLambo = modelPath.includes("lambo");
  const isBMW = modelPath.includes("bmw_m4_g82");
  const scale = isBMW ? [150, 150, 150] : isLambo ? [-40, -40, -40] : [1, 1, 1];

  return <primitive object={scene} scale={scale} />;
}

export default function ModelViewer({ onClose }) {
  const [model, setModel] = useState("/assets/models/robot/scene.gltf");
  const [activeTab, setActiveTab] = useState("models");

  return (
    <div className="holo-projection-main">
      <motion.button
        className="close-projection"
        onClick={onClose}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaTimes /> CLOSE
      </motion.button>

      <div className="projection-content">
        <div className="projection-header">
          <h2>QUANTUM MODEL VIEWER</h2>
          <p>Explore 3D assets in holographic space</p>
        </div>

        <div className="holo-model-selector">
          <div className="holo-tabs">
            <button
              className={`holo-tab ${activeTab === "models" ? "active" : ""}`}
              onClick={() => setActiveTab("models")}
            >
              MODELS
            </button>
            {/* <button
              className={`holo-tab ${activeTab === "materials" ? "active" : ""}`}
              onClick={() => setActiveTab("materials")}
            >
              MATERIALS
            </button> */}
          </div>

          {activeTab === "models" && (
            <select
              onChange={(e) => setModel(e.target.value)}
              className="holo-select"
            >
              <option value="/assets/models/robot/scene.gltf">ROBOT</option>
              <option value="/assets/models/bmw_m4_g82/scene.gltf">BMW M4 G82</option>
            </select>
          )}
        </div>

        <div className="holo-canvas-container">
          <Canvas
            camera={{ position: [5, 5, 5], fov: 75 }}
            gl={{ preserveDrawingBuffer: true }}
          >
            <ambientLight intensity={5} color="white" />
            <spotLight 
              position={[10, 10, 10]} 
              angle={0.15} 
              penumbra={1} 
              color="white"
              intensity={2000}
            />
            <Suspense fallback={null}>
              <Model modelPath={model} />
              <OrbitControls
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
              />
            </Suspense>
          </Canvas>
          <div className="holo-canvas-glow"></div>
        </div>

        {/* <div className="holo-control-panel">
          <button className="holo-control-btn">
            <FaArrowsAlt /> TRANSFORM
          </button>
          <button className="holo-control-btn">
            <FaPalette /> MATERIALS
          </button>
          <button className="holo-control-btn">
            <FaLightbulb /> LIGHTING
          </button>
        </div> */}
      </div>
    </div>
  );
}