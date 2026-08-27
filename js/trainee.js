// ============================================================
// SkillTrack360 — Trainee Profile
// ============================================================

let matchChart, skillProgressChart, salaryChart;
let currentTrainee = null;

function initTrainee() {
  loadTrainee(0);
}

window.loadTrainee = function(idx) {
  const t = SkillTrackData.trainees[idx];
  currentTrainee = t;

  // Avatar initials
  const initials = t.name.split(' ').map(n => n[0]).join('');
  document.getElementById('profileAvatar').textContent = initials;
  document.getElementById('profileName').textContent   = t.name;
  document.getElementById('profileId').textContent     = t.id;

  renderProfileInfo(t);
  renderStatusBanner(t);
  renderSkills(t);
  renderTimeline(t);
  renderCertifications(t);
  renderMatchScore(t);
  renderSkillProgressChart(t);
  renderSalaryCompChart(t);
  renderAIRecommendations(t);
};

// ── Profile Info ──────────────────────────────────────────
function renderProfileInfo(t) {
  const el = document.getElementById('profileInfo');
  const rows = [
    ['Age',           t.age + ' years'],
    ['Gender',        t.gender],
    ['State',         t.state],
    ['District',      t.district],
    ['Education',     t.qualification],
    ['Program',       t.initiative],
    ['Sector',        t.sector],
    ['Course',        t.course],
    ['Enrolled On',   t.enrolledDate],
    ['Status',        t.status.toUpperCase()],
  ];
  el.innerHTML = rows.map(([k, v]) => `
    <div class="profile-info-row">
      <span class="profile-info-key">${k}</span>
      <span class="profile-info-val">${v}</span>
    </div>`).join('');
}

// ── Status Banner ─────────────────────────────────────────
function renderStatusBanner(t) {
  const el = document.getElementById('statusBanner');
  if (t.status === 'placed') {
    el.innerHTML = `
      <div class="status-banner placed">
        <div class="status-icon">✅</div>
        <div class="status-text">
          <div class="status-title" style="color:var(--accent-3);">Successfully Placed!</div>
          <div class="status-desc">Hired by <strong>${t.employer}</strong> as <strong>${t.jobRole}</strong> — Salary: <strong style="color:var(--accent-3);">₹${formatNum(t.salary)}/month</strong></div>
        </div>
        <div>
          <div class="badge badge-green">PLACED</div>
        </div>
      </div>`;
  } else {
    el.innerHTML = `
      <div class="status-banner training">
        <div class="status-icon">🔄</div>
        <div class="status-text">
          <div class="status-title" style="color:var(--accent-5);">Currently In Training</div>
          <div class="status-desc">Enrolled in <strong>${t.initiative}</strong> · Course: <strong>${t.course}</strong></div>
        </div>
        <div><div class="badge badge-orange">IN TRAINING</div></div>
      </div>`;
  }
}

// ── Skills ────────────────────────────────────────────────
function renderSkills(t) {
  const el = document.getElementById('skillsList');
  el.innerHTML = t.skills.map(s => `<span class="skill-tag">✓ ${s}</span>`).join('');
}

// ── Timeline ──────────────────────────────────────────────
function renderTimeline(t) {
  const el = document.getElementById('timeline');
  el.innerHTML = t.journey.map(j => `
    <div class="timeline-item ${j.status || ''}">
      <div class="timeline-date">${j.date}</div>
      <div class="timeline-title">${j.event}</div>
      <div class="timeline-desc">${j.desc}</div>
    </div>
  `).join('');
}

// ── Certifications ────────────────────────────────────────
function renderCertifications(t) {
  const el = document.getElementById('certList');
  el.innerHTML = t.certifications.map(c => `
    <div style="display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.04);">
      <span style="font-size:1rem;">🏅</span>
      <span style="font-size:0.82rem;font-weight:500;">${c}</span>
    </div>`).join('');
}

// ── Match Score Ring ──────────────────────────────────────
function renderMatchScore(t) {
  const ctx = document.getElementById('matchChart');
  if (!ctx) return;
  if (matchChart) matchChart.destroy();

  const score = t.matchScore;
  document.getElementById('matchNum').textContent = score;
  document.getElementById('matchLabel').textContent =
    score >= 90 ? 'Excellent Match' : score >= 75 ? 'Good Match' : 'Fair Match';
  document.getElementById('matchLabel').style.color =
    score >= 90 ? 'var(--accent-3)' : score >= 75 ? 'var(--accent-5)' : '#00d4ff';

  matchChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [score, 100 - score],
        backgroundColor: [score >= 90 ? 'rgba(0,255,159,0.8)' : 'rgba(0,212,255,0.8)', 'rgba(255,255,255,0.04)'],
        borderColor: 'transparent',
        borderWidth: 0
      }]
    },
    options: {
      cutout: '80%',
      plugins: { legend: { display: false }, tooltip: { enabled: false } },
      animation: { animateRotate: true, duration: 1000 }
    }
  });
}

