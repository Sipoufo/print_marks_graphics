import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import HeroSection from './sections/HeroSection'
import ServicesSection from './sections/ServicesSection'
import WorkflowSection from './sections/WorkflowSection'
import AboutSection from './sections/AboutSection'
import TeamSection from './sections/TeamSection'
import ContactSection from './sections/ContactSection'

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main className="flex-grow">
        <HeroSection />
        <ServicesSection />
        <WorkflowSection />
        <AboutSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  )
}

export default App
