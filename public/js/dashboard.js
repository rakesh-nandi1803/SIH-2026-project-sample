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

  const yearFilter = document.getElementById('yearFilter');
  if (yearFilter) {
    yearFilter.addEventListener('change', (e) => handleYearFilterChange(e.target.value));
  }
}

window.handleYearFilterChange = function(year) {
  const sub = document.querySelector('.page-header p');
  if (sub) {
    sub.textContent = `National overview · All States · ${year}`;
  }
  showToast(`Dashboard updated for ${year}`, 'info');
  renderTrendChart('all');
  renderSectorChart();
  renderSalaryChart();
};

// ── Trend Chart ──────────────────────────────────────────
function renderTrendChart(mode) {
  const ctx = document.getElementById('trendChart');
  if (!ctx) return;
  if (trendChart) trendChart.destroy();

  const d = SkillTrackData.employmentTrend;
  const datasets = mode === 'placed'
    ? [{
        label: 'Placed',
        data: d.placed,
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.35,
        pointRadius: 4,
        pointHoverRadius: 6,
        borderWidth: 2
      }]
    : [
        {
          label: 'Enrolled',
          data: d.enrolled,
          borderColor: '#f36a10',
          backgroundColor: 'rgba(243, 106, 16, 0.08)',
          fill: true,
          tension: 0.35,
          pointRadius: 3,
          pointHoverRadius: 5,
          borderWidth: 2
        },
        {
          label: 'Trained',
          data: d.trained,
          borderColor: '#f59e0b',
          backgroundColor: 'rgba(245, 158, 11, 0.06)',
          fill: true,
          tension: 0.35,
          pointRadius: 3,
          pointHoverRadius: 5,
          borderWidth: 2
        },
        {
          label: 'Placed',
          data: d.placed,
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.08)',
          fill: true,
          tension: 0.35,
          pointRadius: 3,
          pointHoverRadius: 5,
          borderWidth: 2
        }
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
        x: { grid: { display: false } },
        y: {
          ticks: { callback: v => v >= 1000 ? (v/1000).toFixed(0)+'K' : v }
        }
      }
    }
  });
}

window.switchTrend = function(mode, btn) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderTrendChart(mode);
};

// ── Status Donut ─────────────────────────────────────────
function renderStatusChart() {
  const ctx = document.getElementById('statusChart');
  if (!ctx) return;
  if (statusChart) statusChart.destroy();

  statusChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Placed', 'In Training', 'Job Seeking'],
      datasets: [{
        data: [68.9, 18.4, 12.7],
        backgroundColor: ['#10b981', '#f36a10', '#475569'],
        borderColor: 'var(--surface)',
        borderWidth: 2,
        hoverOffset: 6
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
  if (sectorChart) sectorChart.destroy();

  const d = SkillTrackData.sectorPlacement;
  sectorChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: d.labels,
      datasets: [
        {
          label: 'Enrolled',
          data: d.enrolled,
          backgroundColor: 'rgba(243, 106, 16, 0.25)',
          borderColor: '#f36a10',
          borderWidth: 1,
          borderRadius: 4
        },
        {
          label: 'Placed',
          data: d.placed,
          backgroundColor: 'rgba(16, 185, 129, 0.8)',
          borderColor: '#10b981',
          borderWidth: 1,
          borderRadius: 4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: { legend: { position: 'top' } },
      scales: {
        x: { grid: { display: false }, ticks: { maxRotation: 25 } },
        y: { ticks: { callback: v => (v/1000).toFixed(0)+'K' } }
      }
    }
  });
}

// ── Salary Uplift Chart ───────────────────────────────────
function renderSalaryChart() {
  const ctx = document.getElementById('salaryChart');
  if (!ctx) return;
  if (salaryChart) salaryChart.destroy();

  const d = SkillTrackData.salaryUplift;
  const colors = ['#f36a10', '#f59e0b', '#10b981', '#475569', '#ea580c'];
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
        tension: 0.35,
        borderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 6
      }))
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: { legend: { position: 'top' } },
      scales: {
        x: { grid: { display: false } },
        y: { ticks: { callback: v => '₹' + (v/1000).toFixed(0)+'K' } }
      }
    }
  });
}

// ── State List ────────────────────────────────────────────
function renderStateList() {
  const el = document.getElementById('stateList');
  if (!el) return;
  const states = SkillTrackData.stateData;
  el.className = 'state-list';
  el.innerHTML = states.map((s, i) => {
    const colorClass = s.placementRate >= 75 ? 'text-green' : s.placementRate >= 65 ? 'text-orange' : 'text-red';
    const barColor = s.placementRate >= 75 ? 'green' : s.placementRate >= 65 ? 'orange' : 'red';
    const barW = Math.round(s.placementRate);
    return `
      <div class="state-row" style="cursor:pointer;" onclick="showToast('${s.state}: ${s.placementRate}% placement rate across ${s.initiatives} programs (${formatNum(s.placed)} placed of ${formatNum(s.enrolled)})', 'info')">
        <span class="state-rank">${i+1}</span>
        <div style="flex:1; min-width:0;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
            <span class="state-name">${s.state}</span>
            <span class="badge badge-gray" style="font-size:0.68rem;">${s.initiatives} programs</span>
          </div>
          <div class="progress-bar-wrap">
            <div class="progress-bar-fill ${barColor}" data-width="${barW}" style="width:0%;"></div>
          </div>
        </div>
        <div class="state-rate ${colorClass}">${s.placementRate}%</div>
      </div>`;
  }).join('');
  setTimeout(animateProgressBars, 100);
}

