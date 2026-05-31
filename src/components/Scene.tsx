import { Canvas } from '@react-three/fiber'
import { Environment, ContactShadows } from '@react-three/drei'
import { Suspense, useEffect, useRef } from 'react'
import { EffectComposer, Bloom, SMAA } from '@react-three/postprocessing'
import Watch from './Watch'
import Camera from './Camera'

export default function Scene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    let animationId: number | undefined
    let isVisible = true

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
        if (!isVisible && animationId !== undefined) {
          cancelAnimationFrame(animationId)
        }
      },
      { threshold: 0.1 }
    )

    if (canvasRef.current?.parentElement) {
      observer.observe(canvasRef.current.parentElement)
    }

    return () => {
      observer.disconnect()
      if (animationId !== undefined) cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <Canvas
      ref={canvasRef}
      dpr={[1, Math.min(window.devicePixelRatio, 2)]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true
      }}
      shadows
      performance={{ min: 0.5 }}
    >
      <Suspense fallback={null}>
        <Camera />

        {/* Lighting setup */}
        <ambientLight intensity={0.4} />
        <directionalLight 
          position={[5, 8, 5]} 
          intensity={1.2} 
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <directionalLight position={[-5, 5, -5]} intensity={0.6} />
        <spotLight position={[0, 10, 0]} intensity={0.5} angle={0.3} penumbra={1} />

        {/* Watch Model */}
        <Watch />

        {/* Contact shadows */}
        <ContactShadows 
          position={[0, -1.5, 0]} 
          opacity={0.4} 
          scale={10} 
          blur={2} 
          far={4}
        />

        {/* HDRI Environment */}
        <Environment preset="city" environmentIntensity={1.2} />

        {/* Post-processing */}
        <EffectComposer>
          <Bloom 
            intensity={0.3} 
            luminanceThreshold={0.9} 
            luminanceSmoothing={0.9}
            mipmapBlur
          />
          <SMAA />
        </EffectComposer>
      </Suspense>
    </Canvas>
  )
}
