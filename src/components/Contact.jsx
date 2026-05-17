import { useEffect, useRef, useState, lazy, Suspense } from 'react'
import FloatingParticles from './FloatingParticles'

const ContactBg3D = lazy(() => import('./ContactBg3D'))
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin, X, CalendarDays, Clock } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import SplitType from 'split-type'
import { openCalendly } from '../utils/calendly'
import { InstagramIcon, SnapchatIcon, TikTokIcon } from '../icons/SocialIcons'

gsap.registerPlugin(ScrollTrigger)

// ── Static data ──────────────────────────────────────────────────────────────

const SOCIAL_LINKS = [
  { platform: 'Instagram', href: 'https://www.instagram.com/niame___/',    bg: 'linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)', color: '#fff',    handle: '@niame___',    sub: 'Créneaux en story',   Icon: InstagramIcon },
  { platform: 'Snapchat',  href: 'https://www.snapchat.com/add/niame_iss', bg: '#FFFC00',                                                                color: '#0a0a0a', handle: '@niame_iss',    sub: 'Créneaux en story',  Icon: SnapchatIcon  },
  { platform: 'TikTok',    href: 'https://www.tiktok.com/@django94200',    bg: '#010101',                                                                color: '#fff',    handle: '@django94200', sub: 'Vidéos & coulisses', Icon: TikTokIcon    },
]

const TRANSPORT = [
  { badge: '7',   badgeBg: '#6b5ce7', label: 'Villejuif – Louis Aragon', detail: 'Métro ligne 7'   },
  { badge: 'Bus', badgeBg: '#2d6a4f', label: 'Arrêt à proximité',        detail: 'Plusieurs lignes' },
]

// ── Card content sub-components ──────────────────────────────────────────────

function SocialLink({ href, bg, color, handle, sub, Icon }) {
  return (
    <a
      href={href} target="_blank" rel="noopener noreferrer"
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
        padding: '0.8rem 1rem', borderRadius: '0.7rem',
        background: bg, color, textDecoration: 'none',
        transition: 'opacity 0.3s, transform 0.3s',
      }}
      onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; e.currentTarget.style.transform = 'translateY(-2px)' }}
      onMouseLeave={e => { e.currentTarget.style.opacity = '1';    e.currentTarget.style.transform = 'translateY(0)' }}
    >
      <Icon size={16} />
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', lineHeight: 1.2 }}>{handle}</p>
        <p style={{ fontSize: '0.6rem', opacity: 0.7, marginTop: '0.15rem', letterSpacing: '0.05em' }}>{sub}</p>
      </div>
    </a>
  )
}

function ContactContent() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 0 }}>
      {SOCIAL_LINKS.map((link, i) => (
        <div key={link.handle}>
          {i > 0 && <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)', margin: '0.75rem 0' }} />}
          <SocialLink {...link} />
        </div>
      ))}
    </div>
  )
}

function AddressContent() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.1rem', width: '100%' }}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ color: '#fff', fontWeight: 300, lineHeight: 1.9, fontSize: '1rem' }}>
          9 rue Gaston Cantini<br />94800 Villejuif
        </p>
        <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: '0.4rem' }}>
          Île-de-France
        </p>
      </div>

      <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.08)' }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', width: '100%' }}>
        <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: '0.55rem', letterSpacing: '0.22em', textTransform: 'uppercase', textAlign: 'center' }}>
          Accès transports
        </p>
        {TRANSPORT.map(({ badge, badgeBg, label, detail }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <span style={{ background: badgeBg, color: '#fff', fontSize: '0.58rem', fontWeight: 700, padding: '0.18rem 0.45rem', borderRadius: '4px', flexShrink: 0, letterSpacing: '0.05em' }}>
              {badge}
            </span>
            <div>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.75rem', lineHeight: 1.3 }}>{label}</p>
              <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.6rem' }}>{detail}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.08)' }} />

      <a
        href="https://maps.google.com/?q=9+rue+Gaston+Cantini+94800+Villejuif"
        target="_blank" rel="noopener noreferrer"
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
          width: '100%', padding: '0.7rem 1rem', borderRadius: '0.7rem',
          border: '1px solid rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.55)',
          fontSize: '0.66rem', fontWeight: 500, letterSpacing: '0.12em',
          textTransform: 'uppercase', textDecoration: 'none',
          transition: 'border-color 0.3s, color 0.3s, transform 0.3s',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateY(-2px)' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; e.currentTarget.style.transform = 'translateY(0)' }}
      >
        <MapPin size={13} /> Voir sur Google Maps
      </a>
    </div>
  )
}

