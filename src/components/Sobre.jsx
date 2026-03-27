import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

function Sobre() {
  const { t } = useLanguage()
  const a = t.about
  const bubbleRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(false)
    const timeout = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(timeout)
  }, [t])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.3 }
    )
    if (bubbleRef.current) observer.observe(bubbleRef.current)
    return () => observer.disconnect()
  }, [])

  const highlights = [
    { icon: 'bi-mortarboard', label: a.label1, value: 'ADS' },
    { icon: 'bi-code-square', label: a.label2, value: 'Full-Stack' },
    { icon: 'bi-github', label: a.label3, value: 'GitHub' },
  ]

  return (
    <section id="sobre" className="sobre">
      <div className="interface">
        <div className="section-header">
          <h2 className="section-title">{a.title} <span>{a.titleHighlight}</span></h2>
        </div>
        <div className="sobre-inner">
          <div className="sobre-photo">
            <img src="/img/foto-minha.png" alt="Luiz Henrique" />
          </div>
          <div className="sobre-content">
            <div ref={bubbleRef} className={`sobre-bubble ${visible ? 'bubble-visible' : ''}`}>
              <p>
                {a.p1} <strong>PHP, Laravel, Vue.js, Angular</strong> e <strong>Flutter</strong>.{' '}
                {a.p1end}
              </p>
              <p>{a.p2}</p>
            </div>
            <div className="sobre-highlights">
              {highlights.map((h) => (
                <div className="highlight-item" key={h.label}>
                  <i className={`bi ${h.icon}`}></i>
                  <div>
                    <span className="highlight-label">{h.label}</span>
                    <span className="highlight-value">{h.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Sobre
