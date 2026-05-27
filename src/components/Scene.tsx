import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows } from '@react-three/drei'
import { Suspense } from 'react'
import Watch from './Watch'
import Camera from './Camera'

export default function Scene() {
  return (
    <Canvas
      shadows
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <Suspense fallback={null}>
        <Camera />

        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={1}
          intensity={0.5}
          castShadow
        />

        {/* Watch Model */}
        <Watch />

        {/* Environment */}
        <Environment preset="studio" />

        {/* Shadows */}
        <ContactShadows
          position={[0, -1.4, 0]}
          opacity={0.5}
          scale={10}
          blur={2}
          far={4}
        />
      </Suspense>
    </Canvas>
  )
}
