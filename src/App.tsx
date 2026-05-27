import Scene from './components/Scene'
import Hero from './components/sections/Hero'
import Details from './components/sections/Details'
import Materials from './components/sections/Materials'
import Features from './components/sections/Features'
import CTA from './components/sections/CTA'
import ScrollProgress from './components/ScrollProgress'
import './App.css'

function App() {
  return (
    <div className="app">
      <ScrollProgress />

      {/* 3D Canvas - fixed position */}
      <div className="canvas-container">
        <Scene />
      </div>

      {/* Scroll sections - overlay on canvas */}
      <div className="scroll-container">
        <Hero />
        <Details />
        <Materials />
        <Features />
        <CTA />
      </div>
    </div>
  )
}

export default App
