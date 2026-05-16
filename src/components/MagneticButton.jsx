import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

export default function MagneticButton({ children, strength = 0.38 }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(hover: none)').matches) return

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const dx   = e.clientX - (rect.left + rect.width  / 2)
      const dy   = e.clientY - (rect.top  + rect.height / 2)
      gsap.to(el, { x: dx * strength, y: dy * strength, duration: 0.4, ease: 'power2.out' })
    }

    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.35)' })
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [strength])

  return (
    <span ref={ref} style={{ display: 'inline-block' }}>
      {children}
    </span>
  )
}
