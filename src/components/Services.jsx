import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Bot,
  CloudCog,
  Code2,
  Database,
  Globe,
  Megaphone,
  Search,
  ShoppingCart,
  Sparkles,
} from 'lucide-react'
import SectionReveal from './SectionReveal'

const filters = ['All', 'Engineering', 'AI', 'Digital', 'Growth']

const services = [
  {
    id: 'ai',
    group: 'AI',
    label: '01 / INTELLIGENCE',
    title: 'AI & AUTOMATION',
    description:
      'Turn repetitive workflows into intelligent systems that automate tasks, connect data and help teams work smarter.',
    items: ['AI Agents', 'AI Chatbots', 'AI Copilots', 'Workflow Automation'],
    icon: Bot,
    accent: 'cyan',
  },
  {
    id: 'engineering',
    group: 'Engineering',
    label: '02 / ENGINEERING',
    title: 'SOFTWARE ENGINEERING',
    description:
      'Build secure, scalable and maintainable applications engineered around real business requirements.',
    items: ['Full-Stack Development', 'Custom Web Apps', 'REST APIs', 'System Architecture'],
    icon: Code2,
    accent: 'purple',
  },
  {
    id: 'digital',
    group: 'Digital',
    label: '03 / EXPERIENCE',
    title: 'WEB & DIGITAL EXPERIENCES',
    description:
      'Create fast, modern and conversion-focused digital experiences that turn visitors into customers.',
    items: ['Business Websites', 'Landing Pages', 'E-commerce', 'Portfolio Websites'],
    icon: Globe,
    accent: 'violet',
  },
  {
    id: 'growth',
    group: 'Growth',
    label: '04 / COMMERCE',
    title: 'E-COMMERCE',
    description:
      'Build high-performance online stores designed around customer experience, conversion and scalable operations.',
    items: ['Shopify', 'Custom Stores', 'Payment Integration', 'Conversion Optimization'],
    icon: ShoppingCart,
    accent: 'pink',
  },
  {
    id: 'engineering',
    group: 'Engineering',
    label: '05 / INFRASTRUCTURE',
    title: 'CLOUD & DEVOPS',
    description:
      'Take applications from local development to reliable, secure and production-ready infrastructure.',
    items: ['Docker', 'Cloud Deployment', 'CI/CD', 'Monitoring'],
    icon: CloudCog,
    accent: 'blue',
  },
  {
    id: 'engineering',
    group: 'Engineering',
    label: '06 / DATA',
    title: 'DATA & API SYSTEMS',
    description:
      'Connect applications, databases and services through reliable data architectures and scalable APIs.',
    items: ['REST APIs', 'Database Architecture', 'Integrations', 'Analytics Systems'],
    icon: Database,
    accent: 'cyan',
  },
  {
    id: 'growth',
    group: 'Growth',
    label: '07 / GROWTH',
    title: 'DIGITAL MARKETING',
    description:
      'Connect great technology with the right audience through data-driven digital marketing and growth strategies.',
    items: ['Digital Strategy', 'Paid Media', 'Lead Generation', 'Content Strategy'],
    icon: Megaphone,
    accent: 'orange',
  },
  {
    id: 'digital',
    group: 'Digital',
    label: '08 / DISCOVERY',
    title: 'SEO & SEARCH GROWTH',
    description:
      'Make your digital presence easier to discover through technical SEO, content strategy and search optimization.',
    items: ['Technical SEO', 'Local SEO', 'Keyword Strategy', 'SEO Audits'],
    icon: Search,
    accent: 'green',
  },
  {
    id: 'digital',
    group: 'Digital',
    label: '09 / PRESENCE',
    title: 'SOCIAL MEDIA',
    description:
      'Build a consistent digital presence that attracts attention, builds trust and keeps your brand connected with its audience.',
    items: ['Content Planning', 'Brand Messaging', 'Community Growth', 'Campaign Management'],
    icon: Sparkles,
    accent: 'pink',
  },
]

export default function Services() {
  const [activeFilter, setActiveFilter] = useState('All')

  const visibleServices =
    activeFilter === 'All' ? services : services.filter((service) => service.group === activeFilter)

  return (
    <section id="services" className="section">
      <div className="container">
        <SectionReveal className="section-head services-head">
          <span className="section-label">WHAT I CAN BUILD</span>
          <h2 className="section-title">BUILD. AUTOMATE. GROW.</h2>
          <p className="section-sub">
            From high-performance websites and custom software to AI, automation and digital growth — I build connected digital systems designed to move businesses forward.
          </p>
        </SectionReveal>

        <SectionReveal delay={0.05} className="services-shell">
          <div className="services-filter" aria-label="Service categories">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={`service-filter ${activeFilter === filter ? 'is-active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="services-ecosystem">
            <div className="service-core" aria-label="Digital engineering system core">
              <span className="service-core-label">SYSTEM CORE</span>
              <strong>
                DIGITAL
                <span>ENGINEERING</span>
              </strong>
            </div>

            {visibleServices.map((service, index) => {
              const Icon = service.icon

              return (
                <motion.article
                  key={service.title}
                  className={`service-card service-card--${service.accent}`}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.04 }}
                  whileHover={{ y: -6 }}
                >
                  <div className="service-card-top">
                    <span className="service-card-label">{service.label}</span>
                    <div className="service-card-icon">
                      <Icon size={18} />
                    </div>
                  </div>

                  <div className="service-card-graphic" aria-hidden="true">
                    <span className="graphic-node" />
                    <span className="graphic-node" />
                    <span className="graphic-node" />
                    <span className="graphic-line" />
                  </div>

                  <h3>{service.title}</h3>
                  <p>{service.description}</p>

                  <ul>
                    {service.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>

                  <div className="service-card-cta">
                    <span>EXPLORE</span>
                    <ArrowRight size={14} />
                  </div>
                </motion.article>
              )
            })}
          </div>

          
        </SectionReveal>
      </div>
    </section>
  )
}
