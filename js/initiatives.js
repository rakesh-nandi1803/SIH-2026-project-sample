// ============================================================
// SkillTrack360 — Initiatives Tracker
// ============================================================

function initInitiatives() {
  renderInitiativeCards(SkillTrackData.initiatives);
  renderPlacementCompChart();
  renderFunnelChart();
  renderCompTable(SkillTrackData.initiatives);
}

// ── Initiative Cards ──────────────────────────────────────
function renderInitiativeCards(initiatives) {
  const el = document.getElementById('initiativeCards');
  if (!el) return;

  const statusColors = { active: 'green', completed: 'blue' };

  el.innerHTML = initiatives.map(init => {
    const pct = init.placementRate;
    const barColor = pct >= 80 ? 'var(--accent-3)' : pct >= 70 ? 'var(--accent-5)' : '#00d4ff';
    const trendIcon = init.trend === 'up' ? '▲' : init.trend === 'down' ? '▼' : '●';
    const trendClass = init.trend === 'up' ? 'trend-up' : init.trend === 'down' ? 'trend-down' : '';

    return `
    <div class="init-card" onclick="showToast('${init.id}: ${pct}% placement rate','success')">
      <div class="init-card-header">
        <div style="flex:1;">
          <div class="init-name">${init.name}</div>
          <div class="init-ministry">Ministry: ${init.ministry}</div>
        </div>
        <div style="text-align:right;">
          <div class="init-id">${init.id}</div>
          <div class="badge badge-${statusColors[init.status]}" style="margin-top:4px;">${init.status.toUpperCase()}</div>
        </div>
      </div>

      <div class="init-stats">
        <div class="init-stat">
          <div class="init-stat-val" style="color:var(--accent-1);">${formatNum(init.enrolled)}</div>
          <div class="init-stat-label">Enrolled</div>
        </div>
        <div class="init-stat">
          <div class="init-stat-val" style="color:var(--accent-5);">${formatNum(init.completed)}</div>
          <div class="init-stat-label">Completed</div>
        </div>
        <div class="init-stat">
          <div class="init-stat-val" style="color:var(--accent-3);">${formatNum(init.placed)}</div>
          <div class="init-stat-label">Placed</div>
        </div>
      </div>

      <div class="init-placement-bar">
        <div class="init-placement-top">
          <span style="font-size:0.78rem;color:var(--text-secondary);">Placement Rate</span>
          <span style="font-weight:700;color:${barColor};">${pct}% <span class="${trendClass}">${trendIcon}</span></span>
        </div>
        <div class="progress-bar-wrap">
          <div class="progress-bar-fill ${pct >= 80 ? 'green' : pct >= 70 ? 'orange' : ''}"
               data-width="${pct}" style="width:0%;"></div>
        </div>
      </div>

      <div class="init-footer">
        <div style="display:flex;gap:6px;flex-wrap:wrap;">
          ${init.sectors.map(s => `<span class="skill-tag" style="font-size:0.68rem;padding:2px 8px;">${s}</span>`).join('')}
        </div>
        <div style="text-align:right;">
          <div style="font-size:0.8rem;color:var(--accent-3);font-weight:700;">₹${formatNum(init.avgSalary)}/mo</div>
          <div style="font-size:0.68rem;color:var(--text-muted);">Avg. Salary · ${init.statesActive} States</div>
        </div>
      </div>
    </div>`;
  }).join('');

  setTimeout(animateProgressBars, 100);
}

window.filterByStatus = function(status) {
  const filtered = status === 'all'
    ? SkillTrackData.initiatives
    : SkillTrackData.initiatives.filter(i => i.status === status);
  renderInitiativeCards(filtered);
  renderCompTable(filtered);
};

