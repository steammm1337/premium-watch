import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { useScroll, useTransform } from 'framer-motion'
import { Group } from 'three'

export default function Watch() {
  const watchRef = useRef<Group>(null)
  const { scrollYProgress } = useScroll()

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
        {/* Temporary placeholder - will be replaced with actual GLB model */}
        <mesh castShadow>
          <cylinderGeometry args={[1, 1, 0.3, 32]} />
          <meshStandardMaterial
            color="#D4AF37"
            metalness={1}
            roughness={0.2}
          />
        </mesh>

        {/* Watch face */}
        <mesh position={[0, 0.16, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.9, 32]} />
          <meshStandardMaterial color="#FAFAF8" />
        </mesh>

        {/* Watch hands */}
        <mesh position={[0, 0.17, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <boxGeometry args={[0.02, 0.5, 0.01]} />
          <meshStandardMaterial color="#1A1A1A" />
        </mesh>
        <mesh position={[0, 0.17, 0.3]} rotation={[-Math.PI / 2, 0, Math.PI / 4]}>
          <boxGeometry args={[0.02, 0.35, 0.01]} />
          <meshStandardMaterial color="#1A1A1A" />
        </mesh>
      </group>
    </Float>
  )
}
