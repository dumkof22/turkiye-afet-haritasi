// Türkiye Afet Haritası · Afet sahneleri ve Çök-Kapan-Tutun piktogramları (SVG)
'use strict';

const waveD = (y, amp, n) => `M-40 ${y}q10-${amp} 20 0` + "t20 0".repeat(n) + "V200H-40z";
const pine = (x, b, h) => `<rect class="c-trunk" x="${x - 2}" y="${b - 7}" width="4" height="8"/><path class="c-tree" d="M${x} ${b - 7 - h}l${h * 0.42} ${h}h-${h * 0.84}z"/>`;
const flame = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><g class="flame"><path class="c-flame" d="M0 30c-11 0-16-8-14-17 2-7 7-9 7-17 6 4 7 9 7 13 2-3 3-6 2-9 7 5 12 11 12 18 0 7-5 12-14 12z"/><path class="c-flame-2" d="M0 30c-5 0-8-4-7-9 1-4 4-5 4-9 4 3 5 6 5 9 0 1 2-2 2-4 3 3 5 6 5 9 0 3-4 4-9 4z"/></g></g>`;

const SCENES = {
  deprem: `<rect class="c-sky" width="320" height="170"/>
<path class="c-grass" opacity=".5" d="M0 98Q60 70 120 92T240 86t80 4V170H0z"/>
<g transform="translate(184 12)"><rect class="c-paper s-line" stroke-width="1.5" width="124" height="52" rx="9"/><text class="sc-lbl" x="11" y="16">SİSMOGRAF</text>
<path class="seis s-deprem-3" d="M9 36h20l3-4 3 8 3-14 4 22 3-28 4 31 3-21 3 13 3-7 3 3h45" fill="none" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"/></g>
<path class="c-ground" d="M0 114h160l-8 56H0z"/><path class="c-ground" d="M164 118h156v52H156z"/>
<path class="s-ground-2" stroke-width="3" d="M0 132h157M0 150h154M162 136h158M159 154h161"/>
<path class="s-grass" stroke-width="6" d="M0 114h160M164 118h156"/>
<path class="s-ink" fill="none" stroke-width="2.6" stroke-linejoin="round" d="m162 113-6 14 7 10-7 12 6 10-5 11"/>
<g class="rips s-deprem-3" fill="none" stroke-width="2"><circle cx="158" cy="152" r="8"/><circle cx="158" cy="152" r="8"/><circle cx="158" cy="152" r="8"/></g>
<path class="c-deprem-3" d="m158 145 2.6 4.6 5.2 1-3.7 3.8.7 5.2-4.8-2.3-4.8 2.3.7-5.2-3.7-3.8 5.2-1z"/>
<g class="shake"><path class="c-roof s-ink" stroke-width="2.2" stroke-linejoin="round" d="M36 76 75 46l39 30z"/><rect class="c-wall s-ink" stroke-width="2.2" x="44" y="75" width="62" height="39"/><rect class="c-sky-2 s-ink" stroke-width="1.8" x="54" y="84" width="15" height="13"/><rect class="c-roof s-ink" stroke-width="1.8" x="82" y="90" width="15" height="24"/></g>
<g class="shake d2"><rect class="c-trunk" x="237" y="90" width="7" height="28"/><circle class="c-tree" cx="240.5" cy="80" r="19"/><circle class="c-grass" opacity=".6" cx="233" cy="74" r="7"/></g>`,

  sel: `<rect class="c-sky-storm" width="320" height="170"/>
