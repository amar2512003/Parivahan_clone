// Seeded RTO locations used by the locator demo.  Each state has a primary
// and a secondary office so the map, nearest-office calculation, and list can
// be exercised without relying on a third-party directory API.
//
// Karnataka, West Bengal, Maharashtra, Uttar Pradesh, Andhra Pradesh,
// Arunachal Pradesh, Assam, Bihar, Chhattisgarh, Goa, Gujarat, Jammu &
// Kashmir, Jharkhand, Himachal Pradesh, Kerala, Madhya Pradesh, Manipur,
// Punjab, and Rajasthan are special cases: instead of a generic 2-office
// placeholder, they're
// seeded with real RTO jurisdictions (codes, localities, and addresses
// sourced from official Transport Dept. listings / multiple corroborating
// public reference sources) for fuller coverage. Himachal Pradesh is the one
// partial exception — its ~90+ code scheme (district HQs, sub-divisional
// offices, tourist/government series) is large and inconsistently
// documented across sources, so it's seeded with just the state's 12 main
// district-headquarters RTOs rather than an attempt at the full table.
// Phone numbers everywhere in this file — including for these detailed
// states — stay in the same fictitious "1800 121 xxxx" demo format used
// across the rest of the site, rather than mixing in real published
// landline numbers that could be stale or misdialed by someone testing the
// app.
const STATE_RTO_SEEDS = [
  ["HR", "Haryana", "Gurugram", [28.4595, 77.0266], "Faridabad", [28.4089, 77.3178]],
  ["MZ", "Mizoram", "Aizawl", [23.7271, 92.7176], "Lunglei", [22.8864, 92.7425]],
  ["ML", "Meghalaya", "Shillong", [25.5788, 91.8933], "Tura", [25.514, 90.2024]],
  ["NL", "Nagaland", "Kohima", [25.6751, 94.1086], "Dimapur", [25.904, 93.7266]],
  ["OD", "Odisha", "Bhubaneswar", [20.2961, 85.8245], "Cuttack", [20.4625, 85.883]],
  ["SK", "Sikkim", "Gangtok", [27.3389, 88.6065], "Namchi", [27.1664, 88.3638]],
  ["TN", "Tamil Nadu", "Chennai Central", [13.0827, 80.2707], "Coimbatore", [11.0168, 76.9558]],
  ["TS", "Telangana", "Hyderabad Central", [17.385, 78.4867], "Warangal", [17.9689, 79.5941]],
  ["TR", "Tripura", "Agartala", [23.8315, 91.2868], "Udaipur", [23.5333, 91.4833]],
  ["UK", "Uttarakhand", "Dehradun", [30.3165, 78.0322], "Haldwani", [29.2183, 79.513]],
];

function makeOffice(code, state, city, coordinates, sequence) {
  const officeNumber = `${code}-${String(sequence).padStart(2, "0")}`;

  return {
    id: officeNumber,
    stateCode: code,
    state,
    name: `Regional Transport Office, ${city}`,
    shortName: `RTO ${city}`,
    address: `Transport Department Campus, ${city}, ${state}`,
    phone: `1800 121 ${String(7200 + sequence).padStart(4, "0")}`,
    coordinates,
  };
}

function demoPhone(sequence) {
  return `1800 121 ${String(7200 + sequence).padStart(4, "0")}`;
}

// All jurisdictional RTOs within Bengaluru city, plus Mysuru for coverage
// outside the city. Localities and codes reflect the real Karnataka
// Transport Dept. jurisdiction split as of the most recent published
// listings; addresses are trimmed to the office locality (not the full
// building/floor detail) since exact building particulars change more
// often than the jurisdiction itself.
const KARNATAKA_RTO_SEEDS = [
  {
    code: "KA-01",
    name: "Regional Transport Office, Koramangala (Bangalore Central)",
    shortName: "RTO Koramangala (KA-01)",
    address: "BDA Complex, Koramangala 3rd Block, Bengaluru – 560034",
    coordinates: [12.9352, 77.6146],
  },
  {
    code: "KA-02",
    name: "Regional Transport Office, Rajajinagar (Bangalore West)",
    shortName: "RTO Rajajinagar (KA-02)",
    address: "Corporation Shopping Complex, Rajajinagar, Bengaluru – 560010",
    coordinates: [12.9991, 77.5554],
  },
  {
    code: "KA-03",
    name: "Regional Transport Office, Indiranagar (Bangalore East)",
    shortName: "RTO Indiranagar (KA-03)",
    address: "2nd Floor, BDA Complex, Indiranagar, Bengaluru – 560038",
    coordinates: [12.9784, 77.6408],
  },
  {
    code: "KA-04",
    name: "Regional Transport Office, Yeshwanthpur (Bangalore North)",
    shortName: "RTO Yeshwanthpur (KA-04)",
    address: "No. 3, Corporation Complex, Yeshwanthpur, Bengaluru – 560022",
    coordinates: [13.0284, 77.554],
  },
  {
    code: "KA-05",
    name: "Regional Transport Office, Jayanagar (Bangalore South)",
    shortName: "RTO Jayanagar (KA-05)",
    address: "Jayanagar Shopping Complex, 4th Block, Jayanagar, Bengaluru – 560011",
    coordinates: [12.925, 77.5938],
  },
  {
    code: "KA-41",
    name: "Regional Transport Office, Jnanabharathi (Rajarajeshwari Nagar)",
    shortName: "RTO Jnanabharathi (KA-41)",
    address: "RV College Road, Mysore Road, Gnanabharathi, Bengaluru – 560056",
    coordinates: [12.928, 77.5],
  },
  {
    code: "KA-43",
    name: "Regional Transport Office, Devanahalli (Bengaluru Rural)",
    shortName: "RTO Devanahalli (KA-43)",
    address: "Vijayapura Cross, Devanahalli, Bengaluru Rural – 562110",
    coordinates: [13.2465, 77.7154],
  },
  {
    code: "KA-50",
    name: "Regional Transport Office, Yelahanka",
    shortName: "RTO Yelahanka (KA-50)",
    address: "Karnataka Housing Board Commercial Complex, Sector B, Yelahanka New Town, Bengaluru – 560064",
    coordinates: [13.1005, 77.5963],
  },
  {
    code: "KA-51",
    name: "Regional Transport Office, Electronic City",
    shortName: "RTO Electronic City (KA-51)",
    address: "New Central Jail Road, Chennakeshava Nagar, Electronic City, Bengaluru – 560100",
    coordinates: [12.8452, 77.6602],
  },
  {
    code: "KA-53",
    name: "Regional Transport Office, Whitefield",
    shortName: "RTO Whitefield (KA-53)",
    address: "ITPL Main Road, Whitefield, Bengaluru – 560066",
    coordinates: [12.9698, 77.75],
  },
  {
    code: "KA-09",
    name: "Regional Transport Office, Mysuru",
    shortName: "RTO Mysuru (KA-09)",
    address: "Ashokapuram, Mysuru – 570008",
    coordinates: [12.2958, 76.6394],
  },
];