function HoursContent() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.1rem', width: '100%', textAlign: 'center' }}>
      <div>
        <p className="font-bebas" style={{ fontSize: '3rem', color: '#fff', letterSpacing: '0.1em', lineHeight: 1 }}>
          Flexible
        </p>
        <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.78rem', lineHeight: 1.75, marginTop: '0.6rem' }}>
          Les disponibilités varient chaque semaine. Consultez le planning en ligne pour voir les créneaux disponibles en temps réel.
        </p>
      </div>

      <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.08)' }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}>
        <p style={{ color: 'rgba(255,255,255,0.28)', fontSize: '0.55rem', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
          Réservation en ligne
        </p>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.75rem', lineHeight: 1.6 }}>
          Choisissez votre créneau directement sur Calendly — rapide, simple, sans appel.
        </p>
      </div>

      <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.08)' }} />

      <button
        onClick={openCalendly}
        style={{
          width: '100%', padding: '0.75rem 1rem', borderRadius: '0.7rem',
          border: '1px solid rgba(255,255,255,0.18)', background: 'transparent',
          color: 'rgba(255,255,255,0.65)', fontSize: '0.66rem', fontWeight: 500,
          letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
          transition: 'border-color 0.3s, color 0.3s, transform 0.3s',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateY(-2px)' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; e.currentTarget.style.transform = 'translateY(0)' }}
      >
        <CalendarDays size={13} /> Voir les disponibilités
      </button>
    </div>
  )
}

// ── InfoCard wrapper ──────────────────────────────────────────────────────────

function InfoCard({ label, accent, badgeNode, children }) {
  const rgb = `${accent.r},${accent.g},${accent.b}`

  function handleEnter(e) {
    e.currentTarget.style.borderColor = `rgba(${rgb},0.55)`
    e.currentTarget.style.boxShadow   = `0 0 70px rgba(${rgb},0.16), inset 0 0 28px rgba(${rgb},0.06)`
    gsap.to(e.currentTarget, { y: -4, duration: 0.3 })
  }
  function handleLeave(e) {
    e.currentTarget.style.borderColor = `rgba(${rgb},0.22)`
    e.currentTarget.style.boxShadow   = `0 0 50px rgba(${rgb},0.08), inset 0 0 28px rgba(${rgb},0.04)`
    gsap.to(e.currentTarget, { y: 0, duration: 0.4 })
  }

  return (
    <div
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        background:   `rgba(${rgb},0.05)`,
        border:       `1px solid rgba(${rgb},0.22)`,
        boxShadow:    `0 0 50px rgba(${rgb},0.08), inset 0 0 28px rgba(${rgb},0.04)`,
        borderRadius: '1rem', padding: '1.75rem',
        display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
        justifyContent: 'flex-start',
        transition: 'border-color 0.3s, box-shadow 0.3s',
      }}
    >
      <div style={{ marginBottom: '0.75rem' }}>{badgeNode}</div>
      <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 0 }}>
        {label}
      </p>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', width: '100%', paddingTop: '1.25rem' }}>
        {children}
      </div>
    </div>
  )
}

// ── Cards config ─────────────────────────────────────────────────────────────

const CARDS = [
  {
    label:   'Contact',
    accent:  { r: 214, g: 40,  b: 40  },
    badge:   { bg: 'linear-gradient(135deg, #d62828, #a31c1c)', shadow: 'rgba(214,40,40,0.4)',    Icon: InstagramIcon, iconSize: 17, iconColor: '#fff' },
    Content: ContactContent,
  },
  {
    label:   'Adresse',
    accent:  { r: 29,  g: 78,  b: 216 },
    badge:   { bg: 'linear-gradient(135deg, #1d4ed8, #1239a0)', shadow: 'rgba(29,78,216,0.4)',   Icon: MapPin,        iconSize: 17, iconColor: '#fff' },
    Content: AddressContent,
  },
  {
    label:   'Horaires',
    accent:  { r: 255, g: 255, b: 255 },
    badge:   { bg: 'linear-gradient(135deg, #444, #222)', shadow: 'rgba(255,255,255,0.25)', Icon: Clock, iconSize: 16, iconColor: '#fff' },
    Content: HoursContent,
  },
]

// ── Main component ────────────────────────────────────────────────────────────