<g class="rain s-water-2" stroke-width="2" stroke-linecap="round"><path d="m30 34-5 12M62 28l-5 12M96 36l-5 12M130 26l-5 12M168 34l-5 12M204 28l-5 12M240 36l-5 12M276 26l-5 12M300 40l-5 12M48 58l-5 12M112 60l-5 12M186 58l-5 12M258 62l-5 12M150 78l-5 12M220 80l-5 12M80 82l-5 12"/></g>
<g class="c-cloud-storm"><ellipse cx="70" cy="22" rx="50" ry="17"/><ellipse cx="118" cy="14" rx="36" ry="14"/><ellipse cx="226" cy="20" rx="56" ry="17"/><ellipse cx="276" cy="12" rx="32" ry="12"/></g>
<path class="c-grass" d="M0 102q80-36 160-6t160-10v84H0z"/>
<path class="c-roof s-ink" stroke-width="2" stroke-linejoin="round" d="M34 92 64 70l30 22z"/><rect class="c-wall s-ink" stroke-width="2" x="40" y="91" width="48" height="36"/><rect class="c-sky-2 s-ink" stroke-width="1.6" x="48" y="99" width="12" height="11"/>
<path class="c-roof s-ink" stroke-width="2" stroke-linejoin="round" d="m206 86 30-22 30 22z"/><rect class="c-wall s-ink" stroke-width="2" x="212" y="85" width="48" height="38"/><rect class="c-sky-2 s-ink" stroke-width="1.6" x="240" y="93" width="12" height="11"/>
<rect class="c-trunk" x="150" y="86" width="6" height="26"/><circle class="c-tree" cx="153" cy="78" r="15"/>
<g class="water"><path class="wave c-water" opacity=".92" d="${waveD(120, 6, 22)}"/><path class="wave w2 c-water-2" opacity=".55" d="${waveD(130, 5, 22)}"/></g>
<g class="float"><rect class="c-trunk" x="120" y="122" width="30" height="6" rx="3"/></g>`,

  heyelan: `<rect class="c-sky" width="320" height="170"/>
<circle class="c-sun" opacity=".85" cx="58" cy="34" r="15"/>
<path class="c-ground" d="M0 170v-20L250 38q30-12 70-6v138z"/>
<path class="s-ground-2" fill="none" stroke-width="3" d="M40 160 270 58M110 168 300 84"/>
<path class="s-grass" fill="none" stroke-width="7" stroke-linecap="round" d="M0 150 250 38q30-12 70-6"/>
<path class="s-ink" fill="none" stroke-width="2.4" stroke-linecap="round" d="M203 60q10 12 5 26"/>
<g class="slide"><path class="c-ground-2" d="m150 84 54-24 8 26-50 24z"/><path class="s-grass" stroke-width="6" stroke-linecap="round" d="m150 84 54-24"/>
<g transform="rotate(-24 177 62)"><rect class="c-trunk" x="174" y="46" width="5" height="18"/><circle class="c-tree" cx="176.5" cy="40" r="10"/></g>
<circle class="c-rock" cx="170" cy="94" r="5"/><circle class="c-rock-2" cx="188" cy="86" r="4"/></g>
<g class="roll"><circle class="c-rock" cx="120" cy="100" r="6"/></g><g class="roll r2"><circle class="c-rock-2" cx="96" cy="111" r="4.5"/></g>
<path class="c-roof s-ink" stroke-width="2" stroke-linejoin="round" d="M2 128 18 114l16 14z"/><rect class="c-wall s-ink" stroke-width="2" x="5" y="127" width="26" height="17"/>
<g transform="translate(58 92)"><rect class="c-ink" x="-1.5" y="22" width="3" height="12"/><path class="c-signal s-ink" stroke-width="2" stroke-linejoin="round" d="M0 0l14 24h-28z"/><path class="s-ink" stroke-width="2.6" stroke-linecap="round" d="M0 8v8M0 20v.4"/></g>`,

  cig: `<rect class="c-sky" width="320" height="170"/>
<path class="c-rock-2" opacity=".55" d="m0 120 66-66 42 40 52-62 70 76 90-46v108H0z"/>
<path class="c-rock" d="M20 170 168 26l152 132v12z"/>
<path class="c-snow" d="m120 73 48-47 46 40-12-3-9 14-11-12-12 14-10-12-12 11z"/>
<path class="c-snow" opacity=".9" d="m214 66 106 92v12h-34l-88-88z"/>
<g class="ava"><circle class="c-snow" r="16"/><circle class="c-snow" cx="-16" cy="-7" r="11"/><circle class="c-snow" cx="14" cy="-9" r="12"/><circle class="c-snow" cx="-4" cy="-16" r="10"/><circle class="c-cloud" opacity=".7" cx="-27" cy="-15" r="9"/><circle class="c-cloud" opacity=".55" cx="-36" cy="-24" r="7"/></g>
<g class="ava a2"><circle class="c-snow" r="6"/><circle class="c-snow" cx="9" cy="-4" r="4"/></g>
${pine(254, 168, 24)}${pine(274, 168, 30)}${pine(296, 168, 26)}
<g transform="translate(46 118)"><rect class="c-ink" x="-1.5" y="24" width="3" height="20"/><path class="c-signal s-ink" stroke-width="2" stroke-linejoin="round" d="M0 0l15 26h-30z"/><path class="s-ink" stroke-width="2" stroke-linecap="round" d="M0 9v12M-5 12l10 6M-5 18l10-6"/></g>`,

  yangin: `<rect class="c-sky-fire" width="320" height="170"/>
