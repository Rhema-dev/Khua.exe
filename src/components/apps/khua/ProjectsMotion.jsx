import { motion } from 'framer-motion'
import './Projects.css'

const projects = [
  // ... keep your projects array the same
]

export default function ProjectsMotion() {
  return (
    <div className="projects-grid projects-grid-3-col">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          whileHover={{ y: -5 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="project-card project-motion"
        >
          <div className="project-media-container">
            <div className="project-motion-icon">🎬</div>
          </div>
          <div className="project-content">
            <h3 className="project-title">{project.title}</h3>
            <p className="project-description">{project.description}</p>
            <div className="project-tags">
              {project.tags.map(tag => (
                <span key={tag} className="project-tag tag-motion">
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