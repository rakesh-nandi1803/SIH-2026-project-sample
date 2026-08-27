import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, ReferenceLine,
} from 'recharts'
import ChartCard from '../components/ChartCard'
import { placementBySector, timeToHire, stateStats } from '../data/mockData'

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
          {p.name}: <strong>{p.value}</strong>
        </div>
      ))}
    </div>
  )
}

export default function EmploymentOutcomes() {
  return (
    <div className="page-body">
      <div className="page-header">
        <h1 className="page-title">Employment <span>Outcomes</span></h1>
        <p className="page-desc">Sector-wise placement rates, time-to-hire trends, and state-level employment data</p>
      </div>

      {/* Top row: sector placements + time-to-hire */}
      <div className="chart-grid chart-grid-2">
        <ChartCard
          title="Placement Rate by Industry Sector"
          subtitle="Percentage of trained learners placed — Aug 2026"
          badge="Top 8 Sectors"
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={placementBySector} layout="vertical" margin={{ top: 0, right: 20, left: 100, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} tickFormatter={v => `${v}%`} tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="sector" tick={{ fontSize: 11, fill: 'var(--text-secondary)' }} width={100} />
              <Tooltip content={<CustomTooltip />} formatter={(v) => [`${v}%`, 'Placement Rate']} />
              <Bar dataKey="rate" name="Placement Rate" radius={[0, 6, 6, 0]} fill="url(#barGrad)">
                {/* Inline gradient */}
              </Bar>
              <defs>
                <linearGradient id="barGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#7c3aed" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Time-to-Hire Trend"
          subtitle="Average days from program completion to placement"
          badge="12-Month"
        >
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timeToHire} margin={{ top: 5, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis domain={[15, 50]} tickFormatter={v => `${v}d`} tick={{ fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} formatter={(v) => [`${v} days`]} />
              <Legend />
              <ReferenceLine y={30} stroke="rgba(245,158,11,0.4)" strokeDasharray="6 3" label={{ value: 'Baseline', fill: '#f59e0b', fontSize: 10 }} />
              <Line type="monotone" dataKey="days" name="Actual" stroke="#7c3aed" strokeWidth={2.5} dot={{ fill: '#7c3aed', r: 4 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="target" name="Target" stroke="#10b981" strokeWidth={2} strokeDasharray="5 3" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* State-wise table */}
      <ChartCard
        title="State-wise Employment Statistics"
        subtitle="Top 8 states by learner volume — FY 2025-26"
        badge="Live Data"
      >
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>State</th>
                <th>Learners Trained</th>
                <th>Placed</th>
                <th>Placement Rate</th>
                <th>Avg. Package</th>
                <th>Rate Indicator</th>
              </tr>
            </thead>
            <tbody>
              {stateStats.map((row, i) => (
                <tr key={row.state}>
                  <td className="table-rank">{i + 1}</td>
                  <td className="table-name">{row.state}</td>
                  <td>{row.learners.toLocaleString('en-IN')}</td>
                  <td>{row.placed.toLocaleString('en-IN')}</td>
                  <td>
                    <span style={{
                      color: row.rate >= 80 ? '#10b981' : row.rate >= 70 ? '#f59e0b' : '#ec4899',
                      fontWeight: 700,
                    }}>
                      {row.rate}%
                    </span>
                  </td>
                  <td style={{ color: 'var(--text-accent)' }}>{row.avgSalary}</td>
                  <td style={{ width: 120 }}>
                    <div className="prog-track">
                      <div
                        className="prog-fill"
                        style={{
                          width: `${row.rate}%`,
                          background: row.rate >= 80
                            ? 'linear-gradient(90deg,#10b981,#06b6d4)'
                            : row.rate >= 70
                            ? 'linear-gradient(90deg,#f59e0b,#ec4899)'
                            : 'linear-gradient(90deg,#ec4899,#7c3aed)',
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartCard>
    </div>
  )
}
