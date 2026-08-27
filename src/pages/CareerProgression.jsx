import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer,
} from 'recharts'
import ChartCard from '../components/ChartCard'
import { salaryGrowth, careerPaths, promotionRates } from '../data/mockData'

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
          {p.name}: <strong>
            {typeof p.value === 'number' && p.dataKey !== 'promoted' && p.dataKey !== 'sameRole' && p.dataKey !== 'lateral' && p.dataKey !== 'entrepreneur'
              ? `₹${p.value}L`
              : `${p.value}%`
            }
          </strong>
        </div>
      ))}
    </div>
  )
}

export default function CareerProgression() {
  return (
    <div className="page-body">
      <div className="page-header">
        <h1 className="page-title">Career <span>Progression</span></h1>
        <p className="page-desc">Long-term career trajectories, salary growth trends, and promotion rate analysis</p>
      </div>

      {/* Salary Growth */}
      <ChartCard
        title="Average Salary Growth by Career Level"
        subtitle="Annual package in INR Lakhs — 2020 to 2026 projection"
        badge="7-Year Trend"
      >
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={salaryGrowth} margin={{ top: 5, right: 20, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="gradSenior" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.5} />
                <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradMid" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradEntry" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" tick={{ fontSize: 11 }} />
            <YAxis tickFormatter={v => `₹${v}L`} tick={{ fontSize: 11 }} />
            <Tooltip content={<CustomTooltip />} formatter={(v) => `₹${v}L`} />
            <Legend />
            <Area type="monotone" dataKey="senior" name="Senior Level" stroke="#7c3aed" strokeWidth={2.5} fill="url(#gradSenior)" />
            <Area type="monotone" dataKey="mid" name="Mid Level" stroke="#06b6d4" strokeWidth={2.5} fill="url(#gradMid)" />
            <Area type="monotone" dataKey="entry" name="Entry Level" stroke="#10b981" strokeWidth={2.5} fill="url(#gradEntry)" />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Career Paths + Promotion Rates */}
      <div className="chart-grid chart-grid-2">
        <ChartCard
          title="Career Path Transitions"
          subtitle="Breakdown of post-training career moves by domain"
          badge="By Sector"
        >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={careerPaths} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="domain" tick={{ fontSize: 10 }} />
              <YAxis tickFormatter={v => `${v}%`} tick={{ fontSize: 11 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="promoted" name="Promoted" stackId="a" fill="#10b981" radius={[0,0,0,0]} />
              <Bar dataKey="lateral" name="Lateral Move" stackId="a" fill="#06b6d4" />
              <Bar dataKey="sameRole" name="Same Role" stackId="a" fill="#7c3aed" />
              <Bar dataKey="entrepreneur" name="Entrepreneur" stackId="a" fill="#f59e0b" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Cumulative Promotion Rates"
          subtitle="% promoted within N years by sector"
          badge="5-Year"
        >
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={promotionRates} margin={{ top: 5, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" tick={{ fontSize: 11 }} />
              <YAxis tickFormatter={v => `${v}%`} tick={{ fontSize: 11 }} domain={[0, 80]} />
              <Tooltip content={<CustomTooltip />} formatter={(v) => `${v}%`} />
              <Legend />
              <Line type="monotone" dataKey="it" name="IT & Software" stroke="#7c3aed" strokeWidth={2.5} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="bfsi" name="BFSI" stroke="#06b6d4" strokeWidth={2.5} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="healthcare" name="Healthcare" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="manufacturing" name="Manufacturing" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Career Insight Cards */}
      <div className="chart-grid chart-grid-3">
        {[
          { label: 'Avg. Time to First Promotion', value: '2.4 yrs', desc: 'Among trained workforce', color: '#7c3aed' },
          { label: 'Salary Growth (5yr avg)', value: '107%', desc: 'Post-training salary trajectory', color: '#10b981' },
          { label: 'Entrepreneurship Rate', value: '11.2%', desc: 'Started own venture within 3 years', color: '#f59e0b' },
        ].map(m => (
          <ChartCard key={m.label} title={m.label} subtitle={m.desc}>
            <div style={{ fontSize: '2.2rem', fontFamily: 'Outfit', fontWeight: 800, color: m.color, marginTop: 8 }}>
              {m.value}
            </div>
          </ChartCard>
        ))}
      </div>
    </div>
  )
}
