
const messages = {
  NUST: "NET is temporary, regret is permanent.",
  FAST: "Hope you like 8:00 AM classes and zero holidays.",
  GIKI: "Hope your pocket is as deep as your brain.",
  UET: "Old is gold, but merit is diamond.",
  PIEAS: "Are you even human?"
};

const nustRoasts = [
  { min: 85, msg: "Great! Beta CS mil jayega. Mithai lao!" },
  { min: 80, msg: "Safe zone. You can finally sleep for 4 hours." },
  { min: 70, msg: "Borderline. Start praying Tahajjud." },
  { min: 60, msg: "Mechanical mil sakti hai... maybe in some remote campus." },
  { min: 0, msg: "Have you considered a career in TikTok?" }
];

const fastRoasts = [
  { min: 88, msg: "Great! You have officially traded 4 years of sleep for a high salary. Worth it?" },
  { min: 80, msg: "You're in! Buy a mechanical keyboard and say goodbye to your friends now." },
  { min: 72, msg: "Borderline. Even if you get in, the GPA will roast you harder than we can." },
  { min: 60, msg: "Don't worry, even if you don't get into FAST, you'll still have a social life. You win some, you lose some." },
  { min: 0, msg: "Your merit is too high for TikTok, but too low for FAST. Try influencer marketing?" }
];

const gikiRoasts = [
  { min: 85, msg: "Merit high hai, par check pocket ka balance bhi kar lo beta." },
  { min: 75, msg: "You'll get in. Enjoy the mountain view while you question your life choices in Topi." },
  { min: 65, msg: "With this merit, the only thing 'Elite' about you will be your hostel bill." },
  { min: 0, msg: "GIKI merit is not for everyone. Have you considered a local degree and a used Mehran instead?" }
];

const uetRoasts = [
  { min: 92, msg: "Legendary! You're going to the OG. Hope you like 1940s infrastructure." },
  { min: 82, msg: "Civil mil jayegi. Start practicing your 'Sarkari Afsar' walk." },
  { min: 70, msg: "Main Campus is a dream. Sub-campus is the reality. KSK bula raha hai!" },
  { min: 0, msg: "UET merit is gone. Time to look into private colleges or a really good prayer mat." }
];

const pieasRoasts = [
  { min: 90, msg: "Are you a human or a scientific calculator? Welcome to the nuclear family." },
  { min: 80, msg: "Smart enough for PIEAS, but are you brave enough for the isolation?" },
  { min: 0, msg: "Nuclear Physics was never the plan anyway. Go find a nice relaxed management degree." }
];

const allRoasts = {
  NUST: nustRoasts,
  FAST: fastRoasts,
  GIKI: gikiRoasts,
  UET: uetRoasts,
  PIEAS: pieasRoasts
};

let currentUni = "";

function toggleMenu() {
  const btn = document.getElementById('menuBtn');
  const nav = document.getElementById('navLinks');
  const isOpen = nav.classList.toggle('active');
  btn.setAttribute('aria-expanded', String(isOpen));
  
  document.body.classList.toggle('menu-open', isOpen);
  if (isOpen) attachMenuCloseListeners(); else detachMenuCloseListeners();
}

function scrollToUniversities() {
  showView('universities');
}

