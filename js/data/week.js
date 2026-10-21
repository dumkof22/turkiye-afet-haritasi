// Türkiye Afet Haritası · Son 1 hafta: araştırılmış gerçek olaylar ve kaynakları
'use strict';

// Kaynaklar: [ad, bağlantı]. Olaylar haritadaki olaylara da eklenir (bkz. core/state.js).
const WEEK_SRC = {
  valilik: ["İstanbul Valisi'nin açıklaması (Evrensel / DHA, 19 Ekim)", "https://www.evrensel.net/haber/6005563/vali-gul-sel-felaketinde-8-kisi-hayatini-kaybetti-1-kisi-kayip"],
  medyascope: ["Selde son durum (Medyascope, 20 Ekim)", "https://medyascope.tv/2026/10/19/selde-en-az-9-kisi-oldu-yagis-felaketinde-son-durum/"],
  akom: ["AKOM yağış ölçümleri (Evrensel, 15 Ekim)", "https://www.evrensel.net/haber/6005085/son-84-yilin-en-yuksek-seviyesi-istanbula-aylik-toplam-yagisin-4-kati-bir-gunde-dustu"],
  kurum: ["Bakan Kurum: 39 ilçede 53 istinat duvarı yıkıldı (Yeni Ankara, 16 Ekim)", "https://www.yeniankara.com.tr/ankara/16-ekim-2026da-turkiyede-ve-dunyada-neler-oldu-gunun-one-cikan-haberleri-186555"],
  sakarya: ["İçişleri Bakanı'nın Sakarya açıklaması (Evrensel / ANKA, 16 Ekim)", "https://www.evrensel.net/haber/6005272/bakan-ciftci-sakaryada-865-kisi-tahliye-edildi-2-yapi-ve-5-kopru-yikildi"],
  kocaeli: ["Kocaeli ve Sakarya'da sel, Akçakese heyelanı (24 Saat, 15 Ekim)", "https://www.24saatgazetesi.com/kocaeli-ve-sakarya-sele-teslim-d-605-otoyolunda-heyelan-yasandi"],
  okul: ["Kocaeli'de okullar tatil (Milli Gazete, 16 Ekim)", "https://www.milligazete.com.tr/izmit-golcuk-kartepe-okullar-tatil-mi-16-ekim-kocaeli-ilce-ilce-tatil-listesi"],
  mgm: ["Meteorolojik afetler ve Yalova (Dünya / AA, 19 Ekim)", "https://www.dunya.com/gundem/bir-ayda-66-afet-iki-ilde-66-yillik-yagis-rekoru-haberi-844414"],
  demre: ["Antalya'da sağanak etkili oldu (İstiklal / AA, 14 Ekim)", "https://www.istiklal.com.tr/genel/antalyada-saganak-etkili-oldu-1108168h"],
  iski: ["İSKİ baraj doluluk oranları (Gazete Oksijen, 18 Ekim)", "https://gazeteoksijen.com/surdurulebilir-yasam/istanbul-barajlarinda-doluluk-orani-yuzde-52-43e-yukseldi-293059"],
  afad: ["AFAD: Sel bölgelerinde 60 binden fazla personel görevde (24 Saat, 17 Ekim)", "https://www.24saatgazetesi.com/afad-duyurdu-sel-bolgelerinde-60-binden-fazla-personel-sahada"],
  katalog: ["AFAD Deprem Kataloğu", "https://deprem.afad.gov.tr/event-catalog"]
};

