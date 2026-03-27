import { LanguageProvider } from './context/LanguageContext'
import Header from './components/Header'
import Hero from './components/Hero'
import Especialidades from './components/Especialidades'
import Sobre from './components/Sobre'
import Portfolio from './components/Portfolio'
import Contato from './components/Contato'
import Footer from './components/Footer'

function App() {
  return (
    <LanguageProvider>
      <Header />
      <main>
        <Hero />
        <Especialidades />
        <Sobre />
        <Portfolio />
        <Contato />
      </main>
      <Footer />
    </LanguageProvider>
  )
}

export default App
