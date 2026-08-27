import { useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Overview from './pages/Overview'
import EmploymentOutcomes from './pages/EmploymentOutcomes'
import SkillGapAnalysis from './pages/SkillGapAnalysis'
import TrainingImpact from './pages/TrainingImpact'
import CareerProgression from './pages/CareerProgression'

function AppShell() {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()

  return (
    <div className="app-shell">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(c => !c)} />
      <div className={`main-content${collapsed ? ' sidebar-collapsed' : ''}`}>
        <Header collapsed={collapsed} pathname={location.pathname} />
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/employment" element={<EmploymentOutcomes />} />
          <Route path="/skill-gap" element={<SkillGapAnalysis />} />
          <Route path="/training" element={<TrainingImpact />} />
          <Route path="/career" element={<CareerProgression />} />
        </Routes>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}
