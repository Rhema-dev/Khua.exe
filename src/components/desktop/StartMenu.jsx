import { motion } from 'framer-motion'
import { FiUser, FiMail, FiBriefcase, FiSettings, FiPower } from 'react-icons/fi'
import './StartMenu.css'

export default function StartMenu({ openWindow, onClose, onShutdown }) {
  const programs = [
    { name: 'Khua.exe', icon: <FiBriefcase />, action: 'khua' },
    { name: 'About Me', icon: <FiUser />, action: 'about' },
    { name: 'Contact', icon: <FiMail />, action: 'contact' },
    { name: 'Shutdown', icon: <FiPower />, action: 'shutdown' }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="start-menu"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="start-menu-header">
        <h3>Start Menu</h3>
      </div>
      <div className="start-menu-body">
        {programs.map((program, index) => (
          <motion.button
            key={index}
            whileHover={{ x: 5 }}
            className="start-menu-item"
            onClick={() => {
              if (program.action === 'shutdown'){
                onShutdown()
                return
              }
              openWindow(program.action)
              onClose()
            }}
          >
            <span className="item-icon">{program.icon}</span>
            <span>{program.name}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}
