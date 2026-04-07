import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

function useTypewriter(text, started, speed = 38) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    setDisplayed('')
    setDone(false)
  }, [text])

  useEffect(() => {
    if (!started) return
    setDisplayed('')
    setDone(false)

    const words = text.split(' ')
    let i = 0
    const interval = setInterval(() => {
      i++
      setDisplayed(words.slice(0, i).join(' '))
      if (i >= words.length) {
        clearInterval(interval)
        setDone(true)
      }
    }, speed)
    return () => clearInterval(interval)
  }, [started, text, speed])

  return { displayed, done }
}

function Sobre() {
  const { t } = useLanguage()
  const a = t.about

  const sectionRef    = useRef(null)
  const [photoIn,     setPhotoIn]     = useState(false)
  const [bubbleIn,    setBubbleIn]    = useState(false)
  const [typeStart,   setTypeStart]   = useState(false)
  const [highlightIn, setHighlightIn] = useState(false)
  const [triggered,   setTriggered]   = useState(false)

  // Full text to type (paragraph 1 + 2 joined)
  const fullText = `${a.p1} PHP, Laravel, Vue.js, Angular e Flutter. ${a.p1end} ${a.p2}`
  const { displayed, done } = useTypewriter(fullText, typeStart)

  // Reset when language changes
  useEffect(() => {
    if (triggered) {
      setTypeStart(false)
      setHighlightIn(false)
      setTimeout(() => setTypeStart(true), 50)
    }
  }, [t])

  // IntersectionObserver
  useEffect(() => {
    if (triggered) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true)
          observer.disconnect()

          // Sequence: photo → bubble → type → highlights
          setTimeout(() => setPhotoIn(true),     100)
          setTimeout(() => setBubbleIn(true),    600)
          setTimeout(() => setTypeStart(true),  1000)
        }
      },
      { threshold: 0.25 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [triggered])

  // Show highlights after typing ends
  useEffect(() => {
    if (done) setTimeout(() => setHighlightIn(true), 300)
  }, [done])

  const highlights = [
    { icon: 'bi-mortarboard', label: a.label1, value: a.label1Value },
    { icon: 'bi-code-square', label: a.label2, value: 'Full-Stack' },
    { icon: 'bi-github',      label: a.label3, value: 'GitHub' },
  ]

  return (
    <section id="sobre" className="sobre" ref={sectionRef}>
      <div className="interface">
        <div className={`section-header comic-title ${photoIn ? 'comic-title--in' : ''}`}>
          <h2 className="section-title">{a.title} <span>{a.titleHighlight}</span></h2>
        </div>

        <div className="sobre-inner">
          {/* Foto */}
          <div className={`sobre-photo comic-photo ${photoIn ? 'comic-photo--in' : ''}`}>
            <img src="/img/foto-minha.png" alt="Luiz Henrique" />
          </div>

          {/* Conteúdo */}
          <div className="sobre-content">
            {/* Balão estilo tirinha */}
            <div className={`sobre-bubble ${bubbleIn ? 'bubble-visible' : ''}`}>
              <p className="sobre-bubble-text">
                {displayed}
                {!done && <span className="cursor-blink">|</span>}
              </p>
            </div>

            {/* Cards que aparecem após a digitação */}
            <div className={`sobre-highlights comic-highlights ${highlightIn ? 'comic-highlights--in' : ''}`}>
              {highlights.map((h, idx) => (
                <div
                  className="highlight-item"
                  key={h.label}
                  style={{ transitionDelay: `${idx * 120}ms` }}
                >
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
