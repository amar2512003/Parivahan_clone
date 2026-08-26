import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  BadgeIndianRupee,
  Leaf,
  FileCheck2,
  CarFront,
  ReceiptIndianRupee,
  Globe2,
  Recycle,
  Ticket,
} from "lucide-react";

import {
  NATIONAL_PERMIT_PERIOD,
  NATIONAL_PERMIT_STATES,
  NATIONAL_PERMIT_TOTALS,
  SERVICE_BY_SLUG,
  VEHICLE_RELATED_SERVICES,
} from "../data/onlineServices";

const formatNumber = (value) =>
  new Intl.NumberFormat("en-IN").format(value);

const formatRupees = (value) =>
  `₹ ${formatNumber(value)}`;

const DIRECTORY_COPY = {
  en: {
    eyebrow: "Online services",
    title: "Vehicle Related Services",
    description:
      "Start with the service you need. Each flow is organised around one clear task, with the information and next step kept together.",
    chips: [
      "8 digital services",
      "Simple task-based flows",
      "Demo data only",
    ],
    chooseLabel: "Choose a service",
    chooseTitle: "What would you like to do?",
    chooseHint: "Select a service to continue",
    openService: "Open service",
    notice:
      "This independent hackathon demo uses sample interactions only; it does not submit, charge, or retrieve data from an official government service.",
  },

  hi: {
    eyebrow: "ऑनलाइन सेवाएं",
    title: "वाहन संबंधित सेवाएं",
    description:
      "अपनी आवश्यक सेवा से शुरू करें। हर प्रक्रिया को एक स्पष्ट काम के आसपास रखा गया है, ताकि जानकारी और अगला कदम एक ही जगह मिलें।",
    chips: [
      "8 डिजिटल सेवाएं",
      "सरल कार्य-आधारित प्रक्रियाएं",
      "केवल डेमो डेटा",
    ],
    chooseLabel: "सेवा चुनें",
    chooseTitle: "आप क्या करना चाहते हैं?",
    chooseHint: "आगे बढ़ने के लिए एक सेवा चुनें",
    openService: "सेवा खोलें",
    notice:
      "यह स्वतंत्र हैकाथॉन डेमो केवल नमूना इंटरैक्शन का उपयोग करता है। यह किसी आधिकारिक सरकारी सेवा पर डेटा जमा, शुल्क या प्राप्त नहीं करता है।",
  },
};

