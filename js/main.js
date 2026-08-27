// ============================================================
// SkillTrack360 — Shared Utilities & Navigation
// ============================================================

// ── Animated Counter ─────────────────────────────────────
function animateCounter(el, target, duration = 2000, prefix = '', suffix = '') {
  const start = 0;
  const startTime = performance.now();
  const isDecimal = String(target).includes('.');

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4);
    const current = start + (target - start) * eased;
    el.textContent = prefix + (isDecimal ? current.toFixed(1) : Math.floor(current).toLocaleString('en-IN')) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// ── Intersection Observer for reveal animations ───────────
function setupRevealAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// ── Counter Observer ──────────────────────────────────────
function setupCounters() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.dataset.target);
        const prefix = el.dataset.prefix || '';
        const suffix = el.dataset.suffix || '';
        animateCounter(el, target, 2000, prefix, suffix);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.counter').forEach(el => observer.observe(el));
}

// ── Progress Bar Animation ────────────────────────────────
function animateProgressBars() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target.querySelector('.progress-bar-fill');
        if (fill) {
          const target = fill.dataset.width;
          setTimeout(() => { fill.style.width = target + '%'; }, 200);
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.progress-bar-wrap').forEach(el => {
    const fill = el.querySelector('.progress-bar-fill');
    if (fill) fill.style.width = '0%';
    observer.observe(el);
  });
}

// ── Chart.js Global Defaults ──────────────────────────────
function setChartDefaults() {
  if (typeof Chart === 'undefined') return;
  Chart.defaults.color = '#8ba3c1';
  Chart.defaults.borderColor = 'rgba(255,255,255,0.06)';
  Chart.defaults.font.family = "'Inter', sans-serif";
  Chart.defaults.plugins.legend.labels.usePointStyle = true;
  Chart.defaults.plugins.legend.labels.pointStyleWidth = 10;
  Chart.defaults.plugins.tooltip.backgroundColor = '#0f1f35';
  Chart.defaults.plugins.tooltip.borderColor = 'rgba(255,255,255,0.1)';
  Chart.defaults.plugins.tooltip.borderWidth = 1;
  Chart.defaults.plugins.tooltip.titleColor = '#f0f4f8';
  Chart.defaults.plugins.tooltip.bodyColor = '#8ba3c1';
  Chart.defaults.plugins.tooltip.padding = 12;
  Chart.defaults.plugins.tooltip.cornerRadius = 10;
}

// ── Active Nav Link ───────────────────────────────────────
function setActiveNav() {
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// ── Notification Toast ────────────────────────────────────
function showToast(message, type = 'info') {
  const colors = { info: '#00d4ff', success: '#00ff9f', warning: '#ffd60a', error: '#ff4757' };
  const toast = document.createElement('div');
  toast.style.cssText = `
    position:fixed; bottom:24px; right:24px; z-index:9999;
    background:#0f1f35; border:1px solid rgba(255,255,255,0.1);
    border-left: 3px solid ${colors[type]};
    padding:12px 20px; border-radius:10px;
    color:#f0f4f8; font-size:0.875rem; font-family:'Inter',sans-serif;
    box-shadow:0 8px 32px rgba(0,0,0,0.5);
    animation: slideInRight 0.3s ease;
    max-width: 320px;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = 'opacity 0.4s'; }, 3000);
  setTimeout(() => toast.remove(), 3400);
}

// ── Format numbers ────────────────────────────────────────
function formatNum(n) { return n.toLocaleString('en-IN'); }
function formatSalary(n) { return '₹' + (n >= 100000 ? (n/100000).toFixed(1)+'L' : n >= 1000 ? (n/1000).toFixed(1)+'K' : n); }

// ── Severity Color ────────────────────────────────────────
function severityClass(s) {
  return { critical: 'red', high: 'orange', medium: 'blue', low: 'green' }[s] || 'blue';
}

// ── Init ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  setActiveNav();
  setupRevealAnimations();
  setupCounters();
  animateProgressBars();
  setChartDefaults();
});
