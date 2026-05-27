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
        {/* Watch case - main body */}
        <mesh>
          <cylinderGeometry args={[1.2, 1.2, 0.4, 32]} />
          <meshStandardMaterial
            color="#D4AF37"
            metalness={1}
            roughness={0.15}
          />
        </mesh>

        {/* Watch bezel - outer ring */}
        <mesh position={[0, 0.21, 0]}>
          <torusGeometry args={[1.15, 0.08, 8, 32]} />
          <meshStandardMaterial
            color="#C5A028"
            metalness={1}
            roughness={0.2}
          />
        </mesh>

        {/* Watch face - glass crystal */}
        <mesh position={[0, 0.21, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[1.1, 32]} />
          <meshPhysicalMaterial
            color="#FFFFFF"
            transmission={0.9}
            thickness={0.1}
            roughness={0.05}
            transparent
            opacity={0.3}
          />
        </mesh>

        {/* Watch dial - face background */}
        <mesh position={[0, 0.19, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[1.05, 32]} />
          <meshStandardMaterial
            color="#0A0A0A"
            metalness={0.3}
            roughness={0.7}
          />
        </mesh>

        {/* Hour markers - only 12, 3, 6, 9 */}
        {[0, 3, 6, 9].map((i) => {
          const angle = (i * Math.PI) / 6
          const x = Math.cos(angle) * 0.85
          const z = Math.sin(angle) * 0.85
          return (
            <mesh
              key={i}
              position={[x, 0.2, z]}
              rotation={[-Math.PI / 2, 0, angle]}
            >
              <boxGeometry args={[0.04, 0.15, 0.02]} />
              <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.2} />
            </mesh>
          )
        })}

        {/* Hour hand */}
        <mesh position={[0, 0.21, 0.25]} rotation={[-Math.PI / 2, 0, Math.PI / 6]}>
          <boxGeometry args={[0.04, 0.5, 0.02]} />
          <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.2} />
        </mesh>

        {/* Minute hand */}
        <mesh position={[0, 0.22, 0.35]} rotation={[-Math.PI / 2, 0, Math.PI / 3]}>
          <boxGeometry args={[0.03, 0.7, 0.02]} />
          <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.2} />
        </mesh>

        {/* Second hand */}
        <mesh position={[0, 0.23, 0.4]} rotation={[-Math.PI / 2, 0, Math.PI / 4]}>
          <boxGeometry args={[0.015, 0.75, 0.01]} />
          <meshStandardMaterial color="#C41E3A" metalness={1} roughness={0.1} />
        </mesh>

        {/* Center cap */}
        <mesh position={[0, 0.24, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.04, 16]} />
          <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.1} />
        </mesh>

        {/* Crown */}
        <mesh position={[1.3, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.12, 0.15, 0.3, 16]} />
          <meshStandardMaterial
            color="#D4AF37"
            metalness={1}
            roughness={0.3}
          />
        </mesh>

        {/* Watch lugs - strap connectors */}
        <mesh position={[0, 0, 1.4]}>
          <boxGeometry args={[0.3, 0.4, 0.2]} />
          <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0, -1.4]}>
          <boxGeometry args={[0.3, 0.4, 0.2]} />
          <meshStandardMaterial color="#D4AF37" metalness={1} roughness={0.2} />
        </mesh>
      </group>
    </Float>
  )
}