// ── Skill Progress Chart ──────────────────────────────────
function renderSkillProgressChart(t) {
  const ctx = document.getElementById('skillProgressChart');
  if (!ctx) return;
  if (skillProgressChart) skillProgressChart.destroy();

  const skills = t.skills.slice(0, 5);
  const scores = skills.map(() => Math.floor(Math.random() * 30 + 70));

  skillProgressChart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: skills,
      datasets: [{
        label: 'Proficiency',
        data: scores,
        backgroundColor: 'rgba(0,212,255,0.1)',
        borderColor: '#00d4ff',
        borderWidth: 2,
        pointBackgroundColor: '#00d4ff',
        pointRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        r: {
          max: 100, min: 0,
          ticks: { color: '#8ba3c1', backdropColor: 'transparent', stepSize: 25, display: false },
          grid: { color: 'rgba(255,255,255,0.06)' },
          angleLines: { color: 'rgba(255,255,255,0.06)' },
          pointLabels: { color: '#8ba3c1', font: { size: 9 } }
        }
      }
    }
  });
}

// ── Salary Comparison Chart ───────────────────────────────
function renderSalaryCompChart(t) {
  const ctx = document.getElementById('salaryCompChart');
  if (!ctx) return;
  if (salaryChart) salaryChart.destroy();

  const sectorSalaries = SkillTrackData.salaryUplift;
  const sectorKey = t.sector === 'IT & Tech' ? 'IT' :
                    t.sector === 'Healthcare' ? 'Healthcare' :
                    t.sector === 'Construction' ? 'Construction' : 'Retail';
  const sectorData = sectorSalaries[sectorKey] || sectorSalaries['IT'];

  const traineePoints = t.salary
    ? [sectorData[0], sectorData[0] + Math.round((t.salary - sectorData[0]) * 0.4), t.salary, null]
    : [sectorData[0], null, null, null];

  salaryChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: sectorSalaries.labels,
      datasets: [
        {
          label: 'Sector Avg',
          data: sectorData,
          borderColor: '#7b5ea7',
          backgroundColor: 'rgba(123,94,167,0.08)',
          tension: 0.4, pointRadius: 4, fill: true
        },
        {
          label: t.name.split(' ')[0],
          data: traineePoints,
          borderColor: '#00ff9f',
          backgroundColor: 'rgba(0,255,159,0.08)',
          tension: 0.4, pointRadius: 5,
          borderDash: t.status !== 'placed' ? [5, 3] : [],
          fill: true,
          spanGaps: false
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: 'top' } },
      scales: {
        x: { grid: { display: false }, ticks: { color: '#8ba3c1', font: { size: 10 } } },
        y: {
          grid: { color: 'rgba(255,255,255,0.04)' },
          ticks: { color: '#8ba3c1', callback: v => '₹' + (v/1000).toFixed(0)+'K' }
        }
      }
    }
  });
}

// ── AI Recommendations ────────────────────────────────────
function renderAIRecommendations(t) {
  const el = document.getElementById('aiRecs');
  const recs = {
    'IT & Tech': [
      { icon: '☁️', title: 'Cloud Computing (AWS/GCP)', desc: 'High demand in your sector — 57pt gap in market', tag: 'Critical Skill · +₹8,000 salary potential' },
      { icon: '🤖', title: 'Machine Learning Fundamentals', desc: 'AI/ML roles growing 3x — pairs well with Python skills', tag: 'High Growth · +₹12,000 salary potential' },
      { icon: '🔒', title: 'Cybersecurity Essentials', desc: '55pt skill gap — massive employer demand', tag: 'Critical Shortage · 2,000+ open roles' }
    ],
    'Construction': [
      { icon: '⚡', title: 'Electrical Installations (NSQF L4)', desc: 'Complements masonry — 40% higher earnings', tag: 'High Value · +₹5,000 salary potential' },
      { icon: '📐', title: 'AutoCAD & Civil Drafting', desc: 'Digital skills now required by top employers', tag: 'Growing Demand · Matches L&T profile' },
      { icon: '🔋', title: 'Solar & Renewable Energy', desc: '43pt skill gap — booming green energy sector', tag: 'Future Ready · Govt. priority sector' }
    ],
    'Healthcare': [
      { icon: '💊', title: 'Pharmacy & Medicine Dispensing', desc: 'Expand scope from nursing to clinical support', tag: 'Adjacent Role · +₹4,000 salary potential' },
      { icon: '🏥', title: 'NABH Quality Standards', desc: 'Hospital accreditation knowledge in high demand', tag: 'Career Boost · Management track' },
      { icon: '📱', title: 'mHealth & Digital Health Records', desc: 'All hospitals going digital — essential skill', tag: 'Trending · 30+ open positions in Jaipur' }
    ]
  };

  const recList = recs[t.sector] || recs['IT & Tech'];
  el.innerHTML = recList.map(r => `
    <div class="ai-rec-item">
      <div class="ai-rec-icon">${r.icon}</div>
      <div>
        <div class="ai-rec-title">${r.title}</div>
        <div class="ai-rec-desc">${r.desc}</div>
        <div class="ai-rec-tag">💡 ${r.tag}</div>
      </div>
      <button class="btn btn-ghost btn-sm" style="flex-shrink:0;" onclick="showToast('Enroll request sent for ${r.title}!','success')">Enroll</button>
    </div>`).join('');
}

document.addEventListener('DOMContentLoaded', initTrainee);
