import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  Cpu,
  Layers,
  TrendingUp,
  CheckCircle2,
} from 'lucide-react'
import SectionReveal from './SectionReveal'

const coreCapabilities = [
  {
    id: 'engineering',
    num: '01',
    title: 'Web & product engineering',
    shortDesc: 'React and Django/Laravel apps built to handle real traffic and real data, from first line of code to production.',
    icon: Cpu,
    stack: ['React', 'Next.js', 'Laravel', 'Django', 'Node.js', 'PostgreSQL', 'AWS'],
    deliverables: [
      'Custom single page applications and SaaS backends',
      'Database schema design, queries and migration pipelines',
      'Secure authentication, role-based access & API integrations',
      'Clean modular architecture built for long-term scalability',
    ],
  },
  {
    id: 'ai-automation',
    num: '02',
    title: 'AI & automation',
    shortDesc: 'Workflows and internal tools that remove manual work, using LLM APIs and backend automation where it actually saves time.',
    icon: Layers,
    stack: ['OpenAI API', 'LangChain', 'Python Hooks', 'Webhooks', 'Custom Dashboards'],
    deliverables: [
      'Autonomous AI agent pipelines and custom copilots',
      'Automated data extractions, document processing & sync',
      'Internal team tools that eliminate repetitive tasks',
      'LLM function calling & vector RAG search integrated into your web app',
    ],
  },
  {
    id: 'growth-infra',
    num: '03',
    title: 'Growth infrastructure',
    shortDesc: 'The SEO, performance, and analytics groundwork that turns a finished build into a system that keeps earning attention.',
    icon: TrendingUp,
    stack: ['Technical SEO Audits', 'Core Web Vitals', 'Structured Data Schema', 'Google Analytics', 'Vercel / Netlify'],
    deliverables: [
      'Server-side & pre-rendered SEO optimization for high search rankings',
      'Sub-second page load speeds across desktop and mobile',
      'Conversion tracking, funnel analytics & lead capture engines',
      'Production-ready hosting setup on Vercel, Netlify, or AWS',
    ],
  },
]

const serviceDirectory = [
  {
    id: 'ai',
    group: 'AI',
    label: '01 / INTELLIGENCE',
    title: 'AI & AUTOMATION',
    description: 'Turn repetitive workflows into intelligent systems that automate tasks, connect data and help teams work smarter.',
    items: ['AI Agents', 'AI Chatbots', 'AI Copilots', 'Workflow Automation'],
    icon: Bot,
  },
  {
    id: 'engineering',
    group: 'Engineering',
    label: '02 / ENGINEERING',
    title: 'SOFTWARE ENGINEERING',
    description: 'Build secure, scalable and maintainable applications engineered around real business requirements.',
    items: ['Full-Stack Development', 'Custom Web Apps', 'REST APIs', 'System Architecture'],
    icon: Code2,
  },
  {
    id: 'digital',
    group: 'Digital',
    label: '03 / EXPERIENCE',
    title: 'WEB & DIGITAL EXPERIENCES',
    description: 'Create fast, modern and conversion-focused digital experiences that turn visitors into customers.',
    items: ['Business Websites', 'Landing Pages', 'E-commerce', 'Portfolio Websites'],
    icon: Globe,
  },
  {
    id: 'growth',
    group: 'Growth',
    label: '04 / COMMERCE',
    title: 'E-COMMERCE',
    description: 'Build high-performance online stores designed around customer experience, conversion and scalable operations.',
    items: ['Shopify', 'Custom Stores', 'Payment Integration', 'Conversion Optimization'],
    icon: ShoppingCart,
  },
  {
    id: 'engineering',
    group: 'Engineering',
    label: '05 / INFRASTRUCTURE',
    title: 'CLOUD & DEVOPS',
    description: 'Take applications from local development to reliable, secure and production-ready infrastructure.',
    items: ['Docker', 'Cloud Deployment', 'CI/CD', 'Monitoring'],
    icon: CloudCog,
  },
  {
    id: 'engineering',
    group: 'Engineering',
    label: '06 / DATA',
    title: 'DATA & API SYSTEMS',
    description: 'Connect applications, databases and services through reliable data architectures and scalable APIs.',
    items: ['REST APIs', 'Database Architecture', 'Integrations', 'Analytics Systems'],
    icon: Database,
  },
  {
    id: 'growth',
    group: 'Growth',
    label: '07 / GROWTH',
    title: 'DIGITAL MARKETING',
    description: 'Connect great technology with the right audience through data-driven digital marketing and growth strategies.',
    items: ['Digital Strategy', 'Paid Media', 'Lead Generation', 'Content Strategy'],
    icon: Megaphone,
  },
  {
    id: 'digital',
    group: 'Digital',
    label: '08 / DISCOVERY',
    title: 'SEO & SEARCH GROWTH',
    description: 'Make your digital presence easier to discover through technical SEO, content strategy and search optimization.',
    items: ['Technical SEO', 'Local SEO', 'Keyword Strategy', 'SEO Audits'],
    icon: Search,
  },
  {
    id: 'digital',
    group: 'Digital',
    label: '09 / PRESENCE',
    title: 'SOCIAL MEDIA',
    description: 'Build a consistent digital presence that attracts attention, builds trust and keeps your brand connected with its audience.',
    items: ['Content Planning', 'Brand Messaging', 'Community Growth', 'Campaign Management'],
    icon: Sparkles,
  },
]

