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

// ── Auth & User Session Management ─────────────────────────
const DEMO_USERS = {
  govt: {
    name: 'Dr. Rajesh Kumar',
    role: 'Govt Official',
    badge: 'MSDE Admin',
    email: 'rajesh.kumar@msde.gov.in',
    org: 'Ministry of Skill Development & Entrepreneurship',
    avatar: 'RK'
  },
  partner: {
    name: 'Priya Sharma',
    role: 'Training Partner',
    badge: 'NSDC Center',
    email: 'priya.s@nsdc-partner.org',
    org: 'NSDC Skill Academy Delhi',
    avatar: 'PS'
  },
  employer: {
    name: 'Amit Verma',
    role: 'Employer / Recruiter',
    badge: 'Infosys Talent',
    email: 'amit.v@infosys.com',
    org: 'Infosys BPM Workforce',
    avatar: 'AV'
  },
  trainee: {
    name: 'Rahul Meena',
    role: 'Trainee / Candidate',
    badge: 'PMKVY Scholar',
    email: 'rahul.meena@skilltrack.in',
    org: 'Industrial Training Institute (ITI)',
    avatar: 'RM'
  }
};

let currentAuthRole = 'govt';
let currentAuthTab = 'login';

function getStoredUser() {
  try {
    const data = localStorage.getItem('st360_user');
    return data ? JSON.parse(data) : null;
  } catch (e) {
    return null;
  }
}

function setStoredUser(user) {
  if (user) {
    localStorage.setItem('st360_user', JSON.stringify(user));
  } else {
    localStorage.removeItem('st360_user');
  }
  updateNavAuth();
}

function updateNavAuth() {
  const user = getStoredUser();
  const authAreas = document.querySelectorAll('.nav-auth-area');

  authAreas.forEach(area => {
    if (user) {
      area.innerHTML = `
        <div class="nav-user-pill" title="Signed in as ${user.name} (${user.role})" onclick="showToast('Active Session: ${user.name} • ${user.org || user.role}', 'info')">
          <div class="nav-user-avatar">${user.avatar || 'U'}</div>
          <div class="nav-user-meta">
            <span class="nav-user-name">${user.name}</span>
            <span class="nav-user-role">${user.badge || user.role}</span>
          </div>
        </div>
        <button class="nav-logout-btn" onclick="handleLogout()" title="Log out">
          <i class="fa-solid fa-arrow-right-from-bracket"></i>
        </button>
      `;
    } else {
      area.innerHTML = `
        <button class="btn btn-ghost btn-sm" onclick="openAuthModal('login')">
          <i class="fa-solid fa-right-to-bracket" style="margin-right:4px;"></i> Login
        </button>
        <button class="btn btn-primary btn-sm" onclick="openAuthModal('signup')">
          <i class="fa-solid fa-user-plus" style="margin-right:4px;"></i> Sign Up
        </button>
      `;
    }
  });
}

function handleLogout() {
  setStoredUser(null);
  showToast('Logged out successfully', 'info');
}

