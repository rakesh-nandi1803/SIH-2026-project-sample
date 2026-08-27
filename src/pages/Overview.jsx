import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts'
import StatCard from '../components/StatCard'
import ChartCard from '../components/ChartCard'
import {
  kpiData, enrollmentTrend, outcomeDistribution,
} from '../data/mockData'

const RADIAN = Math.PI / 180
const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
  if (percent < 0.08) return null
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={600}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: 'rgba(13,21,38,0.95)', border: '1px solid rgba(124,58,237,0.3)',
      borderRadius: 10, padding: '12px 16px', fontSize: 12,
    }}>
      <div style={{ color: 'var(--text-muted)', marginBottom: 6, fontWeight: 600 }}>{label}</div>
      {payload.map(p => (
        <div key={p.dataKey} style={{ color: p.color, marginBottom: 2 }}>
          {p.name}: <strong>{p.value?.toLocaleString('en-IN')}</strong>
        </div>
      ))}
    </div>
  )
}

export default function Overview() {
  return (
    <div className="page-body">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">Workforce Analytics <span>Overview</span></h1>
        <p className="page-desc">Real-time snapshot of India's national skilling ecosystem — Aug 2026</p>
      </div>

      {/* KPI Cards */}
      <div className="stat-grid">
        {kpiData.map((d, i) => <StatCard key={d.id} data={d} index={i} />)}
      </div>

      {/* Charts Row */}
      <div className="chart-grid chart-grid-2-1">
        {/* Enrollment Trend */}
        <ChartCard
          title="Monthly Enrollment & Placement Trend"
          subtitle="Sep 2025 — Aug 2026"
          badge="12-Month View"
        >
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={enrollmentTrend} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="gradEnroll" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradComplete" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradPlace" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area type="monotone" dataKey="enrollments" name="Enrollments" stroke="#7c3aed" strokeWidth={2} fill="url(#gradEnroll)" />
              <Area type="monotone" dataKey="completions" name="Completions" stroke="#06b6d4" strokeWidth={2} fill="url(#gradComplete)" />
              <Area type="monotone" dataKey="placements" name="Placements" stroke="#10b981" strokeWidth={2} fill="url(#gradPlace)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Outcome Distribution */}
        <ChartCard
          title="Learner Outcome Distribution"
          subtitle="Current cohort breakdown"
          badge="Aug 2026"
        >
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={outcomeDistribution}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
                labelLine={false}
                label={renderCustomLabel}
              >
                {outcomeDistribution.map((entry, i) => (
                  <Cell key={i} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip
                formatter={(val, name) => [`${val}%`, name]}
                contentStyle={{
                  background: 'rgba(13,21,38,0.95)',
                  border: '1px solid rgba(124,58,237,0.3)',
                  borderRadius: 8, fontSize: 12,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          {/* Legend */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
            {outcomeDistribution.map(d => (
              <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--text-secondary)' }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: d.fill, flexShrink: 0 }} />
                <span style={{ flex: 1 }}>{d.name}</span>
                <strong style={{ color: d.fill }}>{d.value}%</strong>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Bottom: Highlights bar */}
      <div className="chart-grid chart-grid-3">
        {[
          { label: 'NSQF Level 4+ Certified', value: '68,420', color: '#7c3aed', pct: 55 },
          { label: 'Women Enrolled', value: '51,280', color: '#ec4899', pct: 41 },
          { label: 'Rural Learners', value: '38,620', color: '#10b981', pct: 31 },
        ].map(item => (
          <ChartCard key={item.label} title={item.label} badge={`${item.pct}% of total`}>
            <div style={{ fontSize: '2rem', fontFamily: 'Outfit', fontWeight: 800, color: item.color, marginBottom: 12 }}>
              {item.value}
            </div>
            <div className="prog-track">
              <div className="prog-fill" style={{ width: `${item.pct}%`, background: item.color }} />
            </div>
          </ChartCard>
        ))}
      </div>
    </div>
  )
}
