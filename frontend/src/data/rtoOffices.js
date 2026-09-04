// Seeded RTO locations used by the locator demo.  Each state has a primary
// and a secondary office so the map, nearest-office calculation, and list can
// be exercised without relying on a third-party directory API.
//
// Karnataka, West Bengal, Maharashtra, Uttar Pradesh, Andhra Pradesh,
// Arunachal Pradesh, Assam, Bihar, Chhattisgarh, Goa, Gujarat, Jammu &
// Kashmir, Jharkhand, Himachal Pradesh, Kerala, Madhya Pradesh, Meghalaya,
// Manipur, Mizoram, Nagaland, Odisha, Punjab, Rajasthan, Uttarakhand,
// Telangana, and Tamil Nadu are special cases: instead of a generic
// 2-office placeholder, they're seeded with real RTO jurisdictions (codes,
// localities, and addresses sourced from official Transport Dept.
// listings / multiple corroborating public reference sources) for fuller
// coverage. Himachal Pradesh is the one partial exception — its ~90+ code
// scheme (district HQs, sub-divisional offices, tourist/government
// series) is large and inconsistently documented across sources, so it's
// seeded with just the state's 12 main district-headquarters RTOs rather
// than an attempt at the full table.
// Phone numbers everywhere in this file — including for these detailed
// states — stay in the same fictitious "1800 121 xxxx" demo format used
// across the rest of the site, rather than mixing in real published
// landline numbers that could be stale or misdialed by someone testing the
// app.
const STATE_RTO_SEEDS = [
  ["HR", "Haryana", "Gurugram", [28.4595, 77.0266], "Faridabad", [28.4089, 77.3178]],
  ["SK", "Sikkim", "Gangtok", [27.3389, 88.6065], "Namchi", [27.1664, 88.3638]],
  ["TR", "Tripura", "Agartala", [23.8315, 91.2868], "Udaipur", [23.5333, 91.4833]],
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

// Mizoram has 9 RTO/DTO codes, one per district plus a separate "Aizawl
// Rural" office (MZ-09) covering the areas surrounding the capital rather
// than the city itself. District/code pairing is corroborated across
// three independent, mutually-agreeing listings, including per-office
// detail pages that confirm the individual addresses for Aizawl, Lunglei,
// Saiha, and Lawngtlai. Coordinates are district-headquarters town
// centres rather than verified building addresses, same caveat as the
// other states in this file; Aizawl Rural's coordinate is a rough
// approximation just outside Aizawl city itself, since it isn't a single
// town with its own centre.
const MIZORAM_RTO_SEEDS = [
  { code: "MZ-01", city: "Aizawl", coordinates: [23.7271, 92.7176] },
  { code: "MZ-02", city: "Lunglei", coordinates: [22.8864, 92.7425] },
  { code: "MZ-03", city: "Saiha", coordinates: [22.4931, 92.9756] },
  { code: "MZ-04", city: "Champhai", coordinates: [23.4667, 93.3333] },
  { code: "MZ-05", city: "Kolasib", coordinates: [24.2332, 92.6767] },
  { code: "MZ-06", city: "Serchhip", coordinates: [23.3333, 92.85] },
  { code: "MZ-07", city: "Lawngtlai", coordinates: [22.5333, 92.9167] },
  { code: "MZ-08", city: "Mamit", coordinates: [23.9333, 92.4833] },
  { code: "MZ-09", city: "Aizawl Rural", coordinates: [23.68, 92.65] },
];

// Nagaland has 8 district RTO offices (NL-01 through NL-08); two further
// codes, NL-10 and NL-11, are reserved for government non-transport and
// government transport vehicles respectively rather than being
// public-facing district offices, so — matching how Chhattisgarh's and
// Madhya Pradesh's reserved codes are omitted elsewhere in this file —
// they're left out here. District/code pairing is corroborated across
// four independent, mutually-agreeing listings (one single outlier
// listing orders the codes differently and is treated as the error,
// since every other source agrees on this sequence). Coordinates are
// district-headquarters town centres rather than verified building
// addresses, same caveat as the other states in this file.
const NAGALAND_RTO_SEEDS = [
  { code: "NL-01", city: "Kohima", coordinates: [25.6751, 94.1086] },
  { code: "NL-02", city: "Mokokchung", coordinates: [26.325, 94.5119] },
  { code: "NL-03", city: "Tuensang", coordinates: [26.2743, 94.8256] },
  { code: "NL-04", city: "Mon", coordinates: [26.7411, 95.0578] },
  { code: "NL-05", city: "Wokha", coordinates: [26.0997, 94.2647] },
  { code: "NL-06", city: "Zunheboto", coordinates: [26.0084, 94.5233] },
  { code: "NL-07", city: "Dimapur", coordinates: [25.904, 93.7266] },
  { code: "NL-08", city: "Phek", coordinates: [25.6656, 94.4761] },
];

// Odisha has 35 district-level RTO offices, officially numbered OD-01
// through OD-35 by the state Transport Dept. (odishatransport.gov.in),
// which also confirms the split of Bhubaneswar into two zones (OD-02 and
// OD-33) and Sundargarh district into two offices — the district HQ
// (OD-16) and the separate industrial-town office at Rourkela (OD-14).
// The full code table is corroborated across two independently-agreeing
// public listings, cross-checked against the department's own printed
// area-code map for the lower-numbered codes (OD-01 through OD-09).
// Coordinates are town/city centres rather than verified building
// addresses, same caveat as the other large states in this file.
const ODISHA_RTO_SEEDS = [
  { code: "OD-01", city: "Balasore", coordinates: [21.4942, 86.9316] },
  { code: "OD-02", city: "Bhubaneswar (I)", coordinates: [20.2961, 85.8245] },
  { code: "OD-03", city: "Bolangir", coordinates: [20.7074, 83.4835] },
  { code: "OD-04", city: "Chandikhole", coordinates: [20.7833, 86.05] },
  { code: "OD-05", city: "Cuttack", coordinates: [20.4625, 85.883] },
  { code: "OD-06", city: "Dhenkanal", coordinates: [20.6586, 85.5981] },
  { code: "OD-07", city: "Ganjam (Chhatrapur)", coordinates: [19.35, 84.98] },
  { code: "OD-08", city: "Kalahandi (Bhawanipatna)", coordinates: [19.9064, 83.1653] },
  { code: "OD-09", city: "Keonjhar", coordinates: [21.6297, 85.5817] },
  { code: "OD-10", city: "Koraput", coordinates: [18.8123, 82.7108] },
  { code: "OD-11", city: "Mayurbhanj (Baripada)", coordinates: [21.9347, 86.7286] },
  { code: "OD-12", city: "Phulbani (Kandhamal)", coordinates: [20.4667, 84.2333] },
  { code: "OD-13", city: "Puri", coordinates: [19.8135, 85.8312] },
  { code: "OD-14", city: "Rourkela", coordinates: [22.2604, 84.8536] },
  { code: "OD-15", city: "Sambalpur", coordinates: [21.4669, 83.9756] },
  { code: "OD-16", city: "Sundargarh", coordinates: [22.1167, 84.0333] },
  { code: "OD-17", city: "Bargarh", coordinates: [21.3347, 83.6197] },
  { code: "OD-18", city: "Rayagada", coordinates: [19.1719, 83.4159] },
  { code: "OD-19", city: "Angul", coordinates: [20.8397, 85.1017] },
  { code: "OD-20", city: "Gajapati (Paralakhemundi)", coordinates: [18.7833, 84.0833] },
  { code: "OD-21", city: "Jagatsinghpur", coordinates: [20.2549, 86.1706] },
  { code: "OD-22", city: "Bhadrak", coordinates: [21.0574, 86.5155] },
  { code: "OD-23", city: "Jharsuguda", coordinates: [21.8554, 84.0062] },
  { code: "OD-24", city: "Nabarangpur", coordinates: [19.2333, 82.55] },
  { code: "OD-25", city: "Nayagarh", coordinates: [20.1289, 85.0975] },
  { code: "OD-26", city: "Nuapada", coordinates: [20.8064, 82.5453] },
  { code: "OD-27", city: "Boudh", coordinates: [20.8333, 84.3333] },
  { code: "OD-28", city: "Debagarh (Deogarh)", coordinates: [21.5333, 84.7333] },
  { code: "OD-29", city: "Kendrapara", coordinates: [20.5, 86.4167] },
  { code: "OD-30", city: "Malkangiri", coordinates: [18.3667, 81.9] },
  { code: "OD-31", city: "Sonepur (Subarnapur)", coordinates: [20.8333, 83.9167] },
  { code: "OD-32", city: "Bhanjanagar", coordinates: [19.9167, 84.6] },
  { code: "OD-33", city: "Bhubaneswar (II)", coordinates: [20.3, 85.85] },
  { code: "OD-34", city: "Jajpur", coordinates: [20.85, 86.3333] },
  { code: "OD-35", city: "Talcher", coordinates: [20.95, 85.2167] },
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

// Meghalaya's RTO code table has a genuine three-way source conflict for
// codes ML-04 through ML-10. One widely syndicated blog table (appearing,
// word-for-word, on two different insurer domains — so really a single
// source republished twice) assigns ML-02 Jowai, ML-03 Nongstoin, ML-05
// Williamnagar, ML-06 Baghmara, ML-07 Resubelpara, ML-08 Khliehriat, ML-09
// Mairang, ML-10 Ampati. That directly conflicts with three independent
// sources used here instead: two aggregator listings that agree with each
// other (ML-04 Jaintia Hills, ML-06 West Khasi Hills, ML-07 East Garo
// Hills, ML-08 West Garo Hills, ML-09 South Garo Hills, ML-10 Ri-Bhoi/
// Nongpoh), corroborated by individual per-office "verified RTO" detail
// pages confirming ML-01, ML-02, ML-03 and ML-05 are all separate offices
// physically seated in Shillong itself (East Khasi Hills) rather than at
// Jowai/Nongstoin/Williamnagar as the single syndicated table claims. The
// three-source, address-verified version is used below; ML-02, ML-03 are
// additional Shillong-area offices without a more specific published
// locality breakdown, so they're listed at the Shillong coordinate. Newer
// districts carved out since (South West Khasi Hills, East Jaintia Hills,
// North Garo Hills, South West Garo Hills) don't yet have their own codes
// in any of the sources checked, matching the lag seen for newly split
// districts in other states in this file.
const MEGHALAYA_RTO_SEEDS = [
  { code: "ML-01", city: "Shillong", note: "East Khasi Hills district — Sadar office", coordinates: [25.5788, 91.8933] },
  { code: "ML-02", city: "Shillong", note: "East Khasi Hills district — additional office", coordinates: [25.5788, 91.8933] },
  { code: "ML-03", city: "Shillong", note: "East Khasi Hills district — additional office", coordinates: [25.5788, 91.8933] },
  { code: "ML-04", city: "Jowai", note: "Jaintia Hills district", coordinates: [25.4333, 92.2] },
  { code: "ML-05", city: "Shillong", note: "East Khasi Hills district — additional office", coordinates: [25.5788, 91.8933] },
  { code: "ML-06", city: "Nongstoin", note: "West Khasi Hills district", coordinates: [25.5167, 91.2667] },
  { code: "ML-07", city: "Williamnagar", note: "East Garo Hills district", coordinates: [25.4833, 90.6167] },
  { code: "ML-08", city: "Tura", note: "West Garo Hills district", coordinates: [25.514, 90.2024] },
  { code: "ML-09", city: "Baghmara", note: "South Garo Hills district", coordinates: [25.1667, 90.6333] },
  { code: "ML-10", city: "Nongpoh", note: "Ri-Bhoi district", coordinates: [25.9167, 91.8833] },
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

// Uttarakhand: the state's official Transport Dept. site (transport.uk.gov.in)
// confirms the core mapping used here — UK-01 Almora, UK-04 Nainital (seated
// at Haldwani), UK-07 Dehradun, UK-12 Pauri — and several independent
// third-party listings agree on the full UK-01 to UK-20 table built from
// that base. The state has 13 districts; the extra codes beyond UK-13
// (UK-14 through UK-20) are sub-divisional RTO/ARTO offices — Rishikesh,
// Kotdwar, Vikasnagar, Roorkee, Kashipur, Ramnagar, and an ARTO at
// Ranikhet — that sit inside a parent district rather than being separate
// districts themselves, noted via each entry's `note` field. The old "UA"
// prefix was retired in favour of "UK" from 1 January 2007. Coordinates
// are town centres rather than verified building addresses.
const UTTARAKHAND_RTO_SEEDS = [
  { code: "UK-01", city: "Almora", note: "Almora district", coordinates: [29.5892, 79.6467] },
  { code: "UK-02", city: "Bageshwar", note: "Bageshwar district", coordinates: [29.8406, 79.7691] },
  { code: "UK-03", city: "Champawat", note: "Champawat district", coordinates: [29.3352, 80.0961] },
  { code: "UK-04", city: "Haldwani", note: "Nainital district", coordinates: [29.2183, 79.513] },
  { code: "UK-05", city: "Pithoragarh", note: "Pithoragarh district", coordinates: [29.5829, 80.2181] },
  { code: "UK-06", city: "Rudrapur", note: "Udham Singh Nagar district", coordinates: [28.9875, 79.4159] },
  { code: "UK-07", city: "Dehradun", note: "Dehradun district", coordinates: [30.3165, 78.0322] },
  { code: "UK-08", city: "Haridwar", note: "Haridwar district", coordinates: [29.9457, 78.1642] },
  { code: "UK-09", city: "New Tehri", note: "Tehri Garhwal district", coordinates: [30.3778, 78.4804] },
  { code: "UK-10", city: "Uttarkashi", note: "Uttarkashi district", coordinates: [30.7268, 78.4354] },
  { code: "UK-11", city: "Gopeshwar", note: "Chamoli district", coordinates: [30.3877, 79.3389] },
  { code: "UK-12", city: "Pauri", note: "Pauri Garhwal district", coordinates: [30.1462, 78.7773] },
  { code: "UK-13", city: "Rudraprayag", note: "Rudraprayag district", coordinates: [30.2849, 78.9814] },
  { code: "UK-14", city: "Rishikesh", note: "sub-office, Dehradun district", coordinates: [30.0869, 78.2676] },
  { code: "UK-15", city: "Kotdwar", note: "sub-office, Pauri Garhwal district", coordinates: [29.7457, 78.5205] },
  { code: "UK-16", city: "Vikasnagar", note: "sub-office, Dehradun district", coordinates: [30.4693, 77.7728] },
  { code: "UK-17", city: "Roorkee", note: "sub-office, Haridwar district", coordinates: [29.8543, 77.888] },
  { code: "UK-18", city: "Kashipur", note: "sub-office, Udham Singh Nagar district", coordinates: [29.2141, 78.9622] },
  { code: "UK-19", city: "Ramnagar", note: "sub-office, Nainital district", coordinates: [29.3956, 79.1288] },
  { code: "UK-20", city: "Ranikhet", note: "ARTO, Almora district", coordinates: [29.6425, 79.4319] },
];

// Telangana had 37-38 codes in active district-level use as of the most
// recent corroborating listings (TS-01 through TS-33 agree across three
// independent sources; TS-34 through TS-36 agree across two; TS-37 and
// TS-38, for Mulugu and Narayanpet, appear in only one source each and are
// the lowest-confidence entries here). TS-14 is a reserved/overflow series
// for Hyderabad rather than a standalone district office and is omitted,
// the same way other purely-reserved codes are omitted elsewhere in this
// file. Worth flagging: Telangana's registration prefix has been
// transitioning from "TS" to "TG" since 2025 per some sources — this
// dataset keeps the long-established "TS" codes since that's what's on
// the large existing fleet and what most listings still key off, but new
// registrations may increasingly show "TG" instead. Coordinates are
// district-headquarters town centres rather than verified building
// addresses.
const TELANGANA_RTO_SEEDS = [
  { code: "TS-01", city: "Adilabad", coordinates: [19.6641, 78.532] },
  { code: "TS-02", city: "Karimnagar", coordinates: [18.4386, 79.1288] },
  { code: "TS-03", city: "Hanumakonda (Warangal Urban)", coordinates: [17.9689, 79.5941] },
  { code: "TS-04", city: "Khammam", coordinates: [17.2473, 80.1514] },
  { code: "TS-05", city: "Nalgonda", coordinates: [17.0575, 79.269] },
  { code: "TS-06", city: "Mahbubnagar", coordinates: [16.7488, 77.9855] },
  { code: "TS-07", city: "Shamshabad (Ranga Reddy)", coordinates: [17.2403, 78.4294] },
  { code: "TS-08", city: "Medchal-Malkajgiri", coordinates: [17.6294, 78.4813] },
  { code: "TS-09", city: "Hyderabad Central (Khairatabad)", coordinates: [17.4126, 78.4487] },
  { code: "TS-10", city: "Hyderabad North", coordinates: [17.45, 78.47] },
  { code: "TS-11", city: "Hyderabad East", coordinates: [17.38, 78.53] },
  { code: "TS-12", city: "Hyderabad South", coordinates: [17.35, 78.47] },
  { code: "TS-13", city: "Hyderabad West", coordinates: [17.4, 78.4] },
  { code: "TS-15", city: "Sangareddy", coordinates: [17.6273, 78.0822] },
  { code: "TS-16", city: "Nizamabad", coordinates: [18.6725, 78.0941] },
  { code: "TS-17", city: "Kamareddy", coordinates: [18.3212, 78.3374] },
  { code: "TS-18", city: "Nirmal", coordinates: [19.0968, 78.345] },
  { code: "TS-19", city: "Mancherial", coordinates: [18.871, 79.4645] },
  { code: "TS-20", city: "Kumaram Bheem Asifabad", coordinates: [19.3667, 79.2833] },
  { code: "TS-21", city: "Jagtial", coordinates: [18.7942, 78.9161] },
  { code: "TS-22", city: "Peddapalli", coordinates: [18.6151, 79.3742] },
  { code: "TS-23", city: "Rajanna Sircilla", coordinates: [18.3936, 78.8298] },
  { code: "TS-24", city: "Warangal (Rural)", coordinates: [17.9, 79.7] },
  { code: "TS-25", city: "Jayashankar Bhupalpally", coordinates: [18.4321, 79.8814] },
  { code: "TS-26", city: "Mahabubabad", coordinates: [17.6033, 80.0021] },
  { code: "TS-27", city: "Jangaon", coordinates: [17.7286, 79.1554] },
  { code: "TS-28", city: "Bhadradri Kothagudem", coordinates: [17.5563, 80.6197] },
  { code: "TS-29", city: "Suryapet", coordinates: [17.14, 79.62] },
  { code: "TS-30", city: "Yadadri Bhuvanagiri", coordinates: [17.5167, 79.15] },
  { code: "TS-31", city: "Nagarkurnool", coordinates: [16.48, 78.32] },
  { code: "TS-32", city: "Wanaparthy", coordinates: [16.3607, 78.0649] },
  { code: "TS-33", city: "Jogulamba Gadwal", coordinates: [16.2311, 77.7956] },
  { code: "TS-34", city: "Vikarabad", coordinates: [17.3378, 77.9048] },
  { code: "TS-35", city: "Medak", coordinates: [18.046, 78.2696] },
  { code: "TS-36", city: "Siddipet", coordinates: [18.1018, 78.8455] },
  { code: "TS-37", city: "Mulugu", coordinates: [18.19, 80.0] },
  { code: "TS-38", city: "Narayanpet", coordinates: [16.7442, 77.4956] },
];

// Tamil Nadu's code table is unusually large (well past 90 codes once
// every taluk sub-office is counted) and different public listings
// genuinely disagree with each other on plenty of the higher-numbered
// codes. This seed list has two tiers of confidence: TN-01 through TN-14
// (the Chennai metro cluster) are corroborated across three to four
// independent sources that agree exactly on the code/office pairing. The
// remaining entries — one flagship office per other major city/district —
// come from a single internally-consistent Transport-Dept.-derived table,
// with the individual code for each of Coimbatore (TN-37/38/66/99),
// Madurai (TN-58/59/64), Salem (TN-29/30/54/90), Erode (TN-33/86), and
// Tiruchirappalli (TN-45 West/TN-48 Srirangam/TN-81 East) additionally
// cross-checked and confirmed against two or more independent sources.
// Some codes that turned up with conflicting city assignments across
// sources (e.g. TN-16, TN-17, TN-26, TN-27) are left out entirely rather
// than guessed at. Suffixed variant codes (TN-15M, TN-39Z, TN-83M, and
// similar enforcement/zonal sub-codes) are also omitted for the same
// reason — this covers base codes only. Coordinates are town/locality
// centres rather than verified building addresses.
const TAMIL_NADU_RTO_SEEDS = [
  { code: "TN-01", city: "Chennai Central (Ayanavaram)", coordinates: [13.0894, 80.2337] },
  { code: "TN-02", city: "Chennai North West (Anna Nagar)", coordinates: [13.085, 80.2101] },
  { code: "TN-03", city: "Chennai North East (Tondiarpet)", coordinates: [13.1067, 80.2847] },
  { code: "TN-04", city: "Chennai East (Mylapore)", coordinates: [13.0339, 80.2619] },
  { code: "TN-05", city: "Chennai North (Perambur)", coordinates: [13.1143, 80.2427] },
  { code: "TN-06", city: "Chennai South East (Adyar)", coordinates: [13.0012, 80.2565] },
  { code: "TN-07", city: "Chennai South (Velachery)", coordinates: [12.975, 80.22] },
  { code: "TN-09", city: "Chennai West (Koyambedu)", coordinates: [13.0722, 80.1958] },
  { code: "TN-10", city: "Chennai South West (Guindy)", coordinates: [13.01, 80.21] },
  { code: "TN-11", city: "Tambaram", coordinates: [12.9249, 80.1] },
  { code: "TN-12", city: "Poonamallee (Paruthipattu)", coordinates: [13.0475, 80.0947] },
  { code: "TN-13", city: "Ambattur", coordinates: [13.1143, 80.1548] },
  { code: "TN-14", city: "Sholinganallur", coordinates: [12.901, 80.2279] },
  { code: "TN-15", city: "Ulundurpet", coordinates: [11.6167, 79.3333] },
  { code: "TN-18", city: "Redhills", coordinates: [13.19, 80.183] },
  { code: "TN-19", city: "Chengalpattu", coordinates: [12.6819, 79.9888] },
  { code: "TN-20", city: "Thiruvallur", coordinates: [13.1439, 79.9094] },
  { code: "TN-21", city: "Kanchipuram", coordinates: [12.8342, 79.7036] },
  { code: "TN-22", city: "Meenambakkam", coordinates: [12.995, 80.1706] },
  { code: "TN-23", city: "Vellore", coordinates: [12.9165, 79.1325] },
  { code: "TN-24", city: "Krishnagiri", coordinates: [12.5186, 78.2137] },
  { code: "TN-25", city: "Tiruvannamalai", coordinates: [12.2253, 79.0747] },
  { code: "TN-28", city: "Namakkal (North)", coordinates: [11.2189, 78.1677] },
  { code: "TN-29", city: "Dharmapuri", coordinates: [12.1211, 78.1582] },
  { code: "TN-30", city: "Salem (West)", coordinates: [11.6643, 78.146] },
  { code: "TN-31", city: "Cuddalore", coordinates: [11.748, 79.7714] },
  { code: "TN-32", city: "Viluppuram", coordinates: [11.9401, 79.4861] },
  { code: "TN-33", city: "Erode (East)", coordinates: [11.341, 77.7172] },
  { code: "TN-34", city: "Tiruchengode", coordinates: [11.3817, 77.8944] },
  { code: "TN-36", city: "Gobichettipalayam", coordinates: [11.4552, 77.4429] },
  { code: "TN-37", city: "Coimbatore (South)", coordinates: [11.0016, 76.9668] },
  { code: "TN-38", city: "Coimbatore (North)", coordinates: [11.0296, 76.9538] },
  { code: "TN-39", city: "Tiruppur (North)", coordinates: [11.1085, 77.3411] },
  { code: "TN-40", city: "Mettupalayam", coordinates: [11.2996, 76.9414] },
  { code: "TN-41", city: "Pollachi", coordinates: [10.6588, 77.0083] },
  { code: "TN-42", city: "Tiruppur (South)", coordinates: [11.085, 77.3411] },
  { code: "TN-43", city: "Ooty (Nilgiris)", coordinates: [11.4102, 76.695] },
  { code: "TN-45", city: "Tiruchirappalli (West)", coordinates: [10.8155, 78.6749] },
  { code: "TN-46", city: "Perambalur", coordinates: [11.2342, 78.8807] },
  { code: "TN-47", city: "Karur", coordinates: [10.9601, 78.0766] },
  { code: "TN-48", city: "Srirangam", coordinates: [10.8624, 78.6928] },
  { code: "TN-49", city: "Thanjavur", coordinates: [10.787, 79.1378] },
  { code: "TN-50", city: "Tiruvarur", coordinates: [10.7661, 79.6494] },
  { code: "TN-51", city: "Nagapattinam", coordinates: [10.7672, 79.8449] },
  { code: "TN-52", city: "Sankagiri", coordinates: [11.475, 77.8778] },
  { code: "TN-54", city: "Salem (East)", coordinates: [11.67, 78.16] },
  { code: "TN-55", city: "Pudukkottai", coordinates: [10.3833, 78.8] },
  { code: "TN-56", city: "Perundurai", coordinates: [11.2761, 77.5836] },
  { code: "TN-57", city: "Dindigul", coordinates: [10.3673, 77.9803] },
  { code: "TN-58", city: "Madurai (South)", coordinates: [9.91, 78.14] },
  { code: "TN-59", city: "Madurai (North)", coordinates: [9.95, 78.13] },
  { code: "TN-60", city: "Theni", coordinates: [10.0104, 77.4768] },
  { code: "TN-61", city: "Ariyalur", coordinates: [11.1401, 79.0782] },
  { code: "TN-63", city: "Sivaganga", coordinates: [9.8433, 78.4809] },
  { code: "TN-64", city: "Madurai (Central)", coordinates: [9.9252, 78.1198] },
  { code: "TN-65", city: "Ramanathapuram", coordinates: [9.3639, 78.8395] },
  { code: "TN-66", city: "Coimbatore (Central)", coordinates: [11.0168, 76.9558] },
  { code: "TN-67", city: "Virudhunagar", coordinates: [9.5851, 77.9581] },
  { code: "TN-68", city: "Kumbakonam", coordinates: [10.9601, 79.3788] },
  { code: "TN-69", city: "Tuticorin (Thoothukudi)", coordinates: [8.7642, 78.1348] },
  { code: "TN-70", city: "Hosur", coordinates: [12.7409, 77.8253] },
  { code: "TN-72", city: "Tirunelveli", coordinates: [8.7139, 77.7567] },
  { code: "TN-73", city: "Ranipet", coordinates: [12.9247, 79.3308] },
  { code: "TN-74", city: "Nagercoil", coordinates: [8.178, 77.4346] },
  { code: "TN-75", city: "Marthandam", coordinates: [8.3057, 77.2058] },
  { code: "TN-76", city: "Tenkasi", coordinates: [8.9598, 77.3152] },
  { code: "TN-77", city: "Attur", coordinates: [11.594, 78.6009] },
  { code: "TN-78", city: "Dharapuram", coordinates: [10.7358, 77.5306] },
  { code: "TN-79", city: "Sankarankovil", coordinates: [9.1706, 77.5442] },
  { code: "TN-81", city: "Tiruchirappalli (East)", coordinates: [10.8, 78.69] },
  { code: "TN-82", city: "Mayiladuthurai", coordinates: [11.1039, 79.6549] },
  { code: "TN-83", city: "Vaniyambadi", coordinates: [12.6833, 78.6167] },
  { code: "TN-84", city: "Srivilliputtur", coordinates: [9.5119, 77.6339] },
  { code: "TN-85", city: "Kundrathur", coordinates: [12.9784, 80.0644] },
  { code: "TN-86", city: "Erode (West)", coordinates: [11.3428, 77.7089] },
  { code: "TN-87", city: "Sriperumbudur", coordinates: [12.9675, 79.9436] },
  { code: "TN-88", city: "Namakkal (South)", coordinates: [11.2189, 78.1677] },
  { code: "TN-90", city: "Salem (South)", coordinates: [11.65, 78.17] },
  { code: "TN-91", city: "Chidambaram", coordinates: [11.3993, 79.6905] },
  { code: "TN-92", city: "Thiruchendur", coordinates: [8.4948, 78.1247] },
  { code: "TN-93", city: "Mettur", coordinates: [11.7877, 77.8016] },
  { code: "TN-94", city: "Palani", coordinates: [10.4499, 77.5182] },
  { code: "TN-95", city: "Sivakasi", coordinates: [9.453, 77.7981] },
  { code: "TN-96", city: "Kovilpatti", coordinates: [9.1717, 77.8686] },
  { code: "TN-97", city: "Arani", coordinates: [12.6667, 79.2833] },
  { code: "TN-99", city: "Coimbatore (West)", coordinates: [11.01, 76.92] },
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
  ...MEGHALAYA_RTO_SEEDS.map((office, index) => ({
    id: office.code,
    stateCode: "ML",
    state: "Meghalaya",
    name: `Regional Transport Office, ${office.city}`,
    shortName: `RTO ${office.city} (${office.code})`,
    address: `Regional Transport Office, ${office.city} — ${office.note}, Meghalaya`,
    phone: demoPhone(16100 + index),
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
  ...MIZORAM_RTO_SEEDS.map((office, index) => ({
    id: office.code,
    stateCode: "MZ",
    state: "Mizoram",
    name: `Regional Transport Office, ${office.city}`,
    shortName: `RTO ${office.city} (${office.code})`,
    address: `Regional Transport Office, ${office.city}, Mizoram`,
    phone: demoPhone(16200 + index),
    coordinates: office.coordinates,
  })),
  ...NAGALAND_RTO_SEEDS.map((office, index) => ({
    id: office.code,
    stateCode: "NL",
    state: "Nagaland",
    name: `Regional Transport Office, ${office.city}`,
    shortName: `RTO ${office.city} (${office.code})`,
    address: `Regional Transport Office, ${office.city}, Nagaland`,
    phone: demoPhone(16350 + index),
    coordinates: office.coordinates,
  })),
  ...ODISHA_RTO_SEEDS.map((office, index) => ({
    id: office.code,
    stateCode: "OD",
    state: "Odisha",
    name: `Regional Transport Office, ${office.city}`,
    shortName: `RTO ${office.city} (${office.code})`,
    address: `Regional Transport Office, ${office.city}, Odisha`,
    phone: demoPhone(16500 + index),
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
  ...UTTARAKHAND_RTO_SEEDS.map((office, index) => ({
    id: office.code,
    stateCode: "UK",
    state: "Uttarakhand",
    name: `Regional Transport Office, ${office.city}`,
    shortName: `RTO ${office.city} (${office.code})`,
    address: `Regional Transport Office, ${office.city} — ${office.note}, Uttarakhand`,
    phone: demoPhone(19000 + index),
    coordinates: office.coordinates,
  })),
  ...TELANGANA_RTO_SEEDS.map((office, index) => ({
    id: office.code,
    stateCode: "TS",
    state: "Telangana",
    name: `Regional Transport Office, ${office.city}`,
    shortName: `RTO ${office.city} (${office.code})`,
    address: `Regional Transport Office, ${office.city}, Telangana`,
    phone: demoPhone(20000 + index),
    coordinates: office.coordinates,
  })),
  ...TAMIL_NADU_RTO_SEEDS.map((office, index) => ({
    id: office.code,
    stateCode: "TN",
    state: "Tamil Nadu",
    name: `Regional Transport Office, ${office.city}`,
    shortName: `RTO ${office.city} (${office.code})`,
    address: `Regional Transport Office, ${office.city}, Tamil Nadu`,
    phone: demoPhone(21000 + index),
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
  { code: "ML", name: "Meghalaya" },
  { code: "MN", name: "Manipur" },
  { code: "MZ", name: "Mizoram" },
  { code: "NL", name: "Nagaland" },
  { code: "OD", name: "Odisha" },
  { code: "PB", name: "Punjab" },
  { code: "RJ", name: "Rajasthan" },
  { code: "UK", name: "Uttarakhand" },
  { code: "TS", name: "Telangana" },
  { code: "TN", name: "Tamil Nadu" },
].sort((a, b) => a.name.localeCompare(b.name));