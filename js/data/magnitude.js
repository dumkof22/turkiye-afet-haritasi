// Türkiye Afet Haritası · Büyüklük laboratuvarı verisi
'use strict';

// ------------------------------------------------------------------ büyüklük laboratuvarı (dünya geneli, yıllık ortalama)
const MAG_BANDS = [
  { min: 3, txt: "Genellikle hissedilir ama hasar yapmaz.", freq: "yaklaşık 130.000" },
  { min: 4, txt: "Çoğu kişi hisseder; eşyalar sallanır, camlar tıkırdar. Hasar nadirdir.", freq: "yaklaşık 13.000" },
  { min: 5, txt: "Dayanıksız binalarda hasara yol açabilir.", freq: "yaklaşık 1.300" },
  { min: 6, txt: "Yerleşim yerlerinde ağır hasara yol açabilir.", freq: "yaklaşık 130" },
  { min: 7, txt: "Büyük deprem: Geniş bir alanda ciddi hasar oluşturabilir.", freq: "yaklaşık 15" },
  { min: 8, txt: "Çok büyük deprem: Yüzlerce kilometre uzakta bile yıkıma yol açabilir.", freq: "yaklaşık 1" }
];
