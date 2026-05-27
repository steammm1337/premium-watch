import { motion, useScroll, useTransform } from 'framer-motion'

export default function Details() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0.15, 0.25, 0.35, 0.4], [0, 1, 1, 0])
  const x = useTransform(scrollYProgress, [0.15, 0.25], [-100, 0])

  return (
    <motion.section
      style={{ opacity }}
      className="details-section"
    >
      <motion.div style={{ x }} className="detail-card">
        <h3>Automatic Movement</h3>
        <p>Self-winding mechanical caliber</p>
      </motion.div>
      <motion.div style={{ x: useTransform(scrollYProgress, [0.2, 0.3], [-100, 0]) }} className="detail-card">
        <h3>42-Hour Power Reserve</h3>
        <p>Continuous precision timekeeping</p>
      </motion.div>
      <motion.div style={{ x: useTransform(scrollYProgress, [0.25, 0.35], [-100, 0]) }} className="detail-card">
        <h3>Sapphire Crystal</h3>
        <p>Scratch-resistant transparency</p>
      </motion.div>
    </motion.section>
  )
}
