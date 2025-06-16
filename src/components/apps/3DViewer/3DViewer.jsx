import { Suspense, useState } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  return (
    <div className="holo-projection-main">

      <div className="projection-content">
        <div className="projection-header">
          <h2>3D Model Viewer</h2>
          <p>View and interact with 3D assets</p>
        </div>

        <div className="holo-model-selector">
          <div className="holo-tabs">
            <button
              className={`holo-tab ${activeTab === "models" ? "active" : ""}`}
              onClick={() => setActiveTab("models")}
            >
              Models
            </button>
          </div>

          {activeTab === "models" && (
            <select
              onChange={(e) => setModel(e.target.value)}
              className="holo-select"
            >
              <option value="/assets/models/robot/scene.gltf">Robot</option>
              <option value="/assets/models/bmw_m4_g82/scene.gltf">BMW M4</option>
            </select>
          )}
        </div>

        <div className="holo-canvas-container">
          <Canvas
            camera={{ position: [5, 5, 5], fov: 75 }}
            gl={{ preserveDrawingBuffer: true }}
          >
               
            <spotLight 
              position={[10, 10, 10]} 
              angle={0.15} 
              penumbra={1}
              intensity={2}
            />
            {/* Improved Lighting Setup */}
            <ambientLight intensity={2} color="#ffffff" />
            <directionalLight
              position={[10, 10, 5]}
              intensity={1}
              color="#ffffff"
              castShadow
            />
            <directionalLight
              position={[-10, -10, -5]}
              intensity={0.5}
              color="#ffffff"
            />
            <pointLight position={[0, 0, 5]} intensity={0.5} color="#ffffff" />
            
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