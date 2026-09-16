import { Code, ChartBar, Headset, FileText, GlobeSimple } from '@phosphor-icons/react'
import useReveal from '../hooks/useReveal'

// EDIT: adjust these to match the services you actually offer.
const SERVICES = [
  {
    icon: Code,
    title: 'Web Development',
    description: 'Full-stack builds from database design to a polished, responsive front end.',
  },
  {
    icon: ChartBar,
    title: 'Data Analysis',
    description: 'Cleaning, structuring, and visualizing data so it actually informs decisions.',
  },
  {
    icon: Headset,
    title: 'Technical Support',
    description: 'Diagnosing issues and keeping systems running for non-technical teams.',
  },
  {
    icon: FileText,
    title: 'Document Control',
    description: 'Organizing and standardizing records and workflows for accuracy and audit-readiness.',
  },
  {
    icon: GlobeSimple,
    title: 'Virtual Assistance',
    description: 'Remote operational support — scheduling, research, and process coordination.',
  },
]

function ServiceCard({ icon: Icon, title, description, index }) {
  const [ref, inView] = useReveal({ threshold: 0.2 })
  return (
    <div
      ref={ref}
      style={{
        transitionDelay: inView ? `${index * 80}ms` : '0ms',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
      }}
      className="group rounded-2xl border border-line bg-panel p-6 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-[0_16px_40px_-20px_rgba(61,255,138,0.35)]"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/10 text-accent transition-all duration-500 group-hover:rotate-[360deg] group-hover:bg-accent group-hover:text-ink">
        <Icon size={20} />
      </div>
      <h3 className="mt-5 text-base font-medium text-cream">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
    </div>
  )
}

export default function Services() {
  const [headerRef, headerInView] = useReveal()

  return (
    <section id="services" className="px-6 py-24 md:px-14 lg:px-20">
      <div
        ref={headerRef}
        className="mb-14 max-w-lg transition-all duration-700 ease-out"
        style={{ opacity: headerInView ? 1 : 0, transform: headerInView ? 'translateY(0)' : 'translateY(16px)' }}
      >
        <h2 className="text-3xl font-semibold text-cream sm:text-4xl">What I offer</h2>
        <p className="mt-4 text-muted">
          Freelance work spanning the full path from raw data and rough process to a working system.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service, index) => (
          <ServiceCard key={service.title} {...service} index={index} />
        ))}
      </div>
    </section>
  )
}