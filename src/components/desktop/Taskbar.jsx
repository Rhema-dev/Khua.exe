import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaWindows, FaClock } from 'react-icons/fa'
import './Taskbar.css'

export default function Taskbar({ windows, setWindows, onStartClick, onShutdown }) {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ y: 50 }}
      animate={{ y: 0 }}
      className="taskbar"
    >
      <button onClick={onStartClick} className="taskbar-start-button">
        <FaWindows className="start-icon" />
        <span className="start-text">Start</span>
      </button>

      <div className="taskbar-window-list">
        {windows.map((window) => (
          <button
            key={window.id}
            onClick={() =>
              setWindows(windows.map(w =>
                w.id === window.id ? { ...w, minimized: !w.minimized } : w
              ))
            }
            className={`taskbar-window-button ${window.minimized ? 'minimized' : 'active'}`}
          >
            {window.title}
          </button>
        ))}
      </div>

      <div className="taskbar-right">
        <div className="clock">
          <FaClock className="clock-icon" />
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </motion.div>
  )
}
