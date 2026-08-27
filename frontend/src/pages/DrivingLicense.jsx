import { useEffect, useMemo, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  GraduationCap,
  IdCard,
  RefreshCw,
  Copy,
  MapPin,
  Globe2,
  FileDown,
  IndianRupee,
  Printer,
  Smartphone,
  Undo2,
  FileEdit,
  FileText,
  CalendarClock,
  FileClock,
  PlayCircle,
  Layers,
  Bike,
  Car,
  Truck,
  Check,
  Lock,
} from "lucide-react";

import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

import {
  DRIVING_LICENCE_SERVICES,
  SERVICE_BY_SLUG,
  SERVICE_REGIONS,
} from "../data/drivingLicence";
import IndiaMapStateSearch from "../components/IndiaMapStateSearch";

/* =========================================================
   ICONS
========================================================= */

const SERVICE_ICON_MAP = {
  LL: GraduationCap,
  DL: IdCard,
  RN: RefreshCw,
  CP: Copy,
  AD: MapPin,
  ID: Globe2,
  EX: FileDown,
  "₹": IndianRupee,
  PR: Printer,
  MB: Smartphone,
  WD: Undo2,
  RP: FileEdit,
  AP: CalendarClock,
  PA: FileClock,
  TT: PlayCircle,
  VC: Layers,
};

function ServiceIcon({ code, size = 22 }) {
  const Icon = SERVICE_ICON_MAP[code] || FileText;
  return <Icon size={size} strokeWidth={2} />;
}

/* =========================================================
   LANGUAGE COPY
========================================================= */

