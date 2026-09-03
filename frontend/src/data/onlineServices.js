export const VEHICLE_RELATED_SERVICES = [
  {
    slug: "echallan",
    title: { en: "eChallan", hi: "ई-चालान" },
    shortTitle: { en: "Check and pay traffic challans", hi: "ट्रैफिक चालान जांचें और भुगतान करें" },
    description: { en: "Review traffic and transport enforcement challans using a vehicle or challan number.", hi: "वाहन, चालान या ड्राइविंग लाइसेंस नंबर से ट्रैफिक और परिवहन चालान देखें।" },
    symbol: "₹",
    tone: "blue",
  },
  {
    slug: "pucc",
    title: { en: "PUCC", hi: "पीयूसीसी" },
    shortTitle: { en: "Pollution certificate services", hi: "प्रदूषण प्रमाणपत्र सेवाएं" },
    description: { en: "Find PUCC certificate details and view the status of an emission compliance record.", hi: "पीयूसीसी प्रमाणपत्र का विवरण और उत्सर्जन अनुपालन रिकॉर्ड की स्थिति देखें।" },
    symbol: "PUC",
    tone: "emerald",
  },
  {
    slug: "permit-related-services",
    title: { en: "Permit Related Services", hi: "परमिट संबंधित सेवाएं" },
    shortTitle: { en: "Apply for a transport permit", hi: "परिवहन परमिट के लिए आवेदन करें" },
    description: { en: "Begin a permit request, check requirements, or follow an existing transport application.", hi: "परमिट अनुरोध शुरू करें, आवश्यकताएं देखें या मौजूदा परिवहन आवेदन को ट्रैक करें।" },
    symbol: "P",
    tone: "violet",
  },
  {
    slug: "vehicle-fitness-testing",
    title: { en: "Vehicle Fitness Testing", hi: "वाहन फिटनेस परीक्षण" },
    shortTitle: { en: "Book a vehicle fitness test", hi: "वाहन फिटनेस टेस्ट बुक करें" },
    description: { en: "Select a testing station and request a fitness-test appointment for a transport vehicle.", hi: "परीक्षण स्टेशन चुनें और परिवहन वाहन के लिए फिटनेस टेस्ट अपॉइंटमेंट लें।" },
    symbol: "✓",
    tone: "teal",
  },
  {
    slug: "checkpost-tax",
    title: { en: "Checkpost Tax", hi: "चेकपोस्ट कर" },
    shortTitle: { en: "Calculate and pay entry tax", hi: "प्रवेश कर की गणना और भुगतान करें" },
    description: { en: "Estimate inter-state checkpost tax and continue to the payment preparation step.", hi: "अंतर-राज्यीय चेकपोस्ट कर का अनुमान लगाएं और भुगतान की तैयारी जारी रखें।" },
    symbol: "T",
    tone: "amber",
  },
  {
    slug: "national-permit-authorization",
    title: { en: "National Permit Authorization", hi: "राष्ट्रीय परमिट प्राधिकरण" },
    shortTitle: { en: "National permit dashboard", hi: "राष्ट्रीय परमिट डैशबोर्ड" },
    description: { en: "View issued national permit authorizations and use payment and transaction utilities.", hi: "जारी राष्ट्रीय परमिट प्राधिकरण देखें और भुगतान व लेनदेन सुविधाओं का उपयोग करें।" },
    symbol: "NP",
    tone: "navy",
  },
  {
    slug: "vehicle-scrapping",
    title: { en: "Vehicle Scrapping", hi: "वाहन स्क्रैपिंग" },
    shortTitle: { en: "Voluntary vehicle scrapping", hi: "स्वैच्छिक वाहन स्क्रैपिंग" },
    description: { en: "Start a voluntary scrapping request or locate a registered vehicle scrapping facility.", hi: "स्वैच्छिक स्क्रैपिंग अनुरोध शुरू करें या पंजीकृत वाहन स्क्रैपिंग सुविधा ढूंढें।" },
    symbol: "R",
    tone: "rose",
  },
  {
    slug: "fancy-number",
    title: { en: "Fancy Number Booking", hi: "फैंसी नंबर बुकिंग" },
    shortTitle: { en: "Reserve a registration mark", hi: "पसंद का पंजीकरण नंबर आरक्षित करें" },
    description: { en: "Search registration marks of choice, track auctions, and check bidding status.", hi: "पसंद के पंजीकरण नंबर खोजें, नीलामी ट्रैक करें और बोली की स्थिति देखें।" },
    symbol: "#",
    tone: "sky",
  },
];

