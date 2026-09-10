import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import { projects, projectCategories } from '../data/projects'
import SectionReveal from './SectionReveal'

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered =
    activeCategory === 'All' ? projects : projects.filter((p) => p.category === activeCategory)

  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionReveal className="section-head">
          <span className="section-label">Projects</span>
          <h2 className="section-title">Recent work</h2>
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <div className="projects-filters">
            {projectCategories.map((category) => (
              <button
                key={category}
                type="button"
                className={`filter-pill ${activeCategory === category ? 'is-active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <motion.div className="projects-grid" layout>
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.div
                  key={project.title}
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.28 }}
                  className="project-card"
                  onMouseMove={(event) => {
                    const bounds = event.currentTarget.getBoundingClientRect()
                    event.currentTarget.style.setProperty('--mouse-x', `${event.clientX - bounds.left}px`)
                    event.currentTarget.style.setProperty('--mouse-y', `${event.clientY - bounds.top}px`)
                  }}
                >
                  <div className="project-media">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                        e.currentTarget.nextSibling.style.display = 'flex'
                      }}
                    />
                    <span style={{ display: 'none', position: 'absolute', inset: 0, alignItems: 'center', justifyContent: 'center' }}>
                      {project.title}
                    </span>
                  </div>
                  <div className="project-body">
                    <div className="project-category">{project.category}</div>
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-desc">{project.description}</p>
                    <div className="project-tags">
                      {project.technologies.map((tech) => (
                        <span className="project-tag" key={tech}>
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="project-links">
                      <a href={project.liveUrl} className="project-link" target="_blank" rel="noreferrer">
                        <ExternalLink size={14} />
                        Live demo
                      </a>
                      <a href={project.githubUrl} className="project-link" target="_blank" rel="noreferrer">
                        <Github size={14} />
                        GitHub
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && <p className="projects-empty">No projects in this category yet.</p>}
        </SectionReveal>
      </div>
    </section>
  )
}