// West Bengal has ~97-99 total RTO codes statewide (many are ARTO
// sub-offices under a shared district jurisdiction, e.g. WB-44A to WB-44D
// all under Asansol). Rather than list every sub-code, this covers one
// representative office per district/major town — real codes and
// localities, sourced from Transport Dept. listings.
//
// Confidence varies by entry: Kolkata (all three), Durgapur, Asansol,
// Kalna, Tamluk, Midnapur, Nadia, Purulia, Raghunathpur, Murshidabad,
// Raiganj, Malda and Siliguri are corroborated by multiple independent
// listings. The remaining entries (Howrah, Hooghly, Chandannagar, Alipore,
// Barrackpore, Barasat, Contai, Bardhaman town, Bolpur, Balurghat, Cooch
// Behar, Bankura, Alipurduar, Jalpaiguri) rely on a single scraped listing
// whose exact code-to-office split was inconsistent across sources — the
// district-level code is very likely right, the precise sub-office
// boundary less certain. Addresses are kept at locality level rather than
// a specific building/floor for the same reason: that level of detail
// isn't something I could verify.
const WEST_BENGAL_RTO_SEEDS = [
  {
    code: "WB-01",
    name: "Regional Transport Office, Beltala (Kolkata)",
    shortName: "RTO Kolkata Beltala (WB-01)",
    address: "Regional Transport Office, Beltala, South Kolkata, West Bengal",
    coordinates: [22.519, 88.36],
  },
  {
    code: "WB-05",
    name: "Additional RTO, Kasba/Ruby (Kolkata)",
    shortName: "RTO Kolkata Ruby (WB-05)",
    address: "Additional Regional Transport Office, Kasba, near Ruby Crossing, Kolkata, West Bengal",
    coordinates: [22.517, 88.395],
  },
  {
    code: "WB-08",
    name: "Regional Transport Office, Salt Lake (Bidhannagar)",
    shortName: "RTO Salt Lake (WB-08)",
    address: "Regional Transport Office, Sector V, Salt Lake (Bidhannagar), West Bengal",
    coordinates: [22.5726, 88.431],
  },
  {
    code: "WB-11",
    name: "Regional Transport Office, Howrah",
    shortName: "RTO Howrah (WB-11)",
    address: "Regional Transport Office, Howrah, West Bengal",
    coordinates: [22.5958, 88.2636],
  },
  {
    code: "WB-14",
    name: "Regional Transport Office, Hooghly (Chinsurah)",
    shortName: "RTO Hooghly (WB-14)",
    address: "Regional Transport Office, Chinsurah, Hooghly District, West Bengal",
    coordinates: [22.9012, 88.3925],
  },
  {
    code: "WB-17",
    name: "Regional Transport Office, Chandannagar",
    shortName: "RTO Chandannagar (WB-17)",
    address: "Regional Transport Office, Chandannagar, Hooghly District, West Bengal",
    coordinates: [22.8679, 88.3806],
  },
  {
    code: "WB-18",
    name: "Regional Transport Office, Alipore (South 24 Parganas)",
    shortName: "RTO Alipore (WB-18)",
    address: "Regional Transport Office, Alipore, South 24 Parganas, West Bengal",
    coordinates: [22.5322, 88.3312],
  },
  {
    code: "WB-22",
    name: "Regional Transport Office, Barrackpore",
    shortName: "RTO Barrackpore (WB-22)",
    address: "Regional Transport Office, Barrackpore, North 24 Parganas, West Bengal",
    coordinates: [22.7606, 88.3714],
  },
  {
    code: "WB-24",
    name: "Regional Transport Office, Barasat",
    shortName: "RTO Barasat (WB-24)",
    address: "Regional Transport Office, Barasat, North 24 Parganas, West Bengal",
    coordinates: [22.7248, 88.4838],
  },
  {
    code: "WB-29",
    name: "Regional Transport Office, Tamluk",
    shortName: "RTO Tamluk (WB-29)",
    address: "Regional Transport Office, Tamluk, Purba Medinipur, West Bengal",
    coordinates: [22.2953, 87.9256],
  },
  {
    code: "WB-30",
    name: "Regional Transport Office, Contai (Kanthi)",
    shortName: "RTO Contai (WB-30)",
    address: "Regional Transport Office, Contai (Kanthi), Purba Medinipur, West Bengal",
    coordinates: [21.7789, 87.742],
  },
  {
    code: "WB-33",
    name: "Regional Transport Office, Midnapur",
    shortName: "RTO Midnapur (WB-33)",
    address: "Regional Transport Office, Midnapur, Paschim Medinipur, West Bengal",
    coordinates: [22.4257, 87.6198],
  },
  {
    code: "WB-40",
    name: "Regional Transport Office, Durgapur",
    shortName: "RTO Durgapur (WB-40)",
    address: "Regional Transport Office, Durgapur, Paschim Bardhaman, West Bengal",
    coordinates: [23.5204, 87.3119],
  },
  {
    code: "WB-41",
    name: "Regional Transport Office, Bardhaman",
    shortName: "RTO Bardhaman (WB-41)",
    address: "Regional Transport Office, Bardhaman Town, Purba Bardhaman, West Bengal",
    coordinates: [23.2324, 87.8615],
  },
  {
    code: "WB-44",
    name: "Regional Transport Office, Asansol",
    shortName: "RTO Asansol (WB-44)",
    address: "Regional Transport Office, Asansol, Paschim Bardhaman, West Bengal",
    coordinates: [23.6739, 86.9524],
  },
  {
    code: "WB-44E",
    name: "Assistant RTO, Kalna",
    shortName: "ARTO Kalna (WB-44E)",
    address: "Assistant Regional Transport Office, Kalna, Purba Bardhaman, West Bengal",
    coordinates: [23.2258, 88.3661],
  },
  {
    code: "WB-47",
    name: "Regional Transport Office, Bolpur",
    shortName: "RTO Bolpur (WB-47)",
    address: "Regional Transport Office, Bolpur, Birbhum, West Bengal",
    coordinates: [23.6689, 87.7176],
  },
  {
    code: "WB-51",
    name: "Regional Transport Office, Krishnanagar",
    shortName: "RTO Nadia (WB-51)",
    address: "Regional Transport Office, Krishnanagar, Nadia District, West Bengal",
    coordinates: [23.4058, 88.5023],
  },
  {
    code: "WB-55",
    name: "Regional Transport Office, Purulia",
    shortName: "RTO Purulia (WB-55)",
    address: "Regional Transport Office, Purulia, West Bengal",
    coordinates: [23.332, 86.366],
  },
  {
    code: "WB-82",
    name: "Assistant RTO, Raghunathpur",
    shortName: "ARTO Raghunathpur (WB-82)",
    address: "Assistant Regional Transport Office, Raghunathpur, Purulia District, West Bengal",
    coordinates: [23.5667, 86.6667],
  },
  {
    code: "WB-57",
    name: "Regional Transport Office, Berhampore (Murshidabad)",
    shortName: "RTO Murshidabad (WB-57)",
    address: "Regional Transport Office, Berhampore, Murshidabad District, West Bengal",
    coordinates: [24.0961, 88.2517],
  },
  {
    code: "WB-59",
    name: "Regional Transport Office, Raiganj",
    shortName: "RTO Raiganj (WB-59)",
    address: "Regional Transport Office, Raiganj, Uttar Dinajpur, West Bengal",
    coordinates: [25.6188, 88.1258],
  },
  {
    code: "WB-60",
    name: "Regional Transport Office, Balurghat",
    shortName: "RTO Balurghat (WB-60)",
    address: "Regional Transport Office, Balurghat, Dakshin Dinajpur, West Bengal",
    coordinates: [25.216, 88.769],
  },
  {
    code: "WB-62",
    name: "Regional Transport Office, Cooch Behar",
    shortName: "RTO Cooch Behar (WB-62)",
    address: "Regional Transport Office, Cooch Behar, West Bengal",
    coordinates: [26.326, 89.4356],
  },
  {
    code: "WB-65",
    name: "Regional Transport Office, Malda",
    shortName: "RTO Malda (WB-65)",
    address: "Regional Transport Office, English Bazar, Malda District, West Bengal",
    coordinates: [25.0083, 88.1417],
  },
  {
    code: "WB-66",
    name: "Regional Transport Office, Bankura",
    shortName: "RTO Bankura (WB-66)",
    address: "Regional Transport Office, Bankura, West Bengal",
    coordinates: [23.2324, 87.07],
  },
  {
    code: "WB-68",
    name: "Regional Transport Office, Alipurduar",
    shortName: "RTO Alipurduar (WB-68)",
    address: "Regional Transport Office, Alipurduar, West Bengal",
    coordinates: [26.4919, 89.5279],
  },
  {
    code: "WB-70",
    name: "Regional Transport Office, Jalpaiguri",
    shortName: "RTO Jalpaiguri (WB-70)",
    address: "Regional Transport Office, Jalpaiguri, West Bengal",
    coordinates: [26.543, 88.729],
  },
  {
    code: "WB-73",
    name: "Regional Transport Office, Siliguri",
    shortName: "RTO Siliguri (WB-73)",
    address: "Regional Transport Office, Siliguri, Darjeeling District, West Bengal",
    coordinates: [26.7271, 88.3953],
  },
];

// Maharashtra is a different shape of problem than West Bengal: its ~50-55
// MH codes are (almost) all genuinely distinct district-level RTOs, not
// ARTO sub-offices sharing one parent jurisdiction — so "all Maharashtra
// RTOs" maps much more directly onto "all the codes" here. Sourced from a
// single clean, internally-consistent code/city table cross-checked
// against several other listings for the Mumbai-region special codes
// (43/46/47/48/49/50/51/55, which independently agreed). Two codes
// (MH-52, MH-54) are omitted — the sources I found disagreed on what they
// cover and I'd rather leave a gap than guess. Addresses are locality
// level, same reasoning as West Bengal above.
const MAHARASHTRA_RTO_SEEDS = [
  { code: "MH-01", city: "Mumbai (South)", area: "Tardeo", coordinates: [18.9709, 72.8107] },
  { code: "MH-02", city: "Mumbai (West)", area: "Andheri", coordinates: [19.1136, 72.8697] },
  { code: "MH-03", city: "Mumbai (East)", area: "Wadala", coordinates: [19.0176, 72.8562] },
  { code: "MH-04", city: "Thane", area: "Thane District", coordinates: [19.2183, 72.9781] },
  { code: "MH-05", city: "Kalyan", area: "Thane District", coordinates: [19.2403, 73.1305] },
  { code: "MH-06", city: "Alibag", area: "Raigad District", coordinates: [18.6414, 72.8722] },
  { code: "MH-07", city: "Kudal", area: "Sindhudurg District", coordinates: [16.0167, 73.6833] },
  { code: "MH-08", city: "Ratnagiri", area: "Ratnagiri District", coordinates: [16.9902, 73.312] },
  { code: "MH-09", city: "Kolhapur", area: "Kolhapur District", coordinates: [16.705, 74.2433] },
  { code: "MH-10", city: "Sangli", area: "Sangli District", coordinates: [16.8524, 74.5815] },
  { code: "MH-11", city: "Satara", area: "Satara District", coordinates: [17.6805, 74.0183] },
  { code: "MH-12", city: "Pune", area: "Pune District", coordinates: [18.5204, 73.8567] },
  { code: "MH-13", city: "Solapur", area: "Solapur District", coordinates: [17.6599, 75.9064] },
  { code: "MH-14", city: "Pimpri-Chinchwad", area: "Pune District", coordinates: [18.6298, 73.7997] },
  { code: "MH-15", city: "Nashik", area: "Nashik District", coordinates: [19.9975, 73.7898] },
  { code: "MH-16", city: "Ahmednagar", area: "Ahmednagar District", coordinates: [19.0948, 74.748] },
  { code: "MH-17", city: "Shrirampur", area: "Ahmednagar District", coordinates: [19.6167, 74.6667] },
  { code: "MH-18", city: "Dhule", area: "Dhule District", coordinates: [20.9042, 74.7749] },
  { code: "MH-19", city: "Jalgaon", area: "Jalgaon District", coordinates: [21.0077, 75.5626] },
  { code: "MH-20", city: "Chhatrapati Sambhajinagar", area: "Formerly Aurangabad", coordinates: [19.8762, 75.3433] },
  { code: "MH-21", city: "Jalna", area: "Jalna District", coordinates: [19.841, 75.8864] },
  { code: "MH-22", city: "Parbhani", area: "Parbhani District", coordinates: [19.2704, 76.7602] },
  { code: "MH-23", city: "Beed", area: "Beed District", coordinates: [18.9891, 75.7601] },
  { code: "MH-24", city: "Latur", area: "Latur District", coordinates: [18.4088, 76.5604] },
  { code: "MH-25", city: "Dharashiv", area: "Formerly Osmanabad", coordinates: [18.186, 76.0419] },
  { code: "MH-26", city: "Nanded", area: "Nanded District", coordinates: [19.1383, 77.321] },
  { code: "MH-27", city: "Amravati", area: "Amravati District", coordinates: [20.9374, 77.7796] },
  { code: "MH-28", city: "Buldhana", area: "Buldhana District", coordinates: [20.5293, 76.1808] },
  { code: "MH-29", city: "Yavatmal", area: "Yavatmal District", coordinates: [20.3888, 78.1204] },
  { code: "MH-30", city: "Akola", area: "Akola District", coordinates: [20.7002, 77.0082] },
  { code: "MH-31", city: "Nagpur", area: "Nagpur District", coordinates: [21.1458, 79.0882] },
  { code: "MH-32", city: "Wardha", area: "Wardha District", coordinates: [20.7453, 78.6022] },
  { code: "MH-33", city: "Gadchiroli", area: "Gadchiroli District", coordinates: [20.1809, 80.0004] },
  { code: "MH-34", city: "Chandrapur", area: "Chandrapur District", coordinates: [19.9615, 79.2961] },
  { code: "MH-35", city: "Gondia", area: "Gondia District", coordinates: [21.4602, 80.1922] },
  { code: "MH-36", city: "Bhandara", area: "Bhandara District", coordinates: [21.17, 79.65] },
  { code: "MH-37", city: "Washim", area: "Washim District", coordinates: [20.1094, 77.1333] },
  { code: "MH-38", city: "Hingoli", area: "Hingoli District", coordinates: [19.7145, 77.1447] },
  { code: "MH-39", city: "Nandurbar", area: "Nandurbar District", coordinates: [21.3667, 74.2417] },
  { code: "MH-40", city: "Nagpur (Rural)", area: "Nagpur District", coordinates: [21.2, 79.05] },
  { code: "MH-41", city: "Malegaon", area: "Nashik District", coordinates: [20.5579, 74.5089] },
  { code: "MH-42", city: "Baramati", area: "Pune District", coordinates: [18.1516, 74.5815] },
  { code: "MH-43", city: "Navi Mumbai", area: "Vashi", coordinates: [19.0754, 73.0004] },
  { code: "MH-44", city: "Ambajogai", area: "Beed District", coordinates: [18.7275, 76.3844] },
  { code: "MH-45", city: "Akluj", area: "Solapur District", coordinates: [17.8833, 75.0167] },
  { code: "MH-46", city: "Panvel", area: "Raigad District", coordinates: [18.9894, 73.1175] },
  { code: "MH-47", city: "Borivali", area: "Mumbai North", coordinates: [19.2288, 72.8567] },
  { code: "MH-48", city: "Vasai-Virar", area: "Palghar District", coordinates: [19.47, 72.8] },
  { code: "MH-49", city: "Nagpur East", area: "Nagpur District", coordinates: [21.155, 79.105] },
  { code: "MH-50", city: "Karad", area: "Satara District", coordinates: [17.2906, 74.1815] },
  { code: "MH-51", city: "Sangamner", area: "Nashik Rural jurisdiction", coordinates: [19.5667, 74.2167] },
  { code: "MH-53", city: "Pune (South)", area: "Pune District", coordinates: [18.45, 73.85] },
  { code: "MH-55", city: "Mumbai Central", area: "Byculla", coordinates: [18.975, 72.8333] },
];

