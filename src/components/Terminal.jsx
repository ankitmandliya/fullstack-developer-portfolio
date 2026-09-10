import { useState } from 'react'
import SectionReveal from './SectionReveal'

const responses = {
  help: 'Try: about, skills, projects, contact',
  about: 'Full-stack developer and digital marketer based in Pune, India.',
  skills: 'React.js | Django | Laravel | Node.js | MySQL | MongoDB | AWS',
  projects: 'Scroll up to explore the project archive.',
  contact: 'Scroll down to send a project brief.',
}

export default function Terminal() {
  const [command, setCommand] = useState('')
  const [output, setOutput] = useState('Type help to see available commands.')

  const runCommand = (event) => {
    event.preventDefault()
    const normalized = command.trim().toLowerCase()
    setOutput(responses[normalized] || `Command not found: ${normalized || 'empty'}`)
    setCommand('')
  }

  return (
    <section className="section terminal-section">
      <div className="container">
        <SectionReveal className="terminal-shell">
          <div className="terminal-heading"><span className="terminal-prompt">$</span><span>optional interface</span><span className="terminal-live">online</span></div>
          <div className="terminal-output">{output}</div>
          <form className="terminal-form" onSubmit={runCommand}>
            <label htmlFor="terminal-command"><span className="terminal-prompt">$</span><span className="sr-only">Terminal command</span></label>
            <input id="terminal-command" value={command} onChange={(event) => setCommand(event.target.value)} placeholder="type a command" autoComplete="off" />
          </form>
        </SectionReveal>
      </div>
    </section>
  )
}