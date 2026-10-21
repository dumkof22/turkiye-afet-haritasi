// Türkiye Afet Haritası · Bilgi yarışması soruları ve unvanlar
'use strict';

// ------------------------------------------------------------------ bilgi yarışması
const QUIZ = [
  { q: "Deprem anında yakınında sağlam bir masa varsa ne yapmalısın?",
    a: ["Çök, kapan, tutun: Masanın altına girip başımı korur, masaya tutunurum", "Hemen merdivenlere koşarım", "Balkona çıkarım", "Asansörle aşağı inerim"],
    ex: "Deprem anında koşmak, merdivenleri ya da asansörü kullanmak tehlikelidir. Doğru hareket: ÇÖK, KAPAN, TUTUN!" },
  { q: "Türkiye'de tüm acil durumlar için hangi numarayı aramalısın?", a: ["112", "911", "199", "100"],
    ex: "112 Acil Çağrı Merkezi ambulans, itfaiye, polis, jandarma, AFAD ve orman yangını ihbarı için tek numaradır. 911 ise ABD'de kullanılır." },
  { map: "kaf", faults: true, q: "Haritada Kuzey Anadolu Fay Hattı'nın geçtiği illerden birine dokun.", hint: "İpucu: Kalın kırmızı çizgiyi takip et.",
    ex: "Kuzey Anadolu Fayı; Bingöl, Erzincan, Tokat, Amasya, Çorum, Kastamonu, Çankırı, Bolu, Düzce, Sakarya ve Kocaeli gibi illerden geçer ve Marmara Denizi'nin altından Saros Körfezi'ne uzanır." },
  { q: "Türkiye hangi deprem kuşağı üzerinde yer alır?", a: ["Alp-Himalaya Deprem Kuşağı", "Pasifik Ateş Çemberi", "Atlas Okyanusu Ortası Sırtı", "Doğu Afrika Rift Vadisi"],
    ex: "Türkiye, Avrupa'dan Asya'ya uzanan Alp-Himalaya Deprem Kuşağı üzerindedir. Pasifik Ateş Çemberi ise Japonya ve Şili gibi ülkeleri içine alır." },
  { q: "Heyelanlar en sık hangi bölgemizde görülür?", a: ["Karadeniz Bölgesi", "İç Anadolu Bölgesi", "Güneydoğu Anadolu Bölgesi", "Ege Bölgesi"],
    ex: "Karadeniz'de yamaçlar dik, yağış boldur. Bu iki etken heyelan riskini çok artırır." },
  { q: "Orman yangınlarının büyük çoğunluğunun nedeni nedir?", a: ["İnsanların dikkatsizliği ve ihmali", "Yıldırım düşmesi", "Volkan patlamaları", "Depremler"],
    ex: "Sigara izmaritleri, piknik ateşleri, anız yakma gibi insan kaynaklı nedenler orman yangınlarının büyük çoğunluğunu oluşturur." },
  { q: "Kıyıdayken deniz suyu aniden çekilirse ne yapmalısın?", a: ["Hemen kıyıdan uzaklaşıp yüksek bir yere çıkarım", "Ortaya çıkan deniz kabuklarını toplarım", "Fotoğraf çekmek için beklerim", "Denize girip yüzerim"],
    ex: "Denizin aniden çekilmesi tsunaminin habercisi olabilir. Hiç beklemeden yüksek bir yere çık!" },
  { map: [46], q: "6 Şubat 2023'teki iki büyük depremin merkez üssü olan ile dokun.",
    ex: "Depremlerin merkez üsleri Kahramanmaraş'ın Pazarcık (7,7) ve Elbistan (7,6) ilçeleriydi." },
  { q: "Afet ve acil durum çantası en az ne kadar süre yetecek şekilde hazırlanmalı?", a: ["3 gün (72 saat)", "1 gün", "1 hafta", "1 ay"],
    ex: "Afetten sonraki ilk 72 saat çok önemlidir. Çantan en az 3 gün yetecek malzeme içermeli." },
  { q: "7 büyüklüğündeki bir deprem, 6 büyüklüğündekinden yaklaşık kaç kat fazla enerji açığa çıkarır?", a: ["Yaklaşık 32 kat", "Yaklaşık 2 kat", "Yaklaşık 10 kat", "Aynı enerjiyi"],
    ex: "Büyüklük 1 arttığında açığa çıkan enerji yaklaşık 32 kat artar. 6'dan 8'e çıkınca bu fark yaklaşık 1.000 kata ulaşır!" },
  { q: "“Obruk” nedir?", a: ["Yer altındaki boşlukların çökmesiyle oluşan derin çukur", "Bir volkan türü", "Kurumuş bir nehir yatağı", "Kıyıdaki sarp kayalık"],
    ex: "Konya Kapalı Havzası'nda yer altı suyunun aşırı çekilmesi yeni obrukların oluşmasına yol açıyor." },
  { q: "Sel sırasında aşağıdakilerden hangisi YANLIŞ bir davranıştır?", a: ["Akan suyun içinden yürüyerek karşıya geçmek", "Yüksek bir yere çıkmak", "Elektrik tellerinden uzak durmak", "Yetkililerin uyarılarına uymak"],
    ex: "Sadece 15 cm derinliğindeki hızlı akan su bile bir insanı yere düşürebilir. Akan suya asla girme!" },
  { map: "cig3", q: "Çığ riskinin yüksek olduğu illerden birine dokun.", hint: "İpucu: Doğu Anadolu'nun yüksek dağlarını düşün.",
    ex: "Hakkari, Van, Bitlis, Muş, Bingöl, Erzurum, Erzincan, Tunceli ve Şırnak ile Rize, Artvin, Gümüşhane ve Bayburt çığ riskinin yüksek olduğu illerdendir." },
  { q: "Türkiye'nin en büyük gölü olan Van Gölü nasıl oluştu?", a: ["Nemrut volkanından çıkan lavların bir vadinin önünü kapatmasıyla", "Bir göktaşının çarpmasıyla", "Bir buzulun erimesiyle", "İnsanlar tarafından baraj gölü olarak yapıldı"],
    ex: "Van Gölü bir volkanik set gölüdür. Nemrut Dağı'nın lavları suların aktığı vadiyi kapatmış ve göl oluşmuştur." },
  { q: "Aşağıdakilerden hangisi deprem öncesinde yapılması gereken bir hazırlıktır?", a: ["Dolap ve kitaplıkları duvara sabitlemek", "Ağır eşyaları dolapların üstüne koymak", "Yatağı büyük bir pencerenin hemen altına koymak", "Kapı önlerine eşya yığmak"],
    ex: "Sabitlenmemiş eşyalar deprem sırasında devrilerek yaralanmalara ve kaçış yollarının kapanmasına yol açabilir." },
  { map: "ege3", q: "Ege Bölgesi'nde deprem tehlikesi yüksek olan illerden birine dokun.",
    ex: "İzmir, Manisa, Aydın, Denizli, Muğla, Kütahya ve Afyonkarahisar, Ege'de deprem tehlikesinin yüksek olduğu illerdendir. Ege'de yer kabuğu gerildiği için çok sayıda fay vardır." }
];
const RANKS = [[15, "Afet Bilinci Uzmanı"], [12, "Afet Bilinci Elçisi"], [8, "Afet Gönüllüsü"], [0, "Afet Çırağı"]];
