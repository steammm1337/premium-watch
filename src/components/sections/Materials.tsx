import { motion, useScroll, useTransform } from 'framer-motion'

export default function Materials() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0.35, 0.45, 0.55, 0.6], [0, 1, 1, 0])

  return (
    <motion.section
      style={{ opacity }}
      className="materials-section"
    >
      <h2>Crafted from Excellence</h2>
      <div className="materials-grid">
        <div className="material-card">
          <h3>18K Gold</h3>
          <p>Solid gold case and crown</p>
        </div>
        <div className="material-card">
          <h3>Sapphire Crystal</h3>
          <p>Anti-reflective coating</p>
        </div>
        <div className="material-card">
          <h3>Italian Leather</h3>
          <p>Hand-stitched strap</p>
        </div>
      </div>
    </motion.section>
  )
}
