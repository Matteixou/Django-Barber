import { Suspense, useState, useCallback, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import Clipper3D from './Clipper3D'
import { isAndroid } from '../utils/deviceDetect'

export default function Hero3D() {
  const [canvasKey, setCanvasKey]   = useState(0)
  const [frameloop, setFrameloop]   = useState('always')
  const wrapRef = useRef(null)

  const handleCreated = useCallback(({ gl }) => {
    gl.domElement.addEventListener('webglcontextlost', (e) => {
      e.preventDefault()
      setTimeout(() => setCanvasKey(k => k + 1), 500)
    })
  }, [])

  useEffect(() => {
    if (!isAndroid) return
    const el = wrapRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setFrameloop(entry.isIntersecting ? 'always' : 'never'),
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={wrapRef} style={{ width: '100%', height: '100%' }}>
      <Canvas
        key={canvasKey}
        frameloop={isAndroid ? frameloop : 'always'}
        camera={{ position: [0, 0, 7], fov: 38 }}
        gl={{
          antialias: !isAndroid,
          alpha: true,
          toneMapping: 3,
          powerPreference: isAndroid ? 'low-power' : 'high-performance',
        }}
        dpr={isAndroid ? [1, 1.5] : undefined}
        onCreated={handleCreated}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <directionalLight position={[4, 7, 4]}   intensity={2.5} color="#ffffff" />
          {!isAndroid && <directionalLight position={[-4, 2, 2]}  intensity={0.6} color="#c8d8ff" />}
          <directionalLight position={[0, -3, -4]} intensity={0.8} color="#3a86ff" />
          {!isAndroid && <pointLight position={[0, -3, 3]} intensity={1.0} color="#3a86ff" distance={10} />}
          {!isAndroid && <pointLight position={[2, 5, 2]}  intensity={0.7} color="#ffffff"  distance={12} />}
          <Clipper3D />
          {!isAndroid && <Environment preset="warehouse" />}
        </Suspense>
      </Canvas>
    </div>
  )
}
