// Türkiye Afet Haritası · Büyüklük laboratuvarı
'use strict';

// ------------------------------------------------------------------ büyüklük laboratuvarı
function magLabHTML() {
  return `<section class="maglab"><h3>Büyüklük laboratuvarı</h3>
<div class="ml-top"><output class="ml-val" id="mlVal" for="mlRange">${n1(S.mag)}</output><div class="ml-desc" id="mlDesc"></div></div>
<input type="range" id="mlRange" min="3" max="9" step="0.1" value="${S.mag}" aria-label="Deprem büyüklüğü">
<div class="ml-scale"><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span><span>9</span></div>
<canvas class="ml-canvas" id="mlCanvas" width="640" height="200" aria-hidden="true"></canvas>
<p id="mlEnergy"></p><p id="mlFreq"></p><p id="mlEx"></p></section>`;
}
function bindMagLab() {
  const r = $("#mlRange");
  if (!r) return;
  r.addEventListener("input", () => { S.mag = +r.value; drawMag(); });
  drawMag();
}
function fmtBig(x) {
  if (x < 10) return n1(x);
  if (x < 1000) return Math.round(x).toLocaleString("tr-TR");
  if (x < 1e6) { const p = Math.pow(10, Math.floor(Math.log10(x)) - 1); return (Math.round(x / p) * p).toLocaleString("tr-TR"); }
  if (x < 1e9) { const m = x / 1e6; return (m < 10 ? n1(m) : Math.round(m).toLocaleString("tr-TR")) + " milyon"; }
  return n1(x / 1e9) + " milyar";
}
function drawMag() {
  const m = S.mag;
  $("#mlVal").textContent = n1(m);
  const band = [...MAG_BANDS].reverse().find(b => m >= b.min) || MAG_BANDS[0];
  $("#mlDesc").textContent = band.txt;
  const ratio = Math.pow(10, 1.5 * (m - 5));
  $("#mlEnergy").innerHTML = Math.abs(m - 5) < .05
    ? "Her kare, 5 büyüklüğündeki bir depremin enerjisini gösterir. Kaydırıcıyı sağa çek!"
    : m > 5 ? `Bu deprem, 5 büyüklüğündeki bir depremden yaklaşık <b>${fmtBig(ratio)} kat</b> daha fazla enerji açığa çıkarır. Büyüklük 1 arttığında enerji yaklaşık 32 kat artar.`
      : `5 büyüklüğündeki bir deprem, bundan yaklaşık <b>${fmtBig(1 / ratio)} kat</b> daha fazla enerji açığa çıkarır.`;
  $("#mlFreq").innerHTML = m >= 8 ? "Dünyada 8 ve üzeri büyüklükte yılda ortalama <b>yaklaşık 1</b> deprem olur."
    : `Dünyada her yıl ${Math.floor(m)} ile ${Math.floor(m)},9 arasında <b>${band.freq}</b> deprem olur.`;
  const qs = EVENTS.filter(e => e.hz === "deprem");
  const near = qs.reduce((b, e) => Math.abs(e.mag - m) < Math.abs(b.mag - m) ? e : b, qs[0]);
  $("#mlEx").innerHTML = Math.abs(near.mag - m) <= .25
    ? `Türkiye'den bir örnek: <button class="chip" data-act="ev" data-id="${near.id}">${near.y} ${near.t} (${n1(near.mag)})</button>`
    : m > 7.9 ? "Türkiye'de kaydedilen en büyük depremlerden biri 7,9 büyüklüğündeki 1939 Erzincan depremidir." : "";
  drawMagCanvas(ratio);
}
function drawMagCanvas(ratio) {
  const cv = $("#mlCanvas");
  if (!cv || !cv.getContext) return;
  const ctx = cv.getContext("2d"), W = cv.width;
  const cs = getComputedStyle(document.documentElement);
  const col = n => cs.getPropertyValue(n).trim();
  ctx.clearRect(0, 0, W, cv.height);
  const cols = 64, rows = 16, sz = 8.4, gap = 1.6, n = Math.min(cols * rows, Math.max(1, Math.round(ratio)));
  for (let i = 0; i < cols * rows; i++) {
    const x = (i % cols) * (sz + gap) + 1, y = Math.floor(i / cols) * (sz + gap) + 1;
    ctx.fillStyle = i < n ? col("--deprem-3") : col("--surface-3");
    if (i === 0 && ratio < 1) {
      ctx.fillStyle = col("--surface-3"); ctx.fillRect(x, y, sz, sz);
      ctx.fillStyle = col("--deprem-3"); ctx.fillRect(x, y + sz * (1 - ratio), sz, sz * ratio);
      continue;
    }
    ctx.fillRect(x, y, sz, sz);
  }
  ctx.fillStyle = col("--ink-2");
  ctx.font = "600 17px Lexend, system-ui, sans-serif";
  const msg = ratio > cols * rows ? `1 kare = 5 büyüklüğünde bir deprem · Bu deprem ekrana sığmıyor: ${fmtBig(ratio)} kare gerekirdi!`
    : `1 kare = 5 büyüklüğünde bir depremin enerjisi · ${ratio < 1 ? "karenin küçük bir parçası" : fmtBig(ratio) + " kare"}`;
  ctx.fillText(msg, 2, rows * (sz + gap) + 30, W - 4);
}