// Arunachal Pradesh's ~19 active codes are genuinely one-per-district (no
// commercial/private split, no multi-code cities like the bigger states
// above), so this is close to the complete list rather than a curated
// subset. Sourced from Wikipedia's RTO index. Two gaps in the numbering —
// AR-18 and AR-21 — aren't currently allocated to a district. Coordinates
// for the more remote district-headquarter towns (Koloriang, Siji, Palin,
// Yingkiong, Hawai) are lower-confidence approximations rather than
// verified town-centre points, since these small towns aren't as
// consistently geocoded as bigger cities; treat them as roughly-right
// rather than precise.
const ARUNACHAL_PRADESH_RTO_SEEDS = [
  { code: "AR-01", city: "Itanagar", coordinates: [27.0844, 93.6053] },
  { code: "AR-03", city: "Tawang", coordinates: [27.5859, 91.8697] },
  { code: "AR-04", city: "Bomdila", coordinates: [27.2645, 92.4159] },
  { code: "AR-05", city: "Seppa", coordinates: [27.2833, 92.9333] },
  { code: "AR-06", city: "Ziro", coordinates: [27.5833, 93.8333] },
  { code: "AR-07", city: "Daporijo", coordinates: [27.9833, 94.2167] },
  { code: "AR-08", city: "Along", coordinates: [28.1667, 94.8] },
  { code: "AR-09", city: "Pasighat", coordinates: [28.0667, 95.3333] },
  { code: "AR-10", city: "Anini", coordinates: [28.7833, 95.85] },
  { code: "AR-11", city: "Tezu", coordinates: [27.9167, 96.1333] },
  { code: "AR-12", city: "Changlang", coordinates: [27.1333, 95.9667] },
  { code: "AR-13", city: "Khonsa", coordinates: [27.0167, 95.5667] },
  { code: "AR-14", city: "Yingkiong", coordinates: [28.65, 95.05] },
  { code: "AR-15", city: "Koloriang", coordinates: [27.95, 93.5] },
  { code: "AR-16", city: "Roing", coordinates: [28.15, 95.8333] },
  { code: "AR-17", city: "Hawai", coordinates: [27.9667, 96.5833] },
  { code: "AR-19", city: "Palin", coordinates: [27.7667, 93.15] },
  { code: "AR-20", city: "Namsai", coordinates: [27.5833, 95.75] },
  { code: "AR-22", city: "Siji", coordinates: [28.3, 94.9] },
];

// Assam has 34 active codes: one office per district plus a couple of
// vehicle-type-only codes (AS-20 for state transport corporation buses,
// AS-30 for Assam Police) that aren't tied to a district jurisdiction and
// are left out here, the same way KA's KSRTC-only "KA-57 F" sub-series is
// left out of the Karnataka block above. Sourced from Wikipedia's RTO
// index. Kamrup's two codes reflect Guwahati city (AS-01, Kamrup
// Metropolitan) versus the surrounding rural district (AS-25, seated
// around Rangiya); a few smaller-town coordinates (Kajalgaon, Hatsingimari,
// Koloriang-style headquarters) are approximate rather than verified.
const ASSAM_RTO_SEEDS = [
  { code: "AS-01", city: "Guwahati", coordinates: [26.1445, 91.7362] },
  { code: "AS-02", city: "Nagaon", coordinates: [26.3487, 92.6841] },
  { code: "AS-03", city: "Jorhat", coordinates: [26.7509, 94.2037] },
  { code: "AS-04", city: "Sivasagar", coordinates: [26.9856, 94.6386] },
  { code: "AS-05", city: "Golaghat", coordinates: [26.515, 93.9718] },
  { code: "AS-06", city: "Dibrugarh", coordinates: [27.4728, 94.912] },
  { code: "AS-07", city: "North Lakhimpur", coordinates: [27.2333, 94.1] },
  { code: "AS-08", city: "Haflong", coordinates: [25.1667, 93.0167] },
  { code: "AS-09", city: "Diphu", coordinates: [25.8417, 93.4292] },
  { code: "AS-10", city: "Karimganj", coordinates: [24.8697, 92.3558] },
  { code: "AS-11", city: "Silchar", coordinates: [24.8333, 92.7789] },
  { code: "AS-12", city: "Tezpur", coordinates: [26.6528, 92.8] },
  { code: "AS-13", city: "Mangaldai", coordinates: [26.4333, 92.0333] },
  { code: "AS-14", city: "Nalbari", coordinates: [26.4467, 91.4372] },
  { code: "AS-15", city: "Barpeta", coordinates: [26.3222, 91.0058] },
  { code: "AS-16", city: "Kokrajhar", coordinates: [26.4013, 90.2716] },
  { code: "AS-17", city: "Dhubri", coordinates: [26.0203, 89.9803] },
  { code: "AS-18", city: "Goalpara", coordinates: [26.1667, 90.6167] },
  { code: "AS-19", city: "Bongaigaon", coordinates: [26.4831, 90.5544] },
  { code: "AS-21", city: "Morigaon", coordinates: [26.2517, 92.3417] },
  { code: "AS-22", city: "Dhemaji", coordinates: [27.4833, 94.5833] },
  { code: "AS-23", city: "Tinsukia", coordinates: [27.4922, 95.3558] },
  { code: "AS-24", city: "Hailakandi", coordinates: [24.6833, 92.5667] },
  { code: "AS-25", city: "Rangiya (Kamrup Rural)", coordinates: [26.4394, 91.6153] },
  { code: "AS-26", city: "Kajalgaon", coordinates: [26.6333, 90.6667] },
  { code: "AS-27", city: "Udalguri", coordinates: [26.75, 92.1] },
  { code: "AS-29", city: "Majuli", coordinates: [26.9526, 94.1758] },
  { code: "AS-31", city: "Hojai", coordinates: [26.0022, 92.8564] },
  { code: "AS-32", city: "Biswanath Chariali", coordinates: [26.7333, 93.15] },
  { code: "AS-33", city: "Charaideo", coordinates: [26.9333, 94.9833] },
  { code: "AS-34", city: "Hatsingimari", coordinates: [25.85, 89.95] },
];

// Bihar's Wikipedia-sourced RTO index lists 36 district codes (BR-01
// through BR-56, with sizeable gaps — e.g. BR-12 to BR-18, BR-35, BR-36,
// BR-40 to BR-42, BR-47 to BR-49, BR-54 aren't allocated in that source).
// Bihar has 38 districts total, so this is very close to complete but not
// guaranteed exhaustive — a couple of newer or reorganized districts may
// not appear here. Coordinates are city/town centres, same caveat as the
// other states above about not being verified building addresses.
const BIHAR_RTO_SEEDS = [
  { code: "BR-01", city: "Patna", coordinates: [25.5941, 85.1376] },
  { code: "BR-02", city: "Gaya", coordinates: [24.7955, 85.0002] },
  { code: "BR-03", city: "Arrah", coordinates: [25.5541, 84.6636] },
  { code: "BR-04", city: "Chhapra", coordinates: [25.7815, 84.7479] },
  { code: "BR-05", city: "Motihari", coordinates: [26.6499, 84.9179] },
  { code: "BR-06", city: "Muzaffarpur", coordinates: [26.1209, 85.3647] },
  { code: "BR-07", city: "Darbhanga", coordinates: [26.1542, 85.8918] },
  { code: "BR-08", city: "Munger", coordinates: [25.3746, 86.4735] },
  { code: "BR-09", city: "Begusarai", coordinates: [25.4182, 86.1272] },
  { code: "BR-10", city: "Bhagalpur", coordinates: [25.2445, 86.9718] },
  { code: "BR-11", city: "Purnia", coordinates: [25.7771, 87.4753] },
  { code: "BR-19", city: "Saharsa", coordinates: [25.8804, 86.5996] },
  { code: "BR-21", city: "Bihar Sharif", coordinates: [25.1994, 85.5238] },
  { code: "BR-22", city: "Bettiah", coordinates: [26.8022, 84.5028] },
  { code: "BR-24", city: "Dehri", coordinates: [24.9089, 84.1839] },
  { code: "BR-25", city: "Jehanabad", coordinates: [25.2131, 84.9866] },
  { code: "BR-26", city: "Aurangabad", coordinates: [24.7519, 84.3742] },
  { code: "BR-27", city: "Nawada", coordinates: [24.8864, 85.5386] },
  { code: "BR-28", city: "Gopalganj", coordinates: [26.4667, 84.4333] },
  { code: "BR-29", city: "Siwan", coordinates: [26.2181, 84.3542] },
  { code: "BR-30", city: "Sitamarhi", coordinates: [26.5959, 85.4903] },
  { code: "BR-31", city: "Hajipur", coordinates: [25.6845, 85.2094] },
  { code: "BR-32", city: "Madhubani", coordinates: [26.3546, 86.0716] },
  { code: "BR-33", city: "Samastipur", coordinates: [25.8621, 85.7799] },
  { code: "BR-34", city: "Khagaria", coordinates: [25.5022, 86.4666] },
  { code: "BR-37", city: "Kishanganj", coordinates: [26.1042, 87.9451] },
  { code: "BR-38", city: "Araria", coordinates: [26.1503, 87.5157] },
  { code: "BR-39", city: "Katihar", coordinates: [25.5391, 87.5814] },
  { code: "BR-43", city: "Madhepura", coordinates: [25.9207, 86.7936] },
  { code: "BR-44", city: "Buxar", coordinates: [25.5642, 83.9773] },
  { code: "BR-45", city: "Bhabua", coordinates: [25.0447, 83.6119] },
  { code: "BR-46", city: "Jamui", coordinates: [24.926, 86.2236] },
  { code: "BR-50", city: "Supaul", coordinates: [26.1259, 86.6027] },
  { code: "BR-51", city: "Banka", coordinates: [24.8853, 86.9192] },
  { code: "BR-52", city: "Sheikhpura", coordinates: [25.1408, 85.8508] },
  { code: "BR-53", city: "Lakhisarai", coordinates: [25.1747, 86.093] },
  { code: "BR-55", city: "Sheohar", coordinates: [26.5106, 85.2967] },
  { code: "BR-56", city: "Arwal", coordinates: [25.2412, 84.6788] },
];

