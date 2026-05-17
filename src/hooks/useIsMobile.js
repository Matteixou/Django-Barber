import { useState, useEffect } from 'react'

const check = () =>
  window.matchMedia('(hover: none)').matches || window.innerWidth < 768

export function useIsMobile() {
  const [mobile, setMobile] = useState(check)
  useEffect(() => {
    const handler = () => setMobile(check())
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])
  return mobile
}
