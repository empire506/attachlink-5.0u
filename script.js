// AttachLink final script.js
console.log("AttachLink site loaded.");

// ===== Hamburger toggle =====
function toggleMenu() {
  const nav = document.getElementById("navbar");
  if (!nav) return;
  nav.classList.toggle("show");
}

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
      <h3>${escapeHtml(opp.title)}</h3>
      <p><strong>Skills:</strong> ${escapeHtml(opp.skill)}</p>
      <p>${escapeHtml(opp.description)}</p>
      <p><strong>Duration:</strong> ${escapeHtml(opp.duration)}</p>
      <p><strong>Location:</strong> ${escapeHtml(opp.location)}</p>
      <p><strong>Applicants:</strong> ${opp.applicants ? opp.applicants.join(", ") : "None"}</p>
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

// ===== Logout buttons =====
document.querySelectorAll("#logoutBtn").forEach(btn => {
  btn.addEventListener("click", () => {
    localStorage.removeItem("studentProfile");
    localStorage.removeItem("companyProfile");
    window.location.href = "index.html";
  });
});
