/**
 * DEMO START-UP - Wholesale Portal Script (wholesale.js)
 * Volume Tier Selector, Proforma Invoice Form Submission & Reset
 */

document.addEventListener('DOMContentLoaded', () => {
  const tierCards = document.querySelectorAll('.wholesale-tier-card');
  const tierSelectDropdown = document.getElementById('wholesale-tier-select');
  const wholesaleForm = document.getElementById('wholesale-inquiry-form');
  const successNotice = document.getElementById('wholesale-success-state');

  // Sync tier card selection with form dropdown
  tierCards.forEach(card => {
    card.addEventListener('click', () => {
      tierCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      const tierVal = card.getAttribute('data-tier');
      if (tierSelectDropdown) {
        tierSelectDropdown.value = tierVal;
      }
      const formEl = document.getElementById('invoice-form-section');
      if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Wholesale Form Submission
  if (wholesaleForm) {
    wholesaleForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const company = document.getElementById('ws-company').value.trim();
      const person = document.getElementById('ws-person').value.trim();
      const phone = document.getElementById('ws-phone').value.trim();
      const email = document.getElementById('ws-email').value.trim();
      const pincode = document.getElementById('ws-pincode').value.trim();

      if (!company || !person || !phone || !email || !pincode) {
        window.showToast('Please fill all required business fields', 'error');
        return;
      }

      if (phone.length < 10) {
        window.showToast('Please enter a valid 10-digit WhatsApp number', 'error');
        return;
      }

      const submitBtn = wholesaleForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Generating Proforma Invoice...';
      }

      setTimeout(() => {
        wholesaleForm.style.display = 'none';
        if (successNotice) {
          successNotice.style.display = 'block';
          successNotice.scrollIntoView({ behavior: 'smooth' });
        }
        window.showToast('Proforma Invoice & Tax Quotation generated and emailed!', 'success');
      }, 900);
    });
  }

  // Reset form handler
  const resetBtn = document.getElementById('btn-reset-wholesale-form');
  if (resetBtn && wholesaleForm && successNotice) {
    resetBtn.addEventListener('click', () => {
      wholesaleForm.reset();
      const submitBtn = wholesaleForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Generate & Email Proforma Invoice →';
      }
      successNotice.style.display = 'none';
      wholesaleForm.style.display = 'block';
      wholesaleForm.scrollIntoView({ behavior: 'smooth' });
    });
  }
});