const HINDI_UTILITY_CONTENT = {
  echallan: {
    eyebrow: "यातायात प्रवर्तन",
    title: "अपने चालान का विवरण देखें",
    description:
      "पंजीकृत वाहन नंबर, चालान नंबर या ड्राइविंग लाइसेंस नंबर से खोजें.",
    fields: [
      {
        label: "वाहन / चालान / डीएल नंबर",
        placeholder: "जैसे WB06AB1234",
        required: true,
      },
      {
        label: "पंजीकृत मोबाइल नंबर",
        placeholder: "मोबाइल नंबर दर्ज करें",
        type: "tel",
      },
    ],
    button: "चालान देखें",
    result:
      "इस नमूना खोज में कोई खुला चालान नहीं मिला। वास्तविक सेवा में सत्यापित चालान और भुगतान विकल्प यहां दिखाई देंगे।",
    sideTitle: "ई-चालान सेवाएं",
    sideItems: [
      "चालान विवरण देखें",
      "बकाया चालान का भुगतान करें",
      "भुगतान रसीद डाउनलोड करें",
    ],
  },

  pucc: {
    eyebrow: "प्रदूषण नियंत्रण प्रमाणपत्र",
    title: "पीयूसीसी प्रमाणपत्र खोजें",
    description:
      "प्रमाणपत्र की स्थिति और नवीनतम उत्सर्जन परीक्षण रिकॉर्ड देखने के लिए वाहन विवरण दर्ज करें।",
    fields: [
      {
        label: "पंजीकरण नंबर",
        placeholder: "जैसे WB06AB1234",
        required: true,
      },
      {
        label: "चेसिस नंबर (अंतिम 5 अक्षर)",
        placeholder: "अंतिम 5 अक्षर दर्ज करें",
        required: true,
      },
    ],
    button: "प्रमाणपत्र जांचें",
    result:
      "नमूना प्रमाणपत्र जांच पूरी हुई। वास्तविक सेवा में प्रमाणपत्र नंबर, परीक्षण तिथि और वैधता अवधि दिखाई जाएगी।",
    sideTitle: "पीयूसीसी सेवाएं",
    sideItems: [
      "प्रमाणपत्र स्थिति",
      "प्रमाणपत्र इतिहास",
      "पीयूसी केंद्र खोजें",
    ],
  },

  "permit-related-services": {
    eyebrow: "परिवहन परमिट",
    title: "परमिट सेवा शुरू करें",
    description:
      "अपने वाहन और संचालन क्षेत्र के लिए उपयुक्त परमिट अनुरोध चुनें।",
    fields: [
      {
        label: "परमिट सेवा",
        type: "select",
        options: [
          "परमिट सेवा चुनें",
          "नया परमिट",
          "परमिट नवीनीकरण",
          "अस्थायी परमिट",
          "परमिट हस्तांतरण",
        ],
        required: true,
      },
      {
        label: "वाहन पंजीकरण नंबर",
        placeholder: "पंजीकरण नंबर दर्ज करें",
        required: true,
      },
      {
        label: "राज्य / केंद्र शासित प्रदेश",
        type: "select",
        options: [
          "राज्य / केंद्र शासित प्रदेश चुनें",
          "पश्चिम बंगाल",
          "दिल्ली",
          "महाराष्ट्र",
          "तमिलनाडु",
        ],
        required: true,
      },
    ],
    button: "आवेदन पर जारी रखें",
    result:
      "आपकी नमूना आवेदन प्रक्रिया तैयार है। अगली स्क्रीन पर परमिट-विशिष्ट दस्तावेज़ और शुल्क विवरण मांगे जाएंगे।",
    sideTitle: "शुरू करने से पहले",
    sideItems: [
      "आरसी और बीमा विवरण तैयार रखें",
      "वाहन का संचालन क्षेत्र चुनें",
      "आवश्यक दस्तावेज़ देखें",
    ],
  },

  "vehicle-fitness-testing": {
    eyebrow: "वाहन निरीक्षण",
    title: "फिटनेस टेस्ट बुक करें",
    description:
      "अपने परिवहन वाहन के लिए अधिकृत परीक्षण स्टेशन पर अपॉइंटमेंट खोजें।",
    fields: [
      {
        label: "वाहन पंजीकरण नंबर",
        placeholder: "पंजीकरण नंबर दर्ज करें",
        required: true,
      },
      {
        label: "वाहन श्रेणी",
        type: "select",
        options: [
          "वाहन श्रेणी चुनें",
          "मालवाहक वाहन",
          "यात्री वाहन",
          "स्कूल बस",
        ],
        required: true,
      },
      {
        label: "पसंदीदा राज्य / केंद्र शासित प्रदेश",
        type: "select",
        options: [
          "राज्य / केंद्र शासित प्रदेश चुनें",
          "पश्चिम बंगाल",
          "दिल्ली",
          "महाराष्ट्र",
          "तमिलनाडु",
        ],
        required: true,
      },
    ],
    button: "टेस्ट स्लॉट खोजें",
    result:
      "नमूना खोज पूरी हुई। वाहन रिकॉर्ड सत्यापित होने के बाद उपलब्ध स्टेशन और अपॉइंटमेंट स्लॉट दिखाई देंगे।",
    sideTitle: "फिटनेस चेकलिस्ट",
    sideItems: [
      "वाहन दस्तावेज़",
      "वैध बीमा",
      "पिछला फिटनेस प्रमाणपत्र",
    ],
  },

  "checkpost-tax": {
    eyebrow: "अंतर-राज्यीय कर",
    title: "चेकपोस्ट कर भुगतान तैयार करें",
    description:
      "भुगतान जारी रखने से पहले कर का अनुमान लगाने के लिए मार्ग और वाहन प्रकार चुनें।",
    fields: [
      {
        label: "वाहन पंजीकरण नंबर",
        placeholder: "पंजीकरण नंबर दर्ज करें",
        required: true,
      },
      {
        label: "प्रवेश राज्य / केंद्र शासित प्रदेश",
        type: "select",
        options: [
          "प्रवेश राज्य / केंद्र शासित प्रदेश चुनें",
          "पश्चिम बंगाल",
          "दिल्ली",
          "महाराष्ट्र",
          "तमिलनाडु",
        ],
        required: true,
      },
      {
        label: "वाहन प्रकार",
        type: "select",
        options: [
          "वाहन प्रकार चुनें",
          "मालवाहक वाहन",
          "यात्री वाहन",
          "निर्माण उपकरण",
        ],
        required: true,
      },
    ],
    button: "कर का अनुमान लगाएं",
    result:
      "नमूना अनुमान तैयार है। वास्तविक सेवा भुगतान से पहले वाहन और प्रवेश राज्य के विवरण से देय कर की गणना करेगी।",
    sideTitle: "भुगतान सहायता",
    sideItems: [
      "अनुमानित कर की गणना करें",
      "लेनदेन स्थिति जांचें",
      "भुगतान रसीद डाउनलोड करें",
    ],
  },

  "vehicle-scrapping": {
    eyebrow: "पंजीकृत वाहन स्क्रैपिंग सुविधा",
    title: "स्वैच्छिक स्क्रैपिंग अनुरोध शुरू करें",
    description:
      "पंजीकृत वाहन स्क्रैपिंग सुविधा के अगले कदम के लिए वाहन विवरण साझा करें।",
    fields: [
      {
        label: "वाहन पंजीकरण नंबर",
        placeholder: "पंजीकरण नंबर दर्ज करें",
        required: true,
      },
      {
        label: "मोबाइल नंबर",
        placeholder: "पंजीकृत मोबाइल नंबर दर्ज करें",
        type: "tel",
        required: true,
      },
      {
        label: "आपकी भूमिका",
        type: "select",
        options: [
          "भूमिका चुनें",
          "वाहन मालिक",
          "आरवीएसएफ / राज्य उपयोगकर्ता",
        ],
        required: true,
      },
    ],
    button: "जारी रखें",
    result:
      "नमूना अनुरोध शुरू हो गया है। वास्तविक प्रक्रिया स्वामित्व सत्यापित कर नजदीकी सुविधाएं और अपॉइंटमेंट विकल्प दिखाएगी।",
    sideTitle: "स्क्रैपिंग सेवाएं",
    sideItems: [
      "पंजीकृत सुविधा खोजें",
      "स्क्रैपिंग अनुरोध ट्रैक करें",
      "जमा प्रमाणपत्र देखें",
    ],
  },

  "fancy-number": {
    eyebrow: "पसंद का पंजीकरण नंबर",
    title: "फैंसी पंजीकरण नंबर खोजें",
    description:
      "उपलब्धता जांचने या अगली नीलामी में शामिल होने के लिए आरटीओ और नंबर की पसंद चुनें।",
    fields: [
      {
        label: "राज्य / केंद्र शासित प्रदेश",
        type: "select",
        options: [
          "राज्य / केंद्र शासित प्रदेश चुनें",
          "पश्चिम बंगाल",
          "दिल्ली",
          "महाराष्ट्र",
          "तमिलनाडु",
        ],
        required: true,
      },
      {
        label: "आरटीओ",
        type: "select",
        options: [
          "आरटीओ चुनें",
          "कोलकाता",
          "नई दिल्ली",
          "मुंबई सेंट्रल",
          "चेन्नई सेंट्रल",
        ],
        required: true,
      },
      {
        label: "पसंदीदा नंबर",
        placeholder: "जैसे 0001",
        required: true,
      },
    ],
    button: "उपलब्धता जांचें",
    result:
      "नमूना खोज पूरी हुई। वास्तविक सेवा उपलब्ध नंबर, आरक्षित मूल्य विवरण या आगामी नीलामी कार्यक्रम दिखाएगी।",
    sideTitle: "फैंसी नंबर सेवाएं",
    sideItems: [
      "उपलब्ध नंबर देखें",
      "बोली की स्थिति ट्रैक करें",
      "भुगतान स्थिति जांचें",
    ],
  },
};

