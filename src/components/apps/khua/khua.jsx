import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  FaFolder, 
  FaFolderOpen,
  FaImage,
  FaVideo,
  FaGamepad,
  FaMusic,
  FaFileAlt,
  FaChevronLeft,
  FaChevronRight,
  FaSearch,
  FaEllipsisH
} from 'react-icons/fa'
import Projects3D from './Projects3D'
import ProjectsMotion from './ProjectsMotion'
import ProjectsVideo from './ProjectsVideo'
import ProjectsGame from './ProjectsGame'
import ProjectsSound from './ProjectsSound'
import './khua.css'

export default function KhuaApp() {
  const [activeTab, setActiveTab] = useState('3d')
  
  const tabs = [
    { id: '3d', label: '3D Art', icon: <FaImage /> },
    { id: 'motion', label: 'Motion Graphics', icon: <FaVideo /> },
    { id: 'video', label: 'Video Editing', icon: <FaVideo /> },
    { id: 'game', label: 'Game Dev', icon: <FaGamepad /> },
    { id: 'sound', label: 'Sound Design', icon: <FaMusic /> }
  ]

  const projects = {
    '3d': [
      { id: 1, name: 'Architecture.fbx', type: '3d' },
      { id: 2, name: 'Character.obj', type: '3d' },
      { id: 3, name: 'Product.glb', type: '3d' }
    ],
    'motion': [
      { id: 1, name: 'BrandIdent.aep', type: 'motion' },
      { id: 2, name: 'Explainer.aep', type: 'motion' },
      { id: 3, name: 'Titles.aep', type: 'motion' }
    ],
    'video': [
      { id: 1, name: 'ShortFilm.prproj', type: 'video' },
      { id: 2, name: 'MusicVideo.prproj', type: 'video' },
      { id: 3, name: 'Corporate.drp', type: 'video' }
    ],
    'game': [
      { id: 1, name: 'PuzzleGame.unity', type: 'game' },
      { id: 2, name: 'VRExperience.ue', type: 'game' },
      { id: 3, name: 'BrowserRPG.js', type: 'game' }
    ],
    'sound': [
      { id: 1, name: 'FilmScore.logicx', type: 'sound' },
      { id: 2, name: 'GameSFX.fmod', type: 'sound' },
      { id: 3, name: 'Album.als', type: 'sound' }
    ]
  }

  const [selectedFile, setSelectedFile] = useState(null)

  const renderContent = () => {
    if (selectedFile) {
      switch (selectedFile.type) {
        case '3d': return <Projects3D />
        case 'motion': return <ProjectsMotion />
        case 'video': return <ProjectsVideo />
        case 'game': return <ProjectsGame />
        case 'sound': return <ProjectsSound />
        default: return <div className="empty-state">Select a file to view</div>
      }
    }
    return <div className="empty-state">Select a file to view</div>
  }

  return (
    <div className="file-explorer">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-section">
          <div className="sidebar-title">Projects</div>
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`sidebar-item ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(tab.id)
                setSelectedFile(null)
              }}
            >
              <span className="sidebar-icon">
                {activeTab === tab.id ? <FaFolderOpen /> : <FaFolder />}
              </span>
              {tab.label}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="content-area">
        {/* Toolbar */}
        <div className="toolbar">
          <button className="toolbar-button">
            <FaChevronLeft size={12} />
          </button>
          <button className="toolbar-button">
            <FaChevronRight size={12} />
          </button>
          <div style={{ flex: 1 }}></div>
          <div className="search-box">
            <FaSearch size={12} />
            <input type="text" placeholder="Search projects..." />
          </div>
          <button className="toolbar-button">
            <FaEllipsisH size={12} />
          </button>
        </div>

        {/* File Grid or Content */}
        {!selectedFile ? (
          <div className="file-grid">
            {projects[activeTab].map((file) => (
              <div 
                key={file.id}
                className="file-item"
                onClick={() => setSelectedFile(file)}
              >
                <div className="file-icon">
                  {tabs.find(t => t.id === activeTab)?.icon || <FaFileAlt />}
                </div>
                <div className="file-name">{file.name}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="file-content">
            {renderContent()}
            <button 
              className="back-button"
              onClick={() => setSelectedFile(null)}
            >
              ← Back to files
            </button>
          </div>
        )}
      </div>
    </div>
  )
}