import './QuestionBox.css'

export default function QuestionBox({ text }) {
  const length = text?.length ?? 0
  const sizeClass = length > 150 ? 'question-text-xl' : length > 100 ? 'question-text-lg' : ''

  return (
    <div className="question-wrap">
      <div className="question-box">
        <div className={`question-text ${sizeClass}`}>{text}</div>
      </div>
      <div className="question-underline" />
    </div>
  )
}
