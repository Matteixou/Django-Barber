import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import Clipper3D from './Clipper3D'
import { isAndroid } from '../utils/deviceDetect'

export default function Hero3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 38 }}
      gl={{ antialias: !isAndroid, alpha: true, toneMapping: 3 }}
      dpr={isAndroid ? [1, 1.5] : undefined}
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
  )
}
