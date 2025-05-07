import { motion } from 'framer-motion'
import './Projects.css'

const projects = [
  // ... keep your projects array the same
]

export default function ProjectsWeb() {
  return (
    <div className="projects-grid projects-grid-2-col">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="project-card project-web"
        >
          <div className="project-media-container">
            <img
              src={project.image}
              alt={project.title}
              className="project-image"
            />
          </div>
          <div className="project-content">
            <h3 className="project-title">{project.title}</h3>
            <p className="project-description">{project.description}</p>
            <div className="project-tags">
              {project.tags.map(tag => (
                <span key={tag} className="project-tag tag-web">
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