const NATIONAL_PERMIT_COPY = {
  en: {
    eyebrow: "National transport project",
    issuedAuthorizations: "Issued National Permit Authorizations",
    summaryTitle: "National permit activity at a glance",
    reportingPeriod: "Reporting period",
    allIndia: "All India · Issued authorizations",
    totalPermitCount: "Total permit count",
    permitCountDetail: "Issued across 34 states and UTs",
    totalPermitAmount: "Total permit amount",
    permitAmountDetail:
      "Authorization amount in the supplied report",
    statewiseReport: "State-wise report",
    searchLabel: "Search state / UT",
    stateUt: "State / UT",
    permitCount: "Permit count",
    permitAmount: "Permit amount",
    noMatches: "No matching state or UT.",
    paymentStatus: "Payment & transaction status",
    actions: [
      [
        "Online payment",
        "Continue a national permit payment",
      ],
      [
        "Track transaction",
        "Check payment, vehicle, or bank reference status",
      ],
      [
        "Print authorization",
        "Retrieve an issued authorization or receipt",
      ],
    ],
    notice:
      "Permit figures are displayed from the supplied report for 01-04-2025 to 25-08-2026. This is a read-only demo dashboard.",
  },

  hi: {
    eyebrow: "राष्ट्रीय परिवहन परियोजना",
    issuedAuthorizations: "जारी राष्ट्रीय परमिट प्राधिकरण",
    summaryTitle: "राष्ट्रीय परमिट गतिविधि एक नज़र में",
    reportingPeriod: "रिपोर्टिंग अवधि",
    allIndia: "संपूर्ण भारत · जारी प्राधिकरण",
    totalPermitCount: "कुल परमिट संख्या",
    permitCountDetail:
      "34 राज्यों और केंद्र शासित प्रदेशों में जारी",
    totalPermitAmount: "कुल परमिट राशि",
    permitAmountDetail:
      "उपलब्ध कराई गई रिपोर्ट में प्राधिकरण राशि",
    statewiseReport: "राज्य-वार रिपोर्ट",
    searchLabel: "राज्य / केंद्र शासित प्रदेश खोजें",
    stateUt: "राज्य / केंद्र शासित प्रदेश",
    permitCount: "परमिट संख्या",
    permitAmount: "परमिट राशि",
    noMatches:
      "कोई मेल खाता राज्य या केंद्र शासित प्रदेश नहीं मिला।",
    paymentStatus: "भुगतान और लेनदेन स्थिति",
    actions: [
      [
        "ऑनलाइन भुगतान",
        "राष्ट्रीय परमिट भुगतान जारी रखें",
      ],
      [
        "लेनदेन ट्रैक करें",
        "भुगतान, वाहन या बैंक संदर्भ स्थिति जांचें",
      ],
      [
        "प्राधिकरण प्रिंट करें",
        "जारी प्राधिकरण या रसीद प्राप्त करें",
      ],
    ],
    notice:
      "परमिट आंकड़े 01-04-2025 से 25-08-2026 तक की उपलब्ध कराई गई रिपोर्ट से प्रदर्शित किए गए हैं। यह केवल-पढ़ने योग्य डेमो डैशबोर्ड है।",
  },
};

