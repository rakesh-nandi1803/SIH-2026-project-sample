// ============================================================
// SkillTrack360 — Dashboard Charts & Data
// ============================================================

let trendChart, statusChart, sectorChart, salaryChart;

function initDashboard() {
  renderTrendChart('all');
  renderStatusChart();
  renderSectorChart();
  renderSalaryChart();
  renderStateList();
  renderEmployerList();
  renderActivityFeed();
}

// ── Trend Chart ──────────────────────────────────────────
function renderTrendChart(mode) {
  const ctx = document.getElementById('trendChart');
  if (!ctx) return;
  if (trendChart) trendChart.destroy();

  const d = SkillTrackData.employmentTrend;
  const datasets = mode === 'placed'
    ? [{ label: 'Placed', data: d.placed, borderColor: '#00ff9f', backgroundColor: 'rgba(0,255,159,0.08)', fill: true, tension: 0.4, pointRadius: 4, pointHoverRadius: 7 }]
    : [
        { label: 'Enrolled', data: d.enrolled, borderColor: '#00d4ff', backgroundColor: 'rgba(0,212,255,0.06)', fill: true, tension: 0.4, pointRadius: 3, pointHoverRadius: 6 },
        { label: 'Trained',  data: d.trained,  borderColor: '#7b5ea7', backgroundColor: 'rgba(123,94,167,0.06)', fill: true, tension: 0.4, pointRadius: 3, pointHoverRadius: 6 },
        { label: 'Placed',   data: d.placed,   borderColor: '#00ff9f', backgroundColor: 'rgba(0,255,159,0.06)', fill: true, tension: 0.4, pointRadius: 3, pointHoverRadius: 6 }
      ];

  trendChart = new Chart(ctx, {
    type: 'line',
    data: { labels: d.labels, datasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: { legend: { display: true, position: 'top' } },
      scales: {
        x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#8ba3c1' } },
        y: {
          grid: { color: 'rgba(255,255,255,0.04)' },
          ticks: { color: '#8ba3c1', callback: v => v >= 1000 ? (v/1000).toFixed(0)+'K' : v }
        }
      }
    }
  });
}

window.switchTrend = function(mode, btn) {
  document.querySelectorAll('#tabEnrolled').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderTrendChart(mode);
};

// ── Status Donut ─────────────────────────────────────────
function renderStatusChart() {
  const ctx = document.getElementById('statusChart');
  if (!ctx) return;
  statusChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Placed', 'In Training', 'Job Seeking'],
      datasets: [{
        data: [68.9, 18.4, 12.7],
        backgroundColor: ['rgba(0,255,159,0.8)', 'rgba(255,214,10,0.8)', 'rgba(123,94,167,0.8)'],
        borderColor: 'transparent',
        borderWidth: 0,
        hoverOffset: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '72%',
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: ctx => ` ${ctx.label}: ${ctx.parsed}%` } }
      }
    }
  });
}

// ── Sector Chart ─────────────────────────────────────────
function renderSectorChart() {
  const ctx = document.getElementById('sectorChart');
  if (!ctx) return;
  const d = SkillTrackData.sectorPlacement;
  sectorChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: d.labels,
      datasets: [
        { label: 'Enrolled', data: d.enrolled, backgroundColor: 'rgba(0,212,255,0.2)', borderColor: 'rgba(0,212,255,0.6)', borderWidth: 1, borderRadius: 4 },
        { label: 'Placed',   data: d.placed,   backgroundColor: 'rgba(0,255,159,0.4)', borderColor: 'rgba(0,255,159,0.8)', borderWidth: 1, borderRadius: 4 }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: { legend: { position: 'top' } },
      scales: {
        x: { grid: { display: false }, ticks: { color: '#8ba3c1', maxRotation: 30 } },
        y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: '#8ba3c1', callback: v => (v/1000).toFixed(0)+'K' } }
      }
    }
  });
}

// ── Salary Uplift Chart ───────────────────────────────────
function renderSalaryChart() {
  const ctx = document.getElementById('salaryChart');
  if (!ctx) return;
  const d = SkillTrackData.salaryUplift;
  const colors = ['#00d4ff','#7b5ea7','#00ff9f','#ffd60a','#ff6b35'];
  const sectors = ['IT', 'Manufacturing', 'Healthcare', 'Retail', 'Construction'];

  salaryChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: d.labels,
      datasets: sectors.map((s, i) => ({
        label: s,
        data: d[s],
        borderColor: colors[i],
        backgroundColor: 'transparent',
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 7
      }))
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: { legend: { position: 'top' } },
      scales: {
        x: { grid: { display: false }, ticks: { color: '#8ba3c1' } },
        y: {
          grid: { color: 'rgba(255,255,255,0.04)' },
          ticks: { color: '#8ba3c1', callback: v => '₹' + (v/1000).toFixed(0)+'K' }
        }
      }
    }
  });
}

