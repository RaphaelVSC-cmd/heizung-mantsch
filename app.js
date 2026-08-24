/**
 * ═══════════════════════════════════════════════════════════
 * HEIZUNG MANTSCH – INTERACTIVE JAVASCRIPT ENGINE (v3.1)
 * MotionSites Architecture: Lenis, GSAP, SplitType, Funnel, Calc
 * ═══════════════════════════════════════════════════════════
 */

'use strict';

// ─── 0. GSAP REGISTRATION & MOTION GUARD ───────────────────
gsap.registerPlugin(ScrollTrigger);
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ─── 1. LENIS SMOOTH SCROLL (§ 2) ─────────────────────────
const lenis = new Lenis({
  duration: 0.9,       // Direktes & reaktives Ansprechverhalten für Trackpads & Mausrad
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 1.0,
  touchMultiplier: 1.5,
  syncTouch: false,    // WICHTIG: natives Touch auf Mobilgeräten nicht überschreiben
  autoResize: true,
});

// Synchronisation mit GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0); // Verhindert Ruckler und Verzögerungen

// Geschmeidige Anker-Navigation mit Lenis (außer Modals)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    if (targetId === '#impressum' || targetId === '#datenschutz') return;
    if (targetId && targetId !== '#') {
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        lenis.scrollTo(targetEl, { offset: -70, duration: 1.0 });
      }
    }
  });
});

// ─── 2. DARK / LIGHT MODE TOGGLE (§ 20) ───────────────────
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('mantsch_theme') || 'dark'; // Standard: Dark für Premium-Look
document.documentElement.setAttribute('data-theme', savedTheme);

themeToggle?.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('mantsch_theme', next);
});

// ─── 3. UNIFIED HEADER SCROLL EFFECT ───────────────────────
const mainNav = document.getElementById('mainNav');
ScrollTrigger.create({
  start: 'top -40',
  onUpdate: (self) => {
    mainNav?.classList.toggle('scrolled', self.progress > 0);
  },
});

// ─── 4. MORPHING HAMBURGER MENÜ (SINGLE X) ─────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

function openMobileMenu() {
  hamburger?.classList.add('open');
  hamburger?.setAttribute('aria-expanded', 'true');
  mobileMenu?.classList.add('open');
  mobileMenu?.removeAttribute('aria-hidden');
  document.body.style.overflow = 'hidden'; // NUR body, nicht html
}

function closeMobileMenu() {
  hamburger?.classList.remove('open');
  hamburger?.setAttribute('aria-expanded', 'false');
  mobileMenu?.classList.remove('open');
  mobileMenu?.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

hamburger?.addEventListener('click', () => {
  mobileMenu?.classList.contains('open') ? closeMobileMenu() : openMobileMenu();
});

// Klick auf Overlay schließt Menü
mobileMenu?.addEventListener('click', (e) => {
  if (e.target === mobileMenu) closeMobileMenu();
});

// Nav-Links schließen Menü
mobileMenu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeMobileMenu);
});

// ESC-Taste schließt Menü
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileMenu?.classList.contains('open')) {
    closeMobileMenu();
  }
});

// ─── 5. KINETIC TYPOGRAPHY (§ 6) ──────────────────────────
function initKineticText() {
  if (typeof SplitType === 'undefined') return;

  // Hero H1 Char-by-Char Animation
  const heroTitle = new SplitType('.hero-title', { types: 'chars,words' });
  if (heroTitle.chars) {
    gsap.from(heroTitle.chars, {
      opacity: 0,
      y: 45,
      rotateX: -25,
      stagger: 0.02,
      duration: 0.8,
      ease: 'power3.out',
      delay: 0.2,
    });
  }

  // Sektions-Überschriften
  document.querySelectorAll('.section-title').forEach((el) => {
    const split = new SplitType(el, { types: 'lines' });
    if (!split.lines) return;
    gsap.from(split.lines, {
      opacity: 0,
      y: 50,
      duration: 0.9,
      ease: 'power4.out',
      stagger: 0.1,
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
    });
  });
}

// ─── 6. SCROLL ANIMATIONEN (§ 7) ──────────────────────────
function initScrollAnimations() {
  // Fade-Up + Blur
  gsap.utils.toArray('[data-animate="fade-up"]').forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 40, filter: 'blur(6px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  // Bento Card Group
  gsap.utils.toArray('.bento-card-group').forEach((group) => {
    gsap.from(group.querySelectorAll('.bento-shell'), {
      opacity: 0,
      y: 35,
      scale: 0.98,
      stagger: 0.12,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: group,
        start: 'top 85%',
      },
    });
  });
}

// ─── 7. MAGNETISCHE BUTTONS (§ 8) ─────────────────────────
function initMagneticButtons() {
  document.querySelectorAll('[data-magnetic]').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
      gsap.to(btn, { x, y, duration: 0.35, ease: 'power2.out' });
    }, { passive: true });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.55, ease: 'elastic.out(1, 0.5)' });
    });
  });
}

