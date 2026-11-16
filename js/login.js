/**
 * DEMO START-UP - Login Script (login.js)
 * Step 1: Mobile +91 check
 * Step 2: 6-digit OTP with auto-advance, backspace, paste, Enter key, and 59s timer
 * WhatsApp 1-tap & Hindi/English quick toggle
 */

document.addEventListener('DOMContentLoaded', () => {
  const step1 = document.getElementById('login-step-1');
  const step2 = document.getElementById('login-step-2');
  const phoneInput = document.getElementById('login-phone');
  const phoneCheck = document.getElementById('phone-valid-check');
  const btnGetOtp = document.getElementById('btn-get-otp');
  const displayPhone = document.getElementById('display-user-phone');
  const btnEditPhone = document.getElementById('btn-edit-phone');
  const otpInputs = document.querySelectorAll('.otp-box');
  const btnVerifyOtp = document.getElementById('btn-verify-otp');
  const resendTimerEl = document.getElementById('resend-timer');
  const resendBtn = document.getElementById('btn-resend-otp');
  const whatsapp1Tap = document.getElementById('btn-whatsapp-login');
  const langToggleBtn = document.getElementById('login-lang-toggle');

  let countdownInterval = null;
  let remainingSeconds = 59;

  // Phone input validation (10 digits)
  if (phoneInput) {
    phoneInput.addEventListener('input', () => {
      phoneInput.value = phoneInput.value.replace(/\D/g, '').slice(0, 10);
      const isValid = phoneInput.value.length === 10;
      if (phoneCheck) phoneCheck.classList.toggle('active', isValid);
      if (btnGetOtp) btnGetOtp.disabled = !isValid;
    });

    phoneInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && phoneInput.value.length === 10) {
        e.preventDefault();
        btnGetOtp.click();
      }
    });
  }

  // Timer function
  function startResendTimer() {
    clearInterval(countdownInterval);
    remainingSeconds = 59;
    if (resendBtn) {
      resendBtn.disabled = true;
      resendBtn.style.opacity = '0.5';
    }
    
    countdownInterval = setInterval(() => {
      remainingSeconds--;
      const formatted = remainingSeconds < 10 ? `00:0${remainingSeconds}` : `00:${remainingSeconds}`;
      if (resendTimerEl) resendTimerEl.textContent = formatted;

      if (remainingSeconds <= 0) {
        clearInterval(countdownInterval);
        if (resendBtn) {
          resendBtn.disabled = false;
          resendBtn.style.opacity = '1';
        }
      }
    }, 1000);
  }

  // Step 1 -> Step 2 transition
  if (btnGetOtp) {
    btnGetOtp.addEventListener('click', () => {
      const phone = phoneInput ? phoneInput.value.trim() : '';
      if (phone.length !== 10) {
        if (phoneInput) phoneInput.classList.add('error');
        window.showToast('Please enter a valid 10-digit mobile number', 'error');
        return;
      }

      if (phoneInput) phoneInput.classList.remove('error');
      if (displayPhone) displayPhone.textContent = `+91 ${phone.slice(0, 5)} ${phone.slice(5)}`;
      step1.style.display = 'none';
      step2.style.display = 'block';

      // Clear & focus first OTP box
      otpInputs.forEach(input => input.value = '');
      if (otpInputs[0]) otpInputs[0].focus();

      startResendTimer();
      window.showToast('Demo OTP sent: 882014', 'info');
    });
  }

  // Edit Phone (back to step 1)
  if (btnEditPhone) {
    btnEditPhone.addEventListener('click', () => {
      clearInterval(countdownInterval);
      step2.style.display = 'none';
      step1.style.display = 'block';
      if (phoneInput) phoneInput.focus();
    });
  }

  // 6-box OTP auto-advancing, backspace, Enter, and paste support
  otpInputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
      const val = e.target.value.replace(/\D/g, '');
      e.target.value = val ? val[val.length - 1] : '';

      if (e.target.value && index < otpInputs.length - 1) {
        otpInputs[index + 1].focus();
      }

      checkOtpFilled();
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace') {
        if (!input.value && index > 0) {
          otpInputs[index - 1].focus();
        }
      } else if (e.key === 'ArrowLeft' && index > 0) {
        otpInputs[index - 1].focus();
      } else if (e.key === 'ArrowRight' && index < otpInputs.length - 1) {
        otpInputs[index + 1].focus();
      } else if (e.key === 'Enter') {
        const otp = getEnteredOtp();
        if (otp.length === 6 && btnVerifyOtp) {
          e.preventDefault();
          btnVerifyOtp.click();
        }
      }
    });

    // Paste handling
    input.addEventListener('paste', (e) => {
      e.preventDefault();
      const pasteData = (e.clipboardData || window.clipboardData).getData('text').replace(/\D/g, '').slice(0, 6);
      if (pasteData) {
        pasteData.split('').forEach((char, i) => {
          if (otpInputs[i]) otpInputs[i].value = char;
        });
        if (otpInputs[pasteData.length - 1]) {
          otpInputs[pasteData.length - 1].focus();
        }
        checkOtpFilled();
      }
    });
  });

  function getEnteredOtp() {
    return Array.from(otpInputs).map(input => input.value).join('');
  }

  function checkOtpFilled() {
    const otp = getEnteredOtp();
    if (btnVerifyOtp) {
      btnVerifyOtp.disabled = otp.length !== 6;
    }
  }

  // Verify OTP Action
  if (btnVerifyOtp) {
    btnVerifyOtp.addEventListener('click', () => {
      const otp = getEnteredOtp();
      if (otp.length < 6) {
        window.showToast('Please enter all 6 digits', 'error');
        return;
      }

      btnVerifyOtp.disabled = true;
      btnVerifyOtp.textContent = 'Verifying...';

      setTimeout(() => {
        window.showToast('Identity verified! Welcome Rahul', 'success');
        setTimeout(() => {
          window.location.href = 'dashboard.html';
        }, 800);
      }, 700);
    });
  }

  // Resend OTP
  if (resendBtn) {
    resendBtn.addEventListener('click', () => {
      if (remainingSeconds > 0) return;
      startResendTimer();
      window.showToast('Fresh OTP sent to your WhatsApp & SMS: 449210', 'info');
    });
  }

  // WhatsApp 1-tap login
  if (whatsapp1Tap) {
    whatsapp1Tap.addEventListener('click', () => {
      window.showToast('Authenticating via WhatsApp relay...', 'info');
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 900);
    });
  }

  // Language toggle button inside login card
  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      const nextLang = (localStorage.getItem('demo_startup_lang') === 'hi') ? 'en' : 'hi';
      if (typeof window.setLanguage === 'function') {
        window.setLanguage(nextLang);
      }
    });
  }
});
