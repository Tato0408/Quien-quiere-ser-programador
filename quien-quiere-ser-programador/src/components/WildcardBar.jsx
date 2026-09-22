import './WildcardBar.css'

export default function WildcardBar({
  usedFifty,
  usedSwap,
  usedAsk,
  askSecondsLeft,
  disabled,
  onFifty,
  onSwap,
  onAsk,
}) {
  return (
    <div className="wildcard-row">
      <button
        type="button"
        className={`wildcard ${usedFifty ? 'wildcard-used' : ''}`}
        disabled={usedFifty || disabled}
        onClick={onFifty}
      >
        <span className="fifty-ring">
          <span className="fifty-half" />
        </span>
        <span className="wildcard-label">50:50</span>
      </button>

      <button
        type="button"
        className={`wildcard ${usedSwap ? 'wildcard-used' : ''}`}
        disabled={usedSwap || disabled}
        onClick={onSwap}
      >
        <span className="swap-ring" />
        <span className="wildcard-label">
          Cambio
          <br />
          de pregunta
        </span>
      </button>

      <button
        type="button"
        className={`wildcard ${usedAsk ? 'wildcard-used' : ''}`}
        disabled={usedAsk || disabled}
        onClick={onAsk}
      >
        <span className="duo">
          <span className="duo-person duo-p1">
            <span className="duo-head" />
            <span className="duo-body" />
          </span>
          <span className="duo-person duo-p2">
            <span className="duo-head" />
            <span className="duo-body" />
          </span>
        </span>
        <span className="wildcard-label">
          Preguntar a la IA/
          <br />Llamar a alguien
        </span>
        {askSecondsLeft != null && (
          <span className="wildcard-timer">
            ⏱ {String(Math.floor(askSecondsLeft / 60)).padStart(2, '0')}:
            {String(askSecondsLeft % 60).padStart(2, '0')}
          </span>
        )}
      </button>
    </div>
  )
}
