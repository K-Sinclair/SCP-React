import { Link } from 'react-router-dom'
import { scp } from './Data'

export default function ScpFiles({ data = scp }) {
  if (!data || data.length === 0) {
    return (
      <div className="scp-card">
        <h2>Catalog is empty</h2>
        <p>No SCP entries available.</p>
      </div>
    )
  }

  return (
    <div className="scp-list">
      <h2>SCP Archive</h2>
      <div className="scp-list-grid">
        {data.map((item) => (
          <article key={item.id} className="scp-card">
            <h3>{item.id} - {item.item}</h3>
            <span className="label">Object Class</span>
            <div className={`object-class class-${item.object_class.toLowerCase()}`}>
              {item.object_class}
            </div>
            <p>{item.description}</p>
            <Link to={`/scp/${item.id}`} className="scp-detail-link">
              [ View Details ]
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}