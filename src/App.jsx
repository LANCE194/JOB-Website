import { useEffect, useRef, useState } from 'react'
import './animations.css'
import Sidebar from './components/Sidebar.jsx'
import MobileNav from './components/MobileNav.jsx'
import Hero from './components/Hero.jsx'
import TechMarquee from './components/TechMarquee.jsx'
import Projects from './components/Projects.jsx'
import Services from './components/Services.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import DragonCursor from './components/DragonCursor.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import FloatingCTA from './components/FloatingCTA.jsx'
import Critters from './components/Critters.jsx'
import CritterPicker from './components/CritterPicker.jsx'
import { CRITTERS_BY_ID, DEFAULT_CRITTERS } from './data/critters.js'

const SECTION_IDS = ['home', 'projects', 'services', 'about', 'contact']
const CRITTER_KEY = 'portfolio:critters'

const loadCritters = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(CRITTER_KEY))
    if (Array.isArray(saved)) return saved.filter((id) => CRITTERS_BY_ID[id])
  } catch {
    /* ignore corrupt or unavailable storage */
  }
  return DEFAULT_CRITTERS
}

export default function App() {
  const [active, setActive] = useState('home')
  const observerRef = useRef(null)
  const [critters, setCritters] = useState(loadCritters)
  const [pickerOpen, setPickerOpen] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(CRITTER_KEY, JSON.stringify(critters))
    } catch {
      /* storage unavailable */
    }
  }, [critters])

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
    <div className="min-h-screen overflow-x-clip bg-ink text-cream">
      <ScrollProgress />
      <DragonCursor />
      <Critters selected={critters} />
      <Sidebar
        active={active}
        onNavigate={handleNavigate}
        critterCount={critters.length}
        critterOpen={pickerOpen}
        onToggleCritters={() => setPickerOpen((o) => !o)}
      />
      <MobileNav
        active={active}
        onNavigate={handleNavigate}
        critterOpen={pickerOpen}
        onToggleCritters={() => setPickerOpen((o) => !o)}
      />
      <CritterPicker
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        selected={critters}
        onChange={setCritters}
      />
      <FloatingCTA active={active} onNavigate={handleNavigate} />

      <div className="md:pl-24 lg:pl-28">
        <main className="mx-auto w-full min-w-0 max-w-[1600px] pb-[calc(4.5rem+env(safe-area-inset-bottom))] md:pb-0">
          <Hero onNavigate={handleNavigate} />
          <TechMarquee />
          <Projects />
          <Services />
          <About />
          <Contact />
        </main>
      </div>
    </div>
  )
}
