import { motion } from 'framer-motion'
import './Desktop.css'

export default function Desktop({ openWindow, openKhua }) {  // Add openKhua prop
  const icons = [
    { name: 'Projects', icon: '💻', action: 'khua', isSpecial: true },  // Add special flag
    { name: 'About Me', icon: '📄', action: 'about' },
    { name: 'Contact', icon: '✉️', action: 'contact' },
    { name: 'SoundLab', icon: '🔊', action: 'SoundLab' },
    { name: 'Code', icon: '👨‍💻', action: 'code' },
  ]

  const handleIconClick = (item) => {
    if (item.isSpecial) {
      openKhua();  // Use special open function for Khua
    } else {
      openWindow(item.action);
    }
  }

  return (
    <div className="desktop-container">
      <div className="desktop-grid">
        {icons.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`desktop-icon ${item.isSpecial ? 'special-app' : ''}`}
            onClick={() => handleIconClick(item)}
            onDoubleClick={() => handleIconClick(item)}
          >
            <div className="desktop-icon-emoji">{item.icon}</div>
            <span className="desktop-icon-label">{item.name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}