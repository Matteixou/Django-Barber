export default function Grain() {
  return (
    <div
      className="grain-overlay"
      style={{
        position: 'fixed', zIndex: 9001,
        top: '-10%', left: '-10%',
        width: '120%', height: '120%',
        pointerEvents: 'none',
        opacity: 0.048,
        mixBlendMode: 'overlay',
      }}
    >
      <svg width="100%" height="100%">
        <filter id="grain-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.72"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-filter)" />
      </svg>
    </div>
  )
}
