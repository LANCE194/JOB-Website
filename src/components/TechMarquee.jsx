import {
  GithubLogo,
  Code,
  CloudCheck,
  Sparkle,
  ChatCircleDots,
  Robot,
  FigmaLogo,
  Database,
} from '@phosphor-icons/react'

// Generic icon + label pairs rather than reproduced brand marks —
// keeps the strip legally clean while still reading as "the tools Val uses".
const TOOLS = [
  { name: 'GitHub', icon: GithubLogo },
  { name: 'VS Code', icon: Code },
  { name: 'Claude', icon: Sparkle },
  { name: 'ChatGPT', icon: ChatCircleDots },
  { name: 'Gemini', icon: Robot },
  { name: 'Cloud Hosting', icon: CloudCheck },
  { name: 'Figma', icon: FigmaLogo },
  { name: 'SQL / NoSQL', icon: Database },
]

function Track({ ariaHidden = false }) {
  return (
    <div className="flex shrink-0 items-center gap-12 pr-12" aria-hidden={ariaHidden}>
      {TOOLS.map(({ name, icon: Icon }) => (
        <div key={name} className="group flex items-center gap-3 text-muted">
          <Icon
            size={22}
            className="text-accent transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-125"
          />
          <span className="whitespace-nowrap text-sm font-medium tracking-wide transition-colors duration-300 group-hover:text-cream">
            {name}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function TechMarquee() {
  return (
    <div className="group/marquee relative overflow-hidden border-y border-line py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-ink to-transparent" />
      {/* pauses the slide while a viewer is scanning the strip for a specific tool */}
      <div className="flex w-max animate-marquee [animation-play-state:running] group-hover/marquee:[animation-play-state:paused]">
        <Track />
        <Track ariaHidden />
      </div>
    </div>
  )
}