const items = [
  'DJANGO BARBER', 'VILLEJUIF', 'PRÉCISION', 'STYLE',
  'BARBE', 'COUPE SUR MESURE', 'EXPÉRIENCE', 'FINITIONS',
]

export default function Marquee({ inverted = false }) {
  const repeated = [...items, ...items, ...items]

  return (
    <div style={{
      overflow: 'hidden',
      background: inverted ? '#fff' : '#0a0a0a',
      padding: '0.85rem 0',
      borderTop:    `1px solid ${inverted ? '#ebebeb' : 'rgba(255,255,255,0.07)'}`,
      borderBottom: `1px solid ${inverted ? '#ebebeb' : 'rgba(255,255,255,0.07)'}`,
    }}>
      <div style={{
        display: 'inline-flex',
        animation: 'marqueeScroll 22s linear infinite',
        whiteSpace: 'nowrap',
        willChange: 'transform',
      }}>
        {repeated.map((item, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
            <span style={{
              fontFamily: 'Bebas Neue, cursive',
              fontSize: '0.9rem',
              letterSpacing: '0.2em',
              color: inverted ? '#0a0a0a' : 'rgba(255,255,255,0.55)',
              paddingRight: '0.5rem',
            }}>
              {item}
            </span>
            <span style={{
              color: '#3a86ff',
              fontSize: '0.5rem',
              marginRight: '1.5rem',
              opacity: 0.8,
            }}>
              ◆
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
