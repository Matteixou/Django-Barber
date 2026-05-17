import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { openCalendly } from '../utils/calendly'
import { InstagramIcon, SnapchatIcon, TikTokIcon } from '../icons/SocialIcons'
import { INSTAGRAM_URL, SNAPCHAT_URL, TIKTOK_URL } from '../constants/socialLinks'

const links = [
  { label: 'À propos',     href: '#about' },
  { label: 'Savoir-faire', href: '#skills' },
  { label: 'Galerie',      href: '#gallery' },
  { label: 'Expérience',   href: '#experience' },
  { label: 'Contact',      href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open,     setOpen]     = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const navStyle = useMemo(() => {
    if (isMobile) {
      if (open)     return { background: 'transparent', padding: '0.75rem 0' }
      if (scrolled) return { background: 'rgba(255,255,255,0.95)', borderBottom: '1px solid #ebebeb', padding: '0.75rem 0', boxShadow: '0 1px 20px rgba(0,0,0,0.05)' }
      return { background: 'rgba(5,7,13,0.55)', padding: '0.75rem 0' }
    }
    if (open)     return { background: '#0a0a0a', borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '0.75rem 0' }
    if (scrolled) return { background: 'rgba(255,255,255,0.92)', borderBottom: '1px solid #ebebeb', padding: '0.75rem 0', boxShadow: '0 1px 20px rgba(0,0,0,0.05)' }
    return { background: 'transparent', padding: '1.25rem 0' }
  }, [isMobile, open, scrolled])

  const logoFilter = (isMobile && scrolled && !open) ? 'none' : open || (isMobile && !scrolled) ? 'brightness(0) invert(1)' : 'none'
  const hamburgerColor = (isMobile && scrolled && !open) ? '#0a0a0a' : '#fff'

  return (
    <>
      <motion.nav
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, transition: 'all 0.4s ease', ...navStyle }}
        className="navbar-blur"
      >
        <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>

          {/* Logo — toujours visible */}
          <a href="#hero" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <img
              src="/DjangoBarberLogo.png"
              alt="Django Barber"
              style={{ height: '42px', width: 'auto', objectFit: 'contain', filter: logoFilter, transition: 'filter 0.35s' }}
            />
          </a>

          {/* Nom centré — mobile uniquement */}
          {isMobile && (
            <div style={{
              position: 'absolute', left: '50%', transform: 'translateX(-50%)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none',
            }}>
              <span className="font-bebas" style={{
                fontSize: '1.15rem', letterSpacing: '0.18em',
                color: (scrolled && !open) ? '#0a0a0a' : '#fff',
                lineHeight: 1, transition: 'color 0.35s',
              }}>
                Django Barber
              </span>
              <span style={{
                fontSize: '0.45rem', letterSpacing: '0.28em', textTransform: 'uppercase',
                color: (scrolled && !open) ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.4)',
                marginTop: '2px', transition: 'color 0.35s',
              }}>
                Salon de coiffure
              </span>
            </div>
          )}

          {/* Liens desktop — cachés sur mobile via JS */}
          {!isMobile && (
            <ul style={{ display: 'flex', alignItems: 'center', gap: '2rem', listStyle: 'none', margin: 0, padding: 0 }}>
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    style={{ fontSize: '0.68rem', fontWeight: 500, color: '#888', textDecoration: 'none', letterSpacing: '0.2em', textTransform: 'uppercase', transition: 'color 0.3s' }}
                    onMouseEnter={e => e.target.style.color = '#0a0a0a'}
                    onMouseLeave={e => e.target.style.color = '#888'}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          )}

          {/* Bouton Réserver desktop */}
          {!isMobile && (
            <button onClick={openCalendly} aria-label="Réserver un rendez-vous" className="btn-dark" style={{ padding: '0.6rem 1.5rem', border: 'none', cursor: 'pointer' }}>
              Réserver
            </button>
          )}

          {/* Hamburger mobile */}
          {isMobile && (
            <button
              onClick={() => setOpen(!open)}
              aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={open}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: hamburgerColor,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '4px', transition: 'color 0.3s',
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {open
                  ? <motion.span key="x"    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90,  opacity: 0 }} transition={{ duration: 0.2 }}><X    size={24} /></motion.span>
                  : <motion.span key="menu" initial={{ rotate: 90,  opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><Menu size={24} /></motion.span>
                }
              </AnimatePresence>
            </button>
          )}
        </div>
      </motion.nav>

      {/* Overlay menu mobile full-screen */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
            style={{
              position: 'fixed', inset: 0, zIndex: 49,
              background: '#0a0a0a',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              paddingTop: '72px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem' }}>
              <span style={{ display: 'inline-block', width: '28px', height: '1px', background: 'rgba(255,255,255,0.2)' }} />
              <span style={{ fontSize: '0.58rem', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)' }}>Navigation</span>
              <span style={{ display: 'inline-block', width: '28px', height: '1px', background: 'rgba(255,255,255,0.2)' }} />
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem', marginBottom: '2.5rem' }}>
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + i * 0.07, duration: 0.45 }}
                  className="font-bebas"
                  style={{ fontSize: 'clamp(2.4rem, 9vw, 3.8rem)', color: 'rgba(255,255,255,0.85)', textDecoration: 'none', letterSpacing: '0.06em', lineHeight: 1.15, transition: 'color 0.25s, letter-spacing 0.25s' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.letterSpacing = '0.12em' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.85)'; e.currentTarget.style.letterSpacing = '0.06em' }}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <button
                onClick={() => { openCalendly(); setOpen(false); }}
                style={{
                  display: 'inline-flex', alignItems: 'center',
                  background: '#fff', color: '#0a0a0a',
                  padding: '0.9rem 2.5rem', borderRadius: '9999px',
                  fontSize: '0.72rem', fontWeight: 600,
                  letterSpacing: '0.18em', textTransform: 'uppercase',
                  border: 'none', cursor: 'pointer',
                  transition: 'opacity 0.3s',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                Réserver
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
              style={{ position: 'absolute', bottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '1.75rem' }}
            >
              {[
                { href: INSTAGRAM_URL, icon: <InstagramIcon size={18} /> },
                { href: SNAPCHAT_URL,  icon: <SnapchatIcon  size={22} /> },
                { href: TIKTOK_URL,    icon: <TikTokIcon    size={18} /> },
              ].map(({ href, icon }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                  style={{ color: 'rgba(255,255,255,0.3)', transition: 'color 0.3s', textDecoration: 'none' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.85)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
                >
                  {icon}
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
