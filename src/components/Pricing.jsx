import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check } from 'lucide-react'
import SplitType from 'split-type'
import { openCalendly } from '../utils/calendly'

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  {
    name: 'Barbe',
    price: 7,
    desc: 'Taille et façonnage pour un rendu impeccable.',
    includes: ['Contour & rasage de précision', 'Finitions au rasoir', 'Soin après rasage'],
    highlight: false,
  },
  {
    name: 'Coupe',
    price: 10,
    desc: 'Coupe sur-mesure adaptée à votre morphologie.',
    includes: ['Consultation personnalisée', 'Coupe & dégradé', 'Finitions & styling'],
    highlight: true,
  },
  {
    name: 'Coupe + Barbe',
    price: 15,
    desc: 'Le combo complet pour un look entièrement soigné.',
    includes: ['Tout inclus coupe', 'Tout inclus barbe', 'Produit styling offert'],
    highlight: false,
  },
]

function handleCardEnter(e, highlight) {
  if (highlight) return
  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'
  e.currentTarget.style.boxShadow   = '0 12px 40px rgba(0,0,0,0.4)'
  gsap.to(e.currentTarget, { y: -4, duration: 0.3 })
}

function handleCardLeave(e, highlight) {
  if (highlight) return
  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
  e.currentTarget.style.boxShadow   = 'none'
  gsap.to(e.currentTarget, { y: 0, duration: 0.4 })
}

export default function Pricing() {
  const sectionRef = useRef(null)
  const headerRef  = useRef(null)
  const cardsRef   = useRef(null)

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
      gsap.from(cardsRef.current.children, {
        opacity: 0, y: 40, stagger: 0.12, duration: 0.8, ease: 'back.out(1.2)',
        scrollTrigger: { trigger: cardsRef.current, start: 'top 82%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="tarifs" className="section-pad" style={{ width: '100%', background: '#0a0a0a' }}>
      <div className="wrap">

        <div ref={headerRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <span style={{ display: 'inline-block', width: '28px', height: '1.5px', background: 'rgba(255,255,255,0.2)', flexShrink: 0 }} />
            <span style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>Nos tarifs</span>
            <span style={{ display: 'inline-block', width: '28px', height: '1.5px', background: 'rgba(255,255,255,0.2)', flexShrink: 0 }} />
          </div>
          <h2 className="font-bebas" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: '#fff', letterSpacing: '0.05em', lineHeight: 1 }}>
            Prix clairs,
          </h2>
          <p className="font-playfair" style={{ fontStyle: 'italic', fontSize: 'clamp(1.5rem, 4vw, 3rem)', color: 'rgba(255,255,255,0.25)' }}>
            sans surprise.
          </p>
        </div>

        <div ref={cardsRef} className="grid-pricing">
          {SERVICES.map(({ name, price, desc, includes, highlight }) => (
            <div
              key={name}
              onMouseEnter={e => handleCardEnter(e, highlight)}
              onMouseLeave={e => handleCardLeave(e, highlight)}
              style={{
                borderRadius: '1.25rem',
                padding: '2rem',
                display: 'flex', flexDirection: 'column', gap: '1.25rem',
                background:   highlight ? '#fff'                      : 'rgba(255,255,255,0.04)',
                border:       highlight ? 'none'                      : '1px solid rgba(255,255,255,0.1)',
                boxShadow:    highlight ? '0 20px 60px rgba(0,0,0,0.5)' : 'none',
                transition: 'border-color 0.3s, box-shadow 0.3s',
                position: 'relative',
              }}
            >
              {highlight && (
                <div style={{
                  position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)',
                  background: '#0a0a0a', color: '#fff',
                  fontSize: '0.52rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase',
                  padding: '0.3rem 0.9rem', borderRadius: '9999px',
                  border: '1px solid rgba(255,255,255,0.15)',
                }}>
                  Le plus populaire
                </div>
              )}

              {/* Header */}
              <div>
                <p style={{
                  fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.22em',
                  textTransform: 'uppercase', marginBottom: '0.5rem',
                  color: highlight ? '#bbb' : 'rgba(255,255,255,0.3)',
                }}>
                  Prestation
                </p>
                <p className="font-bebas" style={{
                  fontSize: '1.6rem', letterSpacing: '0.08em', lineHeight: 1,
                  color: highlight ? '#0a0a0a' : '#fff',
                }}>
                  {name}
                </p>
                <p style={{
                  fontSize: '0.82rem', lineHeight: 1.6, marginTop: '0.4rem',
                  color: highlight ? '#999' : 'rgba(255,255,255,0.4)',
                }}>
                  {desc}
                </p>
              </div>

              {/* Price */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.15rem', lineHeight: 1 }}>
                <span className="font-bebas" style={{
                  fontSize: '4.5rem', letterSpacing: '0.02em',
                  color: highlight ? '#0a0a0a' : '#fff',
                }}>
                  {price}
                </span>
                <span className="font-bebas" style={{
                  fontSize: '2rem', marginTop: '0.55rem',
                  color: highlight ? '#ccc' : 'rgba(255,255,255,0.35)',
                }}>
                  €
                </span>
              </div>

              {/* Divider */}
              <div style={{ height: '1px', background: highlight ? '#f0f0f0' : 'rgba(255,255,255,0.08)' }} />

              {/* Includes */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', flex: 1 }}>
                {includes.map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <div style={{
                      width: '18px', height: '18px', borderRadius: '50%', flexShrink: 0,
                      background: highlight ? '#f5f5f5' : 'rgba(255,255,255,0.1)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Check size={10} color={highlight ? '#0a0a0a' : '#fff'} strokeWidth={3} />
                    </div>
                    <p style={{
                      fontSize: '0.8rem',
                      color: highlight ? '#666' : 'rgba(255,255,255,0.55)',
                    }}>
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button
                onClick={openCalendly}
                style={{
                  width: '100%', padding: '0.85rem',
                  borderRadius: '9999px',
                  fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase',
                  border: highlight ? 'none' : '1.5px solid rgba(255,255,255,0.2)',
                  background: highlight ? '#0a0a0a' : 'transparent',
                  color: highlight ? '#fff' : 'rgba(255,255,255,0.6)',
                  cursor: 'pointer',
                  transition: 'opacity 0.3s, transform 0.3s, border-color 0.3s, color 0.3s',
                }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1';    e.currentTarget.style.transform = 'translateY(0)' }}
              >
                Réserver
              </button>
            </div>
          ))}
        </div>

        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.2)', fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: '2rem' }}>
          Paiement en espèces ou par carte
        </p>
      </div>
    </section>
  )
}
