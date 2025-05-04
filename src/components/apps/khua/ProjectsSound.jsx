import { motion } from 'framer-motion'
import './Projects.css'

const projects = [
  // ... keep your projects array the same
]

export default function ProjectsSound() {
  return (
    <div className="projects-grid projects-grid-2-col">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="project-card project-sound"
        >
          <div className="project-media-container">
            <div className="project-sound-icon">🔊</div>
          </div>
          <div className="project-content">
            <h3 className="project-title">{project.title}</h3>
            <p className="project-description">{project.description}</p>
            <div className="project-tags">
              {project.tags.map(tag => (
                <span key={tag} className="project-tag tag-sound">
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