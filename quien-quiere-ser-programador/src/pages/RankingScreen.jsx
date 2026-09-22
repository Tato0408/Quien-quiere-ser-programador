import { useState } from 'react'
import { getRanking, removeResult } from '../utils/ranking'
import { formatPrize } from '../data/prizeLadder'
import './RankingScreen.css'

const DELETE_PASSWORD = 'cONTRASEÑA'

export default function RankingScreen({ onPlayAgain, onGoHome }) {
  const [players, setPlayers] = useState(() => getRanking())
  const [confirmAt, setConfirmAt] = useState(null)
  const [password, setPassword] = useState('')

  function openConfirm(at) {
    setConfirmAt((current) => (current === at ? null : at))
    setPassword('')
  }

  function cancelConfirm() {
    setConfirmAt(null)
    setPassword('')
  }

  function handleDelete(at) {
    if (password !== DELETE_PASSWORD) return
    setPlayers(removeResult(at))
    setConfirmAt(null)
    setPassword('')
  }

  return (
    <div className="rank-stage">
      <span className="rank-confetti" style={{ left: '5.5%', top: '13%', color: 'var(--neon-blue)' }}>01</span>
      <span className="rank-confetti" style={{ right: '6.2%', top: '15%', color: 'var(--gold)', animationDelay: '1s' }}>{'{ }'}</span>
      <span className="rank-confetti" style={{ left: '8.3%', top: '71%', color: 'var(--purple)', animationDelay: '2s' }}>{'</>'}</span>
      <span className="rank-confetti" style={{ right: '8.3%', top: '76%', color: '#34d399', animationDelay: '1.4s' }}>$_</span>

      <div className="rank-header">
        <div className="rank-kicker">// Fin de la partida</div>
        <h1>Tabla de posiciones</h1>
        <div className="rank-subhead">Día del Programador — Ranking global</div>
      </div>

      <div className="rank-panel">
        <div className="rank-row rank-row-head">
          <span className="rank-col-rk">#</span>
          <span className="rank-col-av" />
          <span className="rank-col-name">Jugador</span>
          <span className="rank-col-ai">IA elegida</span>
          <span className="rank-col-score">Puntaje</span>
          <span className="rank-col-del" />
        </div>

        {players.length === 0 && (
          <div className="rank-empty">Todavía nadie ha jugado una partida.</div>
        )}

        {players.map((p, i) => (
          <div className="rank-row" key={p.at}>
            <span className="rank-col-rk">#{i + 1}</span>
            <span className="rank-col-av">
              <span className="rank-avatar" style={{ '--c': `${p.color}22` }}>
                <img src={p.deskImg} alt={p.characterName} />
              </span>
            </span>
            <span className="rank-col-name">{p.name}</span>
            <span className="rank-col-ai">{p.characterName}</span>
            <span className="rank-col-score">{formatPrize(p.amount)}</span>
            <span className="rank-col-del">
              {confirmAt === p.at ? (
                <span className="rank-confirm">
                  <input
                    type="password"
                    autoFocus
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleDelete(p.at)}
                  />
                  <button
                    type="button"
                    className="rank-confirm-ok"
                    disabled={password !== DELETE_PASSWORD}
                    onClick={() => handleDelete(p.at)}
                    aria-label={`Confirmar eliminación de ${p.name}`}
                  >
                    ✓
                  </button>
                  <button
                    type="button"
                    className="rank-confirm-cancel"
                    onClick={cancelConfirm}
                    aria-label="Cancelar"
                  >
                    ✕
                  </button>
                </span>
              ) : (
                <button
                  type="button"
                  className="rank-trash"
                  onClick={() => openConfirm(p.at)}
                  aria-label={`Eliminar a ${p.name}`}
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 7h16" strokeLinecap="round" />
                    <path d="M9 7V4.5A1.5 1.5 0 0 1 10.5 3h3A1.5 1.5 0 0 1 15 4.5V7" strokeLinecap="round" />
                    <path d="M6 7l1 13a1.5 1.5 0 0 0 1.5 1.4h7a1.5 1.5 0 0 0 1.5-1.4l1-13" strokeLinecap="round" />
                    <path d="M10 11v6M14 11v6" strokeLinecap="round" />
                  </svg>
                </button>
              )}
            </span>
          </div>
        ))}
      </div>

      <div className="rank-actions">
        <button type="button" className="rank-home" onClick={onGoHome}>
          ◂ Volver al inicio
        </button>
        <button type="button" className="rank-again" onClick={onPlayAgain}>
          Jugar de nuevo ▸
        </button>
      </div>

      <div className="rank-footer">Programar hoy · un mundo mejor mañana</div>
    </div>
  )
}
