import { Link, useLocation } from 'react-router-dom'
import { scp } from './Data'

export default function NavMenu() {
  const location = useLocation();

  return (
    <nav className="terminal-nav">
      <div className="nav-header">
        <h1>SCP DATABASE</h1>
      </div>
      
      <div className="nav-links">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
          [ HOME ]
        </Link>
        <Link to="/scp" className={location.pathname === '/scp' ? 'active' : ''}>
          [ ALL SCP ]
        </Link>
        {scp.map((item) => (
          <Link 
            key={item.id}
            to={`/scp/${item.id}`}
            className={location.pathname === `/scp/${item.id}` ? 'active' : ''}
          >
            [ {item.id} ]
          </Link>
        ))}
      </div>
    </nav>
  )
}