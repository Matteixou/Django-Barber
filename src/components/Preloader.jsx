import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

/* ── SVGs réalistes ── */

const Scissors = ({ size }) => (
  <svg width={size} viewBox="0 0 160 100" fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round">
    {/* Anneau haut */}
    <ellipse cx="36" cy="27" rx="28" ry="21" strokeWidth="2"/>
    <ellipse cx="36" cy="27" rx="16" ry="12" strokeWidth="1.5"/>
    {/* Repose-doigt */}
    <path d="M 18 44 Q 10 53 14 60 Q 18 65 25 61" strokeWidth="1.5"/>
    {/* Anneau bas */}
    <ellipse cx="36" cy="73" rx="28" ry="21" strokeWidth="2"/>
    <ellipse cx="36" cy="73" rx="16" ry="12" strokeWidth="1.5"/>
    {/* Tiges vers pivot */}
    <path d="M 58 33 Q 70 40 80 50 Q 70 60 58 67" strokeWidth="2"/>
    {/* Lame haute */}
    <path d="M 80 50 Q 112 44 150 37" strokeWidth="2.5"/>
    <path d="M 80 50 Q 112 46 148 40" strokeWidth="1"/>
    {/* Lame basse */}
    <path d="M 80 50 Q 112 56 150 63" strokeWidth="2.5"/>
    <path d="M 80 50 Q 112 54 148 60" strokeWidth="1"/>
    {/* Vis pivot */}
    <circle cx="80" cy="50" r="5.5" strokeWidth="2"/>
    <line x1="77" y1="50" x2="83" y2="50" strokeWidth="1.2"/>
    <line x1="80" y1="47" x2="80" y2="53" strokeWidth="1.2"/>
  </svg>
)

const Comb = ({ size }) => (
  <svg width={size} viewBox="0 0 220 65" fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round">
    {/* Corps */}
    <rect x="2" y="2" width="216" height="28" rx="7" strokeWidth="2"/>
    {/* Détail intérieur spine */}
    <rect x="8" y="8" width="204" height="10" rx="4" strokeWidth="1.2"/>
    {/* Séparateur section */}
    <line x1="148" y1="2" x2="148" y2="30" strokeWidth="1.5"/>
    {/* Dents larges (section gauche — 9 dents) */}
    {Array.from({ length: 9 }, (_, i) => (
      <path key={`w${i}`}
        d={`M ${12 + i * 15} 30 L ${12 + i * 15} 57 Q ${19.5 + i * 15} 62 ${27 + i * 15} 57 L ${27 + i * 15} 30`}
        strokeWidth="1.8"/>
    ))}
    {/* Dents fines (section droite — 16 dents) */}
    {Array.from({ length: 16 }, (_, i) => (
      <rect key={`f${i}`} x={153 + i * 4} y="30" width="2.5" height="30" rx="1.2" strokeWidth="1.3"/>
    ))}
  </svg>
)

const Clipper = ({ size }) => (
  <svg width={size} viewBox="0 0 85 178" fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round">
    {/* Corps ergonomique */}
    <path d="M 18 5 Q 5 5 5 22 L 5 118 Q 5 130 42 130 Q 79 130 79 118 L 79 22 Q 79 5 66 5 Z" strokeWidth="2"/>
    {/* Détail côté gauche */}
    <path d="M 5 35 Q 2 45 2 65 Q 2 85 5 95" strokeWidth="1.2"/>
    {/* Bouton power */}
    <circle cx="42" cy="48" r="13" strokeWidth="2"/>
    <circle cx="42" cy="48" r="7" strokeWidth="1.5"/>
    <path d="M 42 39 L 42 43" strokeWidth="2" strokeLinecap="round"/>
    {/* Switch vitesse */}
    <rect x="24" y="76" width="36" height="12" rx="6" strokeWidth="1.8"/>
    <circle cx="33" cy="82" r="5" strokeWidth="1.5"/>
    {/* Grille ventilation */}
    {[96, 103, 110].map(y => (
      <line key={y} x1="20" y1={y} x2="64" y2={y} strokeWidth="1.2"/>
    ))}
    {/* Boîtier lame */}
    <path d="M 5 124 L 5 144 Q 5 152 18 152 L 66 152 Q 79 152 79 144 L 79 124 Z" strokeWidth="2"/>
    {/* Lame fixe */}
    <rect x="9" y="147" width="66" height="8" rx="2.5" strokeWidth="1.5"/>
    {/* Dents lame (10) */}
    {Array.from({ length: 10 }, (_, i) => (
      <rect key={i} x={11 + i * 6.2} y="155" width="4" height="20" rx="2" strokeWidth="1.5"/>
    ))}
    {/* Dents intercalées (9) */}
    {Array.from({ length: 9 }, (_, i) => (
      <rect key={i} x={14.1 + i * 6.2} y="155" width="2.8" height="14" rx="1.4" strokeWidth="1.2"/>
    ))}
  </svg>
)