// Andhra Pradesh is a special case among the region-code states here: since
// February 2019 the state has run a "one state–one code" policy, so every
// newly registered vehicle statewide gets AP-39 (a second code, AP-40, was
// added in 2023 for overflow/government use) rather than a district code.
// The per-district codes below (AP-02 through AP-38) predate that change —
// they're the codes that still appear on the large existing fleet of
// vehicles registered before 2019, and the ones people mean when they ask
// for "the AP RTOs" by district/city. Sourced from the AP Transport
// Dept.'s official 1989 district-code notification cross-checked against
// Wikipedia's RTO index; codes AP-01 and AP-09 through AP-15 (and a few
// others) are omitted here because they were allocated to districts that
// became part of Telangana at bifurcation and aren't part of present-day
// Andhra Pradesh. As with the other states above, addresses are city-level
// rather than a specific verified street/building.
const ANDHRA_PRADESH_RTO_SEEDS = [
  { code: "AP-02", city: "Anantapur", coordinates: [14.6819, 77.6006] },
  { code: "AP-03", city: "Chittoor", coordinates: [13.2172, 79.1003] },
  { code: "AP-04", city: "Kadapa", coordinates: [14.4673, 78.8242] },
  { code: "AP-05", city: "Kakinada", coordinates: [16.9891, 82.2475] },
  { code: "AP-06", city: "Rajahmundry", coordinates: [17.0005, 81.804] },
  { code: "AP-07", city: "Guntur", coordinates: [16.3067, 80.4365] },
  { code: "AP-16", city: "Vijayawada", coordinates: [16.5062, 80.648] },
  { code: "AP-21", city: "Kurnool", coordinates: [15.8281, 78.0373] },
  { code: "AP-26", city: "Nellore", coordinates: [14.4426, 79.9865] },
  { code: "AP-27", city: "Ongole", coordinates: [15.5057, 80.0499] },
  { code: "AP-30", city: "Srikakulam", coordinates: [18.2949, 83.8938] },
  { code: "AP-31", city: "Visakhapatnam", coordinates: [17.6868, 83.2185] },
  { code: "AP-35", city: "Vizianagaram", coordinates: [18.1067, 83.3956] },
  { code: "AP-37", city: "Eluru", coordinates: [16.7107, 81.0952] },
];

// Uttar Pradesh has 75 active RTO codes (UP-11 through UP-96, with a
// handful of numbers — 18, 28, 29, 39, 48, 49, 59, 68, 69, 88, 89 — never
// allocated to a district). Codes UP-1 through UP-10 are defunct; those
// districts became part of Uttarakhand on that state's formation in 2000.
// District-to-code mapping is corroborated across multiple independent
// listings (Wikipedia's RTO index plus several state-transport reference
// sites), so confidence on the code/city pairing itself is high. Exact
// office-building addresses are not — as with West Bengal above, this
// uses the district/city name as the address rather than a specific
// street that I can't verify, and coordinates are the city/town centre
// rather than the RTO building's exact plot.
const UTTAR_PRADESH_RTO_SEEDS = [
  { code: "UP-11", city: "Saharanpur", coordinates: [29.968, 77.5552] },
  { code: "UP-12", city: "Muzaffarnagar", coordinates: [29.4727, 77.7085] },
  { code: "UP-13", city: "Bulandshahr", coordinates: [28.4041, 77.8498] },
  { code: "UP-14", city: "Ghaziabad", coordinates: [28.6692, 77.4538] },
  { code: "UP-15", city: "Meerut", coordinates: [28.9845, 77.7064] },
  { code: "UP-16", city: "Noida", coordinates: [28.5355, 77.391] },
  { code: "UP-17", city: "Baghpat", coordinates: [28.9445, 77.2183] },
  { code: "UP-19", city: "Shamli", coordinates: [29.4499, 77.3096] },
  { code: "UP-20", city: "Bijnor", coordinates: [29.373, 78.1358] },
  { code: "UP-21", city: "Moradabad", coordinates: [28.8386, 78.7733] },
  { code: "UP-22", city: "Rampur", coordinates: [28.8152, 79.025] },
  { code: "UP-23", city: "Amroha", coordinates: [28.9044, 78.4692] },
  { code: "UP-24", city: "Badaun", coordinates: [28.0338, 79.1201] },
  { code: "UP-25", city: "Bareilly", coordinates: [28.367, 79.4304] },
  { code: "UP-26", city: "Pilibhit", coordinates: [28.6314, 79.8046] },
  { code: "UP-27", city: "Shahjahanpur", coordinates: [27.8801, 79.9101] },
  { code: "UP-30", city: "Hardoi", coordinates: [27.3966, 80.131] },
  { code: "UP-31", city: "Lakhimpur Kheri", coordinates: [27.9467, 80.7815] },
  { code: "UP-32", city: "Lucknow", coordinates: [26.8467, 80.9462] },
  { code: "UP-33", city: "Raebareli", coordinates: [26.2309, 81.238] },
  { code: "UP-34", city: "Sitapur", coordinates: [27.5619, 80.6821] },
  { code: "UP-35", city: "Unnao", coordinates: [26.5464, 80.4879] },
  { code: "UP-36", city: "Amethi", coordinates: [26.1542, 81.8079] },
  { code: "UP-37", city: "Hapur", coordinates: [28.73, 77.7803] },
  { code: "UP-38", city: "Sambhal", coordinates: [28.5883, 78.5711] },
  { code: "UP-40", city: "Bahraich", coordinates: [27.5742, 81.5966] },
  { code: "UP-41", city: "Barabanki", coordinates: [26.9269, 81.1897] },
  { code: "UP-42", city: "Ayodhya", coordinates: [26.7922, 82.1998] },
  { code: "UP-43", city: "Gonda", coordinates: [27.1333, 81.9667] },
  { code: "UP-44", city: "Sultanpur", coordinates: [26.2648, 82.0725] },
  { code: "UP-45", city: "Ambedkar Nagar", coordinates: [26.43, 82.535] },
  { code: "UP-46", city: "Shravasti", coordinates: [27.5089, 82.0397] },
  { code: "UP-47", city: "Balrampur", coordinates: [27.4297, 82.1794] },
  { code: "UP-50", city: "Azamgarh", coordinates: [26.0685, 83.1836] },
  { code: "UP-51", city: "Basti", coordinates: [26.8145, 82.7327] },
  { code: "UP-52", city: "Deoria", coordinates: [26.5024, 83.7791] },
  { code: "UP-53", city: "Gorakhpur", coordinates: [26.7606, 83.3732] },
  { code: "UP-54", city: "Mau", coordinates: [25.9417, 83.5611] },
  { code: "UP-55", city: "Siddharthnagar", coordinates: [27.2646, 83.1122] },
  { code: "UP-56", city: "Maharajganj", coordinates: [27.1439, 83.5602] },
  { code: "UP-57", city: "Kushinagar", coordinates: [26.7583, 83.9825] },
  { code: "UP-58", city: "Sant Kabir Nagar", coordinates: [26.7712, 83.0716] },
  { code: "UP-60", city: "Ballia", coordinates: [25.76, 84.15] },
  { code: "UP-61", city: "Ghazipur", coordinates: [25.5788, 83.5772] },
  { code: "UP-62", city: "Jaunpur", coordinates: [25.7479, 82.6837] },
  { code: "UP-63", city: "Mirzapur", coordinates: [25.146, 82.569] },
  { code: "UP-64", city: "Sonbhadra", coordinates: [24.6975, 83.0669] },
  { code: "UP-65", city: "Varanasi", coordinates: [25.3176, 82.9739] },
  { code: "UP-66", city: "Bhadohi", coordinates: [25.3934, 82.5658] },
  { code: "UP-67", city: "Chandauli", coordinates: [25.2599, 83.2649] },
  { code: "UP-70", city: "Prayagraj", coordinates: [25.4358, 81.8463] },
  { code: "UP-71", city: "Fatehpur", coordinates: [25.9308, 80.8129] },
  { code: "UP-72", city: "Pratapgarh", coordinates: [25.8967, 81.9411] },
  { code: "UP-73", city: "Kaushambi", coordinates: [25.5333, 81.3667] },
  { code: "UP-74", city: "Kannauj", coordinates: [27.0553, 79.9153] },
  { code: "UP-75", city: "Etawah", coordinates: [26.7855, 79.0154] },
  { code: "UP-76", city: "Farrukhabad", coordinates: [27.3894, 79.581] },
  { code: "UP-77", city: "Kanpur Dehat", coordinates: [26.4123, 79.9865] },
  { code: "UP-78", city: "Kanpur Nagar", coordinates: [26.4499, 80.3319] },
  { code: "UP-79", city: "Auraiya", coordinates: [26.4652, 79.5127] },
  { code: "UP-80", city: "Agra", coordinates: [27.1767, 78.0081] },
  { code: "UP-81", city: "Aligarh", coordinates: [27.8974, 78.088] },
  { code: "UP-82", city: "Etah", coordinates: [27.6333, 78.6667] },
  { code: "UP-83", city: "Firozabad", coordinates: [27.1591, 78.3958] },
  { code: "UP-84", city: "Mainpuri", coordinates: [27.2333, 79.0167] },
  { code: "UP-85", city: "Mathura", coordinates: [27.4924, 77.6737] },
  { code: "UP-86", city: "Hathras", coordinates: [27.5959, 78.0522] },
  { code: "UP-87", city: "Kasganj", coordinates: [27.8087, 78.6438] },
  { code: "UP-90", city: "Banda", coordinates: [25.4762, 80.3364] },
  { code: "UP-91", city: "Hamirpur", coordinates: [25.9556, 80.15] },
  { code: "UP-92", city: "Jalaun", coordinates: [26.145, 79.335] },
  { code: "UP-93", city: "Jhansi", coordinates: [25.4484, 78.5685] },
  { code: "UP-94", city: "Lalitpur", coordinates: [24.6874, 78.4118] },
  { code: "UP-95", city: "Mahoba", coordinates: [25.2911, 79.8734] },
  { code: "UP-96", city: "Chitrakoot", coordinates: [25.1959, 80.937] },
];