function localizeService(service, lang) {
  return {
    ...service,
    title: service.title[lang],
    shortTitle: service.shortTitle[lang],
    description: service.description[lang],
  };
}

export default function OnlineServices() {
  const { slug } = useParams();
  const { i18n } = useTranslation();
  const lang = i18n.language === "hi" ? "hi" : "en";

  if (!slug || slug === "vehicle-related-services") {
    return <VehicleRelatedServices lang={lang} />;
  }

  const service = SERVICE_BY_SLUG[slug];

  if (!service) {
    return <VehicleRelatedServices lang={lang} />;
  }

  const localizedService = localizeService(service, lang);

  if (slug === "national-permit-authorization") {
    return (
      <NationalPermitAuthorization
        service={localizedService}
        lang={lang}
      />
    );
  }

  return (
    <ServiceUtility
      service={localizedService}
      lang={lang}
    />
  );
}

function VehicleRelatedServices({ lang }) {
  const copy = DIRECTORY_COPY[lang];

  return (
    <div className="online-page">
      <section className="online-hero">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
          <p className="eyebrow eyebrow-light">
            {copy.eyebrow}
          </p>

          <h2 className="mt-3 max-w-2xl text-3xl sm:text-4xl font-bold tracking-tight">
            {copy.title}
          </h2>

          <p className="mt-4 max-w-2xl text-blue-100 leading-relaxed">
            {copy.description}
          </p>

          <div className="mt-7 flex flex-wrap gap-3 text-sm">
            {copy.chips.map((chip) => (
              <span
                className="online-hero-chip"
                key={chip}
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10 sm:py-14">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between mb-7">
          <div>
            <p className="eyebrow">
              {copy.chooseLabel}
            </p>

            <h3 className="text-2xl font-semibold text-navy-950 mt-1">
              {copy.chooseTitle}
            </h3>
          </div>

          <p className="text-sm text-slate-500">
            {copy.chooseHint}
          </p>
        </div>

        <div className="online-service-grid">
          {VEHICLE_RELATED_SERVICES.map((rawService) => {
            const service = localizeService(
              rawService,
              lang
            );

            return (
              <Link
                key={service.slug}
                to={`/online-services/${service.slug}`}
                className="online-service-card group focus-ring"
              >
                <ServiceMark service={service} />

                <h4 className="mt-4 font-semibold text-navy-950">
                  {service.title}
                </h4>

                <p className="mt-1 text-sm font-medium text-navy-700">
                  {service.shortTitle}
                </p>

                <p className="mt-3 text-sm leading-relaxed text-slate-500">
                  {service.description}
                </p>

                <span className="mt-auto pt-5 text-sm font-semibold text-blue-700">
                  {copy.openService}{" "}
                  <span aria-hidden="true">
                    →
                  </span>
                </span>
              </Link>
            );
          })}
        </div>

        <p className="mt-10 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          {copy.notice}
        </p>
      </section>
    </div>
  );
}

function ServiceUtility({ service, lang }) {
  const content =
    lang === "hi"
      ? HINDI_UTILITY_CONTENT[service.slug]
      : service.slug === "echallan"
        ? {
            eyebrow: "Traffic enforcement",
            title: "Check your challan details",
            description:
              "Search using the registered vehicle number, challan number, or driving licence number.",
            fields: [
              {
                label:
                  "Vehicle / challan / DL number",
                placeholder: "e.g. WB06AB1234",
                required: true,
              },
              {
                label:
                  "Registered mobile number",
                placeholder: "Enter mobile number",
                type: "tel",
              },
            ],
            button: "View challans",
            result:
              "No open challans were found for this sample lookup. In a live service, verified challans and payment options would appear here.",
            sideTitle: "eChallan services",
            sideItems: [
              "View challan details",
              "Pay an outstanding challan",
              "Download payment receipt",
            ],
          }
        : service.slug === "pucc"
          ? {
              eyebrow:
                "Pollution under control",
              title:
                "Find a PUCC certificate",
              description:
                "Enter vehicle details to view certificate status and the latest emission test record.",
              fields: [
                {
                  label:
                    "Registration number",
                  placeholder:
                    "e.g. WB06AB1234",
                  required: true,
                },
                {
                  label:
                    "Chassis number (last 5 characters)",
                  placeholder:
                    "Enter last 5 characters",
                  required: true,
                },
              ],
              button:
                "Check certificate",
              result:
                "Sample certificate check complete. A live service would show the certificate number, test date, and validity period.",
              sideTitle:
                "PUCC services",
              sideItems: [
                "Certificate status",
                "Certificate history",
                "Locate a PUC centre",
              ],
            }
          : service.slug ===
              "permit-related-services"
            ? {
                eyebrow:
                  "Transport permits",
                title:
                  "Start a permit service",
                description:
                  "Choose the permit request that matches your vehicle and operating area.",
                fields: [
                  {
                    label:
                      "Permit service",
                    type: "select",
                    options: [
                      "Select permit service",
                      "New permit",
                      "Permit renewal",
                      "Temporary permit",
                      "Permit transfer",
                    ],
                    required: true,
                  },
                  {
                    label:
                      "Vehicle registration number",
                    placeholder:
                      "Enter registration number",
                    required: true,
                  },
                  {
                    label: "State / UT",
                    type: "select",
                    options: [
                      "Select state / UT",
                      "West Bengal",
                      "Delhi",
                      "Maharashtra",
                      "Tamil Nadu",
                    ],
                    required: true,
                  },
                ],
                button:
                  "Continue to application",
                result:
                  "Your sample application journey is ready. The next screen would request the permit-specific documents and fee details.",
                sideTitle:
                  "Before you begin",
                sideItems: [
                  "Keep RC and insurance details ready",
                  "Select the vehicle’s operating area",
                  "Review required documents",
                ],
              }
            : service.slug ===
                "vehicle-fitness-testing"
              ? {
                  eyebrow:
                    "Vehicle inspection",
                  title:
                    "Book a fitness test",
                  description:
                    "Find an appointment at an authorised testing station for your transport vehicle.",
                  fields: [
                    {
                      label:
                        "Vehicle registration number",
                      placeholder:
                        "Enter registration number",
                      required: true,
                    },
                    {
                      label:
                        "Vehicle class",
                      type: "select",
                      options: [
                        "Select vehicle class",
                        "Goods carriage",
                        "Passenger vehicle",
                        "School bus",
                      ],
                      required: true,
                    },
                    {
                      label:
                        "Preferred state / UT",
                      type: "select",
                      options: [
                        "Select state / UT",
                        "West Bengal",
                        "Delhi",
                        "Maharashtra",
                        "Tamil Nadu",
                      ],
                      required: true,
                    },
                  ],
                  button:
                    "Find test slots",
                  result:
                    "Sample search complete. Available stations and appointment slots would be shown after the vehicle record is verified.",
                  sideTitle:
                    "Fitness checklist",
                  sideItems: [
                    "Vehicle documents",
                    "Valid insurance",
                    "Previous fitness certificate",
                  ],
                }
              : service.slug ===
                  "checkpost-tax"
                ? {
                    eyebrow:
                      "Inter-state tax",
                    title:
                      "Prepare a checkpost tax payment",
                    description:
                      "Choose the route and vehicle type to estimate tax before you continue to payment.",
                    fields: [
                      {
                        label:
                          "Vehicle registration number",
                        placeholder:
                          "Enter registration number",
                        required: true,
                      },
                      {
                        label:
                          "Entry state / UT",
                        type: "select",
                        options: [
                          "Select entry state / UT",
                          "West Bengal",
                          "Delhi",
                          "Maharashtra",
                          "Tamil Nadu",
                        ],
                        required: true,
                      },
                      {
                        label:
                          "Vehicle type",
                        type: "select",
                        options: [
                          "Select vehicle type",
                          "Goods vehicle",
                          "Passenger vehicle",
                          "Construction equipment",
                        ],
                        required: true,
                      },
                    ],
                    button:
                      "Estimate tax",
                    result:
                      "Sample estimate prepared. A live service would calculate the payable tax from the vehicle and entry-state details before payment.",
                    sideTitle:
                      "Payment support",
                    sideItems: [
                      "Calculate estimated tax",
                      "Check transaction status",
                      "Download payment receipt",
                    ],
                  }
                : service.slug ===
                    "vehicle-scrapping"
                  ? {
                      eyebrow:
                        "Registered vehicle scrapping facility",
                      title:
                        "Start a voluntary scrapping request",
                      description:
                        "Share the vehicle details to identify the next step for a registered scrapping facility.",
                      fields: [
                        {
                          label:
                            "Vehicle registration number",
                          placeholder:
                            "Enter registration number",
                          required: true,
                        },
                        {
                          label:
                            "Mobile number",
                          placeholder:
                            "Enter registered mobile number",
                          type: "tel",
                          required: true,
                        },
                        {
                          label:
                            "Your role",
                          type: "select",
                          options: [
                            "Vehicle owner",
                            "RVSF / state user",
                          ],
                          required: true,
                        },
                      ],
                      button:
                        "Continue",
                      result:
                        "Sample request started. The live journey would verify ownership, then show nearby facilities and appointment choices.",
                      sideTitle:
                        "Scrapping services",
                      sideItems: [
                        "Find a registered facility",
                        "Track a scrapping request",
                        "View certificate of deposit",
                      ],
                    }
                  : {
                      eyebrow:
                        "Registration mark of choice",
                      title:
                        "Search fancy registration numbers",
                      description:
                        "Choose an RTO and number preference to check availability or join the next auction cycle.",
                      fields: [
                        {
                          label:
                            "State / UT",
                          type: "select",
                          options: [
                            "Select state / UT",
                            "West Bengal",
                            "Delhi",
                            "Maharashtra",
                            "Tamil Nadu",
                          ],
                          required: true,
                        },
                        {
                          label:
                            "RTO",
                          type: "select",
                          options: [
                            "Select RTO",
                            "Kolkata",
                            "New Delhi",
                            "Mumbai Central",
                            "Chennai Central",
                          ],
                          required: true,
                        },
                        {
                          label:
                            "Preferred number",
                          placeholder:
                            "e.g. 0001",
                          required: true,
                        },
                      ],
                      button:
                        "Check availability",
                      result:
                        "Sample search complete. A live service would display available marks, reserve-price details, or the upcoming auction schedule.",
                      sideTitle:
                        "Fancy number services",
                      sideItems: [
                        "View available numbers",
                        "Track bidding status",
                        "Check payment status",
                      ],
                    };

  return (
    <div className="online-page">
      <ServiceHeading
        service={service}
        eyebrow={content.eyebrow}
        lang={lang}
      />

      <section className="max-w-6xl mx-auto px-4 pb-14 grid gap-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(270px,0.75fr)]">
        <TaskForm {...content} />

        <aside className="surface-card h-fit p-6">
          <p className="eyebrow">
            {lang === "hi"
              ? "सहायक विकल्प"
              : "Helpful options"}
          </p>

          <h3 className="mt-2 text-xl font-semibold text-navy-950">
            {content.sideTitle}
          </h3>

          <ul className="mt-5 divide-y divide-slate-100">
            {content.sideItems.map((item) => (
              <li
                key={item}
                className="py-3 flex items-center gap-3 text-sm text-slate-600"
              >
                <span
                  className="online-list-dot"
                  aria-hidden="true"
                >
                  ✓
                </span>

                {item}
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-xl bg-slate-50 p-4 text-sm leading-relaxed text-slate-600">
            {lang === "hi"
              ? "आप इस डेमो का उपयोग बिना साइन इन किए कर सकते हैं। वास्तविक सेवा केवल आवश्यक होने पर सत्यापन मांगेगी।"
              : "You can use this demo without signing in. A real service would ask for verification only when it is needed."}
          </div>
        </aside>
      </section>
    </div>
  );
}

function ServiceHeading({ service, eyebrow, lang }) {
  return (
    <section className="max-w-6xl mx-auto px-4 pt-9 pb-8">
      <Link
        to="/online-services"
        className="back-link focus-ring"
      >
        {lang === "hi"
          ? "← सभी वाहन संबंधित सेवाएं"
          : "← All vehicle related services"}
      </Link>

      <div className="mt-7 flex items-start gap-4">
        <ServiceMark
          service={service}
          large
        />

        <div>
          <p className="eyebrow">
            {eyebrow}
          </p>

          <h2 className="mt-1 text-3xl font-bold tracking-tight text-navy-950">
            {service.title}
          </h2>

          <p className="mt-2 max-w-2xl text-slate-600">
            {service.description}
          </p>
        </div>
      </div>
    </section>
  );
}

function TaskForm({
  title,
  description,
  fields,
  button,
  result,
}) {
  const [complete, setComplete] = useState(false);

  return (
    <div className="surface-card p-5 sm:p-7">
      <h3 className="text-xl font-semibold text-navy-950">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        {description}
      </p>

      <form
        className="mt-7 grid gap-5"
        onSubmit={(event) => {
          event.preventDefault();
          setComplete(true);
        }}
      >
        {fields.map((field) => (
          <label
            key={field.label}
            className="grid gap-1.5 text-sm font-medium text-navy-950"
          >
            {field.label}

            {field.type === "select" ? (
              <select
                className="form-input"
                required={field.required}
                defaultValue=""
              >
                <option
                  value=""
                  disabled
                >
                  {field.options[0]}
                </option>

                {field.options
                  .slice(1)
                  .map((option) => (
                    <option key={option}>
                      {option}
                    </option>
                  ))}
              </select>
            ) : (
              <input
                className="form-input"
                type={field.type || "text"}
                placeholder={field.placeholder}
                required={field.required}
              />
            )}
          </label>
        ))}

        <button
          className="button-primary inline-flex w-full sm:w-fit focus-ring"
          type="submit"
        >
          {button}
        </button>
      </form>

      {complete && (
        <div
          className="mt-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm leading-relaxed text-green-800"
          role="status"
        >
          {result}
        </div>
      )}
    </div>
  );
}

function NationalPermitAuthorization({
  service,
  lang,
}) {
  const [query, setQuery] = useState("");

  const copy = NATIONAL_PERMIT_COPY[lang];

  const visibleStates = useMemo(
    () =>
      NATIONAL_PERMIT_STATES.filter(
        ({ state }) =>
          state
            .toLowerCase()
            .includes(query.toLowerCase())
      ),
    [query]
  );

  const leadingStates = useMemo(
    () =>
      [...NATIONAL_PERMIT_STATES]
        .sort((a, b) => b.permits - a.permits)
        .slice(0, 4),
    []
  );

  return (
    <div className="online-page pb-14">
      <ServiceHeading
        service={service}
        eyebrow={copy.eyebrow}
        lang={lang}
      />

      <section className="max-w-6xl mx-auto px-4">
        <div className="national-summary">
          <div>
            <p className="text-sm font-semibold text-blue-100">
              {copy.issuedAuthorizations}
            </p>

            <h3 className="mt-2 text-2xl font-semibold">
              {copy.summaryTitle}
            </h3>

            <p className="mt-2 text-sm text-blue-100">
              {copy.reportingPeriod}:{" "}
              {NATIONAL_PERMIT_PERIOD}
            </p>
          </div>

          <div className="national-summary-note">
            {copy.allIndia}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 mt-5">
          <StatCard
            label={copy.totalPermitCount}
            value={formatNumber(
              NATIONAL_PERMIT_TOTALS.permits
            )}
            detail={copy.permitCountDetail}
          />

          <StatCard
            label={copy.totalPermitAmount}
            value={formatRupees(
              NATIONAL_PERMIT_TOTALS.amount
            )}
            detail={copy.permitAmountDetail}
          />
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {leadingStates.map((item) => (
            <div
              className="surface-card p-5"
              key={item.state}
            >
              <p className="text-xs font-bold tracking-wide text-slate-500">
                {item.state}
              </p>

              <p className="mt-3 text-2xl font-semibold text-navy-950">
                {formatNumber(item.permits)}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {formatRupees(item.amount)}
              </p>
            </div>
          ))}
        </div>

        <section className="surface-card mt-8 overflow-hidden">
          <div className="flex flex-col gap-4 border-b border-slate-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <div>
              <p className="eyebrow">
                {copy.statewiseReport}
              </p>

              <h3 className="mt-1 text-xl font-semibold text-navy-950">
                {copy.issuedAuthorizations}
              </h3>
            </div>

            <label
              className="state-search"
              aria-label={copy.searchLabel}
            >
              <span aria-hidden="true">
                ⌕
              </span>

              <input
                value={query}
                onChange={(event) =>
                  setQuery(event.target.value)
                }
                placeholder={copy.searchLabel}
              />
            </label>
          </div>

          <div className="overflow-x-auto">
            <table className="national-table">
              <thead>
                <tr>
                  <th>{copy.stateUt}</th>
                  <th>{copy.permitCount}</th>
                  <th>{copy.permitAmount}</th>
                </tr>
              </thead>

              <tbody>
                {visibleStates.map((item) => (
                  <tr key={item.state}>
                    <td>{item.state}</td>
                    <td>
                      {formatNumber(item.permits)}
                    </td>
                    <td>
                      {formatRupees(item.amount)}
                    </td>
                  </tr>
                ))}

                {!visibleStates.length && (
                  <tr>
                    <td
                      colSpan="3"
                      className="text-center text-slate-500"
                    >
                      {copy.noMatches}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-8">
          <p className="eyebrow">
            {copy.paymentStatus}
          </p>

          <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {copy.actions.map(([title, detail]) => (
              <div
                className="surface-card p-5"
                key={title}
              >
                <span
                  className="online-action-icon"
                  aria-hidden="true"
                >
                  →
                </span>

                <h3 className="mt-4 font-semibold text-navy-950">
                  {title}
                </h3>

                <p className="mt-1 text-sm leading-relaxed text-slate-500">
                  {detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        <p className="mt-8 text-xs text-slate-500">
          {copy.notice}
        </p>
      </section>
    </div>
  );
}


/* =========================================================
   CREATIVE SERVICE ICONS
   ========================================================= */

function ServiceMark({ service, large = false }) {
  const iconMap = {
    echallan: BadgeIndianRupee,
    pucc: Leaf,
    "permit-related-services": FileCheck2,
    "vehicle-fitness-testing": CarFront,
    "checkpost-tax": ReceiptIndianRupee,
    "national-permit-authorization": Globe2,
    "vehicle-scrapping": Recycle,
    "fancy-number": Ticket,
  };

  const iconStyleMap = {
    echallan:
      "bg-orange-50 text-orange-600",
    pucc:
      "bg-emerald-50 text-emerald-600",
    "permit-related-services":
      "bg-indigo-50 text-indigo-600",
    "vehicle-fitness-testing":
      "bg-cyan-50 text-cyan-600",
    "checkpost-tax":
      "bg-amber-50 text-amber-600",
    "national-permit-authorization":
      "bg-blue-50 text-blue-600",
    "vehicle-scrapping":
      "bg-rose-50 text-rose-600",
    "fancy-number":
      "bg-violet-50 text-violet-600",
  };

  const Icon =
    iconMap[service.slug] || FileCheck2;

  const iconStyle =
    iconStyleMap[service.slug] ||
    "bg-slate-50 text-slate-600";

  return (
    <div
      className={`
        flex items-center justify-center
        rounded-2xl
        ${large ? "w-16 h-16" : "w-12 h-12"}
        ${iconStyle}
        transition-all duration-300
        ${
          large
            ? ""
            : "group-hover:scale-110 group-hover:shadow-md"
        }
      `}
      aria-hidden="true"
    >
      <Icon
        size={large ? 32 : 25}
        strokeWidth={1.8}
      />
    </div>
  );
}

function StatCard({
  label,
  value,
  detail,
}) {
  return (
    <div className="surface-card p-6 sm:p-7">
      <p className="eyebrow">
        {label}
      </p>

      <p className="mt-2 text-3xl font-bold tracking-tight text-navy-950">
        {value}
      </p>

      <p className="mt-2 text-sm text-slate-500">
        {detail}
      </p>
    </div>
  );
}