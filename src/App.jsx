import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Services from './components/Services'
import Projects from './components/Projects'
import Experience from './components/Experience'
import WhyWorkWithMe from './components/WhyWorkWithMe'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Background from './components/Background'
import CustomCursor from './components/CustomCursor'
import Architecture from './components/Architecture'
import CodeSection from './components/CodeSection'
import Terminal from './components/Terminal'

export default function App() {
  return (
    <>
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
        <Terminal />
        <WhyWorkWithMe />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
