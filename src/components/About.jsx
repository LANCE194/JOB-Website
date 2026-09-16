import { GraduationCap, MapPin, Briefcase } from '@phosphor-icons/react'
import useReveal from '../hooks/useReveal'

const CARDS = [
  { icon: GraduationCap, title: 'Education', body: 'B.S. Computer Science, Batch 2026', span: '' },
  { icon: MapPin, title: 'Location', body: 'Iligan City, Mindanao, Philippines', span: '' },
  {
    icon: Briefcase,
    title: 'Freelance experience',
    body: 'Technical support · Data entry · Virtual assistance · Web development · Document control',
    span: 'sm:col-span-2',
  },
]

function InfoCard({ icon: Icon, title, body, span, index }) {
  const [ref, inView] = useReveal({ threshold: 0.2 })
  return (
    <div
      ref={ref}
      style={{
        transitionDelay: inView ? `${index * 90}ms` : '0ms',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateX(0)' : 'translateX(20px)',
      }}
      className={`group rounded-2xl border border-line bg-panel p-6 transition-all duration-500 ease-out hover:-translate-y-1 hover:border-accent/50 ${span}`}
    >
      <Icon size={22} className="text-accent transition-transform duration-300 group-hover:scale-110" />
      <p className="mt-4 text-sm font-medium text-cream">{title}</p>
      <p className="mt-1 text-sm text-muted">{body}</p>
    </div>
  )
}

export default function About() {
  const [textRef, textInView] = useReveal()

  return (
    <section id="about" className="px-6 py-24 md:px-14 lg:px-20">
      <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div
          ref={textRef}
          className="transition-all duration-700 ease-out"
          style={{ opacity: textInView ? 1 : 0, transform: textInView ? 'translateY(0)' : 'translateY(18px)' }}
        >
          <h2 className="text-3xl font-semibold text-cream sm:text-4xl">About Val</h2>
          {/* EDIT: rewrite this bio in your own words */}
          <p className="mt-6 max-w-md text-muted leading-relaxed">
            I'm a freelance software developer and recent Computer Science graduate based in
            Iligan City, Mindanao. My work has ranged across technical support, data entry,
            virtual assistance, web development, and document control — which means I'm
            comfortable moving between the technical and operational sides of a project.
          </p>
          <p className="mt-4 max-w-md text-muted leading-relaxed">
            I like problems where messy data or a manual process is standing between a team and
            a clear decision — and building the tool that removes that friction.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {CARDS.map((card, index) => (
            <InfoCard key={card.title} {...card} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}