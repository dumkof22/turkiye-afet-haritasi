// Türkiye Afet Haritası · Bildirimler
'use strict';

// ------------------------------------------------------------------ bildirimler
const toastEl = $("#toast");
let toastT = 0;
function showToast(html, o = {}) {
  toastEl.className = "toast" + (o.q ? " q" : "");
  toastEl.innerHTML = `<span>${html}</span>${o.q ? "" : `<button class="ibtn" data-act="toast-x" aria-label="Kapat">${ic("close")}</button>`}`;
  toastEl.hidden = false;
  clearTimeout(toastT);
  if (o.ms) toastT = setTimeout(hideToast, o.ms);
}
function hideToast() { toastEl.hidden = true; clearTimeout(toastT); }
function announce(t) { $("#live").textContent = t; }
