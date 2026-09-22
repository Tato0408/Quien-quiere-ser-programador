import { useState } from 'react'
import StartScreen from './pages/StartScreen'
import CharacterSelectScreen from './pages/CharacterSelectScreen'
import GameScreen from './pages/GameScreen'
import RankingScreen from './pages/RankingScreen'
import { addResult } from './utils/ranking'

function App() {
  const [screen, setScreen] = useState('start')
  const [player, setPlayer] = useState(null)
  const [gameId, setGameId] = useState(0)

  function handlePlay() {
    setScreen('select')
  }

  function handleViewRanking() {
    setScreen('ranking')
  }

  function handleGoHome() {
    setPlayer(null)
    setScreen('start')
  }

  function handleStart({ name, characterId }) {
    setPlayer({ name, characterId })
    setGameId((n) => n + 1)
    setScreen('game')
  }

  function handleGameOver({ player: p, character, amount }) {
    addResult({
      name: p.name,
      characterId: character.id,
      characterName: character.name,
      deskImg: character.deskImg,
      color: character.color,
      amount,
    })
    setScreen('ranking')
  }

  function handlePlayAgain() {
    setPlayer(null)
    setScreen('select')
  }

  if (screen === 'select') {
    return <CharacterSelectScreen onStart={handleStart} />
  }
  if (screen === 'game' && player) {
    return <GameScreen key={gameId} player={player} onGameOver={handleGameOver} />
  }
  if (screen === 'ranking') {
    return <RankingScreen onPlayAgain={handlePlayAgain} onGoHome={handleGoHome} />
  }
  return <StartScreen onPlay={handlePlay} onViewRanking={handleViewRanking} />
}

export default App
