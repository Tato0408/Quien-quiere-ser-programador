import raw from '../pregunta.json'

// El banco fuente vive en src/pregunta.json (tipo 1-4 = fácil/media/difícil/ingeniero).
// Aquí se traduce a la forma que usa el juego: difficulty, prompt, options, correctIndex.
const DIFFICULTY_BY_TIPO = {
  1: 'facil',
  2: 'media',
  3: 'dificil',
  4: 'ingeniero',
}

export const QUESTIONS = raw.preguntas.map((q, i) => {
  const correctIndex = q.opciones.indexOf(q.respuesta)
  return {
    id: `q${i}`,
    difficulty: DIFFICULTY_BY_TIPO[q.tipo],
    prompt: q.pregunta,
    options: q.opciones,
    correctIndex,
  }
})

const ORDER = ['facil', 'media', 'dificil', 'ingeniero']

// Fisher-Yates: a diferencia de sort(() => Math.random() - 0.5), da una
// probabilidad uniforme real a cada posición (ese truco de sort está sesgado,
// sobre todo en arrays chicos, y tiende a dejar el primer elemento primero).
function shuffle(array) {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

// Devuelve la pregunta con sus opciones en un orden distinto (y correctIndex
// recalculado), para que la respuesta correcta no caiga siempre en la misma letra.
export function shuffleOptions(question) {
  const correctValue = question.options[question.correctIndex]
  const options = shuffle(question.options)
  return { ...question, options, correctIndex: options.indexOf(correctValue) }
}

// Arma una ronda de 12 preguntas (3 por dificultad) en orden de dificultad ascendente,
// eligiendo 3 al azar de cada grupo del banco disponible y mezclando sus opciones.
export function buildRound(bank = QUESTIONS) {
  const round = []
  for (const difficulty of ORDER) {
    const pool = bank.filter((q) => q.difficulty === difficulty)
    round.push(...shuffle(pool).slice(0, 3).map(shuffleOptions))
  }
  return round
}