// ── Employer List ─────────────────────────────────────────
function renderEmployerList() {
  const el = document.getElementById('employerList');
  if (!el) return;
  
  const sectorIcons = {
    'IT & Tech': '<i class="fa-solid fa-laptop-code"></i>',
    'Construction': '<i class="fa-solid fa-helmet-safety"></i>',
    'Healthcare': '<i class="fa-solid fa-hospital"></i>',
    'Retail': '<i class="fa-solid fa-cart-shopping"></i>',
    'Logistics': '<i class="fa-solid fa-truck-fast"></i>',
    'Manufacturing': '<i class="fa-solid fa-gears"></i>',
    'Green Energy': '<i class="fa-solid fa-solar-panel"></i>',
    'Automotive': '<i class="fa-solid fa-car"></i>',
    'Finance': '<i class="fa-solid fa-building-columns"></i>',
    'Agriculture': '<i class="fa-solid fa-wheat-awn"></i>'
  };

  const sectorBadges = {
    'IT & Tech': 'badge-blue',
    'Construction': 'badge-orange',
    'Healthcare': 'badge-green',
    'Retail': 'badge-purple',
    'Logistics': 'badge-blue',
    'Manufacturing': 'badge-orange',
    'Green Energy': 'badge-green',
    'Finance': 'badge-purple',
    'Agriculture': 'badge-green'
  };

  el.className = 'employer-list';
  el.innerHTML = SkillTrackData.topEmployers.map((e, i) => {
    const rankClass = i === 0 ? 'rank-1' : i === 1 ? 'rank-2' : i === 2 ? 'rank-3' : '';
    const badgeClass = sectorBadges[e.sector] || 'badge-gray';
    const icon = sectorIcons[e.sector] || '<i class="fa-solid fa-building"></i>';
    const salaryFormatted = e.avgSalary ? formatSalary(e.avgSalary) : '';

    return `
      <div class="employer-row" style="cursor:pointer;" onclick="showToast('${e.name}: ${formatNum(e.hires)} hires in ${e.sector}${salaryFormatted ? ' • Avg ' + salaryFormatted + '/mo' : ''}', 'info')">
        <div class="emp-rank ${rankClass}">${i+1}</div>
        <div class="emp-icon">${icon}</div>
        <div class="emp-info">
          <div class="emp-name">${e.name}</div>
          <div class="emp-meta">
            <span class="badge ${badgeClass}">${e.sector}</span>
            ${salaryFormatted ? `<span style="font-size:0.72rem; color:var(--text-3);">Avg ${salaryFormatted}/mo</span>` : ''}
          </div>
        </div>
        <div class="emp-stat">
          <div class="emp-count">${formatNum(e.hires)}</div>
          <div class="emp-label">hires</div>
        </div>
      </div>
    `;
  }).join('');
}

// ── Activity Feed ─────────────────────────────────────────
function renderActivityFeed() {
  const el = document.getElementById('activityFeed');
  if (!el) return;
  const activities = [
    { color: 'var(--green)',   text: 'Priya Sharma (TRN-001842) placed at Infosys BPM as Junior Data Analyst — ₹22,000/month', time: '2 hours ago' },
    { color: 'var(--accent)',  text: 'New batch of 240 trainees enrolled in PMKVY 4.0 — IT Sector batch at Lucknow TC', time: '4 hours ago' },
    { color: 'var(--orange)',  text: 'Skill gap alert: EV Technician demand surged 34% in Maharashtra — curriculum update recommended', time: '6 hours ago' },
    { color: 'var(--purple)',  text: 'ASEEM initiative crossed 86.4% placement rate — highest performing program this quarter', time: '8 hours ago' },
    { color: 'var(--green)',   text: 'L&T Construction onboarded 180 DDU-GKY trainees from Bihar batch', time: '12 hours ago' },
    { color: 'var(--red)',     text: 'Cloud Computing skill gap widened to 57 points — critical shortage in IT sector', time: '1 day ago' },
    { color: 'var(--accent)',  text: 'Karnataka achieved 80.5% placement rate — top performing state this month', time: '1 day ago' },
    { color: 'var(--orange)',  text: 'SANKALP Healthcare batch in Rajasthan completed mid-assessment with 88% avg score', time: '2 days ago' },
  ];
  el.innerHTML = activities.map(a => `
    <div class="activity-item" style="cursor:pointer;" onclick="showToast('${a.text.replace(/'/g, "\\'")}', 'info')">
      <div class="activity-dot" style="background:${a.color};"></div>
      <div style="flex:1;">
        <div class="activity-text">${a.text}</div>
        <div class="activity-time">${a.time}</div>
      </div>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', initDashboard);

