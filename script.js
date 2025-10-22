// AttachLink final script.js
console.log("AttachLink site loaded.");

// ===== Hamburger toggle =====
function toggleMenu() {
  const nav = document.getElementById("navbar");
  const overlay = document.getElementById('overlay');
      navbar.classList.toggle('active');
      overlay.classList.toggle('active');
  if (!nav) return;
  nav.classList.toggle("show");
}
    // Close menu
    function closeMenu() {
      const navbar = document.getElementById('navbar');
      const overlay = document.getElementById('overlay');
      navbar.classList.remove('active');
      overlay.classList.remove('active');
    }
    
    // Open role selection modal
    function openRoleModal() {
      document.getElementById('roleModal').style.display = 'flex';
      closeMenu();
    }
    
    // Open specific modal
    function openModal(modalId) {
      document.getElementById(modalId).style.display = 'flex';
      document.getElementById('roleModal').style.display = 'none';
    }
    
    // Close modal
    function closeModal(modalId) {
      document.getElementById(modalId).style.display = 'none';
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
      if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
      }
    });
    
    
    // Handle form submissions
    document.getElementById('studentForm').addEventListener('submit', function(e) {
      e.preventDefault();
      // Show success message
      document.getElementById('studentSuccess').style.display = 'block';
      // Reset form after 2 seconds
      setTimeout(() => {
        this.reset();
        document.getElementById('studentSuccess').style.display = 'none';
        closeModal('studentModal');
      }, 2000);
    });
    
    document.getElementById('companyForm').addEventListener('submit', function(e) {
      e.preventDefault();
      // Show success message
      document.getElementById('companySuccess').style.display = 'block';
      // Reset form after 2 seconds
      setTimeout(() => {
        this.reset();
        document.getElementById('studentSuccess').style.display = 'none';
        closeModal('studentModal');
      }, 2000);
    });
    const companyForm = document.getElementById("companyProfileForm");
  if (companyForm) {
    companyForm.addEventListener("submit", e => {
      e.preventDefault();
      const fd = new FormData(companyForm);
      const company = {
        companyName: fd.get("companyName"),
        email: fd.get("email"),
        phone: fd.get("phone"),
        skills: fd.get("skills"),
        duration: fd.get("duration"),
        location: fd.get("location")
      };
      localStorage.setItem("companyProfile", JSON.stringify(company));
      showToast("✅ Company profile saved!");
      window.location.href = "company-dashboard.html";
    });
  }
    document.getElementById('companyForm').addEventListener('submit', function(e) {
      e.preventDefault();
      // Show success message
      document.getElementById('companySuccess').style.display = 'block';
      // Reset form after 2 seconds
      setTimeout(() => {
        this.reset();
        document.getElementById('companySuccess').style.display = 'none';
        closeModal('companyModal');
      }, 2000);
    });
    
    // Close menu when resizing to desktop
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768) {
        closeMenu();
      }
    });

// ===== Dark/Light mode toggle =====
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

