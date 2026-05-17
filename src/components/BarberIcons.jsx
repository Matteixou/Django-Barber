export const Scissors = ({ size }) => (
  <svg width={size} viewBox="0 0 160 100" fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="36" cy="27" rx="28" ry="21" strokeWidth="2"/>
    <ellipse cx="36" cy="27" rx="16" ry="12" strokeWidth="1.5"/>
    <path d="M 18 44 Q 10 53 14 60 Q 18 65 25 61" strokeWidth="1.5"/>
    <ellipse cx="36" cy="73" rx="28" ry="21" strokeWidth="2"/>
    <ellipse cx="36" cy="73" rx="16" ry="12" strokeWidth="1.5"/>
    <path d="M 58 33 Q 70 40 80 50 Q 70 60 58 67" strokeWidth="2"/>
    <path d="M 80 50 Q 112 44 150 37" strokeWidth="2.5"/>
    <path d="M 80 50 Q 112 46 148 40" strokeWidth="1"/>
    <path d="M 80 50 Q 112 56 150 63" strokeWidth="2.5"/>
    <path d="M 80 50 Q 112 54 148 60" strokeWidth="1"/>
    <circle cx="80" cy="50" r="5.5" strokeWidth="2"/>
    <line x1="77" y1="50" x2="83" y2="50" strokeWidth="1.2"/>
    <line x1="80" y1="47" x2="80" y2="53" strokeWidth="1.2"/>
  </svg>
)

export const Comb = ({ size }) => (
  <svg width={size} viewBox="0 0 220 65" fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="216" height="28" rx="7" strokeWidth="2"/>
    <rect x="8" y="8" width="204" height="10" rx="4" strokeWidth="1.2"/>
    <line x1="148" y1="2" x2="148" y2="30" strokeWidth="1.5"/>
    {Array.from({ length: 9 }, (_, i) => (
      <path key={`w${i}`} d={`M ${12 + i * 15} 30 L ${12 + i * 15} 57 Q ${19.5 + i * 15} 62 ${27 + i * 15} 57 L ${27 + i * 15} 30`} strokeWidth="1.8"/>
    ))}
    {Array.from({ length: 16 }, (_, i) => (
      <rect key={`f${i}`} x={153 + i * 4} y="30" width="2.5" height="30" rx="1.2" strokeWidth="1.3"/>
    ))}
  </svg>
)

export const Clipper = ({ size }) => (
  <svg width={size} viewBox="0 0 85 178" fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round">
    <path d="M 18 5 Q 5 5 5 22 L 5 118 Q 5 130 42 130 Q 79 130 79 118 L 79 22 Q 79 5 66 5 Z" strokeWidth="2"/>
    <path d="M 5 35 Q 2 45 2 65 Q 2 85 5 95" strokeWidth="1.2"/>
    <circle cx="42" cy="48" r="13" strokeWidth="2"/>
    <circle cx="42" cy="48" r="7" strokeWidth="1.5"/>
    <path d="M 42 39 L 42 43" strokeWidth="2" strokeLinecap="round"/>
    <rect x="24" y="76" width="36" height="12" rx="6" strokeWidth="1.8"/>
    <circle cx="33" cy="82" r="5" strokeWidth="1.5"/>
    {[96, 103, 110].map(y => <line key={y} x1="20" y1={y} x2="64" y2={y} strokeWidth="1.2"/>)}
    <path d="M 5 124 L 5 144 Q 5 152 18 152 L 66 152 Q 79 152 79 144 L 79 124 Z" strokeWidth="2"/>
    <rect x="9" y="147" width="66" height="8" rx="2.5" strokeWidth="1.5"/>
    {Array.from({ length: 10 }, (_, i) => <rect key={i} x={11 + i * 6.2} y="155" width="4" height="20" rx="2" strokeWidth="1.5"/>)}
    {Array.from({ length: 9 },  (_, i) => <rect key={i} x={14.1 + i * 6.2} y="155" width="2.8" height="14" rx="1.4" strokeWidth="1.2"/>)}
  </svg>
)

export const Razor = ({ size }) => (
  <svg width={size} viewBox="0 0 210 72" fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round">
    <path d="M 12 10 L 160 8 Q 188 8 188 36 Q 188 64 160 64 L 12 62 Z" strokeWidth="2"/>
    <rect x="12" y="8" width="148" height="11" rx="3" strokeWidth="1.5"/>
    <path d="M 14 58 Q 140 60 162 60 Q 184 58 186 36" strokeWidth="1.2"/>
    <path d="M 18 22 Q 145 19 172 36 Q 145 53 18 50" strokeWidth="1"/>
    <ellipse cx="95" cy="36" rx="28" ry="9" strokeWidth="1" opacity="0.6"/>
    <circle cx="12" cy="36" r="5.5" strokeWidth="2"/>
    <path d="M 6 36 Q 6 66 15 68 L 200 68 Q 208 68 208 62 L 208 42 Q 208 36 200 36" strokeWidth="1.8"/>
    <circle cx="168" cy="52" r="4" strokeWidth="1.5"/>
    <circle cx="195" cy="52" r="4" strokeWidth="1.5"/>
    {[155, 160, 165, 170, 175].map(x => <line key={x} x1={x} y1="40" x2={x} y2="64" strokeWidth="1" opacity="0.5"/>)}
  </svg>
)

export const Brush = ({ size }) => (
  <svg width={size} viewBox="0 0 80 155" fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round">
    <path d="M 10 54 Q 7 12 40 8 Q 73 12 70 54" strokeWidth="2"/>
    <path d="M 18 12 Q 16 30 14 54" strokeWidth="1.2"/>
    <path d="M 27 9  Q 26 30 25 54" strokeWidth="1.2"/>
    <path d="M 40 8  Q 40 30 40 54" strokeWidth="1.2"/>
    <path d="M 53 9  Q 54 30 55 54" strokeWidth="1.2"/>
    <path d="M 62 12 Q 64 30 66 54" strokeWidth="1.2"/>
    <rect x="10" y="52" width="60" height="13" rx="2" strokeWidth="2"/>
    <line x1="10" y1="59" x2="70" y2="59" strokeWidth="1"/>
    <path d="M 12 65 Q 8 82 10 100 L 70 100 Q 72 82 68 65 Z" strokeWidth="1.8"/>
    <path d="M 10 100 Q 14 108 18 112 L 62 112 Q 66 108 70 100" strokeWidth="1.5"/>
    <path d="M 18 112 Q 16 128 18 135 L 62 135 Q 64 128 62 112 Z" strokeWidth="1.8"/>
    <ellipse cx="40" cy="135" rx="22" ry="7" strokeWidth="1.8"/>
    <path d="M 18 135 Q 20 146 40 147 Q 60 146 62 135" strokeWidth="1.5"/>
  </svg>
)
