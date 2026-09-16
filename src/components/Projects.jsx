import { useState, useEffect } from 'react'
import { GithubLogo, HourglassMedium } from '@phosphor-icons/react'
import useReveal from '../hooks/useReveal'

// EDIT: these screenshots live in src/assets/attendtrack/ — same pattern as
// the profilePhoto import in Hero.jsx. Add/remove imports here, then
// add/remove the matching entry in the images array below.
import attendtrack01 from '../assets/attendtrack/01-login.png'
import attendtrack02 from '../assets/attendtrack/02-dashboard-admin.png'
import attendtrack03 from '../assets/attendtrack/03-dashboard-secretary.png'
import attendtrack04 from '../assets/attendtrack/04-calendar.png'
import attendtrack05 from '../assets/attendtrack/05-contributions.png'
import attendtrack06 from '../assets/attendtrack/06-dashboard-treasurer.png'
import attendtrack07 from '../assets/attendtrack/07-analytics.png'
import attendtrack08 from '../assets/attendtrack/08-about.png'

// EDIT: replace this list with your real projects — title, description, stack, and links.
const PROJECTS = [
  {
    title: 'Barangay Resident Information Management System',
    description:
      'A web platform that digitizes barangay-level resident records for Philippine local government units, replacing paper logs with searchable, structured data.',
    stack: ['Electron', 'JavaScript', 'SQLite'],
    codeUrl: '#', // EDIT: GitHub repo URL
  },
  {
    title: 'AttendTrack — IVVHOA Desktop App',
    description:
      'An Electron desktop application that tracks homeowners-association attendance, built for offline-first reliability during in-person meetings.',
    stack: ['Electron', 'JavaScript', 'SQLite'],
    // EDIT: screenshots cycle through automatically as a slideshow. Drop the
    // image files into src/assets/attendtrack/, add an import for each one
    // at the top of this file (see above), then list the imported variables
    // here in slide order.
    images: [
      attendtrack01,
      attendtrack02,
      attendtrack03,
      attendtrack04,
      attendtrack05,
      attendtrack06,
      attendtrack07,
      attendtrack08,
    ],
    codeUrl: 'https://github.com/LANCE194/IVVHOA-project.git',
  },
]

// EDIT: swap these out as real projects replace them, or delete the array
// entirely once you no longer need a "more coming" placeholder.
const COMING_SOON = [
  { title: 'New project', note: 'Currently in development — details coming soon.' },
  { title: 'Another one in the works', note: "I'm polishing this one before it goes public." },
]