export const SERVICE_BY_SLUG = Object.fromEntries(
  VEHICLE_RELATED_SERVICES.map((service) => [service.slug, service])
);

export const NATIONAL_PERMIT_PERIOD = "01 Apr 2025 – 25 Aug 2026";

// Transcribed from the supplied "Issued National AuthPermit" workbook.
// Each state name carries both an English and Hindi label so the table
// and summary cards translate along with the rest of the page.
export const NATIONAL_PERMIT_STATES = [
  ["ANDHRA PRADESH", "आंध्र प्रदेश", 66276, 1093554000],
  ["ARUNACHAL PRADESH", "अरुणाचल प्रदेश", 349, 5758500],
  ["ASSAM", "असम", 21246, 350559000],
  ["BIHAR", "बिहार", 60014, 990231000],
  ["CHANDIGARH", "चंडीगढ़", 2842, 46893000],
  ["CHHATTISGARH", "छत्तीसगढ़", 60135, 992227500],
  ["DELHI", "दिल्ली", 53327, 879895500],
  ["GOA", "गोवा", 1247, 20575500],
  ["GUJRAT", "गुजरात", 116967, 1929955500],
  ["HARYANA", "हरियाणा", 316162, 5216673000],
  ["HIMACHAL PRADESH", "हिमाचल प्रदेश", 38404, 633666000],
  ["JAMMU AND KASHMIR", "जम्मू और कश्मीर", 15944, 263076000],
  ["JHARKHAND", "झारखंड", 55218, 911097000],
  ["KARNATAKA", "कर्नाटक", 93593, 1544284500],
  ["KERALA", "केरल", 14073, 232204500],
  ["LADAKH", "लद्दाख", 444, 7326000],
  ["MADHYA PRADESH", "मध्य प्रदेश", 50912, 840048000],
  ["MAHARASTRA", "महाराष्ट्र", 165233, 2726344500],
  ["MANIPUR", "मणिपुर", 320, 5280000],
  ["MEGHALAYA", "मेघालय", 1496, 24684000],
  ["MIZORAM", "मिज़ोरम", 493, 8134500],
  ["NAGALAND", "नागालैंड", 133651, 2205241500],
  ["ORISSA", "ओडिशा", 40298, 664917000],
  ["PUDUCHERRY", "पुडुचेरी", 335, 5527500],
  ["PUNJAB", "पंजाब", 73485, 1212502500],
  ["RAJASTHAN", "राजस्थान", 268842, 4435893000],
  ["SIKKIM", "सिक्किम", 3, 49500],
  ["TAMILNADU", "तमिलनाडु", 136109, 2245798500],
  ["TELANGANA", "तेलंगाना", 46233, 762844500],
  ["TRIPURA", "त्रिपुरा", 2459, 40573500],
  ["UT of Dadra and Nagar Haveli and Daman and Diu", "दादरा और नगर हवेली तथा दमन और दीव", 21946, 362109000],
  ["UTTARAKHAND", "उत्तराखंड", 15651, 258241500],
  ["UTTAR PRADESH", "उत्तर प्रदेश", 209431, 3455611500],
  ["WEST BENGAL", "पश्चिम बंगाल", 85670, 1413555000],
].map(([en, hi, permits, amount]) => ({
  state: { en, hi },
  permits,
  amount,
}));

export const NATIONAL_PERMIT_TOTALS = {
  permits: 2168808,
  amount: 35785332000,
};