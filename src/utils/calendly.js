// ── Remplace cette URL par ton lien Calendly après création de compte ──
// Crée ton compte sur https://calendly.com → copie ton lien de profil ici
export const CALENDLY_URL = 'https://calendly.com/matthieu94f/reservation-coupe'

export function openCalendly() {
  if (window.Calendly) {
    window.Calendly.initPopupWidget({ url: CALENDLY_URL })
  }
}