<circle class="c-sun" opacity=".55" cx="266" cy="34" r="16"/>
<g class="smoke c-smoke"><circle cx="128" cy="70" r="13"/><circle cx="168" cy="62" r="15"/><circle cx="206" cy="72" r="12"/></g>
<path class="c-grass" opacity=".55" d="M0 118q90-30 170-8t150-8v68H0z"/>
<path class="c-ground-2" d="M0 142q100-20 200-4t120-6v38H0z"/>
${pine(26, 144, 36)}${pine(58, 142, 42)}${pine(92, 141, 38)}${pine(128, 141, 44)}${pine(166, 140, 40)}${pine(204, 140, 44)}${pine(242, 139, 38)}${pine(282, 139, 42)}
${flame(128, 102, 1)}${flame(166, 108, .85)}${flame(204, 100, 1.05)}
<g class="embers c-flame-2"><circle cx="150" cy="96" r="2"/><circle cx="186" cy="92" r="1.6"/><circle cx="214" cy="98" r="2"/><circle cx="136" cy="90" r="1.4"/></g>`,

  kuraklik: `<rect class="c-sky-dry" width="320" height="170"/>
<g transform="translate(250 48)"><g class="rays s-sun" stroke-width="3.2" stroke-linecap="round"><path d="M0-34v-11M0 34v11M-34 0h-11M34 0h11M-24-24l-8-8M24 24l8 8M-24 24l-8 8M24-24l8-8"/></g><circle class="c-sun" r="24"/></g>
<g class="heat s-kuraklik-2" fill="none" stroke-width="2" stroke-linecap="round"><path d="M34 80q6-6 12 0t12 0 12 0"/><path d="M116 66q6-6 12 0t12 0 12 0"/><path d="M84 98q6-6 12 0t12 0 12 0"/></g>
<path class="c-dry" d="M0 116h320v54H0z"/>
<path class="s-ground-2" fill="none" stroke-width="2" stroke-linejoin="round" d="m0 130 26 4 18-8 30 10 22-6M44 126l6 18-10 14M74 136l12 22M96 130l28 6 20-10 34 8M124 136l-6 22M144 126l8 14 26 4 24-12 30 6M178 140l-4 18M202 132l6 26M232 136l30 8 24-10 34 8M262 144l-10 16M286 134l8 24"/>
<ellipse class="s-ground-2" fill="none" stroke-width="2" stroke-dasharray="5 5" cx="200" cy="152" rx="52" ry="9"/>
<path class="s-trunk" fill="none" stroke-width="3" stroke-linecap="round" d="M70 116q-2-22 12-30M150 116V84m0 12-12-10m12 2 10-12"/>
<path class="c-heyelan-2" d="M82 86q12 2 14 14-12-2-14-14zM72 100q-12-2-16 8 12 2 16-8z"/>`,

  tsunami: `<rect class="c-sky" width="320" height="170"/>
<path class="c-ground" d="m196 170 30-48q30-30 94-34v82z"/>
<path class="s-grass" fill="none" stroke-width="6" stroke-linecap="round" d="M226 122q30-30 94-34"/>
<path class="c-roof s-ink" stroke-width="2" stroke-linejoin="round" d="m266 92 18-14 18 14z"/><rect class="c-wall s-ink" stroke-width="2" x="270" y="91" width="28" height="18"/>
<g transform="translate(244 40)"><rect class="c-ink" x="-1.5" y="16" width="3" height="56"/><rect class="c-safe" x="-22" y="-14" width="44" height="30" rx="5"/><path class="s-paper" fill="none" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" d="M0 10V-6m-7 7 7-7 7 7"/></g>
<path class="c-water" d="M0 134h236l-10 36H0z"/>
<g class="tsu"><path class="c-water-2" d="M-130 170v-48c40-2 80-40 120-64 30-16 64-12 74 8-16-6-34 0-36 16-2 16 14 28 32 26 12 14 40 22 70 24v38z"/><path class="s-paper" fill="none" stroke-width="2.6" stroke-linecap="round" d="M-10 58c30-16 64-12 74 8"/></g>`,

  volkan: `<rect class="c-sky" width="320" height="170"/>
