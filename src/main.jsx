import React from 'react'
import ReactDOM from 'react-dom/client'
import { Stats } from '@react-three/drei'
import App from './App'
import "./styles.css"



function Overlay() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
      <div style={{ position: 'absolute', top: 40, left: 40, fontSize: '13px' }}>ok —</div>
      <div style={{ position: 'absolute', bottom: 40, right: 40, fontSize: '13px' }}>16/12/2022</div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    {/* <Overlay /> */}
    {/* <Stats className='stats' /> */}
  </React.StrictMode>
)