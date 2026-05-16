import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Scissors, Zap, Star, Sparkles, MessageCircle, TrendingUp } from 'lucide-react'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

const services = [
  { icon: Scissors,      title: 'Coupe de précision',    desc: 'Chaque ligne travaillée avec une rigueur absolue. La précision est notre signature.' },
  { icon: Zap,           title: 'Dégradés & Fades',      desc: 'Du skin fade au taper, nos dégradés sont nets, propres et parfaitement exécutés.' },
  { icon: Star,          title: 'Taille de barbe',        desc: 'Contours nets, volumes travaillés pour un rendu impeccable et masculin.' },
  { icon: Sparkles,      title: 'Styling & Finitions',    desc: 'Produits premium, brushing maîtrisé, finitions soignées pour sublimer votre coiffure.' },
  { icon: MessageCircle, title: 'Conseils personnalisés', desc: 'On prend le temps de comprendre votre style pour un résultat sur-mesure.' },
  { icon: TrendingUp,    title: 'Tendances modernes',     desc: 'Toujours à la pointe des tendances masculines pour un look contemporain.' },
]

function tilt3D(el, e) {
  const rect = el.getBoundingClientRect()
  const rotX = (((e.clientY - rect.top)  / rect.height) - 0.5) * -16
  const rotY = (((e.clientX - rect.left) / rect.width)  - 0.5) *  16
  gsap.to(el, { rotateX: rotX, rotateY: rotY, scale: 1.03, duration: 0.3, ease: 'power2.out', transformPerspective: 800 })
}

function resetTilt(el) {
  gsap.to(el, { rotateX: 0, rotateY: 0, scale: 1, duration: 0.5, ease: 'power3.out' })
}

function handleSkillMove(e)  { tilt3D(e.currentTarget, e) }

function handleSkillEnter(e) {
  const wrap = e.currentTarget.querySelector('.icon-wrap')
  wrap.style.background = '#fff'
  wrap.style.color = '#0a0a0a'
  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'
  e.currentTarget.style.boxShadow  = '0 8px 40px rgba(255,255,255,0.05)'
}

function handleSkillLeave(e) {
  resetTilt(e.currentTarget)
  const wrap = e.currentTarget.querySelector('.icon-wrap')
  wrap.style.background = 'rgba(255,255,255,0.08)'
  wrap.style.color = '#fff'
  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
  e.currentTarget.style.boxShadow  = 'none'
}

export default function Skills() {
  const sectionRef = useRef(null)
  const headerRef  = useRef(null)
  const gridRef    = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const h2 = headerRef.current.querySelector('h2')
      const split = new SplitType(h2, { types: 'chars' })
      gsap.from(split.chars, {
        opacity: 0, y: 25, stagger: 0.025, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 82%' },
      })
      gsap.from([...headerRef.current.children].filter(el => el !== h2), {
        opacity: 0, y: 20, stagger: 0.1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 82%' },
      })
      gsap.from(gridRef.current.children, {
        opacity: 0, y: 50, scale: 0.95, stagger: 0.08, duration: 0.8, ease: 'back.out(1.4)',
        scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="skills" className="section-pad" style={{ width: '100%', background: '#0a0a0a' }}>
      <div className="wrap">

        <div ref={headerRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <span style={{ display: 'inline-block', width: '28px', height: '1.5px', background: 'rgba(255,255,255,0.2)', flexShrink: 0 }} />
            <span style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>Nos expertises</span>
            <span style={{ display: 'inline-block', width: '28px', height: '1.5px', background: 'rgba(255,255,255,0.2)', flexShrink: 0 }} />
          </div>
          <h2 className="font-bebas" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: '#fff', letterSpacing: '0.05em', lineHeight: 1 }}>
            Le talent au service
          </h2>
          <p className="font-playfair" style={{ fontStyle: 'italic', fontSize: 'clamp(1.5rem, 4vw, 3rem)', color: 'rgba(255,255,255,0.25)' }}>
            du style.
          </p>
        </div>

        <div ref={gridRef} className="grid-skills">
          {services.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              style={{
                padding: '1.75rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
                cursor: 'default', transformStyle: 'preserve-3d', willChange: 'transform',
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '1rem', transition: 'border-color 0.3s, box-shadow 0.3s',
              }}
              onMouseMove={handleSkillMove}
              onMouseEnter={handleSkillEnter}
              onMouseLeave={handleSkillLeave}
            >
              <div className="icon-wrap" style={{
                width: '44px', height: '44px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '1.25rem', color: '#fff',
                transition: 'background 0.3s, color 0.3s',
              }}>
                <Icon size={18} />
              </div>
              <h3 className="font-bebas" style={{ fontSize: '1.2rem', letterSpacing: '0.08em', color: '#fff', marginBottom: '0.5rem' }}>
                {title}
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem', lineHeight: 1.7 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
