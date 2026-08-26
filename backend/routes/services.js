import { Router } from "express";

const router = Router();

// Static menu data mirroring the categories on the real portal,
// served bilingually so the frontend doesn't need to hardcode it.
const menu = {
  drivingLicense: {
    en: "Driving Licence Related Services",
    hi: "ड्राइविंग लाइसेंस संबंधित सेवाएं",
    items: [
      { slug: "learners-license", en: "Learner's Licence", hi: "लर्नर लाइसेंस" },
      { slug: "dl-renewal", en: "Renewal of Driving Licence", hi: "ड्राइविंग लाइसेंस का नवीनीकरण" },
      { slug: "duplicate-license", en: "Duplicate Licence", hi: "डुप्लीकेट लाइसेंस" },
      { slug: "international-permit", en: "International Driving Permit", hi: "अंतर्राष्ट्रीय ड्राइविंग परमिट" },
      { slug: "addition-of-class", en: "Addition of Vehicle Class", hi: "वाहन श्रेणी जोड़ें" },
      { slug: "dl-status", en: "Know Your Licence Details", hi: "अपने लाइसेंस का विवरण जानें" },
    ],
  },
  registration: {
    en: "Vehicle Registration Services",
    hi: "वाहन पंजीकरण सेवाएं",
    items: [
      { slug: "new-registration", en: "New Vehicle Registration", hi: "नया वाहन पंजीकरण" },
      { slug: "rc-renewal", en: "Renewal of Registration (RC)", hi: "पंजीकरण का नवीनीकरण" },
      { slug: "transfer-ownership", en: "Transfer of Ownership", hi: "स्वामित्व का हस्तांतरण" },
      { slug: "change-address", en: "Change of Address", hi: "पते में परिवर्तन" },
      { slug: "duplicate-rc", en: "Duplicate RC", hi: "डुप्लीकेट आरसी" },
      { slug: "vehicle-status", en: "Know Your Vehicle Details", hi: "अपने वाहन का विवरण जानें" },
    ],
  },
  onlineServices: {
    en: "Online Services",
    hi: "ऑनलाइन सेवाएं",
    items: [
      { slug: "vehicle-related-services", en: "Vehicle Related Services", hi: "वाहन संबंधित सेवाएं" },
      { slug: "echallan", en: "eChallan", hi: "ई-चालान" },
      { slug: "pucc", en: "PUCC", hi: "पीयूसीसी" },
      { slug: "permit-related-services", en: "Permit Related Services", hi: "परमिट संबंधित सेवाएं" },
      { slug: "vehicle-fitness-testing", en: "Vehicle Fitness Testing", hi: "वाहन फिटनेस परीक्षण" },
      { slug: "checkpost-tax", en: "Checkpost Tax", hi: "चेकपोस्ट कर" },
      { slug: "national-permit-authorization", en: "National Permit Authorization", hi: "राष्ट्रीय परमिट प्राधिकरण" },
      { slug: "vehicle-scrapping", en: "Vehicle Scrapping", hi: "वाहन स्क्रैपिंग" },
      { slug: "fancy-number", en: "Fancy Number Booking", hi: "फैंसी नंबर बुकिंग" },
    ],
  },
};

router.get("/menu", (req, res) => {
  res.json(menu);
});

export default router;
