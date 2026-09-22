import claudeDesk from '../assets/claude.png'

import gptDesk from '../assets/gpt.png'
import gptSelect from '../assets/selectedIa/gpt.png'

import copilotDesk from '../assets/copilot.png'
import copilotSelect from '../assets/selectedIa/copilot.jpeg'

import cursorDesk from '../assets/cursor.png'
import cursorSelect from '../assets/selectedIa/cursor.jpeg'

import deepseekDesk from '../assets/deepseek.png'
import deepseekSelect from '../assets/selectedIa/deepseek.jpeg'

import geminiDesk from '../assets/gemini.png'
import geminiSelect from '../assets/selectedIa/gemini.jpeg'

import grokDesk from '../assets/grok.png'
import grokSelect from '../assets/selectedIa/grok.jpeg'

import metaDesk from '../assets/meta.png'
import metaSelect from '../assets/selectedIa/meta.jpeg'

import midjourneyDesk from '../assets/midjourney.png'
import midjourneySelect from '../assets/selectedIa/midjouney.png'

import mistralDesk from '../assets/mistral.png'
import mistralSelect from '../assets/selectedIa/mistral.jpeg'

import perplexityDesk from '../assets/perplexity.png'
import perplexitySelect from '../assets/selectedIa/perplexity.jpeg'

// El presentador: no es seleccionable por el jugador.
export const HOST = {
  id: 'claude',
  name: 'Claude',
  deskImg: claudeDesk,
  color: '#d97757',
}

// Las 10 IAs que el jugador puede elegir como su personaje.
export const CHARACTERS = [
  { id: 'gpt', name: 'ChatGPT', deskImg: gptDesk, selectImg: gptSelect, color: '#10a37f' },
  { id: 'copilot', name: 'Copilot', deskImg: copilotDesk, selectImg: copilotSelect, color: '#38bdf8' },
  { id: 'cursor', name: 'Cursor', deskImg: cursorDesk, selectImg: cursorSelect, color: '#a78bfa' },
  { id: 'deepseek', name: 'DeepSeek', deskImg: deepseekDesk, selectImg: deepseekSelect, color: '#4d6bfe' },
  { id: 'gemini', name: 'Gemini', deskImg: geminiDesk, selectImg: geminiSelect, color: '#8b5cf6' },
  { id: 'grok', name: 'Grok', deskImg: grokDesk, selectImg: grokSelect, color: '#38bdf8' },
  { id: 'meta', name: 'Meta AI', deskImg: metaDesk, selectImg: metaSelect, color: '#0668e1' },
  { id: 'midjourney', name: 'Midjourney', deskImg: midjourneyDesk, selectImg: midjourneySelect, color: '#c084fc' },
  { id: 'mistral', name: 'Mistral AI', deskImg: mistralDesk, selectImg: mistralSelect, color: '#f59e0b' },
  { id: 'perplexity', name: 'Perplexity', deskImg: perplexityDesk, selectImg: perplexitySelect, color: '#14b8a6' },
]

export function getCharacter(id) {
  return CHARACTERS.find((c) => c.id === id) ?? CHARACTERS[0]
}
