
  const messages = {
    NUST: "NET is temporary, regret is permanent.",
    FAST: "Hope you like 8:00 AM classes and zero holidays.",
    GIKI: "Hope your pocket is as deep as your brain.",
    UET: "Old is gold, but merit is diamond.",
    PIEAS: "Are you even human?"
  };

  const nustRoasts = [
    { min: 85, msg: "MashAllah! Beta CS mil jayega. Mithai lao!" },
    { min: 80, msg: "Safe zone. You can finally sleep for 4 hours." },
    { min: 70, msg: "Borderline. Start praying Tahajjud." },
    { min: 60, msg: "Mechanical mil sakti hai... maybe in some remote campus." },
    { min: 0, msg: "Have you considered a career in TikTok?" }
  ];

  const fastRoasts = [
    { min: 88, msg: "MashAllah! You have officially traded 4 years of sleep for a high salary. Worth it?" },
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
    document.getElementById("navLinks").classList.toggle("active"); 
  }

  function scrollToUniversities() {
    showView('universities');
  }

  function showView(viewId) {
    // hide mobile menu
    document.getElementById("navLinks").classList.remove("active");
    // toggle views
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    const el = document.getElementById(viewId);
    if (el) el.classList.add('active');
    // scroll main to top for better UX
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
    
    // Hide share button when switching universities
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
    const testInput = Number(document.getElementById("test").value);
    // Convert scores to percentage based on 1100 total
    const f = (Number(document.getElementById("fsc").value) / 1100) * 100;
    const m = (Number(document.getElementById("matric").value) / 1100) * 100;

    let merit = (currentUni === "GIKI") ? formulas.GIKI(testInput, f) : formulas[currentUni](testInput, f, m);
    
    document.getElementById("result").innerText = `${merit.toFixed(2)}%`;
    
    const selectedRoasts = allRoasts[currentUni] || nustRoasts;
    const roast = selectedRoasts.find(r => merit >= r.min);
    document.getElementById("roastMsg").innerText = roast ? roast.msg : "";

    // Show the WhatsApp button now that calculation is done
    document.getElementById("shareBtn").style.display = "block";
  }

  function shareWhatsApp() {
    const res = document.getElementById("result").innerText;
    const roast = document.getElementById("roastMsg").innerText;
    const text = encodeURIComponent(`Baji/Bhaiya, mera ${currentUni} aggregate ${res} aya hai. Roast: ${roast} #MeritCalc`);
    window.open(`https://wa.me/?text=${text}`, "_blank");
  }

  // Auto-close menu logic for mobile
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      document.getElementById("navLinks").classList.remove("active");
    });
  });