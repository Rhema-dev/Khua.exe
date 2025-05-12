import { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Desktop from "./components/desktop/Desktop";
import Taskbar from "./components/desktop/Taskbar";
import WindowManager from "./components/desktop/WindowManager";
import ThreeScene from "./components/ThreeScene";
import ShutdownScreen from "./components/apps/shutdown/shutdown";
import StartMenu from "./components/desktop/StartMenu";
import Khua from './components/apps/khua/Khua'
import "./App.css";

function App() {
  const [windows, setWindows] = useState([]);
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [shutdown, setShutdown] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [deviceInfo, setDeviceInfo] = useState(null);
  const [currentWelcomePage, setCurrentWelcomePage] = useState(0);
  const [khuaOpen, setKhuaOpen] = useState(false);
  
  const staticSoundRef = useRef(null);

  useEffect(() => {
    // Check device info when welcome message first shows
    if (showWelcome) {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const hasDedicatedGPU = checkForDedicatedGPU();
      
      setDeviceInfo({
        isMobile,
        hasDedicatedGPU,
        userAgent: navigator.userAgent
      });
    }
  }, [showWelcome]);

  // Basic GPU detection (not 100% reliable but works in most cases)
  const checkForDedicatedGPU = () => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) return false;
      
      const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        return renderer.toLowerCase().indexOf('nvidia') !== -1 || 
               renderer.toLowerCase().indexOf('amd') !== -1 ||
               renderer.toLowerCase().indexOf('radeon') !== -1 ||
               renderer.toLowerCase().indexOf('intel') !== -1;
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  const handleWelcomeNext = () => {
    if (currentWelcomePage < 1) {
      setCurrentWelcomePage(currentWelcomePage + 1);
    } else {
      setShowWelcome(false);
    }
  };
  const openKhua = () => {
  setKhuaOpen(true);
};
const closeKhua = () => {
  setKhuaOpen(false);
};

  const openWindow = (content) => {
    if (content === 'khua') {
      setKhuaOpen(true);
      return;
    }
    const titles = {
      khua: "Khua.exe - Portfolio",
      about: "About Me.exe",
      contact: "Contact Me.exe",
      pixelart: "Pixel Art Studio.exe",
      SoundLab: "Sound Lab.exe",
      "3DViewer": "3D Model Viewer.exe",
      code : "Write your code"
    };

    setWindows((prev) => [
      ...prev.filter((w) => w.content !== content),
      {
        id: Date.now().toString(),
        title: titles[content],
        content,
        minimized: false,
      },
    ]);
  };

  if (shutdown) {
    return (
      <ShutdownScreen
        onPowerOn={() => {
          setShutdown(false);
          setShowStartMenu(false);
        }}
      />
    );
  }

  return (
    <Router>
      <>
        {showWelcome && (
          <div className="welcome-overlay">
            <div className="welcome-modal">
              {currentWelcomePage === 0 ? (
                <>
                  <h2>Welcome to My Immersive Portfolio Experience</h2>
                  <p>
                    You're about to enter a 3D desktop environment with interactive elements.
                    For best experience, use a desktop computer with a dedicated graphics card.
                  <br /> <br /> <br /> Developed by Rhema Emmanuel-Great Oshiokhua 2025
                  </p>
                  <p>
                
                <br />
                - The effect bar at the top rght can be moved around for convinience <br />
                - Wallpappers are 3D and interactive <br />
                - They can be changed using the dropdown
              </p>
                  <div className="welcome-progress">
                <div className="progress-bar" style={{ width: '50%' }}></div>
              </div>
                  <button className="welcome-button" onClick={handleWelcomeNext}>
            {currentWelcomePage === 0 ? 'Analyze System' : 'Begin Experience'}
            <span className="button-arrow">→</span>
          </button>
                </>
              ) : (
          //       <>
          //         <h2>System Check</h2>
          //         <p>Detected Device: {deviceInfo?.isMobile ? "Mobile" : "Desktop"}</p>
          //         <p>Graphics: {deviceInfo?.hasDedicatedGPU ? "Dedicated GPU detected" : "Integrated graphics"}</p>
          //         {deviceInfo?.isMobile || !deviceInfo?.hasDedicatedGPU ? (
          //           <p className="warning">
          //             ⚠️ You may experience performance issues. Consider disabling effects in settings if available.
          //           </p>
          //         ) : (
          //           <p>Your device should handle this experience well!</p>
          //         )}
          //         <button className="welcome-button" onClick={handleWelcomeNext}>
          //   {currentWelcomePage === 0 ? 'Analyze System' : 'Begin Experience'}
          //   <span className="button-arrow">→</span>
          // </button>
          //       </>
          <>
          <div className="device-stats">
            <div className="stat-item">
              <div className="stat-icon">📱</div>
              <div className="stat-value">
                {deviceInfo?.isMobile ? 'Mobile Device' : 'Desktop System'}
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">🎮</div>
              <div className="stat-value">
                {deviceInfo?.hasDedicatedGPU ? 'GPU Detected' : 'Integrated Graphics'}
                <div className={`stat-indicator ${deviceInfo?.hasDedicatedGPU ? 'success' : 'warning'}`}></div>
              </div>
            </div>
          </div>

          {deviceInfo?.isMobile || !deviceInfo?.hasDedicatedGPU ? (
            <div className="performance-good">
              <div className="warning-icon">⚠️</div>
              <p>
                For optimal performance, we recommend:<br />
                - Uncheck enabled in the settings to disable effects<br />
                - Use a Desktop/Laptop with dedicated GPU<br />
                - Use Chrome/Firefox browser
              </p>
            </div>
          ) : (
            <div className="performance-good">
              <div className="success-icon">✓</div>
              <p>Your system meets recommended specifications!</p>
            </div>
            
          )}
          <button className="welcome-button" onClick={handleWelcomeNext}>
             {currentWelcomePage === 0 ? 'Analyze System' : 'Begin Experience'}
             <span className="button-arrow">→</span>
           </button>
        </>
              )}
            </div>
          </div>
        )}
        
        <div onClick={() => setShowStartMenu(false)}>
          <ThreeScene />
          <Desktop openWindow={openWindow} openKhua={openKhua} />
          <WindowManager windows={windows} setWindows={setWindows} />
            {khuaOpen && (
            <div className="khua-fullscreen-container">
              <Khua closeKhua= {()=>{closeKhua()}} />
            </div>
          )}
        </div>

        <div className="taskbar-container">
          <Taskbar
            windows={windows}
            setWindows={setWindows}
            onStartClick={() => setShowStartMenu(!showStartMenu)}
            onShutdown={() => setShutdown(true)}
          />
        </div>

        {showStartMenu && (
          <StartMenu
            onShutdown={() => setShutdown(true)}
            openWindow={openWindow}
            onClose={() => setShowStartMenu(false)}
          />
        )}
      </>
    </Router>
  );
}

export default App;