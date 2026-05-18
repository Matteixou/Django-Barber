import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { isAndroid } from '../utils/deviceDetect'

function useStripeTexture() {
  return useMemo(() => {
    const W = 512, H = 512
    const canvas = document.createElement('canvas')
    canvas.width = W
    canvas.height = H
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, W, H)

    /* pattern totalW=256 divides W=512 evenly → seamless horizontal wrap
       slope=W=512 → 45° diagonal → one full revolution per pole height    */
    const pattern = [
      { color: '#cc1111', w: 96 },
      { color: '#ffffff', w: 32 },
      { color: '#1144cc', w: 96 },
      { color: '#ffffff', w: 32 },
    ]
    const totalW = 256
    const slope  = W

    for (let tile = -2; tile <= 4; tile++) {
      let ox = tile * totalW
      for (const { color, w } of pattern) {
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.moveTo(ox,             0)
        ctx.lineTo(ox + w,         0)
        ctx.lineTo(ox + w + slope, H)
        ctx.lineTo(ox + slope,     H)
        ctx.closePath()
        ctx.fill()
        ox += w
      }
    }

    const tex = new THREE.CanvasTexture(canvas)
    tex.wrapS = THREE.RepeatWrapping
    tex.wrapT = THREE.RepeatWrapping
    tex.needsUpdate = true
    return tex
  }, [])
}

function BarberPole() {
  const cylinderRef   = useRef()
  const stripeTexture = useStripeTexture()

  useFrame((state) => {
    if (cylinderRef.current)
      cylinderRef.current.rotation.y = state.clock.elapsedTime * 0.75
  })

  return (
    <group>

      {/* ══ Top dome ══ */}
      <mesh position={[0, 1.44, 0]}>
        <sphereGeometry args={[0.52, isAndroid ? 16 : 32, isAndroid ? 16 : 32, 0, Math.PI * 2, 0, Math.PI * 0.52]} />
        <meshPhysicalMaterial color="#cdd2da" roughness={0.22} metalness={0.70} envMapIntensity={2.2} />
      </mesh>

      {/* Top wide cap ring */}
      <mesh position={[0, 1.36, 0]}>
        <cylinderGeometry args={[0.50, 0.48, 0.14, isAndroid ? 16 : 32]} />
        <meshPhysicalMaterial color="#9aa0ab" roughness={0.15} metalness={0.85} envMapIntensity={2.5} />
      </mesh>

      {/* Top narrow separator */}
      <mesh position={[0, 1.22, 0]}>
        <cylinderGeometry args={[0.43, 0.43, 0.06, isAndroid ? 16 : 32]} />
        <meshPhysicalMaterial color="#7e858f" roughness={0.12} metalness={0.90} envMapIntensity={2.8} />
      </mesh>

      {/* ══ Rotating stripe cylinder ══ */}
      <mesh ref={cylinderRef}>
        <cylinderGeometry args={[0.40, 0.40, 2.40, isAndroid ? 24 : 48, 1, false]} />
        <meshPhysicalMaterial map={stripeTexture} roughness={0.28} metalness={0.04} envMapIntensity={0.6} />
      </mesh>

      {/* ══ Glass side panels ══ */}
      <mesh position={[-0.42, 0, 0]}>
        <boxGeometry args={[0.045, 2.40, 0.12]} />
        <meshPhysicalMaterial color="#a8ddd6" roughness={0.04} metalness={0.0}
          transparent opacity={0.55} envMapIntensity={1.8} />
      </mesh>
      <mesh position={[0.42, 0, 0]}>
        <boxGeometry args={[0.045, 2.40, 0.12]} />
        <meshPhysicalMaterial color="#a8ddd6" roughness={0.04} metalness={0.0}
          transparent opacity={0.55} envMapIntensity={1.8} />
      </mesh>

      {/* ══ Bottom narrow separator ══ */}
      <mesh position={[0, -1.22, 0]}>
        <cylinderGeometry args={[0.43, 0.43, 0.06, isAndroid ? 16 : 32]} />
        <meshPhysicalMaterial color="#7e858f" roughness={0.12} metalness={0.90} envMapIntensity={2.8} />
      </mesh>

      {/* Bottom wide cap ring */}
      <mesh position={[0, -1.36, 0]}>
        <cylinderGeometry args={[0.48, 0.50, 0.14, isAndroid ? 16 : 32]} />
        <meshPhysicalMaterial color="#9aa0ab" roughness={0.15} metalness={0.85} envMapIntensity={2.5} />
      </mesh>

      {/* ══ Bottom dome (flipped) ══ */}
      <mesh position={[0, -1.44, 0]} rotation={[Math.PI, 0, 0]}>
        <sphereGeometry args={[0.52, isAndroid ? 16 : 32, isAndroid ? 16 : 32, 0, Math.PI * 2, 0, Math.PI * 0.52]} />
        <meshPhysicalMaterial color="#cdd2da" roughness={0.22} metalness={0.70} envMapIntensity={2.2} />
      </mesh>

    </group>
  )
}

export default function Clipper3D() {
  const groupRef  = useRef()
  const scrollRef = useRef(0)
  const scaleRef  = useRef(1)

  useEffect(() => {
    const onScroll = () => {
      scrollRef.current = Math.min(window.scrollY / window.innerHeight, 1)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useFrame((state) => {
    const t = state.clock.elapsedTime

    const targetScale = 1 + scrollRef.current * 3.0
    scaleRef.current += (targetScale - scaleRef.current) * 0.07

    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.55) * 0.10
      groupRef.current.scale.setScalar(scaleRef.current)
    }
  })

  return (
    <group rotation={[-0.05, 0.20, 0.42]}>
      <group ref={groupRef}>
        <BarberPole />
      </group>
    </group>
  )
}