const COPY = {
  en: {
    stateSelection: {
      eyebrow: "Driving licence services",
      search: "Search a state",
      noMatch: "No state matches",
    },

    dashboard: {
      eyebrow: "Sarathi-inspired demo portal",
      title: "Driving Licence Services",
      description: "Choose a service to continue your application.",
      change: "Change",
      step: "Step 2 of 2",
      question: "What would you like to do?",
      sample: "All services use sample data only.",
      open: "Open service",
    },

    common: {
      demoPortal: "demo portal",
      demoPortalOnly: "Demo portal",
      back: "← All driving licence services",
      backServices: "Back to services",
      submitted: "Demo application submitted",
      reference:
        "No real application, payment, or document has been created.",
      signIn: "Sign in to continue",
      signInDescription:
        "This service is interactive in demo mode. Sign in with the supplied sample account to submit it.",
      login: "Login with demo account",
      username: "Username",
      password: "Password",
      signedIn:
        "Review the sample details and submit a dummy request.",
      sampleLicence: "Your sample driving licence",
      localDemo: "This only records a local demo application.",
      submitting: "Submitting…",
      submit: "Submit demo application",
      searchDetails: "Search details",
      searching: "Searching…",
      licenceDescription:
        "Enter a licence number to view the available sample record.",
      demoDl: "Try the demo DL number:",
      noRecord: "No sample record was found.",
      error:
        "We couldn’t submit the demo application. Please try again.",
    },

    table: {
      holder: "Holder name",
      number: "Driving licence no.",
      valid: "Valid till",
      classes: "Vehicle classes",
      status: "Status",
    },

    appointment: {
      description:
        "Pick the exam you need to attend, then choose a date and time slot at your RTO or online.",
      examLabel: "What are you booking a slot for?",
      llExam: "Learner's Licence — computer test",
      dlExam: "Permanent Licence — practical track test",
      dateLabel: "Choose a date",
      timeLabel: "Choose a time slot",
      confirm: "Confirm appointment",
      confirming: "Booking…",
      booked: "Appointment booked",
      bookedDetail: "Slot reference #{ref}. Bring your original documents on the day.",
      slotsNote: "Slots shown are sample availability only.",
    },

    pending: {
      description:
        "Resume an application you started earlier. Enter your Application Number and date of birth exactly as used before.",
      appNumberLabel: "Application number",
      dobLabel: "Date of birth",
      resume: "Resume application",
      resuming: "Looking up…",
      notFound: "No pending application found for those details.",
      foundTitle: "Application found",
      foundDetail: "Picking up where you left off — {stage}.",
      stageOptions: [
        "document upload pending",
        "fee payment pending",
        "slot booking pending",
      ],
      demoHint: "Try the demo application number:",
    },

    tutorial: {
      description:
        "Before your contactless Aadhaar-based Learner's Licence exam, you must watch this full road-safety tutorial. Skipping ahead is disabled.",
      watching: "Playing tutorial…",
      progressLabel: "Tutorial progress",
      completed: "Tutorial completed",
      otpSent: "An OTP has been sent to your registered mobile number.",
      otpLabel: "Enter OTP to unlock your exam",
      unlock: "Unlock exam",
      unlocking: "Verifying…",
      unlocked: "Exam unlocked — you may now begin your Learner's Licence test.",
      demoOtp: "Demo OTP:",
      wrongOtp: "That OTP doesn't match. Try the demo OTP shown above.",
    },

    vehicleClass: {
      description:
        "A single driving licence can list several vehicle classes. Here's what each class permits you to drive.",
      classes: [
        {
          code: "MCWG",
          name: "Motor Cycle With Gear",
          detail: "Standard geared motorcycles and scooters.",
        },
        {
          code: "MCWOG",
          name: "Motor Cycle Without Gear",
          detail: "Mopeds and gearless scooters under 50cc.",
        },
        {
          code: "LMV",
          name: "Light Motor Vehicle",
          detail: "Personal cars, jeeps, and small delivery vans.",
        },
        {
          code: "HMV",
          name: "Heavy Motor Vehicle / Transport",
          detail: "Trucks, commercial buses, and trailers.",
        },
      ],
      onLicence: "On your sample licence:",
      none: "No vehicle classes on file for the sample licence.",
    },
  },

  hi: {
    stateSelection: {
      eyebrow: "ड्राइविंग लाइसेंस सेवाएं",
      search: "राज्य खोजें",
      noMatch: "इससे मेल खाता कोई राज्य नहीं मिला",
    },

    dashboard: {
      eyebrow: "सारथी-प्रेरित डेमो पोर्टल",
      title: "ड्राइविंग लाइसेंस सेवाएं",
      description: "अपना आवेदन जारी रखने के लिए एक सेवा चुनें।",
      change: "बदलें",
      step: "चरण 2 में से 2",
      question: "आप क्या करना चाहते हैं?",
      sample: "सभी सेवाएं केवल नमूना डेटा का उपयोग करती हैं।",
      open: "सेवा खोलें",
    },

    common: {
      demoPortal: "डेमो पोर्टल",
      demoPortalOnly: "डेमो पोर्टल",
      back: "← सभी ड्राइविंग लाइसेंस सेवाएं",
      backServices: "सेवाओं पर वापस जाएं",
      submitted: "डेमो आवेदन जमा हो गया",
      reference:
        "कोई वास्तविक आवेदन, भुगतान या दस्तावेज़ बनाया नहीं गया है।",
      signIn: "जारी रखने के लिए साइन इन करें",
      signInDescription:
        "यह सेवा डेमो मोड में इंटरैक्टिव है। इसे जमा करने के लिए दिए गए नमूना खाते से साइन इन करें।",
      login: "डेमो खाते से लॉगिन करें",
      username: "उपयोगकर्ता नाम",
      password: "पासवर्ड",
      signedIn:
        "नमूना विवरण की समीक्षा करें और डमी अनुरोध जमा करें।",
      sampleLicence: "आपका नमूना ड्राइविंग लाइसेंस",
      localDemo: "यह केवल स्थानीय डेमो आवेदन दर्ज करता है।",
      submitting: "जमा किया जा रहा है…",
      submit: "डेमो आवेदन जमा करें",
      searchDetails: "विवरण खोजें",
      searching: "खोजा जा रहा है…",
      licenceDescription:
        "उपलब्ध नमूना रिकॉर्ड देखने के लिए लाइसेंस नंबर दर्ज करें।",
      demoDl: "डेमो DL नंबर आज़माएं:",
      noRecord: "कोई नमूना रिकॉर्ड नहीं मिला।",
      error:
        "डेमो आवेदन जमा नहीं हो सका। कृपया फिर से प्रयास करें।",
    },

    table: {
      holder: "धारक का नाम",
      number: "ड्राइविंग लाइसेंस नंबर",
      valid: "वैधता",
      classes: "वाहन श्रेणियां",
      status: "स्थिति",
    },

    appointment: {
      description:
        "जिस परीक्षा के लिए स्लॉट चाहिए उसे चुनें, फिर अपने RTO या ऑनलाइन के लिए तारीख और समय चुनें।",
      examLabel: "आप किसके लिए स्लॉट बुक कर रहे हैं?",
      llExam: "लर्नर लाइसेंस — कंप्यूटर टेस्ट",
      dlExam: "स्थायी लाइसेंस — प्रैक्टिकल ट्रैक टेस्ट",
      dateLabel: "तारीख चुनें",
      timeLabel: "समय स्लॉट चुनें",
      confirm: "अपॉइंटमेंट कन्फर्म करें",
      confirming: "बुक हो रहा है…",
      booked: "अपॉइंटमेंट बुक हो गया",
      bookedDetail: "स्लॉट संदर्भ #{ref}। उस दिन अपने मूल दस्तावेज़ लाएं।",
      slotsNote: "दिखाए गए स्लॉट केवल नमूना उपलब्धता हैं।",
    },

    pending: {
      description:
        "पहले शुरू किए गए आवेदन को जारी रखें। अपना आवेदन नंबर और जन्मतिथि वैसे ही दर्ज करें जैसे पहले उपयोग की थी।",
      appNumberLabel: "आवेदन नंबर",
      dobLabel: "जन्मतिथि",
      resume: "आवेदन जारी रखें",
      resuming: "खोजा जा रहा है…",
      notFound: "उन विवरणों के लिए कोई लंबित आवेदन नहीं मिला।",
      foundTitle: "आवेदन मिल गया",
      foundDetail: "आप वहीं से जारी रखेंगे — {stage}।",
      stageOptions: [
        "दस्तावेज़ अपलोड लंबित",
        "शुल्क भुगतान लंबित",
        "स्लॉट बुकिंग लंबित",
      ],
      demoHint: "डेमो आवेदन नंबर आज़माएं:",
    },

    tutorial: {
      description:
        "अपनी संपर्क-रहित आधार-आधारित लर्नर लाइसेंस परीक्षा से पहले, आपको यह पूरा सड़क सुरक्षा ट्यूटोरियल देखना होगा। आगे स्किप करना बंद है।",
      watching: "ट्यूटोरियल चल रहा है…",
      progressLabel: "ट्यूटोरियल प्रगति",
      completed: "ट्यूटोरियल पूरा हुआ",
      otpSent: "आपके पंजीकृत मोबाइल नंबर पर एक OTP भेजा गया है।",
      otpLabel: "अपनी परीक्षा अनलॉक करने के लिए OTP दर्ज करें",
      unlock: "परीक्षा अनलॉक करें",
      unlocking: "सत्यापित हो रहा है…",
      unlocked: "परीक्षा अनलॉक हो गई — अब आप अपनी लर्नर लाइसेंस परीक्षा शुरू कर सकते हैं।",
      demoOtp: "डेमो OTP:",
      wrongOtp: "यह OTP मेल नहीं खाता। ऊपर दिखाया गया डेमो OTP आज़माएं।",
    },

    vehicleClass: {
      description:
        "एक ड्राइविंग लाइसेंस पर कई वाहन श्रेणियां सूचीबद्ध हो सकती हैं। यहां बताया गया है कि प्रत्येक श्रेणी आपको क्या चलाने की अनुमति देती है।",
      classes: [
        {
          code: "MCWG",
          name: "गियर वाली मोटरसाइकिल",
          detail: "मानक गियर वाली मोटरसाइकिल और स्कूटर।",
        },
        {
          code: "MCWOG",
          name: "बिना गियर की मोटरसाइकिल",
          detail: "50cc से कम के मोपेड और गियरलेस स्कूटर।",
        },
        {
          code: "LMV",
          name: "हल्का मोटर वाहन",
          detail: "निजी कारें, जीप और छोटे डिलीवरी वैन।",
        },
        {
          code: "HMV",
          name: "भारी मोटर वाहन / परिवहन",
          detail: "ट्रक, वाणिज्यिक बसें और ट्रेलर।",
        },
      ],
      onLicence: "आपके नमूना लाइसेंस पर:",
      none: "नमूना लाइसेंस के लिए कोई वाहन श्रेणी दर्ज नहीं है।",
    },
  },
};