// Screenshot thumbnail with dot navigation to pick the slide, plus a
// hover-triggered popup that shows the chosen slide enlarged.
function ProjectThumbnail({ images, title, isHovered }) {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (images.length <= 1) return
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % images.length)
    }, 3000)
    return () => clearInterval(id)
  }, [images.length])

  return (
    <div className="relative mb-5 aspect-video w-full">
      <div className="h-full w-full overflow-hidden rounded-xl border border-line bg-black/30">
        <img
          src={images[active]}
          alt={`${title} screenshot ${active + 1}`}
          loading="lazy"
          className="h-full w-full object-cover object-top transition-opacity duration-500 ease-in-out"
        />
      </div>

      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 z-30 flex -translate-x-1/2 gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show screenshot ${i + 1}`}
              onClick={(e) => {
                e.stopPropagation()
                setActive(i)
              }}
              className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                i === active ? 'bg-accent' : 'bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      )}

      {/* enlarged popup, escapes the card's rounded corners via the parent's
          conditional overflow-visible (see ProjectCard) */}
      <div
        className={`pointer-events-none absolute left-1/2 top-1/2 z-20 w-[300%] max-w-none -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-accent/40 shadow-2xl shadow-black/60 transition-all duration-300 ease-out ${
          isHovered ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
        }`}
        style={{ aspectRatio: '16 / 9' }}
      >
        <img
          src={images[active]}
          alt={`${title} screenshot ${active + 1} enlarged`}
          className="h-full w-full object-cover object-top transition-opacity duration-500 ease-in-out"
        />
      </div>
    </div>
  )
}

function ProjectCard({ project, index }) {
  const [ref, inView] = useReveal({ threshold: 0.15 })
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [glow, setGlow] = useState({ x: 50, y: 50 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    setTilt({ x: (py - 0.5) * -8, y: (px - 0.5) * 8 })
    setGlow({ x: px * 100, y: py * 100 })
  }

  return (
    <article
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        setTilt({ x: 0, y: 0 })
        setIsHovered(false)
      }}
      style={{
        transitionDelay: inView ? `${index * 90}ms` : '0ms',
        transform: inView
          ? `translateY(0) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
          : 'translateY(24px)',
        opacity: inView ? 1 : 0,
      }}
      className={`group relative flex w-full max-w-sm flex-1 flex-col justify-between rounded-2xl border border-line bg-panel p-6 [perspective:900px] transition-all duration-500 ease-out hover:border-accent/50 ${
        isHovered ? 'overflow-visible' : 'overflow-hidden'
      }`}
    >
      {/* cursor-following glow, unique to project cards */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(220px circle at ${glow.x}% ${glow.y}%, rgba(61,255,138,0.08), transparent 70%)`,
        }}
      />
      <div className="relative">
        {project.images && (
          <ProjectThumbnail images={project.images} title={project.title} isHovered={isHovered} />
        )}
        <h3 className="text-lg font-medium text-cream">{project.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">{project.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-line px-3 py-1 text-[11px] text-muted transition-colors duration-300 group-hover:border-accent/40 group-hover:text-cream"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="relative mt-7 flex items-center gap-5 border-t border-line pt-5">
        <a
          href={project.codeUrl}
          aria-label="View source on GitHub"
          className="flex items-center gap-1.5 text-sm font-medium text-muted transition-all duration-300 hover:text-accent"
        >
          <GithubLogo size={18} className="transition-transform duration-300 group-hover:rotate-12" />
          View source
        </a>
      </div>
    </article>
  )
}

function ComingSoonCard({ title, note, index }) {
  const [ref, inView] = useReveal({ threshold: 0.15 })

  return (
    <article
      ref={ref}
      style={{
        transitionDelay: inView ? `${index * 90}ms` : '0ms',
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
        opacity: inView ? 1 : 0,
      }}
      className="group flex w-full max-w-sm flex-1 flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-line bg-panel/40 p-6 text-center transition-all duration-500 ease-out hover:border-accent/50"
    >
      {/* soft pulsing ring around the icon signals "in progress" without being loud */}
      <div className="relative flex h-12 w-12 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-accent/10 animate-pulseRing" />
        <HourglassMedium size={22} className="relative text-accent transition-transform duration-500 group-hover:rotate-180" />
      </div>

      <div>
        <p className="text-base font-medium text-cream">{title}</p>
        <p className="mt-2 text-sm text-muted">{note}</p>
      </div>

      {/* three-dot "working on it" animation */}
      <div className="flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent [animation-delay:-0.3s]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent [animation-delay:-0.15s]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-accent" />
      </div>

      <span className="rounded-full border border-accent/30 px-3 py-1 text-[11px] font-medium tracking-wide text-accent">
        Developing soon
      </span>
    </article>
  )
}

export default function Projects() {
  const [headerRef, headerInView] = useReveal()

  return (
    <section id="projects" className="px-6 py-24 md:px-14 lg:px-20">
      <div
        ref={headerRef}
        className="mb-14 max-w-lg transition-all duration-700 ease-out"
        style={{ opacity: headerInView ? 1 : 0, transform: headerInView ? 'translateY(0)' : 'translateY(16px)' }}
      >
        <h2 className="text-3xl font-semibold text-cream sm:text-4xl">Selected projects</h2>
        <p className="mt-4 text-muted">
          A few builds that show how I move from a data or process problem to a working product.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6">
        {PROJECTS.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
        {COMING_SOON.map((item, index) => (
          <ComingSoonCard key={item.title} {...item} index={PROJECTS.length + index} />
        ))}
      </div>
    </section>
  )
}