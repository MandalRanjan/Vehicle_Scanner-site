/**
 * DEMO START-UP - Partner Program Script (partner.js)
 * Commission Calculator / Profit Slider, Business Type Selector,
 * and Application Form Validation with Success State & Reset.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Profit Simulator Slider
  const slider = document.getElementById('tags-slider');
  const displayTags = document.getElementById('slider-tags-val');
  const displayRate = document.getElementById('slider-commission-rate');
  const displayMonthly = document.getElementById('slider-monthly-earnings');
  const displayAnnual = document.getElementById('slider-annual-earnings');

  const TAG_PRICE = 499;

  function updateSimulator() {
    if (!slider) return;
    const count = parseInt(slider.value, 10);
    
    // Commission Tier Calculation
    let rate = 0.15; // 15% for under 50
    if (count >= 200) {
      rate = 0.25; // 25%
    } else if (count >= 50) {
      rate = 0.20; // 20%
    }

    const monthlyRevenue = count * TAG_PRICE;
    const monthlyCommission = Math.round(monthlyRevenue * rate);
    const annualCommission = monthlyCommission * 12;

    if (displayTags) displayTags.textContent = `${count} Tags`;
    if (displayRate) displayRate.textContent = `${Math.round(rate * 100)}% Commission`;
    if (displayMonthly) displayMonthly.textContent = `₹${monthlyCommission.toLocaleString('en-IN')}`;
    if (displayAnnual) displayAnnual.textContent = `₹${annualCommission.toLocaleString('en-IN')}/yr`;
  }

  if (slider) {
    slider.addEventListener('input', updateSimulator);
    updateSimulator();
  }

  // Business Type Selection Chips
  const typeChips = document.querySelectorAll('.partner-type-chip');
  let selectedBusinessType = 'Auto Workshop / Garage';

  typeChips.forEach(chip => {
    chip.addEventListener('click', () => {
      typeChips.forEach(c => c.classList.remove('selected'));
      chip.classList.add('selected');
      selectedBusinessType = chip.getAttribute('data-type') || chip.textContent.trim();
    });
  });

  // Partner Application Form Handling
  const partnerForm = document.getElementById('partner-application-form');
  const successState = document.getElementById('partner-success-state');

  if (partnerForm) {
    partnerForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('partner-name').value.trim();
      const bname = document.getElementById('partner-business').value.trim();
      const phone = document.getElementById('partner-phone').value.trim();
      const email = document.getElementById('partner-email').value.trim();
      const city = document.getElementById('partner-city').value.trim();
      const consent = document.getElementById('partner-consent').checked;

      if (!name || !bname || !phone || !email || !city || !consent) {
        window.showToast('Please fill all mandatory fields and accept terms', 'error');
        return;
      }

      if (phone.length < 10) {
        window.showToast('Please enter a valid 10-digit WhatsApp phone number', 'error');
        return;
      }

      // Submit simulation
      const submitBtn = partnerForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Registering Partner Profile...';
      }

      setTimeout(() => {
        partnerForm.style.display = 'none';
        if (successState) {
          successState.style.display = 'block';
          successState.scrollIntoView({ behavior: 'smooth' });
        }
        window.showToast('Welcome to Partner Hub! Kit dispatch team will contact you within 2 hours.', 'success');
      }, 900);
    });
  }

  // Reset / submit another button
  const resetBtn = document.getElementById('btn-reset-partner-form');
  if (resetBtn && partnerForm && successState) {
    resetBtn.addEventListener('click', () => {
      partnerForm.reset();
      const submitBtn = partnerForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Partner Application →';
      }
      successState.style.display = 'none';
      partnerForm.style.display = 'block';
      partnerForm.scrollIntoView({ behavior: 'smooth' });
    });
  }
});