// ── Placement Comparison Chart ────────────────────────────
function renderPlacementCompChart() {
  const ctx = document.getElementById('placementCompChart');
  if (!ctx) return;
  const inits = SkillTrackData.initiatives;

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: inits.map(i => i.id),
      datasets: [{
        label: 'Placement Rate (%)',
        data: inits.map(i => i.placementRate),
        backgroundColor: inits.map(i => i.placementRate >= 80 ? 'rgba(0,255,159,0.6)' : i.placementRate >= 70 ? 'rgba(255,214,10,0.6)' : 'rgba(0,212,255,0.6)'),
        borderColor:      inits.map(i => i.placementRate >= 80 ? '#00ff9f' : i.placementRate >= 70 ? '#ffd60a' : '#00d4ff'),
        borderWidth: 1.5,
        borderRadius: 6,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: c => ` Placement: ${c.parsed.y}%` } }
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: '#8ba3c1', font: { size: 11 } } },
        y: {
          min: 50, max: 100,
          grid: { color: 'rgba(255,255,255,0.04)' },
          ticks: { color: '#8ba3c1', callback: v => v + '%' }
        }
      }
    }
  });
}

// ── Funnel Chart ──────────────────────────────────────────
function renderFunnelChart() {
  const ctx = document.getElementById('funnelChart');
  if (!ctx) return;
  const inits = SkillTrackData.initiatives;

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: inits.map(i => i.id),
      datasets: [
        {
          label: 'Enrolled',
          data: inits.map(i => i.enrolled),
          backgroundColor: 'rgba(0,212,255,0.25)',
          borderColor: 'rgba(0,212,255,0.6)',
          borderWidth: 1, borderRadius: 4,
        },
        {
          label: 'Completed',
          data: inits.map(i => i.completed),
          backgroundColor: 'rgba(255,214,10,0.3)',
          borderColor: 'rgba(255,214,10,0.7)',
          borderWidth: 1, borderRadius: 4,
        },
        {
          label: 'Placed',
          data: inits.map(i => i.placed),
          backgroundColor: 'rgba(0,255,159,0.4)',
          borderColor: 'rgba(0,255,159,0.8)',
          borderWidth: 1, borderRadius: 4,
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
          ticks: { color: '#8ba3c1', callback: v => (v/1000).toFixed(0)+'K' }
        }
      }
    }
  });
}

// ── Comparison Table ──────────────────────────────────────
function renderCompTable(initiatives) {
  const table = document.getElementById('compTable');
  if (!table) return;

  table.innerHTML = `
    <thead>
      <tr>
        <th>Initiative</th>
        <th>Ministry</th>
        <th>Enrolled</th>
        <th>Completed</th>
        <th>Placed</th>
        <th>Placement Rate</th>
        <th>Avg. Salary</th>
        <th>States</th>
        <th>Status</th>
        <th>Budget (Cr)</th>
      </tr>
    </thead>
    <tbody>
      ${initiatives.map(i => {
        const pctColor = i.placementRate >= 80 ? 'var(--accent-3)' : i.placementRate >= 70 ? 'var(--accent-5)' : '#00d4ff';
        return `
        <tr>
          <td>
            <div style="font-weight:600;">${i.id}</div>
            <div style="font-size:0.72rem;color:var(--text-muted);">${i.name.substring(0,30)}…</div>
          </td>
          <td><span class="badge badge-purple">${i.ministry}</span></td>
          <td style="color:var(--accent-1);font-weight:600;">${formatNum(i.enrolled)}</td>
          <td style="color:var(--accent-5);font-weight:600;">${formatNum(i.completed)}</td>
          <td style="color:var(--accent-3);font-weight:600;">${formatNum(i.placed)}</td>
          <td><span style="color:${pctColor};font-weight:700;">${i.placementRate}%</span></td>
          <td>₹${formatNum(i.avgSalary)}</td>
          <td>${i.statesActive}</td>
          <td><span class="badge badge-${i.status === 'active' ? 'green' : 'blue'}">${i.status}</span></td>
          <td style="color:var(--accent-5);">₹${i.budget}Cr</td>
        </tr>`;
      }).join('')}
    </tbody>`;
}

document.addEventListener('DOMContentLoaded', initInitiatives);
