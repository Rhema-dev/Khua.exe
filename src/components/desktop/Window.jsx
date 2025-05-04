import { motion } from 'framer-motion'
import { useState } from 'react'
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
  const [isDragging, setIsDragging] = useState(false)
  
  if (minimized) return null

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
            <button onClick={(e) => { e.stopPropagation(); onMaximize() }} className="window-btn">
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
