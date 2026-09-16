import { HouseSimple, Stack, Wrench, UserCircle, EnvelopeSimple } from '@phosphor-icons/react'

const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: HouseSimple },
  { id: 'projects', label: 'Projects', icon: Stack },
  { id: 'services', label: 'Services', icon: Wrench },
  { id: 'about', label: 'About', icon: UserCircle },
  { id: 'contact', label: 'Contact', icon: EnvelopeSimple },
]

export default function MobileNav({ active, onNavigate }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t border-line bg-ink/95 py-2 backdrop-blur md:hidden">
      {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
        const isActive = active === id
        return (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className="flex flex-col items-center gap-1 px-2 py-1 transition-transform duration-300"
          >
            <Icon
              size={20}
              weight={isActive ? 'fill' : 'regular'}
              className={`transition-transform duration-300 ${isActive ? 'scale-110 text-accent' : 'text-muted'}`}
            />
            <span className={`text-[9px] ${isActive ? 'text-accent' : 'text-muted'}`}>{label}</span>
          </button>
        )
      })}
    </nav>
  )
}