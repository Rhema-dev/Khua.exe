import { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Desktop from "./components/desktop/Desktop";
import Taskbar from "./components/desktop/Taskbar";
import WindowManager from "./components/desktop/WindowManager";
import ThreeScene from "./components/ThreeScene";
import ShutdownScreen from "./components/apps/shutdown/shutdown";
import StartMenu from "./components/desktop/StartMenu";
import "./App.css";

function App() {
  const [windows, setWindows] = useState([]);
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [shutdown, setShutdown] = useState(false);
  const staticSoundRef = useRef(null);

  // Initialize audio once
  // useEffect(() => {
  //   staticSoundRef.current = new Audio("/assets/sounds/static.mp3");
  //   staticSoundRef.current.volume = 0.3;
  //   staticSoundRef.current.loop = true; // Keep static playing continuously

  //   return () => {
  //     if (staticSoundRef.current) {
  //       staticSoundRef.current.pause();
  //       staticSoundRef.current = null;
  //     }
  //   };
  // }, []);

  // Handle shutdown state changes
  // useEffect(() => {
  //   if (shutdown) {
  //     staticSoundRef.current.play().catch(e => console.log("Audio play blocked:", e));
  //   } else {
  //     staticSoundRef.current.pause();
  //     staticSoundRef.current.currentTime = 0; // Rewind for next time
  //   }
  // }, [shutdown]);

  const openWindow = (content) => {
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
        <div onClick={() => setShowStartMenu(false)}>
          <ThreeScene />
          <Desktop openWindow={openWindow} />
          <WindowManager windows={windows} setWindows={setWindows} />
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