# 🛡️ DEMO START-UP — Smart QR Vehicle Shield (India)

A modern, responsive, multi-page web platform for smart QR vehicle contact stickers built strictly with semantic **HTML5**, **CSS3**, and **vanilla ES6 JavaScript** (zero external frameworks or build dependencies).

---

## 🚀 How to Run the Website (After Extracting the ZIP)

You can run and preview the website using any of the following convenient methods:

### Method 1: One-Click Executable Scripts (Easiest)
- **On Windows:** Double-click `start.bat`.
  - It automatically checks for Python, launches the local server, and opens `http://localhost:8000/index.html` in your default browser.
  - If Python is not installed, it automatically opens `index.html` directly in your browser.
- **On macOS / Linux:** Double-click or run `./start.sh` in the terminal:
  ```bash
  chmod +x start.sh
  ./start.sh
  ```

---

### Method 2: In Visual Studio (2017 / 2019 / 2022)
1. Double-click `DEMO_STARTUP.sln` to open the solution in Visual Studio.
2. In the Solution Explorer, right-click `index.html` and choose **"Set As Start Page"** (if not already set).
3. Press **`Ctrl + F5`** (or **`F5`**) to launch IIS Express and automatically open the site in your browser.

---

### Method 3: In Visual Studio Code
1. Open Visual Studio Code and choose **File > Open Folder...**, then select the extracted folder.
2. **Option A (Live Server Extension):** Right-click `index.html` and click **"Open with Live Server"** (or click "Go Live" on the bottom status bar).
3. **Option B (F5 Debugger):** Press **`F5`** to launch in Google Chrome or Microsoft Edge using the pre-configured `.vscode/launch.json`.
4. **Option C (Run Task):** Press `Ctrl + Shift + P` > `Tasks: Run Task` > select **"Start Local Web Server"** or **"Open Website in Default Browser"**.

---

### Method 4: Direct Double-Click (Zero Setup)
- Simply double-click **`index.html`** in your file manager.
- The entire project is 100% vanilla HTML5/CSS3/ES6 with local relative assets, so all 10 pages and interactions work instantly offline without a server.

---

### Method 5: Python / Node.js Command Line
- **Python 3:**
  ```bash
  python server.py
  # or
  python3 -m http.server 8000
  ```
  Then open `http://localhost:8000` in your browser.

- **Node.js (npx):**
  ```bash
  npx serve .
  # or
  npx http-server -p 8000
  ```

---

## 📁 Project Structure

```text
├── index.html            # 1. Homepage (Hero, simulated scan, reviews, FAQ, sticky top bar)
├── login.html            # 2. Owner Login (10-digit mobile, 6-box OTP auto-advance, 59s timer)
├── buy.html              # 3. 4-Step Checkout Stepper (Packs, registration, pincode, pricing)
├── scan.html             # 4. Stranger Scanner View (Reason tiles, masked call, SOS dialog)
├── dashboard.html        # 5. Owner Dashboard (Garage, incident filters, 90-day CSV export)
├── partner.html          # 6. Partner Program (Interactive profit slider, application form)
├── wholesale.html        # 7. Wholesale Portal (Volume tiers, proforma invoice form)
├── blog.html             # 8. Blog & Insights Hub (Live search, topic filters, reading modal)
├── guide.html            # 9. Installation & Care Handbook (3-step protocol, interactive tabs)
├── contact.html          # 10. Contact Support (Validation form, support hours 8 AM-11 PM)
│
├── css/
│   └── styles.css        # Shared "Kinetic Seal" stylesheet with CSS custom properties
├── js/
│   ├── main.js           # Shared config, multi-language engine, drawer, toasts, WhatsApp chip
│   ├── login.js          # Mobile & OTP input logic, timer, 1-tap WhatsApp simulation
│   ├── buy.js            # 4-step stepper, live quantity recalculation, promo code, payment modal
│   ├── scan.js           # Reason selection, car captcha, masked voice call, SOS confirmation
│   ├── dashboard.js      # Incident filter, dynamic 90-day CSV generator, referral copy
│   ├── partner.js        # Profit simulator slider (15%-25% commission tiers), partner form
│   └── wholesale.js      # Volume tier sync, proforma invoice request form
├── assets/               # Scalable vector graphics (Logo, decals, avatars, illustrations)
│
├── .vscode/              # Visual Studio Code configurations (launch, tasks, settings)
├── DEMO_STARTUP.sln      # Visual Studio Solution file (VS 2017/2019/2022)
├── server.py             # Cross-platform lightweight Python HTTP server launcher
├── start.bat             # 1-click Windows startup script
├── start.sh              # 1-click macOS / Linux startup script
└── README.md             # Project documentation and launch instructions
```

---

## 🎨 Design System: "Kinetic Seal"
- **Palette:** `--primary` `#0F4C5C`, `--cta` `#E8502E`, `--success` `#2A7261`, `--text` `#1E2A32`, `--sos` `#D9383A`, Warm Cream `#FBF6EE`.
- **Typography:** Google Fonts **Sora** (headings, display, OTP numerals) and **DM Sans** (body, labels).
- **Sticker Badges:** Micro-shadowed badges tilted 2-3° (`transform: rotate()`).
- **Accessibility:** Minimum 44px touch targets, WCAG 4.5:1 contrast ratios, visible `:focus-visible` outlines, semantic ARIA attributes, and `prefers-reduced-motion` compliance.

---

## 📞 Support & Contact Information
- **Phone / WhatsApp:** +91 93165 49161
- **Email:** mr7763510@gmail.com
- **Operating Hours:** 8:00 AM – 11:00 PM IST (Mon – Sun)
