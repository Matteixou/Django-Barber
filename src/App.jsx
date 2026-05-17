import './App.css'
import { useState, lazy, Suspense } from 'react'
import { useLenis } from './hooks/useLenis'
import Navbar    from './components/Navbar'
import Hero      from './components/Hero'
import Cursor    from './components/Cursor'
import Preloader from './components/Preloader'
import Grain     from './components/Grain'

const Marquee       = lazy(() => import('./components/Marquee'))
const About         = lazy(() => import('./components/About'))
const Stats         = lazy(() => import('./components/Stats'))
const Skills        = lazy(() => import('./components/Skills'))
const Gallery       = lazy(() => import('./components/Gallery'))
const Experience    = lazy(() => import('./components/Experience'))
const Pricing       = lazy(() => import('./components/Pricing'))
const Contact       = lazy(() => import('./components/Contact'))
const Footer        = lazy(() => import('./components/Footer'))

export default function App() {
  const [ready, setReady] = useState(false)
  useLenis()

  return (
    <>
      <Preloader onDone={() => setReady(true)} />
      <Grain />
      <div style={{ width: '100%', minHeight: '100vh', background: '#fff', overflowX: 'hidden', opacity: ready ? 1 : 0, transition: 'opacity 1.1s cubic-bezier(0.4, 0, 0.2, 1)' }}>
        <Cursor />
        <Navbar />
        <Hero />
        <Suspense fallback={null}>
          <Marquee />
          <About />
          <Stats />
          <Skills />
          <Marquee inverted />
          <Gallery />
          <Experience />
          <Pricing />
          <Contact />
          <Footer />
        </Suspense>
      </div>
    </>
  )
}