// Chhattisgarh has 30 RTO codes (CG-01 through CG-30). The first three —
// CG-01, CG-02, CG-03 — are reserved for the Governor, the state
// government, and the Chhattisgarh Police respectively, and aren't public-
// facing offices, so they're left out here; CG-04 through CG-30 cover the
// state's 27 general-public district RTOs. District/code pairing is
// corroborated across multiple independent listings. Town-centre
// coordinates are used since exact building addresses aren't consistently
// published; addresses below use the district town name rather than a
// specific unverified street.
const CHHATTISGARH_RTO_SEEDS = [
  { code: "CG-04", city: "Raipur", coordinates: [21.2514, 81.6296] },
  { code: "CG-05", city: "Dhamtari", coordinates: [20.7072, 81.5497] },
  { code: "CG-06", city: "Mahasamund", coordinates: [21.1092, 82.0979] },
  { code: "CG-07", city: "Durg", coordinates: [21.1904, 81.2849] },
  { code: "CG-08", city: "Rajnandgaon", coordinates: [21.0972, 81.0388] },
  { code: "CG-09", city: "Kawardha", coordinates: [22.0122, 81.2325] },
  { code: "CG-10", city: "Bilaspur", coordinates: [22.0797, 82.1391] },
  { code: "CG-11", city: "Janjgir", coordinates: [22.0, 82.5833] },
  { code: "CG-12", city: "Korba", coordinates: [22.3595, 82.7501] },
  { code: "CG-13", city: "Raigarh", coordinates: [21.8974, 83.395] },
  { code: "CG-14", city: "Jashpur Nagar", coordinates: [22.8919, 84.1382] },
  { code: "CG-15", city: "Ambikapur", coordinates: [23.1195, 83.1958] },
  { code: "CG-16", city: "Baikunthpur", coordinates: [23.25, 82.55] },
  { code: "CG-17", city: "Jagdalpur", coordinates: [19.0748, 82.0232] },
  { code: "CG-18", city: "Dantewada", coordinates: [18.8958, 81.3548] },
  { code: "CG-19", city: "Kanker", coordinates: [20.2717, 81.493] },
  { code: "CG-20", city: "Bijapur", coordinates: [18.7873, 80.7994] },
  { code: "CG-21", city: "Narayanpur", coordinates: [19.7167, 81.25] },
  { code: "CG-22", city: "Baloda Bazar", coordinates: [21.6613, 82.1611] },
  { code: "CG-23", city: "Gariaband", coordinates: [20.6337, 82.0625] },
  { code: "CG-24", city: "Balod", coordinates: [20.7291, 81.2018] },
  { code: "CG-25", city: "Bemetara", coordinates: [21.7136, 81.5372] },
  { code: "CG-26", city: "Sukma", coordinates: [18.3833, 81.6667] },
  { code: "CG-27", city: "Kondagaon", coordinates: [19.594, 81.665] },
  { code: "CG-28", city: "Mungeli", coordinates: [22.0667, 81.6833] },
  { code: "CG-29", city: "Surajpur", coordinates: [23.2167, 82.8667] },
  { code: "CG-30", city: "Balrampur", coordinates: [23.6167, 83.6] },
];

// Goa has 12 RTO/ARTO codes covering its talukas. GA-01 (Panaji) and
// GA-02 (Margao) were the original two codes for North and South Goa
// district respectively; both districts have since been split into
// taluka-level jurisdictions, with GA-07 (Tiswadi) and GA-08 (Salcette)
// taking over new registrations for those areas. GA-01 and GA-02 are kept
// here (flagged as legacy) since older vehicles still carry them and
// they're commonly listed as active offices. Sourced from multiple
// corroborating listings (Transport Dept.-derived).
const GOA_RTO_SEEDS = [
  { code: "GA-01", city: "Panaji", note: "North Goa District — legacy code, new registrations now under GA-07", coordinates: [15.4909, 73.8278] },
  { code: "GA-02", city: "Margao", note: "South Goa District — legacy code, new registrations now under GA-08", coordinates: [15.2832, 73.9862] },
  { code: "GA-03", city: "Mapusa", note: "Bardez Taluka", coordinates: [15.5937, 73.8142] },
  { code: "GA-04", city: "Bicholim", note: "Bicholim & Sattari Taluka", coordinates: [15.5936, 73.9457] },
  { code: "GA-05", city: "Ponda", note: "Ponda Taluka", coordinates: [15.4027, 74.0078] },
  { code: "GA-06", city: "Vasco da Gama", note: "Mormugao Taluka", coordinates: [15.3981, 73.8114] },
  { code: "GA-07", city: "Panaji", note: "Tiswadi Taluka", coordinates: [15.4909, 73.8278] },
  { code: "GA-08", city: "Margao", note: "Salcette Taluka", coordinates: [15.2832, 73.9862] },
  { code: "GA-09", city: "Quepem", note: "Quepem & Sanguem Taluka", coordinates: [15.2167, 74.0833] },
  { code: "GA-10", city: "Canacona", note: "Canacona Taluka", coordinates: [15.01, 74.05] },
  { code: "GA-11", city: "Pernem", note: "Pernem Taluka", coordinates: [15.7167, 73.7975] },
  { code: "GA-12", city: "Dharbandora", note: "Dharbandora Taluka", coordinates: [15.3833, 74.15] },
];

// Gujarat has 38 active district-level RTO codes (GJ-01 through GJ-38);
// codes beyond that are additional big-city sub-offices not covered here.
// District/code pairing is corroborated across two independent, mutually
// consistent listings. Town-centre coordinates are used since exact
// building addresses aren't consistently published.
const GUJARAT_RTO_SEEDS = [
  { code: "GJ-01", city: "Ahmedabad", coordinates: [23.0225, 72.5714] },
  { code: "GJ-02", city: "Mehsana", coordinates: [23.588, 72.3693] },
  { code: "GJ-03", city: "Rajkot", coordinates: [22.3039, 70.8022] },
  { code: "GJ-04", city: "Bhavnagar", coordinates: [21.7645, 72.1519] },
  { code: "GJ-05", city: "Surat", coordinates: [21.1702, 72.8311] },
  { code: "GJ-06", city: "Vadodara", coordinates: [22.3072, 73.1812] },
  { code: "GJ-07", city: "Nadiad", coordinates: [22.6939, 72.8615] },
  { code: "GJ-08", city: "Palanpur", coordinates: [24.1722, 72.4383] },
  { code: "GJ-09", city: "Himatnagar", coordinates: [23.5966, 72.9666] },
  { code: "GJ-10", city: "Jamnagar", coordinates: [22.4707, 70.0577] },
  { code: "GJ-11", city: "Junagadh", coordinates: [21.5222, 70.4579] },
  { code: "GJ-12", city: "Bhuj", coordinates: [23.242, 69.6669] },
  { code: "GJ-13", city: "Surendranagar", coordinates: [22.7469, 71.6483] },
  { code: "GJ-14", city: "Amreli", coordinates: [21.6032, 71.2222] },
  { code: "GJ-15", city: "Valsad", coordinates: [20.5992, 72.9342] },
  { code: "GJ-16", city: "Bharuch", coordinates: [21.7051, 72.9959] },
  { code: "GJ-17", city: "Godhra", coordinates: [22.7788, 73.6144] },
  { code: "GJ-18", city: "Gandhinagar", coordinates: [23.2156, 72.6369] },
  { code: "GJ-19", city: "Bardoli", coordinates: [21.1231, 73.1156] },
  { code: "GJ-20", city: "Dahod", coordinates: [22.8344, 74.2593] },
  { code: "GJ-21", city: "Navsari", coordinates: [20.9467, 72.952] },
  { code: "GJ-22", city: "Rajpipla", coordinates: [21.8747, 73.5013] },
  { code: "GJ-23", city: "Anand", coordinates: [22.5645, 72.9289] },
  { code: "GJ-24", city: "Patan", coordinates: [23.8493, 72.1266] },
  { code: "GJ-25", city: "Porbandar", coordinates: [21.6417, 69.6293] },
  { code: "GJ-26", city: "Vyara", coordinates: [21.1167, 73.4] },
  { code: "GJ-27", city: "Ahmedabad (East)", coordinates: [23.03, 72.62] },
  { code: "GJ-28", city: "Pal (Surat)", coordinates: [21.2, 72.85] },
  { code: "GJ-29", city: "Darjipura (Chhota Udaipur area)", coordinates: [22.3, 73.6] },
  { code: "GJ-30", city: "Ahwa", coordinates: [20.75, 73.6939] },
  { code: "GJ-31", city: "Modasa", coordinates: [23.4667, 73.3] },
  { code: "GJ-32", city: "Veraval", coordinates: [20.9159, 70.3629] },
  { code: "GJ-33", city: "Botad", coordinates: [22.1704, 71.6683] },
  { code: "GJ-34", city: "Chhota Udaipur", coordinates: [22.3167, 74.0167] },
  { code: "GJ-35", city: "Lunawada", coordinates: [23.1333, 73.6167] },
  { code: "GJ-36", city: "Morbi", coordinates: [22.8173, 70.8377] },
  { code: "GJ-37", city: "Khambhalia", coordinates: [22.2, 69.65] },
  { code: "GJ-38", city: "Bavla", coordinates: [22.8333, 72.35] },
];

