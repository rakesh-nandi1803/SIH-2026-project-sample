import {
  BarChart, Bar, ScatterChart, Scatter,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, ZAxis,
} from 'recharts'
import ChartCard from '../components/ChartCard'
import { programCompletion, programROI, hoursVsPlacement } from '../data/mockData'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: 'rgba(13,21,38,0.95)', border: '1px solid rgba(124,58,237,0.3)',
      borderRadius: 10, padding: '12px 16px', fontSize: 12,
    }}>
      <div style={{ color: 'var(--text-muted)', marginBottom: 6, fontWeight: 600 }}>{label}</div>
      {payload.map(p => (
        <div key={p.dataKey} style={{ color: p.color || 'var(--text-primary)', marginBottom: 2 }}>
          {p.name}: <strong>{p.value}</strong>
        </div>
      ))}
    </div>
  )
}

const ScatterTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  const d = payload[0]?.payload
  if (!d) return null
  return (
    <div style={{
      background: 'rgba(13,21,38,0.95)', border: '1px solid rgba(124,58,237,0.3)',
      borderRadius: 10, padding: '12px 16px', fontSize: 12,
    }}>
      <div style={{ color: '#a78bfa', fontWeight: 700, marginBottom: 4 }}>{d.program}</div>
      <div style={{ color: 'var(--text-secondary)' }}>Training Hours: <strong style={{ color: 'white' }}>{d.hours}h</strong></div>
      <div style={{ color: 'var(--text-secondary)' }}>Placement Rate: <strong style={{ color: '#10b981' }}>{d.placementRate}%</strong></div>
    </div>
  )
}

function StarRating({ rating }) {
  return (
    <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      {[1,2,3,4,5].map(s => (
        <span key={s} style={{ color: s <= Math.round(rating) ? '#f59e0b' : 'var(--text-muted)', fontSize: 12 }}>★</span>
      ))}
      <span style={{ fontSize: 11, color: 'var(--text-muted)', marginLeft: 4 }}>{rating}</span>
    </div>
  )
}

export default function TrainingImpact() {
  return (
    <div className="page-body">
      <div className="page-header">
        <h1 className="page-title">Training Program <span>Impact</span></h1>
        <p className="page-desc">Measure program effectiveness through completion rates, placement outcomes, and ROI analysis</p>
      </div>

      {/* Charts Row */}
      <div className="chart-grid chart-grid-2">
        <ChartCard
          title="Program-wise Completion Rates"
          subtitle="Certified vs enrolled learners per program"
          badge="8 Programs"
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={programCompletion} margin={{ top: 5, right: 10, left: 0, bottom: 60 }}>
              <defs>
                <linearGradient id="gradEnrolled" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#7c3aed" stopOpacity={0.4} />
                </linearGradient>
                <linearGradient id="gradCertified" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0.4} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="program" tick={{ fontSize: 9, fill: 'var(--text-muted)' }} angle={-35} textAnchor="end" interval={0} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="enrolled" name="Enrolled" fill="url(#gradEnrolled)" radius={[4,4,0,0]} />
              <Bar dataKey="certified" name="Certified" fill="url(#gradCertified)" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Training Hours vs. Placement Rate"
          subtitle="Correlation between training intensity and job outcomes"
          badge="Correlation"
        >
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hours" name="Hours" type="number" domain={[0, 400]} tick={{ fontSize: 11 }} label={{ value: 'Training Hours', position: 'insideBottom', offset: -10, fill: 'var(--text-muted)', fontSize: 11 }} />
              <YAxis dataKey="placementRate" name="Placement Rate" type="number" domain={[55, 95]} tick={{ fontSize: 11 }} tickFormatter={v => `${v}%`} />
              <ZAxis range={[60, 200]} />
              <Tooltip content={<ScatterTooltip />} />
              <Scatter name="Programs" data={hoursVsPlacement} fill="#7c3aed" fillOpacity={0.8}>
                {hoursVsPlacement.map((d, i) => (
                  <circle key={i} />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* ROI Table */}
      <ChartCard
        title="Program ROI & Cost Analysis"
        subtitle="Investment efficiency across top skilling programs"
        badge="FY 2025-26"
      >
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Program</th>
                <th>Training Cost</th>
                <th>Cost per Placement</th>
                <th>Avg. Salary Post-Training</th>
                <th>ROI</th>
                <th>Learner Rating</th>
              </tr>
            </thead>
            <tbody>
              {programROI.map((row, i) => (
                <tr key={row.program}>
                  <td className="table-rank">{i + 1}</td>
                  <td className="table-name">{row.program}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{row.cost}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{row.costPlacement}</td>
                  <td style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>{row.avgSalary}</td>
                  <td>
                    <span style={{
                      color: '#10b981',
                      fontWeight: 700,
                      background: 'rgba(16,185,129,0.1)',
                      padding: '3px 8px',
                      borderRadius: 99,
                      fontSize: 12,
                    }}>
                      {row.roi}
                    </span>
                  </td>
                  <td><StarRating rating={row.rating} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartCard>
    </div>
  )
}
