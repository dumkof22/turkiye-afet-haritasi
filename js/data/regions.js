// Türkiye Afet Haritası · İllerin afet risk düzeyleri ve coğrafi bölgeler
'use strict';

// Risk sırası: deprem, sel, heyelan, çığ, yangın, kuraklık, tsunami (0 = kıyısı yok)
const RISK_KEYS = ["deprem", "sel", "heyelan", "cig", "yangin", "kuraklik", "tsunami"];
const RISK_RAW = {
  1: "2211321", 2: "3221120", 3: "3111120", 4: "2112110", 5: "3221110", 6: "2211120", 7: "2321322", 8: "1333111",
  9: "3211323", 10: "3211322", 11: "2121210", 12: "3123110", 13: "2123110", 14: "3221210", 15: "3111230", 16: "3221222",
  17: "3211322", 18: "3121120", 19: "3121120", 20: "3111220", 21: "2211120", 22: "1311121", 23: "3122120", 24: "3123110",
  25: "3123110", 26: "2111120", 27: "3111120", 28: "1332111", 29: "2233110", 30: "2223110", 31: "3221222", 32: "2221220",
  33: "1321322", 34: "3321223", 35: "3211323", 36: "2112110", 37: "3321211", 38: "2111120", 39: "1211221", 40: "1111120",
  41: "3221213", 42: "1111130", 43: "3111220", 44: "3122120", 45: "3211220", 46: "3222220", 47: "1111130", 48: "3211323",
  49: "3213110", 50: "1111120", 51: "1111130", 52: "1331111", 53: "1333111", 54: "3221211", 55: "2321111", 56: "2222120",
  57: "1321111", 58: "2122120", 59: "3211122", 60: "3221110", 61: "1332111", 62: "2123110", 63: "1211130", 64: "2111120",
  65: "3213110", 66: "2111120", 67: "1231111", 68: "1111130", 69: "1123120", 70: "1111130", 71: "2111120", 72: "2211120",
  73: "2123120", 74: "1321111", 75: "2112110", 76: "2111130", 77: "3221113", 78: "2221210", 79: "2111130", 80: "3211220",
  81: "3221111"
};
const RISK = {};
for (const id in RISK_RAW) RISK[id] = RISK_RAW[id].split("").map(Number);

const REGION = {
  1: "A", 2: "G", 3: "E", 4: "D", 5: "K", 6: "I", 7: "A", 8: "K", 9: "E", 10: "M", 11: "M", 12: "D", 13: "D", 14: "K",
  15: "A", 16: "M", 17: "M", 18: "I", 19: "K", 20: "E", 21: "G", 22: "M", 23: "D", 24: "D", 25: "D", 26: "I", 27: "G",
  28: "K", 29: "K", 30: "D", 31: "A", 32: "A", 33: "A", 34: "M", 35: "E", 36: "D", 37: "K", 38: "I", 39: "M", 40: "I",
  41: "M", 42: "I", 43: "E", 44: "D", 45: "E", 46: "A", 47: "G", 48: "E", 49: "D", 50: "I", 51: "I", 52: "K", 53: "K",
  54: "M", 55: "K", 56: "G", 57: "K", 58: "I", 59: "M", 60: "K", 61: "K", 62: "D", 63: "G", 64: "E", 65: "D", 66: "I",
  67: "K", 68: "I", 69: "K", 70: "I", 71: "I", 72: "G", 73: "G", 74: "K", 75: "D", 76: "D", 77: "M", 78: "K", 79: "G",
  80: "A", 81: "K"
};
const REGIONS = [
  { k: "M", n: "Marmara", t: "En kalabalık bölgemiz. Kuzey Anadolu Fayı, Marmara Denizi'nin altından geçtiği için deprem hazırlığı burada çok önemli." },
  { k: "E", n: "Ege", t: "Yer kabuğunun gerildiği, çok sayıda fay ve çöküntü ovasının bulunduğu bölge. Deprem ve orman yangını riski yüksek." },
  { k: "A", n: "Akdeniz", t: "Sıcak ve kurak yazlar orman yangınlarına, ani sağanaklar sellere yol açabilir. Hatay ve Kahramanmaraş'ta deprem riski yüksek." },
  { k: "I", n: "İç Anadolu", t: "Yağışın az olduğu bölge. Kuraklık ve obruklar önemli sorunlar. Erciyes ve Hasan Dağı gibi volkanlar burada." },
  { k: "K", n: "Karadeniz", t: "Türkiye'nin en yağışlı bölgesi. Dik yamaçlar nedeniyle sel ve heyelan en sık burada görülür." },
  { k: "D", n: "Doğu Anadolu", t: "En yüksek ve kışları en soğuk bölgemiz. Çığ riski yüksek. Ağrı Dağı ve Van Gölü burada." },
  { k: "G", n: "Güneydoğu Anadolu", t: "Arap Levhası'nın Anadolu'ya doğru ilerlediği bölge. Kuraklık ve sıcak hava dalgaları önemli riskler." }
];
const LEVEL = ["Kıyısı yok", "Düşük", "Orta", "Yüksek"];
