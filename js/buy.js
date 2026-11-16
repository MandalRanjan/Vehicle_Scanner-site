/**
 * DEMO START-UP - Buy & Checkout Flow (buy.js)
 * 4-Step Checkout Stepper:
 * 1. Pack Selection & Quantity (15% bulk discount for 2+ packs)
 * 2. Vehicle Type & Registration Details
 * 3. Delivery Address with Pincode City Auto-detect & Promo Code
 * 4. Price Breakdown & UPI/Card Payment Simulation
 */

document.addEventListener('DOMContentLoaded', () => {
  // Pricing Model
  const PACKS = {
    twin: { name: 'Physical Twin Pack (2 Tags)', price: 499, basePrice: 499 },
    digital: { name: 'Instant Digital E-Tag', price: 199, basePrice: 199 },
    bike: { name: 'Bike & Helmet Dual Pack', price: 349, basePrice: 349 }
  };

  let selectedPack = 'twin';
  let quantity = 1;
  let promoDiscount = 0;
  let currentStep = 1;
  let paymentInterval = null;

  // City lookup by pincode prefix
  const PINCODE_MAP = {
    '400': 'Mumbai, Maharashtra',
    '411': 'Pune, Maharashtra',
    '110': 'New Delhi, Delhi',
    '560': 'Bengaluru, Karnataka',
    '500': 'Hyderabad, Telangana',
    '600': 'Chennai, Tamil Nadu',
    '700': 'Kolkata, West Bengal',
    '380': 'Ahmedabad, Gujarat',
    '302': 'Jaipur, Rajasthan',
    '201': 'Noida, Uttar Pradesh',
    '122': 'Gurugram, Haryana'
  };

  // DOM Elements
  const packCards = document.querySelectorAll('.pack-select-card');
  const qtyMinus = document.getElementById('qty-minus');
  const qtyPlus = document.getElementById('qty-plus');
  const qtyDisplay = document.getElementById('qty-display');
  const bulkDiscountNotice = document.getElementById('bulk-discount-notice');

  const stepSections = document.querySelectorAll('.checkout-step-panel');
  const stepperItems = document.querySelectorAll('.stepper-nav .step-item');
  const btnNext = document.querySelectorAll('.btn-step-next');
  const btnBack = document.querySelectorAll('.btn-step-back');

  // Step 2 elements
  const vehicleChips = document.querySelectorAll('.vehicle-chip');
  const regNumberInput = document.getElementById('reg-number');
  const ownerNameInput = document.getElementById('owner-name');
  const ownerPhoneInput = document.getElementById('owner-phone');

  // Step 3 elements
  const pincodeInput = document.getElementById('pincode-input');
  const cityStateInput = document.getElementById('city-state-input');
  const gstinToggle = document.getElementById('gstin-toggle');
  const gstinFields = document.getElementById('gstin-fields');
  const promoInput = document.getElementById('promo-input');
  const promoApplyBtn = document.getElementById('btn-apply-promo');
  const promoMsg = document.getElementById('promo-message');

  // Step 4 Summary elements
  const summaryPackName = document.getElementById('summary-pack-name');
  const summaryQty = document.getElementById('summary-qty');
  const summarySubtotal = document.getElementById('summary-subtotal');
  const summaryDiscountRow = document.getElementById('summary-discount-row');
  const summaryDiscount = document.getElementById('summary-discount');
  const summaryPromoRow = document.getElementById('summary-promo-row');
  const summaryPromo = document.getElementById('summary-promo');
  const summaryGst = document.getElementById('summary-gst');
  const summaryTotal = document.getElementById('summary-total');
  const btnPayNow = document.getElementById('btn-pay-now');
  const paymentDialog = document.getElementById('payment-modal');
  const btnCancelPayment = document.getElementById('btn-cancel-payment');

  // Pack Selection
  packCards.forEach(card => {
    card.addEventListener('click', () => {
      packCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      const radio = card.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
      selectedPack = card.getAttribute('data-pack') || 'twin';
      updatePriceCalculations();
    });
  });

  // Quantity Stepper
  if (qtyMinus && qtyPlus && qtyDisplay) {
    qtyMinus.addEventListener('click', () => {
      if (quantity > 1) {
        quantity--;
        qtyDisplay.textContent = quantity;
        updatePriceCalculations();
      }
    });

    qtyPlus.addEventListener('click', () => {
      if (quantity < 10) {
        quantity++;
        qtyDisplay.textContent = quantity;
        updatePriceCalculations();
      }
    });
  }

  // Price & Discount Calculation
  function updatePriceCalculations() {
    const pack = PACKS[selectedPack] || PACKS.twin;
    let baseTotal = pack.price * quantity;
    let bulkDiscount = 0;

    // 15% discount for 2 or more packs
    if (quantity >= 2) {
      bulkDiscount = Math.round(baseTotal * 0.15);
      if (bulkDiscountNotice) bulkDiscountNotice.style.display = 'block';
    } else {
      if (bulkDiscountNotice) bulkDiscountNotice.style.display = 'none';
    }

    let taxableAmount = baseTotal - bulkDiscount - promoDiscount;
    if (taxableAmount < 0) taxableAmount = 0;

    // Included 18% GST breakdown
    let gstAmount = Math.round(taxableAmount * 0.18 / 1.18);
    let finalPayable = taxableAmount;

    // Update DOM
    if (summaryPackName) summaryPackName.textContent = pack.name;
    if (summaryQty) summaryQty.textContent = `${quantity} ${quantity > 1 ? 'packs' : 'pack'}`;
    if (summarySubtotal) summarySubtotal.textContent = `₹${baseTotal}`;

    if (summaryDiscountRow && summaryDiscount) {
      if (bulkDiscount > 0) {
        summaryDiscountRow.style.display = 'flex';
        summaryDiscount.textContent = `-₹${bulkDiscount} (15% Off)`;
      } else {
        summaryDiscountRow.style.display = 'none';
      }
    }

    if (summaryPromoRow && summaryPromo) {
      if (promoDiscount > 0) {
        summaryPromoRow.style.display = 'flex';
        summaryPromo.textContent = `-₹${promoDiscount}`;
      } else {
        summaryPromoRow.style.display = 'none';
      }
    }

    if (summaryGst) summaryGst.textContent = `₹${gstAmount}`;
    if (summaryTotal) summaryTotal.textContent = `₹${finalPayable}`;
    if (btnPayNow) {
      btnPayNow.textContent = `Proceed to Pay ₹${finalPayable} via UPI / Card`;
    }
  }

  // Vehicle Type Chips
  vehicleChips.forEach(chip => {
    chip.addEventListener('click', () => {
      vehicleChips.forEach(c => c.classList.remove('selected'));
      chip.classList.add('selected');
    });
  });

  // Registration Number formatting (e.g. MH 02 AB 1234)
  if (regNumberInput) {
    regNumberInput.addEventListener('input', (e) => {
      let val = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
      if (val.length > 10) val = val.slice(0, 10);
      e.target.value = val;
    });
  }

  // Pincode auto-lookup
  if (pincodeInput && cityStateInput) {
    pincodeInput.addEventListener('input', (e) => {
      const pin = e.target.value.replace(/\D/g, '').slice(0, 6);
      e.target.value = pin;

      if (pin.length >= 3) {
        const prefix = pin.slice(0, 3);
        if (PINCODE_MAP[prefix]) {
          cityStateInput.value = PINCODE_MAP[prefix];
        } else if (pin.length === 6) {
          cityStateInput.value = 'India (Standard Delivery)';
        }
      }
    });
  }

  // GSTIN Toggle
  if (gstinToggle && gstinFields) {
    gstinToggle.addEventListener('change', () => {
      gstinFields.style.display = gstinToggle.checked ? 'block' : 'none';
    });
  }

  // Promo Code Validation (WELCOME10 gives -₹50)
  if (promoApplyBtn && promoInput) {
    promoApplyBtn.addEventListener('click', () => {
      const code = promoInput.value.trim().toUpperCase();
      if (code === 'WELCOME10') {
        promoDiscount = 50;
        promoMsg.className = 'form-hint status-check';
        promoMsg.innerHTML = '✔ Coupon WELCOME10 applied! ₹50 Instant discount added.';
        window.showToast('Coupon WELCOME10 applied: ₹50 Saved!', 'success');
        updatePriceCalculations();
      } else if (code === '') {
        promoMsg.className = 'form-error-msg';
        promoMsg.style.display = 'block';
        promoMsg.textContent = 'Please enter a coupon code';
      } else {
        promoDiscount = 0;
        promoMsg.className = 'form-error-msg';
        promoMsg.style.display = 'block';
        promoMsg.textContent = 'Invalid promo code. Try WELCOME10';
        window.showToast('Invalid coupon code. Try WELCOME10', 'error');
        updatePriceCalculations();
      }
    });
  }

  // Sequential Step Validation
  function validateStep(step) {
    if (step === 1) return true;
    if (step === 2) {
      const reg = regNumberInput ? regNumberInput.value.trim() : '';
      const name = ownerNameInput ? ownerNameInput.value.trim() : '';
      const phone = ownerPhoneInput ? ownerPhoneInput.value.trim() : '';

      if (!reg || reg.length < 6) {
        window.showToast('Please enter your vehicle registration number', 'error');
        if (regNumberInput) regNumberInput.focus();
        return false;
      }
      if (!name || name.length < 2) {
        window.showToast('Please enter the owner full name', 'error');
        if (ownerNameInput) ownerNameInput.focus();
        return false;
      }
      if (!phone || phone.length < 10) {
        window.showToast('Please enter a valid 10-digit WhatsApp number', 'error');
        if (ownerPhoneInput) ownerPhoneInput.focus();
        return false;
      }
      return true;
    }
    if (step === 3) {
      const pin = pincodeInput ? pincodeInput.value.trim() : '';
      if (!pin || pin.length < 6) {
        window.showToast('Please enter a valid 6-digit delivery pincode', 'error');
        if (pincodeInput) pincodeInput.focus();
        return false;
      }
      return true;
    }
    return true;
  }

  // Stepper Navigation Logic
  function goToStep(targetStep) {
    if (targetStep < 1 || targetStep > 4) return;

    // If moving forward, validate all preceding steps
    if (targetStep > currentStep) {
      for (let s = currentStep; s < targetStep; s++) {
        if (!validateStep(s)) {
          return;
        }
      }
    }

    currentStep = targetStep;

    // Update panels
    stepSections.forEach(panel => {
      const panelStep = parseInt(panel.getAttribute('data-step'), 10);
      panel.style.display = panelStep === currentStep ? 'block' : 'none';
    });

    // Update Stepper Nav
    stepperItems.forEach(item => {
      const itemStep = parseInt(item.getAttribute('data-step'), 10);
      item.classList.remove('active', 'done');
      if (itemStep === currentStep) {
        item.classList.add('active');
        const circle = item.querySelector('.step-circle');
        if (circle) circle.innerHTML = itemStep;
      } else if (itemStep < currentStep) {
        item.classList.add('done');
        const circle = item.querySelector('.step-circle');
        if (circle) circle.innerHTML = '✔';
      } else {
        const circle = item.querySelector('.step-circle');
        if (circle) circle.innerHTML = itemStep;
      }
    });

    window.scrollTo({ top: 120, behavior: 'smooth' });
    updatePriceCalculations();
  }

  // Step Next / Back button clicks
  btnNext.forEach(btn => {
    btn.addEventListener('click', () => goToStep(currentStep + 1));
  });

  btnBack.forEach(btn => {
    btn.addEventListener('click', () => goToStep(currentStep - 1));
  });

  // Step item click navigation
  stepperItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetStep = parseInt(item.getAttribute('data-step'), 10);
      goToStep(targetStep);
    });
  });

  // Payment Execution Simulation
  if (btnPayNow) {
    btnPayNow.addEventListener('click', () => {
      btnPayNow.disabled = true;
      btnPayNow.textContent = 'Opening Secure UPI Gateway...';

      if (paymentDialog) {
        paymentDialog.showModal();
        const countdownEl = document.getElementById('payment-timer');
        let timer = 3;
        if (countdownEl) countdownEl.textContent = '3s';

        clearInterval(paymentInterval);
        paymentInterval = setInterval(() => {
          timer--;
          if (countdownEl) countdownEl.textContent = `${timer}s`;
          if (timer <= 0) {
            clearInterval(paymentInterval);
            paymentDialog.close();
            window.showToast('Payment Approved! Vehicle Shield registered.', 'success');
            setTimeout(() => {
              window.location.href = 'dashboard.html';
            }, 800);
          }
        }, 1000);
      } else {
        setTimeout(() => {
          window.showToast('Payment Approved! Order confirmed.', 'success');
          setTimeout(() => {
            window.location.href = 'dashboard.html';
          }, 800);
        }, 1200);
      }
    });
  }

  // Cancel Payment Modal
  if (btnCancelPayment && paymentDialog) {
    btnCancelPayment.addEventListener('click', () => {
      clearInterval(paymentInterval);
      paymentDialog.close();
      if (btnPayNow) {
        btnPayNow.disabled = false;
        updatePriceCalculations();
      }
      window.showToast('Payment transaction canceled', 'info');
    });
  }

  // Initial calculation
  updatePriceCalculations();
});
