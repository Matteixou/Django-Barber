import './App.css'
import { useState } from 'react'
import { useLenis } from './hooks/useLenis'
import Navbar        from './components/Navbar'
import Hero          from './components/Hero'
import Marquee       from './components/Marquee'
import About         from './components/About'
import Stats         from './components/Stats'
import Skills        from './components/Skills'
import Pricing       from './components/Pricing'
import Gallery       from './components/Gallery'
import Experience    from './components/Experience'
import GoogleReviews from './components/GoogleReviews'
import Contact       from './components/Contact'
import Footer        from './components/Footer'
import Cursor        from './components/Cursor'
import Preloader     from './components/Preloader'
import Grain         from './components/Grain'

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
        <Marquee />
        <About />
        <Stats />
        <Skills />
        <Marquee inverted />
        <Gallery />
        <Experience />
        <GoogleReviews />
        <Pricing />
        <Contact />
        <Footer />
      </div>
    </>
  )
}
