import { useState } from 'react'
import { EnvelopeSimple, Phone, MapPin, PaperPlaneTilt, CheckCircle } from '@phosphor-icons/react'
import useReveal from '../hooks/useReveal'

export default function Contact() {
  const [leftRef, leftInView] = useReveal()
  const [formRef, formInView] = useReveal()
  const [sent, setSent] = useState(false)

  // EDIT: this form has no backend yet — wire this handler to Formspree, EmailJS,
  // or your own API endpoint. Right now it just plays a confirmation animation.
  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 3200)
  }

  return (
    <section id="contact" className="px-6 py-24 md:px-14 lg:px-20">
      <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div
          ref={leftRef}
          className="transition-all duration-700 ease-out"
          style={{ opacity: leftInView ? 1 : 0, transform: leftInView ? 'translateY(0)' : 'translateY(18px)' }}
        >
          <h2 className="text-3xl font-semibold text-cream sm:text-4xl">Let's work together</h2>
          <p className="mt-4 max-w-sm text-muted">
            Open to freelance projects and full-time roles in web development or data analysis.
          </p>

          <div className="mt-10 space-y-5">
            <div className="group flex items-center gap-3 text-sm">
              <EnvelopeSimple size={18} className="text-accent transition-transform duration-300 group-hover:scale-110" />
              {/* EDIT: replace with your real email address */}
              <a href="mailto:val.macua@example.com" className="text-cream transition-colors hover:text-accent">
                val.macua@example.com
              </a>
            </div>
            <div className="group flex items-center gap-3 text-sm">
              <Phone size={18} className="text-accent transition-transform duration-300 group-hover:scale-110" />
              {/* EDIT: replace with your real phone number, or remove this line */}
              <a href="tel:+639000000000" className="text-cream transition-colors hover:text-accent">
                +63 900 000 0000
              </a>
            </div>
            <div className="group flex items-center gap-3 text-sm">
              <MapPin size={18} className="text-accent transition-transform duration-300 group-hover:scale-110" />
              <span className="text-cream">Iligan City, Mindanao, Philippines</span>
            </div>
          </div>
        </div>

        {/* EDIT: this form has no backend yet — wire it to Formspree, EmailJS, or your own API endpoint */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="relative overflow-hidden rounded-2xl border border-line bg-panel p-7 transition-all duration-700 ease-out"
          style={{ opacity: formInView ? 1 : 0, transform: formInView ? 'translateY(0)' : 'translateY(18px)' }}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-xs text-muted">
              Name
              <input
                type="text"
                name="name"
                required
                className="rounded-lg border border-line bg-ink px-4 py-3 text-sm text-cream outline-none transition-all duration-300 focus:border-accent focus:shadow-[0_0_0_3px_rgba(61,255,138,0.12)]"
                placeholder="Your name"
              />
            </label>
            <label className="flex flex-col gap-2 text-xs text-muted">
              Email
              <input
                type="email"
                name="email"
                required
                className="rounded-lg border border-line bg-ink px-4 py-3 text-sm text-cream outline-none transition-all duration-300 focus:border-accent focus:shadow-[0_0_0_3px_rgba(61,255,138,0.12)]"
                placeholder="you@example.com"
              />
            </label>
          </div>
          <label className="mt-5 flex flex-col gap-2 text-xs text-muted">
            Message
            <textarea
              name="message"
              required
              rows={5}
              className="resize-none rounded-lg border border-line bg-ink px-4 py-3 text-sm text-cream outline-none transition-all duration-300 focus:border-accent focus:shadow-[0_0_0_3px_rgba(61,255,138,0.12)]"
              placeholder="Tell me about your project"
            />
          </label>

          {/* Button 4: icon-reveal slide, distinct from the other three */}
          <button
            type="submit"
            disabled={sent}
            className="group relative mt-6 flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-accent py-3 text-sm font-semibold text-ink transition-transform duration-300 active:scale-[0.98] disabled:opacity-90"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-3">
              {sent ? 'Sent!' : 'Send message'}
            </span>
            {!sent && (
              <PaperPlaneTilt
                size={16}
                className="absolute right-8 translate-x-6 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
              />
            )}
          </button>

          {/* Confirmation toast — pops in over the form after submit */}
          {sent && (
            <div className="absolute inset-x-7 bottom-[4.5rem] flex items-center gap-2 rounded-lg border border-accent/40 bg-ink/95 px-4 py-3 text-sm text-cream animate-popIn">
              <CheckCircle size={18} weight="fill" className="text-accent" />
              Message captured — connect a backend to actually deliver it.
            </div>
          )}
        </form>
      </div>

      <footer className="mt-24 border-t border-line pt-8 text-center text-xs text-muted">
        © {new Date().getFullYear()} Val Wenie B. Macua. Built with React &amp; Tailwind CSS.
      </footer>
    </section>
  )
}