function showView(viewId) {
  
  const nav = document.getElementById('navLinks');
  const btn = document.getElementById('menuBtn');
  nav.classList.remove('active');
  if (btn) btn.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-open');

  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const el = document.getElementById(viewId);
  if (el) el.classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openCalculator(uni) {
  currentUni = uni;
  const calc = document.getElementById("calculator");
  calc.style.display = "block";
  document.getElementById("calcTitle").innerText = `${uni} Calculator`;
  document.getElementById("humorMsg").innerText = messages[uni] || "";
  document.getElementById("result").innerText = "";
  document.getElementById("roastMsg").innerText = "";

  
  document.getElementById("shareBtn").style.display = "none";

  calc.scrollIntoView({ behavior: "smooth", block: "center" });
  document.getElementById("matric").style.display = (uni === "GIKI") ? "none" : "block";
}

const formulas = {
  NUST: (t, f, m) => (t * 0.75) + (f * 0.15) + (m * 0.10),
  FAST: (t, f, m) => (t * 0.50) + (f * 0.40) + (m * 0.10),
  PIEAS: (t, f, m) => (t * 0.60) + (f * 0.25) + (m * 0.15),
  UET: (t, f, m) => (t * 0.33) + (f * 0.50) + (m * 0.17),
  GIKI: (t, f) => (t * 0.85) + (f * 0.15)
};

function calculateMerit() {
  // Read raw input strings so we can detect empty fields
  const testRaw = (document.getElementById("test").value || "").toString();
  const fscRaw = (document.getElementById("fsc").value || "").toString();
  const matricRaw = (document.getElementById("matric").value || "").toString();

  // If all fields are empty, prompt user and stop
  if (testRaw.trim() === "" && fscRaw.trim() === "" && matricRaw.trim() === "") {
    alert("Fill the fields first, Jani!");
    return;
  }

  // Convert to numbers (treat empty as 0)
  let testPct = testRaw.trim() === "" ? 0 : Number(testRaw);
  let fscPct = fscRaw.trim() === "" ? 0 : Number(fscRaw);
  let matricPct = matricRaw.trim() === "" ? 0 : Number(matricRaw);

  // Validate numeric entries
  if (isNaN(testPct) || isNaN(fscPct) || isNaN(matricPct)) {
    alert("Please enter valid numeric percentages (0-100).");
    return;
  }

  // Clamp percentages to 0-100
  testPct = Math.min(Math.max(testPct, 0), 100);
  fscPct = Math.min(Math.max(fscPct, 0), 100);
  matricPct = Math.min(Math.max(matricPct, 0), 100);

  // Calculate merit using given percentages
  let merit = (currentUni === "GIKI")
    ? formulas.GIKI(testPct, fscPct)
    : formulas[currentUni](testPct, fscPct, matricPct);

  // Show result area and update UI
  const resultArea = document.getElementById("resultArea");
  if (resultArea) resultArea.style.display = "block";
  document.getElementById("result").innerText = `${merit.toFixed(2)}%`;

  // Predictive Status Logic
  const badge = document.getElementById("statusBadge");
  let statusText = "";
  let relativeText = "";

 
  badge.innerText = statusText;
  const relEl = document.getElementById("relativeReply");
  if (relEl) relEl.innerText = `"${relativeText}"`;

  // Roast Logic
  const selectedRoasts = allRoasts[currentUni] || nustRoasts;
  const roast = selectedRoasts.find(r => merit >= r.min);
  document.getElementById("roastMsg").innerText = roast ? roast.msg : "";

  const shareBtn = document.getElementById("shareBtn");
  if (shareBtn) shareBtn.style.display = "block";
}


document.addEventListener('DOMContentLoaded', () => {
  const calc = document.getElementById('calculator');
  if (calc) calc.style.display = 'none';
  const shareBtn = document.getElementById('shareBtn');
  if (shareBtn) shareBtn.style.display = 'none';
});

function shareWhatsApp() {
  const res = document.getElementById("result").innerText;
  const roast = document.getElementById("roastMsg").innerText;
  const uni = (typeof currentUni !== 'undefined' && currentUni) ? currentUni : "The Uni";

  const link = "https://meritcalc.vercel.app";

  const messages = [
    `i’m not cooked, i’m medium rare. 🥩\n\n${uni} aggregate: ${res}\n\n"${roast}"\n\ncalculate your downfall here:\n👉 ${link}`,

    `the math is mathing but the merit isn't.\n\n${uni} score: ${res}\n\n"${roast}"\n\ngo check yours so i feel better about myself. pls.\n👉 ${link}`,

    `not to be a girlboss but i might be unemployed.\n\n${uni}: ${res}\n\n"${roast}"\n\nsee if you're cooked too:\n👉 ${link}\n#meritcalc`,

    `my academic validation is in the trenches.\n\n${res} at ${uni}.\n\n"${roast}"\n\ncheck yours at your own risk:\n👉 ${link}`,

    `if "academic weapon" was a joke, it would be this:\n\n${uni} agg: ${res}\n"${roast}"\n\nreal ones check their merit here:\n👉 ${link}`,

    `manifesting a miracle because this ain't it.\n\n${uni} aggregate: ${res}\n"${roast}"\n\ncome join the waiting list of pain:\n👉 ${link}`
  ];

  const text = encodeURIComponent(
    messages[Math.floor(Math.random() * messages.length)]
  );

  window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
}

// Auto-close menu logic for mobile
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    const nav = document.getElementById('navLinks');
    const btn = document.getElementById('menuBtn');
    nav.classList.remove('active');
    if (btn) btn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  });
});


let _menuCloseHandler = null;
function attachMenuCloseListeners() {
  if (_menuCloseHandler) return;
  _menuCloseHandler = function (e) {
    const nav = document.getElementById('navLinks');
    const btn = document.getElementById('menuBtn');
    if (!nav || !btn) return;
    
    if (e.type === 'click' && !nav.contains(e.target) && !btn.contains(e.target)) {
      nav.classList.remove('active');
      btn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
      detachMenuCloseListeners();
    }
    
    if (e.type === 'keydown' && e.key === 'Escape') {
      nav.classList.remove('active');
      btn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
      detachMenuCloseListeners();
    }
  };
  document.addEventListener('click', _menuCloseHandler);
  document.addEventListener('keydown', _menuCloseHandler);
}

function detachMenuCloseListeners() {
  if (!_menuCloseHandler) return;
  document.removeEventListener('click', _menuCloseHandler);
  document.removeEventListener('keydown', _menuCloseHandler);
  _menuCloseHandler = null;
}