// Jammu & Kashmir (the union territory, post-2019 reorganisation) has 20
// active district RTO codes. JK-07 (Kargil) and JK-10 (Leh) were the
// original codes for those districts but have since been retired: Ladakh
// was carved out as its own UT and those two districts now issue LA-01 and
// LA-02 instead, so JK-07/JK-10 are no longer allocated to any office.
// District/code pairing corroborated across multiple independent listings.
// Town-centre coordinates are used since exact building addresses aren't
// consistently published.
const JAMMU_KASHMIR_RTO_SEEDS = [
  { code: "JK-01", city: "Srinagar", coordinates: [34.0837, 74.7973] },
  { code: "JK-02", city: "Jammu", coordinates: [32.7266, 74.857] },
  { code: "JK-03", city: "Anantnag", coordinates: [33.7311, 75.1487] },
  { code: "JK-04", city: "Budgam", coordinates: [33.9, 74.7] },
  { code: "JK-05", city: "Baramulla", coordinates: [34.2001, 74.3467] },
  { code: "JK-06", city: "Doda", coordinates: [33.15, 75.5464] },
  { code: "JK-08", city: "Kathua", coordinates: [32.3701, 75.5233] },
  { code: "JK-09", city: "Kupwara", coordinates: [34.5259, 74.2547] },
  { code: "JK-11", city: "Rajouri", coordinates: [33.3778, 74.3103] },
  { code: "JK-12", city: "Poonch", coordinates: [33.7717, 74.0913] },
  { code: "JK-13", city: "Pulwama", coordinates: [33.8712, 74.8994] },
  { code: "JK-14", city: "Udhampur", coordinates: [32.9159, 75.1416] },
  { code: "JK-15", city: "Bandipora", coordinates: [34.4189, 74.6469] },
  { code: "JK-16", city: "Ganderbal", coordinates: [34.2261, 74.7767] },
  { code: "JK-17", city: "Kishtwar", coordinates: [33.3128, 75.7679] },
  { code: "JK-18", city: "Kulgam", coordinates: [33.6425, 75.0203] },
  { code: "JK-19", city: "Ramban", coordinates: [33.2444, 75.2394] },
  { code: "JK-20", city: "Reasi", coordinates: [33.0813, 74.8331] },
  { code: "JK-21", city: "Samba", coordinates: [32.5619, 75.1189] },
  { code: "JK-22", city: "Shopian", coordinates: [33.7186, 74.8329] },
];

// Jharkhand has 24 RTO offices, one per district. District/code pairing is
// corroborated across two independently-agreeing listings; a third listing
// disagreed on the exact ordering of Latehar/Simdega/Jamtara/Saraikela-
// Kharsawan/Khunti (JH-19 through JH-23), so those five are the lowest-
// confidence entries here — the majority-agreeing order is used. Town-
// centre coordinates are used since exact building addresses aren't
// consistently published.
const JHARKHAND_RTO_SEEDS = [
  { code: "JH-01", city: "Ranchi", coordinates: [23.3441, 85.3096] },
  { code: "JH-02", city: "Hazaribagh", coordinates: [23.9925, 85.3637] },
  { code: "JH-03", city: "Daltonganj", coordinates: [24.0432, 84.0716] },
  { code: "JH-04", city: "Dumka", coordinates: [24.2685, 87.2497] },
  { code: "JH-05", city: "Jamshedpur", coordinates: [22.8046, 86.2029] },
  { code: "JH-06", city: "Chaibasa", coordinates: [22.5535, 85.8083] },
  { code: "JH-07", city: "Gumla", coordinates: [23.0446, 84.5378] },
  { code: "JH-08", city: "Lohardaga", coordinates: [23.4342, 84.6795] },
  { code: "JH-09", city: "Bokaro Steel City", coordinates: [23.6693, 86.1511] },
  { code: "JH-10", city: "Dhanbad", coordinates: [23.7957, 86.4304] },
  { code: "JH-11", city: "Giridih", coordinates: [24.1913, 86.3079] },
  { code: "JH-12", city: "Koderma", coordinates: [24.4676, 85.5943] },
  { code: "JH-13", city: "Chatra", coordinates: [24.2078, 84.8703] },
  { code: "JH-14", city: "Garhwa", coordinates: [24.156, 83.8073] },
  { code: "JH-15", city: "Deoghar", coordinates: [24.4842, 86.6947] },
  { code: "JH-16", city: "Pakur", coordinates: [24.6339, 87.8434] },
  { code: "JH-17", city: "Godda", coordinates: [24.8258, 87.2135] },
  { code: "JH-18", city: "Sahibganj", coordinates: [25.2456, 87.6438] },
  { code: "JH-19", city: "Latehar", coordinates: [23.7452, 84.4995] },
  { code: "JH-20", city: "Simdega", coordinates: [22.6154, 84.5089] },
  { code: "JH-21", city: "Jamtara", coordinates: [23.9614, 86.8043] },
  { code: "JH-22", city: "Saraikela-Kharsawan", coordinates: [22.7, 85.9333] },
  { code: "JH-23", city: "Khunti", coordinates: [23.0733, 85.2782] },
  { code: "JH-24", city: "Ramgarh", coordinates: [23.6307, 85.5124] },
];

// Himachal Pradesh's RTO code scheme is genuinely large and messy: ~90+
// codes covering not just district HQs but every sub-division (SRTO),
// tourist-vehicle series, and government-vehicle series, and different
// public listings disagree with each other on plenty of the smaller codes.
// Rather than guess at the full code table, this covers just the state's
// main district-headquarters RTO — one per district, all 12 districts —
// cross-checked against the Himachal Pradesh Transport Dept.'s own office
// listing (which enumerates exactly these as its primary "RTO" offices,
// as opposed to the many "SRTO" sub-offices) alongside a second,
// code-labelled listing that agreed on every code below.
const HIMACHAL_PRADESH_RTO_SEEDS = [
  { code: "HP-01", city: "Shimla", coordinates: [31.1048, 77.1734] },
  { code: "HP-03", city: "Solan", coordinates: [30.9045, 77.0967] },
  { code: "HP-05", city: "Nahan (Sirmaur)", coordinates: [30.559, 77.2999] },
  { code: "HP-15", city: "Kullu", coordinates: [31.9576, 77.1095] },
  { code: "HP-20", city: "Mandi", coordinates: [31.708, 76.9318] },
  { code: "HP-29", city: "Bilaspur", coordinates: [31.3411, 76.753] },
  { code: "HP-33", city: "Hamirpur", coordinates: [31.6862, 76.5233] },
  { code: "HP-37", city: "Una", coordinates: [31.4685, 76.2708] },
  { code: "HP-40", city: "Dharamshala (Kangra)", coordinates: [32.219, 76.3234] },
  { code: "HP-54", city: "Chamba", coordinates: [32.5534, 76.1258] },
  { code: "HP-60", city: "Reckong Peo (Kinnaur)", coordinates: [31.523, 78.2624] },
  { code: "HP-62", city: "Keylong (Lahaul & Spiti)", coordinates: [32.5722, 77.0301] },
];

// Kerala's 14 district-level RTO codes (KL-01 through KL-14) are
// corroborated across many independent listings (Wikipedia's RTO district
// index, the state Transport Dept.'s own code notification, and several
// insurer reference pages). Beyond these, Kerala also has ~69 taluk-level
// Sub-RTOs (KL-15 onward) whose exact boundaries are less consistently
// documented, so — same approach as Assam/Bihar above — this covers one
// office per district rather than the full sub-office table. Coordinates
// are the district-headquarters town centre.
const KERALA_RTO_SEEDS = [
  { code: "KL-01", city: "Thiruvananthapuram", coordinates: [8.5241, 76.9366] },
  { code: "KL-02", city: "Kollam", coordinates: [8.8932, 76.6141] },
  { code: "KL-03", city: "Pathanamthitta", coordinates: [9.2648, 76.787] },
  { code: "KL-04", city: "Alappuzha", coordinates: [9.4981, 76.3388] },
  { code: "KL-05", city: "Kottayam", coordinates: [9.5916, 76.5222] },
  { code: "KL-06", city: "Idukki", coordinates: [9.9189, 77.1025] },
  { code: "KL-07", city: "Ernakulam", coordinates: [9.9816, 76.2999] },
  { code: "KL-08", city: "Thrissur", coordinates: [10.5276, 76.2144] },
  { code: "KL-09", city: "Palakkad", coordinates: [10.7867, 76.6548] },
  { code: "KL-10", city: "Malappuram", coordinates: [11.0736, 76.074] },
  { code: "KL-11", city: "Kozhikode", coordinates: [11.2588, 75.7804] },
  { code: "KL-12", city: "Wayanad (Kalpetta)", coordinates: [11.6854, 76.132] },
  { code: "KL-13", city: "Kannur", coordinates: [11.8745, 75.3704] },
  { code: "KL-14", city: "Kasaragod", coordinates: [12.4996, 74.9869] },
];

