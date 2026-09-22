import { DIFFICULTY_LEVELS } from '../data/prizeLadder'
import './DifficultyBubbles.css'

// current: posición 1-12 de la pregunta activa.
export default function DifficultyBubbles({ current }) {
  const bubbles = []
  let n = 1
  for (const level of DIFFICULTY_LEVELS) {
    for (let i = 0; i < 3; i++) {
      let state = 'future'
      if (n < current) state = 'done'
      else if (n === current) state = 'current'
      bubbles.push({ n, color: level.color, state })
      n++
    }
  }

  return (
    <div className="bubbles-wrap">
      <div className="bubbles-track" />
      <div className="bubbles-row">
        {bubbles.map((b) => (
          <div
            key={b.n}
            className={`bubble bubble-${b.state}`}
            style={{ '--c': b.color }}
          >
            {b.n}
          </div>
        ))}
      </div>
      <div className="bubbles-tags">
        {DIFFICULTY_LEVELS.map((level) => (
          <span key={level.id} className="bubble-tag" style={{ '--c': level.color }}>
            {level.label}
          </span>
        ))}
      </div>
    </div>
  )
}
