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

// Arma una ronda de 12 preguntas (3 por dificultad) en orden de dificultad ascendente,
// eligiendo 3 al azar de cada grupo del banco disponible.
export function buildRound(bank = QUESTIONS) {
  const round = []
  for (const difficulty of ORDER) {
    const pool = bank.filter((q) => q.difficulty === difficulty)
    const shuffled = [...pool].sort(() => Math.random() - 0.5)
    round.push(...shuffled.slice(0, 3))
  }
  return round
}
