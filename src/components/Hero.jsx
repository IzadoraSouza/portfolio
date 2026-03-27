import { useLanguage } from '../context/LanguageContext'

function Hero() {
  const { t } = useLanguage()

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="inicio" className="hero">
      <div className="interface hero-inner">
        <div className="hero-text">
          <span className="hero-label">{t.hero.greeting}</span>
          <h1>Luiz Henrique</h1>
          <h2 className="hero-role">{t.hero.role} <span>{t.hero.roleHighlight}</span></h2>
          <p>{t.hero.description}</p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => scrollTo('contato')}>
              {t.hero.btnContact}
            </button>
            <button className="btn-secondary" onClick={() => scrollTo('projetos')}>
              {t.hero.btnProjects} <i className="bi bi-arrow-right"></i>
            </button>
          </div>
        </div>
        <div className="hero-image">
          <img src="/img/computer.png" alt="Computador" />
        </div>
      </div>
    </section>
  )
}

export default Hero