const filters = ['All', 'Engineering', 'AI', 'Digital', 'Growth']
const serviceLocations = ['Indore', 'Bhopal', 'Ujjain', 'Jabalpur', 'Jaipur', 'Mandsaur', 'Neemuch', 'Ratlam', 'Raipur', 'Vadodara', 'Ahmedabad', 'Gurgaon', 'Delhi', 'Pune', 'Bangalore']

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

export default function Services() {
  const [activeCapId, setActiveCapId] = useState('engineering')
  const [activeFilter, setActiveFilter] = useState('All')

  const activeCap = coreCapabilities.find((c) => c.id === activeCapId) || coreCapabilities[0]
  const visibleServices = activeFilter === 'All' ? serviceDirectory : serviceDirectory.filter((s) => s.group === activeFilter)

  return (
    <section id="services" className="section services-systems-theme">
      <div className="container">
        
        {/* Section Header */}
        <SectionReveal className="section-head services-head">
          <span className="section-label-signal">WHAT I CAN BUILD</span>
          <h2 className="section-title-systems">Build. Automate. Grow.</h2>
          <p className="section-sub-systems">
            High-performance websites, custom software, and AI-driven automation — built as one connected system, not a pile of separate tools.
          </p>
        </SectionReveal>

        {/* Capability Matrix */}
        <SectionReveal delay={0.04} className="systems-capability-matrix">
          <div className="systems-capability-tabs">
            {coreCapabilities.map((cap) => {
              const Icon = cap.icon
              const isActive = activeCapId === cap.id
              return (
                <button
                  key={cap.id}
                  type="button"
                  className={`systems-cap-tab ${isActive ? 'is-active' : ''}`}
                  onClick={() => setActiveCapId(cap.id)}
                >
                  <div className="tab-top">
                    <span className="tab-num">{cap.num}</span>
                    <Icon size={18} className="tab-icon" />
                  </div>
                  <h3>{cap.title}</h3>
                  <p>{cap.shortDesc}</p>
                </button>
              )
            })}
          </div>

          {/* Active Detail Box */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCap.id}
              className="systems-capability-detail"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="systems-detail-grid">
                <div className="systems-detail-col">
                  <h4>Technical Stack &amp; Tools</h4>
                  <div className="stack-chips-wrap">
                    {activeCap.stack.map((tech) => (
                      <span className="systems-chip" key={tech}>{tech}</span>
                    ))}
                  </div>
                </div>

                <div className="systems-detail-col">
                  <h4>Engineering Deliverables</h4>
                  <ul className="systems-deliverables-list">
                    {activeCap.deliverables.map((item) => (
                      <li key={item}>
                        <CheckCircle2 size={15} className="check-signal" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="systems-detail-action">
                <button type="button" className="btn btn-signal-primary" onClick={() => scrollTo('contact')}>
                  Start a project
                  <ArrowRight size={15} />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </SectionReveal>

        {/* Service Directory Grid */}
        <SectionReveal delay={0.08} className="systems-directory-shell">
          <div className="systems-dir-header">
            <h3>Complete Service Directory</h3>
            <p>Explore detailed capabilities across engineering, AI, web experiences, and growth.</p>
          </div>

          <div className="systems-dir-filters" aria-label="Service category filters">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={`systems-filter-btn ${activeFilter === filter ? 'is-active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="systems-cards-grid">
            {visibleServices.map((service, index) => {
              const Icon = service.icon

              return (
                <motion.article
                  key={service.title}
                  className="systems-service-card"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: index * 0.03 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="card-top">
                    <span className="card-label-signal">{service.label}</span>
                    <div className="card-icon">
                      <Icon size={18} />
                    </div>
                  </div>

                  <h3>{service.title}</h3>
                  <p>{service.description}</p>

                  <ul className="card-items">
                    {service.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>

                  <div className="card-cta" onClick={() => scrollTo('contact')}>
                    <span>Start a project</span>
                    <ArrowRight size={14} />
                  </div>
                </motion.article>
              )
            })}
          </div>

          <div className="service-locations" aria-labelledby="service-locations-title">
            <div>
              <span className="section-label-signal">SERVICE AREA</span>
              <h3 id="service-locations-title">Serving businesses across India</h3>
              <p>I work with businesses, startups and teams across Indore and throughout India, including these cities and other locations.</p>
            </div>
            <div className="location-chip-grid">
              {serviceLocations.map((location) => <span className="location-chip" key={location}>{location}</span>)}
            </div>
          </div>
        </SectionReveal>

      </div>
    </section>
  )
}
