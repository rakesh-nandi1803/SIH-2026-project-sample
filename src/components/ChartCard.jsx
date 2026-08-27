export default function ChartCard({ title, subtitle, badge, children, style = {}, className = '' }) {
  return (
    <div className={`chart-card ${className}`} style={style}>
      <div className="chart-card-header">
        <div>
          <div className="chart-title">{title}</div>
          {subtitle && <div className="chart-subtitle">{subtitle}</div>}
        </div>
        {badge && <div className="chart-badge">{badge}</div>}
      </div>
      {children}
    </div>
  )
}
