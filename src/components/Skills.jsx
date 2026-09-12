import { skillGroups, tools } from '../data/skills'
import SectionReveal from './SectionReveal'

export default function Skills() {
  const buildGroups = skillGroups.filter((g) => g.group === 'build')
  const growGroups = skillGroups.filter((g) => g.group === 'grow')
  const marqueeItems = ['React', 'Laravel', 'Node.js', 'Python', 'MySQL', 'AWS', 'SEO', 'UI Systems', 'Docker']

  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionReveal className="section-head">
          <span className="section-label">Skills</span>
          <h2 className="section-title">What I build with, what I grow with</h2>
        </SectionReveal>

        <SectionReveal className="skills-marquee-wrap" delay={0.05}>
          <div className="tech-marquee" aria-label="Technology stack">
            <div className="tech-marquee-track">
              {[...marqueeItems, ...marqueeItems].map((item, index) => (
                <span className="tech-marquee-item" key={`${item}-${index}`}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </SectionReveal>

        <SectionReveal className="skills-columns" delay={0.08}>
          <div className="skills-column skills-column-build">
            <div className="skills-column-heading">
              <span className="skills-column-heading-dot" aria-hidden="true" />
              Build
            </div>
            {buildGroups.map((g) => (
              <div className="skill-category" key={g.title}>
                <div className="skill-category-title">{g.title}</div>
                <div className="skill-badges">
                  {g.skills.map((skill) => (
                    <span className="skill-badge" key={skill}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="skills-column skills-column-grow">
            <div className="skills-column-heading">
              <span className="skills-column-heading-dot" aria-hidden="true" />
              Grow
            </div>
            {growGroups.map((g) => (
              <div className="skill-category" key={g.title}>
                <div className="skill-category-title">{g.title}</div>
                <div className="skill-badges">
                  {g.skills.map((skill) => (
                    <span className="skill-badge" key={skill}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            <div className="skills-tools">
              <span className="skills-tools-label">Tools</span>
              {tools.map((tool) => (
                <span className="skill-badge" key={tool}>
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
