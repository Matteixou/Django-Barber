import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check } from 'lucide-react'
import SplitType from 'split-type'
import { openCalendly } from '../utils/calendly'

gsap.registerPlugin(ScrollTrigger)

const CARD_MAIN = {
  name: 'Coupe + Barbe',
  price: 10,
  desc: 'Le combo complet pour un look entièrement soigné.',
  includes: [
    'Consultation personnalisée',
    'Coupe & dégradé maîtrisé',
    'Barbe façonnée & rasée',
    'Finitions & styling offert',
  ],
}

const CARD_DEVIS = {
  name: 'Autre prestation',
  desc: "Expliquez votre demande lors de la réservation sur Calendly — on établit le devis ensemble.",
  includes: [
    'Coupe enfant',
    'Événement ou shooting',
    'Prestation sur-mesure',
  ],
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
        opacity: 0, y: 40, stagger: 0.15, duration: 0.8, ease: 'back.out(1.2)',
        scrollTrigger: { trigger: cardsRef.current, start: 'top 82%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="tarifs" className="section-pad" style={{ width: '100%', background: '#fafafa' }}>
      <div className="wrap">

        {/* Header */}
        <div ref={headerRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <span className="accent-line" />
            <span className="section-label">Nos tarifs</span>
            <span className="accent-line" />
          </div>
          <h2 className="font-bebas" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: '#0a0a0a', letterSpacing: '0.05em', lineHeight: 1 }}>
            Prix clairs,
          </h2>
          <p className="font-playfair" style={{ fontStyle: 'italic', fontSize: 'clamp(1.5rem, 4vw, 3rem)', color: '#bbb' }}>
            sans surprise.
          </p>
        </div>

        {/* Cards */}
        <div ref={cardsRef} className="grid-pricing-2">

          {/* Carte principale — fond sombre pour contraster avec la section blanche */}
          <div style={{
            borderRadius: '1.25rem', padding: '2.25rem',
            background: '#0a0a0a', position: 'relative',
            display: 'flex', flexDirection: 'column', gap: '1.25rem',
            boxShadow: '0 24px 64px rgba(0,0,0,0.18)',
          }}>
            <div style={{
              position: 'absolute', top: '-13px', left: '50%', transform: 'translateX(-50%)',
              background: '#fff', color: '#0a0a0a',
              fontSize: '0.52rem', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase',
              padding: '0.3rem 0.9rem', borderRadius: '9999px',
              border: '1px solid rgba(0,0,0,0.1)',
              whiteSpace: 'nowrap',
            }}>
              Le plus populaire
            </div>

            <div>
              <p style={{ fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: '0.4rem' }}>Prestation</p>
              <p className="font-bebas" style={{ fontSize: '1.7rem', letterSpacing: '0.08em', lineHeight: 1, color: '#fff' }}>{CARD_MAIN.name}</p>
              <p style={{ fontSize: '0.82rem', lineHeight: 1.6, marginTop: '0.4rem', color: 'rgba(255,255,255,0.45)' }}>{CARD_MAIN.desc}</p>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.1rem', lineHeight: 1 }}>
              <span className="font-bebas" style={{ fontSize: '5rem', letterSpacing: '0.02em', color: '#fff' }}>{CARD_MAIN.price}</span>
              <span className="font-bebas" style={{ fontSize: '2.2rem', marginTop: '0.6rem', color: 'rgba(255,255,255,0.35)' }}>€</span>
            </div>

            <div style={{ height: '1px', background: 'rgba(255,255,255,0.1)' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', flex: 1 }}>
              {CARD_MAIN.includes.map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <div style={{ width: '18px', height: '18px', borderRadius: '50%', flexShrink: 0, background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Check size={10} color="#fff" strokeWidth={3} />
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>{item}</p>
                </div>
              ))}
            </div>

            <button
              onClick={openCalendly}
              style={{
                width: '100%', padding: '0.9rem',
                borderRadius: '9999px',
                border: '1.5px solid #fff',
                background: '#fff', color: '#0a0a0a',
                fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase',
                cursor: 'pointer', transition: 'background 0.3s, color 0.3s, transform 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#0a0a0a'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              Réserver
            </button>
          </div>

          {/* Carte devis — fond clair avec bordure */}
          <div
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#0a0a0a'; gsap.to(e.currentTarget, { y: -4, duration: 0.3 }) }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#e8e8e8'; gsap.to(e.currentTarget, { y: 0, duration: 0.4 }) }}
            style={{
              borderRadius: '1.25rem', padding: '2.25rem',
              background: '#fff',
              border: '1px solid #e8e8e8',
              display: 'flex', flexDirection: 'column', gap: '1.25rem',
              transition: 'border-color 0.3s',
            }}
          >
            <div>
              <p style={{ fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#bbb', marginBottom: '0.4rem' }}>Prestation</p>
              <p className="font-bebas" style={{ fontSize: '1.7rem', letterSpacing: '0.08em', lineHeight: 1, color: '#0a0a0a' }}>{CARD_DEVIS.name}</p>
              <p style={{ fontSize: '0.82rem', lineHeight: 1.6, marginTop: '0.4rem', color: '#999' }}>{CARD_DEVIS.desc}</p>
            </div>

            <div style={{ lineHeight: 1 }}>
              <span className="font-bebas" style={{ fontSize: '5rem', letterSpacing: '0.02em', color: '#0a0a0a' }}>Devis</span>
            </div>

            <div style={{ height: '1px', background: '#f0f0f0' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', flex: 1 }}>
              {CARD_DEVIS.includes.map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <div style={{ width: '18px', height: '18px', borderRadius: '50%', flexShrink: 0, background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Check size={10} color="#0a0a0a" strokeWidth={3} />
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#666' }}>{item}</p>
                </div>
              ))}
            </div>

            <button
              onClick={openCalendly}
              style={{
                width: '100%', padding: '0.9rem',
                borderRadius: '9999px',
                border: '1.5px solid #0a0a0a',
                background: 'transparent', color: '#0a0a0a',
                fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase',
                cursor: 'pointer', transition: 'background 0.3s, color 0.3s, transform 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#0a0a0a'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#0a0a0a'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              Nous contacter
            </button>
          </div>
        </div>

        <p style={{ textAlign: 'center', color: '#ccc', fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: '2rem' }}>
          Paiement en espèces ou par carte
        </p>
      </div>
    </section>
  )
}
