import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef  = useRef(null)
  const imgRef      = useRef(null)
  const imgInnerRef = useRef(null)
  const textRef     = useRef(null)
  const headerRef   = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Titre split lettre par lettre
      const h2 = headerRef.current.querySelector('h2')
      const split = new SplitType(h2, { types: 'chars' })
      gsap.from(split.chars, {
        opacity: 0, y: 30, rotateX: -20, stagger: 0.03, duration: 0.7, ease: 'power3.out',
        transformPerspective: 500,
        scrollTrigger: { trigger: headerRef.current, start: 'top 82%' },
      })
      // Reste du header
      gsap.from([...headerRef.current.children].filter(el => el !== h2), {
        opacity: 0, y: 20, stagger: 0.1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 82%' },
      })

      // Image : révélation clip-path de gauche à droite
      gsap.fromTo(imgRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 1.2, ease: 'power3.inOut',
          scrollTrigger: { trigger: imgRef.current, start: 'top 80%' } }
      )

      // Parallax sur l'image interne
      gsap.to(imgInnerRef.current, {
        yPercent: -12, ease: 'none',
        scrollTrigger: { trigger: imgRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
      })

      // Texte slide depuis la droite, ligne par ligne
      gsap.from(textRef.current.children, {
        opacity: 0, x: 50, stagger: 0.1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: textRef.current, start: 'top 80%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="section-pad" style={{ width: '100%', background: '#fafafa' }}>
      <div className="wrap">

        {/* Header */}
        <div ref={headerRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <span className="accent-line" />
            <span className="section-label">Notre histoire</span>
            <span className="accent-line" />
          </div>
          <h2 className="font-bebas" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: '#0a0a0a', letterSpacing: '0.05em', lineHeight: 1 }}>
            Plus qu'une coupe,
          </h2>
          <p className="font-playfair" style={{ fontStyle: 'italic', fontSize: 'clamp(1.8rem, 4vw, 3.5rem)', color: '#bbb', lineHeight: 1.1 }}>
            une identité.
          </p>
        </div>

        {/* 2 colonnes */}
        <div className="grid-about">

          {/* Image */}
          <div ref={imgRef} style={{ position: 'relative', maxWidth: '420px', margin: '0 auto' }}>
            <div style={{ borderRadius: '1rem', overflow: 'hidden', aspectRatio: '4/5' }}>
              <img
                ref={imgInnerRef}
                src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&q=80"
                alt="Django Barber"
                style={{ width: '100%', height: '115%', objectFit: 'cover', marginTop: '-7.5%' }}
              />
            </div>
            <div style={{
              position: 'absolute', bottom: '1.25rem', right: '1.25rem',
              background: 'rgba(10,10,10,0.92)', color: '#fff', borderRadius: '0.75rem',
              padding: '0.9rem 1.25rem', textAlign: 'center',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            }}>
              <p className="font-bebas" style={{ fontSize: '1.75rem', letterSpacing: '0.05em', lineHeight: 1 }}>2+</p>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: '0.2rem' }}>Ans d'expertise</p>
            </div>
          </div>

          {/* Texte */}
          <div ref={textRef} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <p style={{ color: '#222', fontSize: '1.1rem', lineHeight: 1.8, fontWeight: 300 }}>
              Django Barber est né d'une passion profonde pour l'art de la coiffure masculine.
              Ce n'est pas simplement un salon — c'est un espace où chaque homme vient
              révéler la meilleure version de lui-même.
            </p>
            <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: 1.9 }}>
              Chaque passage en chaise est une expérience soigneusement orchestrée :
              accueil chaleureux, diagnostic personnalisé, techniques maîtrisées
              et finitions irréprochables.
            </p>
            <div className="divider" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                'Techniques de coupe maîtrisées et perfectionnées',
                'Une expertise forgée par des années de passion',
                'Une relation de confiance durable avec chaque client',
              ].map((text) => (
                <div key={text} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#0a0a0a', marginTop: '0.45rem', flexShrink: 0 }} />
                  <p style={{ color: '#666', fontSize: '0.875rem', lineHeight: 1.7 }}>{text}</p>
                </div>
              ))}
            </div>
            <a href="#contact" className="btn-dark" style={{ padding: '0.85rem 1.75rem', alignSelf: 'flex-start', marginTop: '0.5rem' }}>
              Laisse toi tenter
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