/* =========================================================
   SERVICE TRANSLATIONS
   (keys must match the real slugs in ../data/drivingLicence.js)
========================================================= */

const SERVICE_TRANSLATIONS = {
  "learners-license": {
    en: { title: "Apply for Learner Licence" },
    hi: { title: "लर्नर लाइसेंस के लिए आवेदन करें" },
  },

  "new-driving-license": {
    en: { title: "Apply for Driving Licence" },
    hi: { title: "ड्राइविंग लाइसेंस के लिए आवेदन करें" },
  },

  "dl-renewal": {
    en: { title: "Renew Driving Licence" },
    hi: { title: "ड्राइविंग लाइसेंस नवीनीकरण" },
  },

  "duplicate-license": {
    en: { title: "Get Duplicate DL" },
    hi: { title: "डुप्लिकेट ड्राइविंग लाइसेंस प्राप्त करें" },
  },

  "change-address": {
    en: { title: "Change Address" },
    hi: { title: "पता बदलें" },
  },

  "international-permit": {
    en: { title: "International Driving Permit" },
    hi: { title: "अंतरराष्ट्रीय ड्राइविंग परमिट" },
  },

  "dl-extract": {
    en: { title: "Download DL Extract" },
    hi: { title: "डीएल एक्सट्रेक्ट डाउनलोड करें" },
  },

  "fee-payment": {
    en: { title: "Fee Payments" },
    hi: { title: "शुल्क भुगतान" },
  },

  "print-application": {
    en: { title: "Print Application Form" },
    hi: { title: "आवेदन पत्र प्रिंट करें" },
  },

  "mobile-update": {
    en: { title: "Update Mobile Number" },
    hi: { title: "मोबाइल नंबर अपडेट करें" },
  },

  "withdraw-application": {
    en: { title: "Withdraw Application" },
    hi: { title: "आवेदन वापस लें" },
  },

  "dl-replacement": {
    en: { title: "Replace DL / Other Document" },
    hi: { title: "डीएल / अन्य दस्तावेज़ बदलें" },
  },

  "addition-of-class": {
    en: { title: "Add Vehicle Class" },
    hi: { title: "वाहन श्रेणी जोड़ें" },
  },

  appointment: {
    en: { title: "Book an Appointment" },
    hi: { title: "अपॉइंटमेंट बुक करें" },
  },

  "learner-test-tutorial": {
    en: { title: "Learner Test Tutorial" },
    hi: { title: "लर्नर टेस्ट ट्यूटोरियल" },
  },

  "pending-application": {
    en: { title: "Complete Pending Application" },
    hi: { title: "लंबित आवेदन पूरा करें" },
  },

  "payment-status": {
    en: { title: "Check Payment Status" },
    hi: { title: "भुगतान स्थिति जांचें" },
  },

  "upload-document": {
    en: { title: "Upload Document" },
    hi: { title: "दस्तावेज़ अपलोड करें" },
  },

  "online-lltest": {
    en: { title: "Online Learner Test" },
    hi: { title: "ऑनलाइन लर्नर टेस्ट" },
  },

  "find-doctor": {
    en: { title: "Find a Doctor" },
    hi: { title: "डॉक्टर खोजें" },
  },

  "dl-status": {
    en: { title: "Know Your Licence Details" },
    hi: { title: "अपने लाइसेंस का विवरण जानें" },
  },
};

