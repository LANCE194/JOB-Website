import { useEffect, useRef, useState } from 'react'

// EDIT: tweak `threshold` (0–1) to control how much of an element must be
// visible before it animates in, or `once` to false to re-trigger every time
// the element re-enters the viewport.
export default function useReveal({ threshold = 0.2, once = true } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.unobserve(node)
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, once])

  return [ref, inView]
}