const Razor = ({ size }) => (
  <svg width={size} viewBox="0 0 210 72" fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round">
    {/* Lame — contour principal */}
    <path d="M 12 10 L 160 8 Q 188 8 188 36 Q 188 64 160 64 L 12 62 Z" strokeWidth="2"/>
    {/* Dos de lame (spine) épais */}
    <rect x="12" y="8" width="148" height="11" rx="3" strokeWidth="1.5"/>
    {/* Bevel (biseau) de tranchant */}
    <path d="M 14 58 Q 140 60 162 60 Q 184 58 186 36" strokeWidth="1.2"/>
    {/* Hollow grind (creux) */}
    <path d="M 18 22 Q 145 19 172 36 Q 145 53 18 50" strokeWidth="1"/>
    {/* Estampille marque */}
    <ellipse cx="95" cy="36" rx="28" ry="9" strokeWidth="1" opacity="0.6"/>
    {/* Broche pivot */}
    <circle cx="12" cy="36" r="5.5" strokeWidth="2"/>
    {/* Manche (écaille) — ouvert en bas */}
    <path d="M 6 36 Q 6 66 15 68 L 200 68 Q 208 68 208 62 L 208 42 Q 208 36 200 36" strokeWidth="1.8"/>
    {/* Rivets manche */}
    <circle cx="168" cy="52" r="4" strokeWidth="1.5"/>
    <circle cx="195" cy="52" r="4" strokeWidth="1.5"/>
    {/* Rainures grip */}
    {[155, 160, 165, 170, 175].map(x => (
      <line key={x} x1={x} y1="40" x2={x} y2="64" strokeWidth="1" opacity="0.5"/>
    ))}
  </svg>
)

const Brush = ({ size }) => (
  <svg width={size} viewBox="0 0 80 155" fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round">
    {/* Dôme de soies */}
    <path d="M 10 54 Q 7 12 40 8 Q 73 12 70 54" strokeWidth="2"/>
    {/* Lignes de soies */}
    <path d="M 18 12 Q 16 30 14 54" strokeWidth="1.2"/>
    <path d="M 27 9  Q 26 30 25 54" strokeWidth="1.2"/>
    <path d="M 40 8  Q 40 30 40 54" strokeWidth="1.2"/>
    <path d="M 53 9  Q 54 30 55 54" strokeWidth="1.2"/>
    <path d="M 62 12 Q 64 30 66 54" strokeWidth="1.2"/>
    {/* Bague de sertissage (ferrule) */}
    <rect x="10" y="52" width="60" height="13" rx="2" strokeWidth="2"/>
    <line x1="10" y1="59" x2="70" y2="59" strokeWidth="1"/>
    {/* Corps manche — partie haute */}
    <path d="M 12 65 Q 8 82 10 100 L 70 100 Q 72 82 68 65 Z" strokeWidth="1.8"/>
    {/* Taille (waist) */}
    <path d="M 10 100 Q 14 108 18 112 L 62 112 Q 66 108 70 100" strokeWidth="1.5"/>
    {/* Corps manche — partie basse */}
    <path d="M 18 112 Q 16 128 18 135 L 62 135 Q 64 128 62 112 Z" strokeWidth="1.8"/>
    {/* Base */}
    <ellipse cx="40" cy="135" rx="22" ry="7" strokeWidth="1.8"/>
    <path d="M 18 135 Q 20 146 40 147 Q 60 146 62 135" strokeWidth="1.5"/>
  </svg>
)

