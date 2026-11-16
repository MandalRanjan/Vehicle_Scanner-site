/**
 * DEMO START-UP - Shared Core Script (main.js)
 * Strict adherence to Design System: "Kinetic Seal"
 * Global Contact Constants, Multi-Language, Accordions, Header/Footer, Mobile Navigation
 */

// Strict Global Contact Constants (Defined once and reused)
const SITE_CONFIG = {
  phone: '+91 93165 49161',
  phoneTel: 'tel:+919316549161',
  whatsappUrl: 'https://wa.me/919316549161',
  email: 'mr7763510@gmail.com',
  emailMailto: 'mailto:mr7763510@gmail.com',
  supportHours: '8:00 AM – 11:00 PM (All 7 Days)',
  responseTime: 'Instant WhatsApp reply (< 15 mins)'
};
window.SITE_CONFIG = SITE_CONFIG;

// Background Color Switcher
(function() {
  const btn = document.getElementById('bg-toggle-btn');
  if (!btn) return;
  const colors = ['#F5FAFF', '#181A20', '#FFD700', '#90EE90', '#FFB6C1']; // light, dark, gold, lightgreen, pink
  let idx = 0;
  function setBg(color) {
    document.body.style.background = color;
    localStorage.setItem('bg-color', color);
  }
  btn.addEventListener('click', function() {
    idx = (idx + 1) % colors.length;
    setBg(colors[idx]);
  });
  // On load, set from storage
  const saved = localStorage.getItem('bg-color');
  if (saved && colors.includes(saved)) {
    idx = colors.indexOf(saved);
    setBg(saved);
  }
})();

