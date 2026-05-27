import { motion, useScroll, useTransform } from 'framer-motion'

export default function Hero() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -50])

  return (
    <motion.section
      style={{ opacity, y }}
      className="hero-section"
    >
      <h1 className="hero-title">CHRONOS ELITE</h1>
      <p className="hero-subtitle">Swiss Precision Since 1892</p>
    </motion.section>
  )
}
