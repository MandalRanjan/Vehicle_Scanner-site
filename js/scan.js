/**
 * DEMO START-UP - Scanner Interface Script (scan.js)
 * What a stranger sees when scanning a vehicle sticker
 * Six reasons, quick notes, human verification, masked WhatsApp & masked call,
 * Emergency SOS native <dialog> confirmation.
 */

document.addEventListener('DOMContentLoaded', () => {
  let selectedReason = 'Car is Blocking';
  let isHumanVerified = false;

  // DOM Elements
  const reasonCards = document.querySelectorAll('.scan-reason-tile');
  const quickChips = document.querySelectorAll('.quick-note-chip');
  const customNoteInput = document.getElementById('scan-custom-note');
  const btnSendAlert = document.getElementById('btn-send-whatsapp-alert');
  const btnMaskedCall = document.getElementById('btn-masked-call');
  const verifyIconButtons = document.querySelectorAll('.verify-icon-btn');
  const verifyStatusMsg = document.getElementById('verify-status-msg');

  // SOS Dialog
  const sosTriggerBtn = document.getElementById('btn-sos-trigger');
  const sosDialog = document.getElementById('sos-confirm-dialog');
  const sosCancelBtn = document.getElementById('btn-sos-cancel');
  const sosConfirmBtn = document.getElementById('btn-sos-confirm');
  const sosSuccessCard = document.getElementById('sos-success-state');

  // Language Chips inside Scanner
  const scanLangChips = document.querySelectorAll('.scan-lang-chip');
  scanLangChips.forEach(chip => {
    chip.addEventListener('click', () => {
      scanLangChips.forEach(c => c.classList.remove('selected'));
      chip.classList.add('selected');
      const lang = chip.getAttribute('data-lang');
      if (typeof window.setLanguage === 'function') {
        window.setLanguage(lang);
      }
      window.showToast(`Scanner translated to ${chip.textContent.trim()}`, 'info');
    });
  });

  // Reason Selection
  reasonCards.forEach(tile => {
    tile.addEventListener('click', () => {
      reasonCards.forEach(t => t.classList.remove('selected'));
      tile.classList.add('selected');
      selectedReason = tile.getAttribute('data-reason');
      
      // Auto-populate relevant default note
      if (customNoteInput && !customNoteInput.value) {
        customNoteInput.value = `Alert: ${selectedReason}. Please check your vehicle.`;
      }
    });
  });

  // Quick-note Chips
  quickChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const text = chip.getAttribute('data-text') || chip.textContent.trim();
      if (customNoteInput) {
        customNoteInput.value = text;
        customNoteInput.focus();
      }
      window.showToast('Note inserted', 'info');
    });
  });

  // Anti-Spam Human Verification: Click the Car icon
  verifyIconButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const iconType = btn.getAttribute('data-icon');
      verifyIconButtons.forEach(b => b.classList.remove('selected', 'wrong'));

      if (iconType === 'car') {
        btn.classList.add('selected');
        isHumanVerified = true;
        if (verifyStatusMsg) {
          verifyStatusMsg.className = 'status-check';
          verifyStatusMsg.innerHTML = '✔ Verified! Ready to send notification.';
        }
        window.showToast('Human verification passed', 'success');
      } else {
        btn.classList.add('wrong');
        isHumanVerified = false;
        if (verifyStatusMsg) {
          verifyStatusMsg.className = 'status-cross';
          verifyStatusMsg.innerHTML = '✖ Please select the Car icon.';
        }
        window.showToast('Please select the Car icon to verify', 'error');
      }
    });
  });

  // Send Instant WhatsApp Alert
  if (btnSendAlert) {
    btnSendAlert.addEventListener('click', () => {
      if (!isHumanVerified) {
        window.showToast('Please tap the Car icon below to verify you are human', 'error');
        const verifier = document.getElementById('verification-card');
        if (verifier) verifier.scrollIntoView({ behavior: 'smooth' });
        return;
      }

      const note = customNoteInput ? customNoteInput.value.trim() : '';
      btnSendAlert.disabled = true;
      btnSendAlert.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin">
          <circle cx="12" cy="12" r="10"></circle><path d="M12 2a10 10 0 0 1 10 10"></path>
        </svg>
        Transmitting Masked Alert...
      `;

      setTimeout(() => {
        btnSendAlert.disabled = false;
        btnSendAlert.textContent = 'Alert Sent Successfully!';
        window.showToast('Alert delivered to owner\'s WhatsApp with masked relay!', 'success');
        
        // Show simulated delivered card
        const resultCard = document.getElementById('scan-result-card');
        if (resultCard) {
          resultCard.style.display = 'block';
          resultCard.scrollIntoView({ behavior: 'smooth' });
        }
      }, 1100);
    });
  }

  // Masked Voice Call (Private Relay)
  if (btnMaskedCall) {
    btnMaskedCall.addEventListener('click', () => {
      if (!isHumanVerified) {
        window.showToast('Please verify by selecting the Car icon first', 'error');
        return;
      }
      
      const callDialog = document.getElementById('masked-call-dialog');
      if (callDialog) {
        callDialog.showModal();
      } else {
        window.showToast('Connecting to private virtual exchange relay...', 'info');
        setTimeout(() => {
          window.location.href = SITE_CONFIG.phoneTel;
        }, 800);
      }
    });
  }

  // Close Call Dialog
  const callCloseBtn = document.getElementById('btn-close-call-dialog');
  if (callCloseBtn) {
    callCloseBtn.addEventListener('click', () => {
      const callDialog = document.getElementById('masked-call-dialog');
      if (callDialog) callDialog.close();
    });
  }

  // SOS Emergency Native Dialog Flow
  if (sosTriggerBtn && sosDialog) {
    sosTriggerBtn.addEventListener('click', () => {
      sosDialog.showModal();
    });
  }

  if (sosCancelBtn && sosDialog) {
    sosCancelBtn.addEventListener('click', () => {
      sosDialog.close();
    });
  }

  if (sosConfirmBtn && sosDialog) {
    sosConfirmBtn.addEventListener('click', () => {
      sosConfirmBtn.disabled = true;
      sosConfirmBtn.textContent = 'Transmitting SOS Relay...';

      setTimeout(() => {
        sosDialog.close();
        sosConfirmBtn.disabled = false;
        sosConfirmBtn.textContent = 'Confirm Emergency SOS Alert';

        if (sosSuccessCard) {
          sosSuccessCard.style.display = 'block';
          sosSuccessCard.scrollIntoView({ behavior: 'smooth' });
        }
        window.showToast('CRITICAL SOS ALERT SENT to 3 emergency contacts & ambulance relay!', 'error');
      }, 1200);
    });
  }
});
