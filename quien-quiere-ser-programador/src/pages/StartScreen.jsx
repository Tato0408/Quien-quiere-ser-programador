import { useState } from 'react'
import './StartScreen.css'

export default function StartScreen({ onPlay, onViewRanking }) {
  const [leaving, setLeaving] = useState(false)

  function navigate(callback) {
    if (leaving) return
    setLeaving(true)
    setTimeout(callback, 650)
  }

  return (
    <div className={`start-stage ${leaving ? 'start-stage-leave' : ''}`}>
      <div className="start-grid" />

      <span className="start-particle" style={{ left: '8%', top: '18%' }}>{'{ }'}</span>
      <span className="start-particle" style={{ right: '9%', top: '14%', animationDelay: '1s' }}>{'</>'}</span>
      <span className="start-particle" style={{ left: '12%', top: '70%', animationDelay: '2s' }}>01</span>
      <span className="start-particle" style={{ right: '10%', top: '72%', animationDelay: '1.4s' }}>$_</span>

      <div className="start-content">
        <div className="start-kicker">// Inicializando sistema</div>
        <h1 className="start-title">
          ¿Quién Quiere Ser
          <br />
          Programador?
        </h1>
        <div className="start-subtitle">Edición Día del Programador</div>
        <div className="start-tagline">Innovar &nbsp;·&nbsp; Crear &nbsp;·&nbsp; Solucionar &nbsp;·&nbsp; Programar</div>

        <button type="button" className="start-play" onClick={() => navigate(onPlay)}>
          <span>¡Jugar!</span>
          <span className="start-cursor" />
        </button>

        <button type="button" className="start-ranking-link" onClick={() => navigate(onViewRanking)}>
          Ver ranking
        </button>
      </div>

      <div className="start-footer">Programar hoy · un mundo mejor mañana</div>
    </div>
  )
}
