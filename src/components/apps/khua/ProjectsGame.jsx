import { motion } from 'framer-motion'
import './Projects.css'

const projects = [
  // ... keep your projects array the same
]

export default function ProjectsGame() {
  return (
    <div className="projects-grid projects-grid-3-col">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.2 }}
          className="project-card project-game"
        >
          <div className="project-media-container">
            <div className="project-game-icon">🎮</div>
          </div>
          <div className="project-content">
            <h3 className="project-title">{project.title}</h3>
            <p className="project-description">{project.description}</p>
            <div className="project-tags">
              {project.tags.map(tag => (
                <span key={tag} className="project-tag tag-game">
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