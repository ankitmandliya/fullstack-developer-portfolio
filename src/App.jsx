import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Services from './components/Services'
import Projects from './components/Projects'
import Experience from './components/Experience'
// import WhyWorkWithMe from './components/WhyWorkWithMe'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Background from './components/Background'
import CustomCursor from './components/CustomCursor'
import Architecture from './components/Architecture'
import CodeSection from './components/CodeSection'
import Terminal from './components/Terminal'
import FloatingContact from './components/FloatingContact'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 1100)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <>
      {isLoading && (
        <div className="global-loader" aria-live="polite" aria-label="Loading portfolio">
          <div className="loader-shell">
            <div className="loader-mark">&lt; / &gt;</div>
            <div className="loader-name">SHIVOM</div>
            <div className="loader-bar">
              <span />
            </div>
            <div className="loader-text">INITIALIZING...</div>
          </div>
        </div>
      )}

      <Background />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Services />
        <Projects />
        <Experience />
        <Architecture />
        <CodeSection />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <FloatingContact />
    </>
  )
}