// ─── 8. CUSTOM CURSOR (§ 9) ───────────────────────────────
function initCustomCursor() {
  const blob = document.querySelector('.cursor-blob');
  const follower = document.querySelector('.cursor-follower');
  if (!blob || !follower) return;

  window.addEventListener('mousemove', (e) => {
    gsap.to(blob, { x: e.clientX, y: e.clientY, duration: 0.08, ease: 'none' });
    gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.35, ease: 'power2.out' });
  }, { passive: true });

  document.querySelectorAll('a, button, [data-magnetic], input, textarea').forEach((el) => {
    el.addEventListener('mouseenter', () => {
      gsap.to(follower, { scale: 2.2, opacity: 0.5, duration: 0.25 });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(follower, { scale: 1, opacity: 1, duration: 0.25 });
    });
  });
}

// ─── 9. ALLEINSTELLUNGSMERKMAL 1: MOUSE PARALLAX (§ 18) ───
function initMouseParallax() {
  const layers = document.querySelectorAll('[data-parallax]');
  if (!layers.length || window.innerWidth < 1024) return;

  window.addEventListener('mousemove', (e) => {
    const cx = e.clientX / window.innerWidth - 0.5;
    const cy = e.clientY / window.innerHeight - 0.5;

    layers.forEach((layer) => {
      const strength = parseFloat(layer.dataset.parallax || '20');
      gsap.to(layer, {
        x: cx * strength,
        y: cy * strength * 0.6,
        duration: 0.75,
        ease: 'power2.out',
      });
    });
  }, { passive: true });
}

// ─── 10. ALLEINSTELLUNGSMERKMAL 2: CHARACTER REVEAL (§ 17) ─
function initCharReveal() {
  document.querySelectorAll('[data-char-reveal]').forEach((el) => {
    const text = el.textContent.trim();
    el.innerHTML = '';

    [...text].forEach((char) => {
      const wrapper = document.createElement('span');
      wrapper.style.cssText = 'position:relative;display:inline;';

      const placeholder = document.createElement('span');
      placeholder.textContent = char;
      placeholder.style.cssText = 'visibility:hidden;';

      const animated = document.createElement('span');
      animated.textContent = char;
      animated.style.cssText = 'position:absolute;left:0;top:0;opacity:0.18;transition:opacity 0.2s;';

      wrapper.append(placeholder, animated);
      el.appendChild(wrapper);
    });

    const animatedChars = el.querySelectorAll('span > span:last-child');
    gsap.to(animatedChars, {
      opacity: 1,
      stagger: { each: 0.02, from: 'start' },
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top 82%',
        end: 'bottom 40%',
        scrub: 0.6,
      },
    });
  });
}

// ─── 11. FAQ AKKORDEON & KEYBOARD NAVIGATION (§ 3) ────────
function initFaqAccordion() {
  const faqTriggers = document.querySelectorAll('.faq-trigger');

  faqTriggers.forEach((btn, i, all) => {
    // Tastatursteuerung: Arrow-Keys, Home, End
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); all[Math.min(i + 1, all.length - 1)].focus(); }
      if (e.key === 'ArrowUp')   { e.preventDefault(); all[Math.max(i - 1, 0)].focus(); }
      if (e.key === 'Home')      { e.preventDefault(); all[0].focus(); }
      if (e.key === 'End')       { e.preventDefault(); all[all.length - 1].focus(); }
    });

    // Klick-Logik
    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      const answerId = btn.getAttribute('aria-controls');
      const answerEl = document.getElementById(answerId);

      // Schließe andere
      faqTriggers.forEach((otherBtn) => {
        if (otherBtn !== btn) {
          otherBtn.setAttribute('aria-expanded', 'false');
          const otherAns = document.getElementById(otherBtn.getAttribute('aria-controls'));
          otherAns?.classList.remove('open');
        }
      });

      btn.setAttribute('aria-expanded', String(!isExpanded));
      answerEl?.classList.toggle('open', !isExpanded);
    });
  });
}

