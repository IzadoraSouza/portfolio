import { useState, useEffect, useCallback } from 'react'
import { useLanguage } from '../context/LanguageContext'

const projectImages = [
  '/pdf/Leonel_Gessos.pdf',
  '/pdf/EnglishFast.pdf',
  '/pdf/Equali Consultoria.pdf',
  '/pdf/Rejuvenesce.pdf',
  '/pdf/Izadora.pdf',
]

const projectTags = [
  ['Laravel', 'Vue.js', 'Tailwind CSS'],
  ['React', 'JavaScript', 'CSS'],
  ['React', 'JavaScript', 'CSS'],
  ['Laravel', 'Vue.js', 'Tailwind CSS'],
  ['React', 'JavaScript', 'CSS'],
]

const projectLinks = [
  'https://leonelgesso.com.br',
  'https://lightcoral-caterpillar-755231.hostingersite.com',
  'https://red-chough-671278.hostingersite.com',
  'https://rejuvenesceestetica.com.br',
  'https://izadoraportfolio.com',
]

function Portfolio() {
  const { t } = useLanguage()
  const p = t.portfolio
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  const next = useCallback(() => {
    setCurrent(i => (i + 1) % projectImages.length)
  }, [])

  const prev = () => setCurrent(i => (i - 1 + projectImages.length) % projectImages.length)

  useEffect(() => {
    if (paused) return
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [paused, next])

  const image = projectImages[current]
  const tags = projectTags[current]
  const live = projectLinks[current]
  const project = p.projects[current]
  const isPdf = image.endsWith('.pdf')

  return (
    <section id="projetos" className="portfolio">
      <div className="interface">
        <div className="section-header">
          <h2 className="section-title">{p.title} <span>{p.titleHighlight}</span></h2>
          <p className="section-subtitle">{p.subtitle}</p>
        </div>

        <div
          className="carousel"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <button className="carousel-btn carousel-prev" onClick={prev} aria-label={p.prev}>
            <i className="bi bi-chevron-left"></i>
          </button>

          <div className="carousel-card">
            <div className="carousel-preview">
              {isPdf ? (
                <iframe
                  key={image}
                  src={`${image}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                  title={project.title}
                  className="carousel-iframe"
                  scrolling="no"
                />
              ) : (
                <div className="carousel-img" style={{ backgroundImage: `url(${image})` }} />
              )}
              <a href={live} target="_blank" rel="noreferrer" className="carousel-overlay">
                <span>
                  <i className="bi bi-box-arrow-up-right"></i> {p.viewProject}
                </span>
              </a>
            </div>

            <div className="carousel-info">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-tags">
                {tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}
              </div>
              <a href={live} target="_blank" rel="noreferrer" className="btn-primary carousel-cta">
                <i className="bi bi-box-arrow-up-right"></i> {p.visit}
              </a>
            </div>
          </div>

          <button className="carousel-btn carousel-next" onClick={next} aria-label={p.next}>
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>

        <div className="carousel-dots">
          {projectImages.map((_, i) => (
            <button
              key={i}
              className={`carousel-dot ${i === current ? 'active' : ''}`}
              onClick={() => setCurrent(i)}
              aria-label={`${p.title} ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Portfolio
