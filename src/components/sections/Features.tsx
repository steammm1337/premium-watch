import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Features() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0.55, 0.65, 0.75, 0.8], [0, 1, 1, 0])

  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.feature-card')
      gsap.from(cards, {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 75%',
          end: 'bottom 25%',
          toggleActions: 'play none none reverse'
        },
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        stagger: gsap.utils.distribute({
          base: 0,
          amount: 0.6,
          from: 'center'
        }),
        ease: 'back.out(1.2)'
      })
    }, cardsRef)
    return () => ctx.revert()
  }, [])

  return (
    <motion.section
      style={{ opacity }}
      className="features-section"
    >
      <h2>Engineering Excellence</h2>
      <div ref={cardsRef} className="features-grid">
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