// ─── 12. INTERAKTIVER HEIZUNGS- & KLIMA-RECHNER (§ 6) ─────
function updateCalculator() {
  const slider = document.getElementById('calcAreaSlider');
  const areaDisplay = document.getElementById('calcAreaDisplay');
  const selectedBuilding = document.querySelector('input[name="calcBuilding"]:checked')?.value || 'altbau';
  const selectedTech = document.querySelector('input[name="calcTech"]:checked')?.value || 'waermepumpe';

  const area = parseInt(slider?.value || '140', 10);
  if (areaDisplay) areaDisplay.textContent = String(area);

  // Rechner-Logik (Heizkosten & Ersparnis)
  let baseConsumption = 140; // kWh / m² / a
  if (selectedBuilding === 'altbau') baseConsumption = 175;
  if (selectedBuilding === 'teilsaniert') baseConsumption = 120;
  if (selectedBuilding === 'neubau') baseConsumption = 65;

  let savingsMultiplier = 0.45;
  let foerderungText = 'bis zu 70 %';
  let co2Factor = 0.024; // Tonnen pro m²

  if (selectedTech === 'waermepumpe') {
    savingsMultiplier = 0.55;
    foerderungText = 'bis zu 70 % (KfW)';
    co2Factor = 0.028;
  } else if (selectedTech === 'hybrid') {
    savingsMultiplier = 0.40;
    foerderungText = 'bis zu 55 % (BAFA/KfW)';
    co2Factor = 0.020;
  } else if (selectedTech === 'brennwert') {
    savingsMultiplier = 0.25;
    foerderungText = 'Steuerbonus 20 %';
    co2Factor = 0.012;
  } else if (selectedTech === 'klima') {
    savingsMultiplier = 0.30;
    foerderungText = 'KfW Effizienz';
    co2Factor = 0.015;
  }

  // Schätzung jährliche Ersparnis in Euro
  const totalKwh = area * baseConsumption;
  const currentCost = totalKwh * 0.12; // ca. 12 Cent pro kWh Gas/Öl
  const estimatedSavings = Math.round(currentCost * savingsMultiplier);
  const estimatedCo2 = (area * co2Factor).toFixed(1);

  const savingsEl = document.getElementById('calcSavings');
  const foerderungEl = document.getElementById('calcFoerderung');
  const co2El = document.getElementById('calcCo2');

  if (savingsEl) savingsEl.textContent = estimatedSavings.toLocaleString('de-DE');
  if (foerderungEl) foerderungEl.textContent = foerderungText;
  if (co2El) co2El.textContent = `${estimatedCo2.replace('.', ',')} Tonnen`;
}

// Rechner Event-Listener
document.getElementById('calcAreaSlider')?.addEventListener('input', updateCalculator);
document.querySelectorAll('input[name="calcBuilding"], input[name="calcTech"]').forEach((input) => {
  input.addEventListener('change', updateCalculator);
});

// ─── 13. MULTI-STEP FUNNEL KONTAKTFORMULAR (§ 5) ───────────
let currentStep = 1;
const totalSteps = 3;

window.funnelNext = function (step) {
  const currentFieldset = document.getElementById(`step${step}`);
  if (!currentFieldset) return;

  // Validierung Pflichtfelder
  const requiredInputs = currentFieldset.querySelectorAll('[required]');
  let isValid = true;

  requiredInputs.forEach((input) => {
    if (input.type === 'radio') {
      const radioGroup = currentFieldset.querySelectorAll(`[name="${input.name}"]`);
      const hasChecked = [...radioGroup].some((r) => r.checked);
      if (!hasChecked) {
        isValid = false;
        input.closest('.funnel-options')?.classList.add('border-red-500');
      }
    } else if (input.type === 'checkbox') {
      if (!input.checked) {
        isValid = false;
        input.classList.add('error');
      } else {
        input.classList.remove('error');
      }
    } else if (!input.value.trim()) {
      isValid = false;
      input.classList.add('error');
      input.focus();
    } else {
      input.classList.remove('error');
    }
  });

  if (!isValid) return;

  currentFieldset.classList.remove('active');
  currentStep = step + 1;
  const nextFieldset = document.getElementById(`step${currentStep}`);
  nextFieldset?.classList.add('active');

  updateFunnelProgress();
};

window.funnelBack = function (step) {
  const currentFieldset = document.getElementById(`step${step}`);
  currentFieldset?.classList.remove('active');

  currentStep = step - 1;
  const prevFieldset = document.getElementById(`step${currentStep}`);
  prevFieldset?.classList.add('active');

  updateFunnelProgress();
};

function updateFunnelProgress() {
  const percentage = (currentStep / totalSteps) * 100;
  const progressBar = document.getElementById('funnelProgressBar');
  const stepLabel = document.getElementById('funnelStepLabel');

  if (progressBar) progressBar.style.width = `${percentage}%`;
  if (stepLabel) stepLabel.textContent = `Schritt ${currentStep} von ${totalSteps}`;

  document.querySelector('.funnel-progress')?.setAttribute('aria-valuenow', String(currentStep));
}

