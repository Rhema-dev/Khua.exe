import { useState } from 'react'
import Window from './Window'
import KhuaApp from "../apps/khua/khua";
import AboutApp from '../apps/about/About'
import ContactApp from '../apps/contact/Contact'
import PixelArtApp from '../apps/PixelArt/PixelArt';
import SoundLab from '../apps/SoundLab/SoundLab'
import ModelViewer from '../apps/3DViewer/3DViewer'
import './WindowManager.css'

export default function WindowManager({ windows, setWindows }) {
    const [focusedWindow, setFocusedWindow] = useState(null)
  
    const handleMinimize = (id) => {
      setWindows(windows.map(window => 
        window.id === id ? { ...window, minimized: !window.minimized } : window
      ))
    }
  
    const handleClose = (id) => {
      setWindows(windows.filter(window => window.id !== id))
    }
  
    const getWindowContent = (content) => {
      switch(content) {
        case 'khua': return <KhuaApp />
        case 'about': return <AboutApp />
        case 'contact': return <ContactApp />
        case 'pixelart': return <PixelArtApp />
        case 'SoundLab': return <SoundLab />
        case '3DViewer': return <ModelViewer />
        default: return <div>Unknown application</div>
      }
    }

    // Conditionally apply class based on whether windows are open
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
          >
            {getWindowContent(window.content)}
          </Window>
        ))}
      </div>
    )
}
