import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Linkedin,
  Mail,
  ArrowRight,
  Globe,
  Bot,
  TrendingUp,
  CheckCircle2,
  Cpu,
  Layers,
  Code2,
  Terminal as TerminalIcon,
  Sparkles,
  Activity,
  ShieldCheck,
  Database,
  Zap
} from 'lucide-react'
import { siteConfig } from '../data/config'

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

const STAGES = [
  {
    id: 'web',
    num: '01',
    title: 'BUILD',
    heading: 'Web & Product Engineering',
    desc: 'React and Django/Laravel apps built to handle real traffic and real data, from first line of code to production.',
    icon: Cpu,
    stack: ['React', 'Next.js', 'Laravel', 'Django', 'PostgreSQL', 'AWS'],
    deliverables: [
      'Single-page applications & SaaS backends',
      'Database schema design & query pipelines',
      'Secure authentication & REST/GraphQL APIs',
      'Sub-second load times & modular architecture',
    ],
    demoType: 'web-app',
    codeSnippet: `// Web System Architecture Contract (TypeScript)
export interface WebSystemConfig {
  frontend: "React 18" | "Next.js 14";
  backend: "Laravel 10" | "Django";
  database: "PostgreSQL 16 (Primary + Read Replica)";
  cache: "Redis Cluster";
  metrics: {
    ttfbMs: 38;
    lighthouseScore: 99;
    cacheHitRatio: "99.4%";
  };
}`,
  },
  {
    id: 'ai',
    num: '02',
    title: 'AUTOMATE',
    heading: 'AI & Workflow Automation',
    desc: 'Workflows and internal tools that remove manual work, using LLM APIs and backend automation where it saves time.',
    icon: Layers,
    stack: ['OpenAI API', 'LangChain', 'Python Hooks', 'Webhooks', 'TailwindCSS'],
    deliverables: [
      'Autonomous AI agents & custom copilots',
      'Automated document processing & data extractions',
      'Internal team dashboards eliminating manual work',
      'LLM function calling & vector search integration',
    ],
    demoType: 'ai-workflow',
    codeSnippet: `# AI Workflow Agent (Python Async)
async def process_user_inquiry(payload: InquiryPayload) -> Response:
    context = await vector_db.similarity_search(payload.query)
    agent_output = await llm_agent.run(
        prompt=payload.query,
        context=context,
        tools=[crm_sync, instant_notification]
    )
    return Response(status="completed", data=agent_output)`,
  },
  {
    id: 'growth',
    num: '03',
    title: 'GROW',
    heading: 'Growth Infrastructure',
    desc: 'The SEO, performance, and analytics groundwork that turns a finished build into a system that keeps earning attention.',
    icon: TrendingUp,
    stack: ['Technical SEO', 'Structured Schema', 'Analytics', 'Vercel / Netlify'],
    deliverables: [
      'Server-side & pre-rendered SEO for search rankings',
      'Core Web Vitals 99/100 performance scores',
      'Conversion tracking & lead capture engines',
      'Production hosting setup on Vercel or AWS',
    ],
    demoType: 'growth-seo',
    codeSnippet: `// Growth Infrastructure & SEO Schema
export const pageMetadata = {
  title: "Ankit Mandliya | Full Stack & Digital Engineering",
  openGraph: {
    type: "website",
    cdn: "Edge Acceleration (Vercel/Netlify)",
    ttfb: "24ms"
  },
  schemaOrg: {
    "@type": "SoftwareApplication",
    "operatingSystem": "Serverless Cloud"
  }
};`,
  },
]

