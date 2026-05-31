import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Materials() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0.4, 0.5, 0.6, 0.65], [0, 1, 1, 0])

  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.material-card')
      gsap.from(cards, {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 70%',
          end: 'bottom 30%',
          toggleActions: 'play none none reverse'
        },
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out'
      })
    }, cardsRef)
    return () => ctx.revert()
  }, [])

  return (
    <motion.section
      style={{ opacity }}
      className="materials-section"
    >
      <h2>Crafted from Excellence</h2>
      <div ref={cardsRef} className="materials-grid">
        <div className="material-card">
          <div className="material-overlay">
            <h3>18K Gold</h3>
            <p>Solid gold case and bracelet</p>
          </div>
        </div>
        <div className="material-card">
          <div className="material-overlay">
            <h3>Sapphire Crystal</h3>
            <p>Anti-reflective coating</p>
          </div>
        </div>
        <div className="material-card">
          <div className="material-overlay">
            <h3>Swiss Movement</h3>
            <p>Certified chronometer</p>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
