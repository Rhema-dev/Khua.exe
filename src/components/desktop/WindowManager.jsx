import { useState } from 'react';
import Window from './Window';
import KhuaApp from "../apps/khua/khua";
import AboutApp from '../apps/about/About';
import ContactApp from '../apps/contact/Contact';
import PixelArtApp from '../apps/PixelArt/PixelArt';
import SoundLab from '../apps/SoundLab/SoundLab';
import ModelViewer from '../apps/3DViewer/3DViewer';
import './WindowManager.css';

// External app configuration
const EXTERNAL_APPS = {
  weather: {
    url: 'https://your-weather-app.com',
    icon: '⛅'
  },
  youtube:{
    url: 'https://google.com'
  },
  calculator: {
    url: 'https://your-calculator-app.com',
    icon: '🧮'
  },
  code: {
    url: "https://onecompiler.com/embed/",
    icon: '👨‍💻'
  },
};

export default function WindowManager({ windows, setWindows }) {
  const [focusedWindow, setFocusedWindow] = useState(null);
  
  const handleMinimize = (id) => {
    setWindows(windows.map(window => 
      window.id === id ? { ...window, minimized: !window.minimized } : window
    ));
  };

  const handleClose = (id) => {
    setWindows(windows.filter(window => window.id !== id));
  };

  const getWindowContent = (content) => {
    // Check if it's an external app first
    if (EXTERNAL_APPS[content]) {
      return (
        <div className="iframe-container">
           <iframe 
            src={EXTERNAL_APPS[content].url}
            title={content} 
            className="app-iframe"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          /> 
         
        </div>
      );
    }

    // Fall back to local apps
    switch(content) {
      case 'khua': return <KhuaApp />;
      case 'about': return <AboutApp />;
      case 'contact': return <ContactApp />;
      case 'pixelart': return <PixelArtApp />;
      case 'SoundLab': return <SoundLab />;
      case '3DViewer': return <ModelViewer />;
      default: return <div>Unknown application</div>;
    }
  };

  const windowManagerClass = windows.length > 0 ? "window-manager" : "no-windows";

  return (
    <div className={windowManagerClass}>
      {windows.map((window) => (
        <Window
          key={window.id}
          id={window.id}
          title={window.title}
          minimized={window.minimized}
          isFocused={focusedWindow === window.id}
          onFocus={() => setFocusedWindow(window.id)}
          onMinimize={() => handleMinimize(window.id)}
          onMaximize={() => console.log('Maximize')}
          onClose={() => handleClose(window.id)}
          icon={window.icon || EXTERNAL_APPS[window.content]?.icon}
        >
          {getWindowContent(window.content)}
        </Window>
      ))}
    </div>
  );
}