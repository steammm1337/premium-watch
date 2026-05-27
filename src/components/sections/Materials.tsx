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
        <div className="material-card" style={{ backgroundImage: 'url(https://images.pexels.com/photos/1454171/pexels-photo-1454171.jpeg?auto=compress&cs=tinysrgb&w=800)' }}>
          <div className="material-overlay">
            <h3>18K Gold</h3>
            <p>Solid gold case and crown</p>
          </div>
        </div>
        <div className="material-card" style={{ backgroundImage: 'url(https://images.pexels.com/photos/1616403/pexels-photo-1616403.jpeg?auto=compress&cs=tinysrgb&w=800)' }}>
          <div className="material-overlay">
            <h3>Sapphire Crystal</h3>
            <p>Anti-reflective coating</p>
          </div>
        </div>
        <div className="material-card" style={{ backgroundImage: 'url(https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=800)' }}>
          <div className="material-overlay">
            <h3>Italian Leather</h3>
            <p>Hand-stitched strap</p>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
