/* Shahak Talent Solution - simple WhatsApp-first frontend
   No database, server or WhatsApp API is required.
   Forms open WhatsApp with a pre-filled message.
*/
const CONFIG = {
  WHATSAPP_NUMBER: "919917874676",
  PHONE_NUMBER: "+91 99178 74676"
};

const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const candidateForm = $("#candidateForm");
const employerForm = $("#employerForm");

function cleanPhone(v){ return String(v||"").replace(/\D/g, ""); }

function setContactLinks(){
  const wa = cleanPhone(CONFIG.WHATSAPP_NUMBER);
  $$("[data-whatsapp]").forEach(a => {
    if (wa) a.href = `https://wa.me/${wa}`;
    else a.href = "#contact";
  });
  $$("[data-phone]").forEach(a => {
    a.href = CONFIG.PHONE_NUMBER ? `tel:${CONFIG.PHONE_NUMBER.replace(/[^\d+]/g,"")}` : "#contact";
  });
}
setContactLinks();

const year = $("#year");
if (year) year.textContent = new Date().getFullYear();

const menuToggle = $("#menuToggle"), nav = $("#mainNav");
menuToggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
$$("#mainNav a").forEach(a => a.addEventListener("click", () => {
  nav?.classList.remove("open");
  menuToggle?.setAttribute("aria-expanded", "false");
}));

const backTop = $("#backTop");
window.addEventListener("scroll", () => backTop?.classList.toggle("show", window.scrollY > 550), {passive:true});
backTop?.addEventListener("click", () => window.scrollTo({top:0, behavior:"smooth"}));

function showStatus(el, msg, type="error"){
  if (!el) return;
  el.textContent = msg;
  el.className = `form-status show ${type}`;
}

function busy(form, isBusy, label){
  const btn = $(".submit-btn", form);
  if (!btn) return;
  btn.disabled = isBusy;
  btn.innerHTML = isBusy ? '<span class="spinner"></span> Opening WhatsApp…' : `${label} <b>→</b>`;
}

function validPhone(value){
  return /^\+?[0-9\s()\-]{8,18}$/.test(String(value||""));
}

function validateCommon(form, status){
  if (!form.checkValidity()){
    form.reportValidity();
    return false;
  }
  if (!validPhone(form.elements.mobile?.value)){
    showStatus(status, "Please enter a valid mobile number.");
    return false;
  }
  return true;
}

function value(form, name){
  return String(form.elements[name]?.value || "").trim();
}

function openWhatsApp(message){
  const number = cleanPhone(CONFIG.WHATSAPP_NUMBER);
  if (!number){
    throw new Error("WhatsApp number is not configured.");
  }
  const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  const win = window.open(url, "_blank", "noopener,noreferrer");
  if (!win) window.location.href = url;
}

