// Türkiye Afet Haritası · Deprem zaman tüneli ve KAF domino hikâyesi
'use strict';

// ------------------------------------------------------------------ zaman tüneli ve domino hikâyesi
function tlPos(e) {
  const base = e.y < 1800 ? 2.5 : 10 + (e.y - 1900) / (2026 - 1900) * 88;
  const dup = TL.filter(t => t.y === e.y);
  return base + dup.indexOf(e) * .9;
}
function tlShow(quiet) {
  const i = S.tl.i;
  TL.forEach((e, j) => { const el = mkEl[e.id]; el.classList.toggle("tl-on", j <= i); el.classList.toggle("cur", j === i); });
  const cur = mkEl[TL[i].id];
  cur.parentNode.appendChild(cur);
  if (!quiet) { ripple(TL[i]); renderFoot(); renderPanel(); }
}
function tlStep(d) { tlStop(); S.tl.i = Math.max(0, Math.min(TL.length - 1, S.tl.i + d)); tlShow(); }
function tlPlay() {
  if (S.tl.playing) { tlStop(); return; }
  S.tl.playing = true;
  if (S.tl.i >= TL.length - 1) S.tl.i = -1;
  const tick = () => {
    if (!S.tl.playing) return;
    if (S.tl.i >= TL.length - 1) { tlStop(); return; }
    S.tl.i++;
    tlShow();
    S.tl.timer = setTimeout(tick, 2800);
  };
  tick();
}
function tlStop() {
  const was = S.tl.playing;
  S.tl.playing = false;
  clearTimeout(S.tl.timer);
  if (was && S.mode === "timeline") renderFoot();
}
function tlBar() {
  const i = S.tl.i;
  const dots = TL.map((e, j) => `<button class="tl-dot${j < i ? "" : j === i ? " cur" : " fut"}" style="left:${tlPos(e).toFixed(2)}%" data-act="tl-go" data-i="${j}" aria-label="${e.y} ${esc(e.t)}"></button>`).join("");
  const yrs = [1509, 1939, 1970, 1999, 2023].map(y => `<span class="tl-yr" style="left:${tlPos(TL.find(e => e.y === y)).toFixed(2)}%">${y}</span>`).join("");
  return `<div class="tl"><button class="ibtn" data-act="tl-step" data-d="-1" aria-label="Önceki deprem">${ic("prev")}</button>
<button class="btn btn-primary" data-act="tl-play">${S.tl.playing ? ic("pause") + " Durdur" : ic("play") + " Oynat"}</button>
<button class="ibtn" data-act="tl-step" data-d="1" aria-label="Sonraki deprem">${ic("next")}</button>
<div class="tl-track"><div class="tl-line"></div><div class="tl-fill" style="width:${tlPos(TL[i]).toFixed(2)}%"></div><span class="tl-break" style="left:6.3%">≈</span>${dots}${yrs}</div>
<button class="btn" data-act="domino">${ic("fault")} KAF Domino Hikâyesi</button></div>`;
}
function viewTimeline() {
  if (S.tl.story >= 0) return viewStory();
  const e = TL[S.tl.i];
  return `<div style="--c:var(--deprem-3)"><div class="eyebrow">${ic("clock")} Zaman Tüneli · ${S.tl.i + 1} / ${TL.length}</div>
${eventBody(e).replace(/^<div class="eyebrow">[\s\S]*?<\/div>/, "")}
<div class="row"><button class="btn" data-act="tl-step" data-d="-1" ${S.tl.i === 0 ? "disabled" : ""}>${ic("prev")} Önceki</button><button class="btn btn-primary" data-act="tl-step" data-d="1" ${S.tl.i === TL.length - 1 ? "disabled" : ""}>Sonraki ${ic("next")}</button></div>
<p class="note">Oynat düğmesiyle depremleri sırayla izleyebilir ya da alttaki çizelgede bir noktaya dokunabilirsin. “KAF Domino Hikâyesi”, Kuzey Anadolu Fayı'ndaki ünlü deprem zincirini adım adım anlatır.</p></div>`;
}
const STORY_INTRO = ["Kuzey Anadolu Fayı'nda deprem zinciri", "1939'dan 1999'a kadar Kuzey Anadolu Fayı üzerindeki büyük depremler, bir domino taşı dizisi gibi doğudan batıya doğru ilerledi. Bilim insanları bu diziyi dünyanın her yerinde örnek olarak inceliyor. Hadi adım adım izleyelim!"];
const STORY_END = ["Sırada ne var?", "Fayın Marmara Denizi'nin altındaki bölümü uzun zamandır büyük bir kırılma yaşamadı. Bilim insanları burada büyük bir deprem bekliyor. Ne zaman olacağını kimse bilemez. Bu yüzden en iyi şey hazırlıklı olmaktır: Afet çantanı hazırla, eşyalarını sabitle ve Çök-Kapan-Tutun'u öğren!"];
function segLon(c, a, b) {
  const out = [];
  for (let i = 0; i < c.length - 1; i++) {
    const [x1, y1] = c[i], [x2, y2] = c[i + 1];
    if (Math.max(x1, x2) < a || Math.min(x1, x2) > b) continue;
    const at = lon => [lon, y1 + (lon - x1) / (x2 - x1) * (y2 - y1)];
    const p1 = x1 > b ? at(b) : x1 < a ? at(a) : [x1, y1];
    const p2 = x2 > b ? at(b) : x2 < a ? at(a) : [x2, y2];
    if (!out.length) out.push(p1);
    out.push(p2);
  }
  return out;
}
function drawRupture(d, j, isNew) {
  const pts = segLon(GEO.faults.kaf.c, Math.min(d.from, d.to), Math.max(d.from, d.to));
  if (pts.length < 2) return;
  const dd = polyD(pts.map(([lo, la]) => proj(lo, la)));
  sv("path", { d: dd, class: "rupture-c" + (isNew ? " anim" : ""), pathLength: 1 }, L.fx);
  sv("path", { d: dd, class: "rupture" + (isNew ? " anim" : " old"), pathLength: 1 }, L.fx);
  const mid = pts[Math.floor(pts.length / 2)], [x, y] = proj(mid[0], mid[1]);
  sv("text", { class: "dlabel", x: x.toFixed(1), y: y.toFixed(1), dy: j % 2 ? "1.7em" : "-0.8em" }, L.fx).textContent = EV[d.ev].y;
}
function storyStart() {
  tlStop();
  S.tl.story = 0;
  const pts = GEO.faults.kaf.c.filter(([lo]) => lo > 26.3).map(([lo, la]) => proj(lo, la));
  const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
  const x0 = Math.min(...xs), y0 = Math.min(...ys);
  flyTo(fitRect({ x: x0, y: y0, w: Math.max(...xs) - x0, h: Math.max(...ys) - y0 }, .08));
  storyDraw();
}
function storyDraw() {
  clearFx();
  const st = S.tl.story, N = DOMINO.length;
  for (let j = 0; j < Math.min(st, N); j++) drawRupture(DOMINO[j], j, j === st - 1);
  if (st === N + 1) {
    const g = segLon(GEO.faults.kaf.c, 27.55, 29.30);
    sv("path", { d: polyD(g.map(([lo, la]) => proj(lo, la))), class: "gap-seg" }, L.fx);
    const [x, y] = proj(28.4, 40.85);
    sv("text", { class: "dlabel", x: x.toFixed(1), y: y.toFixed(1), dy: "-0.8em" }, L.fx).textContent = "?";
    const t1912 = segLon(GEO.faults.kaf.c, 26.6, 27.55);
    sv("path", { d: polyD(t1912.map(([lo, la]) => proj(lo, la))), class: "rupture old" }, L.fx);
  }
  TL.forEach(e => mkEl[e.id].classList.remove("tl-on", "cur"));
  DOMINO.slice(0, Math.min(st, N)).forEach((d, j) => { const el = mkEl[d.ev]; el.classList.add("tl-on"); el.classList.toggle("cur", j === st - 1); });
  if (st >= 1 && st <= N) ripple(EV[DOMINO[st - 1].ev]);
  renderPanel();
  renderFoot();
}
function viewStory() {
  const st = S.tl.story, N = DOMINO.length;
  let body;
  if (st === 0) body = `<h3>${STORY_INTRO[0]}</h3><p>${STORY_INTRO[1]}</p>`;
  else if (st <= N) {
    const e = EV[DOMINO[st - 1].ev];
    body = `<h3>${e.y} · ${e.t} (${n1(e.mag)})</h3><p>${e.text}</p>${e.lesson ? `<p><b>${e.lesson}</b></p>` : ""}`;
  } else body = `<h3>${STORY_END[0]}</h3><p>${STORY_END[1]}</p>`;
  return `<div class="eyebrow" style="--c:var(--fault)">${ic("fault")} KAF Domino Hikâyesi</div><h2>Batıya ilerleyen depremler</h2>
<div class="story"><div class="stepc">Adım ${st + 1} / ${N + 2}</div>${body}
<div class="row"><button class="btn" data-act="story" data-d="-1" ${st === 0 ? "disabled" : ""}>${ic("prev")} Geri</button>${st <= N ? `<button class="btn btn-primary" data-act="story" data-d="1">İleri ${ic("next")}</button>` : `<button class="btn btn-primary" data-act="story-exit">Zaman Tüneli'ne dön</button>`}</div></div>
<p class="note">Sarı çizgiler fayın kırılan bölümlerini gösterir. Son adımdaki kesikli kırmızı çizgi, Marmara Denizi'nin altındaki uzun süredir kırılmamış bölümdür. Kırılma uzunlukları yaklaşıktır.</p>`;
}
function storyFoot() {
  return `<div class="legend"><span class="lg-t">KAF Domino:</span><span class="lg-i"><span class="sw" style="background:var(--signal)"></span>Yeni kırılan bölüm</span><span class="lg-i"><span class="sw" style="background:var(--deprem-2)"></span>Daha önce kırılan bölüm</span><span class="lg-i"><span class="sw" style="background:var(--danger)"></span>Marmara'daki bölüm</span></div><div class="toggles"><button class="btn" data-act="story-exit">${ic("back")} Hikâyeden çık</button></div>`;
}