// Madhya Pradesh's RTO codes are corroborated across several independent,
// mutually-agreeing listings. Codes MP-23 through MP-27 and MP-29 were
// originally assigned to Raipur, Durg, Jagdalpur, Bilaspur, Ambikapur, and
// Rajnandgaon respectively; those districts became part of Chhattisgarh at
// the 2000 state bifurcation and now use the CG-series codes seeded above
// (CG-04, CG-07, CG-17, CG-10, CG-15, CG-08), so the old MP codes are no
// longer operational and are omitted here. MP-01/02/03 (Governor,
// state-government, and police vehicles) aren't public-facing district
// offices and are also omitted, matching how Chhattisgarh's equivalent
// reserved codes are handled above. Coordinates are district-headquarters
// town centres rather than verified building addresses, same caveat as the
// other large states in this file.
const MADHYA_PRADESH_RTO_SEEDS = [
  { code: "MP-04", city: "Bhopal", coordinates: [23.2599, 77.4126] },
  { code: "MP-05", city: "Hoshangabad (Narmadapuram)", coordinates: [22.7473, 77.7185] },
  { code: "MP-06", city: "Morena", coordinates: [26.4979, 78.0021] },
  { code: "MP-07", city: "Gwalior", coordinates: [26.2183, 78.1828] },
  { code: "MP-08", city: "Guna", coordinates: [24.6469, 77.3113] },
  { code: "MP-09", city: "Indore", coordinates: [22.7196, 75.8577] },
  { code: "MP-10", city: "Khargone", coordinates: [21.8225, 75.61] },
  { code: "MP-11", city: "Dhar", coordinates: [22.6, 75.3] },
  { code: "MP-12", city: "Khandwa", coordinates: [21.8248, 76.3529] },
  { code: "MP-13", city: "Ujjain", coordinates: [23.1793, 75.7849] },
  { code: "MP-14", city: "Mandsaur", coordinates: [24.073, 75.0693] },
  { code: "MP-15", city: "Sagar", coordinates: [23.8388, 78.7378] },
  { code: "MP-16", city: "Chhatarpur", coordinates: [24.9184, 79.5941] },
  { code: "MP-17", city: "Rewa", coordinates: [24.5362, 81.3037] },
  { code: "MP-18", city: "Shahdol", coordinates: [23.2989, 81.3547] },
  { code: "MP-19", city: "Satna", coordinates: [24.6005, 80.8322] },
  { code: "MP-20", city: "Jabalpur", coordinates: [23.1815, 79.9864] },
  { code: "MP-21", city: "Katni", coordinates: [23.8339, 80.3931] },
  { code: "MP-22", city: "Seoni", coordinates: [22.0868, 79.547] },
  { code: "MP-28", city: "Chhindwara", coordinates: [22.0574, 78.9382] },
  { code: "MP-30", city: "Bhind", coordinates: [26.5638, 78.7878] },
  { code: "MP-31", city: "Sheopur", coordinates: [25.6693, 76.6994] },
  { code: "MP-32", city: "Datia", coordinates: [25.6653, 78.4593] },
  { code: "MP-33", city: "Shivpuri", coordinates: [25.4231, 77.6595] },
  { code: "MP-34", city: "Damoh", coordinates: [23.8315, 79.4421] },
  { code: "MP-35", city: "Panna", coordinates: [24.7204, 80.1928] },
  { code: "MP-36", city: "Tikamgarh", coordinates: [24.7449, 78.8332] },
  { code: "MP-37", city: "Sehore", coordinates: [23.2032, 77.0844] },
  { code: "MP-38", city: "Raisen", coordinates: [23.3316, 77.7936] },
  { code: "MP-39", city: "Rajgarh", coordinates: [24.0068, 76.7318] },
  { code: "MP-40", city: "Vidisha", coordinates: [23.5251, 77.8081] },
  { code: "MP-41", city: "Dewas", coordinates: [22.9623, 76.0553] },
  { code: "MP-42", city: "Shajapur", coordinates: [23.4265, 76.274] },
  { code: "MP-43", city: "Ratlam", coordinates: [23.3341, 75.0376] },
  { code: "MP-44", city: "Neemuch", coordinates: [24.477, 74.8703] },
  { code: "MP-45", city: "Jhabua", coordinates: [22.7672, 74.5921] },
  { code: "MP-46", city: "Barwani", coordinates: [22.0332, 74.9012] },
  { code: "MP-47", city: "Harda", coordinates: [22.34, 77.095] },
  { code: "MP-48", city: "Betul", coordinates: [21.902, 77.899] },
  { code: "MP-49", city: "Narsinghpur", coordinates: [22.9469, 79.1948] },
  { code: "MP-50", city: "Balaghat", coordinates: [21.8064, 80.1857] },
  { code: "MP-51", city: "Mandla", coordinates: [22.5983, 80.3711] },
  { code: "MP-52", city: "Dindori", coordinates: [22.9425, 81.0788] },
  { code: "MP-53", city: "Sidhi", coordinates: [24.4172, 81.8828] },
  { code: "MP-54", city: "Umaria", coordinates: [23.5251, 80.838] },
  { code: "MP-65", city: "Anuppur", coordinates: [23.105, 81.691] },
  { code: "MP-66", city: "Singrauli", coordinates: [24.1994, 82.6747] },
  { code: "MP-67", city: "Ashoknagar", coordinates: [24.5773, 77.7327] },
  { code: "MP-68", city: "Burhanpur", coordinates: [21.3009, 76.2291] },
  { code: "MP-69", city: "Alirajpur", coordinates: [22.3129, 74.36] },
  { code: "MP-70", city: "Agar Malwa", coordinates: [23.7113, 76.0129] },
  { code: "MP-71", city: "Niwari", coordinates: [25.3833, 78.95] },
  { code: "MP-72", city: "Nagda", coordinates: [23.452, 75.419] },
  { code: "MP-73", city: "Maihar", coordinates: [24.2611, 80.7614] },
  { code: "MP-74", city: "Chachaura", coordinates: [24.1667, 77.15] },
];

// Manipur has 7 long-established RTO codes (MN-01 through MN-07), one per
// district, corroborated across many independent listings — though one
// listing's ordering (Imphal East as MN02) conflicts with the majority and
// is treated as the outlier here. Two more districts, Senapati and Chandel,
// appear with codes MN-08 and MN-09 in some listings but not others, so
// those two entries are lower-confidence than MN-01 through MN-07.
// Coordinates are district-headquarters town centres.
const MANIPUR_RTO_SEEDS = [
  { code: "MN-01", city: "Imphal West", coordinates: [24.817, 93.9368] },
  { code: "MN-02", city: "Churachandpur", coordinates: [24.3333, 93.6833] },
  { code: "MN-03", city: "Kangpokpi", coordinates: [25.1978, 94.0058] },
  { code: "MN-04", city: "Thoubal", coordinates: [24.6386, 93.9964] },
  { code: "MN-05", city: "Bishnupur", coordinates: [24.6333, 93.7667] },
  { code: "MN-06", city: "Imphal East", coordinates: [24.817, 93.95] },
  { code: "MN-07", city: "Ukhrul", coordinates: [25.1167, 94.3667] },
  { code: "MN-08", city: "Senapati", coordinates: [25.2667, 94.0167] },
  { code: "MN-09", city: "Chandel", coordinates: [24.33, 94.01] },
];

// Punjab's RTO scheme runs from PB-01 up past PB-90, but the vast majority
// of that range is SDM-office-level sub-registration points (one per
// tehsil/sub-division) whose exact code-to-town mapping is inconsistent
// across public listings — several sources even disagree with each other
// on which code belongs to which town beyond the first dozen or so. The
// first 12 codes after Chandigarh, however (PB-02 through PB-13), are the
// original one-per-district RTOs and are corroborated across multiple
// independent, mutually-agreeing listings, so this covers just those.
// PB-01 (Chandigarh) is a Union Territory office rather than a Punjab
// district RTO — used by some Punjab-adjacent residents but not part of
// the state's own district set — so it's omitted here, the same way
// Chhattisgarh's non-public reserved codes are omitted above. Coordinates
// are district-headquarters town centres rather than verified building
// addresses, same caveat as the other large states in this file.
const PUNJAB_RTO_SEEDS = [
  { code: "PB-02", city: "Amritsar", coordinates: [31.634, 74.8723] },
  { code: "PB-03", city: "Bathinda", coordinates: [30.211, 74.9455] },
  { code: "PB-04", city: "Faridkot", coordinates: [30.6738, 74.755] },
  { code: "PB-05", city: "Ferozepur", coordinates: [30.9331, 74.6225] },
  { code: "PB-06", city: "Gurdaspur", coordinates: [32.041, 75.4053] },
  { code: "PB-07", city: "Hoshiarpur", coordinates: [31.532, 75.9111] },
  { code: "PB-08", city: "Jalandhar", coordinates: [31.326, 75.5762] },
  { code: "PB-09", city: "Kapurthala", coordinates: [31.38, 75.386] },
  { code: "PB-10", city: "Ludhiana", coordinates: [30.901, 75.8573] },
  { code: "PB-11", city: "Patiala", coordinates: [30.3398, 76.3869] },
  { code: "PB-12", city: "Ropar (Rupnagar)", coordinates: [30.9663, 76.5262] },
  { code: "PB-13", city: "Sangrur", coordinates: [30.2458, 75.8421] },
];

// Rajasthan has around 45-58 RTO offices depending on how recently a
// listing was updated, but the codes agree cleanly only through RJ-27 —
// three independent, mutually-corroborating listings all map RJ-01 through
// RJ-27 to the same 27 districts. Past RJ-27 the sources diverge and even
// contradict each other on individual codes (e.g. RJ-37 is "Didwana" in
// two listings but "Behror" in a third; RJ-38 is variously "Abu Road",
// "Jaipur South", or "Rawatbhata" depending on the source), reflecting a
// genuinely fast-changing set of newer sub-district offices that public
// listings haven't caught up with consistently. Rather than guess, this
// covers the solid RJ-01–RJ-27 core, the same approach used for Himachal
// Pradesh and Punjab above. Jaipur (RJ-14) in particular has since split
// into multiple offices (RJ-14, RJ-45, RJ-47 and others across the city)
// that aren't captured here. Coordinates are district-headquarters town
// centres rather than verified building addresses.
const RAJASTHAN_RTO_SEEDS = [
  { code: "RJ-01", city: "Ajmer", coordinates: [26.4499, 74.6399] },
  { code: "RJ-02", city: "Alwar", coordinates: [27.553, 76.6346] },
  { code: "RJ-03", city: "Banswara", coordinates: [23.5461, 74.4433] },
  { code: "RJ-04", city: "Barmer", coordinates: [25.7521, 71.3966] },
  { code: "RJ-05", city: "Bharatpur", coordinates: [27.2152, 77.49] },
  { code: "RJ-06", city: "Bhilwara", coordinates: [25.3407, 74.6313] },
  { code: "RJ-07", city: "Bikaner", coordinates: [28.0229, 73.3119] },
  { code: "RJ-08", city: "Bundi", coordinates: [25.4305, 75.6499] },
  { code: "RJ-09", city: "Chittorgarh", coordinates: [24.8887, 74.6269] },
  { code: "RJ-10", city: "Churu", coordinates: [28.2925, 74.9647] },
  { code: "RJ-11", city: "Dholpur", coordinates: [26.7016, 77.893] },
  { code: "RJ-12", city: "Dungarpur", coordinates: [23.8431, 73.7147] },
  { code: "RJ-13", city: "Sri Ganganagar", coordinates: [29.9094, 73.8798] },
  { code: "RJ-14", city: "Jaipur", coordinates: [26.9124, 75.7873] },
  { code: "RJ-15", city: "Jaisalmer", coordinates: [26.9157, 70.9083] },
  { code: "RJ-16", city: "Jalore", coordinates: [25.3463, 72.6266] },
  { code: "RJ-17", city: "Jhalawar", coordinates: [24.5981, 76.1653] },
  { code: "RJ-18", city: "Jhunjhunu", coordinates: [28.1289, 75.3998] },
  { code: "RJ-19", city: "Jodhpur", coordinates: [26.2389, 73.0243] },
  { code: "RJ-20", city: "Kota", coordinates: [25.2138, 75.8648] },
  { code: "RJ-21", city: "Nagaur", coordinates: [27.1988, 73.7332] },
  { code: "RJ-22", city: "Pali", coordinates: [25.7711, 73.3234] },
  { code: "RJ-23", city: "Sikar", coordinates: [27.6094, 75.1399] },
  { code: "RJ-24", city: "Sirohi", coordinates: [24.885, 72.859] },
  { code: "RJ-25", city: "Sawai Madhopur", coordinates: [26.0173, 76.3489] },
  { code: "RJ-26", city: "Tonk", coordinates: [26.1651, 75.7936] },
  { code: "RJ-27", city: "Udaipur", coordinates: [24.5854, 73.7125] },
];