export default function Contact() {
  const sectionRef  = useRef(null)
  const heroRef     = useRef(null)
  const cardsRef    = useRef(null)
  const bg3dRef     = useRef(null)
  const [showSocial, setShowSocial] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const h2 = heroRef.current.querySelector('h2')
      if (h2) {
        const split = new SplitType(h2, { types: 'chars' })
        gsap.from(split.chars, {
          opacity: 0, y: 30, stagger: 0.04, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: heroRef.current, start: 'top 82%' },
        })
      }
      gsap.from([...heroRef.current.children].filter(el => el !== heroRef.current.querySelector('h2')), {
        opacity: 0, y: 30, stagger: 0.1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: heroRef.current, start: 'top 82%' },
      })
      gsap.from(cardsRef.current.children, {
        opacity: 0, y: 40, stagger: 0.1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: cardsRef.current, start: 'top 85%' },
      })
      gsap.to(bg3dRef.current, {
        opacity: 0.22, duration: 2, ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 65%', once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="contact" className="section-pad" style={{ width: '100%', background: '#0a0a0a', position: 'relative', overflow: 'hidden' }}>

      {/* Fond 3D — apparaît au scroll derrière les cartes */}
      <div ref={bg3dRef} style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0, pointerEvents: 'none' }}>
        <Suspense fallback={null}>
          <ContactBg3D />
        </Suspense>
      </div>

      {/* Icônes flottantes */}
      <FloatingParticles />

      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>

        {/* CTA hero */}
        <div ref={heroRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <span style={{ display: 'inline-block', width: '28px', height: '1px', background: 'rgba(255,255,255,0.2)' }} />
            <span style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>
              Prenez rendez-vous
            </span>
            <span style={{ display: 'inline-block', width: '28px', height: '1px', background: 'rgba(255,255,255,0.2)' }} />
          </div>

          <h2 className="font-bebas" style={{ fontSize: 'clamp(3.5rem, 9vw, 8rem)', color: '#fff', lineHeight: 0.92, letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
            Votre style
          </h2>
          <p className="font-playfair" style={{ fontStyle: 'italic', fontSize: 'clamp(2rem, 5vw, 4.5rem)', color: 'rgba(255,255,255,0.25)', lineHeight: 1.1, marginBottom: '2rem' }}>
            commence ici.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.9rem', maxWidth: '340px', lineHeight: 1.8, marginBottom: '2.5rem' }}>
            Réservez dès maintenant et laissez-nous révéler la meilleure version de vous-même.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.85rem' }}>
            <button
              onClick={openCalendly}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                background: '#fff', color: '#0a0a0a', padding: '1rem 2.25rem',
                borderRadius: '9999px', fontSize: '0.72rem', fontWeight: 600,
                letterSpacing: '0.15em', textTransform: 'uppercase',
                border: 'none', cursor: 'pointer',
                transition: 'opacity 0.3s, transform 0.3s, box-shadow 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(255,255,255,0.2)' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1';   e.currentTarget.style.transform = 'translateY(0)';    e.currentTarget.style.boxShadow = 'none' }}
            >
              <CalendarDays size={16} /> Réserver maintenant
            </button>
            <button
              onClick={() => setShowSocial(true)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: 'transparent', color: 'rgba(255,255,255,0.35)',
                padding: '0.5rem 1rem', borderRadius: '9999px',
                fontSize: '0.62rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase',
                border: '1px solid rgba(255,255,255,0.12)', cursor: 'pointer',
                transition: 'color 0.3s, border-color 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.35)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)' }}
            >
              <InstagramIcon size={13} /> Suis moi sur mes réseaux
            </button>
          </div>
        </div>

        <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', marginBottom: '4rem' }} />

        {/* Info cards */}
        <div ref={cardsRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
          {CARDS.map(({ label, accent, badge, Content }) => (
            <InfoCard key={label} label={label} accent={accent} badgeNode={
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: badge.bg, color: badge.iconColor,
                boxShadow: `0 0 18px ${badge.shadow}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <badge.Icon size={badge.iconSize} color={badge.iconColor} />
              </div>
            }>
              <Content />
            </InfoCard>
          ))}
        </div>
      </div>

      {/* Popup réseaux sociaux */}
      <AnimatePresence>
        {showSocial && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setShowSocial(false)}
            style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              onClick={e => e.stopPropagation()}
              style={{ background: '#fff', borderRadius: '1.5rem', padding: '2.5rem 2rem', width: '100%', maxWidth: '400px', position: 'relative', textAlign: 'center' }}
            >
              <button
                onClick={() => setShowSocial(false)}
                style={{ position: 'absolute', top: '1rem', right: '1rem', width: '36px', height: '36px', borderRadius: '50%', background: '#f5f5f5', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <X size={16} />
              </button>
              <p style={{ fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#aaa', marginBottom: '0.75rem' }}>
                Mes réseaux
              </p>
              <h3 className="font-bebas" style={{ fontSize: '2rem', color: '#0a0a0a', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                Retrouvez-moi sur
              </h3>
              <p style={{ color: '#999', fontSize: '0.82rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                Suivez mes créations et coulisses en direct.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {SOCIAL_LINKS.map(({ platform, href, bg, color, Icon, handle }) => (
                  <a
                    key={href}
                    href={href} target="_blank" rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.5rem', borderRadius: '1rem', background: bg, color, textDecoration: 'none', transition: 'transform 0.3s, opacity 0.3s' }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.opacity = '0.9' }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)';    e.currentTarget.style.opacity = '1' }}
                  >
                    <Icon size={26} />
                    <div style={{ textAlign: 'left' }}>
                      <p style={{ fontWeight: 700, fontSize: '0.9rem', lineHeight: 1 }}>{platform}</p>
                      <p style={{ fontSize: '0.72rem', opacity: 0.75, marginTop: '0.2rem' }}>{handle}</p>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
