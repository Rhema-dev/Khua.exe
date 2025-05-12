import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FaGlobe, FaImage, FaTimes, FaSearch, FaPowerOff } from "react-icons/fa";
import ModelViewer from "../3DViewer/3DViewer";
import "./khua.css";

export default function Khua({closeKhua}) {
  const [activeRealm, setActiveRealm] = useState("quantum");
  const [selectedProjection, setSelectedProjection] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [orbPositions, setOrbPositions] = useState([]);

  // 5-second preloader
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Calculate random orb positions
  useEffect(() => {
    const positions = [];
    for (let i = 0; i < 20; i++) {
      positions.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 20 + 10,
        opacity: Math.random() * 0.3 + 0.1,
        delay: Math.random() * 5
      });
    }
    setOrbPositions(positions);
  }, []);

  const realms = {
    quantum: {
      name: "WEB PROJECTS",
      icon: <FaGlobe />,
      color: "#00f7ff",
      projects: [
        {
          id: 1,
          name: "RHEMA NEXUS",
          url: "https://rhemaa.vercel.app",
          description: "Regular portfolio website"
        },
        {
          id: 2,
          name: "TUTORIAL SINGULARITY",
          url: "https://tutorialheaven.pages.dev",
          description: "A web app that streamlines learning process by providing users with a clear and detailed roadmap, tutorials, articles paid and free, tips and drawbacks for every step of the way to help users escape tutorial hell."
        },
        {
          id: 3,
          name: "FLUXRWARE NODE",
          url: "https://fluxrware.com",
          description: "Team agency landing page"
        },
        {
          id: 4,
          name: "RHEMBOW LABS",
          url: "https://rhembowlabs.vercel.app",
          description: "Creative agency landing page"
        },
      ]
    },
    neon: {
      name: "3D PROJECTS",
      icon: <FaImage />,
      color: "#ff00f7",
      projects: [
        {
          id: 1,
          name: "QUANTUM VIEWER",
          description: "3D reality manipulator"
        }
      ]
    }
  };

  const filteredProjects = realms[activeRealm].projects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderProjection = () => {
    if (!selectedProjection) return null;

    return (
      <motion.div 
        className="holo-projection-main"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.button
          className="close-projection"
          onClick={() => setSelectedProjection(null)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaTimes /> CLOSE
        </motion.button>

        <div className="projection-content">
          <div className="projection-header">
            <h2>{selectedProjection.name}</h2>
            <p>{selectedProjection.description}</p>
          </div>

          {selectedProjection.url ? (
            <div className="quantum-iframe-container">
              <iframe
                src={selectedProjection.url}
                title={selectedProjection.name}
                className="quantum-iframe"
              />
              <div className="iframe-energy" style={{ background: `radial-gradient(circle, ${realms[activeRealm].color}33, transparent 70%)` }}></div>
            </div>
          ) : (
            <ModelViewer />
          )}
        </div>
      </motion.div>
    );
  };

  if (isLoading) {
    return (
      <div className="quantum-preloader">
        <div className="preloader-content">
          <div className="preloader-spinner" style={{ borderColor: realms[activeRealm].color }}></div>
          <div className="preloader-text">INITIALIZING INTERFACE</div>
          <div className="preloader-progress">
            <motion.div 
              className="progress-bar"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, ease: "linear" }}
              style={{ backgroundColor: realms[activeRealm].color }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="holo-universe">
         <motion.button
        className="close-khua-btn"
        onClick={closeKhua}  // Use the passed closeKhua function
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <FaPowerOff /> EXIT KHUA
      </motion.button>
      {/* Background Orbs */}
      <div className="quantum-orbs">
        {orbPositions.map((orb, i) => (
          <motion.div 
            key={i}
            className="quantum-orb"
            style={{
              left: `${orb.x}%`,
              top: `${orb.y}%`,
              width: `${orb.size}px`,
              height: `${orb.size}px`,
              opacity: orb.opacity,
              background: `radial-gradient(circle, ${realms[activeRealm].color}${Math.floor(orb.opacity*100)}, transparent 70%)`
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: orb.opacity }}
            transition={{ delay: orb.delay }}
          />
        ))}
      </div>

      {/* Main Interface */}
      <div className="holo-core">
        {/* Only show main UI when no projection is selected */}
        {!selectedProjection && (
          <>
            {/* Realm Selector - Circular Menu */}
            <motion.div 
              className="realm-selector"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              {Object.entries(realms).map(([key, realm]) => (
                <motion.button
                  key={key}
                  className={`realm-orb ${activeRealm === key ? 'active' : ''}`}
                  onClick={() => setActiveRealm(key)}
                  style={{ 
                    color: realm.color,
                    borderColor: realm.color,
                    boxShadow: activeRealm === key ? `0 0 30px ${realm.color}` : 'none'
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: `0 0 25px ${realm.color}`
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <div className="orb-icon">{realm.icon}</div>
                  <div className="orb-label">{realm.name}</div>
                </motion.button>
              ))}
            </motion.div>

            {/* Quantum Search */}
            <motion.div 
              className="quantum-search"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="ENGAGE QUANTUM SEARCH..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <div className="search-pulse" style={{ background: realms[activeRealm].color }} />
            </motion.div>

            {/* Projections Grid */}
            <motion.div 
              className="projection-grid"
              layout
            >
              <AnimatePresence>
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    className="projection-card"
                    onClick={() => setSelectedProjection(project)}
                    layout
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    whileHover={{ 
                      y: -10,
                      boxShadow: `0 10px 40px ${realms[activeRealm].color}66`
                    }}
                    style={{
                      borderColor: realms[activeRealm].color,
                      boxShadow: `0 0 20px ${realms[activeRealm].color}33`
                    }}
                  >
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    <div 
                      className="card-energy" 
                      style={{ background: realms[activeRealm].color }}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </>
        )}

        {/* Projection View (full screen) */}
        <AnimatePresence>
          {selectedProjection && renderProjection()}
        </AnimatePresence>
      </div>

      {/* Interface Glow */}
      <div 
        className="universe-glow" 
        style={{ background: `radial-gradient(circle at center, ${realms[activeRealm].color}15, transparent 70%)` }}
      />
    </div>
  );
}