// Multi-Language Dictionary (English, Hindi, Gujarati, Tamil)
const I18N_STRINGS = {
  en: {
    nav_home: 'Home',
    nav_buy: 'Buy Shield',
    nav_scanner: 'Scanner Demo',
    nav_wholesale: 'Wholesale',
    nav_partner: 'Partner',
    nav_guide: 'Guide',
    nav_blog: 'Blog',
    nav_contact: 'Contact',
    nav_dashboard: 'Dashboard',
    nav_login: 'Login',
    hero_title: 'Anyone can reach you. <span>Your number stays hidden.</span>',
    hero_subtitle: 'The smart QR vehicle contact sticker built for Indian roads. Strangers alert you for blocking, lights, towing, or medical emergencies via masked WhatsApp & voice relay.',
    cta_get_shield: 'Get Your Vehicle Shield • ₹499',
    cta_try_scanner: 'Try Scanner Live',
    badge_privacy: '100% Privacy Protected',
    badge_aligned: 'DPDP Act 2023 Aligned',
    badge_shield: 'Verified Vehicle Shield',
    lang_current: 'Eng',
    need_help: 'Need help?',
    login_title: 'Welcome to DEMO START-UP',
    login_sub: 'Manage your registered vehicle shields, scan notifications, and emergency SOS contacts.',
    login_step1_label: 'Step 1 of 2: Mobile Number',
    login_step2_label: 'Step 2 of 2: Enter Verification Code',
    login_btn_get_otp: 'Get 6-Digit OTP →',
    login_btn_verify: 'Verify & Access Dashboard →',
    scan_header: 'Hyundai Creta (White)',
    scan_reason_prompt: 'Why are you reaching out to this owner?'
  },
  hi: {
    nav_home: 'होम',
    nav_buy: 'टैग खरीदें',
    nav_scanner: 'स्कैनर डेमो',
    nav_wholesale: 'थोक पोर्टल',
    nav_partner: 'पार्टनर बनें',
    nav_guide: 'गाइड',
    nav_blog: 'ब्लॉग',
    nav_contact: 'संपर्क करें',
    nav_dashboard: 'डैशबोर्ड',
    nav_login: 'लॉग इन',
    hero_title: 'कोई भी आपसे संपर्क कर सकता है। <span>आपका नंबर हमेशा छिपा रहेगा।</span>',
    hero_subtitle: 'भारतीय सड़कों के लिए खास स्मार्ट QR व्हीकल स्टिकर। ब्लॉकिंग, लाइट ऑन, टोइंग या मेडिकल इमरजेंसी पर मास्क किए गए व्हाट्सएप और प्राइवेट कॉल से तुरंत अलर्ट पाएं।',
    cta_get_shield: 'वाहन शील्ड प्राप्त करें • ₹499',
    cta_try_scanner: 'लाइव स्कैनर टेस्ट करें',
    badge_privacy: '100% प्राइवेसी सुरक्षित',
    badge_aligned: 'DPDP अधिनियम 2023 अनुरूप',
    badge_shield: 'सत्यापित वाहन शील्ड',
    lang_current: 'हिं',
    need_help: 'मदद चाहिए?',
    login_title: 'DEMO START-UP में आपका स्वागत है',
    login_sub: 'अपने रजिस्टर्ड व्हीकल शील्ड, स्कैन अलर्ट और इमरजेंसी SOS कॉन्टैक्ट्स प्रबंधित करें।',
    login_step1_label: 'चरण 1 / 2: मोबाइल नंबर दर्ज करें',
    login_step2_label: 'चरण 2 / 2: वेरिफिकेशन कोड दर्ज करें',
    login_btn_get_otp: '6-अंकों का OTP प्राप्त करें →',
    login_btn_verify: 'सत्यापित करें और डैशबोर्ड खोलें →',
    scan_header: 'हुंडई क्रेटा (सफेद)',
    scan_reason_prompt: 'आप वाहन मालिक से किस कारण संपर्क कर रहे हैं?'
  },
  gu: {
    nav_home: 'હોમ',
    nav_buy: 'ટેગ ખરીદો',
    nav_scanner: 'સ્કેનર ડેમો',
    nav_wholesale: 'જથ્થાબંધ',
    nav_partner: 'પાર્ટનર બનો',
    nav_guide: 'માર્ગદર્શિકા',
    nav_blog: 'બ્લોગ',
    nav_contact: 'સંપર્ક કરો',
    nav_dashboard: 'ડેશબોર્ડ',
    nav_login: 'લોગિન',
    hero_title: 'કોઈપણ તમારો સંપર્ક કરી શકે. <span>તમારો નંબર કાયમ છુપાયેલો રહેશે.</span>',
    hero_subtitle: 'ભારતીય રસ્તાઓ માટે ખાસ સ્માર્ટ QR વ્હીકલ સ્ટિકર. પાર્કિંગ બ્લોક, લાઈટ ચાલુ, ટોઇંગ કે ઇમરજન્સીમાં નંબર જણાવ્યા વગર વોટ્સએપ પર મેળવો ત્વરિત એલર્ટ.',
    cta_get_shield: 'વ્હીકલ શીલ્ડ મેળવો • ₹499',
    cta_try_scanner: 'લાઈવ સ્કેનર અજમાવો',
    badge_privacy: '૧૦૦% પ્રાઈવસી સુરક્ષિત',
    badge_aligned: 'DPDP એકટ ૨૦૨૩ સુસંગત',
    badge_shield: 'વેરીફાઈડ વ્હીકલ શીલ્ડ',
    lang_current: 'ગુજ',
    need_help: 'મદદ જોઈએ છે?',
    login_title: 'DEMO START-UP માં સ્વાગત છે',
    login_sub: 'તમારા વાહન શીલ્ડ, સ્કેન એલર્ટ અને ઇમરજન્સી SOS સેટિંગ્સ મેનેજ કરો.',
    login_step1_label: 'પગલું ૧ / ૨: મોબાઈલ નંબર દાખલ કરો',
    login_step2_label: 'પગલું ૨ / ૨: ઓટીપી કોડ દાખલ કરો',
    login_btn_get_otp: '૬-અંકનો OTP મેળવો →',
    login_btn_verify: 'ચકાસો અને ડેશબોર્ડ ખોલો →',
    scan_header: 'હ્યુન્ડાઈ ક્રેટા (સફેદ)',
    scan_reason_prompt: 'તમે કયા કારણથી વાહન માલિકનો સંપર્ક કરો છો?'
  },
  ta: {
    nav_home: 'முகப்பு',
    nav_buy: 'டேக் வாங்க',
    nav_scanner: 'ஸ்கேனர் டெமோ',
    nav_wholesale: 'மொத்த விற்பனை',
    nav_partner: 'கூட்டாண்மை',
    nav_guide: 'வழிகாட்டி',
    nav_blog: 'வலைப்பதிவு',
    nav_contact: 'தொடர்பு',
    nav_dashboard: 'டாஷ்போர்டு',
    nav_login: 'உள்நுழைக',
    hero_title: 'யாரும் உங்களை தொடர்பு கொள்ளலாம். <span>உங்கள் எண் எப்போதும் மறைக்கப்பட்டிருக்கும்.</span>',
    hero_subtitle: 'இந்திய சாலைகளுக்காக உருவாக்கப்பட்ட ஸ்மார்ட் QR வாகன ஸ்டிக்கர். பாதுகாப்பான வாட்ஸ்அப் எச்சரிக்கைகள்.',
    cta_get_shield: 'வாகன ஷீல்டு பெறுக • ₹499',
    cta_try_scanner: 'லைவ் ஸ்கேனர் சோதிக்க',
    badge_privacy: '100% தனியுரிமை பாதுகாப்பு',
    badge_aligned: 'DPDP சட்டம் 2023 இணக்கமானது',
    badge_shield: 'சரிபார்க்கப்பட்ட வாகன ஷீல்டு',
    lang_current: 'தமி',
    need_help: 'உதவி தேவையா?',
    login_title: 'DEMO START-UP-க்கு வரவேற்கிறோம்',
    login_sub: 'உங்கள் வாகன ஷீல்டு, ஸ்கேன் எச்சரிக்கைகள் மற்றும் அவசர SOS தொடர்புகளை நிர்வகிக்கவும்.',
    login_step1_label: 'படி 1 / 2: மொபைல் எண்',
    login_step2_label: 'படி 2 / 2: சரிபார்ப்புக் குறியீடு',
    login_btn_get_otp: '6-இலக்க OTP பெறுக →',
    login_btn_verify: 'சரிபார்த்து டாஷ்போர்டை அணுகவும் →',
    scan_header: 'ஹூண்டாய் கிரெட்டா (வெள்ளை)',
    scan_reason_prompt: 'வாகன உரிமையாளரை நீங்கள் ஏன் தொடர்பு கொள்கிறீர்கள்?'
  }
};

