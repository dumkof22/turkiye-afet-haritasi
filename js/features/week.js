// Türkiye Afet Haritası · Son 1 hafta: haftanın olayları ve AFAD'ın kaydettiği depremler
'use strict';

// ------------------------------------------------------------------ veri dizinleri
const WQ = WEEK_QUAKES.list.map(([lat, lon, mag, depth, time, place], i) => {
  const [px, py] = proj(lon, lat);
  return { i, lat, lon, mag, depth, time, place, px, py };
});
const WK_EVENTS = EVENTS.filter(e => e.wk);
const PROV_ID = {};
GEO.prov.forEach(p => { PROV_ID[fold(p.n)] = p.id; });
const WK_PROV = {};
WEEK_QUAKES.byProv.forEach(([n, c, m]) => { const id = PROV_ID[fold(n)]; if (id) WK_PROV[id] = { c, m }; });

const wqR = m => 3.2 + (m - 2) * 2.6;
function wqWhen(q, long) {
  const [d, t] = q.time.split(" "), [y, mo, da] = d.split("-").map(Number);
  const opt = long ? { weekday: "long", day: "numeric", month: "long", year: "numeric" } : { day: "numeric", month: "long" };
  return `${new Date(y, mo - 1, da).toLocaleDateString("tr-TR", opt)}, saat ${t.replace(":", ".")}`;
}

// ------------------------------------------------------------------ harita katmanı
function buildWeekLayer() {
  // Selden etkilenen iller: kara rengi üzerine mavi tarama (düz mavi denizle karışıyordu).
  L.wkPat = sv("pattern", { id: "pWk", width: 8, height: 8, patternUnits: "userSpaceOnUse" }, svg.querySelector("defs"));
  sv("rect", { width: 8, height: 8, class: "wk-bg" }, L.wkPat);
  sv("path", { d: "M4 0V8", class: "wk-ln" }, L.wkPat);
  L.week = sv("g", { class: "wquakes" });
  svg.insertBefore(L.week, L.labels);  // il adları noktaların üstünde okunur kalsın
  for (const q of WQ) {  // liste küçükten büyüğe sıralı: büyük depremler üstte kalır
    const g = sv("g", { class: "wq" + (q.mag >= 3 ? " big" : ""), "data-wq": q.i, transform: `translate(${q.px.toFixed(1)} ${q.py.toFixed(1)})` }, L.week);
    const s = sv("g", { class: "mk-s" }, g);
    sv("circle", { r: (wqR(q.mag) + 5).toFixed(1), class: "mk-hit" }, s);
    sv("circle", { r: wqR(q.mag).toFixed(1), class: "wq-dot" }, s);
  }
  WK_EVENTS.filter(e => e.hz === "sel").forEach(e => ilsOf(e).forEach(id => provEl[id].classList.add("wk-hit")));
}
let wqOn = null;
function setQuakeOn(i) {
  clearQuakeOn();
  wqOn = L.week.querySelector(`.wq[data-wq="${i}"]`);
  if (wqOn) { wqOn.classList.add("on"); wqOn.parentNode.appendChild(wqOn); }
}
function clearQuakeOn() { if (wqOn) wqOn.classList.remove("on"); wqOn = null; }

// ------------------------------------------------------------------ eylemler
function weekShow(view) {
  S.wk.view = view;
  S.sel = view && view.t === "prov" ? view.id : null;
  clearMarkerOn(); clearQuakeOn(); drawSel();
  if (view && view.t === "ev") { setMarkerOn(view.id); ripple(EV[view.id]); }
  if (view && view.t === "q") { setQuakeOn(view.i); ripple({ ...WQ[view.i], hz: "deprem" }); }
  if (!view) hideToast();
  renderPanel(); layoutLabels();
}
const toPanel = html => { if (!WIDE.matches) showToast(`${html} <button class="tlink" data-act="to-panel">Bilgileri gör</button>`, { ms: 6000 }); };
const flyNear = (x, y) => flyTo(fitRect({ x: x - TB.w / 9, y: y - TB.h / 9, w: TB.w / 4.5, h: TB.h / 4.5 }, 0));
function weekEvent(id, o = {}) {
  const e = EV[id];
  if (!e) return;
  if (S.mode !== "week") setMode("week");
  weekShow({ t: "ev", id });
  if (o.fly) flyNear(e.px, e.py); else toPanel(`<b>${esc(e.t)}</b>`);
}
function weekQuake(i, o = {}) {
  const q = WQ[i];
  if (!q) return;
  weekShow({ t: "q", i });
  if (o.fly) flyNear(q.px, q.py); else toPanel(`<b>${n1(q.mag)}</b> ${esc(q.place.split(" · ")[0])}`);
}
function weekProv(id, o = {}) {
  if (!PROV[id]) return;
  weekShow({ t: "prov", id });
  announce(PROV[id].n + " seçildi");
  if (o.fly) flyToBox(bboxOf([id]), .2); else toPanel(`<b>${esc(PROV[id].n)}</b> seçildi`);
}
const weekBack = () => weekShow(null);
function weekClear() { S.wk.view = null; clearQuakeOn(); }
function weekTip(id) {
  const n = WK_EVENTS.filter(e => ilsOf(e).includes(id)).length, q = WK_PROV[id];
  const parts = [n ? `${n} olay` : "", q ? `${q.c} deprem` : ""].filter(Boolean);
  return "Bu hafta: " + (parts.join(", ") || "önemli bir olay yok");
}

