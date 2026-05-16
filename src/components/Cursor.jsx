import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Cursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    // Pas de curseur sur touch
    if (window.matchMedia('(hover: none)').matches) return

    let mouseX = 0, mouseY = 0
    let ringX  = 0, ringY  = 0
    let rafId

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      gsap.set(dotRef.current, { x: mouseX, y: mouseY })
    }

    const tick = () => {
      ringX += (mouseX - ringX) * 0.1
      ringY += (mouseY - ringY) * 0.1
      gsap.set(ringRef.current, { x: ringX, y: ringY })
      rafId = requestAnimationFrame(tick)
    }

    const onEnterLink = () => {
      gsap.to(ringRef.current, { scale: 2.2, opacity: 0.6, duration: 0.35, ease: 'power2.out' })
      gsap.to(dotRef.current, { scale: 0.3, duration: 0.25 })
    }
    const onLeaveLink = () => {
      gsap.to(ringRef.current, { scale: 1, opacity: 1, duration: 0.4, ease: 'power2.out' })
      gsap.to(dotRef.current, { scale: 1, duration: 0.3 })
    }
    const onEnterImg = () => {
      gsap.to(ringRef.current, { scale: 3.5, opacity: 0.35, duration: 0.4, ease: 'power2.out' })
      gsap.to(dotRef.current, { scale: 0, duration: 0.25 })
    }
    const onLeaveImg = () => {
      gsap.to(ringRef.current, { scale: 1, opacity: 1, duration: 0.4, ease: 'power2.out' })
      gsap.to(dotRef.current, { scale: 1, duration: 0.3 })
    }

    window.addEventListener('mousemove', onMove)
    rafId = requestAnimationFrame(tick)

    // Applique les effets sur tous les éléments interactifs
    const links   = document.querySelectorAll('a, button')
    const images  = document.querySelectorAll('img, canvas, .grid-gallery > div')

    links.forEach(el  => { el.addEventListener('mouseenter', onEnterLink); el.addEventListener('mouseleave', onLeaveLink) })
    images.forEach(el => { el.addEventListener('mouseenter', onEnterImg);  el.addEventListener('mouseleave', onLeaveImg) })

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
      links.forEach(el  => { el.removeEventListener('mouseenter', onEnterLink); el.removeEventListener('mouseleave', onLeaveLink) })
      images.forEach(el => { el.removeEventListener('mouseenter', onEnterImg);  el.removeEventListener('mouseleave', onLeaveImg) })
    }
  }, [])

  return (
    <>
      <div ref={dotRef} style={{
        position: 'fixed', top: 0, left: 0, zIndex: 9999,
        width: '7px', height: '7px', borderRadius: '50%',
        background: '#fff', pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
        mixBlendMode: 'difference',
      }} />
      <div ref={ringRef} style={{
        position: 'fixed', top: 0, left: 0, zIndex: 9998,
        width: '34px', height: '34px', borderRadius: '50%',
        border: '1.5px solid #fff', pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
        mixBlendMode: 'difference',
      }} />
    </>
  )
}
