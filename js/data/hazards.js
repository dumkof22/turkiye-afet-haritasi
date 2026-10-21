// Türkiye Afet Haritası · Afet türleri: tanım, neden, nerede, ne yapmalıyım, ilginç bilgiler
'use strict';

// ------------------------------------------------------------------ afet türleri
const HAZ = {
  iller: {
    name: "Türkiye", short: "İller ve bölgeler",
    facts: [
      "Türkiye, 36°–42° kuzey enlemleri ile 26°–45° doğu boylamları arasında yer alır. “Enlem-boylam” düğmesiyle bu çizgileri haritada görebilirsin.",
      "Türkiye'de 81 il ve 7 coğrafi bölge vardır. Haritadaki her parça bir ildir.",
      "Anadolu üç tarafı denizlerle çevrili bir yarımadadır: kuzeyde Karadeniz, batıda Ege Denizi, güneyde Akdeniz.",
      "Türkiye'nin en yüksek noktası, aynı zamanda bir volkan olan Ağrı Dağı'dır (5.137 m).",
      "Yüzölçümü en büyük ilimiz Konya, en küçüğü Yalova'dır."
    ]
  },
  deprem: {
    name: "Deprem", short: "Fay hatları ve büyük depremler", legend: "Deprem tehlikesi",
    def: "Deprem, yerin derinliklerinde biriken enerjinin bir anda boşalmasıyla oluşan ve dalgalar hâlinde yayılan sarsıntıdır.",
    why: "Yer kabuğu, levha adı verilen dev parçalardan oluşur. Bu levhalar her yıl birkaç santimetre hareket eder. Levhaların sınırlarındaki kırıklara fay denir. Fay boyunca kayaçlar birbirine takılır ve gerilim birikir. Kayaçlar bu gerilime dayanamayıp aniden kırıldığında biriken enerji dalgalar hâlinde yayılır ve yer sallanır.",
    where: "Türkiye, dünyanın en etkin deprem kuşaklarından biri olan Alp-Himalaya Deprem Kuşağı üzerindedir. Kuzeye ilerleyen Arap Levhası Anadolu'yu sıkıştırır, Anadolu Levhası da batıya doğru kaçar. Bu hareket Kuzey Anadolu ve Doğu Anadolu fay hatlarını oluşturur. Ege Bölgesi'nde ise yer kabuğu gerildiği için çok sayıda fay ve çöküntü ovası vardır.",
    tabs: [
      ["Önce", [
        "Ailenle bir afet planı yap: Deprem olursa nerede buluşacağınıza birlikte karar verin.",
        "Dolap, kitaplık ve buzdolabı gibi devrilebilecek eşyaları duvara sabitle.",
        "Afet ve acil durum çantanı hazırla. En az 3 gün (72 saat) yetecek şekilde olsun.",
        "Evinde ve okulunda güvenli noktaları öğren: sağlam bir masanın altı gibi.",
        "Mahallendeki toplanma alanını öğren. Toplanma alanlarını e-Devlet'ten ya da AFAD'ın sitesinden bulabilirsin.",
        "Okulundaki deprem tatbikatlarına ciddiyetle katıl."
      ]],
      ["Sırasında", [
        "ÇÖK, KAPAN, TUTUN! Yere çök, sağlam bir masanın altına gir, başını ve enseni koru, masanın ayağına sıkıca tutun.",
        "Pencerelerden, camlardan ve devrilebilecek eşyalardan uzak dur.",
        "Merdivenlere koşma, asansör kullanma. Balkondan ya da pencereden asla atlama!",
        "Yataktaysan yatakta kal ve başını yastıkla koru.",
        "Dışarıdaysan binalardan, ağaçlardan, direklerden ve elektrik tellerinden uzak, açık bir alana geç.",
        "Araçtaysanız araç güvenli bir yerde durdurulsun ve sarsıntı bitene kadar araçta kalın. Köprü ve üst geçitlerin altında durmayın."
      ]],
      ["Sonra", [
        "Önce kendini kontrol et, sonra çevrendekilere yardım et.",
        "Sarsıntı bitince sakince, merdivenleri kullanarak binadan çık ve toplanma alanına git.",
        "Artçı sarsıntılar olabilir. Hasarlı binalara geri girme.",
        "Gaz kokusu alırsan kibrit ya da çakmak yakma, elektrik düğmelerine dokunma.",
        "Telefonu sadece acil durumlar için kullan. Kısa mesaj, aramaya göre hatları daha az meşgul eder.",
        "Enkaz altında kalırsan ağzını ve burnunu bir bezle kapat. Bağırarak enerjini harcama; düdük çal ya da borulara, duvara vurarak ses çıkar."
      ]]
    ],
    facts: [
      "Anadolu Levhası her yıl yaklaşık 2 cm batıya doğru hareket ediyor. Bu hız, tırnaklarımızın uzama hızına yakın!",
      "Depremler önceden tahmin edilemez. Ama nerede olabileceğini biliyoruz. Bu yüzden en iyi korunma yolu hazırlıklı olmaktır.",
      "“Deprem havası” diye bir şey yoktur. Depremlerin havanın sıcak ya da soğuk olmasıyla ilgisi yoktur; günün her saatinde olabilir.",
      "Dünyada her yıl ortalama 15 kadar 7 büyüklüğünde deprem olur.",
      "Depremde can kayıplarına çoğunlukla dayanıksız binaların yıkılması yol açar. Sağlam yapılmış binalar büyük depremlerde bile ayakta kalabilir.",
      "1999 Marmara depreminden sonra zorunlu deprem sigortası (DASK) başladı ve 2009'da AFAD kuruldu.",
      "Kuzey Anadolu ve Doğu Anadolu fay hatları Bingöl'ün Karlıova ilçesinde birleşir. Bilim insanları buraya “Karlıova üçlü eklemi” der."
    ]
  },
  sel: {
    name: "Sel", short: "Taşkınlar ve ani seller", legend: "Sel tehlikesi",
    def: "Sel, kısa sürede yağan çok fazla yağmur ya da hızla eriyen kar nedeniyle derelerin ve nehirlerin taşarak çevreye zarar vermesidir.",
    why: "Toprak, yağmur suyunu bir sünger gibi emer. Ama kısa sürede çok fazla yağış olursa toprak buna yetişemez ve su yüzeyde akmaya başlar. Dereler dolar ve taşar. Dere yataklarına ev yapılması, ormanların kesilmesi ve şehirlerde toprağın beton ve asfaltla kaplanması sel riskini artırır.",
    where: "Karadeniz Bölgesi, bol yağış alması ve dik yamaçlı dar vadileri nedeniyle sellerin en sık görüldüğü bölgedir. Akdeniz ve Ege kıyılarında ani sağanaklar, büyük şehirlerde ise yetersiz altyapı sellere yol açabilir. Edirne'de Meriç ve Tunca nehirleri zaman zaman taşar.",
    tabs: [
      ["Önce", [
        "Evinin bir dere yatağında ya da taşkın alanında olup olmadığını öğren.",
        "Meteoroloji uyarılarını takip et. Turuncu ve kırmızı uyarıları ciddiye al.",
        "Önemli belgeleri ve değerli eşyaları yüksek raflarda, su geçirmez poşetlerde sakla.",
        "Afet ve acil durum çantanı hazır tut."
      ]],
      ["Sırasında", [
        "Hemen yüksek bir yere çık. Bodrum ve zemin katlardan uzaklaş.",
        "Akan suyun içinden asla yürüyerek ya da araçla geçmeye çalışma.",
        "Dere kenarlarından, köprülerden ve menfezlerden uzak dur.",
        "Elektrik direklerinden ve kopmuş tellerden uzak dur. Su elektriği iletir.",
        "Yetkililer tahliye derse vakit kaybetmeden uy."
      ]],
      ["Sonra", [
        "Sel suyu mikrop ve kimyasal madde taşıyabilir. Dokunma, içinde oynama.",
        "Yetkililer izin vermeden eve dönme.",
        "Islanan elektrikli aletleri kontrol ettirmeden çalıştırma.",
        "Musluk suyunun içilebilir olduğu duyurulana kadar şişe suyu iç ya da suyu kaynat."
      ]]
    ],
    facts: [
      "Sadece 15 cm derinliğindeki hızlı akan su bir yetişkini yere düşürebilir. 60 cm su ise bir otomobili sürükleyebilir!",
      "Rize, Türkiye'nin en çok yağış alan ilidir. Yılda 2.000 milimetreden fazla yağış alır.",
      "Ağaçlar selin en büyük düşmanlarındandır: Kökleri toprağı tutar, yaprakları yağmurun hızını keser.",
      "İklim değişikliğiyle birlikte kısa sürede çok yoğun yağan “aşırı yağış” olayları artıyor.",
      "Haritada nehirler mavi çizgilerle gösterilmiştir. Sel katmanında nehirler daha belirgin görünür."
    ]
  },
  heyelan: {
    name: "Heyelan", short: "Toprak kaymaları", legend: "Heyelan tehlikesi",
    def: "Heyelan, eğimli yamaçlardaki toprak, taş ve kaya kütlelerinin yer çekiminin etkisiyle aşağıya doğru kaymasıdır. Halk arasında “toprak kayması” denir.",
    why: "Yamaçlar ne kadar dik olursa kayma riski o kadar artar. Yağmur ve eriyen kar suyu toprağı ağırlaştırır ve kaygan hâle getirir. Killi topraklar, yamaçları kesen yol ve inşaat çalışmaları, ağaçların kesilmesi ve depremler de heyelanı tetikleyebilir.",
    where: "Doğu Karadeniz'de (Rize, Trabzon, Artvin, Giresun, Ordu) dik yamaçlar ve bol yağış nedeniyle heyelanlar çok sık görülür. Batı Karadeniz'de Zonguldak ve Bartın da risklidir. Heyelan, ülkemizde en sık yaşanan doğal afetlerden biridir.",
    tabs: [
      ["Önce", [
        "Yamaçlarda yeni oluşan çatlaklar, eğilen ağaçlar ve direkler, aniden çıkan su kaynakları heyelan habercisi olabilir. Gördüğünde büyüklerine ve yetkililere haber ver.",
        "Ağaç dikmek yamaçları sağlamlaştırır.",
        "Yeni bir bina yapılırken zemin etüdü mutlaka yaptırılmalıdır."
      ]],
      ["Sırasında", [
        "Kayan kütlenin yolundan, hareket yönüne dik olacak şekilde yana doğru hızla uzaklaş.",
        "Vadilerden ve dere yataklarından uzak dur. Heyelan çamur akıntısına dönüşebilir.",
        "Kaçamıyorsan bir top gibi kıvrıl ve başını koru."
      ]],
      ["Sonra", [
        "Heyelan alanına yaklaşma ve izlemeye gitme. İkinci bir kayma olabilir.",
        "Yaralı ya da mahsur kalan birini görürsen 112'yi ara.",
        "Kırılan su, gaz ve elektrik hatlarını yetkililere bildir."
      ]]
    ],
    facts: [
      "Trabzon'daki Uzungöl ve Sera Gölü ile Erzurum'daki Tortum Gölü, heyelanların vadilerin önünü kapatmasıyla oluşmuş “heyelan set gölleri”dir.",
      "1988'de Trabzon Maçka'daki Çatak heyelanında 64 kişi hayatını kaybetti. Kayıpların çoğu, ilk kaymayı izlemeye gelenlerin ikinci büyük kaymaya yakalanmasıyla oldu.",
      "Bazı heyelanlar çok yavaş ilerler: Yılda yalnızca birkaç santimetre kayan yamaçlar da vardır.",
      "Bitki örtüsü yamaçların en iyi koruyucusudur. Ağaç kökleri toprağı bir ağ gibi tutar."
    ]
  },
  cig: {
    name: "Çığ", short: "Kar kütlesi kaymaları", legend: "Çığ tehlikesi",
    def: "Çığ, dağların dik yamaçlarında biriken büyük kar kütlelerinin aniden ve hızla aşağı doğru kaymasıdır.",
    why: "Kısa sürede yağan çok miktarda kar, havaların aniden ısınması, kuvvetli rüzgâr ve 30–45 derece eğimli ağaçsız yamaçlar çığ riskini artırır. Çığların çoğu, kar tabakasının üzerine binen ek bir yükle, örneğin bir kayakçı ya da yürüyüşçüyle tetiklenir.",
    where: "Doğu Anadolu'nun yüksek dağlık illeri (Hakkari, Van, Bitlis, Muş, Bingöl, Erzurum, Tunceli, Şırnak) ile Doğu Karadeniz'in yüksek kesimleri (Rize, Artvin, Gümüşhane, Bayburt) çığ riskinin en yüksek olduğu yerlerdir. Özellikle kışın dağ yolları ve köyler risk altındadır.",
    tabs: [
      ["Önce", [
        "Kışın dağ yolculuğuna çıkmadan önce hava durumunu ve çığ uyarılarını takip edin.",
        "Çığ uyarısı olan yamaçlara ve kayak pistlerinin dışındaki alanlara gitme.",
        "Araçta kar zinciri, battaniye, su ve yiyecek bulundurun."
      ]],
      ["Sırasında", [
        "Çığın yolundan yana doğru uzaklaş.",
        "Yakalanırsan yüzer gibi kollarını hareket ettirerek kar yüzeyinde kalmaya çalış.",
        "Çığ yavaşlarken bir elini yüzünün önüne koyarak nefes alabileceğin bir boşluk oluştur."
      ]],
      ["Sonra", [
        "Birinin çığa yakalandığını görürsen son görüldüğü yeri aklında tut ve hemen 112'yi ara.",
        "İlk dakikalar çok önemlidir. Kurtarma ekiplerine son görülen yeri tarif et.",
        "Çığ düşen yere uzmanlar güvenli demeden girme. İkinci bir çığ düşebilir."
      ]]
    ],
    facts: [
      "Bir çığ, saniyeler içinde saatte 100 kilometrenin üzerinde hıza ulaşabilir. Bu, otoyoldaki bir otomobilden bile hızlı olabilir!",
      "Rize ile Erzurum arasındaki Ovit Tüneli, kışın kar ve çığ nedeniyle uzun süre kapanan Ovit Dağı Geçidi'nin altından geçer.",
      "Ağaçlandırma ve çığ bariyerleri, köyleri ve yolları çığlardan korumanın en etkili yollarındandır.",
      "Eğitimli arama-kurtarma köpekleri, karın altında kalan insanları kokularından bulabilir."
    ]
  },
  yangin: {
    name: "Orman Yangını", short: "Sıcak, kuru ve rüzgârlı yazlar", legend: "Orman yangını tehlikesi",
    def: "Orman yangını, ormanlık alanlarda kontrolsüz şekilde yayılarak ağaçlara, hayvanlara ve yakındaki yerleşim yerlerine zarar veren yangındır.",
    why: "Bir yangının çıkması için üç şey gerekir: ısı, yakıt (kuru ot, dal, yaprak) ve oksijen. Buna “yangın üçgeni” denir. Yazın sıcak, kuru ve rüzgârlı hava yangınların hızla yayılmasına neden olur. Orman yangınlarının büyük çoğunluğu insan kaynaklıdır: söndürülmeyen sigaralar, piknik ve mangal ateşleri, anız (tarla) yakma ve dikkatsizlik.",
    where: "Akdeniz ve Ege kıyıları (Antalya, Muğla, İzmir, Mersin, Aydın) ile Çanakkale ve Balıkesir yangın riskinin en yüksek olduğu yerlerdir. Bu bölgelerde yazlar sıcak ve kurak geçer, kolay tutuşan kızılçam ormanları yaygındır.",
    tabs: [
      ["Önce", [
        "Ormanda ateş yakma. Mangal ve piknik ateşi yalnızca izin verilen yerlerde yakılmalı ve tamamen söndürülmelidir.",
        "Ormana cam şişe, cam kırığı ve çöp bırakma.",
        "Anız (tarla) yakmanın hem yasak hem de çok tehlikeli olduğunu ailene hatırlat.",
        "Evin çevresindeki kuru otları ve dalları temizleyin."
      ]],
      ["Sırasında", [
        "Duman ya da alev görürsen hemen 112'yi ara. Ne kadar erken haber verilirse yangın o kadar kolay söndürülür.",
        "Yangından, rüzgârın onu taşıdığı yönün tersine doğru uzaklaş. Yokuş yukarı kaçma: Yangın yokuş yukarı daha hızlı ilerler.",
        "Ağzını ve burnunu ıslak bir bezle kapat.",
        "Yetkililerin tahliye talimatlarına hemen uy."
      ]],
      ["Sonra", [
        "Yetkililer izin vermeden yanmış alana girme. Küllerin altında köz kalabilir.",
        "Fidan dikme kampanyalarına katılarak ormanların yeniden yeşermesine yardım et."
      ]]
    ],
    facts: [
      "Türkiye topraklarının neredeyse üçte biri ormanlarla kaplıdır.",
      "2021'deki Manavgat yangınında yaklaşık 60 bin hektar alan zarar gördü. Bu, yaklaşık 84 bin futbol sahası büyüklüğünde!",
      "Ormana bırakılan cam şişe ve kırıklar güneş ışığını bir büyüteç gibi toplayarak yangına yol açabilir.",
      "Kızılçam ormanları yangından sonra kendini yenileyebilir, ama yanan bir ormanın eski hâline gelmesi onlarca yıl sürer.",
      "Orman yangınını ihbar etmek için de 112 aranır."
    ]
  },
  kuraklik: {
    name: "Kuraklık", short: "Azalan yağış, kuruyan göller", legend: "Kuraklık riski",
    def: "Kuraklık, bir bölgenin uzun süre normalden çok daha az yağış alması sonucu suyun azalmasıdır. Yavaş gelir ama etkisi yıllarca sürebilir.",
    why: "Yağışların azalması, sıcaklıklar arttıkça buharlaşmanın çoğalması, yer altı sularının aşırı kullanılması ve iklim değişikliği kuraklığa yol açar. Tarlalarda suyun israf edilmesi de su kaynaklarını hızla tüketir.",
    where: "İç Anadolu (özellikle Konya Kapalı Havzası) ile Güneydoğu Anadolu kuraklığa en açık bölgelerimizdir. Türkiye, kişi başına düşen su miktarına göre “su stresi” yaşayan ülkeler arasındadır.",
    tabs: [
      ["Evde", [
        "Dişlerini fırçalarken ve sabunlanırken musluğu kapat.",
        "Duş süreni kısalt.",
        "Damlatan muslukları büyüklerine söyle, tamir ettirin.",
        "Bulaşık ve çamaşır makinelerini tam doluyken çalıştırın."
      ]],
      ["Okulda", [
        "Okulunda “su dedektifi” ol: Damlatan muslukları okul yönetimine bildir.",
        "Su tasarrufu hakkında pano ve afiş hazırlayın.",
        "Okul bahçesinde az su isteyen bitkiler yetiştirin."
      ]],
      ["Toplumda", [
        "Tarımda salma sulama yerine damla sulama kullanmak çok büyük miktarda su kazandırır.",
        "Yer altı suları kontrolsüz kuyularla çekilmemelidir.",
        "Yağmur suyu toplanıp bahçe sulamada kullanılabilir."
      ]]
    ],
    facts: [
      "Konya'da yer altı sularının aşırı çekilmesi, toprağın aniden çökmesiyle oluşan dev çukurlara, yani obruklara yol açıyor.",
      "“Dünyanın nazar boncuğu” denilen Meke Gölü (Konya-Karapınar) kuraklık nedeniyle büyük ölçüde kurudu.",
      "Tuz Gölü, Türkiye'nin ikinci büyük gölüdür. Yazın büyük bölümü kurur ve flamingolar için önemli bir üreme alanıdır.",
      "Dişlerini fırçalarken musluğu kapatmak her seferinde birkaç litre su kazandırır.",
      "Damla sulama suyu sadece bitkinin köküne verir. Bu sayede çok daha az su harcanır."
    ]
  },
  tsunami: {
    name: "Tsunami", short: "Denizden gelen dev dalgalar", legend: "Tsunami tehlikesi (kıyılar)",
    def: "Tsunami, deniz tabanında olan büyük depremler, denizaltı heyelanları ya da volkanik patlamalar sonucu oluşan dev dalgalar dizisidir. “Tsunami” Japonca “liman dalgası” anlamına gelir.",
    why: "Deniz tabanı aniden yükselip alçaldığında üstündeki su kütlesi de yerinden oynar ve dalgalar oluşur. Açık denizde bir uçak kadar hızlı (saatte 700–800 km) ilerleyen tsunami, kıyıya yaklaştıkça yavaşlar ama boyu yükselir.",
    where: "Marmara, Ege ve Akdeniz kıyılarımız tsunami tehlikesi taşır. 1999 Gölcük depreminde İzmit Körfezi'nde, 2017'de Bodrum'da ve 2020 İzmir (Sisam) depreminde Seferihisar'da küçük tsunamiler yaşandı. Karadeniz kıyılarında tehlike daha düşüktür.",
    tabs: [
      ["Önce", [
        "Kıyıda yaşıyorsan ya da tatildeysen yüksek yerlere giden tahliye yollarını öğren.",
        "Kıyıdaki tsunami uyarı tabelalarına dikkat et."
      ]],
      ["Sırasında", [
        "Kıyıdayken güçlü bir deprem hissedersen ya da deniz aniden çekilirse hiç beklemeden yüksek bir yere ya da kıyıdan içeriye doğru uzaklaş.",
        "Dalgayı izlemek ya da fotoğraf çekmek için asla bekleme.",
        "Yakında yüksek bir yer yoksa sağlam ve yüksek bir binanın üst katlarına çık."
      ]],
      ["Sonra", [
        "Tsunami tek bir dalga değildir; dalgalar saatlerce gelebilir. Yetkililer güvenli diyene kadar kıyıya dönme.",
        "Resmî duyuruları radyo ve televizyondan takip et."
      ]]
    ],
    facts: [
      "Tsunami açık denizde birkaç on santimetre yüksekliğinde olabilir; gemiler fark etmeyebilir. Kıyıya yaklaşınca birkaç metreye yükselebilir.",
      "Kandilli Rasathanesi, bölgemiz için tsunami uyarı merkezi olarak görev yapar.",
      "Denizin aniden çekilmesi, tsunaminin en önemli doğal uyarı işaretlerinden biridir.",
      "1509 İstanbul depreminde de tsunami oluştuğu tarihî kayıtlarda yer alır."
    ]
  },
  volkan: {
    name: "Volkan", short: "Türkiye'nin uyuyan devleri", legend: "Volkanlar ve volkanik yerler",
    def: "Volkan (yanardağ), yerin derinliklerindeki erimiş kayaçların, yani magmanın yeryüzüne çıktığı yerdir. Magma yeryüzüne ulaştığında lav adını alır.",
    why: "Levhaların birbirinden uzaklaştığı, birbirinin altına daldığı ya da çarpıştığı yerlerde magma yükselebilir. Anadolu'daki volkanlar da levha hareketleriyle ilişkili olarak milyonlarca yıl içinde oluştu.",
    where: "Türkiye'de bugün püsküren bir volkan yok. Ancak Ağrı, Nemrut, Tendürek, Süphan, Erciyes ve Hasan Dağı gibi volkanlar bilim insanlarınca izleniyor. Kapadokya'nın peribacaları ve Van Gölü, volkanların ülkemize kazandırdığı doğa harikalarıdır.",
    tabs: [
      ["Nasıl oluşur?", [
        "Magma, çevresindeki kayaçlardan daha hafif olduğu için yukarı doğru yükselir.",
        "Yeryüzüne çıkan lav soğuyarak katılaşır. Kat kat biriken lav ve küller volkan konisini oluşturur.",
        "Bir püskürmede lav, kül, gaz ve kayaç parçaları çıkabilir."
      ]],
      ["Türkiye'de", [
        "Ağrı Dağı (5.137 m) Türkiye'nin en yüksek dağıdır ve bir volkandır.",
        "Bitlis'teki Nemrut Dağı'nın kraterinde Türkiye'nin en büyük krater gölü bulunur.",
        "Kapadokya'nın peribacaları, volkanik küllerin (tüf) rüzgâr ve yağmurla aşınmasıyla oluştu.",
        "Manisa'daki Kula volkanları UNESCO Küresel Jeoparkı olarak korunmaktadır."
      ]],
      ["Püskürürse", [
        "Yetkililerin tahliye talimatlarına uy.",
        "Volkanik kül solunum yollarına zararlıdır. Maske tak, kapı ve pencereleri kapat.",
        "Lav akıntısının yolu üzerindeki vadilerden ve derelerden uzak dur."
      ]]
    ],
    facts: [
      "Van Gölü, Nemrut Dağı'ndan çıkan lavların bir vadinin önünü kapatmasıyla oluşmuş bir “volkanik set gölü”dür ve Türkiye'nin en büyük gölüdür.",
      "Çatalhöyük'te bulunan yaklaşık 9.000 yıllık bir duvar resminin Hasan Dağı'nın püskürmesini gösterdiği düşünülüyor.",
      "Bitlis'teki volkanik Nemrut Dağı'nı, Adıyaman'daki heykelleriyle ünlü Nemrut Dağı ile karıştırma!",
      "Kula'da volkanik küller üzerinde binlerce yıllık insan ayak izleri bulunmuştur.",
      "Erciyes Dağı (3.917 m) İç Anadolu'nun en yüksek dağıdır ve aynı zamanda bir volkandır."
    ]
  }
};
