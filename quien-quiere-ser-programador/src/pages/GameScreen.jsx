import { useEffect, useMemo, useRef, useState } from 'react'
import background from '../assets/backgorund.png'
import WildcardBar from '../components/WildcardBar'
import DifficultyBubbles from '../components/DifficultyBubbles'
import QuestionBox from '../components/QuestionBox'
import AnswerOptions from '../components/AnswerOptions'
import DeskPhoto from '../components/DeskPhoto'
import { HOST, getCharacter } from '../data/characters'
import { QUESTIONS, buildRound, shuffleOptions } from '../data/questions'
import { formatPrize, prizeAt } from '../data/prizeLadder'
import { playCorrect, playWrong, playSuspense } from '../utils/sound'
import './GameScreen.css'

const SUSPENSE_DELAY = 2600
const ADVANCE_DELAY = 1600
const ASK_SECONDS = 60

export default function GameScreen({ player, onGameOver }) {
  const character = useMemo(() => getCharacter(player.characterId), [player.characterId])
  const [round, setRound] = useState(() => buildRound(QUESTIONS))

  const [index, setIndex] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [locked, setLocked] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [eliminated, setEliminated] = useState([])

  const [usedFifty, setUsedFifty] = useState(false)
  const [usedSwap, setUsedSwap] = useState(false)
  const [usedAsk, setUsedAsk] = useState(false)
  const [askSecondsLeft, setAskSecondsLeft] = useState(null)
  const [aiMessage, setAiMessage] = useState(null)

  const [swappedOut, setSwappedOut] = useState([])
  const timers = useRef([])

  const question = round[index]
  const noQuestions = round.length === 0

  useEffect(() => {
    const list = timers.current
    return () => list.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    if (askSecondsLeft == null) return
    const t = setTimeout(() => {
      if (askSecondsLeft <= 1) {
        const letter = ['A', 'B', 'C', 'D'][question.correctIndex]
        setAiMessage(`${character.name} dice: "Creo que la respuesta es la opción ${letter}, pero confírmalo tú mismo."`)
        setAskSecondsLeft(null)
      } else {
        setAskSecondsLeft(askSecondsLeft - 1)
      }
    }, 1000)
    timers.current.push(t)
    return () => clearTimeout(t)
  }, [askSecondsLeft, character.name, question])

  function resetForNextQuestion() {
    setSelectedIndex(null)
    setLocked(false)
    setRevealed(false)
    setEliminated([])
    setAiMessage(null)
    setAskSecondsLeft(null)
  }

  function handlePick(i) {
    if (locked || eliminated.includes(i)) return
    setSelectedIndex(i)
  }

  function handleConfirm() {
    if (locked || selectedIndex == null) return
    setLocked(true)
    playSuspense(SUSPENSE_DELAY / 1000)

    const suspenseTimer = setTimeout(() => {
      setRevealed(true)
      const correct = selectedIndex === question.correctIndex
      if (correct) {
        playCorrect()
      } else {
        playWrong()
      }

      const advanceTimer = setTimeout(() => {
        if (!correct) {
          onGameOver({
            player,
            character,
            amount: prizeAt(index),
            won: false,
            reachedQuestion: index + 1,
          })
          return
        }
        if (index === round.length - 1) {
          onGameOver({
            player,
            character,
            amount: prizeAt(round.length),
            won: true,
            reachedQuestion: round.length,
          })
          return
        }
        setIndex((n) => n + 1)
        resetForNextQuestion()
      }, ADVANCE_DELAY)
      timers.current.push(advanceTimer)
    }, SUSPENSE_DELAY)
    timers.current.push(suspenseTimer)
  }

  const canFifty = !usedFifty && !locked && question.options.length > 2

  function handleFifty() {
    if (!canFifty) return
    setUsedFifty(true)
    const wrongIndices = question.options.map((_, i) => i).filter((i) => i !== question.correctIndex)
    const numToRemove = question.options.length - 2
    const toRemove = wrongIndices.sort(() => Math.random() - 0.5).slice(0, numToRemove)
    setEliminated(toRemove)
  }

  const canSwap =
    !usedSwap &&
    !locked &&
    QUESTIONS.some(
      (q) =>
        q.difficulty === question.difficulty &&
        q.id !== question.id &&
        !round.some((r, ri) => ri !== index && r.id === q.id) &&
        !swappedOut.includes(q.id),
    )

  function handleSwap() {
    if (!canSwap) return
    const alt = QUESTIONS.find(
      (q) =>
        q.difficulty === question.difficulty &&
        q.id !== question.id &&
        !round.some((r, ri) => ri !== index && r.id === q.id) &&
        !swappedOut.includes(q.id),
    )
    if (!alt) return
    setUsedSwap(true)
    setSwappedOut((s) => [...s, question.id])
    setRound((r) => r.map((q, i) => (i === index ? shuffleOptions(alt) : q)))
    resetForNextQuestion()
  }

  function handleAsk() {
    if (usedAsk || locked) return
    setUsedAsk(true)
    setAskSecondsLeft(ASK_SECONDS)
    setAiMessage(null)
  }

  if (noQuestions) {
    return (
      <div className="game-stage game-stage-empty">
        <p>Todavía no hay preguntas cargadas. Agrégalas en src/pregunta.json.</p>
      </div>
    )
  }

  return (
    <div className="game-stage">
      <img className="game-bg" src={background} alt="Escenario" />
      <div className="game-scan" />

      <div className="game-wildcards">
        <WildcardBar
          usedFifty={usedFifty || !canFifty}
          usedSwap={usedSwap || !canSwap}
          usedAsk={usedAsk}
          askSecondsLeft={askSecondsLeft}
          disabled={locked}
          onFifty={handleFifty}
          onSwap={handleSwap}
          onAsk={handleAsk}
        />
      </div>

      <DeskPhoto img={character.deskImg} label={character.name} role="Jugador" side="left" />
      <DeskPhoto img={HOST.deskImg} label={HOST.name} role="Presentador" side="right" />

      {aiMessage && <div className="game-ai-bubble">{aiMessage}</div>}

      <div className="game-center">
        <DifficultyBubbles current={index + 1} />
        <QuestionBox text={question.prompt} />
        <AnswerOptions
          options={question.options}
          selectedIndex={selectedIndex}
          eliminated={eliminated}
          locked={locked}
          revealed={revealed}
          correctIndex={question.correctIndex}
          onPick={handlePick}
        />
        {!locked && (
          <button
            type="button"
            className="game-confirm"
            disabled={selectedIndex == null}
            onClick={handleConfirm}
          >
            Responder ▸
          </button>
        )}
        {locked && !revealed && (
          <div className="game-verifying">
            Verificando respuesta
            <span className="game-verifying-dots">
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </span>
          </div>
        )}
        <div className="game-prize">{formatPrize(prizeAt(index))} asegurado</div>
      </div>
    </div>
  )
}
