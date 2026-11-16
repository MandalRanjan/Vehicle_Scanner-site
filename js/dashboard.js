/**
 * DEMO START-UP - Owner Dashboard Script (dashboard.js)
 * Live stats, Garage toggles, Incident log filtering & CSV export,
 * SOS Emergency contacts, DND toggle, and Referral Code Copy.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Incident Data for Filtering and CSV Export
  const INCIDENTS_DATA = [
    { id: 'INC-8821', date: '2026-11-14 18:24', vehicle: 'Hyundai Creta (MH 02 8820)', reason: 'Car is Blocking', location: 'Bandra West, Mumbai', method: 'WhatsApp Alert', status: 'Resolved' },
    { id: 'INC-8819', date: '2026-11-12 21:05', vehicle: 'Hyundai Creta (MH 02 8820)', reason: 'Lights/Window', location: 'Phoenix Palladium, Lower Parel', method: 'WhatsApp Alert', status: 'Resolved' },
    { id: 'INC-8794', date: '2026-11-09 14:12', vehicle: 'Ather 450X (MH 02 1042)', reason: 'Towing Alert', location: 'Linking Road, Bandra', method: 'Masked Call', status: 'Attended' },
    { id: 'INC-8750', date: '2026-11-04 11:30', vehicle: 'Hyundai Creta (MH 02 8820)', reason: 'Minor Dent/Touch', location: 'BKC Ground, Mumbai', method: 'WhatsApp Alert', status: 'Resolved' },
    { id: 'INC-8692', date: '2026-10-28 09:15', vehicle: 'Hyundai Creta (MH 02 8820)', reason: 'Car is Blocking', location: 'Society Gate 2, Andheri', method: 'WhatsApp Alert', status: 'Resolved' },
    { id: 'INC-8610', date: '2026-10-18 22:45', vehicle: 'Hyundai Creta (MH 02 8820)', reason: 'Alarm Ringing', location: 'Inorbit Mall, Malad', method: 'WhatsApp Alert', status: 'Checked' },
    { id: 'INC-8540', date: '2026-10-02 16:50', vehicle: 'Ather 450X (MH 02 1042)', reason: 'Car is Blocking', location: 'Churchgate Station', method: 'WhatsApp Alert', status: 'Resolved' }
  ];

  // Incident Filtering
  const filterButtons = document.querySelectorAll('.incident-filter-btn');
  const incidentRows = document.querySelectorAll('.incident-row');
  const incidentContainer = document.querySelector('.incident-list-container');

  // Create empty state element if not exists
  let emptyState = document.getElementById('no-incidents-msg');
  if (!emptyState && incidentContainer) {
    emptyState = document.createElement('div');
    emptyState.id = 'no-incidents-msg';
    emptyState.className = 'empty-state-card';
    emptyState.style.display = 'none';
    emptyState.innerHTML = `
      <div style="font-size:24px; margin-bottom:6px;">🛡️</div>
      <strong style="color:var(--text); font-size:14px; display:block;">No Incidents in this Category</strong>
      <p style="font-size:12px; margin-top:2px;">All clear! No alerts recorded under this filter.</p>
    `;
    incidentContainer.appendChild(emptyState);
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      let visibleCount = 0;

      incidentRows.forEach(row => {
        const type = row.getAttribute('data-type');
        if (filter === 'all' || type === filter) {
          row.style.display = '';
          visibleCount++;
        } else {
          row.style.display = 'none';
        }
      });

      if (emptyState) {
        emptyState.style.display = (visibleCount === 0) ? 'block' : 'none';
      }
    });
  });

  // Client-Side CSV Export (90-day Incident Log)
  const btnExportCsv = document.getElementById('btn-export-csv');
  if (btnExportCsv) {
    btnExportCsv.addEventListener('click', () => {
      const headers = ['Incident ID', 'Date & Time', 'Vehicle', 'Reason', 'Location', 'Alert Method', 'Status'];
      const csvRows = [headers.join(',')];

      INCIDENTS_DATA.forEach(item => {
        const row = [
          `"${item.id}"`,
          `"${item.date}"`,
          `"${item.vehicle}"`,
          `"${item.reason}"`,
          `"${item.location}"`,
          `"${item.method}"`,
          `"${item.status}"`
        ];
        csvRows.push(row.join(','));
      });

      const csvContent = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvRows.join('\n'));
      const downloadLink = document.createElement('a');
      downloadLink.setAttribute('href', csvContent);
      downloadLink.setAttribute('download', 'DEMO_STARTUP_Incident_Log_90Days.csv');
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      window.showToast('90-Day Incident Log downloaded successfully!', 'success');
    });
  }

  // Copy Referral Code
  const btnCopyCode = document.getElementById('btn-copy-referral');
  const referralInput = document.getElementById('referral-code-input');

  if (btnCopyCode && referralInput) {
    btnCopyCode.addEventListener('click', () => {
      const code = referralInput.value || 'DEMO-RAHUL100';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(code).then(() => {
          btnCopyCode.textContent = 'Copied!';
          window.showToast(`Referral Code ${code} copied to clipboard!`, 'success');
          setTimeout(() => {
            btnCopyCode.textContent = 'Copy Code';
          }, 2500);
        });
      } else {
        referralInput.select();
        document.execCommand('copy');
        btnCopyCode.textContent = 'Copied!';
        window.showToast(`Referral Code ${code} copied!`, 'success');
        setTimeout(() => {
          btnCopyCode.textContent = 'Copy Code';
        }, 2500);
      }
    });
  }

  // Vehicle Privacy & Alert Toggles
  const toggles = document.querySelectorAll('.dashboard-toggle');
  toggles.forEach(toggle => {
    toggle.addEventListener('change', (e) => {
      const label = e.target.closest('.toggle-label') ? e.target.closest('.toggle-label').textContent.trim() : 'Setting';
      const state = e.target.checked ? 'Enabled' : 'Disabled';
      window.showToast(`${label}: ${state}`, 'info');
    });
  });

  // Night DND toggle
  const dndToggle = document.getElementById('dnd-toggle');
  if (dndToggle) {
    dndToggle.addEventListener('change', () => {
      if (dndToggle.checked) {
        window.showToast('Night DND active (11 PM - 7 AM). Emergency SOS calls will still bypass.', 'info');
      } else {
        window.showToast('Night DND deactivated. All alerts active 24/7.', 'info');
      }
    });
  }
});