let currentLanguage = localStorage.getItem('demo_startup_lang') || 'en';

// Set language and update all localized elements using innerHTML to preserve spans
function setLanguage(lang) {
  if (!I18N_STRINGS[lang]) lang = 'en';
  currentLanguage = lang;
  localStorage.setItem('demo_startup_lang', lang);

  // Update HTML for all elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (I18N_STRINGS[lang] && I18N_STRINGS[lang][key]) {
      el.innerHTML = I18N_STRINGS[lang][key];
    }
  });

  // Update language toggle button label
  const langLabelEl = document.getElementById('current-lang-text');
  if (langLabelEl && I18N_STRINGS[lang].lang_current) {
    langLabelEl.textContent = I18N_STRINGS[lang].lang_current;
  }

  // Update selected class in language sheet
  document.querySelectorAll('.lang-option-btn').forEach(btn => {
    btn.classList.toggle('selected', btn.getAttribute('data-lang') === lang);
  });
}
window.setLanguage = setLanguage;

// Toast Notification
function showToast(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      ${type === 'success' ? '<polyline points="20 6 9 17 4 12"></polyline>' : 
        type === 'error' ? '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>' : 
        '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>'}
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px)';
    setTimeout(() => toast.remove(), 250);
  }, 3200);
}
window.showToast = showToast;

