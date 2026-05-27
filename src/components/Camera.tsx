import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll, useTransform } from 'framer-motion'
import { PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

export default function Camera() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null)
  const { scrollYProgress } = useScroll()

  // Camera positions for each section
  const positionX = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [0, 0, 3, 0, 0, 0]
  )
  const positionY = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [0, 0, 1, 2, 0, 0]
  )
  const positionZ = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    [5, 2, 3, 4, 4, 4]
  )

  useFrame(() => {
    if (cameraRef.current) {
      cameraRef.current.position.x = positionX.get()
      cameraRef.current.position.y = positionY.get()
      cameraRef.current.position.z = positionZ.get()
      cameraRef.current.lookAt(0, 0, 0)
    }
  })

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      fov={50}
      position={[0, 0, 5]}
    />
  )
}
