// Türkiye Afet Haritası · Harita projeksiyonu
'use strict';

// ------------------------------------------------------------------ projeksiyon (build_geo.py ile aynı)
const PJ = GEO.proj, RAD = Math.PI / 180;
function proj(lon, lat) {
  const rho = PJ.R * PJ.F / Math.pow(Math.tan(Math.PI / 4 + lat * RAD / 2), PJ.n);
  const th = PJ.n * (lon - PJ.lam0) * RAD;
  return [(rho * Math.sin(th) - PJ.x0) * PJ.s, (PJ.y1 - (PJ.rho0 - rho * Math.cos(th))) * PJ.s];
}
const polyD = pts => "M" + pts.map(p => p[0].toFixed(1) + " " + p[1].toFixed(1)).join("L");
