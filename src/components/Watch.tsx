import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import { useScroll, useTransform } from 'framer-motion'
import { Group } from 'three'

export default function Watch() {
  const watchRef = useRef<Group>(null)
  const { scrollYProgress } = useScroll()

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
        {/* Watch case - ultra smooth */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[1.2, 1.2, 0.4, 128]} />
          <meshPhysicalMaterial
            color="#FFD700"
            metalness={1.0}
            roughness={0.12}
            envMapIntensity={1.5}
            clearcoat={0.3}
            clearcoatRoughness={0.1}
          />
        </mesh>

        {/* Watch bezel - hyper smooth torus */}
        <mesh position={[0, 0.21, 0]} castShadow>
          <torusGeometry args={[1.15, 0.08, 64, 128]} />
          <meshPhysicalMaterial
            color="#DAA520"
            metalness={1.0}
            roughness={0.18}
            envMapIntensity={1.4}
          />
        </mesh>

        {/* Watch face - sapphire crystal */}
        <mesh position={[0, 0.21, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[1.1, 128]} />
          <meshPhysicalMaterial
            color="#FFFFFF"
            transmission={0.95}
            thickness={0.15}
            roughness={0.02}
            transparent
            opacity={0.25}
            ior={1.77}
            envMapIntensity={1.0}
          />
        </mesh>

        {/* Watch dial */}
        <mesh position={[0, 0.19, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[1.05, 128]} />
          <meshStandardMaterial
            color="#0A0A0A"
            metalness={0.4}
            roughness={0.6}
          />
        </mesh>

        {/* Hour markers */}
        {[0, 3, 6, 9].map((i) => {
          const angle = (i * Math.PI) / 6
          const x = Math.cos(angle) * 0.85
          const z = Math.sin(angle) * 0.85
          return (
            <mesh
              key={i}
              position={[x, 0.2, z]}
              rotation={[-Math.PI / 2, 0, angle]}
              castShadow
            >
              <boxGeometry args={[0.04, 0.15, 0.02]} />
              <meshPhysicalMaterial 
                color="#FFD700" 
                metalness={1.0} 
                roughness={0.15}
                envMapIntensity={1.3}
              />
            </mesh>
          )
        })}

        {/* Hour hand */}
        <mesh position={[0, 0.21, 0.25]} rotation={[-Math.PI / 2, 0, Math.PI / 6]} castShadow>
          <boxGeometry args={[0.04, 0.5, 0.02]} />
          <meshPhysicalMaterial 
            color="#FFD700" 
            metalness={1.0} 
            roughness={0.15}
            envMapIntensity={1.3}
          />
        </mesh>

        {/* Minute hand */}
        <mesh position={[0, 0.22, 0.35]} rotation={[-Math.PI / 2, 0, Math.PI / 3]} castShadow>
          <boxGeometry args={[0.03, 0.7, 0.02]} />
          <meshPhysicalMaterial 
            color="#FFD700" 
            metalness={1.0} 
            roughness={0.15}
            envMapIntensity={1.3}
          />
        </mesh>

        {/* Second hand */}
        <mesh position={[0, 0.23, 0.4]} rotation={[-Math.PI / 2, 0, Math.PI / 4]} castShadow>
          <boxGeometry args={[0.015, 0.75, 0.01]} />
          <meshPhysicalMaterial 
            color="#C41E3A" 
            metalness={1.0} 
            roughness={0.08}
            envMapIntensity={1.5}
          />
        </mesh>

        {/* Center cap */}
        <mesh position={[0, 0.24, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.04, 64]} />
          <meshPhysicalMaterial 
            color="#FFD700" 
            metalness={1.0} 
            roughness={0.1}
            envMapIntensity={1.4}
          />
        </mesh>

        {/* Crown */}
        <mesh position={[1.3, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.12, 0.15, 0.3, 64]} />
          <meshPhysicalMaterial
            color="#FFD700"
            metalness={1.0}
            roughness={0.25}
            envMapIntensity={1.3}
          />
        </mesh>

        {/* Watch lugs */}
        <mesh position={[0, 0, 1.4]} castShadow>
          <boxGeometry args={[0.3, 0.4, 0.2]} />
          <meshPhysicalMaterial 
            color="#FFD700" 
            metalness={1.0} 
            roughness={0.18}
            envMapIntensity={1.3}
          />
        </mesh>
        <mesh position={[0, 0, -1.4]} castShadow>
          <boxGeometry args={[0.3, 0.4, 0.2]} />
          <meshPhysicalMaterial 
            color="#FFD700" 
            metalness={1.0} 
            roughness={0.18}
            envMapIntensity={1.3}
          />
        </mesh>
      </group>
    </Float>
  )
}
