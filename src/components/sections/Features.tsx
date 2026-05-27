import { motion, useScroll, useTransform } from 'framer-motion'

export default function Features() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0.55, 0.65, 0.75, 0.8], [0, 1, 1, 0])

  return (
    <motion.section
      style={{ opacity }}
      className="features-section"
    >
      <h2>Engineering Excellence</h2>
      <div className="features-grid">
        <div className="feature-card">
          <h3>Crown</h3>
          <p>Precision winding mechanism</p>
        </div>
        <div className="feature-card">
          <h3>Bezel</h3>
          <p>Polished 18K gold</p>
        </div>
        <div className="feature-card">
          <h3>Movement</h3>
          <p>Swiss automatic caliber</p>
        </div>
        <div className="feature-card">
          <h3>Strap</h3>
          <p>Italian leather with deployment clasp</p>
        </div>
      </div>
    </motion.section>
  )
}