/* ── Distribution en grille 4×5 pour couvrir tout l'écran ── */
const bg = [
  // Haut gauche
  { C: Scissors, size: 135, style: { top: '3%',   left: '2%'   }, rotate: -20, op: 0.32 },
  { C: Brush,    size: 72,  style: { top: '16%',  left: '5%'   }, rotate:  35, op: 0.28 },
  { C: Razor,    size: 145, style: { top: '34%',  left: '-2%'  }, rotate:  18, op: 0.30 },
  { C: Comb,     size: 110, style: { top: '54%',  left: '0%'   }, rotate:  88, op: 0.26 },
  { C: Clipper,  size: 78,  style: { top: '72%',  left: '3%'   }, rotate: -15, op: 0.28 },
  // Haut centre-gauche
  { C: Razor,    size: 120, style: { top: '2%',   left: '22%'  }, rotate:   8, op: 0.25 },
  { C: Clipper,  size: 70,  style: { top: '20%',  left: '20%'  }, rotate: -50, op: 0.22 },
  { C: Brush,    size: 65,  style: { top: '62%',  left: '18%'  }, rotate:  55, op: 0.24 },
  { C: Scissors, size: 92,  style: { bottom:'4%', left: '14%'  }, rotate:  38, op: 0.26 },
  // Haut centre-droit
  { C: Comb,     size: 150, style: { top: '4%',   left: '42%'  }, rotate: -12, op: 0.22 },
  { C: Brush,    size: 80,  style: { top: '72%',  left: '40%'  }, rotate: -38, op: 0.26 },
  { C: Scissors, size: 78,  style: { bottom:'3%', left: '48%'  }, rotate:  12, op: 0.22 },
  // Droite centre
  { C: Clipper,  size: 88,  style: { top: '18%',  left: '62%'  }, rotate:  22, op: 0.26 },
  { C: Razor,    size: 130, style: { top: '38%',  right: '22%' }, rotate: -40, op: 0.24 },
  { C: Comb,     size: 115, style: { top: '60%',  right: '20%' }, rotate: -65, op: 0.24 },
  // Haut droit
  { C: Scissors, size: 100, style: { top: '2%',   right: '4%'  }, rotate:  28, op: 0.30 },
  { C: Comb,     size: 140, style: { top: '20%',  right: '0%'  }, rotate:  -8, op: 0.28 },
  { C: Brush,    size: 68,  style: { top: '40%',  right: '2%'  }, rotate:  42, op: 0.28 },
  { C: Razor,    size: 120, style: { top: '58%',  right: '3%'  }, rotate:  15, op: 0.26 },
  { C: Clipper,  size: 82,  style: { bottom:'5%', right: '5%'  }, rotate: -25, op: 0.30 },
]

