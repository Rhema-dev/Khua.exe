import { motion } from 'framer-motion'
import './Icons.css'

export function DesktopIcon({ icon, label, onClick }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="desktop-icon"
      onClick={onClick}
      onDoubleClick={onClick}
    >
      <div className="desktop-icon-emoji">{icon}</div>
      <span className="desktop-icon-label">{label}</span>
    </motion.div>
  )
}

export function TaskbarIcon({ icon, isActive, onClick }) {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      className={`taskbar-icon ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      {icon}
    </motion.button>
  )
}
