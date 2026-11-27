import { useHashRoute } from './hooks/useHashRoute'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FeaturedPos from './components/FeaturedPos'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import PosCaseStudy from './components/PosCaseStudy'

export default function App() {
  const route = useHashRoute()

  return (
    <div id="top" className="min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-fg focus:px-3 focus:py-2 focus:text-bg"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        {route === 'pos' ? (
          <PosCaseStudy />
        ) : (
          <>
            <Hero />
            <FeaturedPos />
            <Experience />
            <Projects />
            <Skills />
            <Contact />
          </>
        )}
      </main>
      <Footer />
    </div>
  )
}