<g class="puffs c-smoke"><circle cx="160" cy="44" r="14"/><circle cx="174" cy="30" r="12"/><circle cx="146" cy="26" r="10"/></g>
<path class="c-rock" d="M24 170 132 58h40l124 112z"/>
<path class="c-rock-2" opacity=".6" d="M132 58h40l-6 10h-28z"/>
<ellipse class="glow c-flame-2" cx="152" cy="58" rx="22" ry="6"/>
<path class="lava s-lava" fill="none" stroke-width="7" stroke-linecap="round" d="M142 60c-4 22-20 38-24 62-4 20-18 32-24 48"/>
<path class="lava s-lava" fill="none" stroke-width="6" stroke-linecap="round" d="M164 60c6 26 24 42 30 68 4 16 18 30 22 42"/>
<g class="c-lava"><circle class="bomb b1" r="4"/><circle class="bomb b2" r="3.2"/><circle class="bomb b3" r="3.6"/></g>
<path class="c-grass" opacity=".7" d="M0 160q40-10 80 0v10H0zm240 2q40-12 80-2v10h-80z"/>`
};
const SCENE_LABEL = {
  deprem: "Sarsılan bir ev, yer kabuğundaki kırık ve sismograf kaydı",
  sel: "Sağanak yağmur ve yükselen sel suları",
  heyelan: "Yamaçtan kayan toprak ve yuvarlanan kayalar",
  cig: "Dağ yamacından kayan kar kütlesi",
  yangin: "Ormanda yayılan alevler ve duman",
  kuraklik: "Kavurucu güneş ve çatlamış toprak",
  tsunami: "Kıyıya ilerleyen dev dalga ve yüksek yere çık tabelası",
  volkan: "Püsküren volkan, lav akıntıları ve duman"
};
const scene = k => SCENES[k] ? `<svg class="scene sc-${k}" viewBox="0 0 320 170" role="img" aria-label="${SCENE_LABEL[k]}">${SCENES[k]}</svg>` : "";

// Çök-kapan-tutun piktogramları
const PICTO = [
  ["ÇÖK", `<path class="s-line" stroke-width="3" d="M6 66h84"/><circle class="c-ink" cx="32" cy="32" r="7"/><path class="s-ink" fill="none" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" d="M39 37q12-5 23 4M45 39l-8 21M62 41l-2 20h18"/>`],
  ["KAPAN", `<path class="s-line" stroke-width="3" d="M6 66h84"/><path class="s-heyelan-2" stroke-width="6" stroke-linecap="round" d="M12 30h72M18 30v35M78 30v35"/><circle class="c-ink" cx="36" cy="46" r="6"/><path class="s-ink" fill="none" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round" d="M42 49q10-4 18 4M45 50q-7-11-15-6M60 53l-2 10h12"/>`],
  ["TUTUN", `<path class="s-line" stroke-width="3" d="M6 66h84"/><path class="s-heyelan-2" stroke-width="6" stroke-linecap="round" d="M12 30h72M18 30v35M78 30v35"/><circle class="c-ink" cx="34" cy="47" r="6"/><path class="s-ink" fill="none" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round" d="M40 50q10-4 18 4M46 51l28-5M58 54l-2 9h12"/><circle class="c-signal" cx="77" cy="46" r="3.5"/>`]
];
const pictos = () => `<div class="pictos">${PICTO.map(([t, p], i) => `<figure><svg viewBox="0 0 96 72" aria-hidden="true">${p}</svg><figcaption><b>${i + 1}</b> ${t}</figcaption></figure>`).join("")}</div>`;