/* =========================================================
   STATE TRANSLATIONS
========================================================= */

const STATE_NAMES_HI = {
  "Andhra Pradesh": "आंध्र प्रदेश",
  "Arunachal Pradesh": "अरुणाचल प्रदेश",
  Assam: "असम",
  Bihar: "बिहार",
  Chhattisgarh: "छत्तीसगढ़",
  Goa: "गोवा",
  Gujarat: "गुजरात",
  Haryana: "हरियाणा",
  "Himachal Pradesh": "हिमाचल प्रदेश",
  Jharkhand: "झारखंड",
  Karnataka: "कर्नाटक",
  Kerala: "केरल",
  "Madhya Pradesh": "मध्य प्रदेश",
  Maharashtra: "महाराष्ट्र",
  Manipur: "मणिपुर",
  Meghalaya: "मेघालय",
  Mizoram: "मिजोरम",
  Nagaland: "नागालैंड",
  Odisha: "ओडिशा",
  Punjab: "पंजाब",
  Rajasthan: "राजस्थान",
  Sikkim: "सिक्किम",
  "Tamil Nadu": "तमिलनाडु",
  Telangana: "तेलंगाना",
  Tripura: "त्रिपुरा",
  "Uttar Pradesh": "उत्तर प्रदेश",
  Uttarakhand: "उत्तराखंड",
  "West Bengal": "पश्चिम बंगाल",
  Delhi: "दिल्ली",
  "Jammu & Kashmir": "जम्मू और कश्मीर",
};

function getStateName(state, lang) {
  if (!state) return "";
  if (lang === "hi") return STATE_NAMES_HI[state.name] || state.name;
  return state.name;
}

function getServiceTitle(service, lang) {
  if (!service) return "";

  const translation = SERVICE_TRANSLATIONS[service.slug];

  if (translation?.[lang]?.title) {
    return translation[lang].title;
  }

  if (typeof service.title === "object") {
    return service.title[lang] || service.title.en;
  }

  return service.title;
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function DrivingLicense() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const { i18n } = useTranslation();
  const lang = i18n.language === "hi" ? "hi" : "en";

  const selectedState = useMemo(
    () =>
      SERVICE_REGIONS.find(
        (state) => state.code === searchParams.get("state")
      ),
    [searchParams]
  );

  if (slug) {
    return <ServicePage slug={slug} state={selectedState} lang={lang} />;
  }

  return selectedState ? (
    <ServicesDashboard state={selectedState} lang={lang} />
  ) : (
    <StateSelection lang={lang} />
  );
}

/* =========================================================
   STATE SELECTION — India map + search
========================================================= */

function StateSelection({ lang }) {
  const navigate = useNavigate();
  const copy = COPY[lang].stateSelection;

  // Give the map/search component region names in the active language,
  // while still returning the original region object (with `code`) on select.
  const localizedRegions = useMemo(
    () =>
      SERVICE_REGIONS.map((state) => ({
        ...state,
        name: getStateName(state, lang),
      })),
    [lang]
  );

  function chooseState(state) {
    // `state` comes back from IndiaMapStateSearch — resolve to the
    // canonical (English) region object by code, since the localized
    // copy only had its `name` field swapped for display.
    const resolved =
      SERVICE_REGIONS.find((region) => region.code === state.code) || state;

    localStorage.setItem("dlSelectedState", resolved.code);
    navigate(`/driving-license?state=${resolved.code}`);
  }

  return (
    <div className="dl-page">
      <section className="max-w-2xl mx-auto px-4 py-10 sm:py-16">
        <IndiaMapStateSearch
          key={lang}
          regions={localizedRegions}
          onSelectState={chooseState}
          eyebrow={copy.eyebrow}
          placeholder={copy.search}
          noMatchLabel={copy.noMatch}
        />
      </section>
    </div>
  );
}

/* =========================================================
   SERVICES DASHBOARD
========================================================= */

