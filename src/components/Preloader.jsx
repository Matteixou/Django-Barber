import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Scissors, Comb, Clipper, Razor, Brush } from './BarberIcons'

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
