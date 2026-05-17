import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import FloatingParticles from './FloatingParticles'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { value: 2,   suffix: '+', label: "Ans d'expérience", decimals: 0 },
  { value: 100, suffix: '+', label: 'Clients satisfaits', decimals: 0 },
  { value: 100, suffix: '%', label: 'Sans compromis',    decimals: 0 },
]

export default function Stats() {
  const sectionRef = useRef(null)
  const numRefs    = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      STATS.forEach((stat, i) => {
        const el = numRefs.current[i]
        if (!el) return
        const obj = { val: 0 }
        gsap.to(obj, {
          val: stat.value,
          delay: i * 0.12,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
          onUpdate() {
            el.textContent = (stat.decimals
              ? obj.val.toFixed(stat.decimals)
              : Math.round(obj.val)
            ) + stat.suffix
          },
        })
      })

      gsap.from(sectionRef.current.querySelectorAll('.stat-item'), {
        opacity: 0, y: 20, stagger: 0.1, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} style={{
      width: '100%', background: '#0a0a0a',
      padding: '4.5rem 0',
      borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)',
      position: 'relative', overflow: 'hidden',
    }}>
      <FloatingParticles count={20} />
      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
        <div className="grid-stats">
          {STATS.map((stat, i) => (
            <div key={stat.label} className="stat-item" style={{ textAlign: 'center' }}>
              <p
                ref={el => { numRefs.current[i] = el }}
                className="font-bebas"
                style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', color: '#fff', lineHeight: 1, letterSpacing: '0.02em' }}
              >
                0{stat.suffix}
              </p>
              <div style={{ width: '24px', height: '1.5px', background: 'rgba(255,255,255,0.2)', margin: '0.75rem auto 0.5rem' }} />
              <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
