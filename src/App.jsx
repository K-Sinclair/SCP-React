import { useState, useEffect, useRef } from 'react'
// Changed BrowserRouter to HashRouter for better GH Pages compatibility
import { HashRouter as Router, Routes, Route } from 'react-router-dom' 
import NavMenu from './NavMenu'
import ScpDetail from './ScpDetail'
import ScpFiles from './ScpFiles'

const SecurityGate = ({ onVerify }) => {
  const [progress, setProgress] = useState(0)
  const [isScanning, setIsScanning] = useState(false)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const timer = useRef(null)

  useEffect(() => {
    if (isScanning && progress < 100 && !isAuthorized) {
      timer.current = setInterval(() => {
        setProgress(p => {
          if (p >= 98) {
            setIsAuthorized(true)
            setTimeout(onVerify, 1000)
            return 100
          }
          return p + 2
        })
      }, 30)
    } else if (!isScanning && progress > 0 && !isAuthorized) {
      timer.current = setInterval(() => {
        // Changed Math.highest to Math.max
        setProgress(p => Math.max(0, p - 5)) 
      }, 20)
    }
    return () => clearInterval(timer.current)
  }, [isScanning, progress, isAuthorized, onVerify])

  return (
    <div className="security-gate">
      <div className="gate-content">
        <h1 className="warning-text">TERMINAL LOCKED</h1>
        <p>Biometric Scan Required for Access</p>

        <div
          className={`scanner-pad ${isAuthorized ? 'granted' : ''}`}
          onMouseDown={() => setIsScanning(true)}
          onMouseUp={() => setIsScanning(false)}
          onMouseLeave={() => setIsScanning(false)}
        >
          {/* Use relative path for the image */}
          <img
            src="images/ThumbPrint.png" 
            className="fingerprint-image"
            alt="Scanner"
          />
          <div className="scan-line" style={{ top: `${progress}%`, opacity: isScanning ? 1 : 0 }}></div>
          <div className="progress-fill" style={{ height: `${progress}%` }}></div>
        </div>

        <h3 className={`status-text ${isAuthorized ? 'text-green' : isScanning ? 'text-scan' : ''}`}>
          {isAuthorized ? 'IDENTITY CONFIRMED' : isScanning ? `SCANNING... ${progress}%` : 'HOLD THUMB ON PAD'}
        </h3>
      </div>
    </div>
  )
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  if (!isAuthenticated) return <SecurityGate onVerify={() => setIsAuthenticated(true)} />

  // Note: basename is not required when using HashRouter
  return (
    <Router>
      <div className="app-container">
        <NavMenu />
        <main className="main-content">
          <Routes>
            <Route path="/" element={
              <div className="scp-card">
                <h2>Welcome, Site Director.</h2>
                <p>Security clearance verified. Background maintenance cycles active. All terminal activity is recorded.</p>
              </div>
            } />
            <Route path="/scp" element={<ScpFiles />} />
            <Route path="/scp/:id" element={<ScpDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}