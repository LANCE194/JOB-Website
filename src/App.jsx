import { useEffect, useRef, useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import MobileNav from './components/MobileNav.jsx'
import Hero from './components/Hero.jsx'
import TechMarquee from './components/TechMarquee.jsx'
import Projects from './components/Projects.jsx'
import Services from './components/Services.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'

const SECTION_IDS = ['home', 'projects', 'services', 'about', 'contact']

export default function App() {
  const [active, setActive] = useState('home')
  const observerRef = useRef(null)

  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean)

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0.1, 0.25, 0.5, 0.75] },
    )

    sections.forEach((section) => observerRef.current.observe(section))
    return () => observerRef.current?.disconnect()
  }, [])

  const handleNavigate = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-ink text-cream">
      <Sidebar active={active} onNavigate={handleNavigate} />
      <MobileNav active={active} onNavigate={handleNavigate} />

      <main className="md:ml-24 lg:ml-28">
        <Hero onNavigate={handleNavigate} />
        <TechMarquee />
        <Projects />
        <Services />
        <About />
        <Contact />
      </main>
    </div>
  )
}
