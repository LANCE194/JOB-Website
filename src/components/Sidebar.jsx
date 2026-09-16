import {
  HouseSimple,
  Stack,
  Wrench,
  UserCircle,
  EnvelopeSimple,
  GithubLogo,
  LinkedinLogo,
  FacebookLogo,
} from '@phosphor-icons/react'

const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: HouseSimple },
  { id: 'projects', label: 'Projects', icon: Stack },
  { id: 'services', label: 'Services', icon: Wrench },
  { id: 'about', label: 'About', icon: UserCircle },
  { id: 'contact', label: 'Contact', icon: EnvelopeSimple },
]

// EDIT: replace these href values with your real profile URLs
const SOCIALS = [
  { name: 'GitHub', href: 'https://github.com/LANCE194', icon: GithubLogo },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/val-wenie-macua-43b912343/', icon: LinkedinLogo },
  { name: 'Facebook', href: 'https://www.facebook.com/ramsta.fast22', icon: FacebookLogo },
]

export default function Sidebar({ active, onNavigate }) {
  return (
    // "group/side" is the hover trigger for the whole rail — hovering anywhere
    // on it widens the aside and reveals labels/names. Move away and it snaps
    // back to icons-only. EDIT: change `w-20`/`hover:w-56` to resize either state.
    <aside className="group/side fixed left-0 top-0 z-40 hidden h-screen w-20 flex-col items-center justify-between overflow-hidden border-r border-line bg-ink/95 py-8 backdrop-blur transition-[width] duration-300 ease-out hover:w-56 md:flex">
      {/* Profile mark — monogram + full name, name reveals with the rail */}
      <div className="flex w-full items-center gap-3 px-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/40 text-sm font-semibold tracking-wide text-accent transition-transform duration-500 hover:rotate-[360deg]">
          VM
        </div>
        {/* EDIT: this is your display name — update it if it ever changes */}
        <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium text-cream opacity-0 transition-all duration-300 group-hover/side:max-w-[160px] group-hover/side:opacity-100">
          Val Wenie B. Macua
        </span>
      </div>

      {/* Primary navigation */}
      <nav className="flex w-full flex-col items-stretch gap-2 px-3">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
          const isActive = active === id
          return (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              aria-current={isActive ? 'page' : undefined}
              className="group relative flex w-full items-center gap-3 rounded-2xl px-3 py-3 transition-colors duration-300"
            >
              {/* active pill background grows in from center, spans the full row */}
              <span
                className={`absolute inset-0 rounded-2xl bg-accent/10 transition-transform duration-300 ease-out ${
                  isActive ? 'scale-100' : 'scale-0 group-hover:scale-100'
                }`}
              />
              <span
                className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                  isActive
                    ? 'animate-pulseRing text-accent drop-shadow-[0_0_6px_rgba(61,255,138,0.65)]'
                    : 'text-muted group-hover:scale-110 group-hover:text-cream'
                }`}
              >
                <Icon size={20} weight={isActive ? 'fill' : 'regular'} />
              </span>
              {/* label stays width-0/invisible until the rail itself is hovered */}
              <span
                className={`relative max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium tracking-wide opacity-0 transition-all duration-300 group-hover/side:max-w-[120px] group-hover/side:opacity-100 ${
                  isActive ? 'text-accent' : 'text-muted group-hover:text-cream'
                }`}
              >
                {label}
              </span>
            </button>
          )
        })}
      </nav>

      {/* Social links — icon + name, name reveals with the rail just like nav items */}
      <div className="flex w-full flex-col items-stretch gap-1 px-3">
        {SOCIALS.map(({ name, href, icon: Icon }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="group flex items-center gap-3 rounded-xl px-3 py-2 text-muted transition-colors duration-300 hover:bg-accent/10 hover:text-accent"
            aria-label={name}
          >
            <Icon
              size={18}
              className="shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:rotate-6 group-hover:scale-110"
            />
            <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium opacity-0 transition-all duration-300 group-hover/side:max-w-[120px] group-hover/side:opacity-100">
              {name}
            </span>
          </a>
        ))}
      </div>
    </aside>
  )
}