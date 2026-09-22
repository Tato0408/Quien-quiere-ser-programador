const STORAGE_KEY = 'qqsp-ranking'

export function getRanking() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const list = raw ? JSON.parse(raw) : []
    return Array.isArray(list) ? list : []
  } catch {
    return []
  }
}

export function addResult(entry) {
  const list = getRanking()
  list.push({ ...entry, at: Date.now() })
  list.sort((a, b) => b.amount - a.amount || a.at - b.at)
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  } catch {
    // localStorage no disponible (modo privado, etc.): el juego sigue funcionando sin persistir.
  }
  return list
}

export function removeResult(at) {
  const list = getRanking().filter((entry) => entry.at !== at)
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  } catch {
    // localStorage no disponible: no hay nada que persistir.
  }
  return list
}
