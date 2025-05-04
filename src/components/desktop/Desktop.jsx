import { motion } from 'framer-motion'
import './Desktop.css'

export default function Desktop({ openWindow }) {
  const icons = [
    { name: 'Khua.exe', icon: '💻', action: 'khua' },
    { name: 'About Me', icon: '📄', action: 'about' },
    { name: 'Contact', icon: '✉️', action: 'contact' },
    // {name: 'PixelArt', icon: '🖼️', action: 'pixelart'},
    {name: 'SoundLab', icon: '🔊', action: 'SoundLab'},
    {name: '3DViewer', icon: '🖥️', action: '3DViewer'},
  ]

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
            className="desktop-icon"
            onClick={() => openWindow(item.action)}
            onDoubleClick={() => openWindow(item.action)}
          >
            <div className="desktop-icon-emoji">{item.icon}</div>
            <span className="desktop-icon-label">{item.name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
