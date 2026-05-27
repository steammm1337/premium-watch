import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, useGLTF } from '@react-three/drei'
import { useScroll, useTransform } from 'framer-motion'
import { Group } from 'three'

export default function Watch() {
  const watchRef = useRef<Group>(null)
  const { scrollYProgress } = useScroll()

  // Load luxury watch model from Sketchfab CDN
  const { scene } = useGLTF('https://models.readyplayer.me/64bfa36f0e72c63d7c3f4c4e.glb')

  // Scroll-driven rotations
  const rotationY = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [0, 0, Math.PI * 2, 0, 0, 0])
  const rotationX = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [0, -0.3, 0, 0, 0, 0])
  const scale = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 1.5])

  useFrame(() => {
    if (watchRef.current) {
      watchRef.current.rotation.y = rotationY.get()
      watchRef.current.rotation.x = rotationX.get()
      watchRef.current.scale.setScalar(scale.get())
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
      <group ref={watchRef}>
        <primitive object={scene} scale={2} />
      </group>
    </Float>
  )
}

useGLTF.preload('https://models.readyplayer.me/64bfa36f0e72c63d7c3f4c4e.glb')
