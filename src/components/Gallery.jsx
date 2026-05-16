import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { X, ArrowRight } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import SplitType from 'split-type'
import { InstagramIcon, SnapchatIcon, TikTokIcon } from '../icons/SocialIcons'

gsap.registerPlugin(ScrollTrigger)

const photos = [
  { src: '/Barber1.jpg', alt: 'Réalisation 1' },
  { src: '/Barber2.jpg', alt: 'Réalisation 2' },
  { src: '/Barber3.jpg', alt: 'Réalisation 3' },
  { src: '/Barber4.jpg', alt: 'Réalisation 4' },
  { src: '/Barber5.jpg', alt: 'Réalisation 5' },
  { src: '/Barber6.jpg', alt: 'Réalisation 6' },
  { src: '/Barber7.jpg', alt: 'Réalisation 7' },
  { src: '/Barber8.jpg', alt: 'Réalisation 8' },
]

const socialLinks = [
  {
    href: 'https://www.instagram.com/niame___/',
    style: { background: 'linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)', color: '#fff' },
    Icon: InstagramIcon,
    name: 'Instagram',
    handle: '@niame___',
  },
  {
    href: 'https://www.snapchat.com/add/niame_iss',
    style: { background: '#FFFC00', color: '#0a0a0a' },
    Icon: SnapchatIcon,
    name: 'Snapchat',
    handle: '@niame_iss',
  },
  {
    href: 'https://www.tiktok.com/@django94200',
    style: { background: '#010101', color: '#fff' },
    Icon: TikTokIcon,
    name: 'TikTok',
    handle: '@django94200',
  },
]

function handlePhotoEnter(e) { e.target.style.transform = 'scale(1.08)' }
function handlePhotoLeave(e) { e.target.style.transform = 'scale(1)' }
function handleSocialEnter(e) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.opacity = '0.9' }
function handleSocialLeave(e) { e.currentTarget.style.transform = 'translateY(0)';    e.currentTarget.style.opacity = '1' }

export default function Gallery() {
  const sectionRef = useRef(null)
  const headerRef  = useRef(null)
  const gridRef    = useRef(null)
  const [selected,   setSelected]   = useState(null)
  const [showSocial, setShowSocial] = useState(false)

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
      gsap.fromTo(gridRef.current.children,
        { clipPath: 'inset(100% 0 0 0)' },
        { clipPath: 'inset(0% 0 0 0)', stagger: 0.08, duration: 0.75, ease: 'power3.inOut',
          scrollTrigger: { trigger: gridRef.current, start: 'top 82%' } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="gallery" className="section-pad" style={{ width: '100%', background: '#fafafa' }}>
      <div className="wrap">

        <div ref={headerRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <span className="accent-line" />
            <span className="section-label">Nos réalisations</span>
            <span className="accent-line" />
          </div>
          <h2 className="font-bebas" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: '#0a0a0a', letterSpacing: '0.05em', lineHeight: 1 }}>
            Chaque coupe,
          </h2>
          <p className="font-playfair" style={{ fontStyle: 'italic', fontSize: 'clamp(1.5rem, 4vw, 3rem)', color: '#bbb' }}>
            une signature.
          </p>
        </div>

        <div ref={gridRef} className="grid-gallery">
          {photos.map((photo, i) => (
            <div
              key={i}
              onClick={() => setSelected(photo)}
              style={{ position: 'relative', overflow: 'hidden', borderRadius: '0.75rem', cursor: 'pointer' }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s cubic-bezier(.25,.46,.45,.94)' }}
                onMouseEnter={handlePhotoEnter}
                onMouseLeave={handlePhotoLeave}
              />
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2.5rem' }}>
          <button
            onClick={() => setShowSocial(true)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
              background: '#0a0a0a', color: '#fff',
              padding: '0.85rem 2rem', borderRadius: '9999px',
              fontSize: '0.72rem', fontWeight: 600,
              letterSpacing: '0.15em', textTransform: 'uppercase',
              border: 'none', cursor: 'pointer',
              transition: 'transform 0.3s, box-shadow 0.3s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)';    e.currentTarget.style.boxShadow = 'none' }}
          >
            Voir plus <ArrowRight size={14} />
          </button>
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
                Nos réalisations
              </p>
              <h3 className="font-bebas" style={{ fontSize: '2rem', color: '#0a0a0a', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                Retrouvez-nous sur
              </h3>
              <p style={{ color: '#999', fontSize: '0.82rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                Toutes nos coupes et réalisations en photos.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {socialLinks.map(({ href, style, Icon, name, handle }) => (
                  <a
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.5rem', borderRadius: '1rem', textDecoration: 'none', transition: 'transform 0.3s, opacity 0.3s', ...style }}
                    onMouseEnter={handleSocialEnter}
                    onMouseLeave={handleSocialLeave}
                  >
                    <Icon size={26} />
                    <div style={{ textAlign: 'left' }}>
                      <p style={{ fontWeight: 700, fontSize: '0.9rem', lineHeight: 1 }}>{name}</p>
                      <p style={{ fontSize: '0.72rem', opacity: 0.75, marginTop: '0.2rem' }}>{handle}</p>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.88)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}
          >
            <button
              onClick={() => setSelected(null)}
              style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', width: '40px', height: '40px', borderRadius: '50%', background: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <X size={18} />
            </button>
            <motion.img
              initial={{ scale: 0.88, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.88, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              src={selected.src} alt={selected.alt}
              onClick={e => e.stopPropagation()}
              style={{ maxWidth: '900px', maxHeight: '85vh', objectFit: 'contain', borderRadius: '1rem' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
