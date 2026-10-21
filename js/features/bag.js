// Türkiye Afet Haritası · Afet çantası oyunu
'use strict';

// ------------------------------------------------------------------ afet çantası oyunu
function bagReset() { S.bag = { order: shuffle(BAG.map(b => b.id)), picked: new Set(), checked: false }; }
function bagHTML() {
  const B = S.bag, picked = BAG.filter(b => B.picked.has(b.id));
  let head;
  if (B.checked) {
    const good = picked.filter(b => b.ok).length, bad = picked.length - good, all = BAG.filter(b => b.ok).length;
    const msg = good === all && !bad ? "Harika! Çantan eksiksiz ve gereksiz hiçbir şey yok. Gerçek çantanı da böyle hazırla!"
      : bad ? "Çantana gereksiz ya da tehlikeli eşyalar girmiş. Kırmızı kartlardaki açıklamaları oku."
        : "Çantan güzel ama bazı önemli eşyalar eksik. Kesikli yeşil çerçeveli kartlara bak.";
    head = `<div class="result"><b>${good} / ${all}</b> doğru eşya${bad ? ` · <b>${bad}</b> yanlış eşya` : ""}<p style="margin:.3rem 0 0">${msg}</p></div>`;
  } else head = `<p>Bir afetten sonraki ilk 3 gün (72 saat) ihtiyacın olacak eşyaları seç. Seçtiğin eşyalar çantana girer. Bitince “Çantayı kontrol et” düğmesine bas.</p>`;
  const btn = B.checked ? `<button class="btn btn-primary" data-act="bag-reset">Yeniden dene</button>`
    : `<button class="btn btn-primary" data-act="bag-check"${picked.length ? "" : " disabled"}>${ic("check")} Çantayı kontrol et</button>`;
  const items = B.order.map(id => {
    const b = BAGI[id], on = B.picked.has(id);
    let cls = "", badge = on ? `<span class="badge">${ic("check")}</span>` : "", why = "";
    if (B.checked) {
      if (on && b.ok) cls = " r-ok";
      else if (on) { cls = " r-bad"; badge = `<span class="badge">${ic("close")}</span>`; }
      else if (b.ok) cls = " r-miss";
      if (on || b.ok) why = `<span class="why">${b.why}</span>`;
    }
    return `<button class="item${cls}" data-act="bag-item" data-id="${id}" aria-pressed="${on}"${B.checked ? " disabled" : ""}>${badge}${bagIcon(id)}<span>${b.n}</span>${why}</button>`;
  }).join("");
  return `${head}<div class="bag-top"><div class="bag-vis">${ic("bag")}<span class="cnt">${picked.length} eşya</span>${picked.map(b => bagIcon(b.id)).join("")}</div>${btn}</div><div class="bag-grid">${items}</div>`;
}
function bagRender() {
  const body = $("#dlgBody"), top = body.scrollTop;
  body.innerHTML = bagHTML();
  body.scrollTop = top;
}
function openBag() { if (!S.bag) bagReset(); openModal("Afet Çantası Hazırla", bagHTML()); }
