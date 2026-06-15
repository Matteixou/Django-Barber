import { useEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { X } from 'lucide-react'
import { lenisControl } from '../hooks/useLenis'

export default function MentionsLegales({ onClose }) {
  const scrollRef = useRef(null)

  useEffect(() => {
    lenisControl.stop()
    return () => lenisControl.start()
  }, [])

  // Lenis écoute wheel sur window (bubble phase) — on stoppe la propagation
  // depuis l'overlay pour qu'il ne reçoive jamais l'événement.
  // Le scroll natif (overflow-y: auto) prend alors le relais.
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onWheel = (e) => e.stopPropagation()
    el.addEventListener('wheel', onWheel, { passive: true })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <motion.div
      ref={scrollRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.28 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9000,
        background: '#ffffff',
        overflowY: 'auto',
        overscrollBehavior: 'contain',
        touchAction: 'pan-y',
      }}
    >
      {/* Bouton fermer */}
      <button
        onClick={onClose}
        aria-label="Fermer"
        style={{
          position: 'fixed',
          top: '1.25rem',
          right: '1.5rem',
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          background: '#0a0a0a',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9100,
          transition: 'background 0.3s, transform 0.3s',
          flexShrink: 0,
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = '#333'
          e.currentTarget.style.transform = 'rotate(90deg) scale(1.05)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = '#0a0a0a'
          e.currentTarget.style.transform = 'rotate(0deg) scale(1)'
        }}
      >
        <X size={18} />
      </button>

      <div className="wrap" style={{ paddingTop: '4.5rem', paddingBottom: '5rem' }}>

        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          style={{ marginBottom: '3rem', borderBottom: '1px solid #ebebeb', paddingBottom: '2rem' }}
        >
          <img
            src="/DjangoBarberLogo.png"
            alt="Django Barber"
            style={{ height: '30px', width: 'auto', objectFit: 'contain', marginBottom: '1.5rem', opacity: 0.65 }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.6rem' }}>
            <span className="accent-line" />
            <span className="section-label">Informations légales</span>
          </div>
          <h1 className="font-bebas" style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)', color: '#0a0a0a', lineHeight: 1, letterSpacing: '0.02em' }}>
            Mentions légales
          </h1>
          <p style={{ color: '#bbb', fontSize: '0.72rem', letterSpacing: '0.12em', marginTop: '0.75rem' }}>
            Mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </motion.div>

        {/* Contenu */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.18 }}
          style={{ maxWidth: '720px' }}
        >
          <LegalSection title="1. Éditeur du site">
            <p>Ce site est édité par :</p>
            <LegalList items={[
              ['Dénomination', 'Django Barber'],
              ['Forme juridique', 'Auto-entrepreneur'],
              ['Adresse', '9 rue Gaston Cantini, 94800 Villejuif, France'],
              ['E-mail', 'niamenomoko9421@gmail.com'],
              ['SIRET', 'En cours d\'immatriculation'],
            ]} />
          </LegalSection>

          <LegalSection title="2. Directeur de la publication">
            <p>
              Le directeur de la publication est Niame Nomoko, représentant légal de Django Barber.
            </p>
          </LegalSection>

          <LegalSection title="3. Hébergement">
            <p>Le site est hébergé par :</p>
            <LegalList items={[
              ['Société', 'Vercel Inc.'],
              ['Adresse', '340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis'],
              ['Site web', 'https://vercel.com'],
            ]} />
          </LegalSection>

          <LegalSection title="4. Propriété intellectuelle">
            <p>
              L'ensemble des éléments constituant ce site (textes, photographies, logos, icônes, illustrations, vidéos, etc.) est la propriété exclusive de Django Barber, sauf mention contraire.
            </p>
            <p>
              Toute reproduction, représentation, modification ou exploitation de tout ou partie du contenu de ce site, sous quelque forme que ce soit, est interdite sans l'autorisation préalable et écrite de Django Barber.
            </p>
          </LegalSection>

          <LegalSection title="5. Données personnelles & RGPD">
            <p>
              Les informations collectées via ce site (formulaire de contact, prise de rendez-vous via Calendly) sont utilisées exclusivement dans le cadre de la relation commerciale avec nos clients et ne sont pas transmises à des tiers sans consentement explicite.
            </p>
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD — Règlement UE 2016/679) et à la loi Informatique et Libertés n° 78-17 du 6 janvier 1978, vous disposez d'un droit d'accès, de rectification, de limitation, d'opposition et d'effacement de vos données personnelles.
            </p>
            <p>
              Pour exercer ces droits, contactez-nous à : <strong>niamenomoko9421@gmail.com</strong>.
            </p>
          </LegalSection>

          <LegalSection title="6. Cookies">
            <p>
              Ce site peut utiliser des cookies techniques nécessaires à son bon fonctionnement. Aucun cookie publicitaire ou de traçage tiers n'est déposé sans votre consentement. Vous pouvez configurer ou désactiver les cookies depuis les paramètres de votre navigateur.
            </p>
          </LegalSection>

          <LegalSection title="7. Liens hypertextes">
            <p>
              Ce site peut contenir des liens vers des sites tiers (réseaux sociaux, service de réservation Calendly). Django Barber ne saurait être tenu responsable du contenu de ces sites ni des dommages pouvant résulter de leur consultation.
            </p>
          </LegalSection>

          <LegalSection title="8. Limitation de responsabilité" last>
            <p>
              Django Barber s'efforce d'assurer l'exactitude et la mise à jour des informations publiées sur ce site. Toutefois, des erreurs ou omissions ponctuelles ne sauraient engager sa responsabilité. Les informations présentes sont susceptibles d'évoluer sans préavis.
            </p>
          </LegalSection>
        </motion.div>

        {/* Retour */}
        <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #ebebeb' }}>
          <button
            onClick={onClose}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: '#0a0a0a', color: '#fff',
              padding: '0.85rem 1.75rem', borderRadius: '9999px',
              border: 'none', cursor: 'pointer',
              fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase',
              transition: 'background 0.3s, transform 0.3s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#333'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#0a0a0a'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            ← Retour au site
          </button>
        </div>
      </div>
    </motion.div>
  )
}

function LegalSection({ title, children, last = false }) {
  return (
    <section style={{
      marginBottom: last ? 0 : '2.5rem',
      paddingBottom: last ? 0 : '2.5rem',
      borderBottom: last ? 'none' : '1px solid #f0f0f0',
    }}>
      <h2 className="font-bebas" style={{
        fontSize: '1.35rem', color: '#0a0a0a', letterSpacing: '0.08em',
        marginBottom: '1rem',
        display: 'flex', alignItems: 'center', gap: '0.6rem',
      }}>
        <span style={{ display: 'inline-block', width: '3px', height: '1.1em', background: '#0a0a0a', flexShrink: 0, borderRadius: '2px' }} />
        {title}
      </h2>
      <div style={{ color: '#555', fontSize: '0.88rem', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {children}
      </div>
    </section>
  )
}

function LegalList({ items }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: '0.45rem',
      marginTop: '0.5rem', padding: '1rem 1.25rem',
      background: '#fafafa', border: '1px solid #ebebeb', borderRadius: '0.75rem',
    }}>
      {items.map(([key, value]) => (
        <div key={key} style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', flexWrap: 'wrap' }}>
          <span style={{ color: '#aaa', flexShrink: 0, minWidth: '120px' }}>{key}</span>
          <span style={{ color: '#333' }}>{value}</span>
        </div>
      ))}
    </div>
  )
}
