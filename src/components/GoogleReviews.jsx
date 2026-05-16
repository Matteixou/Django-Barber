import { useEffect, useState, useRef } from 'react'
import { setOptions, importLibrary } from '@googlemaps/js-api-loader'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Star } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const API_KEY  = import.meta.env.VITE_GOOGLE_API_KEY
const PLACE_ID = import.meta.env.VITE_PLACE_ID

let _configured = false

function StarRating({ rating, size = 13 }) {
  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          style={{
            color: i < Math.round(rating) ? '#f5a623' : '#ddd',
            fill:  i < Math.round(rating) ? '#f5a623' : 'none',
          }}
        />
      ))}
    </div>
  )
}

function GoogleLogo({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  )
}

function handleCardEnter(e) {
  e.currentTarget.style.borderColor = '#0a0a0a'
  gsap.to(e.currentTarget, { y: -4, duration: 0.3 })
}

function handleCardLeave(e) {
  e.currentTarget.style.borderColor = '#e8e8e8'
  gsap.to(e.currentTarget, { y: 0, duration: 0.4 })
}

export default function GoogleReviews() {
  const [place,  setPlace]  = useState(null)
  const [status, setStatus] = useState('loading')

  const sectionRef = useRef(null)
  const headerRef  = useRef(null)
  const cardsRef   = useRef(null)

  useEffect(() => {
    if (!API_KEY || !PLACE_ID || API_KEY === 'VOTRE_CLE_API_ICI') {
      setStatus('error')
      return
    }

    if (!_configured) {
      setOptions({ apiKey: API_KEY, version: 'weekly' })
      _configured = true
    }

    importLibrary('places').then(async ({ Place }) => {
      const place = new Place({ id: PLACE_ID, requestedLanguage: 'fr' })
      await place.fetchFields({ fields: ['displayName', 'rating', 'userRatingCount', 'reviews'] })
      setPlace({
        name:               place.displayName,
        rating:             place.rating,
        user_ratings_total: place.userRatingCount,
        reviews: (place.reviews || []).map(r => ({
          author_name:               r.authorAttribution?.displayName || 'Anonyme',
          profile_photo_url:         r.authorAttribution?.photoURI   || '',
          rating:                    r.rating,
          text:                      r.text?.text ?? r.text ?? '',
          relative_time_description: r.relativePublishTimeDescription || '',
        })),
      })
      setStatus('ok')
    }).catch(() => setStatus('error'))
  }, [])

  useEffect(() => {
    if (status !== 'ok') return
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current.children, {
        opacity: 0, y: 40, stagger: 0.1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: headerRef.current, start: 'top 80%' },
      })
      if (cardsRef.current?.children.length) {
        gsap.from(cardsRef.current.children, {
          opacity: 0, y: 40, stagger: 0.1, duration: 0.8, ease: 'back.out(1.2)',
          scrollTrigger: { trigger: cardsRef.current, start: 'top 85%' },
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [status])

  return (
    <section ref={sectionRef} id="google-reviews" className="section-pad" style={{ width: '100%', background: '#fafafa' }}>
      <div className="wrap">

        <div ref={headerRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <span className="accent-line" />
            <span className="section-label">Avis Google</span>
            <span className="accent-line" />
          </div>
          <h2 className="font-bebas" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: '#0a0a0a', letterSpacing: '0.05em', lineHeight: 1 }}>
            Ce qu'ils disent
          </h2>
          <p className="font-playfair" style={{ fontStyle: 'italic', fontSize: 'clamp(1.2rem, 3vw, 2.5rem)', color: '#bbb' }}>
            de notre salon.
          </p>

          {place && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: '1.5rem',
              marginTop: '2rem', padding: '1.25rem 2.25rem',
              border: '1px solid #e8e8e8', borderRadius: '1rem', background: '#fff',
              boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
            }}>
              <div style={{ textAlign: 'center' }}>
                <p className="font-bebas" style={{ fontSize: '3.2rem', color: '#0a0a0a', lineHeight: 1 }}>
                  {place.rating?.toFixed(1)}
                </p>
                <StarRating rating={place.rating} size={15} />
                <p style={{ color: '#aaa', fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', marginTop: '0.35rem' }}>
                  {place.user_ratings_total} avis
                </p>
              </div>
              <div style={{ width: '1px', height: '64px', background: '#ebebeb' }} />
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
                <GoogleLogo size={24} />
                <span style={{ fontSize: '0.58rem', color: '#bbb', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Google</span>
              </div>
            </div>
          )}
        </div>

        {status === 'loading' && (
          <p style={{ textAlign: 'center', color: '#bbb', fontSize: '0.85rem' }}>Chargement des avis…</p>
        )}
        {status === 'error' && (
          <p style={{ textAlign: 'center', color: '#e55', fontSize: '0.85rem', lineHeight: 1.8 }}>
            Impossible de charger les avis.<br />
            Vérifiez <code>VITE_GOOGLE_API_KEY</code> et <code>VITE_PLACE_ID</code> dans votre fichier <code>.env</code>.
          </p>
        )}

        {status === 'ok' && place?.reviews && (
          <div ref={cardsRef} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
            {place.reviews.map((review, i) => (
              <div
                key={i}
                className="card-clean"
                style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}
                onMouseEnter={handleCardEnter}
                onMouseLeave={handleCardLeave}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <img
                    src={review.profile_photo_url}
                    alt={review.author_name}
                    style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover', filter: 'grayscale(0.2)' }}
                    onError={e => { e.currentTarget.style.display = 'none' }}
                  />
                  <div>
                    <p style={{ color: '#0a0a0a', fontSize: '0.875rem', fontWeight: 600, lineHeight: 1.2 }}>{review.author_name}</p>
                    <p style={{ color: '#bbb', fontSize: '0.62rem', letterSpacing: '0.08em', marginTop: '0.1rem' }}>{review.relative_time_description}</p>
                  </div>
                </div>
                <StarRating rating={review.rating} />
                {review.text && (
                  <p style={{ color: '#666', fontSize: '0.83rem', lineHeight: 1.8, fontStyle: 'italic', flexGrow: 1 }}>
                    "{review.text.length > 220 ? review.text.slice(0, 220) + '…' : review.text}"
                  </p>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', paddingTop: '0.5rem', borderTop: '1px solid #f0f0f0' }}>
                  <GoogleLogo size={12} />
                  <span style={{ fontSize: '0.58rem', color: '#ccc', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Avis Google</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
