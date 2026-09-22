import './CharacterCard.css'

export default function CharacterCard({ character, selected, onClick }) {
  return (
    <button
      type="button"
      className={`char-card ${selected ? 'char-card-selected' : ''}`}
      onClick={onClick}
    >
      {selected && <span className="char-card-badge">✓</span>}
      <span className="char-card-thumb" style={{ '--c': `${character.color}22` }}>
        <img src={character.selectImg} alt={character.name} />
      </span>
      <span className="char-card-name">{character.name}</span>
    </button>
  )
}
