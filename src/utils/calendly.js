export const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL

export function openCalendly() {
  if (window.Calendly && CALENDLY_URL) {
    window.Calendly.initPopupWidget({ url: CALENDLY_URL })
  }
}