export default function Hero() {
  const [activeStageId, setActiveStageId] = useState('web')
  const [viewMode, setViewMode] = useState('visual') // 'visual' | 'code'

  const activeStage = STAGES.find((s) => s.id === activeStageId) || STAGES[0]

  return (
    <section id="home" className="hero hero-systems-theme">
      <div className="container">
        
        {/* Top Header Pitch Block */}
        <motion.div className="systems-pitch-block" variants={container} initial="hidden" animate="show">
          
          <motion.div className="signal-status-pill" variants={item}>
            <span className="signal-pulse-dot" aria-hidden="true" />
            <span>Available for freelance &amp; full-time projects</span>
          </motion.div>

          <motion.h1 className="systems-hero-title" variants={item}>
            Build. Automate. Grow.
          </motion.h1>

          <motion.p className="systems-hero-subhead" variants={item}>
            High-performance websites, custom software, and AI-driven automation — built as one connected system, not a pile of separate tools.
          </motion.p>

          <motion.div className="systems-hero-actions" variants={item}>
            <button type="button" className="btn btn-signal-primary" onClick={() => scrollTo('contact')}>
              Start a project
              <ArrowRight size={16} />
            </button>
            <button type="button" className="btn btn-systems-outline" onClick={() => scrollTo('projects')}>
              View my work
            </button>
          </motion.div>

          <motion.div className="systems-tech-strip" variants={item}>
            <span className="tech-tag">React</span>
            <span className="tech-tag">Laravel</span>
            <span className="tech-tag">Django</span>
            <span className="tech-tag">Python</span>
            <span className="tech-tag">AWS</span>
            <span className="tech-tag">PostgreSQL</span>
          </motion.div>
        </motion.div>

        {/* Connected Circuit Spine Pipeline ("Systems in Motion") */}
        <motion.div className="systems-pipeline-shell" variants={item}>
          
          {/* Circuit Spine Track */}
          <div className="circuit-spine-track">
            <div className="spine-line" />
            <div className={`spine-signal-pulse signal-pos-${activeStageId}`} />

            <div className="spine-nodes-row" role="tablist">
              {STAGES.map((stage) => {
                const Icon = stage.icon
                const isActive = activeStageId === stage.id
                return (
                  <button
                    key={stage.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`spine-node-btn ${isActive ? 'is-active' : ''}`}
                    onClick={() => setActiveStageId(stage.id)}
                  >
                    <div className="node-indicator">
                      <span className="node-dot" />
                      <Icon size={16} className="node-icon" />
                    </div>
                    <div className="node-text">
                      <span className="node-num">{stage.num}</span>
                      <strong className="node-title">{stage.title}</strong>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Active Connected System Console */}
          <div className="systems-console-frame">
            
            {/* Header Toolbar */}
            <div className="console-toolbar">
              <div className="toolbar-left">
                <span className="console-live-tag">
                  <Activity size={13} className="text-signal" /> SYSTEM ACTIVE // NODE {activeStage.num}
                </span>
                <span className="console-file-name">{activeStage.id}-architecture.sys</span>
              </div>

              <div className="toolbar-right">
                <div className="console-view-toggle" role="group" aria-label="View mode">
                  <button
                    type="button"
                    className={`view-btn ${viewMode === 'visual' ? 'is-active' : ''}`}
                    onClick={() => setViewMode('visual')}
                  >
                    <Sparkles size={12} style={{ display: 'inline', marginRight: 4 }} />
                    Visual Canvas
                  </button>
                  <button
                    type="button"
                    className={`view-btn ${viewMode === 'code' ? 'is-active' : ''}`}
                    onClick={() => setViewMode('code')}
                  >
                    <Code2 size={12} style={{ display: 'inline', marginRight: 4 }} />
                    Code Contract
                  </button>
                </div>
              </div>
            </div>

            {/* Console Content Box */}
            <div className="console-content-box">
              <AnimatePresence mode="wait">
                {viewMode === 'visual' ? (
                  <motion.div
                    key={`visual-${activeStage.id}`}
                    className="console-visual-stage"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="stage-heading-block">
                      <h3 className="stage-title">{activeStage.heading}</h3>
                      <p className="stage-desc">{activeStage.desc}</p>
                    </div>

                    {/* Highlights Grid */}
                    <div className="stage-highlights-list">
                      {activeStage.deliverables.map((item) => (
                        <div className="stage-deliverable-item" key={item}>
                          <CheckCircle2 size={14} className="check-signal" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Visual Interactive Graphic */}
                    <div className="stage-visual-canvas">
                      {activeStage.demoType === 'web-app' && (
                        <div className="visual-mock-frame">
                          <div className="mock-browser-head">
                            <span className="dot dot-red" />
                            <span className="dot dot-yellow" />
                            <span className="dot dot-green" />
                            <span className="mock-url">https://app.ankitmandliya.com</span>
                            <span className="mock-speed">Fast &lt;0.8s</span>
                          </div>
                          <div className="mock-stats-row">
                            <div className="stat-card">
                              <Database size={13} className="text-signal" />
                              <span>DB Connected (PostgreSQL)</span>
                            </div>
                            <div className="stat-card">
                              <ShieldCheck size={13} className="text-signal" />
                              <span>SSL Encrypted</span>
                            </div>
                            <div className="stat-card">
                              <Zap size={13} className="text-signal" />
                              <span>38ms Latency</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeStage.demoType === 'ai-workflow' && (
                        <div className="visual-mock-frame">
                          <div className="mock-ai-bar">
                            <Bot size={14} className="text-signal" />
                            <span>Autonomous LLM Agent Pipeline</span>
                          </div>
                          <div className="ai-pipeline-steps">
                            <div className="ai-step-node">
                              <strong>1. Inquiry Received</strong>
                              <small>Form / WhatsApp</small>
                            </div>
                            <div className="ai-step-arrow">→</div>
                            <div className="ai-step-node ai-active">
                              <strong>2. AI RAG Processing</strong>
                              <small>Vector Search Context</small>
                            </div>
                            <div className="ai-step-arrow">→</div>
                            <div className="ai-step-node">
                              <strong>3. CRM Alert Sync</strong>
                              <small>Auto Qualified</small>
                            </div>
                          </div>
                        </div>
                      )}

                      {activeStage.demoType === 'growth-seo' && (
                        <div className="visual-mock-frame">
                          <div className="mock-seo-bar">
                            <TrendingUp size={14} className="text-signal" />
                            <span>Core Web Vitals &amp; SEO Engine</span>
                          </div>
                          <div className="seo-metrics-row">
                            <div className="seo-metric-box">
                              <span>Search Position</span>
                              <strong className="text-signal">#1 Strategy</strong>
                            </div>
                            <div className="seo-metric-box">
                              <span>Web Vitals Score</span>
                              <strong className="text-signal">99 / 100</strong>
                            </div>
                            <div className="seo-metric-box">
                              <span>Lead Growth</span>
                              <strong className="text-signal">+145% Traffic</strong>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Tech Stack Chips */}
                    <div className="stage-stack-tags">
                      {activeStage.stack.map((s) => (
                        <span className="chip-tag" key={s}>{s}</span>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={`code-${activeStage.id}`}
                    className="console-code-stage"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="code-filename">
                      <TerminalIcon size={14} className="text-dim" />
                      <span>{activeStage.title.toLowerCase()}-contract.ts</span>
                    </div>
                    <pre className="code-pre-box">
                      <code>{activeStage.codeSnippet}</code>
                    </pre>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  )
}
