// ============================================================
// SkillTrack360 — Shared Utilities
// ============================================================

// ── Theme Toggle ──────────────────────────────────────────
function initTheme() {
  const saved = localStorage.getItem('st360-theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  updateThemeIcon(saved);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('st360-theme', next);
  updateThemeIcon(next);
}

function updateThemeIcon(theme) {
  const btn = document.getElementById('themeToggle');
  if (btn) btn.innerHTML = theme === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
}

// ── Animated Counter ──────────────────────────────────────
function animateCounter(el, target, duration = 1800, prefix = '', suffix = '') {
  const isDecimal = String(target).includes('.');
  const startTime = performance.now();

  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = target * eased;
    el.textContent = prefix + (isDecimal ? current.toFixed(1) : Math.floor(current).toLocaleString('en-IN')) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// ── Reveal on Scroll ──────────────────────────────────────
function setupRevealAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(14px)';
    el.style.transition = `opacity 0.35s ease ${i * 0.04}s, transform 0.35s ease ${i * 0.04}s`;
    observer.observe(el);
  });
}

// ── Counter Observer ───────────────────────────────────────
function setupCounters() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.dataset.target);
        const prefix = el.dataset.prefix || '';
        const suffix = el.dataset.suffix || '';
        animateCounter(el, target, 1800, prefix, suffix);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.counter').forEach(el => observer.observe(el));
}

// ── Progress Bar Animation ─────────────────────────────────
function animateProgressBars() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target.querySelector('.progress-bar-fill');
        if (fill) {
          const target = fill.dataset.width;
          setTimeout(() => { fill.style.width = target + '%'; }, 150);
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

// ── Chart.js Global Defaults ───────────────────────────────
function setChartDefaults() {
  if (typeof Chart === 'undefined') return;
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const textColor = isDark ? '#94a3b8' : '#475569';
  const borderColor = isDark ? '#242d3c' : '#e2e8f0';
  const tooltipBg = isDark ? '#121620' : '#ffffff';
  const tooltipBorder = isDark ? '#323c4e' : '#fed7aa';
  const tooltipText = isDark ? '#f8fafc' : '#111827';

  Chart.defaults.color = textColor;
  Chart.defaults.borderColor = borderColor;
  Chart.defaults.font.family = "system-ui, -apple-system, 'Segoe UI', sans-serif";
  Chart.defaults.font.size = 12;
  Chart.defaults.plugins.legend.labels.usePointStyle = true;
  Chart.defaults.plugins.legend.labels.pointStyleWidth = 8;
  Chart.defaults.plugins.tooltip.backgroundColor = tooltipBg;
  Chart.defaults.plugins.tooltip.borderColor = tooltipBorder;
  Chart.defaults.plugins.tooltip.borderWidth = 1;
  Chart.defaults.plugins.tooltip.titleColor = tooltipText;
  Chart.defaults.plugins.tooltip.bodyColor = textColor;
  Chart.defaults.plugins.tooltip.padding = 10;
  Chart.defaults.plugins.tooltip.cornerRadius = 8;
}

// ── Active Nav Link ────────────────────────────────────────
function setActiveNav() {
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// ── Toast Notification ─────────────────────────────────────
function showToast(message, type = 'info') {
  const colorMap = {
    info:    { bg: 'var(--accent-light)',  border: 'var(--accent)',  text: 'var(--accent)' },
    success: { bg: 'var(--green-light)',   border: 'var(--green)',   text: 'var(--green)' },
    warning: { bg: 'var(--orange-light)',  border: 'var(--orange)',  text: 'var(--orange)' },
    error:   { bg: 'var(--red-light)',     border: 'var(--red)',     text: 'var(--red)' },
  };
  const c = colorMap[type] || colorMap.info;
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed; bottom: 20px; right: 20px; z-index: 9999;
    background: var(--surface);
    border: 1px solid var(--border);
    border-left: 3px solid ${c.border};
    padding: 12px 16px;
    border-radius: 10px;
    color: var(--text-1);
    font-size: 0.875rem;
    font-family: system-ui, sans-serif;
    box-shadow: var(--shadow-lg);
    max-width: 300px;
    opacity: 0;
    transform: translateX(20px);
    transition: all 0.25s ease;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(0)';
  });
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(20px)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ── Format Helpers ─────────────────────────────────────────
function formatNum(n) { return n.toLocaleString('en-IN'); }
function formatSalary(n) {
  return '₹' + (n >= 100000 ? (n/100000).toFixed(1) + 'L' : n >= 1000 ? (n/1000).toFixed(1) + 'K' : n);
}
function severityClass(s) {
  return { critical: 'red', high: 'orange', medium: 'blue', low: 'green' }[s] || 'blue';
}

// ── Init ───────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  setActiveNav();
  setupRevealAnimations();
  setupCounters();
  animateProgressBars();
  setChartDefaults();

  // Re-apply chart defaults when theme changes (for pages with charts)
  document.getElementById('themeToggle')?.addEventListener('click', () => {
    toggleTheme();
    setTimeout(setChartDefaults, 50);
  });
});
