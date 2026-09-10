import { services } from '../data/services'
import SectionReveal from './SectionReveal'

export default function Services() {
  return (
    <section id="services" className="section">
      <div className="container">
        <SectionReveal className="section-head">
          <span className="section-label">Services</span>
          <h2 className="section-title">How I can help</h2>
          <p className="section-sub">
            Pick one, or bundle a build with the marketing that gets it found.
          </p>
        </SectionReveal>

        <SectionReveal className="services-grid" delay={0.05}>
          {services.map((service) => {
            const Icon = service.icon
            return (
              <div className="service-card" key={service.title}>
                <div className="service-icon">
                  <Icon size={20} />
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-desc">{service.description}</p>
                <div className="service-items">
                  {service.items.map((item) => (
                    <div className="service-item" key={item}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </SectionReveal>
      </div>
    </section>
  )
}
