import { experience } from '../data/experience'
import SectionReveal from './SectionReveal'

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <SectionReveal className="section-head">
          <span className="section-label">Experience</span>
          <h2 className="section-title">Where the work has been</h2>
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <div className="timeline">
            {experience.map((role) => (
              <div className="timeline-item" key={`${role.company}-${role.date}`}>
                <span className="timeline-dot" aria-hidden="true" />
                <div className="timeline-date">{role.date}</div>
                <h3 className="timeline-role">{role.position}</h3>
                <div className="timeline-company">{role.company}</div>
                <div className="timeline-points">
                  {role.points.map((point) => (
                    <p className="timeline-point" key={point}>
                      {point}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
