import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { Suspense } from 'react'
import Watch from './Watch'
import Camera from './Camera'

export default function Scene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: 'high-performance'
      }}
      performance={{ min: 0.5 }}
    >
      <Suspense fallback={null}>
        <Camera />

        {/* Lighting */}
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        {/* Watch Model */}
        <Watch />

        {/* Environment */}
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  )
}