export default function Preloader({ onDone }) {
  const [visible,  setVisible]  = useState(true)
  const [progress, setProgress] = useState(0)

  const POLE_HEIGHT = 420
  const POLE_WIDTH  = 26

  useEffect(() => {
    const start    = performance.now()
    const duration = 1800
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      setProgress(p)
      if (p < 1) requestAnimationFrame(tick)
      else setTimeout(() => { onDone(); setVisible(false) }, 300)
    }
    requestAnimationFrame(tick)
  }, [onDone])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
          style={{ position: 'fixed', inset: 0, zIndex: 99999, background: '#080a0f', overflow: 'hidden' }}
        >
          <style>{`
            @keyframes barberSpin {
              from { background-position: 0 0; }
              to   { background-position: 57px 0; }
            }
            @keyframes toolFloat {
              0%,100% { transform: var(--rot) translateY(0px); }
              50%     { transform: var(--rot) translateY(-7px); }
            }
          `}</style>

          {/* Outils en fond */}
          {bg.map(({ C, size, style, rotate, op }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: op }}
              transition={{ duration: 1.2, delay: i * 0.06 }}
              style={{
                position: 'absolute',
                '--rot': `rotate(${rotate}deg)`,
                transform: `rotate(${rotate}deg)`,
                animation: `toolFloat ${4.5 + (i % 5) * 0.7}s ease-in-out ${i * 0.28}s infinite`,
                ...style,
              }}
            >
              <C size={size} />
            </motion.div>
          ))}

          {/* Vignette centrale */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse 38% 38% at 50% 50%, rgba(8,10,15,0.92) 0%, rgba(8,10,15,0.15) 65%, transparent 100%)',
          }} />

          {/* Logo centré */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <motion.img
              src="/DjangoBarberLogo.png"
              alt="Django Barber"
              initial={{ opacity: 0, scale: 0.85, y: 10 }}
              animate={{ opacity: 1, scale: 1,    y: 0  }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
              style={{ height: '80px', width: 'auto', objectFit: 'contain', display: 'block' }}
            />
          </div>

          {/* Poteau de barbier */}
          <div style={{
            position: 'absolute', bottom: '3rem', left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem',
          }}>
            {/* Ombre portée sous le cylindre */}
            <div style={{
              position: 'relative',
              filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.85))',
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>

                {/* Bouchon gauche — demi-sphère */}
                <div style={{
                  width: POLE_WIDTH * 0.75, height: POLE_WIDTH, flexShrink: 0,
                  borderRadius: '50% 0 0 50%',
                  background: 'radial-gradient(ellipse 120% 100% at 25% 30%, #e8e8e8 0%, #aaa 40%, #555 100%)',
                  zIndex: 2,
                }} />

                {/* Corps cylindrique principal */}
                <div style={{
                  width: `min(${POLE_HEIGHT}px, calc(100vw - 4rem))`, height: POLE_WIDTH,
                  overflow: 'hidden', position: 'relative',
                  background: '#1a1a2e',
                }}>
                  {/* Rayures qui progressent */}
                  <div style={{
                    position: 'absolute', top: 0, bottom: 0, left: 0,
                    width: `${progress * 100}%`,
                    backgroundImage: `repeating-linear-gradient(-45deg,#d62828 0px,#d62828 10px,#ffffff 10px,#ffffff 20px,#1d4ed8 20px,#1d4ed8 30px,#ffffff 30px,#ffffff 40px)`,
                    backgroundSize: '57px 57px',
                    animation: 'barberSpin 0.5s linear infinite',
                    transition: 'width 0.04s linear',
                  }} />

                  {/* Ombres latérales (courbure cylindrique) */}
                  <div style={{
                    position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
                    background: 'linear-gradient(90deg, rgba(0,0,0,0.25) 0%, transparent 4%, transparent 96%, rgba(0,0,0,0.25) 100%)',
                  }} />

                  {/* Ombrage cylindrique haut→bas */}
                  <div style={{
                    position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none',
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.12) 22%, transparent 48%, rgba(0,0,0,0.4) 82%, rgba(0,0,0,0.65) 100%)',
                  }} />

                  {/* Reflet spéculaire (ligne brillante) */}
                  <div style={{
                    position: 'absolute', top: '6%', left: 0, right: 0, height: '16%',
                    zIndex: 4, pointerEvents: 'none',
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.82) 0%, rgba(255,255,255,0) 100%)',
                    filter: 'blur(1.5px)',
                  }} />
                </div>

                {/* Bouchon droit — demi-sphère */}
                <div style={{
                  width: POLE_WIDTH * 0.75, height: POLE_WIDTH, flexShrink: 0,
                  borderRadius: '0 50% 50% 0',
                  background: 'radial-gradient(ellipse 120% 100% at 75% 30%, #e8e8e8 0%, #aaa 40%, #555 100%)',
                  zIndex: 2,
                }} />
              </div>

              {/* Reflet sol sous le cylindre */}
              <div style={{
                position: 'absolute', bottom: -10, left: '8%', right: '8%', height: 10,
                background: 'radial-gradient(ellipse 100% 100% at 50% 0%, rgba(0,0,0,0.55) 0%, transparent 100%)',
                filter: 'blur(5px)',
              }} />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 0.5 }}
              style={{ fontSize: '0.52rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#fff', fontFamily: 'Inter, sans-serif' }}
            >
              Villejuif — 94800
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