export const RTO_OFFICES = [
  ...STATE_RTO_SEEDS.flatMap(
    ([code, state, primaryCity, primaryCoordinates, secondaryCity, secondaryCoordinates], index) => [
      makeOffice(code, state, primaryCity, primaryCoordinates, index * 2 + 1),
      makeOffice(code, state, secondaryCity, secondaryCoordinates, index * 2 + 2),
    ]
  ),
  ...KARNATAKA_RTO_SEEDS.map((office, index) => ({
    id: office.code,
    stateCode: "KA",
    state: "Karnataka",
    name: office.name,
    shortName: office.shortName,
    address: office.address,
    phone: demoPhone(1000 + index),
    coordinates: office.coordinates,
  })),
  ...WEST_BENGAL_RTO_SEEDS.map((office, index) => ({
    id: office.code,
    stateCode: "WB",
    state: "West Bengal",
    name: office.name,
    shortName: office.shortName,
    address: office.address,
    phone: demoPhone(2000 + index),
    coordinates: office.coordinates,
  })),
  ...MAHARASHTRA_RTO_SEEDS.map((office, index) => ({
    id: office.code,
    stateCode: "MH",
    state: "Maharashtra",
    name: `Regional Transport Office, ${office.city}`,
    shortName: `RTO ${office.city} (${office.code})`,
    address: `Regional Transport Office, ${office.city}, ${office.area}, Maharashtra`,
    phone: demoPhone(3000 + index),
    coordinates: office.coordinates,
  })),
  ...UTTAR_PRADESH_RTO_SEEDS.map((office, index) => ({
    id: office.code,
    stateCode: "UP",
    state: "Uttar Pradesh",
    name: `Regional Transport Office, ${office.city}`,
    shortName: `RTO ${office.city} (${office.code})`,
    address: `Regional Transport Office, ${office.city}, Uttar Pradesh`,
    phone: demoPhone(4000 + index),
    coordinates: office.coordinates,
  })),
  ...ANDHRA_PRADESH_RTO_SEEDS.map((office, index) => ({
    id: office.code,
    stateCode: "AP",
    state: "Andhra Pradesh",
    name: `Regional Transport Office, ${office.city}`,
    shortName: `RTO ${office.city} (${office.code})`,
    address: `Regional Transport Office, ${office.city}, Andhra Pradesh`,
    phone: demoPhone(5000 + index),
    coordinates: office.coordinates,
  })),
  ...ARUNACHAL_PRADESH_RTO_SEEDS.map((office, index) => ({
    id: office.code,
    stateCode: "AR",
    state: "Arunachal Pradesh",
    name: `Regional Transport Office, ${office.city}`,
    shortName: `RTO ${office.city} (${office.code})`,
    address: `Regional Transport Office, ${office.city}, Arunachal Pradesh`,
    phone: demoPhone(6000 + index),
    coordinates: office.coordinates,
  })),
  ...ASSAM_RTO_SEEDS.map((office, index) => ({
    id: office.code,
    stateCode: "AS",
    state: "Assam",
    name: `Regional Transport Office, ${office.city}`,
    shortName: `RTO ${office.city} (${office.code})`,
    address: `Regional Transport Office, ${office.city}, Assam`,
    phone: demoPhone(7000 + index),
    coordinates: office.coordinates,
  })),
  ...BIHAR_RTO_SEEDS.map((office, index) => ({
    id: office.code,
    stateCode: "BR",
    state: "Bihar",
    name: `Regional Transport Office, ${office.city}`,
    shortName: `RTO ${office.city} (${office.code})`,
    address: `Regional Transport Office, ${office.city}, Bihar`,
    phone: demoPhone(8000 + index),
    coordinates: office.coordinates,
  })),
  ...CHHATTISGARH_RTO_SEEDS.map((office, index) => ({
    id: office.code,
    stateCode: "CG",
    state: "Chhattisgarh",
    name: `Regional Transport Office, ${office.city}`,
    shortName: `RTO ${office.city} (${office.code})`,
    address: `Regional Transport Office, ${office.city}, Chhattisgarh`,
    phone: demoPhone(9000 + index),
    coordinates: office.coordinates,
  })),
  ...GOA_RTO_SEEDS.map((office, index) => ({
    id: office.code,
    stateCode: "GA",
    state: "Goa",
    name: `Regional Transport Office, ${office.city}`,
    shortName: `RTO ${office.city} (${office.code})`,
    address: `Regional Transport Office, ${office.city} — ${office.note}, Goa`,
    phone: demoPhone(9500 + index),
    coordinates: office.coordinates,
  })),
  ...GUJARAT_RTO_SEEDS.map((office, index) => ({
    id: office.code,
    stateCode: "GJ",
    state: "Gujarat",
    name: `Regional Transport Office, ${office.city}`,
    shortName: `RTO ${office.city} (${office.code})`,
    address: `Regional Transport Office, ${office.city}, Gujarat`,
    phone: demoPhone(10000 + index),
    coordinates: office.coordinates,
  })),
  ...JAMMU_KASHMIR_RTO_SEEDS.map((office, index) => ({
    id: office.code,
    stateCode: "JK",
    state: "Jammu & Kashmir",
    name: `Regional Transport Office, ${office.city}`,
    shortName: `RTO ${office.city} (${office.code})`,
    address: `Regional Transport Office, ${office.city}, Jammu & Kashmir`,
    phone: demoPhone(11000 + index),
    coordinates: office.coordinates,
  })),
  ...JHARKHAND_RTO_SEEDS.map((office, index) => ({
    id: office.code,
    stateCode: "JH",
    state: "Jharkhand",
    name: `Regional Transport Office, ${office.city}`,
    shortName: `RTO ${office.city} (${office.code})`,
    address: `Regional Transport Office, ${office.city}, Jharkhand`,
    phone: demoPhone(12000 + index),
    coordinates: office.coordinates,
  })),
  ...HIMACHAL_PRADESH_RTO_SEEDS.map((office, index) => ({
    id: office.code,
    stateCode: "HP",
    state: "Himachal Pradesh",
    name: `Regional Transport Office, ${office.city}`,
    shortName: `RTO ${office.city} (${office.code})`,
    address: `Regional Transport Office, ${office.city}, Himachal Pradesh`,
    phone: demoPhone(13000 + index),
    coordinates: office.coordinates,
  })),
  ...KERALA_RTO_SEEDS.map((office, index) => ({
    id: office.code,
    stateCode: "KL",
    state: "Kerala",
    name: `Regional Transport Office, ${office.city}`,
    shortName: `RTO ${office.city} (${office.code})`,
    address: `Regional Transport Office, ${office.city}, Kerala`,
    phone: demoPhone(14000 + index),
    coordinates: office.coordinates,
  })),
  ...MADHYA_PRADESH_RTO_SEEDS.map((office, index) => ({
    id: office.code,
    stateCode: "MP",
    state: "Madhya Pradesh",
    name: `Regional Transport Office, ${office.city}`,
    shortName: `RTO ${office.city} (${office.code})`,
    address: `Regional Transport Office, ${office.city}, Madhya Pradesh`,
    phone: demoPhone(15000 + index),
    coordinates: office.coordinates,
  })),
  ...MANIPUR_RTO_SEEDS.map((office, index) => ({
    id: office.code,
    stateCode: "MN",
    state: "Manipur",
    name: `Regional Transport Office, ${office.city}`,
    shortName: `RTO ${office.city} (${office.code})`,
    address: `Regional Transport Office, ${office.city}, Manipur`,
    phone: demoPhone(16000 + index),
    coordinates: office.coordinates,
  })),
  ...PUNJAB_RTO_SEEDS.map((office, index) => ({
    id: office.code,
    stateCode: "PB",
    state: "Punjab",
    name: `Regional Transport Office, ${office.city}`,
    shortName: `RTO ${office.city} (${office.code})`,
    address: `Regional Transport Office, ${office.city}, Punjab`,
    phone: demoPhone(17000 + index),
    coordinates: office.coordinates,
  })),
  ...RAJASTHAN_RTO_SEEDS.map((office, index) => ({
    id: office.code,
    stateCode: "RJ",
    state: "Rajasthan",
    name: `Regional Transport Office, ${office.city}`,
    shortName: `RTO ${office.city} (${office.code})`,
    address: `Regional Transport Office, ${office.city}, Rajasthan`,
    phone: demoPhone(18000 + index),
    coordinates: office.coordinates,
  })),
];

export const RTO_STATES = [
  ...STATE_RTO_SEEDS.map(([code, name]) => ({ code, name })),
  { code: "KA", name: "Karnataka" },
  { code: "WB", name: "West Bengal" },
  { code: "MH", name: "Maharashtra" },
  { code: "UP", name: "Uttar Pradesh" },
  { code: "AP", name: "Andhra Pradesh" },
  { code: "AR", name: "Arunachal Pradesh" },
  { code: "AS", name: "Assam" },
  { code: "BR", name: "Bihar" },
  { code: "CG", name: "Chhattisgarh" },
  { code: "GA", name: "Goa" },
  { code: "GJ", name: "Gujarat" },
  { code: "JK", name: "Jammu & Kashmir" },
  { code: "JH", name: "Jharkhand" },
  { code: "HP", name: "Himachal Pradesh" },
  { code: "KL", name: "Kerala" },
  { code: "MP", name: "Madhya Pradesh" },
  { code: "MN", name: "Manipur" },
  { code: "PB", name: "Punjab" },
  { code: "RJ", name: "Rajasthan" },
].sort((a, b) => a.name.localeCompare(b.name));