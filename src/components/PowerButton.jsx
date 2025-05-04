import { motion } from 'framer-motion'
import { useState } from 'react'
import './PowerButton.css'

export default function PowerButton({ onClick }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  return (
    <motion.div
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className="power-button-container"
    >
      {/* Outer glow ring */}
      <motion.div
        animate={{
          opacity: isHovered ? 1 : 0.7,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.2 }}
        className="power-button-outer-glow"
      />

      {/* Main button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onTapStart={() => setIsPressed(true)}
        onTap={() => {
          setIsPressed(false)
          onClick()
        }}
        onTapCancel={() => setIsPressed(false)}
        className="power-button"
      >
        {/* Inner glow */}
        <motion.div
          animate={{
            opacity: isHovered ? 0.8 : 0.3,
            scale: isHovered ? 1 : 0.9,
          }}
          className="power-button-inner-glow"
        />

        {/* Power icon */}
        <motion.div
          animate={{
            color: isPressed ? '#3b82f6' : '#f8fafc',
            scale: isPressed ? 0.9 : 1,
          }}
          className="power-icon"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
            <line x1="12" y1="2" x2="12" y2="12" />
          </svg>
        </motion.div>

        {/* Pulse ring */}
        {!isHovered && !isPressed && (
          <motion.div
            initial={{ scale: 1, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeOut',
            }}
            className="power-button-pulse"
          />
        )}
      </motion.button>

      {/* Instruction */}
      
    </motion.div>
  )
}
