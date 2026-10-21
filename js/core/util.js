// Türkiye Afet Haritası · Küçük yardımcılar: DOM, SVG ve metin
'use strict';

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
const NS = "http://www.w3.org/2000/svg";
function sv(tag, attrs, parent) {
  const el = document.createElementNS(NS, tag);
  if (attrs) for (const k in attrs) el.setAttribute(k, attrs[k]);
  if (parent) parent.appendChild(el);
  return el;
}
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const n1 = v => v.toLocaleString("tr-TR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const pad2 = n => String(n).padStart(2, "0");
const FOLD = { "ç": "c", "ğ": "g", "ı": "i", "ö": "o", "ş": "s", "ü": "u", "â": "a", "î": "i", "û": "u" };
const fold = s => s.toLocaleLowerCase("tr-TR").replace(/[çğıöşüâîû]/g, c => FOLD[c]).replace(/[^a-z0-9]/g, "");
const listTr = a => a.length < 2 ? (a[0] || "") : a.slice(0, -1).join(", ") + " ve " + a[a.length - 1];
const RM = matchMedia("(prefers-reduced-motion: reduce)");
const WIDE = matchMedia("(min-width: 1180px) and (min-height: 600px)");
function shuffle(a) { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