// Ensure Floating WhatsApp Chip exists on page
function ensureFloatingWhatsApp() {
  if (!document.querySelector('.floating-whatsapp-chip')) {
    const chip = document.createElement('a');
    chip.href = SITE_CONFIG.whatsappUrl;
    chip.className = 'floating-whatsapp-chip';
    chip.target = '_blank';
    chip.rel = 'noopener noreferrer';
    chip.setAttribute('aria-label', 'Chat with Support on WhatsApp');
    chip.innerHTML = `
      <svg viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.581 1.761.819 2.796.819 3.18 0 5.767-2.587 5.767-5.766.001-3.182-2.585-5.766-5.767-5.766zm10.17 5.766c0 5.631-4.57 10.201-10.201 10.201-1.787 0-3.483-.464-4.965-1.278l-5.035 1.319 1.344-4.912c-.89-1.533-1.344-3.287-1.344-5.33 0-5.631 4.57-10.201 10.201-10.201 5.631 0 10.2 4.57 10.2 10.201z"/></svg>
      <span data-i18n="need_help">Need help?</span>
    `;
    document.body.appendChild(chip);
  }
}

// Initialize Shared UI and Interactivity
document.addEventListener('DOMContentLoaded', () => {
  // Ensure WhatsApp Help Chip is present
  ensureFloatingWhatsApp();

  // 1. Language Sheet Controls
  const langBtn = document.getElementById('lang-sheet-trigger');
  const langSheetBackdrop = document.getElementById('lang-bottom-sheet');
  const langCloseBtn = document.getElementById('close-lang-sheet');

  if (langBtn && langSheetBackdrop) {
    langBtn.addEventListener('click', () => {
      langSheetBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    });

    const closeSheet = () => {
      langSheetBackdrop.classList.remove('open');
      document.body.style.overflow = '';
    };

    if (langCloseBtn) langCloseBtn.addEventListener('click', closeSheet);
    langSheetBackdrop.addEventListener('click', (e) => {
      if (e.target === langSheetBackdrop) closeSheet();
    });

    // Language options selection
    document.querySelectorAll('.lang-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        setLanguage(lang);
        closeSheet();
        showToast(`Language switched to ${btn.querySelector('.lang-title').textContent}`, 'success');
      });
    });
  }

  // 2. Mobile Nav Drawer Controls
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const navDrawer = document.getElementById('mobile-nav-drawer');
  const closeDrawerBtn = document.getElementById('close-drawer-btn');

  if (menuToggle && navDrawer) {
    menuToggle.addEventListener('click', () => {
      navDrawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    });

    const closeDrawer = () => {
      navDrawer.classList.remove('open');
      document.body.style.overflow = '';
    };

    if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
    navDrawer.addEventListener('click', (e) => {
      if (e.target === navDrawer) closeDrawer();
    });
  }

  // 3. Highlight Active Navigation Links
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .drawer-link, .mobile-tab-item').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // 4. Global FAQ Accordion Toggle (Accessible with aria-expanded)
  document.querySelectorAll('.faq-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.faq-item');
      if (!item) return;
      const isOpen = item.classList.contains('open');

      const parent = item.parentElement;
      if (parent && parent.classList.contains('faq-accordion-list')) {
        parent.querySelectorAll('.faq-item').forEach(sibling => {
          if (sibling !== item) {
            sibling.classList.remove('open');
            const siblingBtn = sibling.querySelector('.faq-trigger');
            if (siblingBtn) siblingBtn.setAttribute('aria-expanded', 'false');
          }
        });
      }

      item.classList.toggle('open', !isOpen);
      trigger.setAttribute('aria-expanded', !isOpen);
    });
  });

  // 5. Global Keyboard accessibility (ESC closes modals, sheets, and drawers)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (langSheetBackdrop && langSheetBackdrop.classList.contains('open')) {
        langSheetBackdrop.classList.remove('open');
        document.body.style.overflow = '';
      }
      if (navDrawer && navDrawer.classList.contains('open')) {
        navDrawer.classList.remove('open');
        document.body.style.overflow = '';
      }
      document.querySelectorAll('dialog[open]').forEach(d => d.close());
    }
  });

  // 6. Initialize saved language
  setLanguage(currentLanguage);
});
