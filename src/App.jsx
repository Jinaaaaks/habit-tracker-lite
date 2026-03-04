import { HashRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import Stats from './pages/Stats'

export default function App() {
  return (
    <HashRouter>
      <div className="app-bg">
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '680px', margin: '0 auto', padding: '28px 20px 80px' }}>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stats" element={<Stats />} />
          </Routes>
        </div>
      </div>
    </HashRouter>
  )
}