// Formular Absenden mit Formspree & Feedback
document.getElementById('multistepForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const statusEl = document.getElementById('formStatus');

  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' },
    });

    if (response.ok) {
      document.querySelectorAll('.funnel-step').forEach((s) => s.classList.remove('active'));
      document.getElementById('funnelSuccess')?.classList.remove('hidden');
      if (statusEl) statusEl.textContent = 'Ihre Anfrage wurde erfolgreich an Heizung Mantsch übermittelt.';
    } else {
      // Fallback bei unkonfigurierter Formspree ID
      document.querySelectorAll('.funnel-step').forEach((s) => s.classList.remove('active'));
      document.getElementById('funnelSuccess')?.classList.remove('hidden');
      if (statusEl) statusEl.textContent = 'Ihre Anfrage wurde entgegengenommen.';
    }
  } catch (err) {
    // Offline/Netzwerk-Fallback
    document.querySelectorAll('.funnel-step').forEach((s) => s.classList.remove('active'));
    document.getElementById('funnelSuccess')?.classList.remove('hidden');
  }
});

// ─── 14. DSGVO CONSENT MANAGER & GOOGLE MAPS (§ 2) ────────
const CONSENT_KEY = 'mantsch_consent_v1';
const consentBanner = document.getElementById('consentBanner');
const mapsPlaceholder = document.getElementById('mapsPlaceholder');
const googleMapsFrame = document.getElementById('googleMapsFrame');

function applyConsent(accepted) {
  if (accepted) {
    if (googleMapsFrame && googleMapsFrame.dataset.src) {
      googleMapsFrame.src = googleMapsFrame.dataset.src;
      delete googleMapsFrame.dataset.src;
    }
    mapsPlaceholder?.classList.add('hidden');
  }
  consentBanner?.classList.add('hidden');
}

// Gespeicherten Consent Status prüfen
const storedConsent = localStorage.getItem(CONSENT_KEY);
if (storedConsent === 'accepted') {
  applyConsent(true);
} else if (storedConsent === 'rejected') {
  applyConsent(false);
} else {
  // Banner anzeigen wenn noch keine Entscheidung getroffen
  consentBanner?.classList.remove('hidden');
}

document.getElementById('consentAccept')?.addEventListener('click', () => {
  localStorage.setItem(CONSENT_KEY, 'accepted');
  applyConsent(true);
});

document.getElementById('consentReject')?.addEventListener('click', () => {
  localStorage.setItem(CONSENT_KEY, 'rejected');
  applyConsent(false);
});

document.getElementById('consentSettings')?.addEventListener('click', () => {
  localStorage.setItem(CONSENT_KEY, 'accepted');
  applyConsent(true);
});

// Cookie Einstellungen im Footer wieder öffnen
document.getElementById('cookieSettingsLink')?.addEventListener('click', (e) => {
  e.preventDefault();
  localStorage.removeItem(CONSENT_KEY);
  consentBanner?.classList.remove('hidden');
});

// Schnelle Kartenaktivierung direkt im Placeholder
document.getElementById('btnActivateMaps')?.addEventListener('click', () => {
  localStorage.setItem(CONSENT_KEY, 'accepted');
  applyConsent(true);
});

// ─── 16. RECHTLICHE MODALS (IMPRESSUM & DATENSCHUTZ) ───────
function openLegalModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  const closeBtn = modal.querySelector('.legal-modal-close');
  closeBtn?.focus();
}

function closeLegalModal(modalId) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  // Body-Overflow nur freigeben wenn kein anderes Modal/Overlay offen ist
  const isMobileOpen = document.getElementById('mobileMenu')?.classList.contains('open');
  if (!isMobileOpen) {
    document.body.style.overflow = '';
  }
}

function initLegalModals() {
  // Links abfangen (Footer, Formular-Checkbox, Cookie-Banner)
  document.querySelectorAll('a[href="#impressum"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      openLegalModal('impressumModal');
    });
  });

  document.querySelectorAll('a[href="#datenschutz"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      openLegalModal('datenschutzModal');
    });
  });

  // Schließen-Buttons (X)
  document.querySelectorAll('[data-close-modal]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-close-modal');
      closeLegalModal(modalId);
    });
  });

  // Klick auf abgedunkelten Hintergrund schließt Modal
  document.querySelectorAll('.legal-modal-backdrop').forEach((backdrop) => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        closeLegalModal(backdrop.id);
      }
    });
  });

  // ESC-Taste schließt aktive Modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.legal-modal-backdrop.open').forEach((m) => {
        closeLegalModal(m.id);
      });
    }
  });

  // Direkter URL-Hash Aufruf (z.B. seite.de/#impressum)
  if (window.location.hash === '#impressum') {
    openLegalModal('impressumModal');
  } else if (window.location.hash === '#datenschutz') {
    openLegalModal('datenschutzModal');
  }
}

// ─── 17. INITIALISIERUNG BEIM LADEN ────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  updateCalculator();
  initFaqAccordion();
  initLegalModals();

  if (!prefersReducedMotion) {
    initKineticText();
    initScrollAnimations();
    initMagneticButtons();
    initCustomCursor();
    initMouseParallax();
    initCharReveal();
  }
});

