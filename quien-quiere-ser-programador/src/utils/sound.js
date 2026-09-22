// Efectos de sonido sintetizados con Web Audio API (sin archivos de audio externos).
// Cada función se debe llamar desde un manejador de clic (gesto del usuario) para
// que los navegadores permitan reproducir audio.

let ctx = null

function getCtx() {
  if (!ctx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    ctx = new AudioContextClass()
  }
  if (ctx.state === 'suspended') {
    ctx.resume()
  }
  return ctx
}

function tone({ freq, start = 0, duration = 0.18, type = 'sine', peak = 0.2, glideTo }) {
  const audio = getCtx()
  const t0 = audio.currentTime + start
  const osc = audio.createOscillator()
  const gain = audio.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, t0)
  if (glideTo) {
    osc.frequency.exponentialRampToValueAtTime(glideTo, t0 + duration)
  }
  gain.gain.setValueAtTime(0, t0)
  gain.gain.linearRampToValueAtTime(peak, t0 + 0.015)
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration)
  osc.connect(gain)
  gain.connect(audio.destination)
  osc.start(t0)
  osc.stop(t0 + duration + 0.05)
}

// Ráfaga de ruido filtrado: sirve para simular una breve ola de aplausos/ambiente.
function noiseSwell({ start = 0, duration = 0.7, peak = 0.1 }) {
  const audio = getCtx()
  const bufferSize = Math.floor(audio.sampleRate * duration)
  const buffer = audio.createBuffer(1, bufferSize, audio.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) {
    const decay = 1 - i / bufferSize
    data[i] = (Math.random() * 2 - 1) * decay
  }
  const source = audio.createBufferSource()
  source.buffer = buffer

  const filter = audio.createBiquadFilter()
  filter.type = 'bandpass'
  filter.frequency.value = 2400
  filter.Q.value = 0.6

  const gain = audio.createGain()
  const t0 = audio.currentTime + start
  gain.gain.setValueAtTime(0, t0)
  gain.gain.linearRampToValueAtTime(peak, t0 + 0.06)
  gain.gain.linearRampToValueAtTime(0, t0 + duration)

  source.connect(filter)
  filter.connect(gain)
  gain.connect(audio.destination)
  source.start(t0)
}

// Golpe corto de percusión (para un redoble de tambores de tensión).
function drumTick({ start = 0, duration = 0.045, peak = 0.09 }) {
  const audio = getCtx()
  const bufferSize = Math.floor(audio.sampleRate * duration)
  const buffer = audio.createBuffer(1, bufferSize, audio.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize)
  }
  const source = audio.createBufferSource()
  source.buffer = buffer

  const filter = audio.createBiquadFilter()
  filter.type = 'bandpass'
  filter.frequency.value = 1100
  filter.Q.value = 0.9

  const gain = audio.createGain()
  const t0 = audio.currentTime + start
  gain.gain.setValueAtTime(peak, t0)
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration)

  source.connect(filter)
  filter.connect(gain)
  gain.connect(audio.destination)
  source.start(t0)
}

// Zumbido grave que crece en volumen: la "tensión" de fondo bajo el redoble.
function tensionRumble({ start = 0, duration = 2.4, peak = 0.06 }) {
  const audio = getCtx()
  const t0 = audio.currentTime + start
  const osc = audio.createOscillator()
  osc.type = 'sawtooth'
  osc.frequency.setValueAtTime(58, t0)
  osc.frequency.exponentialRampToValueAtTime(74, t0 + duration)

  const gain = audio.createGain()
  gain.gain.setValueAtTime(0, t0)
  gain.gain.linearRampToValueAtTime(peak, t0 + duration * 0.8)
  gain.gain.linearRampToValueAtTime(0, t0 + duration)

  osc.connect(gain)
  gain.connect(audio.destination)
  osc.start(t0)
  osc.stop(t0 + duration + 0.05)
}

// Redoble de tambores de suspenso: se reproduce mientras se espera para revelar la respuesta.
export function playSuspense(duration = 2.5) {
  try {
    tensionRumble({ start: 0, duration, peak: 0.06 })
    const interval = 0.1
    const clickCount = Math.floor(duration / interval)
    for (let i = 0; i < clickCount; i++) {
      const progress = i / clickCount
      drumTick({ start: i * interval, peak: 0.06 + progress * 0.07 })
    }
  } catch {
    // Web Audio no disponible.
  }
}

export function playCorrect() {
  try {
    tone({ freq: 523.25, start: 0, duration: 0.16, type: 'triangle', peak: 0.2 }) // C5
    tone({ freq: 659.25, start: 0.1, duration: 0.16, type: 'triangle', peak: 0.2 }) // E5
    tone({ freq: 783.99, start: 0.2, duration: 0.3, type: 'triangle', peak: 0.22 }) // G5
  } catch {
    // Web Audio no disponible: el juego sigue funcionando sin sonido.
  }
}

export function playWrong() {
  try {
    tone({ freq: 220, start: 0, duration: 0.32, type: 'sawtooth', peak: 0.16, glideTo: 110 })
    tone({ freq: 196, start: 0.05, duration: 0.36, type: 'square', peak: 0.1, glideTo: 90 })
  } catch {
    // Web Audio no disponible.
  }
}

// Sonido corto de "presentación" al iniciar la partida: fanfarria breve + ola de aplausos.
export function playStart() {
  try {
    noiseSwell({ start: 0, duration: 0.65, peak: 0.09 })
    tone({ freq: 392.0, start: 0.05, duration: 0.14, type: 'triangle', peak: 0.18 }) // G4
    tone({ freq: 523.25, start: 0.17, duration: 0.14, type: 'triangle', peak: 0.18 }) // C5
    tone({ freq: 659.25, start: 0.29, duration: 0.3, type: 'triangle', peak: 0.22 }) // E5
  } catch {
    // Web Audio no disponible.
  }
}