// ===== Utility: escape HTML =====
function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ===== Toast notification =====
function showToast(msg, type = "") {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// ===== Skill matching helper =====
function skillsMatch(oppSkill, studentSkill) {
  if (!oppSkill || !studentSkill) return false;
  const a = oppSkill.toLowerCase();
  const b = studentSkill.toLowerCase();
  if (a.includes(b) || b.includes(a)) return true;

  const aTokens = a.split(/[, ]+/).map(t => t.trim()).filter(Boolean);
  const bTokens = b.split(/[, ]+/).map(t => t.trim()).filter(Boolean);

  for (const bt of bTokens) {
    if (bt.length < 2) continue;
    if (a.includes(bt)) return true;
  }
  for (const at of aTokens) {
    if (at.length < 2) continue;
    if (b.includes(at)) return true;
  }
  return false;
}

// ===== DOM ready =====
document.addEventListener("DOMContentLoaded", () => {

  // ===== Student profile form =====
  const studentForm = document.getElementById("studentProfileForm");
  if (studentForm) {
    studentForm.addEventListener("submit", e => {
      e.preventDefault();
      const fd = new FormData(studentForm);
      const student = {
        name: fd.get("name"),
        email: fd.get("email"),
        phone: fd.get("phone"),
        skill: fd.get("skill"),
        applied: []
      };
      localStorage.setItem("studentProfile", JSON.stringify(student));
      showToast("✅ Student profile saved!");
      window.location.href = "student-portal.html";
    });
  }

  // ===== Company profile form =====
  const companyForm = document.getElementById("companyProfileForm");
  if (companyForm) {
    companyForm.addEventListener("submit", e => {
      e.preventDefault();
      const fd = new FormData(companyForm);
      const company = {
        companyName: fd.get("companyName"),
        email: fd.get("email"),
        phone: fd.get("phone"),
        skills: fd.get("skills"),
        location: fd.get("location")
      };
      localStorage.setItem("companyProfile", JSON.stringify(company));
      showToast("✅ Company profile saved!");
      window.location.href = "company-dashboard.html";
    });
  }

  // ===== Opportunity posting =====
  const opportunityForm = document.getElementById("opportunityForm");
  if (opportunityForm) {
    opportunityForm.addEventListener("submit", e => {
      e.preventDefault();
      const fd = new FormData(opportunityForm);
      const opp = {
        title: fd.get("title"),
        skill: fd.get("skill"),
        description: fd.get("description"),
        duration: fd.get("duration"),
        location: fd.get("location"),
        postedAt: new Date().toISOString(),
        applicants: []
      };
      const list = JSON.parse(localStorage.getItem("opportunities")) || [];
      list.push(opp);
      localStorage.setItem("opportunities", JSON.stringify(list));
      opportunityForm.reset();
      renderCompanyOpportunities();
      showToast("✅ Opportunity posted");
    });
  }

  // ===== Render functions =====
  renderCompanyOpportunities();
  renderOpportunitiesForStudent();
  renderStudentPortal();
});

// ===== Render company dashboard opportunities =====
function renderCompanyOpportunities() {
  const container = document.getElementById("companyOpportunities");
  if (!container) return;
  const opportunities = JSON.parse(localStorage.getItem("opportunities")) || [];
  container.innerHTML = "<h2>Your Posted Opportunities</h2>";
  if (opportunities.length === 0) {
    container.innerHTML += "<p>No opportunities posted yet.</p>";
    return;
  }
  opportunities.forEach(opp => {
    const card = document.createElement("div");
    card.className = "opportunity-card";
    card.innerHTML = `
      <div class="job-header">
          <div>
            <span class="badge ${badgeClass}">${opportunity.type}</span>
            <span style="margin-left: 8px; color: ${theme === 'light' ? '#6b7280' : '#94a3b8'}; font-size: 14px;">${opportunity.posted}</span>
          </div>
        </div>
        <h3 class="${titleClass}">${opportunity.title}</h3>
        <p class="${companyClass}">${opportunity.company}</p>
        <div class="${metaClass}">
          <span class="${metaItemClass}">📍 ${opportunity.location}</span>
          <span class="${metaItemClass}">⏰ ${opportunity.duration}</span>
        </div>
        <div class="skills-container">
          ${skillsHTML}
        </div>
        <button class="btn ${btnClass}" style="width: 100%; margin-top: 12px;">View Details</button>
      `;
      appendChild(card);  
      return card;})
    }

    // ===== Render company dashboard opportunities =====
function renderCompanyOpportunities() {
  const container = document.getElementById("companyOpportunities");
  if (!container) return;

  // Get current theme (assuming you have a way to track it globally)
  const theme = localStorage.getItem("theme") || "light"; // default to 'light'

  const opportunities = JSON.parse(localStorage.getItem("opportunities")) || [];
  container.innerHTML = '<h2 class="section-title">Your Posted Opportunities</h2>';

  if (opportunities.length === 0) {
    container.innerHTML += "<p>No opportunities posted yet.</p>";
    return;
  }

  opportunities.forEach(opp => {
    // Determine badge class based on opportunity type
    let badgeClass = "";
    if (opp.type === "Internship") {
      badgeClass = theme === "light" ? "badge-internship-light" : "badge-internship-dark";
    } else if (opp.type === "Job") {
      badgeClass = theme === "light" ? "badge-job-light" : "badge-job-dark";
    } else {
      badgeClass = theme === "light" ? "badge-light" : "badge-dark";
    }

    // Title, company, meta classes
    const titleClass = `job-title ${theme}`;
    const companyClass = `job-company ${theme}`;
    const metaClass = `job-meta ${theme}`;
    const metaItemClass = "job-meta-item";
    const btnClass = theme === "light" ? "btn-outline-light" : "btn-outline-dark";

    // Generate skills HTML
    const skillsHTML = opp.skills && Array.isArray(opp.skills)
      ? opp.skills.map(skill => `<span class="skill-tag ${theme}">${skill}</span>`).join("")
      : "";

    const card = document.createElement("div");
    card.className = `job-card ${theme}`;

    card.innerHTML = `
      <div class="job-header">
        <div>
          <span class="badge ${badgeClass}">${opp.type}</span>
          <span style="margin-left: 8px; color: ${theme === 'light' ? '#6b7280' : '#94a3b8'}; font-size: 14px;">${opp.posted}</span>
        </div>
      </div>
      <h3 class="${titleClass}">${opp.title}</h3>
      <p class="${companyClass}">${opp.company}</p>
      <div class="${metaClass}">
        <span class="${metaItemClass}">📍 ${opp.location}</span>
        <span class="${metaItemClass}">⏰ ${opp.duration}</span>
      </div>
      <div class="skills-container">
        ${skillsHTML}
      </div>
      <button class="btn ${btnClass}" style="width: 100%; margin-top: 12px;">View Details</button>
    `;

    container.appendChild(card);
  });
}
// ===== Render opportunities for students =====
function renderOpportunitiesForStudent() {
  const container = document.getElementById("opportunitiesList");
  if (!container) return;
  const opportunities = JSON.parse(localStorage.getItem("opportunities")) || [];
  const student = JSON.parse(localStorage.getItem("studentProfile"));
  container.innerHTML = "";

  if (!student || !student.skill) {
    container.innerHTML = "<p>⚠️ Please create a student profile first.</p>";
    return;
  }

  opportunities.forEach(opp => {
    const card = document.createElement("div");
    card.className = "opportunity-card";
    card.innerHTML = `
      <h3>${escapeHtml(opp.title)}</h3>
      <p><strong>Skills:</strong> ${escapeHtml(opp.skill)}</p>
      <p>${escapeHtml(opp.description)}</p>
      <p><strong>Duration:</strong> ${escapeHtml(opp.duration)}</p>
      <p><strong>Location:</strong> ${escapeHtml(opp.location)}</p>
      <button onclick="applyOpportunity('${escapeHtml(opp.title)}')">Apply</button>
    `;
    container.appendChild(card);
  });
}

// ===== Apply to opportunity =====
function applyOpportunity(title) {
  const student = JSON.parse(localStorage.getItem("studentProfile"));
  const opportunities = JSON.parse(localStorage.getItem("opportunities")) || [];
  const opp = opportunities.find(o => o.title === title);
  if (!student || !opp) return;

  if (!student.applied.includes(title)) student.applied.push(title);
  if (!opp.applicants.includes(student.email)) opp.applicants.push(student.email);

  localStorage.setItem("studentProfile", JSON.stringify(student));
  localStorage.setItem("opportunities", JSON.stringify(opportunities));
  showToast(`✅ Applied to ${title}`);
  renderStudentPortal();
}

// ===== Render student portal info =====
function renderStudentPortal() {
  const student = JSON.parse(localStorage.getItem("studentProfile"));
  if (!student) return;
  const nameEl = document.getElementById("studentName");
  const emailEl = document.getElementById("studentEmail");
  if (nameEl) nameEl.textContent = student.name;
  if (emailEl) emailEl.textContent = student.email;

  const appliedContainer = document.getElementById("appliedList");
  if (!appliedContainer) return;
  appliedContainer.innerHTML = "";
  const opportunities = JSON.parse(localStorage.getItem("opportunities")) || [];
  student.applied.forEach(title => {
    const opp = opportunities.find(o => o.title === title);
    if (!opp) return;
    const div = document.createElement("div");
    div.className = "opportunity-card";
    const isAccepted = opp.applicants.includes(student.email); // simplified status
    div.innerHTML = `
      <h3>${escapeHtml(opp.title)}</h3>
      <p><strong>Skills:</strong> ${escapeHtml(opp.skill)}</p>
      <p><strong>Status:</strong> <span style="color:${isAccepted?'green':'red'};">●</span></p>
    `;
    appliedContainer.appendChild(div);
  });
}
 // Fetch profile data
    fetch('/api/profile')
        .then(res => res.json())
        .then(data => {
            document.querySelector('.profile-info h2').textContent = data.name;
            document.querySelector('.profile-info p').textContent = 
                `${data.program} • ${data.university}`;
            document.querySelector('.stat-value:nth-child(1)').textContent = data.stats.active;
            document.querySelector('.stat-value:nth-child(2)').textContent = data.stats.shortlisted;
            document.querySelector('.stat-value:nth-child(3)').textContent = data.stats.hired;
            document.querySelector('.progress-fill').style.width = data.profileCompletion + '%';
            document.querySelector('.alert-text p').textContent = 
                `Your profile is ${data.profileCompletion}% complete`;
        });

    // Fetch jobs and blog if you want dynamic rendering (advanced)

// Tab switching
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;

    // Check for saved theme in localStorage or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        htmlElement.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️';
    }

    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        htmlElement.setAttribute('data-theme', currentTheme);
        localStorage.setItem('theme', currentTheme);
        themeToggle.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
    });

// ===== Logout buttons =====
document.querySelectorAll("#logoutBtn").forEach(btn => {
  btn.addEventListener("click", () => {
    localStorage.removeItem("studentProfile");
    localStorage.removeItem("companyProfile");
    window.location.href = "index.html";
  });

});