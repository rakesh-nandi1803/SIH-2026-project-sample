import { Bell, Search, RefreshCw } from 'lucide-react'

const pageMeta = {
  '/':            { title: 'Overview',              breadcrumb: 'Dashboard / Overview' },
  '/employment':  { title: 'Employment Outcomes',   breadcrumb: 'Dashboard / Analytics / Employment' },
  '/skill-gap':   { title: 'Skill Gap Analysis',    breadcrumb: 'Dashboard / Analytics / Skill Gaps' },
  '/training':    { title: 'Training Impact',        breadcrumb: 'Dashboard / Analytics / Training' },
  '/career':      { title: 'Career Progression',    breadcrumb: 'Dashboard / Analytics / Career' },
}

export default function Header({ collapsed, pathname }) {
  const meta = pageMeta[pathname] || pageMeta['/']

  return (
    <header className={`header${collapsed ? ' sidebar-collapsed' : ''}`}>
      <div className="header-left">
        <div className="header-title">{meta.title}</div>
        <div className="header-breadcrumb">{meta.breadcrumb}</div>
      </div>

      <div className="header-right">
        <div className="header-search">
          <Search size={14} />
          <span>Search insights…</span>
          <span style={{ marginLeft: 8, padding: '1px 5px', border: '1px solid rgba(148,163,184,0.2)', borderRadius: 4, fontSize: '0.65rem', color: 'var(--text-muted)' }}>⌘K</span>
        </div>

        <div className="icon-btn" title="Refresh data">
          <RefreshCw size={15} />
        </div>

        <div className="header-badge">
          <div className="icon-btn" title="Notifications">
            <Bell size={15} />
          </div>
          <div className="header-badge-dot" />
        </div>

        <div className="avatar" title="Admin User">AD</div>
      </div>
    </header>
  )
}
