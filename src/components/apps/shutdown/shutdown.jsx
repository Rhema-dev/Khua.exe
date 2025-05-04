import { motion } from 'framer-motion'
import StaticEffect from "../../StaticEffect"
import PowerButton from '../../PowerButton'
import './ShutdownScreen.css'

export default function ShutdownScreen({ onPowerOn }) {
 
  return (
    <div className="shutdown-screen">
      <StaticEffect />
      
      <div className="power-button-container">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="power-button-wrapper"
        >
          <PowerButton onClick={onPowerOn} />
        </motion.div>
        
      </div>
    </div>
  )
}