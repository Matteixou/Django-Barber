import { Scissors, Comb, Clipper, Razor, Brush } from './BarberIcons'

const ITEMS = [
  // Colonne gauche
  // Colonne gauche
  { Icon: Scissors, size: 70,  x:  1,  y:  5,  rotate:  -25, op: 0.28, dur: 8.0 },
  { Icon: Brush,    size: 42,  x:  4,  y: 30,  rotate:   40, op: 0.24, dur: 9.5 },
  { Icon: Razor,    size: 75,  x: -1,  y: 55,  rotate:   15, op: 0.26, dur: 7.5 },
  { Icon: Clipper,  size: 48,  x:  3,  y: 78,  rotate:  -18, op: 0.22, dur: 10.0 },
  { Icon: Comb,     size: 55,  x:  8,  y: 88,  rotate:   12, op: 0.20, dur: 8.5 },
  // Colonne droite
  { Icon: Scissors, size: 68,  x: 88,  y:  5,  rotate:   28, op: 0.28, dur: 8.0 },
  { Icon: Comb,     size: 75,  x: 87,  y: 25,  rotate:   -8, op: 0.26, dur: 9.0 },
  { Icon: Brush,    size: 42,  x: 91,  y: 48,  rotate:   45, op: 0.24, dur: 10.5 },
  { Icon: Razor,    size: 70,  x: 88,  y: 70,  rotate:   12, op: 0.25, dur: 7.5 },
  { Icon: Clipper,  size: 50,  x: 90,  y: 88,  rotate:  -22, op: 0.26, dur: 8.5 },
]

export default function FloatingParticles() {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 55% 45% at 85% 10%, rgba(58,134,255,0.04) 0%, transparent 65%)',
      }} />
      {ITEMS.map(({ Icon, size, x, y, rotate, op, dur }, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left:    `${x}%`,
            top:     `${y}%`,
            opacity: op,
            transform: `rotate(${rotate}deg)`,
            animation: `float-particle ${dur}s ${-(i * 0.9)}s infinite ease-in-out`,
          }}
        >
          <Icon size={size} />
        </div>
      ))}
    </div>
  )
}
