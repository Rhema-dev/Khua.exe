import { motion } from 'framer-motion'
import './Projects.css'

const projects = [
  // ... keep your projects array the same
]

export default function ProjectsVideo() {
  return (
    <div className="projects-grid projects-grid-1-col">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className="project-card project-video"
        >
          <div className="project-media-container">
            <div className="project-video-preview">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="project-play-button"
              >
                <span className="project-play-icon">▶</span>
              </motion.div>
            </div>
          </div>
          <div className="project-content">
            <h3 className="project-title">{project.title}</h3>
            <p className="project-description">{project.description}</p>
            <div className="project-tags">
              {project.tags.map(tag => (
                <span key={tag} className="project-tag tag-video">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}