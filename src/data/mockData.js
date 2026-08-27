// ============================================================
// WORKFORCE IQ — Mock Data
// SIH 2026 Workforce Analytics Dashboard
// ============================================================

// ── Overview KPIs ───────────────────────────────────────────
export const kpiData = [
  {
    id: 'learners',
    label: 'Total Learners',
    value: '1,24,580',
    raw: 124580,
    trend: '+12.4%',
    trendDir: 'up',
    sub: '↑ 13,700 vs last quarter',
    gradient: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
    icon: 'Users',
  },
  {
    id: 'placement',
    label: 'Placement Rate',
    value: '78.3%',
    raw: 78.3,
    trend: '+5.2%',
    trendDir: 'up',
    sub: '↑ from 73.1% last year',
    gradient: 'linear-gradient(135deg, #10b981, #06b6d4)',
    icon: 'Briefcase',
  },
  {
    id: 'salary',
    label: 'Avg. Salary Hike',
    value: '34.7%',
    raw: 34.7,
    trend: '+3.1%',
    trendDir: 'up',
    sub: 'Post-training vs pre-training',
    gradient: 'linear-gradient(135deg, #f59e0b, #ec4899)',
    icon: 'TrendingUp',
  },
  {
    id: 'programs',
    label: 'Active Programs',
    value: '1,847',
    raw: 1847,
    trend: '-2.3%',
    trendDir: 'down',
    sub: '42 new, 85 concluded this month',
    gradient: 'linear-gradient(135deg, #ec4899, #7c3aed)',
    icon: 'BookOpen',
  },
]

// ── Enrollment Trend (12 months) ─────────────────────────────
export const enrollmentTrend = [
  { month: 'Sep', enrollments: 8200, completions: 6100, placements: 4800 },
  { month: 'Oct', enrollments: 9400, completions: 7200, placements: 5600 },
  { month: 'Nov', enrollments: 10200, completions: 7900, placements: 6200 },
  { month: 'Dec', enrollments: 8900, completions: 6800, placements: 5100 },
  { month: 'Jan', enrollments: 11500, completions: 9100, placements: 7300 },
  { month: 'Feb', enrollments: 12800, completions: 10400, placements: 8500 },
  { month: 'Mar', enrollments: 14200, completions: 11800, placements: 9700 },
  { month: 'Apr', enrollments: 13600, completions: 11200, placements: 9100 },
  { month: 'May', enrollments: 15400, completions: 13100, placements: 10900 },
  { month: 'Jun', enrollments: 16800, completions: 14300, placements: 12100 },
  { month: 'Jul', enrollments: 18200, completions: 15700, placements: 13400 },
  { month: 'Aug', enrollments: 20100, completions: 17200, placements: 14800 },
]

// ── Outcome Distribution ─────────────────────────────────────
export const outcomeDistribution = [
  { name: 'Employed (Full-time)', value: 52, fill: '#7c3aed' },
  { name: 'Self-employed', value: 14, fill: '#06b6d4' },
  { name: 'Higher Education', value: 18, fill: '#10b981' },
  { name: 'Seeking', value: 11, fill: '#f59e0b' },
  { name: 'Other', value: 5, fill: '#ec4899' },
]

// ── Employment: Placement by Sector ─────────────────────────
export const placementBySector = [
  { sector: 'IT & Software', rate: 89, hired: 18400 },
  { sector: 'Manufacturing', rate: 74, hired: 14200 },
  { sector: 'Healthcare', rate: 81, hired: 11600 },
  { sector: 'BFSI', rate: 76, hired: 9800 },
  { sector: 'Retail', rate: 65, hired: 8200 },
  { sector: 'Construction', rate: 68, hired: 7400 },
  { sector: 'Logistics', rate: 72, hired: 6100 },
  { sector: 'Agriculture', rate: 58, hired: 5300 },
]

// ── Employment: Time-to-Hire Trend ───────────────────────────
export const timeToHire = [
  { month: 'Sep', days: 38, target: 30 },
  { month: 'Oct', days: 35, target: 30 },
  { month: 'Nov', days: 34, target: 30 },
  { month: 'Dec', days: 42, target: 30 },
  { month: 'Jan', days: 31, target: 28 },
  { month: 'Feb', days: 29, target: 28 },
  { month: 'Mar', days: 27, target: 26 },
  { month: 'Apr', days: 26, target: 26 },
  { month: 'May', days: 24, target: 24 },
  { month: 'Jun', days: 23, target: 24 },
  { month: 'Jul', days: 22, target: 22 },
  { month: 'Aug', days: 21, target: 22 },
]

