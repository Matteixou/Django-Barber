import { InstagramIcon, SnapchatIcon, TikTokIcon } from '../icons/SocialIcons'
import { INSTAGRAM_URL, SNAPCHAT_URL, TIKTOK_URL } from '../constants/socialLinks'

const SOCIAL_LINKS = [
  { href: INSTAGRAM_URL, Icon: InstagramIcon },
  { href: SNAPCHAT_URL,  Icon: SnapchatIcon  },
  { href: TIKTOK_URL,    Icon: TikTokIcon    },
]

const linkStyle = { color: 'rgba(255,255,255,0.25)', transition: 'color 0.3s', textDecoration: 'none' }

function handleSocialEnter(e) { e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }
function handleSocialLeave(e) { e.currentTarget.style.color = 'rgba(255,255,255,0.25)' }

export default function Footer({ onOpenMentions }) {
  return (
    <footer style={{ width: '100%', background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '2.5rem 0' }}>
      <div className="wrap footer-inner">
        <img
          src="/DjangoBarberLogo.png"
          alt="Django Barber"
          style={{ height: '40px', width: 'auto', objectFit: 'contain', opacity: 0.4 }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem' }}>
          <p style={{ color: 'rgba(255,255,255,0.18)', fontSize: '0.72rem', letterSpacing: '0.1em', textAlign: 'center', margin: 0 }}>
            © {new Date().getFullYear()} Django Barber — Tous droits réservés.
          </p>
          <button
            onClick={onOpenMentions}
            style={{
              color: 'rgba(255,255,255,0.22)',
              fontSize: '0.62rem',
              letterSpacing: '0.1em',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
              textDecorationColor: 'rgba(255,255,255,0.14)',
              transition: 'color 0.3s, text-decoration-color 0.3s',
              padding: 0,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = 'rgba(255,255,255,0.55)'
              e.currentTarget.style.textDecorationColor = 'rgba(255,255,255,0.4)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'rgba(255,255,255,0.22)'
              e.currentTarget.style.textDecorationColor = 'rgba(255,255,255,0.14)'
            }}
          >
            Mentions légales
          </button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {SOCIAL_LINKS.map(({ href, Icon }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
              onMouseEnter={handleSocialEnter}
              onMouseLeave={handleSocialLeave}
            >
              <Icon size={15} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
