import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, FileArrowDown } from '@phosphor-icons/react'
import profilePhoto from '../assets/profile.jpg'
import useCountUp from '../hooks/useCountUp'

// EDIT: the three roles that cycle in the typing line under the eyebrow label
const ROLES = ['Full Stack Developer', 'Data Analyst', 'Web Developer']

function useTypewriter(words, { typeSpeed = 55, deleteSpeed = 30, pause = 1400 } = {}) {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIndex % words.length]
    let timeout

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && text === '') {
      setDeleting(false)
      setWordIndex((i) => i + 1)
    } else {
      timeout = setTimeout(
        () => {
          setText((t) => (deleting ? current.slice(0, t.length - 1) : current.slice(0, t.length + 1)))
        },
        deleting ? deleteSpeed : typeSpeed,
      )
    }

    return () => clearTimeout(timeout)
  }, [text, deleting, wordIndex, words, typeSpeed, deleteSpeed, pause])

  return text
}

function StatCounter({ target, suffix = '', label }) {
  const [ref, value] = useCountUp(target)
  return (
    <div ref={ref}>
      <p className="text-2xl font-semibold text-accent">
        {value}
        {suffix}
      </p>
      <p className="mt-1 text-xs text-muted">{label}</p>
    </div>
  )
}

export default function Hero({ onNavigate }) {
  const sectionRef = useRef(null)
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 })
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const typed = useTypewriter(ROLES)

  const handleMouseMove = (e) => {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    setSpotlight({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  const handlePhotoTilt = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: py * -10, y: px * 12 })
  }

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pb-20 pt-28 md:px-14 lg:px-20"
    >
      {/* cursor-following spotlight — subtle, follows the pointer across the whole hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70 transition-[background] duration-300"
        style={{
          background: `radial-gradient(480px circle at ${spotlight.x}% ${spotlight.y}%, rgba(61,255,138,0.08), transparent 70%)`,
        }}
      />
      {/* ambient glow, single deliberate motion element */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-20 h-80 w-80 rounded-full bg-accent/10 blur-3xl animate-floatSlow"
      />

      <div className="relative grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Copy column */}
        <div className="animate-riseIn">
          {/* Rotating-role typing line */}
          <p className="mb-5 flex h-5 items-center text-sm font-medium text-accent">
            {typed}
            <span className="ml-0.5 inline-block h-4 w-[2px] animate-blink bg-accent" />
          </p>
          <h1 className="max-w-xl bg-gradient-to-r from-cream via-cream to-accent bg-[length:200%_auto] bg-clip-text text-4xl font-semibold leading-[1.12] text-transparent animate-gradientShift sm:text-5xl lg:text-[3.4rem]">
            Val Wenie B. Macua builds software that turns raw data into clear decisions.
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
            I design and build end-to-end products — from the database to the interface — and
            help teams read their own data well enough to act on it.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            {/* Button 1: fill-sweep animation */}
            <button
              onClick={() => onNavigate('projects')}
              className="group relative overflow-hidden rounded-full border border-accent px-7 py-3 text-sm font-medium text-accent transition-transform duration-300 hover:scale-[1.03] active:scale-[0.97]"
            >
              <span className="absolute inset-0 -translate-x-full bg-accent transition-transform duration-500 ease-out group-hover:translate-x-0" />
              <span className="relative flex items-center gap-2 transition-colors duration-500 group-hover:text-ink">
                View my work
                <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </button>

            {/* Button 2: corner-draw outline animation */}
            {/* Résumé PDF lives in /public/resume.pdf — swap the filename below if yours differs.
                target="_blank" opens it in a new tab; the `download` attribute suggests
                a filename for the saved copy instead of using whatever the file is named on disk. */}
            <a
              href="src/public/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="Val-Wenie-Macua-Resume.pdf"
              className="group relative rounded-full px-7 py-3 text-sm font-medium text-cream transition-transform duration-300 hover:scale-[1.03] active:scale-[0.97]"
            >
              <span className="absolute left-0 top-0 h-3 w-3 border-l border-t border-muted transition-all duration-300 group-hover:h-full group-hover:w-full group-hover:border-accent" />
              <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-muted transition-all duration-300 group-hover:h-full group-hover:w-full group-hover:border-accent" />
              <span className="relative flex items-center gap-2">
                <FileArrowDown size={16} className="transition-transform duration-300 group-hover:translate-y-0.5" />
                Download résumé
              </span>
            </a>
          </div>

          {/* Stats — count up into view */}
          <div className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-line pt-8">
            <StatCounter target={2026} label="CS graduate, Batch 2026" />
            <StatCounter target={5} suffix="+" label="Freelance disciplines covered" />
            <div>
              <p className="text-2xl font-semibold text-accent">Iligan City</p>
              <p className="mt-1 text-xs text-muted">Based in Mindanao, PH</p>
            </div>
          </div>
        </div>

        {/* Photo column */}
        <div className="animate-riseIn [animation-delay:150ms]">
          <div
            className="relative mx-auto max-w-sm [perspective:1000px]"
            onMouseMove={handlePhotoTilt}
            onMouseLeave={() => setTilt({ x: 0, y: 0 })}
          >
            <div className="absolute -inset-3 rounded-[2rem] border border-line transition-transform duration-300" />
            <div
              className="relative overflow-hidden rounded-[1.75rem] border border-line bg-panel shadow-[0_0_0_rgba(0,0,0,0)] transition-transform duration-200 ease-out will-change-transform hover:shadow-[0_20px_60px_-15px_rgba(61,255,138,0.25)]"
              style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
            >
              {/* EDIT: swap /src/assets/profile.jpg for an updated headshot any time */}
              <img
                src={profilePhoto}
                alt="Portrait of Val Wenie B. Macua"
                className="h-full w-full object-cover grayscale-[15%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 rounded-xl border border-line bg-ink/70 px-4 py-3 backdrop-blur">
                <p className="text-sm font-medium text-cream">Val Wenie B. Macua</p>
                <p className="text-xs text-muted">Full Stack Developer &amp; Data Analyst</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}