// ── Employment: State-wise Stats ─────────────────────────────
export const stateStats = [
  { state: 'Maharashtra', learners: 18400, placed: 14900, rate: 80.9, avgSalary: '₹4.8L' },
  { state: 'Tamil Nadu', learners: 15200, placed: 12600, rate: 82.9, avgSalary: '₹4.2L' },
  { state: 'Karnataka', learners: 13800, placed: 11700, rate: 84.8, avgSalary: '₹5.1L' },
  { state: 'Uttar Pradesh', learners: 12400, placed: 8600, rate: 69.4, avgSalary: '₹3.1L' },
  { state: 'Gujarat', learners: 10900, placed: 8700, rate: 79.8, avgSalary: '₹3.9L' },
  { state: 'Rajasthan', learners: 9200, placed: 6300, rate: 68.5, avgSalary: '₹2.8L' },
  { state: 'West Bengal', learners: 8800, placed: 6600, rate: 75.0, avgSalary: '₹3.3L' },
  { state: 'Telangana', learners: 7600, placed: 6200, rate: 81.6, avgSalary: '₹4.5L' },
]

// ── Skill Gap: Radar ─────────────────────────────────────────
export const skillRadar = [
  { skill: 'Cloud Computing', demand: 92, supply: 41 },
  { skill: 'Data Science', demand: 88, supply: 52 },
  { skill: 'Cybersecurity', demand: 85, supply: 33 },
  { skill: 'AI/ML', demand: 94, supply: 38 },
  { skill: 'DevOps', demand: 79, supply: 48 },
  { skill: 'Blockchain', demand: 61, supply: 24 },
  { skill: 'UI/UX Design', demand: 74, supply: 62 },
  { skill: 'IoT', demand: 68, supply: 31 },
]

// ── Skill Gap: Horizontal Bar ─────────────────────────────────
export const skillGapBar = [
  { skill: 'AI/ML Engineering', gap: 56, demand: 94, supply: 38 },
  { skill: 'Cloud Architecture', gap: 51, demand: 92, supply: 41 },
  { skill: 'Cybersecurity', gap: 52, demand: 85, supply: 33 },
  { skill: 'Data Engineering', gap: 43, demand: 87, supply: 44 },
  { skill: 'Blockchain Dev', gap: 37, demand: 61, supply: 24 },
  { skill: 'IoT Development', gap: 37, demand: 68, supply: 31 },
  { skill: 'Full Stack Dev', gap: 28, demand: 91, supply: 63 },
  { skill: 'DevOps/SRE', gap: 31, demand: 79, supply: 48 },
]

// ── Trending Skills ──────────────────────────────────────────
export const trendingSkills = [
  { name: 'Generative AI', level: 'hot' },
  { name: 'LLM Fine-tuning', level: 'hot' },
  { name: 'Kubernetes', level: 'high' },
  { name: 'Rust', level: 'high' },
  { name: 'Terraform', level: 'high' },
  { name: 'Data Lakehouse', level: 'high' },
  { name: 'React Native', level: 'medium' },
  { name: 'Go Lang', level: 'medium' },
  { name: 'Prompt Engineering', level: 'hot' },
  { name: 'Quantum Computing', level: 'medium' },
  { name: 'Edge Computing', level: 'medium' },
  { name: 'MLOps', level: 'high' },
  { name: 'GraphQL', level: 'low' },
  { name: 'WebAssembly', level: 'low' },
  { name: 'Federated Learning', level: 'medium' },
  { name: 'Digital Twins', level: 'low' },
]

// ── Training Impact: Program Completion ──────────────────────
export const programCompletion = [
  { program: 'Python & Data Sci', completion: 84, enrolled: 14200, certified: 11900 },
  { program: 'Cloud (AWS/GCP)', completion: 79, enrolled: 11800, certified: 9320 },
  { program: 'Full Stack Dev', completion: 76, enrolled: 10400, certified: 7900 },
  { program: 'Digital Marketing', completion: 88, enrolled: 9600, certified: 8460 },
  { program: 'Cybersecurity', completion: 71, enrolled: 8200, certified: 5820 },
  { program: 'AI/ML Engineering', completion: 68, enrolled: 7400, certified: 5030 },
  { program: 'Mobile Dev (Flutter)', completion: 82, enrolled: 6800, certified: 5580 },
  { program: 'DevOps & SRE', completion: 74, enrolled: 5900, certified: 4370 },
]

