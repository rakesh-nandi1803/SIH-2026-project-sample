// ============================================================
// SkillTrack360 — Mock Data Module
// ============================================================

const SkillTrackData = {

  // ── KPI Counters ─────────────────────────────────────────
  kpis: {
    totalTrainees:       184750,
    placed:              127340,
    placementRate:       68.9,
    activeInitiatives:   342,
    skillGapsIdentified: 58,
    avgSalaryUplift:     42,
    partnerEmployers:    2840,
    statesCovered:       28
  },

  // ── Monthly Employment Outcome Trend ─────────────────────
  employmentTrend: {
    labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    enrolled:  [12400, 14200, 13800, 15600, 16900, 18200, 17400, 19800, 21300, 20100, 22400, 24700],
    trained:   [10200, 11800, 11500, 13200, 14100, 15800, 14900, 17100, 18500, 17400, 19600, 21800],
    placed:    [7100,  8400,  8200,  9800, 10500, 12100, 11400, 13600, 15200, 14100, 16200, 18400]
  },

  // ── Sector-wise Placement ────────────────────────────────
  sectorPlacement: {
    labels: ['IT & Tech', 'Manufacturing', 'Healthcare', 'Retail & Commerce', 'Construction', 'Logistics', 'Agriculture', 'Finance'],
    placed:  [28400, 21300, 18700, 16200, 14800, 12300, 9800,  6300],
    enrolled:[38200, 29100, 24900, 22800, 20500, 17600, 15200, 9800],
    colors:  ['#00d4ff','#7b5ea7','#00ff9f','#ffd60a','#ff6b35','#ff4757','#40c057','#74c0fc']
  },

  // ── Skill Gaps ───────────────────────────────────────────
  skillGaps: [
    { skill: 'Python & Data Science', demand: 94, supply: 42, gap: 52, severity: 'critical', sector: 'IT & Tech' },
    { skill: 'Cloud Computing (AWS/GCP)', demand: 88, supply: 31, gap: 57, severity: 'critical', sector: 'IT & Tech' },
    { skill: 'Machine Learning / AI', demand: 91, supply: 28, gap: 63, severity: 'critical', sector: 'IT & Tech' },
    { skill: 'CNC Machine Operations', demand: 76, supply: 52, gap: 24, severity: 'high',     sector: 'Manufacturing' },
    { skill: 'Solar Panel Installation', demand: 82, supply: 39, gap: 43, severity: 'critical', sector: 'Green Energy' },
    { skill: 'Clinical Nursing Skills', demand: 79, supply: 61, gap: 18, severity: 'medium',   sector: 'Healthcare' },
    { skill: 'Supply Chain Management', demand: 71, supply: 48, gap: 23, severity: 'high',     sector: 'Logistics' },
    { skill: 'Digital Marketing', demand: 85, supply: 67, gap: 18, severity: 'medium',        sector: 'Retail' },
    { skill: 'EV Technician', demand: 88, supply: 22, gap: 66, severity: 'critical',          sector: 'Automotive' },
    { skill: 'Cybersecurity', demand: 90, supply: 35, gap: 55, severity: 'critical',          sector: 'IT & Tech' },
    { skill: 'Welding & Fabrication', demand: 67, supply: 58, gap: 9,  severity: 'low',       sector: 'Manufacturing' },
    { skill: 'Financial Literacy', demand: 72, supply: 60, gap: 12, severity: 'low',          sector: 'Finance' },
    { skill: 'Healthcare Data Entry', demand: 68, supply: 55, gap: 13, severity: 'low',       sector: 'Healthcare' },
    { skill: 'Drone Pilot (DGCA)', demand: 77, supply: 19, gap: 58, severity: 'critical',     sector: 'Logistics' },
    { skill: 'ReactJS / Frontend Dev', demand: 89, supply: 44, gap: 45, severity: 'critical', sector: 'IT & Tech' },
  ],

  // ── State-wise Data ──────────────────────────────────────
  stateData: [
    { state: 'Uttar Pradesh',     enrolled: 32400, placed: 19800, placementRate: 61.1, initiatives: 48 },
    { state: 'Maharashtra',       enrolled: 28700, placed: 21300, placementRate: 74.2, initiatives: 42 },
    { state: 'Tamil Nadu',        enrolled: 24100, placed: 18900, placementRate: 78.4, initiatives: 38 },
    { state: 'Rajasthan',         enrolled: 18900, placed: 11200, placementRate: 59.3, initiatives: 29 },
    { state: 'Gujarat',           enrolled: 16800, placed: 13100, placementRate: 78.0, initiatives: 31 },
    { state: 'Karnataka',         enrolled: 15400, placed: 12400, placementRate: 80.5, initiatives: 27 },
    { state: 'West Bengal',       enrolled: 14200, placed: 8900,  placementRate: 62.7, initiatives: 22 },
    { state: 'Madhya Pradesh',    enrolled: 12800, placed: 7600,  placementRate: 59.4, initiatives: 18 },
    { state: 'Andhra Pradesh',    enrolled: 11900, placed: 9100,  placementRate: 76.5, initiatives: 20 },
    { state: 'Bihar',             enrolled: 9800,  placed: 4800,  placementRate: 49.0, initiatives: 14 },
  ],

  // ── Skilling Initiatives ─────────────────────────────────
  initiatives: [
    {
      id: 'PMKVY-2024',
      name: 'Pradhan Mantri Kaushal Vikas Yojana 4.0',
      ministry: 'MSDE',
      status: 'active',
      enrolled: 48200,
      completed: 39400,
      placed: 28900,
      placementRate: 73.4,
      avgSalary: 18400,
      duration: '3-6 months',
      sectors: ['IT & Tech', 'Healthcare', 'Retail'],
      startDate: '2024-04-01',
      budget: 1200,
      statesActive: 28,
      trend: 'up'
    },
    {
      id: 'DDU-GKY',
      name: 'Deen Dayal Upadhyaya Grameen Kaushalya Yojana',
      ministry: 'MoRD',
      status: 'active',
      enrolled: 31800,
      completed: 26200,
      placed: 19800,
      placementRate: 75.6,
      avgSalary: 14200,
      duration: '3-12 months',
      sectors: ['Agriculture', 'Construction', 'Retail'],
      startDate: '2024-01-15',
      budget: 860,
      statesActive: 24,
      trend: 'up'
    },
    {
      id: 'NAPS',
      name: 'National Apprenticeship Promotion Scheme',
      ministry: 'MoLE',
      status: 'active',
      enrolled: 28400,
      completed: 21900,
      placed: 18200,
      placementRate: 83.1,
      avgSalary: 22100,
      duration: '6-36 months',
      sectors: ['Manufacturing', 'IT & Tech', 'Finance'],
      startDate: '2023-10-01',
      budget: 640,
      statesActive: 22,
      trend: 'up'
    },
    {
      id: 'STRIVE',
      name: 'Skills Training for Industrial Value Enhancement',
      ministry: 'MSDE',
      status: 'completed',
      enrolled: 18700,
      completed: 16200,
      placed: 11400,
      placementRate: 70.4,
      avgSalary: 19800,
      duration: '6 months',
      sectors: ['Manufacturing', 'Construction'],
      startDate: '2023-04-01',
      budget: 480,
      statesActive: 18,
      trend: 'stable'
    },
    {
      id: 'SANKALP',
      name: 'Skills Acquisition and Knowledge Awareness for Livelihood',
      ministry: 'MSDE',
      status: 'active',
      enrolled: 14900,
      completed: 9800,
      placed: 6700,
      placementRate: 68.4,
      avgSalary: 16500,
      duration: '3-9 months',
      sectors: ['Healthcare', 'Green Energy'],
      startDate: '2024-07-01',
      budget: 320,
      statesActive: 16,
      trend: 'up'
    },
    {
      id: 'ASEEM',
      name: 'Atmanirbhar Skilled Employee Employer Mapping',
      ministry: 'MSDE',
      status: 'active',
      enrolled: 22600,
      completed: 18400,
      placed: 15900,
      placementRate: 86.4,
      avgSalary: 24300,
      duration: '1-3 months',
      sectors: ['IT & Tech', 'Logistics', 'Finance'],
      startDate: '2024-02-15',
      budget: 280,
      statesActive: 20,
      trend: 'up'
    },
  ],

  // ── Sample Trainees ──────────────────────────────────────
  trainees: [
    {
      id: 'TRN-2024-001842',
      name: 'Priya Sharma',
      age: 23,
      gender: 'Female',
      state: 'Uttar Pradesh',
      district: 'Lucknow',
      qualification: 'Class 12 (Science)',
      initiative: 'PMKVY-2024',
      sector: 'IT & Tech',
      course: 'Python & Data Analytics',
      enrolledDate: '2024-05-12',
      completionDate: '2024-08-14',
      status: 'placed',
      employer: 'Infosys BPM',
      salary: 22000,
      jobRole: 'Junior Data Analyst',
      skills: ['Python', 'SQL', 'Power BI', 'Excel', 'Data Visualization'],
      certifications: ['NSQF Level 4', 'Microsoft Power BI', 'Python Basics'],
      matchScore: 92,
      journey: [
        { date: '2024-05-12', event: 'Enrolled', desc: 'Enrolled in PMKVY 4.0 — IT Sector', status: 'done' },
        { date: '2024-05-15', event: 'Training Begins', desc: 'Python & Data Analytics batch started', status: 'done' },
        { date: '2024-07-20', event: 'Mid Assessment', desc: 'Scored 84% in mid-term evaluation', status: 'done' },
        { date: '2024-08-10', event: 'Final Assessment', desc: 'Scored 91% — NSQF Level 4 certified', status: 'done' },
        { date: '2024-08-20', event: 'Job Fair', desc: 'Participated in NSDC Digital Job Fair', status: 'done' },
        { date: '2024-09-01', event: 'Placed', desc: 'Offer from Infosys BPM — ₹22,000/month', status: 'current' },
      ]
    },
    {
      id: 'TRN-2024-003291',
      name: 'Rajan Kumar',
      age: 27,
      gender: 'Male',
      state: 'Bihar',
      district: 'Patna',
      qualification: 'Class 10',
      initiative: 'DDU-GKY',
      sector: 'Construction',
      course: 'Masonry & Construction Skills',
      enrolledDate: '2024-03-08',
      completionDate: '2024-07-10',
      status: 'placed',
      employer: 'L&T Construction',
      salary: 16500,
      jobRole: 'Site Mason',
      skills: ['Masonry', 'Safety Compliance', 'Blueprint Reading', 'Concrete Work'],
      certifications: ['NSQF Level 3', 'Safety at Work'],
      matchScore: 78,
      journey: [
        { date: '2024-03-08', event: 'Enrolled', desc: 'Enrolled in DDU-GKY Rural Skills Program', status: 'done' },
        { date: '2024-03-10', event: 'Training Begins', desc: 'Masonry skills batch at Patna TC', status: 'done' },
        { date: '2024-05-15', event: 'Site Visit', desc: 'On-site practical training at L&T project', status: 'done' },
        { date: '2024-07-05', event: 'Assessment', desc: 'Cleared NSQF Level 3 assessment', status: 'done' },
        { date: '2024-07-15', event: 'Placed', desc: 'Hired by L&T Construction — ₹16,500/month', status: 'current' },
      ]
    },
    {
      id: 'TRN-2024-007812',
      name: 'Anita Devi',
      age: 31,
      gender: 'Female',
      state: 'Rajasthan',
      district: 'Jaipur',
      qualification: 'Diploma in Nursing',
      initiative: 'SANKALP',
      sector: 'Healthcare',
      course: 'Community Health Worker',
      enrolledDate: '2024-07-18',
      completionDate: null,
      status: 'training',
      employer: null,
      salary: null,
      jobRole: null,
      skills: ['Basic Life Support', 'Patient Care', 'Medical Documentation', 'Community Health'],
      certifications: ['BLS Certified'],
      matchScore: 85,
      journey: [
        { date: '2024-07-18', event: 'Enrolled', desc: 'Enrolled in SANKALP Healthcare Program', status: 'done' },
        { date: '2024-07-20', event: 'Training Begins', desc: 'Community Health batch started in Jaipur', status: 'done' },
        { date: '2024-09-10', event: 'Mid Assessment', desc: 'Scored 88% in clinical knowledge test', status: 'current' },
        { date: '2024-10-20', event: 'Final Assessment', desc: 'Upcoming NSQF Level 4 exam', status: null },
        { date: '2024-11-01', event: 'Job Placement', desc: 'Job fair scheduled at AIIMS Jaipur', status: null },
      ]
    }
  ],

  // ── Top Employers ─────────────────────────────────────────
  topEmployers: [
    { name: 'Infosys BPM',       hires: 4820, sector: 'IT & Tech',     avgSalary: 22400 },
    { name: 'Wipro',             hires: 3940, sector: 'IT & Tech',     avgSalary: 24100 },
    { name: 'L&T Construction',  hires: 3210, sector: 'Construction',  avgSalary: 18200 },
    { name: 'Apollo Hospitals',  hires: 2980, sector: 'Healthcare',    avgSalary: 19800 },
    { name: 'Reliance Retail',   hires: 2740, sector: 'Retail',        avgSalary: 16400 },
    { name: 'Amazon Logistics',  hires: 2490, sector: 'Logistics',     avgSalary: 17900 },
    { name: 'Maruti Suzuki',     hires: 2180, sector: 'Manufacturing', avgSalary: 20100 },
    { name: 'HCL Technologies',  hires: 1960, sector: 'IT & Tech',     avgSalary: 26800 },
  ],

  // ── Salary Uplift Data ────────────────────────────────────
  salaryUplift: {
    labels: ['Before Training', 'After 3M', 'After 6M', 'After 12M'],
    IT:            [8200,  18400, 22100, 28600],
    Manufacturing: [7400,  14200, 16800, 19400],
    Healthcare:    [6800,  15100, 17900, 21200],
    Retail:        [7100,  12800, 14600, 17100],
    Construction:  [7800,  15400, 17200, 19800],
  }
};
