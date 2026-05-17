import { useEffect, useRef, Suspense, lazy } from 'react'
import { gsap } from 'gsap'
import { ArrowDown } from 'lucide-react'
import SplitType from 'split-type'
import MagneticButton from './MagneticButton'
import { openCalendly } from '../utils/calendly'
import FloatingParticles from './FloatingParticles'

const Hero3D = lazy(() => import('./Hero3D'))

export default function Hero() {
  const bgTextRef = useRef(null)
  const ctaRef    = useRef(null)
  const labelRef  = useRef(null)
  const statsRef  = useRef(null)

  useEffect(() => {
    const django = new SplitType(bgTextRef.current.children[0], { types: 'chars' })
    const barber = new SplitType(bgTextRef.current.children[1], { types: 'chars' })

    gsap.set(django.chars, { opacity: 0, y: 60, rotateX: -40 })
    gsap.set(barber.chars, { opacity: 0, y: 30, rotateX: -20 })
    gsap.set(labelRef.current, { opacity: 0, x: -20 })
    gsap.set(ctaRef.current, { opacity: 0, y: 20 })
    gsap.set(statsRef.current.children, { opacity: 0, y: 15 })

    const tl = gsap.timeline({ defaults: { ease: 'power3.out', overwrite: 'auto' } })

    tl.to(django.chars,
        { opacity: 1, y: 0, rotateX: 0, duration: 1.1, stagger: 0.045, transformPerspective: 600 },
        0.1)
      .to(barber.chars,
        { opacity: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.06, transformPerspective: 600 },
        0.55)
      .to(labelRef.current, { opacity: 1, x: 0, duration: 0.8 }, 0.5)
      .to(ctaRef.current,   { opacity: 1, y: 0, duration: 0.8 }, 1.0)
      .to(statsRef.current.children, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }, 1.3)

    return () => { tl.kill(); django.revert(); barber.revert() }
  }, [])

  return (
    <section id="hero" style={{
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      background: '#05070D',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      paddingTop: '75px',
    }}>

      {/* ── COUCHE 1 : Texte géant en fond ── */}
      <div ref={bgTextRef} style={{
        position: 'absolute', inset: 0, zIndex: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'none', userSelect: 'none',
        gap: 0,
      }}>
        <h1 className="font-bebas" style={{
          fontSize: 'clamp(7rem, 28vw, 32rem)',
          lineHeight: 0.82,
          letterSpacing: '0.04em',
          color: 'transparent',
          WebkitTextStroke: '3px rgba(255,255,255,0.38)',
          textAlign: 'center',
          whiteSpace: 'nowrap',
        }}>
          DJANGO
        </h1>
        <h2 className="font-bebas" style={{
          fontSize: 'clamp(1.5rem, 6vw, 6rem)',
          lineHeight: 1,
          letterSpacing: '0.55em',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(255,255,255,0.10)',
          textAlign: 'center',
          whiteSpace: 'nowrap',
        }}>
          BARBER
        </h2>
      </div>

      {/* ── Vignette radiale pour profondeur ── */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(5,7,13,0.7) 100%)',
      }} />

      {/* ── Icônes flottantes ── */}
      <FloatingParticles />

      {/* ── COUCHE 2 : Canvas 3D (devant tout) ── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none' }}>
        <Suspense fallback={null}>
          <Hero3D />
        </Suspense>
      </div>

      {/* ── COUCHE 3 : Label haut gauche ── */}
      <div ref={labelRef} style={{
        position: 'absolute', top: '100px', left: '0',
        zIndex: 3,
        display: 'flex', alignItems: 'center', gap: '0.75rem',
        padding: '0 2rem',
      }}>
        <span style={{ width: '28px', height: '1.5px', background: '#3a86ff', display: 'inline-block' }} />
        <span style={{ fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#3a86ff' }}>
          Salon de coiffure — Villejuif
        </span>
      </div>

      {/* ── COUCHE 4 : CTA + Stats en bas ── */}
      <div style={{ position: 'relative', zIndex: 3, padding: '0 0 3.5rem' }}>
        <div className="wrap">

          {/* Ligne séparatrice */}
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', marginBottom: '2rem' }} />

          <div className="hero-bottom-row">

            {/* CTA */}
            <div ref={ctaRef} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <p className="font-playfair" style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.4)', fontSize: '1rem', marginRight: '0.5rem' }}>
                Votre style commence ici.
              </p>
              <MagneticButton>
                <button onClick={openCalendly} style={{
                  display: 'inline-flex', alignItems: 'center',
                  background: '#ffffff', color: '#05070D',
                  padding: '0.8rem 1.9rem', borderRadius: '9999px',
                  fontSize: '0.7rem', fontWeight: 600,
                  letterSpacing: '0.15em', textTransform: 'uppercase',
                  border: 'none', cursor: 'pointer',
                  transition: 'box-shadow 0.3s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 10px 30px rgba(255,255,255,0.2)' }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none' }}
                >
                  Réserver
                </button>
              </MagneticButton>
              <MagneticButton>
                <a href="#gallery" style={{
                  display: 'inline-flex', alignItems: 'center',
                  background: 'transparent', color: '#ffffff',
                  padding: '0.8rem 1.9rem', borderRadius: '9999px',
                  fontSize: '0.7rem', fontWeight: 500,
                  letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none',
                  border: '1.5px solid rgba(255,255,255,0.2)',
                  transition: 'border-color 0.3s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)' }}
                >
                  Galerie
                </a>
              </MagneticButton>
            </div>

            {/* Stats */}
            <div ref={statsRef} style={{ display: 'flex', gap: '2.5rem' }}>
              {[
                { value: '2+',   label: "Ans d'exp." },
                { value: '100+', label: 'Clients' },
                { value: '100%', label: 'Satisfaction' },
              ].map((s) => (
                <div key={s.label} style={{ textAlign: 'center' }}>
                  <p className="font-bebas" style={{ fontSize: '2rem', color: '#fff', letterSpacing: '0.05em', lineHeight: 1 }}>{s.value}</p>
                  <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: '0.2rem' }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem',
        color: 'rgba(255,255,255,0.25)', zIndex: 4,
      }}>
        <span style={{ fontSize: '0.55rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}>Défiler</span>
        <ArrowDown size={13} style={{ animation: 'bounce 1.6s infinite' }} />
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(5px); }
        }
      `}</style>
    </section>
  )
}
