import { useLanguage } from '../context/LanguageContext'

function Especialidades() {
  const { t } = useLanguage()
  const s = t.skills

  return (
    <section id="especialidades" className="especialidades">
      <div className="interface">
        <h2 className="section-title" style={{ textAlign: 'center' }}>
          {s.title.toUpperCase()} <span>{s.titleHighlight.toUpperCase()}</span>
        </h2>
        <div className="especialidades-flex">
          <div className="especialidades-box">
            <h3>{s.fullstack.title}</h3>
            <p>{s.fullstack.desc}</p>
          </div>
          <div className="especialidades-box2">
            <h3>{s.backend.title}</h3>
            <p>{s.backend.desc}</p>
          </div>
          <div className="especialidades-box">
            <h3>{s.tools.title}</h3>
            <p>{s.tools.desc}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Especialidades
