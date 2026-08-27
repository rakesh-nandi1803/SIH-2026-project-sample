import { useEffect, useRef, useState } from 'react'
import {
  Users, Briefcase, TrendingUp, BookOpen,
  ArrowUpRight, ArrowDownRight,
} from 'lucide-react'

const iconMap = { Users, Briefcase, TrendingUp, BookOpen }

function useCountUp(target, duration = 1500) {
  const [display, setDisplay] = useState('0')
  const animRef = useRef(null)

  useEffect(() => {
    const numericTarget = parseFloat(String(target).replace(/[^0-9.]/g, ''))
    if (isNaN(numericTarget)) { setDisplay(target); return }

    const start = Date.now()
    const step = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = numericTarget * eased

      // Format same as target string
      if (String(target).includes(',')) {
        setDisplay(Math.round(current).toLocaleString('en-IN'))
      } else if (String(target).includes('%')) {
        setDisplay(current.toFixed(1) + '%')
      } else {
        setDisplay(Math.round(current).toLocaleString('en-IN'))
      }

      if (progress < 1) animRef.current = requestAnimationFrame(step)
    }

    animRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(animRef.current)
  }, [target, duration])

  return display
}

export default function StatCard({ data, index }) {
  const { label, value, trend, trendDir, sub, gradient, icon } = data
  const Icon = iconMap[icon] || TrendingUp
  const displayValue = useCountUp(value)

  return (
    <div
      className="stat-card"
      style={{
        '--card-grad': gradient,
        animationDelay: `${index * 0.1}s`,
      }}
    >
      <div className="stat-card-header">
        <div className="stat-icon">
          <Icon size={20} color="white" />
        </div>
        <div className={`stat-trend ${trendDir}`}>
          {trendDir === 'up'
            ? <ArrowUpRight size={13} />
            : <ArrowDownRight size={13} />
          }
          {trend}
        </div>
      </div>
      <div className="stat-value">{displayValue}</div>
      <div className="stat-label">{label}</div>
      <div className="stat-sub">{sub}</div>
    </div>
  )
}
