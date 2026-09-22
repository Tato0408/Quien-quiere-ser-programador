import './AnswerOptions.css'

const LETTERS = ['A', 'B', 'C', 'D']

export default function AnswerOptions({
  options,
  selectedIndex,
  eliminated = [],
  locked = false,
  revealed = false,
  correctIndex,
  onPick,
}) {
  return (
    <div className="options-grid">
      {options.map((text, i) => {
        const isEliminated = eliminated.includes(i)
        const isSelected = selectedIndex === i
        let cls = ''
        if (isEliminated) cls = 'opt-eliminated'
        else if (revealed && i === correctIndex) cls = 'opt-correct'
        else if (revealed && isSelected && i !== correctIndex) cls = 'opt-wrong'
        else if (isSelected) cls = 'opt-selected'

        const length = text?.length ?? 0
        const sizeClass = length > 90 ? 'opt-text-xl' : length > 55 ? 'opt-text-lg' : ''

        return (
          <button
            key={i}
            type="button"
            className={`opt ${cls}`}
            disabled={isEliminated || locked}
            onClick={() => onPick(i)}
          >
            <span className="opt-letter">{LETTERS[i]}:</span>
            <span className={`opt-text ${sizeClass}`}>{text}</span>
          </button>
        )
      })}
    </div>
  )
}
