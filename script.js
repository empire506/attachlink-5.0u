// AttachLink final script.js
console.log("AttachLink site loaded.");

// toggle hamburger
function toggleMenu() {
  const nav = document.getElementById("navbar");
  if (!nav) return;
  nav.classList.toggle("show");
}

// helper: robust skill matching (partial + token matching)
function skillsMatch(oppSkill, studentSkill) {
  if (!oppSkill || !studentSkill) return false;
  const a = oppSkill.toLowerCase();
  const b = studentSkill.toLowerCase();

  // direct contains
  if (a.includes(b) || b.includes(a)) return true;

  // split into tokens (commas and spaces)
  const aTokens = a.split(/[, ]+/).map(t => t.trim()).filter(Boolean);
  const bTokens = b.split(/[, ]+/).map(t => t.trim()).filter(Boolean);

  // check token overlap (ignore tokens of length 1)
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

// DOM ready init
document.addEventListener("DOMContentLoaded", () => {
  // STUDENT profile form (on index.html)
  const studentForm = document.getElementById("studentProfileForm");
  if (studentForm) {
    studentForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(studentForm);
      const student = {
        name: fd.get("name"),
        email: fd.get("email"),
        phone: fd.get("phone"),
        skill: fd.get("skill"),
      };
      localStorage.setItem("studentProfile", JSON.stringify(student));
      alert("✅ Student profile saved! You can now browse opportunities.");
      studentForm.reset();
    });
  }

  // COMPANY profile form (on index.html) — saves company profile and redirects to dashboard
  const companyProfileForm = document.getElementById("companyProfileForm");
  if (companyProfileForm) {
    companyProfileForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(companyProfileForm);
      const company = {
        companyName: fd.get("companyName"),
        email: fd.get("email"),
        phone: fd.get("phone"),
        skills: fd.get("skills"),
        location: fd.get("location"),
      };
      localStorage.setItem("companyProfile", JSON.stringify(company));
      alert("✅ Company profile saved — redirecting to dashboard...");
      window.location.href = "company-dashboard.html";
    });
  }

  // OPPORTUNITY posting form (on company-dashboard.html)
  const opportunityForm = document.getElementById("opportunityForm");
  if (opportunityForm) {
    opportunityForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(opportunityForm);
      const opp = {
        title: fd.get("title"),
        skill: fd.get("skill"),
        description: fd.get("description"),
        duration: fd.get("duration"),
        location: fd.get("location"),
        postedAt: new Date().toISOString(),
      };
      const list = JSON.parse(localStorage.getItem("opportunities")) || [];
      list.push(opp);
      localStorage.setItem("opportunities", JSON.stringify(list));
      opportunityForm.reset();
      renderCompanyOpportunities();
      alert("✅ Opportunity posted.");
    });
  }

  // render posted opportunities in dashboard
  renderCompanyOpportunities();

  // If on opportunities page, render matches
  renderOpportunitiesForStudent();
});

// Render company dashboard list
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
      <p>${escapeHtml(opp.description || "")}</p>
      <p><strong>Duration:</strong> ${escapeHtml(opp.duration)}</p>
      <p><strong>Location:</strong> ${escapeHtml(opp.location)}</p>
    `;
    container.appendChild(card);
  });
}

// Render opportunities for student (matching)
function renderOpportunitiesForStudent() {
  const container = document.getElementById("opportunitiesList");
  if (!container) return;
  const opportunities = JSON.parse(localStorage.getItem("opportunities")) || [];
  const student = JSON.parse(localStorage.getItem("studentProfile"));

  container.innerHTML = "";

  if (!student || !student.skill) {
    container.innerHTML = "<p>⚠️ Please create a student profile first (Home → Student Application).</p>";
    return;
  }

  const matched = opportunities.filter(opp => skillsMatch(opp.skill || "", student.skill || ""));

  if (matched.length === 0) {
    container.innerHTML = `<p>😔 No opportunities found for your skill: <strong>${escapeHtml(student.skill)}</strong>.</p>
      <p><button onclick="showAllOpportunities()">Show All Opportunities</button></p>`;
    return;
  }

  matched.forEach(opp => {
    const card = document.createElement("div");
    card.className = "opportunity-card";
    card.innerHTML = `
      <h3>${escapeHtml(opp.title)}</h3>
      <p><strong>Skill Required:</strong> ${escapeHtml(opp.skill)}</p>
      <p>${escapeHtml(opp.description || "")}</p>
      <p><strong>Duration:</strong> ${escapeHtml(opp.duration)}</p>
      <p><strong>Location:</strong> ${escapeHtml(opp.location)}</p>
    `;
    container.appendChild(card);
  });
}

// Show all opportunities (fallback)
function showAllOpportunities() {
  const container = document.getElementById("opportunitiesList");
  if (!container) return;
  const opportunities = JSON.parse(localStorage.getItem("opportunities")) || [];
  container.innerHTML = "";
  if (opportunities.length === 0) {
    container.innerHTML = "<p>No opportunities posted yet.</p>";
    return;
  }
  opportunities.forEach(opp => {
    const card = document.createElement("div");
    card.className = "opportunity-card";
    card.innerHTML = `
      <h3>${escapeHtml(opp.title)}</h3>
      <p><strong>Skill Required:</strong> ${escapeHtml(opp.skill)}</p>
      <p>${escapeHtml(opp.description || "")}</p>
      <p><strong>Duration:</strong> ${escapeHtml(opp.duration)}</p>
      <p><strong>Location:</strong> ${escapeHtml(opp.location)}</p>
    `;
    container.appendChild(card);
  });
}

// utility: simple escape to avoid HTML injection in inserted content
function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Browse button helper
function goToOpportunities() {
  const student = JSON.parse(localStorage.getItem("studentProfile"));
  if (!student) {
    alert("⚠️ Please create your student profile first before browsing opportunities.");
    return;
  }
  window.location.href = "opportunities.html";
}