candidateForm?.addEventListener("submit", e => {
  e.preventDefault();
  const status = $("#candidateStatus");
  if (!validateCommon(candidateForm, status)) return;

  const file = $("#resumeFile")?.files?.[0];
  if (!file){
    showStatus(status, "Please select your CV. After WhatsApp opens, attach the same CV in the chat.");
    return;
  }
  if (!/\.(pdf|doc|docx)$/i.test(file.name)){
    showStatus(status, "Please upload a PDF, DOC or DOCX file.");
    return;
  }
  if (file.size > 5 * 1024 * 1024){
    showStatus(status, "Please keep your CV file at 5 MB or below.");
    return;
  }

  busy(candidateForm, true, "Submit Candidate Registration");
  const message = [
    "🔔 NEW CANDIDATE REGISTRATION",
    "",
    "👤 Full Name: " + value(candidateForm,"fullName"),
    "📱 Mobile: " + value(candidateForm,"mobile"),
    "💬 WhatsApp: " + (value(candidateForm,"whatsapp") || "-"),
    "📧 Email: " + value(candidateForm,"email"),
    "📍 Current Location: " + value(candidateForm,"currentLocation"),
    "📍 Preferred Location: " + (value(candidateForm,"preferredLocation") || "-"),
    "",
    "🎓 Qualification: " + value(candidateForm,"qualification"),
    "💼 Total Experience: " + value(candidateForm,"totalExperience"),
    "💼 Relevant Experience: " + (value(candidateForm,"relevantExperience") || "-"),
    "🏢 Current Company: " + (value(candidateForm,"currentCompany") || "-"),
    "💼 Current Designation: " + (value(candidateForm,"currentDesignation") || "-"),
    "🎯 Preferred Job Role: " + value(candidateForm,"preferredJobRole"),
    "💰 Current CTC: " + (value(candidateForm,"currentCtc") || "-"),
    "💰 Expected CTC: " + (value(candidateForm,"expectedCtc") || "-"),
    "⏳ Notice Period: " + (value(candidateForm,"noticePeriod") || "-"),
    "🔗 LinkedIn: " + (value(candidateForm,"linkedin") || "-"),
    "",
    "🛠 Skills: " + value(candidateForm,"skills"),
    "📝 Additional Information: " + (value(candidateForm,"additionalInfo") || "-"),
    "",
    "📎 CV file: " + file.name,
    "⚠️ Please attach the CV file in this WhatsApp chat.",
    "",
    "Source: Shahak Talent Solution Website"
  ].join("\n");

  try {
    openWhatsApp(message);
    candidateForm.reset();
    showStatus(status, "WhatsApp has been opened with the registration details. Please send the message and attach your CV in the same chat.", "success");
  } catch(err){
    showStatus(status, "WhatsApp could not be opened. Please contact Shahak Talent Solution directly.");
  } finally {
    busy(candidateForm, false, "Submit Candidate Registration");
  }
});

employerForm?.addEventListener("submit", e => {
  e.preventDefault();
  const status = $("#employerStatus");
  if (!validateCommon(employerForm, status)) return;

  busy(employerForm, true, "Submit Hiring Requirement");
  const message = [
    "🔔 NEW CLIENT / EMPLOYER ENQUIRY",
    "",
    "🏢 Company: " + value(employerForm,"companyName"),
    "👤 Contact Person: " + value(employerForm,"contactPerson"),
    "💼 Designation: " + (value(employerForm,"designation") || "-"),
    "📧 Email: " + value(employerForm,"email"),
    "📱 Mobile: " + value(employerForm,"mobile"),
    "💬 WhatsApp: " + (value(employerForm,"whatsapp") || "-"),
    "🌐 Company Website: " + (value(employerForm,"companyWebsite") || "-"),
    "🏭 Industry: " + (value(employerForm,"industry") || "-"),
    "📍 Company Location: " + value(employerForm,"companyLocation"),
    "",
    "📌 Requirement Type: " + value(employerForm,"requirementType"),
    "💼 Job Role(s): " + value(employerForm,"jobRoles"),
    "👥 Number of Vacancies: " + value(employerForm,"vacancies"),
    "🎯 Experience Required: " + (value(employerForm,"experienceRequired") || "-"),
    "💰 Salary / Budget: " + (value(employerForm,"salaryBudget") || "-"),
    "⏳ Hiring Timeline: " + (value(employerForm,"hiringTimeline") || "-"),
    "📄 Employment Type: " + (value(employerForm,"employmentType") || "-"),
    "",
    "📝 Requirement Details:",
    value(employerForm,"requirementDetails"),
    "",
    "Source: Shahak Talent Solution Website"
  ].join("\n");

  try {
    openWhatsApp(message);
    employerForm.reset();
    showStatus(status, "WhatsApp has been opened with the hiring requirement. Please send the message to complete your enquiry.", "success");
  } catch(err){
    showStatus(status, "WhatsApp could not be opened. Please contact Shahak Talent Solution directly.");
  } finally {
    busy(employerForm, false, "Submit Hiring Requirement");
  }
});
