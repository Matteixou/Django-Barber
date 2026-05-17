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

export default function Footer() {
  return (
    <footer style={{ width: '100%', background: '#0a0a0a', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '2.5rem 0' }}>
      <div className="wrap footer-inner">
        <img
          src="/DjangoBarberLogo.png"
          alt="Django Barber"
          style={{ height: '40px', width: 'auto', objectFit: 'contain', opacity: 0.4 }}
        />
        <p style={{ color: 'rgba(255,255,255,0.18)', fontSize: '0.72rem', letterSpacing: '0.1em', textAlign: 'center' }}>
          © {new Date().getFullYear()} Django Barber — Tous droits réservés.
        </p>
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
