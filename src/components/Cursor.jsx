import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Cursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return

    const dot  = dotRef.current
    const ring = ringRef.current

    let mouseX = 0, mouseY = 0
    let ringX  = 0, ringY  = 0
    let rafId
    let initialized = false

    // xPercent/yPercent gérés par GSAP — pas de transform inline qui conflicte
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 })

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      gsap.set(dot, { x: mouseX, y: mouseY })
      if (!initialized) {
        initialized = true
        ringX = mouseX
        ringY = mouseY
        gsap.to([dot, ring], { opacity: 1, duration: 0.4, ease: 'power2.out' })
      }
    }

    const tick = () => {
      ringX += (mouseX - ringX) * 0.1
      ringY += (mouseY - ringY) * 0.1
      gsap.set(ring, { x: ringX, y: ringY })
      rafId = requestAnimationFrame(tick)
    }

    const onLeaveWindow = () =>
      gsap.to([dot, ring], { opacity: 0, duration: 0.3, overwrite: 'auto' })

    const onEnterWindow = () =>
      gsap.to([dot, ring], { opacity: 1, duration: 0.3, overwrite: 'auto' })

    const onEnterLink = () => {
      gsap.to(ring, { scale: 2.2, opacity: 0.6, duration: 0.35, ease: 'power2.out', overwrite: 'auto' })
      gsap.to(dot,  { scale: 0.3, duration: 0.25, overwrite: 'auto' })
    }
    const onLeaveLink = () => {
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.4, ease: 'power2.out', overwrite: 'auto' })
      gsap.to(dot,  { scale: 1, duration: 0.3, overwrite: 'auto' })
    }
    const onEnterImg = () => {
      gsap.to(ring, { scale: 3.5, opacity: 0.35, duration: 0.4, ease: 'power2.out', overwrite: 'auto' })
      gsap.to(dot,  { scale: 0, duration: 0.25, overwrite: 'auto' })
    }
    const onLeaveImg = () => {
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.4, ease: 'power2.out', overwrite: 'auto' })
      gsap.to(dot,  { scale: 1, duration: 0.3, overwrite: 'auto' })
    }

    window.addEventListener('mousemove', onMove)
    document.documentElement.addEventListener('mouseleave', onLeaveWindow)
    document.documentElement.addEventListener('mouseenter', onEnterWindow)
    rafId = requestAnimationFrame(tick)

    const links  = document.querySelectorAll('a, button')
    const images = document.querySelectorAll('img, canvas, .grid-gallery > div')

    links.forEach(el  => { el.addEventListener('mouseenter', onEnterLink); el.addEventListener('mouseleave', onLeaveLink) })
    images.forEach(el => { el.addEventListener('mouseenter', onEnterImg);  el.addEventListener('mouseleave', onLeaveImg) })

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeaveWindow)
      document.documentElement.removeEventListener('mouseenter', onEnterWindow)
      cancelAnimationFrame(rafId)
      links.forEach(el  => { el.removeEventListener('mouseenter', onEnterLink); el.removeEventListener('mouseleave', onLeaveLink) })
      images.forEach(el => { el.removeEventListener('mouseenter', onEnterImg);  el.removeEventListener('mouseleave', onLeaveImg) })
      gsap.killTweensOf([dot, ring])
    }
  }, [])

  return (
    <>
      <div ref={dotRef} style={{
        position: 'fixed', top: 0, left: 0, zIndex: 9999,
        width: '7px', height: '7px', borderRadius: '50%',
        background: '#fff', pointerEvents: 'none',
        mixBlendMode: 'difference',
        willChange: 'transform', opacity: 0,
      }} />
      <div ref={ringRef} style={{
        position: 'fixed', top: 0, left: 0, zIndex: 9998,
        width: '34px', height: '34px', borderRadius: '50%',
        border: '1.5px solid #fff', pointerEvents: 'none',
        mixBlendMode: 'difference',
        willChange: 'transform', opacity: 0,
      }} />
    </>
  )
}