function ServicesDashboard({ state, lang }) {
  const navigate = useNavigate();
  const copy = COPY[lang].dashboard;

  return (
    <div className="dl-page">
      <section className="dl-hero dl-hero-compact">
        <div className="max-w-6xl mx-auto px-4 py-8 sm:py-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="eyebrow eyebrow-light">{copy.eyebrow}</p>
            <h2 className="text-3xl font-bold tracking-tight">{copy.title}</h2>
            <p className="text-blue-100 mt-2">{copy.description}</p>
          </div>

          <button
            className="state-chip state-chip-button focus-ring"
            onClick={() => navigate("/driving-license")}
          >
            <span className="state-code">{state.code}</span>
            <span>{getStateName(state, lang)}</span>
            <span className="text-blue-200">{copy.change}</span>
          </button>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-10 sm:py-12">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between mb-7">
          <div>
            <p className="eyebrow">{copy.step}</p>
            <h3 className="text-2xl font-semibold text-navy-950 mt-1">
              {copy.question}
            </h3>
          </div>
          <p className="text-sm text-slate-500">{copy.sample}</p>
        </div>

        <div className="service-grid">
          {DRIVING_LICENCE_SERVICES.map((service) => (
            <button
              key={service.slug}
              className="service-card focus-ring"
              onClick={() =>
                navigate(`/driving-license/${service.slug}?state=${state.code}`)
              }
            >
              <span className={`service-icon tone-${service.tone}`}>
                <ServiceIcon code={service.icon} />
              </span>

              <span className="service-title">
                {getServiceTitle(service, lang)}
              </span>

              <span className="service-link">
                {copy.open} <span aria-hidden="true">→</span>
              </span>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}

/* =========================================================
   SERVICE PAGE (router)
========================================================= */

function ServicePage({ slug, state, lang }) {
  const service = SERVICE_BY_SLUG[slug] || {
    slug,
    title: slug
      .replaceAll("-", " ")
      .replace(/\b\w/g, (character) => character.toUpperCase()),
    icon: "DL",
    tone: "blue",
  };

  const localizedService = {
    ...service,
    title: getServiceTitle(service, lang),
  };

  switch (slug) {
    case "dl-status":
      return (
        <LicenceLookup service={localizedService} state={state} lang={lang} />
      );
    case "appointment":
      return (
        <AppointmentBooking
          service={localizedService}
          state={state}
          lang={lang}
        />
      );
    case "pending-application":
      return (
        <PendingApplication
          service={localizedService}
          state={state}
          lang={lang}
        />
      );
    case "learner-test-tutorial":
      return (
        <TestTutorial service={localizedService} state={state} lang={lang} />
      );
    case "addition-of-class":
      return (
        <VehicleClassInfo
          service={localizedService}
          state={state}
          lang={lang}
        />
      );
    default:
      return (
        <ApplicationView
          service={localizedService}
          state={state}
          lang={lang}
        />
      );
  }
}

/* =========================================================
   PAGE HEADING
========================================================= */

function PageHeading({ service, state, lang }) {
  const copy = COPY[lang].common;

  return (
    <>
      <Link
        to={
          state ? `/driving-license?state=${state.code}` : "/driving-license"
        }
        className="back-link focus-ring"
      >
        {copy.back}
      </Link>

      <div className="flex gap-4 items-start mt-6">
        <span
          className={`service-icon service-icon-large tone-${service.tone}`}
        >
          <ServiceIcon code={service.icon} size={28} />
        </span>

        <div>
          <p className="eyebrow">
            {state
              ? `${getStateName(state, lang)} · ${copy.demoPortal}`
              : copy.demoPortalOnly}
          </p>

          <h2 className="text-3xl font-bold text-navy-950 tracking-tight mt-1">
            {service.title}
          </h2>
        </div>
      </div>
    </>
  );
}

/* =========================================================
   APPLICATION VIEW (existing form-style services)
========================================================= */

function ApplicationView({ service, state, lang }) {
  const { user } = useAuth();
  const location = useLocation();
  const copy = COPY[lang].common;

  const [myLicense, setMyLicense] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    api
      .get("/dl/mine")
      .then((response) => setMyLicense(response.data.license))
      .catch(() => setMyLicense(null));
  }, [user]);

  async function handleApply() {
    setError("");
    setLoading(true);

    try {
      const response = await api.post(`/dl/apply/${service.slug}`, {
        serviceName: `${service.title}${
          state ? ` — ${getStateName(state, lang)}` : ""
        }`,
      });

      setApplicationId(response.data.applicationId);
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.error || copy.error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 sm:py-14">
      <PageHeading service={service} state={state} lang={lang} />

      <div className="surface-card mt-8 p-6 sm:p-8">
        {submitted ? (
          <div className="success-state">
            <span className="success-mark" aria-hidden="true">
              ✓
            </span>

            <div>
              <p className="text-lg font-semibold text-navy-950">
                {copy.submitted}
              </p>

              <p className="text-sm text-slate-600 mt-1">
                Reference #{applicationId}. {copy.reference}
              </p>

              <Link
                to={
                  state
                    ? `/driving-license?state=${state.code}`
                    : "/driving-license"
                }
                className="button-primary inline-flex mt-5 focus-ring"
              >
                {copy.backServices}
              </Link>
            </div>
          </div>
        ) : !user ? (
          <div className="login-prompt">
            <span className="login-prompt-icon" aria-hidden="true">
              ↗
            </span>

            <div>
              <h3 className="text-lg font-semibold text-navy-950">
                {copy.signIn}
              </h3>

              <p className="text-sm text-slate-600 mt-1">
                {copy.signInDescription}
              </p>

              <Link
                to="/login"
                state={{ from: `${location.pathname}${location.search}` }}
                className="button-primary inline-flex mt-5 focus-ring"
              >
                {copy.login}
              </Link>

              <p className="text-xs text-slate-500 mt-3">
                {copy.username}: <strong>demo</strong> · {copy.password}:{" "}
                <strong>demo1234</strong>
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 flex gap-3">
              <span className="text-lg" aria-hidden="true">
                ℹ
              </span>

              <p className="text-sm text-slate-600 leading-relaxed">
                <strong className="text-navy-950">{user.full_name}</strong> —{" "}
                {copy.signedIn}
              </p>
            </div>

            {myLicense && (
              <div className="mt-6">
                <h3 className="font-semibold text-navy-950 mb-3">
                  {copy.sampleLicence}
                </h3>
                <LicenseTable license={myLicense} lang={lang} />
              </div>
            )}

            <div className="mt-6 border-t border-slate-100 pt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-500">{copy.localDemo}</p>

              <button
                onClick={handleApply}
                disabled={loading}
                className="button-primary focus-ring disabled:opacity-60"
              >
                {loading ? copy.submitting : copy.submit}
              </button>
            </div>

            {error && <p className="text-sm text-red-600 mt-4">{error}</p>}
          </>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   LICENCE LOOKUP
========================================================= */

function LicenceLookup({ service, state, lang }) {
  const copy = COPY[lang].common;

  const [dlNumber, setDlNumber] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSearch(event) {
    event.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);

    try {
      const response = await api.post("/dl/lookup", { dl_number: dlNumber });
      setResult(response.data.license);
    } catch (err) {
      setError(err.response?.data?.error || copy.noRecord);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 sm:py-14">
      <PageHeading service={service} state={state} lang={lang} />

      <div className="surface-card mt-8 p-6 sm:p-8">
        <p className="text-sm text-slate-600 mb-5">{copy.licenceDescription}</p>

        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row gap-3"
        >
          <input
            value={dlNumber}
            onChange={(event) => setDlNumber(event.target.value)}
            placeholder="e.g. WB0620230012345"
            className="form-input flex-1"
            required
          />

          <button
            type="submit"
            className="button-primary focus-ring"
            disabled={loading}
          >
            {loading ? copy.searching : copy.searchDetails}
          </button>
        </form>

        <p className="text-xs text-slate-500 mt-3">
          {copy.demoDl} <strong>WB0620230012345</strong>
        </p>

        {error && <p className="text-sm text-red-600 mt-5">{error}</p>}

        {result && (
          <div className="mt-7">
            <LicenseTable license={result} lang={lang} />
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   1. BOOK AN APPOINTMENT
========================================================= */

function AppointmentBooking({ service, state, lang }) {
  const copy = COPY[lang].appointment;
  const common = COPY[lang].common;

  const [examType, setExamType] = useState("LL");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [booking, setBooking] = useState(false);
  const [booked, setBooked] = useState(null);

  const dates = useMemo(() => {
    const today = new Date();
    return Array.from({ length: 6 }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() + i + 1);
      return d;
    });
  }, []);

  const timeSlots = ["09:00 AM", "10:30 AM", "12:00 PM", "02:00 PM", "03:30 PM"];

  function formatDate(d) {
    return d.toLocaleDateString(lang === "hi" ? "hi-IN" : "en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  }

  async function handleConfirm() {
    setBooking(true);

    try {
      // Demo booking — wire to a real /dl/appointment endpoint when available
      await new Promise((resolve) => setTimeout(resolve, 700));
      const ref = Math.floor(100000 + Math.random() * 900000);
      setBooked(ref);
    } finally {
      setBooking(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 sm:py-14">
      <PageHeading service={service} state={state} lang={lang} />

      <div className="surface-card mt-8 p-6 sm:p-8">
        {booked ? (
          <div className="success-state">
            <span className="success-mark" aria-hidden="true">
              ✓
            </span>
            <div>
              <p className="text-lg font-semibold text-navy-950">
                {copy.booked}
              </p>
              <p className="text-sm text-slate-600 mt-1">
                {copy.bookedDetail.replace("{ref}", booked)}
              </p>
              <Link
                to={
                  state
                    ? `/driving-license?state=${state.code}`
                    : "/driving-license"
                }
                className="button-primary inline-flex mt-5 focus-ring"
              >
                {common.backServices}
              </Link>
            </div>
          </div>
        ) : (
          <>
            <p className="text-sm text-slate-600 mb-6">{copy.description}</p>

            <p className="text-sm font-semibold text-navy-950 mb-3">
              {copy.examLabel}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-7">
              {[
                { key: "LL", label: copy.llExam },
                { key: "DL", label: copy.dlExam },
              ].map((option) => (
                <button
                  key={option.key}
                  onClick={() => setExamType(option.key)}
                  className={`flex-1 text-left rounded-xl border p-4 focus-ring transition-colors ${
                    examType === option.key
                      ? "border-blue-600 bg-blue-50"
                      : "border-slate-200"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            <p className="text-sm font-semibold text-navy-950 mb-3">
              {copy.dateLabel}
            </p>

            <div className="flex flex-wrap gap-2 mb-7">
              {dates.map((d) => {
                const value = d.toISOString().slice(0, 10);
                const active = selectedDate === value;
                return (
                  <button
                    key={value}
                    onClick={() => setSelectedDate(value)}
                    className={`px-3 py-2 rounded-lg border text-sm focus-ring ${
                      active
                        ? "border-blue-600 bg-blue-50 text-blue-700"
                        : "border-slate-200 text-slate-600"
                    }`}
                  >
                    {formatDate(d)}
                  </button>
                );
              })}
            </div>

            {selectedDate && (
              <>
                <p className="text-sm font-semibold text-navy-950 mb-3">
                  {copy.timeLabel}
                </p>

                <div className="flex flex-wrap gap-2 mb-7">
                  {timeSlots.map((slot) => {
                    const active = selectedTime === slot;
                    return (
                      <button
                        key={slot}
                        onClick={() => setSelectedTime(slot)}
                        className={`px-3 py-2 rounded-lg border text-sm focus-ring ${
                          active
                            ? "border-blue-600 bg-blue-50 text-blue-700"
                            : "border-slate-200 text-slate-600"
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            <div className="border-t border-slate-100 pt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-slate-500">{copy.slotsNote}</p>

              <button
                onClick={handleConfirm}
                disabled={!selectedDate || !selectedTime || booking}
                className="button-primary focus-ring disabled:opacity-60"
              >
                {booking ? copy.confirming : copy.confirm}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   2. COMPLETE PENDING APPLICATION
========================================================= */

function PendingApplication({ service, state, lang }) {
  const copy = COPY[lang].pending;

  const [appNumber, setAppNumber] = useState("");
  const [dob, setDob] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const DEMO_APP_NUMBER = "DL/2026/WB/00184213";

  async function handleResume(event) {
    event.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);

    try {
      // Demo lookup — wire to a real /dl/pending endpoint when available
      await new Promise((resolve) => setTimeout(resolve, 600));

      if (appNumber.trim().toUpperCase() !== DEMO_APP_NUMBER) {
        setError(copy.notFound);
        return;
      }

      const stage =
        copy.stageOptions[
          Math.floor(Math.random() * copy.stageOptions.length)
        ];

      setResult({ stage });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 sm:py-14">
      <PageHeading service={service} state={state} lang={lang} />

      <div className="surface-card mt-8 p-6 sm:p-8">
        <p className="text-sm text-slate-600 mb-6">{copy.description}</p>

        <form onSubmit={handleResume} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-semibold text-navy-950 block mb-1.5">
              {copy.appNumberLabel}
            </label>
            <input
              value={appNumber}
              onChange={(event) => setAppNumber(event.target.value)}
              placeholder={DEMO_APP_NUMBER}
              className="form-input w-full"
              required
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-navy-950 block mb-1.5">
              {copy.dobLabel}
            </label>
            <input
              type="date"
              value={dob}
              onChange={(event) => setDob(event.target.value)}
              className="form-input w-full"
              required
            />
          </div>

          <p className="text-xs text-slate-500">
            {copy.demoHint} <strong>{DEMO_APP_NUMBER}</strong>
          </p>

          <button
            type="submit"
            disabled={loading}
            className="button-primary focus-ring disabled:opacity-60 self-start"
          >
            {loading ? copy.resuming : copy.resume}
          </button>
        </form>

        {error && <p className="text-sm text-red-600 mt-5">{error}</p>}

        {result && (
          <div className="mt-6 rounded-xl bg-emerald-50 border border-emerald-200 p-4 flex gap-3">
            <Check size={20} className="text-emerald-600 shrink-0" />
            <div>
              <p className="text-sm font-semibold text-navy-950">
                {copy.foundTitle}
              </p>
              <p className="text-sm text-slate-600 mt-1">
                {copy.foundDetail.replace("{stage}", result.stage)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   3. LEARNER TEST TUTORIAL
========================================================= */

function TestTutorial({ service, state, lang }) {
  const copy = COPY[lang].tutorial;

  const [progress, setProgress] = useState(0);
  const [videoDone, setVideoDone] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const DEMO_OTP = "482913";

  useEffect(() => {
    if (videoDone) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + 4, 100);
        if (next >= 100) {
          clearInterval(interval);
          setVideoDone(true);
        }
        return next;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [videoDone]);

  async function handleUnlock(event) {
    event.preventDefault();
    setOtpError("");
    setVerifying(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (otp.trim() !== DEMO_OTP) {
        setOtpError(copy.wrongOtp);
        return;
      }

      setUnlocked(true);
    } finally {
      setVerifying(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 sm:py-14">
      <PageHeading service={service} state={state} lang={lang} />

      <div className="surface-card mt-8 p-6 sm:p-8">
        <p className="text-sm text-slate-600 mb-6">{copy.description}</p>

        <div className="rounded-xl overflow-hidden border border-slate-200 bg-navy-950 aspect-video flex items-center justify-center relative">
          {!videoDone ? (
            <div className="flex flex-col items-center gap-3 text-white">
              <PlayCircle size={40} strokeWidth={1.5} />
              <p className="text-sm text-blue-100">{copy.watching}</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 text-white">
              <Check size={40} strokeWidth={1.5} />
              <p className="text-sm text-blue-100">{copy.completed}</p>
            </div>
          )}
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <span>{copy.progressLabel}</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {videoDone && !unlocked && (
          <div className="mt-7 border-t border-slate-100 pt-6">
            <div className="flex gap-3 rounded-xl bg-slate-50 border border-slate-200 p-4 mb-5">
              <Lock size={18} className="text-slate-500 shrink-0 mt-0.5" />
              <p className="text-sm text-slate-600">{copy.otpSent}</p>
            </div>

            <form
              onSubmit={handleUnlock}
              className="flex flex-col sm:flex-row gap-3"
            >
              <input
                value={otp}
                onChange={(event) => setOtp(event.target.value)}
                placeholder={copy.otpLabel}
                className="form-input flex-1"
                required
              />
              <button
                type="submit"
                disabled={verifying}
                className="button-primary focus-ring disabled:opacity-60"
              >
                {verifying ? copy.unlocking : copy.unlock}
              </button>
            </form>

            <p className="text-xs text-slate-500 mt-3">
              {copy.demoOtp} <strong>{DEMO_OTP}</strong>
            </p>

            {otpError && (
              <p className="text-sm text-red-600 mt-3">{otpError}</p>
            )}
          </div>
        )}

        {unlocked && (
          <div className="mt-7 rounded-xl bg-emerald-50 border border-emerald-200 p-4 flex gap-3">
            <Check size={20} className="text-emerald-600 shrink-0" />
            <p className="text-sm text-slate-700">{copy.unlocked}</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   4. VEHICLE CLASS INFO
========================================================= */

const VEHICLE_CLASS_ICON = {
  MCWG: Bike,
  MCWOG: Bike,
  LMV: Car,
  HMV: Truck,
};

function VehicleClassInfo({ service, state, lang }) {
  const copy = COPY[lang].vehicleClass;
  const { user } = useAuth();

  const [myLicense, setMyLicense] = useState(null);

  useEffect(() => {
    if (!user) return;

    api
      .get("/dl/mine")
      .then((response) => setMyLicense(response.data.license))
      .catch(() => setMyLicense(null));
  }, [user]);

  const licensedCodes = (myLicense?.vehicle_classes || "")
    .split(/[,/]/)
    .map((c) => c.trim().toUpperCase())
    .filter(Boolean);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 sm:py-14">
      <PageHeading service={service} state={state} lang={lang} />

      <div className="surface-card mt-8 p-6 sm:p-8">
        <p className="text-sm text-slate-600 mb-6">{copy.description}</p>

        <div className="grid sm:grid-cols-2 gap-4">
          {copy.classes.map((cls) => {
            const Icon = VEHICLE_CLASS_ICON[cls.code] || Car;
            const owned = licensedCodes.includes(cls.code);

            return (
              <div
                key={cls.code}
                className={`rounded-xl border p-4 flex gap-3 ${
                  owned
                    ? "border-blue-600 bg-blue-50"
                    : "border-slate-200"
                }`}
              >
                <span className="service-icon tone-blue shrink-0">
                  <Icon size={22} />
                </span>

                <div>
                  <p className="text-sm font-semibold text-navy-950">
                    {cls.code} — {cls.name}
                  </p>
                  <p className="text-sm text-slate-600 mt-1">{cls.detail}</p>
                  {owned && (
                    <p className="text-xs text-blue-700 font-medium mt-2">
                      ✓ {copy.onLicence}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {user && licensedCodes.length === 0 && (
          <p className="text-sm text-slate-500 mt-6">{copy.none}</p>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   LICENCE TABLE
========================================================= */

function LicenseTable({ license, lang }) {
  const copy = COPY[lang].table;

  const rows = [
    [copy.holder, license.holder_name],
    [copy.number, license.dl_number],
    [copy.valid, license.valid_till],
    [copy.classes, license.vehicle_classes],
    [copy.status, license.status],
  ];

  return (
    <dl className="detail-list">
      {rows.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}