// ------------------------------------------------------------------ lejant ve panel
function weekLegend() {
  return `<span class="lg-t">Son 1 hafta:</span>` +
    `<span class="lg-i"><span class="sw sw-wk"></span>Sel ve su baskını yaşanan iller</span>` +
    `<span class="lg-i"><svg class="ico" viewBox="0 0 24 24" style="color:var(--sel-3)">${ICON.pin}</svg>Olay</span>` +
    `<span class="lg-i"><span class="lg-dot" style="width:.55rem;height:.55rem"></span><span class="lg-dot" style="width:.9rem;height:.9rem"></span>Deprem (AFAD, ${n1(WEEK_QUAKES.minMag)} ve üzeri)</span>` +
    `<span class="lg-note">İşaretlere ve noktalara dokun. Bir ile dokunarak o ilde bu hafta neler olduğunu gör.</span>`;
}
function viewWeek() {
  const v = S.wk.view;
  if (v && v.t === "ev") return viewWeekEvent(EV[v.id]);
  if (v && v.t === "q") return viewWeekQuake(WQ[v.i]);
  if (v && v.t === "prov") return viewWeekProv(v.id);
  return viewWeekHome();
}
const wkBack = () => `<button class="back" data-act="wk-back">${ic("back")} Son 1 Hafta'ya dön</button>`;
const wqRow = q => `<button class="ev" data-act="wk-q" data-i="${q.i}" style="--c:var(--deprem-3)"><span class="yr">${n1(q.mag)}</span><span><b>${esc(q.place)}</b><span>${wqWhen(q)} · ${n1(q.depth)} km derinlikte</span></span></button>`;

