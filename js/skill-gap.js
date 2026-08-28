// ============================================================
// SkillTrack360 — Skill Gap Analyzer
// ============================================================

let allGaps = [];
let demandChart, radarChart;

function initSkillGap() {
  allGaps = [...SkillTrackData.skillGaps];
  renderGapCards(allGaps);
  renderDemandSupplyChart(allGaps.slice(0, 10));
  renderGapRadarChart();
}

// ── Gap Cards ────────────────────────────────────────────
function renderGapCards(gaps) {
  const el = document.getElementById('gapCards');
  if (!el) return;
  document.getElementById('gapCount').textContent = gaps.length;

  if (gaps.length === 0) {
    el.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:var(--space-3xl);color:var(--text-muted);">No skill gaps match your filters.</div>`;
    return;
  }

  el.innerHTML = gaps.map(g => {
    const demandW = g.demand;
    const supplyW = g.supply;
    return `
    <div class="gap-card ${g.severity}" onclick="showToast('${g.skill}: ${g.gap}pt gap in ${g.sector}','${g.severity === 'critical' ? 'error' : 'info'}')">
      <div class="gap-card-top">
        <div>
          <div class="gap-skill-name">${g.skill}</div>
          <div class="gap-sector">${g.sector}</div>
        </div>
        <div>
          <div class="gap-number ${g.severity}">${g.gap}</div>
          <div style="font-size:0.65rem;color:var(--text-muted);text-align:right;">gap pts</div>
        </div>
      </div>
      <div class="gap-bar-row">
        <div class="gap-bar-label">Demand</div>
        <div class="gap-bar-wrap">
          <div class="gap-bar-fill" style="width:${demandW}%; background:linear-gradient(90deg,#f36a10,#ea580c);"></div>
        </div>
        <div style="font-size:0.72rem;color:#f36a10;font-weight:700;width:28px;text-align:right;">${g.demand}%</div>
      </div>
      <div class="gap-bar-row" style="margin-top:6px;">
        <div class="gap-bar-label">Supply</div>
        <div class="gap-bar-wrap">
          <div class="gap-bar-fill" style="width:${supplyW}%; background:linear-gradient(90deg,#10b981,#059669);"></div>
        </div>
        <div style="font-size:0.72rem;color:#10b981;font-weight:700;width:28px;text-align:right;">${g.supply}%</div>
      </div>
      <div style="margin-top:var(--space-md);display:flex;justify-content:space-between;align-items:center;">
        <span class="badge badge-${severityClass(g.severity)}">${g.severity.toUpperCase()}</span>
        <span style="font-size:0.72rem;color:var(--text-muted);">${g.sector}</span>
      </div>
    </div>`;
  }).join('');
}

// ── Filter ────────────────────────────────────────────────
window.filterGaps = function() {
  const sector   = document.getElementById('sectorFilter').value;
  const severity = document.getElementById('severityFilter').value;
  const search   = document.getElementById('gapSearch').value.toLowerCase();

  let filtered = SkillTrackData.skillGaps.filter(g => {
    const matchSector   = sector === 'all'   || g.sector === sector;
    const matchSeverity = severity === 'all' || g.severity === severity;
    const matchSearch   = !search || g.skill.toLowerCase().includes(search) || g.sector.toLowerCase().includes(search);
    return matchSector && matchSeverity && matchSearch;
  });

  renderGapCards(filtered);
  renderDemandSupplyChart(filtered.slice(0, 10));
};

// ── Sort ──────────────────────────────────────────────────
window.sortGaps = function(key, btn) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
  let sorted = [...allGaps].sort((a, b) =>
    key === 'severity' ? severityOrder[a.severity] - severityOrder[b.severity] : b[key] - a[key]
  );
  renderGapCards(sorted);
  renderDemandSupplyChart(sorted.slice(0, 10));
};

// ── Demand vs Supply Chart ────────────────────────────────
function renderDemandSupplyChart(gaps) {
  const ctx = document.getElementById('demandSupplyChart');
  if (!ctx) return;
  if (demandChart) demandChart.destroy();

  demandChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: gaps.map(g => g.skill.length > 18 ? g.skill.substring(0, 18) + '…' : g.skill),
      datasets: [
        {
          label: 'Market Demand',
          data: gaps.map(g => g.demand),
          backgroundColor: 'rgba(243,106,16,0.6)',
          borderColor: '#f36a10',
          borderWidth: 1,
          borderRadius: 4,
        },
        {
          label: 'Workforce Supply',
          data: gaps.map(g => g.supply),
          backgroundColor: 'rgba(16,185,129,0.4)',
          borderColor: '#10b981',
          borderWidth: 1,
          borderRadius: 4,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { position: 'top' },
        tooltip: {
          callbacks: {
            afterBody: (items) => {
              const idx = items[0]?.dataIndex;
              if (idx !== undefined && gaps[idx]) {
                return [`Gap: ${gaps[idx].gap} points — ${gaps[idx].severity.toUpperCase()}`];
              }
              return [];
            }
          }
        }
      },
      scales: {
        x: {
          max: 100,
          grid: { color: 'rgba(255,255,255,0.04)' },
          ticks: { color: '#8ba3c1', callback: v => v + '%' }
        },
        y: { grid: { display: false }, ticks: { color: '#8ba3c1', font: { size: 11 } } }
      }
    }
  });
}

// ── Radar Chart ───────────────────────────────────────────
function renderGapRadarChart() {
  const ctx = document.getElementById('gapRadarChart');
  if (!ctx) return;

  const topCritical = SkillTrackData.skillGaps.filter(g => g.severity === 'critical').slice(0, 6);

  radarChart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: topCritical.map(g => g.skill.length > 14 ? g.skill.substring(0,14)+'…' : g.skill),
      datasets: [
        {
          label: 'Demand',
          data: topCritical.map(g => g.demand),
          backgroundColor: 'rgba(243,106,16,0.15)',
          borderColor: '#f36a10',
          borderWidth: 2,
          pointBackgroundColor: '#f36a10',
          pointRadius: 4,
        },
        {
          label: 'Supply',
          data: topCritical.map(g => g.supply),
          backgroundColor: 'rgba(16,185,129,0.15)',
          borderColor: '#10b981',
          borderWidth: 2,
          pointBackgroundColor: '#10b981',
          pointRadius: 4,
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: 'top' } },
      scales: {
        r: {
          max: 100, min: 0,
          ticks: { color: '#8ba3c1', backdropColor: 'transparent', stepSize: 25 },
          grid:  { color: 'rgba(255,255,255,0.06)' },
          angleLines: { color: 'rgba(255,255,255,0.06)' },
          pointLabels: { color: '#8ba3c1', font: { size: 10 } }
        }
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', initSkillGap);
