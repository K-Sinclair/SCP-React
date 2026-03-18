import { scp } from './Data.js'
import { useParams } from 'react-router-dom'

const ScpDetail = () => {
  const { id } = useParams()
  const item = scp.find((scpItem) => scpItem.id === id)

  const imagePath = item.image.startsWith('/') 
  ? `${import.meta.env.BASE_URL}${item.image.slice(1)}` 
  : `${import.meta.env.BASE_URL}${item.image}`;

    <img src={imagePath} alt={item.item} />

  if (!item) return <div className="scp-card">Access Denied: Invalid ID</div>

  // Dynamic class for the badge
  const classType = item.object_class.toLowerCase()

  return (
    <div className="scp-card">
      <span className="label">Item #</span>
      <h2>{item.id}</h2>

      <span className="label">Object Class</span>
      <div className={`object-class class-${classType}`}>
        {item.object_class}
      </div>

      <div className="scp-image-container">
        <img
          src={item.image.startsWith('/') ? item.image : `/${item.image}`}
          alt={item.item}
          onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300?text=REDACTED'; }}
        />
      </div>

      <span className="label">Special Containment Procedures</span>
      <p>{item.containment}</p>

      <span className="label">Description</span>
      <p>{item.description}</p>

      {item.notes && (
        <>
          <span className="label">Addendum / Notes</span>
          <p><em>{item.notes}</em></p>
        </>
      )}
    </div>
  )
}

export default ScpDetail;