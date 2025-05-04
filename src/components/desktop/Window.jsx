import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { FiMinus, FiMaximize2, FiX } from 'react-icons/fi'
import { Rnd } from 'react-rnd'
import './Window.css'

export default function Window({ 
  id, 
  title, 
  children, 
  minimized, 
  onMinimize, 
  onMaximize, 
  onClose,
  onFocus,
  isFocused
}) {
  const [isMobile, setIsMobile] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  
  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth <= 768)
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  if (minimized) return null

  // Mobile fullscreen handler
  const handleMaximize = (e) => {
    e.stopPropagation()
    setIsFullscreen(!isFullscreen)
    onMaximize()
  }

  if (isMobile) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ 
          opacity: 1,
          scale: 1,
          y: isFullscreen ? 0 : 20
        }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25 }}
        className={`ios-window-container ${isFocused ? 'focused' : ''}`}
        onClick={onFocus}
        style={{
          position: isFullscreen ? 'fixed' : 'fixed',
          top: isFullscreen ? 0 : '0',
          left: isFullscreen ? 0 : '0',
          width: isFullscreen ? '100vw' : '100%',
          height: isFullscreen ? '100vh' : '100%',
          zIndex: isFocused ? 100 : 100
        }}
      >
        {/* iOS-style header bar */}
        <div className="ios-window-header">
          <div className="ios-window-handle"></div>
          <button 
            onClick={(e) => { e.stopPropagation(); onClose() }} 
            className="ios-window-btn close"
          >
            <FiX size={18} />
          </button>
        </div>
        
        <div className="ios-window-content">
          {children}
        </div>
        
        {/* iOS home indicator for fullscreen */}
        {isFullscreen && (
          <div className="ios-home-indicator"></div>
        )}
      </motion.div>
    )
  }

  // Desktop version
  return (
    <Rnd
      default={{
        x: 50,
        y: 50,
        width: "90%",
        height: "80%",
      }}
      minWidth={300}
      minHeight={200}
      bounds="parent"
      dragHandleClassName="window-header"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          boxShadow: isFocused ? '0 0 15px rgba(0, 100, 255, 0.5)' : 'none'
        }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ type: 'spring', damping: 20 }}
        className={`window-container ${isFocused ? 'focused' : ''}`}
        onClick={onFocus}
      >
        <div className="window-header">
          <h3 className="window-title">{title}</h3>
          <div className="window-controls">
            <button onClick={(e) => { e.stopPropagation(); onMinimize() }} className="window-btn">
              <FiMinus size={14} />
            </button>
            <button onClick={handleMaximize} className="window-btn">
              <FiMaximize2 size={14} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); onClose() }} className="window-btn close">
              <FiX size={14} />
            </button>
          </div>
        </div>
        
        <div className="window-content">
          {children}
        </div>
        
        <div className="window-footer"></div>
      </motion.div>
    </Rnd>
  )
}