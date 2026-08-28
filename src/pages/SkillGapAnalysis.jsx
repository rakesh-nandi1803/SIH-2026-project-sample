import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer,
} from 'recharts'
import { Flame, Zap, TrendingUp, Sparkles } from 'lucide-react'
import ChartCard from '../components/ChartCard'
import { skillRadar, skillGapBar, trendingSkills } from '../data/mockData'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: 'rgba(15,20,31,0.95)', border: '1px solid rgba(243,106,16,0.35)',
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

const pillClass = { hot: 'pill-hot', high: 'pill-high', medium: 'pill-medium', low: 'pill-low' }

export default function SkillGapAnalysis() {
  return (
    <div className="page-body">
      <div className="page-header">
        <h1 className="page-title">Skill Gap <span>Analysis</span></h1>
        <p className="page-desc">Identify critical mismatches between industry demand and current workforce supply</p>
      </div>

      {/* Radar + Bar */}
      <div className="chart-grid chart-grid-2">
        <ChartCard
          title="Skill Demand vs. Supply Radar"
          subtitle="Index score out of 100 across key domains"
          badge="Aug 2026"
        >
          <ResponsiveContainer width="100%" height={320}>
            <RadarChart data={skillRadar} margin={{ top: 10, right: 30, left: 30, bottom: 10 }}>
              <PolarGrid stroke="rgba(148,163,184,0.1)" />
              <PolarAngleAxis dataKey="skill" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9, fill: 'var(--text-muted)' }} />
              <Radar name="Industry Demand" dataKey="demand" stroke="#f36a10" fill="#f36a10" fillOpacity={0.25} strokeWidth={2} />
              <Radar name="Workforce Supply" dataKey="supply" stroke="#10b981" fill="#10b981" fillOpacity={0.15} strokeWidth={2} />
              <Legend />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Skills with Highest Gap"
          subtitle="Gap = Demand index minus Supply index"
          badge="Critical Gaps"
        >
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={skillGapBar} layout="vertical" margin={{ top: 0, right: 20, left: 110, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="skill" tick={{ fontSize: 10, fill: 'var(--text-secondary)' }} width={110} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="demand" name="Demand" fill="#f36a10" radius={[0, 4, 4, 0]} />
              <Bar dataKey="supply" name="Supply" fill="#10b981" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Trending Skills */}
      <ChartCard
        title="Trending Skills in Job Market"
        subtitle="Categorized by demand urgency — sourced from 50K+ job postings"
        badge="Live Trends"
      >
        <div style={{ marginBottom: 12, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {[
            { level: 'hot', label: 'Hot (Urgent)', icon: Flame, color: '#f36a10' },
            { level: 'high', label: 'High Demand', icon: Zap, color: '#f59e0b' },
            { level: 'medium', label: 'Growing', icon: TrendingUp, color: '#10b981' },
            { level: 'low', label: 'Emerging', icon: Sparkles, color: '#64748b' },
          ].map(l => {
            const Icon = l.icon
            return (
              <div key={l.level} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: l.color, fontWeight: 500 }}>
                <Icon size={14} />
                <span>{l.label}</span>
              </div>
            )
          })}
        </div>
        <div className="pill-grid">
          {trendingSkills.map(s => (
            <span key={s.name} className={`skill-pill ${pillClass[s.level]}`}>
              {s.name}
            </span>
          ))}
        </div>
      </ChartCard>

      {/* Gap summary metrics */}
      <div className="chart-grid chart-grid-3" style={{ marginTop: 20 }}>
        {[
          { label: 'Avg. Skill Gap Score', value: '43.2', unit: 'pts', desc: 'Across all tracked domains', color: '#f36a10' },
          { label: 'Critical Shortage Roles', value: '284', unit: 'roles', desc: 'Requiring immediate upskilling', color: '#f59e0b' },
          { label: 'Gap Closed YoY', value: '18.4%', unit: '', desc: 'Improvement vs. last year', color: '#10b981' },
        ].map(m => (
          <ChartCard key={m.label} title={m.label} subtitle={m.desc}>
            <div style={{ fontSize: '2.2rem', fontFamily: 'Outfit', fontWeight: 800, color: m.color, marginTop: 8 }}>
              {m.value}
              <span style={{ fontSize: '1rem', marginLeft: 4, color: 'var(--text-muted)' }}>{m.unit}</span>
            </div>
          </ChartCard>
        ))}
      </div>
    </div>
  )
}
