import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from([titleRef.current, subtitleRef.current, descRef.current, ctaRef.current], {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.3
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section className="hero-section">
      <div className="hero-grid">
        <div className="hero-content">
          <h1 ref={titleRef} className="hero-title">CHRONOS ELITE</h1>
          <p ref={subtitleRef} className="hero-subtitle">Swiss Precision Since 1892</p>
          <p ref={descRef} className="hero-description">
            Handcrafted timepieces forged from 18K gold and sapphire crystal.
            Each watch represents centuries of horological mastery.
          </p>
          <button ref={ctaRef} className="hero-cta">Explore Collection</button>
        </div>
        <div className="hero-canvas-spacer"></div>
      </div>
    </section>
  )
}