// ── State List ────────────────────────────────────────────
function renderStateList() {
  const el = document.getElementById('stateList');
  if (!el) return;
  const states = SkillTrackData.stateData;
  el.innerHTML = states.map((s, i) => {
    const color = s.placementRate >= 75 ? 'var(--accent-3)' : s.placementRate >= 65 ? 'var(--accent-5)' : '#ff4757';
    const barW = Math.round(s.placementRate);
    return `
      <div class="state-row">
        <span style="color:var(--text-muted);font-size:0.75rem;width:20px;">${i+1}</span>
        <div style="flex:1;">
          <div class="state-name">${s.state}</div>
          <div class="progress-bar-wrap" style="margin-top:4px;">
            <div class="progress-bar-fill ${s.placementRate >= 75 ? 'green' : s.placementRate >= 65 ? 'orange' : 'red'}" data-width="${barW}" style="width:0%;"></div>
          </div>
        </div>
        <div class="state-rate" style="color:${color};">${s.placementRate}%</div>
        <div class="badge badge-blue" style="margin-left:8px;font-size:0.68rem;">${s.initiatives} prog.</div>
      </div>`;
  }).join('');
  setTimeout(animateProgressBars, 100);
}

// ── Employer List ─────────────────────────────────────────
function renderEmployerList() {
  const el = document.getElementById('employerList');
  if (!el) return;
  el.innerHTML = SkillTrackData.topEmployers.map((e, i) => `
    <div class="employer-item">
      <div class="employer-rank">${i+1}</div>
      <div style="width:34px;height:34px;border-radius:8px;background:var(--glass-bg);border:1px solid var(--glass-border);display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0;">
        ${['💻','💾','🏗️','🏥','🛒','📦','🚗','🖥️'][i]}
      </div>
      <div style="flex:1;">
        <div class="employer-name">${e.name}</div>
        <div class="employer-sector">${e.sector}</div>
      </div>
      <div>
        <div class="employer-count">${formatNum(e.hires)}</div>
        <div style="font-size:0.7rem;color:var(--text-muted);text-align:right;">hires</div>
      </div>
    </div>
  `).join('');
}

// ── Activity Feed ─────────────────────────────────────────
function renderActivityFeed() {
  const el = document.getElementById('activityFeed');
  if (!el) return;
  const activities = [
    { color: 'var(--accent-3)', text: 'Priya Sharma (TRN-001842) placed at Infosys BPM as Junior Data Analyst — ₹22,000/month', time: '2 hours ago' },
    { color: 'var(--accent-1)', text: 'New batch of 240 trainees enrolled in PMKVY 4.0 — IT Sector batch at Lucknow TC', time: '4 hours ago' },
    { color: '#ffd60a',         text: 'Skill gap alert: EV Technician demand surged 34% in Maharashtra — curriculum update recommended', time: '6 hours ago' },
    { color: '#b39ddb',         text: 'ASEEM initiative crossed 86.4% placement rate — highest performing program this quarter', time: '8 hours ago' },
    { color: 'var(--accent-3)', text: 'L&T Construction onboarded 180 DDU-GKY trainees from Bihar batch', time: '12 hours ago' },
    { color: '#ff6b35',         text: 'Cloud Computing skill gap widened to 57 points — critical shortage in IT sector', time: '1 day ago' },
    { color: 'var(--accent-1)', text: 'Karnataka achieved 80.5% placement rate — top performing state this month', time: '1 day ago' },
    { color: '#ffd60a',         text: 'SANKALP Healthcare batch in Rajasthan completed mid-assessment with 88% avg score', time: '2 days ago' },
  ];
  el.innerHTML = activities.map(a => `
    <div class="activity-item">
      <div class="activity-dot" style="background:${a.color};"></div>
      <div style="flex:1;">
        <div class="activity-text">${a.text}</div>
        <div class="activity-time">${a.time}</div>
      </div>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', initDashboard);
