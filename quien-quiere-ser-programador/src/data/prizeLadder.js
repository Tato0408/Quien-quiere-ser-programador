// 12 preguntas jugadas por partida: 3 por cada nivel de dificultad.
// Cada posición de la escalera trae su premio y a qué grupo de dificultad pertenece.
export const DIFFICULTY_LEVELS = [
  { id: 'facil', label: 'Fácil', color: 'var(--green)' },
  { id: 'media', label: 'Media', color: 'var(--yellow)' },
  { id: 'dificil', label: 'Difícil', color: 'var(--orange)' },
  { id: 'ingeniero', label: 'Ingeniero', color: 'var(--red)' },
]

const PRIZES = [100, 200, 300, 500, 1000, 2000, 4000, 8000, 16000, 32000, 64000, 125000]

export const PRIZE_LADDER = PRIZES.map((amount, i) => ({
  position: i + 1,
  amount,
  difficulty: DIFFICULTY_LEVELS[Math.floor(i / 3)].id,
}))

export function formatPrize(amount) {
  return `$${amount.toLocaleString('en-US')}`
}

export function prizeAt(position) {
  // position: cuántas preguntas se respondieron correctamente (0 = ninguna).
  if (position <= 0) return 0
  const row = PRIZE_LADDER[Math.min(position, PRIZE_LADDER.length) - 1]
  return row.amount
}
