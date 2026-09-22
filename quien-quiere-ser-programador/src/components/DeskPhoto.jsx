import './DeskPhoto.css'

export default function DeskPhoto({ img, label, role, side }) {
  return (
    <div className={`desk-photo desk-photo-${side}`}>
      <div className="desk-photo-frame">
        <img src={img} alt={label} />
      </div>
      <div className="desk-photo-tag">
        {role} · {label}
      </div>
    </div>
  )
}