const WEEK = {
  label: "14–21 Ekim 2026",
  updated: "21 Ekim 2026, 20.00",
  lede: "14 Ekim'de başlayan çok şiddetli yağışlar, başta İstanbul olmak üzere Marmara'da ve Antalya'da sellere yol açtı. Ne yazık ki İstanbul ve Kocaeli'de 9 kişi hayatını kaybetti. Bu hafta hasar yapan bir deprem olmadı.",
  // Panelin üstündeki sayılar (deprem sayısı AFAD verisinden ikinci sıraya eklenir)
  stats: [
    ["277,1", "kg/m² yağış: 14 Ekim'de Beykoz'a bir günde düştü", "sel-3"],
    ["%52,43", "İstanbul barajlarının doluluğu (18 Ekim)", "kuraklik-3"],
    ["60.395", "AFAD'a göre sahada görev yapan personel (17 Ekim)", "safe"]
  ],
  events: [
    { id: "w2026_ist", hz: "sel", y: 2026, date: "14–15 Ekim 2026", t: "İstanbul Selleri", sub: "Sarıyer, Ayazağa", lat: 41.112, lon: 29.015, il: 34,
      loss: "İstanbul ve Kocaeli'de 9 kişi",
      text: "14 Ekim'de başlayan çok şiddetli sağanak İstanbul'da dereleri taşırdı; sokakları, alt geçitleri, evleri ve iş yerlerini su bastı. En çok etkilenen yerlerden biri Sarıyer'in Ayazağa Mahallesi'ydi: Taşan dere araçları sürükledi. AKOM'un ölçümlerine göre bir günde Beykoz'a metrekareye 277,1, Sarıyer'e 211,8 kilogram yağış düştü. Bu, İstanbul'un bir Ekim ayı boyunca aldığı ortalama yağışın (66,3 kg) 4 katından fazla! Valiliğe selle ilgili 19 bin 300 ihbar ulaştı; yaklaşık 3 bin ev ve iş yeri ciddi hasar gördü. Bakan Kurum'a göre kentte 48 heyelan oldu, 39 ilçede 53 istinat duvarı yıkıldı.",
      lesson: "Dereler taştığında eski yataklarını geri ister. Dere yataklarına ve kenarlarına bina yapılmamalı; su basmış yollara ve alt geçitlere asla girilmemeli.",
      src: [WEEK_SRC.valilik, WEEK_SRC.medyascope, WEEK_SRC.akom, WEEK_SRC.kurum] },
    { id: "w2026_kocaeli", hz: "sel", y: 2026, date: "14–15 Ekim 2026", t: "Kocaeli'de Sel", sub: "Başiskele, Kartepe, Gebze", lat: 40.70, lon: 29.96, il: 41,
      text: "Sağanak Kocaeli'de de dereleri taşırdı. Başiskele ile Kartepe arasındaki bir köprü, yükselen dere suları nedeniyle çöktü. Seymen alt geçidini su doldurdu, Karamürsel'de bodrum katlarını su bastı. Gebze'de kaza yapan bir araç sel sularına kapıldı. Valilik okulları 15 ve 16 Ekim'de tatil etti.",
      lesson: "Su basmış yollara ve alt geçitlere araçla girilmemeli. Yalnızca 60 cm su bir otomobili sürükleyebilir!",
      src: [WEEK_SRC.kocaeli, WEEK_SRC.okul, WEEK_SRC.valilik] },
    { id: "w2026_akcakese", hz: "heyelan", y: 2026, date: "15 Ekim 2026", t: "Akçakese Heyelanı", sub: "Kocaeli, Kandıra", lat: 41.0, lon: 30.05, il: 41,
      text: "Bir gece önce başlayıp aralıksız süren yağmurdan sonra yamaçtan kayan toprak ve kaya parçaları, Akçakese'de İzmit yönüne giden yolu tamamen kapattı. Trafik çevre mahallelerden kontrollü olarak yönlendirildi; jandarma ve Karayolları ekipleri yolu iş makineleriyle açmaya başladı. Aynı yağışlarla İstanbul'da da 48 heyelan yaşandı.",
      lesson: "Yağmur suyu toprağı ağırlaştırır ve kaygan hâle getirir. Şiddetli yağışlardan sonra yamaçların altındaki yollarda dikkatli olunmalı, heyelan alanına yaklaşılmamalı.",
      src: [WEEK_SRC.kocaeli, WEEK_SRC.medyascope] },
    { id: "w2026_sakarya", hz: "sel", y: 2026, date: "14–15 Ekim 2026", t: "Sakarya Selleri", sub: "Karasu, Ferizli, Kocaali", lat: 41.10, lon: 30.69, il: 54,
      text: "Sakarya'da dereler taştı; evleri, iş yerlerini ve tarlaları su bastı. İçişleri Bakanı'nın açıklamasına göre Ferizli'ye metrekareye 275, Karasu'ya 224 kilogram yağış düştü. 865 kişi güvenli yerlere tahliye edildi; 2 yapı ve 5 köprü yıkıldı. Kocaali'de suların ortasında kalan bir evdeki yaşlı bir kadını belediye ekipleri kurtardı. Okullar iki gün tatil edildi.",
      lesson: "Yetkililer tahliye dediğinde vakit kaybetmeden uymak hayat kurtarır.",
      src: [WEEK_SRC.sakarya, WEEK_SRC.kocaeli] },
    { id: "w2026_yalova", hz: "sel", y: 2026, date: "14–15 Ekim 2026", t: "Yalova'da Su Baskınları", sub: "Armutlu, Çınarcık", lat: 40.52, lon: 28.83, il: 77,
      text: "Sağanak Yalova'da yolları su altında bıraktı. Armutlu'da bir sitenin istinat duvarı çöktü. Çınarcık'ta suların arasında mahsur kalan bir görevli iş makinesiyle kurtarıldı. Kötü hava nedeniyle okullar 15 ve 16 Ekim'de tatil edildi.",
      lesson: "Sel sırasında yüksek ve güvenli bir yerde kal, kurtarma ekiplerini bekle. Akan suyun içinden geçmeye çalışma.",
      src: [WEEK_SRC.medyascope, WEEK_SRC.mgm] },
    { id: "w2026_demre", hz: "sel", y: 2026, date: "14 Ekim 2026", t: "Demre'de Sel", sub: "Antalya", lat: 36.245, lon: 29.985, il: 7,
      text: "Antalya'nın Demre ilçesinde sağanak taşkına yol açtı. Çevreli Mahallesi'ndeki bir okulda mahsur kalan 13 öğrenci ve 7 öğretmen ile bir serada mahsur kalan 2 kişi; AFAD, emniyet, jandarma ve belediye ekiplerinin müdahalesiyle güvenli yerlere ulaştırıldı. Valilik, herkesin sağlık durumunun iyi olduğunu açıkladı. Çevreli'deki seraların yaklaşık yüzde 70'i zarar gördü.",
      lesson: "Sel sırasında sakin kal; öğretmenlerinin ve kurtarma ekiplerinin söylediklerine uy. Yüksek ve güvenli bir yerde yardımı bekle.",
      src: [WEEK_SRC.demre] },
    { id: "w2026_baraj", hz: "kuraklik", y: 2026, date: "14–18 Ekim 2026", t: "İstanbul Barajları Doldu", sub: "4 günde 14 puan arttı", lat: 41.07, lon: 29.36, il: 34,
      text: "İSKİ verilerine göre İstanbul barajlarının doluluk oranı 14 Ekim'de yüzde 38,06'ydı. Şiddetli yağışlardan sonra yalnızca 4 gün içinde, 18 Ekim'de yüzde 52,43'e yükseldi. Geçen yıl aynı gün bu oran yüzde 24,51'di.",
      lesson: "Aynı yağmur hem sele yol açtı hem de barajları doldurdu. Yine de su kaynaklarımız sınırlı: Suyu her zaman idareli kullanmalıyız.",
      src: [WEEK_SRC.iski] }
  ],
  lessons: [
    "Dere yataklarına ve kenarlarına bina yapılmamalı. Dereler taştığında eski yataklarını geri ister.",
    "Su basmış yollara, alt geçitlere ve akan suya asla girme. 15 cm hızlı akan su bir insanı, 60 cm su bir otomobili sürükleyebilir.",
    "Sel sularında elektrik tehlikesi vardır: Kopmuş tellere ve elektrik direklerine yaklaşma.",
    "Meteorolojinin turuncu uyarılarını ciddiye al; gerekmedikçe dışarı çıkma.",
    "Her gün onlarca küçük deprem olur ve çoğunu hissetmeyiz. Hazırlıklı olmak her zaman önemli!"
  ],
  // Olaylarda geçmeyen genel kaynaklar
  sources: [WEEK_SRC.katalog, WEEK_SRC.afad]
};