function viewWeekHome() {
  const tiles = [...WEEK.stats];
  tiles.splice(1, 0, [WEEK_QUAKES.total.toLocaleString("tr-TR"), "deprem: AFAD'ın bu hafta Türkiye ve çevresinde kaydettiği", "deprem-3"]);
  const top = [...WQ].sort((a, b) => b.mag - a.mag).slice(0, 3);
  const busy = WEEK_QUAKES.byProv.slice(0, 5).filter(([n]) => PROV_ID[fold(n)]);
  const seen = new Set();
  const src = [...WK_EVENTS.flatMap(e => e.src || []), ...WEEK.sources].filter(([, u]) => !seen.has(u) && seen.add(u));
  return `<div class="hero wk-hero"><div class="eyebrow" style="--c:var(--danger)">${ic("week")} Son 1 Hafta · ${WEEK.label}</div>
<h2>Bu hafta neler oldu?</h2>
<p class="lede">${WEEK.lede}</p></div>
<div class="wk-stats">${tiles.map(([v, t, c]) => `<div class="wk-stat" style="--c:var(--${c})"><b>${v}</b><span>${t}</span></div>`).join("")}</div>
<section><h3>Haftanın olayları</h3><div class="evlist">${WK_EVENTS.map(evRow).join("")}</div>
<div class="row"><button class="btn" data-act="wk-zoom">${ic("fit")} Marmara'ya yakınlaş</button></div></section>
<section><h3>Haftanın depremleri</h3>
<p>AFAD bu hafta Türkiye ve çevresinde <b>${WEEK_QUAKES.total.toLocaleString("tr-TR")}</b> deprem kaydetti; günde ortalama <b>${Math.round(WEEK_QUAKES.total / WEEK_QUAKES.days)}</b> deprem! Çoğu o kadar küçüktü ki kimse hissetmedi. Haritadaki en büyük depremler <b>${n1(top[0].mag)}</b> büyüklüğündeydi.</p>
<div class="evlist">${top.map(wqRow).join("")}</div>
<p class="chips-l">En çok deprem kaydedilen iller:</p><div class="chips">${busy.map(([n, c]) => `<button class="chip" data-act="wk-prov" data-id="${PROV_ID[fold(n)]}">${n} · ${c}</button>`).join("")}</div>
<div class="fact" style="margin-top:.9rem"><div class="fh"><b>Kendin keşfet</b></div><p>Haritadaki kırmızı noktalar bu haftanın depremleri. “Fay hatları” düğmesi açıkken noktaların çoğunun fay hatlarının çevresinde toplandığını görebilirsin.</p></div></section>
<div class="lesson"><h3>Bu haftanın dersleri</h3><ul class="todo">${WEEK.lessons.map(x => `<li>${ic("check")}<span>${x}</span></li>`).join("")}</ul></div>
${srcLinks(src)}
<p class="note">Bilgiler ${WEEK.updated}'ye kadar yayımlanan resmî açıklamalardan ve haberlerden derlendi; rakamlar sonradan güncellenebilir. Deprem verisi: AFAD Deprem Kataloğu (Türkiye saati).</p>`;
}
function viewWeekEvent(e) {
  return `${wkBack()}<div style="--c:var(--${e.hz}-3)">${eventBody(e)}
<section><h3>${ilsOf(e).length > 1 ? "İlgili iller" : "İlgili il"}</h3><div class="chips">${ilsOf(e).map(i => `<button class="chip" data-act="wk-prov" data-id="${i}">${PROV[i].n}</button>`).join("")}</div></section></div>`;
}
function viewWeekQuake(q) {
  const [where, near] = q.place.split(" · ");
  const band = [...MAG_BANDS].reverse().find(b => q.mag >= b.min);
  const feel = band ? band.txt : q.mag < 2.5 ? "Çok küçük bir deprem: Genellikle hissedilmez ama sismograflar kaydeder."
    : "Küçük bir deprem: Merkezine yakın bazı kişiler hissedebilir ama hasar yapmaz.";
  return `${wkBack()}<div style="--c:var(--deprem-3)"><div class="eyebrow">${ic("deprem")} Deprem · Son 1 hafta</div>
<h2>${esc(where)}</h2>${near ? `<p class="lede" style="margin-top:-.2rem">${esc(near)}</p>` : ""}
<div class="magbig"><span class="m">${n1(q.mag)}</span><span><b>büyüklüğünde</b><small>${magWord(q.mag)}</small></span></div>
<dl class="stats"><div class="stat"><dt>Tarih</dt><dd>${wqWhen(q, true)}</dd></div><div class="stat"><dt>Derinlik</dt><dd>${n1(q.depth)} km</dd></div></dl>
<p>${feel}</p>
${srcLinks([WEEK_SRC.katalog])}</div>`;
}
function viewWeekProv(id) {
  const p = PROV[id], q = WK_PROV[id];
  const evs = WK_EVENTS.filter(e => ilsOf(e).includes(id));
  const qs = WQ.filter(x => x.place.includes(`(${p.n})`)).sort((a, b) => b.mag - a.mag).slice(0, 3);
  return `${wkBack()}
<div class="phead"><span class="plate" aria-label="Plaka kodu ${pad2(id)}"><span class="tr">TR</span><span class="no">${pad2(id)}</span></span><div><h2>${p.n}</h2><div class="sub">Son 1 hafta · ${WEEK.label}</div></div></div>
${evs.length ? `<section><h3>Bu haftanın olayları</h3><div class="evlist">${evs.map(evRow).join("")}</div></section>` : `<p class="lede">Bu hafta ${p.n} için kayda geçen önemli bir afet olayı yok.</p>`}
<section><h3>Depremler</h3><p>${q ? `AFAD bu hafta ${p.n} ve çevresinde <b>${q.c}</b> deprem kaydetti. En büyüğü <b>${n1(q.m)}</b> büyüklüğündeydi.` : `AFAD'ın kayıtlarında bu hafta ${p.n} için deprem yok.`}</p>
${qs.length ? `<div class="evlist">${qs.map(wqRow).join("")}</div>` : ""}</section>
<div class="lesson"><h3>Unutma</h3><p>Afetler her yerde ve her zaman olabilir. Afet çantanı hazırla, ailenle bir afet planı yap!</p></div>
<div class="row"><button class="btn" data-act="prov" data-id="${id}">${ic("compass")} ${p.n} afet risk karnesi</button></div>`;
}
