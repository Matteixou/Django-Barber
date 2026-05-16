import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

const pillars = [
  { number: '01', title: 'Accueil & confort',       desc: "Dès que vous franchissez la porte, l'ambiance vous enveloppe. Musique, espace soigné, café offert." },
  { number: '02', title: 'Diagnostic personnalisé', desc: "On prend le temps d'échanger sur votre style, votre morphologie et vos envies avant toute coupe." },
  { number: '03', title: 'Exécution impeccable',    desc: "Gestes précis, outils premium, technique maîtrisée. Chaque session est une performance." },
  { number: '04', title: 'Résultat durable',        desc: "On vous donne les clés pour entretenir votre look et rester au top entre chaque session." },
]

export default function Experience() {
  const sectionRef = useRef(null)
  const headerRef  = useRef(null)
  const pillarsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const h2 = headerRef.current.querySelector('h2')
      const split = new SplitType(h2, { types: 'chars' })
      gsap.from(split.chars, {
        opacity: 0, y: 25, stagger: 0.03, duration: 0.65, ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 82%' },
      })
      gsap.from([...headerRef.current.children].filter(el => el !== h2), {
        opacity: 0, y: 20, stagger: 0.1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 82%' },
      })
      gsap.from(pillarsRef.current.children, {
        opacity: 0, y: 40, stagger: 0.12, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: pillarsRef.current, start: 'top 80%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="experience" className="section-pad" style={{ width: '100%', background: '#0a0a0a' }}>
      <div className="wrap">

        <div ref={headerRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <span style={{ display: 'inline-block', width: '28px', height: '1.5px', background: 'rgba(255,255,255,0.2)', flexShrink: 0 }} />
            <span style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>L'expérience Django</span>
            <span style={{ display: 'inline-block', width: '28px', height: '1.5px', background: 'rgba(255,255,255,0.2)', flexShrink: 0 }} />
          </div>
          <h2 className="font-bebas" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: '#fff', letterSpacing: '0.05em', lineHeight: 1 }}>
            Un moment rien
          </h2>
          <p className="font-playfair" style={{ fontStyle: 'italic', fontSize: 'clamp(1.5rem, 4vw, 3rem)', color: 'rgba(255,255,255,0.25)' }}>
            que pour vous.
          </p>
        </div>

        <div ref={pillarsRef} className="grid-pillars">
          {pillars.map(({ number, title, desc }) => (
            <div key={number} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <p className="font-bebas" style={{ fontSize: '3.5rem', color: 'rgba(255,255,255,0.07)', lineHeight: 1, marginBottom: '0.75rem' }}>{number}</p>
              <h3 className="font-bebas" style={{ fontSize: '1rem', color: '#fff', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>{title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.83rem', lineHeight: 1.7 }}>{desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
