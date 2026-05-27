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
      <video
        autoPlay
        loop
        muted
        playsInline
        className="hero-video"
        poster="https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1920"
      >
        <source src="https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e7c02d&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
      </video>
      <div className="hero-content">
        <h1 className="hero-title">CHRONOS ELITE</h1>
        <p className="hero-subtitle">Swiss Precision Since 1892</p>
        <p className="hero-description">
          Handcrafted timepieces that transcend generations. Each watch is a masterpiece
          of horological excellence, combining traditional craftsmanship with modern innovation.
        </p>
      </div>
    </motion.section>
  )
}