function renderAuthModal() {
  if (document.getElementById('authModalBackdrop')) return;

  const modalHtml = `
    <div id="authModalBackdrop" class="auth-modal-backdrop" onclick="if(event.target === this) closeAuthModal()">
      <div class="auth-modal-card">
        <button class="auth-modal-close" onclick="closeAuthModal()" title="Close"><i class="fa-solid fa-xmark"></i></button>

        <div class="auth-header">
          <div class="auth-brand-badge">
            <img src="images/logo-icon.png" alt="SkillTrack360 Logo" />
            <span style="font-weight:700;font-size:1.15rem;">SkillTrack<span class="text-accent">360</span></span>
          </div>
          <h3 class="auth-title" id="authModalTitle">Welcome to SkillTrack360</h3>
          <p class="auth-subtitle" id="authModalSubtitle">Access national skill analytics and outcome intelligence</p>
        </div>

        <div class="auth-tabs">
          <button type="button" class="auth-tab-btn active" id="tabBtnLogin" onclick="switchAuthTab('login')">
            <i class="fa-solid fa-right-to-bracket" style="margin-right:4px;"></i> Sign In
          </button>
          <button type="button" class="auth-tab-btn" id="tabBtnSignup" onclick="switchAuthTab('signup')">
            <i class="fa-solid fa-user-plus" style="margin-right:4px;"></i> Create Account
          </button>
        </div>

        <!-- Role Selector -->
        <div>
          <label class="auth-role-label">Select Stakeholder Role</label>
          <div class="auth-roles-grid">
            <div class="auth-role-chip active" data-role="govt" onclick="selectAuthRole('govt')">
              <i class="fa-solid fa-landmark"></i>
              <div class="auth-role-name">Govt Official<br/><span style="font-size:0.65rem;color:var(--text-3);font-weight:400;">Ministry/State</span></div>
            </div>
            <div class="auth-role-chip" data-role="partner" onclick="selectAuthRole('partner')">
              <i class="fa-solid fa-school"></i>
              <div class="auth-role-name">Training Center<br/><span style="font-size:0.65rem;color:var(--text-3);font-weight:400;">NSDC/Partner</span></div>
            </div>
            <div class="auth-role-chip" data-role="employer" onclick="selectAuthRole('employer')">
              <i class="fa-solid fa-building"></i>
              <div class="auth-role-name">Employer<br/><span style="font-size:0.65rem;color:var(--text-3);font-weight:400;">Industry/HR</span></div>
            </div>
            <div class="auth-role-chip" data-role="trainee" onclick="selectAuthRole('trainee')">
              <i class="fa-solid fa-user-graduate"></i>
              <div class="auth-role-name">Candidate<br/><span style="font-size:0.65rem;color:var(--text-3);font-weight:400;">Trainee/Alumni</span></div>
            </div>
          </div>
        </div>

        <!-- Login Form -->
        <form id="authLoginForm" class="auth-form" onsubmit="handleLoginSubmit(event)">
          <div class="auth-field">
            <label id="loginUserLabel">Official Email / ID</label>
            <div class="auth-input-wrap">
              <i class="fa-solid fa-envelope auth-input-icon"></i>
              <input type="text" id="loginEmail" class="auth-input" placeholder="e.g. rajesh.kumar@msde.gov.in" required />
            </div>
          </div>

          <div class="auth-field">
            <label>Password</label>
            <div class="auth-input-wrap">
              <i class="fa-solid fa-lock auth-input-icon"></i>
              <input type="password" id="loginPassword" class="auth-input" placeholder="••••••••" required />
              <button type="button" class="auth-pwd-toggle" onclick="togglePasswordVisibility('loginPassword', this)">
                <i class="fa-solid fa-eye"></i>
              </button>
            </div>
          </div>

          <div class="auth-extras-row">
            <label class="auth-checkbox-label">
              <input type="checkbox" checked /> Remember session
            </label>
            <a class="auth-link" onclick="showToast('Password reset link sent to registered email.', 'info')">Forgot password?</a>
          </div>

          <button type="submit" class="auth-submit-btn" id="loginSubmitBtn">
            <i class="fa-solid fa-arrow-right-to-bracket"></i> Sign In to Portal
          </button>
        </form>

        <!-- Signup Form -->
        <form id="authSignupForm" class="auth-form" style="display:none;" onsubmit="handleSignupSubmit(event)">
          <div class="auth-field">
            <label>Full Name</label>
            <div class="auth-input-wrap">
              <i class="fa-solid fa-user auth-input-icon"></i>
              <input type="text" id="signupName" class="auth-input" placeholder="Dr. Rajesh Kumar" required />
            </div>
          </div>

          <div class="auth-field">
            <label id="signupOrgLabel">Organization / Ministry / Department</label>
            <div class="auth-input-wrap">
              <i class="fa-solid fa-building-columns auth-input-icon"></i>
              <input type="text" id="signupOrg" class="auth-input" placeholder="e.g. MSDE / NSDC / Tata Motors" required />
            </div>
          </div>

          <div class="auth-field">
            <label>Official Email</label>
            <div class="auth-input-wrap">
              <i class="fa-solid fa-envelope auth-input-icon"></i>
              <input type="email" id="signupEmail" class="auth-input" placeholder="name@domain.gov.in" required />
            </div>
          </div>

          <div class="auth-field">
            <label>Password</label>
            <div class="auth-input-wrap">
              <i class="fa-solid fa-lock auth-input-icon"></i>
              <input type="password" id="signupPassword" class="auth-input" placeholder="Create strong password" required />
              <button type="button" class="auth-pwd-toggle" onclick="togglePasswordVisibility('signupPassword', this)">
                <i class="fa-solid fa-eye"></i>
              </button>
            </div>
          </div>

          <div class="auth-extras-row">
            <label class="auth-checkbox-label">
              <input type="checkbox" required checked /> I agree to Govt data governance & privacy terms
            </label>
          </div>

          <button type="submit" class="auth-submit-btn" id="signupSubmitBtn">
            <i class="fa-solid fa-user-check"></i> Register Account
          </button>
        </form>

        <!-- Divider & SSO -->
        <div class="auth-divider">or secure sign in with</div>

        <div class="auth-sso-grid">
          <button type="button" class="auth-sso-btn" onclick="quickSSOLogin('MeriPehchaan (Jan Parichay)')">
            <i class="fa-solid fa-shield-halved" style="color:var(--accent);"></i> MeriPehchaan
          </button>
          <button type="button" class="auth-sso-btn" onclick="quickSSOLogin('DigiLocker')">
            <i class="fa-solid fa-id-card" style="color:#0284c7;"></i> DigiLocker
          </button>
        </div>

        <!-- Quick Demo Login Presets -->
        <div class="auth-demo-presets">
          <div class="auth-demo-title">
            <i class="fa-solid fa-bolt" style="color:var(--accent);"></i> Quick Demo Fast-Login:
          </div>
          <div class="auth-demo-chips">
            <button type="button" class="auth-demo-chip" onclick="quickDemoLogin('govt')">🏛️ Ministry Official</button>
            <button type="button" class="auth-demo-chip" onclick="quickDemoLogin('partner')">🎓 NSDC Partner</button>
            <button type="button" class="auth-demo-chip" onclick="quickDemoLogin('employer')">🏢 Employer (HR)</button>
            <button type="button" class="auth-demo-chip" onclick="quickDemoLogin('trainee')">👨‍🎓 Trainee</button>
          </div>
        </div>

      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
}

function openAuthModal(tab = 'login', role = 'govt') {
  renderAuthModal();
  selectAuthRole(role);
  switchAuthTab(tab);

  const backdrop = document.getElementById('authModalBackdrop');
  if (backdrop) {
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeAuthModal() {
  const backdrop = document.getElementById('authModalBackdrop');
  if (backdrop) {
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function switchAuthTab(tab) {
  currentAuthTab = tab;
  const loginBtn = document.getElementById('tabBtnLogin');
  const signupBtn = document.getElementById('tabBtnSignup');
  const loginForm = document.getElementById('authLoginForm');
  const signupForm = document.getElementById('authSignupForm');
  const title = document.getElementById('authModalTitle');
  const subtitle = document.getElementById('authModalSubtitle');

  if (tab === 'login') {
    loginBtn?.classList.add('active');
    signupBtn?.classList.remove('active');
    if (loginForm) loginForm.style.display = 'flex';
    if (signupForm) signupForm.style.display = 'none';
    if (title) title.textContent = 'Welcome to SkillTrack360';
    if (subtitle) subtitle.textContent = 'Access national skill analytics and outcome intelligence';
  } else {
    signupBtn?.classList.add('active');
    loginBtn?.classList.remove('active');
    if (loginForm) loginForm.style.display = 'none';
    if (signupForm) signupForm.style.display = 'flex';
    if (title) title.textContent = 'Create Stakeholder Account';
    if (subtitle) subtitle.textContent = 'Join the unified workforce tracking ecosystem';
  }
}

function selectAuthRole(role) {
  currentAuthRole = role;
  document.querySelectorAll('.auth-role-chip').forEach(chip => {
    chip.classList.toggle('active', chip.dataset.role === role);
  });

  const preset = DEMO_USERS[role];
  const emailInput = document.getElementById('loginEmail');
  const passInput = document.getElementById('loginPassword');
  const orgLabel = document.getElementById('signupOrgLabel');

  if (emailInput && preset) emailInput.value = preset.email;
  if (passInput) passInput.value = 'DemoPass@360';

  if (orgLabel) {
    if (role === 'govt') orgLabel.textContent = 'Ministry / Govt Department';
    else if (role === 'partner') orgLabel.textContent = 'Training Institute / NSDC Center Name';
    else if (role === 'employer') orgLabel.textContent = 'Company / Industry Organization';
    else orgLabel.textContent = 'Current Institute / ITI / University';
  }
}

function togglePasswordVisibility(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;
  if (input.type === 'password') {
    input.type = 'text';
    btn.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
  } else {
    input.type = 'password';
    btn.innerHTML = '<i class="fa-solid fa-eye"></i>';
  }
}

function handleLoginSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('loginSubmitBtn');
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Authenticating…';
  }

  setTimeout(() => {
    const preset = DEMO_USERS[currentAuthRole] || DEMO_USERS.govt;
    const email = document.getElementById('loginEmail')?.value || preset.email;
    const user = {
      ...preset,
      email: email,
    };
    setStoredUser(user);
    closeAuthModal();
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = '<i class="fa-solid fa-arrow-right-to-bracket"></i> Sign In to Portal';
    }
    showToast(`Welcome back, ${user.name}! (${user.role})`, 'success');
  }, 400);
}

function handleSignupSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('signupName')?.value || 'New Stakeholder';
  const org = document.getElementById('signupOrg')?.value || 'National Partner';
  const email = document.getElementById('signupEmail')?.value || 'user@domain.com';

  const roleNameMap = {
    govt: 'Govt Official',
    partner: 'Training Partner',
    employer: 'Employer / HR',
    trainee: 'Candidate'
  };

  const initials = name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();

  const user = {
    name: name,
    role: roleNameMap[currentAuthRole] || 'Stakeholder',
    badge: currentAuthRole === 'govt' ? 'Govt Verified' : 'Partner Verified',
    email: email,
    org: org,
    avatar: initials || 'U'
  };

  setStoredUser(user);
  closeAuthModal();
  showToast(`Account created! Welcome, ${user.name}.`, 'success');
}

function quickDemoLogin(roleKey) {
  const preset = DEMO_USERS[roleKey] || DEMO_USERS.govt;
  setStoredUser(preset);
  closeAuthModal();
  showToast(`Demo Logged In as ${preset.name} (${preset.role})`, 'success');
}

function quickSSOLogin(provider) {
  const preset = DEMO_USERS[currentAuthRole] || DEMO_USERS.govt;
  setStoredUser({
    ...preset,
    badge: `${provider} Verified`
  });
  closeAuthModal();
  showToast(`Authenticated via ${provider} as ${preset.name}!`, 'success');
}

// ── Init ───────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  setActiveNav();
  setupRevealAnimations();
  setupCounters();
  animateProgressBars();
  setChartDefaults();
  renderAuthModal();
  updateNavAuth();

  // Re-apply chart defaults when theme changes (for pages with charts)
  document.getElementById('themeToggle')?.addEventListener('click', () => {
    toggleTheme();
    setTimeout(setChartDefaults, 50);
  });

  // Global ESC key listener for modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAuthModal();
  });
});

