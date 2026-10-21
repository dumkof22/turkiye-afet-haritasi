// Türkiye Afet Haritası · Fay hatları ve KAF deprem zinciri
'use strict';

// ------------------------------------------------------------------ faylar
const FAULT_INFO = {
  kaf: { n: "Kuzey Anadolu Fay Hattı", ab: "KAF", type: "Sağ yanal doğrultu atımlı fay", len: "1.200 km'den uzun", speed: "Yılda yaklaşık 2–2,5 cm",
    text: "Bingöl'ün Karlıova ilçesinden başlar; Erzincan, Tokat, Bolu, Düzce, Sakarya ve Kocaeli'den geçerek Marmara Denizi'nin altından Saros Körfezi'ne uzanır. Dünyanın en etkin ve en iyi incelenen faylarından biridir.",
    extra: "Sağ yanal ne demek? Fayın bir yanında durup karşı tarafa baktığında, karşıdaki blok sağa doğru kaymış görünür." },
  kafg: { n: "KAF Güney Kolu", type: "Sağ yanal doğrultu atımlı fay", text: "Kuzey Anadolu Fayı, Bolu-Sakarya çevresinde kollara ayrılır. Güney kol İznik, Gemlik ve Biga Yarımadası'na doğru uzanır." },
  daf: { n: "Doğu Anadolu Fay Hattı", ab: "DAF", type: "Sol yanal doğrultu atımlı fay", len: "500 km'den uzun", speed: "Yılda yaklaşık 1 cm",
    text: "Karlıova'dan başlar; Elazığ (Hazar Gölü), Malatya, Adıyaman ve Kahramanmaraş üzerinden Hatay'a uzanır. 2020 Elazığ ve 2023 Kahramanmaraş depremleri bu fay üzerinde oldu.",
    extra: "Sol yanal ne demek? Fayın bir yanında durup karşı tarafa baktığında, karşıdaki blok sola doğru kaymış görünür." },
  olu: { n: "Ölü Deniz Fayı", type: "Sol yanal doğrultu atımlı fay", text: "Hatay'dan güneye doğru Suriye, Lübnan ve İsrail üzerinden Kızıldeniz'e kadar uzanır. Arap ve Afrika levhalarının sınırıdır." },
  surgu: { n: "Sürgü-Çardak Fayı", type: "Sol yanal doğrultu atımlı fay", text: "Doğu Anadolu Fayı'nın kuzey kolu. 6 Şubat 2023'teki ikinci büyük deprem (Elbistan, 7,6) bu fay üzerinde oldu." },
  gediz: { n: "Gediz Grabeni Fayı", type: "Normal fay", text: "Ege'de yer kabuğu gerildiği için oluşan çöküntü ovalarından biri. Alaşehir ve Salihli bu ovanın içindedir." },
  menderes: { n: "Büyük Menderes Grabeni Fayları", type: "Normal fay", text: "Aydın, Nazilli ve Denizli'yi içine alan çöküntü ovasının kenar fayları." },
  simav: { n: "Simav Fayı", type: "Normal fay", text: "Kütahya'nın Simav ilçesi çevresindeki etkin fay. Bu bölgede orta büyüklükte depremler sık yaşanır." },
  fethiye: { n: "Fethiye-Burdur Fay Zonu", type: "Fay kuşağı", text: "Muğla'dan Burdur'a uzanan fay kuşağı. 1971 Burdur ve 1995 Dinar depremleri bu kuşakta oldu." },
  sultandagi: { n: "Akşehir-Afyon Fayı", type: "Normal fay", text: "Sultan Dağları'nın eteğinde, Afyonkarahisar ile Konya'nın Akşehir ilçesi arasında uzanır." },
  eskisehir: { n: "Eskişehir Fay Zonu", type: "Fay kuşağı", text: "İnegöl'den Eskişehir'e ve Sivrihisar'a kadar uzanan etkin fay kuşağı." },
  izmir: { n: "İzmir Fayı", type: "Normal fay", text: "İzmir Körfezi'nin güneyinden geçen etkin bir fay. Bu yüzden İzmir'de sağlam yapılaşma çok önemlidir." },
  sisam: { n: "Sisam (Samos) Kuzey Fayı", type: "Normal fay", text: "Ege Denizi'nde, Sisam Adası'nın kuzeyinde. 30 Ekim 2020 İzmir depremi bu fayda oldu." },
  bitlis: { n: "Bitlis-Zagros Kenet Kuşağı", type: "Levha çarpışma kuşağı", text: "Arap Levhası ile Anadolu Levhası'nın çarpıştığı sınır. Güneydoğu Toroslar bu çarpışmayla yükseldi." }
};
// denizin altından geçen faylar için ek iller
const FAULT_EXTRA = { kaf: [34, 77], sisam: [35] };

// KAF deprem zinciri (boylam aralıkları)
const DOMINO = [
  { ev: "e1939", from: 39.95, to: 36.98 },
  { ev: "e1942", from: 36.98, to: 36.30 },
  { ev: "e1943", from: 36.30, to: 33.65 },
  { ev: "e1944", from: 33.00, to: 31.60 },
  { ev: "e1951", from: 33.65, to: 33.00 },
  { ev: "e1957", from: 31.60, to: 31.05 },
  { ev: "e1967", from: 31.05, to: 30.45 },
  { ev: "e1999a", from: 30.95, to: 29.30 },
  { ev: "e1999b", from: 31.60, to: 30.95 }
];
