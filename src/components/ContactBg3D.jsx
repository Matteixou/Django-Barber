import { Suspense, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { useRef } from 'react'
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
    const pattern = [
      { color: '#cc1111', w: 96 },
      { color: '#ffffff', w: 32 },
      { color: '#1144cc', w: 96 },
      { color: '#ffffff', w: 32 },
    ]
    const totalW = 256, slope = W
    for (let tile = -2; tile <= 4; tile++) {
      let ox = tile * totalW
      for (const { color, w } of pattern) {
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.moveTo(ox, 0); ctx.lineTo(ox + w, 0)
        ctx.lineTo(ox + w + slope, H); ctx.lineTo(ox + slope, H)
        ctx.closePath(); ctx.fill()
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

function FloatingPole() {
  const groupRef    = useRef()
  const cylinderRef = useRef()
  const stripeTexture = useStripeTexture()

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (groupRef.current) {
      groupRef.current.position.y  = Math.sin(t * 0.4) * 0.12
      groupRef.current.rotation.y += 0.003
    }
    if (cylinderRef.current) {
      cylinderRef.current.rotation.y = t * 0.75
    }
  })

  const seg = isAndroid ? 16 : 32

  return (
    <group ref={groupRef} rotation={[-0.05, 0.3, 0.35]} scale={1.6}>
      {/* Top dome */}
      <mesh position={[0, 1.44, 0]}>
        <sphereGeometry args={[0.52, seg, seg, 0, Math.PI * 2, 0, Math.PI * 0.52]} />
        <meshPhysicalMaterial color="#cdd2da" roughness={0.22} metalness={0.70} envMapIntensity={2.2} />
      </mesh>
      <mesh position={[0, 1.36, 0]}>
        <cylinderGeometry args={[0.50, 0.48, 0.14, seg]} />
        <meshPhysicalMaterial color="#9aa0ab" roughness={0.15} metalness={0.85} envMapIntensity={2.5} />
      </mesh>
      <mesh position={[0, 1.22, 0]}>
        <cylinderGeometry args={[0.43, 0.43, 0.06, seg]} />
        <meshPhysicalMaterial color="#7e858f" roughness={0.12} metalness={0.90} envMapIntensity={2.8} />
      </mesh>
      {/* Rotating stripe cylinder */}
      <mesh ref={cylinderRef}>
        <cylinderGeometry args={[0.40, 0.40, 2.40, isAndroid ? 24 : 48, 1, false]} />
        <meshPhysicalMaterial map={stripeTexture} roughness={0.28} metalness={0.04} envMapIntensity={0.6} />
      </mesh>
      {/* Glass panels */}
      <mesh position={[-0.42, 0, 0]}>
        <boxGeometry args={[0.045, 2.40, 0.12]} />
        <meshPhysicalMaterial color="#a8ddd6" roughness={0.04} metalness={0} transparent opacity={0.55} envMapIntensity={1.8} />
      </mesh>
      <mesh position={[0.42, 0, 0]}>
        <boxGeometry args={[0.045, 2.40, 0.12]} />
        <meshPhysicalMaterial color="#a8ddd6" roughness={0.04} metalness={0} transparent opacity={0.55} envMapIntensity={1.8} />
      </mesh>
      <mesh position={[0, -1.22, 0]}>
        <cylinderGeometry args={[0.43, 0.43, 0.06, seg]} />
        <meshPhysicalMaterial color="#7e858f" roughness={0.12} metalness={0.90} envMapIntensity={2.8} />
      </mesh>
      <mesh position={[0, -1.36, 0]}>
        <cylinderGeometry args={[0.48, 0.50, 0.14, seg]} />
        <meshPhysicalMaterial color="#9aa0ab" roughness={0.15} metalness={0.85} envMapIntensity={2.5} />
      </mesh>
      {/* Bottom dome */}
      <mesh position={[0, -1.44, 0]} rotation={[Math.PI, 0, 0]}>
        <sphereGeometry args={[0.52, seg, seg, 0, Math.PI * 2, 0, Math.PI * 0.52]} />
        <meshPhysicalMaterial color="#cdd2da" roughness={0.22} metalness={0.70} envMapIntensity={2.2} />
      </mesh>
    </group>
  )
}

export default function ContactBg3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 42 }}
      gl={{ antialias: !isAndroid, alpha: true, toneMapping: 3 }}
      dpr={isAndroid ? [1, 1.5] : undefined}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.25} />
        <directionalLight position={[4, 7, 4]}   intensity={2.0} color="#ffffff" />
        {!isAndroid && <directionalLight position={[-4, 2, 2]}  intensity={0.5} color="#c8d8ff" />}
        {!isAndroid && <directionalLight position={[0, -3, -4]} intensity={0.6} color="#3a86ff" />}
        {!isAndroid && <pointLight position={[0, -3, 3]} intensity={0.8} color="#3a86ff" distance={10} />}
        <FloatingPole />
        {!isAndroid && <Environment preset="warehouse" />}
      </Suspense>
    </Canvas>
  )
}
