import { useState } from 'react'
import CharacterCard from '../components/CharacterCard'
import { CHARACTERS } from '../data/characters'
import { playStart } from '../utils/sound'
import './CharacterSelectScreen.css'

export default function CharacterSelectScreen({ onStart }) {
  const [selectedId, setSelectedId] = useState(null)
  const [name, setName] = useState('')

  const canStart = selectedId != null && name.trim().length > 0

  function handleStart() {
    if (!canStart) return
    playStart()
    onStart({ name: name.trim(), characterId: selectedId })
  }

  return (
    <div className="select-stage">
      <div className="select-scan" />
      <span className="select-particle" style={{ left: '2.5%', top: '21%' }}>01</span>
      <span className="select-particle" style={{ right: '2.7%', top: '23%', animationDelay: '1s' }}>{'{ }'}</span>
      <span className="select-particle" style={{ left: '1.6%', top: '71%', animationDelay: '2s' }}>{'</>'}</span>
      <span className="select-particle" style={{ right: '1.9%', top: '67%', animationDelay: '1.6s' }}>git init</span>

      <div className="select-topbar">
        <div>
          <span className="select-dot" /> Jugador 1 · en línea
        </div>
        <div className="select-insert-coin">Insert coin ▸</div>
      </div>

      <div className="select-header">
        <div className="select-kicker">// Selección de personaje</div>
        <h1>Elige tu IA</h1>
        <div className="select-subhead">10 modelos disponibles — Claude es el presentador</div>
      </div>

      <div className="select-grid">
        {CHARACTERS.map((c) => (
          <CharacterCard
            key={c.id}
            character={c}
            selected={selectedId === c.id}
            onClick={() => setSelectedId(c.id)}
          />
        ))}
      </div>

      <div className="select-bottom">
        <div className="select-name-field">
          <span>Tu nombre:</span>
          <input
            type="text"
            placeholder="ESCRIBE_AQUI"
            value={name}
            maxLength={16}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="select-picked">
          Seleccionado: <b>{selectedId ? CHARACTERS.find((c) => c.id === selectedId).name : '—'}</b>
        </div>
        <button type="button" className="select-go" disabled={!canStart} onClick={handleStart}>
          ¡A jugar! ▸
        </button>
      </div>
    </div>
  )
}
