// Türkiye Afet Haritası · Afet çantası oyununun eşyaları
'use strict';

// ------------------------------------------------------------------ afet çantası oyunu
const BAG = [
  { id: "su", n: "İçme suyu", ok: true, why: "Herkes için en az 3 gün yetecek kadar su olmalı. Su en önemli ihtiyaçtır." },
  { id: "yiyecek", n: "Konserve ve kuru gıda", ok: true, why: "Bozulmayan ve pişirmeden yenebilen yiyecekler seçilmeli: konserve, bisküvi, kuru meyve." },
  { id: "fener", n: "El feneri", ok: true, why: "Elektrikler kesilebilir. El feneri, mum ve kibritten çok daha güvenlidir." },
  { id: "pil", n: "Yedek pil", ok: true, why: "El feneri ve radyo için yedek piller şart." },
  { id: "radyo", n: "Pilli radyo", ok: true, why: "İnternet ve telefon çalışmazsa resmî duyuruları radyodan dinleyebilirsin." },
  { id: "duduk", n: "Düdük", ok: true, why: "Enkaz altında kalırsan bağırmak yerine düdük çalarak yerini belli edebilirsin." },
  { id: "ilkyardim", n: "İlk yardım çantası", ok: true, why: "Küçük yaralanmalara hemen müdahale etmek için." },
  { id: "ilac", n: "Kişisel ilaçlar", ok: true, why: "Ailende düzenli ilaç kullanan varsa birkaç günlük ilacı çantada olmalı." },
  { id: "battaniye", n: "Battaniye", ok: true, why: "Soğuk havalarda ve dışarıda geçirilen gecelerde ısınmak için." },
  { id: "kiyafet", n: "Yedek kıyafet", ok: true, why: "Mevsime uygun yedek kıyafet, iç çamaşırı ve çorap." },
  { id: "belge", n: "Belge fotokopileri", ok: true, why: "Kimlik, tapu, sigorta gibi önemli belgelerin fotokopileri su geçirmez bir poşette saklanmalı." },
  { id: "powerbank", n: "Powerbank", ok: true, why: "Telefonunu şarj edebilmek için dolu bir taşınabilir şarj cihazı." },
  { id: "hijyen", n: "Islak mendil ve hijyen", ok: true, why: "Su azken temizlik için ıslak mendil, diş fırçası ve sabun." },
  { id: "eldiven", n: "İş eldiveni", ok: true, why: "Keskin ve kırık cisimlerden ellerini korur." },
  { id: "maske", n: "Toz maskesi", ok: true, why: "Depremden sonra havada çok fazla toz olabilir." },
  { id: "liste", n: "Kâğıda yazılı telefon listesi", ok: true, why: "Telefonun kapanırsa önemli numaralara kâğıttan ulaşabilirsin." },
  { id: "konsol", n: "Oyun konsolu", ok: false, why: "Yer kaplar ve elektrik ister. Oyalanmak için küçük bir kitap ya da kart oyunu daha iyidir." },
  { id: "tv", n: "Televizyon", ok: false, why: "Ağır ve elektrik ister. Haberleri pilli radyodan dinleyebilirsin." },
  { id: "pasta", n: "Yaş pasta", ok: false, why: "Çabuk bozulur. Çantaya yalnızca bozulmayan yiyecekler konmalı." },
  { id: "karpuz", n: "Karpuz", ok: false, why: "Çok ağırdır ve çabuk bozulur." },
  { id: "saksi", n: "Saksı çiçeği", ok: false, why: "Afet anında işe yaramaz ve çantaya sığmaz." },
  { id: "topuklu", n: "Topuklu ayakkabı", ok: false, why: "Enkaz ve kırık camların olduğu yerlerde sağlam ve rahat ayakkabı gerekir." },
  { id: "mum", n: "Mum ve kibrit", ok: false, why: "Depremden sonra gaz kaçağı olabilir; ateş yakmak çok tehlikelidir. El feneri kullan." },
  { id: "ansiklopedi", n: "Kalın ansiklopedi", ok: false, why: "Çok ağır ve gereksiz. Çanta hafif olmalı ki kolayca taşıyabilesin." }
];
