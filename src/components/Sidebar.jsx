import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Briefcase, Zap, BookOpen,
  TrendingUp, ChevronLeft, ChevronRight, Activity,
} from 'lucide-react'

const navItems = [
  { to: '/',            icon: LayoutDashboard, label: 'Overview',             section: 'MAIN' },
  { to: '/employment',  icon: Briefcase,        label: 'Employment Outcomes',  section: 'ANALYTICS' },
  { to: '/skill-gap',   icon: Zap,              label: 'Skill Gap Analysis',   section: 'ANALYTICS' },
  { to: '/training',    icon: BookOpen,          label: 'Training Impact',      section: 'ANALYTICS' },
  { to: '/career',      icon: TrendingUp,        label: 'Career Progression',   section: 'ANALYTICS' },
]

export default function Sidebar({ collapsed, onToggle }) {
  const location = useLocation()

  const sections = [...new Set(navItems.map(i => i.section))]

  return (
    <aside className={`sidebar${collapsed ? ' collapsed' : ''}`}>
      {/* Logo */}
      <div className="sidebar-logo">
        <img
          src="images/logo-icon.png"
          alt="SkillTrack360"
          style={{
            height: 38,
            width: 'auto',
            maxHeight: 38,
            objectFit: 'contain',
            filter: 'drop-shadow(0 2px 10px rgba(243, 106, 16, 0.45))',
            flexShrink: 0,
          }}
        />
        <div className="logo-text">
          <div className="logo-title">SkillTrack<span style={{ color: 'var(--accent-orange)' }}>360</span></div>
          <div className="logo-sub">Workforce Analytics</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {sections.map(section => (
          <div key={section}>
            <div className="nav-section-label">{section}</div>
            {navItems
              .filter(item => item.section === section)
              .map(({ to, icon: Icon, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
                >
                  <Icon size={18} className="nav-icon" />
                  <span className="nav-text">{label}</span>
                  <div className="nav-active-bar" />
                </NavLink>
              ))}
          </div>
        ))}
      </nav>

      {/* Footer toggle */}
      <div className="sidebar-footer">
        <button className="collapse-btn" onClick={onToggle} title={collapsed ? 'Expand' : 'Collapse'}>
          {collapsed
            ? <ChevronRight size={16} />
            : <><ChevronLeft size={16} /><span>Collapse</span></>
          }
        </button>
      </div>
    </aside>
  )
}
