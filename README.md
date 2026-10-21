# Türkiye Afet Haritası

Ortaokul öğrencileri için etkileşimli Türkiye afet haritası.
**Hazırlayan: Hakan Er**

**Canlı site:** https://dumkof22.github.io/turkiye-afet-haritasi/

## Neler var?

- 81 il için yedi afet türünde (deprem, sel, heyelan, çığ, orman yangını, kuraklık, tsunami) risk karnesi ve volkanlar
- Gerçek olaylar ve yerler, fay hatları ve levha hareketleri
- Deprem zaman tüneli ve KAF domino hikâyesi
- Bilgi yarışması ve sertifika, afet çantası oyunu, afet sözlüğü
- **Son 1 Hafta:** 14–21 Ekim 2026'da yaşanan gerçek afetler (her olayın kaynak bağlantılarıyla) ve AFAD'ın o hafta kaydettiği depremler

Bir bölümü doğrudan açmak için adresin sonuna ekleyin:
`#buhafta`, `#zaman`, `#yarisma`, `#canta`, `#sozluk`, `#deprem`, `#sel`, `#heyelan`, `#cig`, `#yangin`, `#kuraklik`, `#tsunami`, `#volkan`

Örnek: https://dumkof22.github.io/turkiye-afet-haritasi/#buhafta

## İnternetsiz kullanım (akıllı tahta)

GitHub'da **Code → Download ZIP** ile indirin, klasörü açın ve `index.html` dosyasına çift tıklayın. Kurulum gerekmez.
İnternet yoksa başlık yazı tipleri yerine bilgisayarın kendi yazı tipi kullanılır; geri kalan her şey çalışır.

## Klasör yapısı

```
index.html                 sayfa iskeleti
css/                       görünüm (tokens.css: renkler ve koyu tema)
js/data/                   içerik: metinler buradan düzenlenir
  hazards.js               afet türleri: tanım, neden, ne yapmalıyım
  events.js                haritadaki tarihî olaylar ve yerler
  week.js                  Son 1 Hafta: olaylar, dersler ve kaynaklar
  week-quakes.js           Son 1 haftanın depremleri (araçla üretilir)
  regions.js               illerin risk düzeyleri ve bölgeleri
  faults.js, glossary.js, quiz.js, bag.js, province-facts.js, magnitude.js
  geo.js                   harita geometrisi (elle düzenlenmez)
js/art/                    SVG çizimler ve simgeler
js/core/, js/map/, js/app/, js/features/   uygulama kodu
tools/afad_haftalik.py     AFAD'dan haftalık deprem verisini çeker
```

Betikler `index.html`'deki sırayla yüklenen klasik betiklerdir; bu sayede site çift tıklanarak da çalışır.
Yeni bir dosya eklerken `index.html`'deki sıraya dikkat edin: veri dosyaları kodu kullanan dosyalardan önce gelir.

## "Son 1 Hafta"yı güncelleme

1. Depremler (AFAD Deprem Kataloğu, Türkiye saatiyle tarih aralığı):

   ```
   python3 tools/afad_haftalik.py 2026-10-21 2026-10-28
   ```

2. Diğer olaylar: `js/data/week.js` içindeki `label`, `updated`, `lede`, `stats`, `events`, `lessons` ve kaynakları (`WEEK_SRC`) yeni haftaya göre düzenleyin.
   Her olayın `src` alanına haberin ya da resmî açıklamanın bağlantısını ekleyin.

## Kaynaklar

- Harita verisi: Natural Earth (kamu malı)
- Deprem bilgileri: AFAD, Kandilli Rasathanesi ve Deprem Araştırma Enstitüsü
- Fay hatları: MTA diri fay haritası esas alınarak basitleştirildi
- Diğer bilgiler: AFAD, Meteoroloji Genel Müdürlüğü, Orman Genel Müdürlüğü, DSİ
- Son 1 Hafta: AFAD Deprem Kataloğu; İstanbul Valiliği, İçişleri Bakanlığı, Çevre, Şehircilik ve İklim Değişikliği Bakanlığı, İBB AKOM ve İSKİ açıklamaları ve bunları aktaran haberler (bağlantılar sitede, her olayın kartında)

## Önemli not

Haritadaki risk düzeyleri il geneli için yapılmış, eğitim amaçlı ve yaklaşık değerlendirmelerdir. Fay hatlarının konumu basitleştirilmiştir.
Resmî ve ayrıntılı bilgi için AFAD'ın Türkiye Deprem Tehlike Haritası'na ve ilgili kurumlara başvurun. Acil durumlarda **112**'yi arayın.

© 2026 Hakan Er
