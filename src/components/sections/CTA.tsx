import { motion, useScroll, useTransform } from 'framer-motion'

export default function CTA() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0.75, 0.85], [0, 1])
  const scale = useTransform(scrollYProgress, [0.75, 0.85], [0.8, 1])

  return (
    <motion.section
      style={{ opacity, scale }}
      className="cta-section"
    >
      <h2>Experience Timeless Elegance</h2>
      <motion.button
        className="cta-button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Explore Collection
      </motion.button>
      <div className="cta-footer">
        <a href="#contact">Contact</a>
        <a href="#about">About</a>
        <a href="#social">Follow Us</a>
      </div>
    </motion.section>
  )
}