// ── Training Impact: ROI Table ────────────────────────────────
export const programROI = [
  { program: 'Python & Data Sci', cost: '₹18,000', costPlacement: '₹24,100', avgSalary: '₹5.2L', roi: '188%', rating: 4.7 },
  { program: 'Cloud (AWS/GCP)', cost: '₹22,000', costPlacement: '₹31,200', avgSalary: '₹6.8L', roi: '209%', rating: 4.8 },
  { program: 'Digital Marketing', cost: '₹9,500', costPlacement: '₹12,400', avgSalary: '₹3.9L', roi: '215%', rating: 4.5 },
  { program: 'Cybersecurity', cost: '₹28,000', costPlacement: '₹44,700', avgSalary: '₹7.4L', roi: '165%', rating: 4.6 },
  { program: 'AI/ML Engineering', cost: '₹34,000', costPlacement: '₹56,200', avgSalary: '₹9.1L', roi: '162%', rating: 4.9 },
  { program: 'Full Stack Dev', cost: '₹20,000', costPlacement: '₹28,600', avgSalary: '₹5.8L', roi: '203%', rating: 4.6 },
]

// ── Training: Hours vs Placement ─────────────────────────────
export const hoursVsPlacement = [
  { hours: 40, placementRate: 62, program: 'Soft Skills' },
  { hours: 80, placementRate: 68, program: 'Digital Lit.' },
  { hours: 120, placementRate: 74, program: 'Full Stack' },
  { hours: 160, placementRate: 78, program: 'Python/DS' },
  { hours: 200, placementRate: 82, program: 'Cloud' },
  { hours: 240, placementRate: 85, program: 'Cybersec' },
  { hours: 300, placementRate: 88, program: 'AI/ML' },
  { hours: 360, placementRate: 86, program: 'DevOps' },
]

// ── Career Progression: Salary Growth ────────────────────────
export const salaryGrowth = [
  { year: '2020', entry: 2.8, mid: 5.2, senior: 9.4 },
  { year: '2021', entry: 3.0, mid: 5.6, senior: 10.1 },
  { year: '2022', entry: 3.4, mid: 6.3, senior: 11.4 },
  { year: '2023', entry: 3.9, mid: 7.1, senior: 13.2 },
  { year: '2024', entry: 4.4, mid: 8.2, senior: 15.6 },
  { year: '2025', entry: 5.1, mid: 9.8, senior: 18.3 },
  { year: '2026', entry: 5.8, mid: 11.2, senior: 21.4 },
]

// ── Career Paths (stacked bar) ────────────────────────────────
export const careerPaths = [
  { domain: 'IT', sameRole: 28, lateral: 32, promoted: 31, entrepreneur: 9 },
  { domain: 'Healthcare', sameRole: 38, lateral: 21, promoted: 35, entrepreneur: 6 },
  { domain: 'BFSI', sameRole: 32, lateral: 28, promoted: 33, entrepreneur: 7 },
  { domain: 'Manufacturing', sameRole: 41, lateral: 24, promoted: 28, entrepreneur: 7 },
  { domain: 'Retail', sameRole: 35, lateral: 30, promoted: 25, entrepreneur: 10 },
  { domain: 'Agriculture', sameRole: 30, lateral: 18, promoted: 22, entrepreneur: 30 },
]

// ── Promotion Rates ───────────────────────────────────────────
export const promotionRates = [
  { year: 'Year 1', it: 12, healthcare: 8, bfsi: 10, manufacturing: 6 },
  { year: 'Year 2', it: 28, healthcare: 19, bfsi: 23, manufacturing: 15 },
  { year: 'Year 3', it: 45, healthcare: 34, bfsi: 38, manufacturing: 27 },
  { year: 'Year 4', it: 58, healthcare: 47, bfsi: 51, manufacturing: 38 },
  { year: 'Year 5', it: 69, healthcare: 58, bfsi: 63, manufacturing: 48 },
]
