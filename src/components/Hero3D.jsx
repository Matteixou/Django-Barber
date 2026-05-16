import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import Clipper3D from './Clipper3D'

export default function Hero3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 38 }}
      gl={{ antialias: true, alpha: true, toneMapping: 3 }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[4, 7, 4]}   intensity={2.5} color="#ffffff" />
        <directionalLight position={[-4, 2, 2]}  intensity={0.6} color="#c8d8ff" />
        <directionalLight position={[0, -3, -4]} intensity={0.8} color="#3a86ff" />
        <pointLight position={[0, -3, 3]} intensity={1.0} color="#3a86ff" distance={10} />
        <pointLight position={[2, 5, 2]}  intensity={0.7} color="#ffffff"  distance={12} />
        <Clipper3D />
        <Environment preset="warehouse" />
      </Suspense>
    </Canvas>
  )
}
