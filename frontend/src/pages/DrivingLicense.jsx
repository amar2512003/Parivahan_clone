import { useEffect, useMemo, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useTranslation } from "react-i18next";

import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

import {
  DRIVING_LICENCE_SERVICES,
  SERVICE_BY_SLUG,
  SERVICE_REGIONS,
} from "../data/drivingLicence";

/* =========================================================
   LANGUAGE COPY
========================================================= */

const COPY = {
  en: {
    stateSelection: {
      eyebrow: "Driving licence services",
      title: "Start with your state",
      description:
        "Select the state or service region where you want to use the driving licence portal. You’ll see every demo service available for that region next.",
      step: "Step 1 of 2",
      choose: "Choose your state / service region",
      options: "29 options are available in this demonstration.",
      search: "Search a state",
      searchLabel: "Search states",
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
  },

  hi: {
    stateSelection: {
      eyebrow: "ड्राइविंग लाइसेंस सेवाएं",
      title: "अपने राज्य से शुरू करें",
      description:
        "ड्राइविंग लाइसेंस पोर्टल का उपयोग करने के लिए अपना राज्य या सेवा क्षेत्र चुनें। इसके बाद आपको उस क्षेत्र के लिए उपलब्ध सभी डेमो सेवाएं दिखाई देंगी।",
      step: "चरण 1 में से 2",
      choose: "अपना राज्य / सेवा क्षेत्र चुनें",
      options: "इस डेमो में 29 विकल्प उपलब्ध हैं।",
      search: "राज्य खोजें",
      searchLabel: "राज्य खोजें",
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
  },
};

/* =========================================================
   SERVICE TRANSLATIONS
========================================================= */

const SERVICE_TRANSLATIONS = {
  "dl-new": {
    en: {
      title: "Apply for a New Driving Licence",
    },
    hi: {
      title: "नए ड्राइविंग लाइसेंस के लिए आवेदन करें",
    },
  },

  "dl-renewal": {
    en: {
      title: "Driving Licence Renewal",
    },
    hi: {
      title: "ड्राइविंग लाइसेंस नवीनीकरण",
    },
  },

  "dl-duplicate": {
    en: {
      title: "Duplicate Driving Licence",
    },
    hi: {
      title: "डुप्लिकेट ड्राइविंग लाइसेंस",
    },
  },

  "dl-address-change": {
    en: {
      title: "Change Address on Driving Licence",
    },
    hi: {
      title: "ड्राइविंग लाइसेंस पर पता बदलें",
    },
  },

  "dl-status": {
    en: {
      title: "Check Driving Licence Status",
    },
    hi: {
      title: "ड्राइविंग लाइसेंस की स्थिति जांचें",
    },
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
};

function getStateName(state, lang) {
  if (!state) return "";

  if (lang === "hi") {
    return STATE_NAMES_HI[state.name] || state.name;
  }

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
    return (
      <ServicePage
        slug={slug}
        state={selectedState}
        lang={lang}
      />
    );
  }

  return selectedState ? (
    <ServicesDashboard state={selectedState} lang={lang} />
  ) : (
    <StateSelection lang={lang} />
  );
}

/* =========================================================
   STATE SELECTION
========================================================= */

function StateSelection({ lang }) {
  const navigate = useNavigate();
  const copy = COPY[lang].stateSelection;

  const [query, setQuery] = useState("");

  const filteredRegions = SERVICE_REGIONS.filter((state) => {
    const englishName = state.name.toLowerCase();

    const hindiName = (
      STATE_NAMES_HI[state.name] || ""
    ).toLowerCase();

    const search = query.toLowerCase();

    return (
      englishName.includes(search) ||
      hindiName.includes(search)
    );
  });

  function chooseState(state) {
    localStorage.setItem("dlSelectedState", state.code);

    navigate(`/driving-license?state=${state.code}`);
  }

  return (
    <div className="dl-page">
      {/* HERO */}

      <section className="dl-hero">
        <div className="max-w-6xl mx-auto px-4 py-10 sm:py-14">
          <p className="eyebrow eyebrow-light">
            {copy.eyebrow}
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight max-w-2xl">
            {copy.title}
          </h2>

          <p className="mt-3 text-blue-100 max-w-xl leading-relaxed">
            {copy.description}
          </p>
        </div>
      </section>

      {/* STATE PANEL */}

      <section className="max-w-6xl mx-auto px-4 -mt-5 pb-14">
        <div className="surface-card state-panel">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-7">
            <div>
              <p className="eyebrow">
                {copy.step}
              </p>

              <h3 className="text-2xl font-semibold text-navy-950 mt-1">
                {copy.choose}
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                {copy.options}
              </p>
            </div>

            <label className="state-search">
              <span className="sr-only">
                {copy.searchLabel}
              </span>

              <span aria-hidden="true">⌕</span>

              <input
                value={query}
                onChange={(event) =>
                  setQuery(event.target.value)
                }
                placeholder={copy.search}
              />
            </label>
          </div>

          <div className="state-grid" role="list">
            {filteredRegions.map((state) => (
              <button
                key={state.code}
                className="state-option focus-ring"
                onClick={() => chooseState(state)}
              >
                <span className="state-code">
                  {state.code}
                </span>

                <span>
                  {getStateName(state, lang)}
                </span>

                <span
                  className="state-arrow"
                  aria-hidden="true"
                >
                  →
                </span>
              </button>
            ))}
          </div>

          {filteredRegions.length === 0 && (
            <p className="text-center text-sm text-slate-500 py-10">
              {copy.noMatch} “{query}”.
            </p>
          )}
        </div>
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
            <p className="eyebrow eyebrow-light">
              {copy.eyebrow}
            </p>

            <h2 className="text-3xl font-bold tracking-tight">
              {copy.title}
            </h2>

            <p className="text-blue-100 mt-2">
              {copy.description}
            </p>
          </div>

          <button
            className="state-chip state-chip-button focus-ring"
            onClick={() =>
              navigate("/driving-license")
            }
          >
            <span className="state-code">
              {state.code}
            </span>

            <span>
              {getStateName(state, lang)}
            </span>

            <span className="text-blue-200">
              {copy.change}
            </span>
          </button>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-10 sm:py-12">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between mb-7">
          <div>
            <p className="eyebrow">
              {copy.step}
            </p>

            <h3 className="text-2xl font-semibold text-navy-950 mt-1">
              {copy.question}
            </h3>
          </div>

          <p className="text-sm text-slate-500">
            {copy.sample}
          </p>
        </div>

        <div className="service-grid">
          {DRIVING_LICENCE_SERVICES.map((service) => (
            <button
              key={service.slug}
              className="service-card focus-ring"
              onClick={() =>
                navigate(
                  `/driving-license/${service.slug}?state=${state.code}`
                )
              }
            >
              <span
                className={`service-icon tone-${service.tone}`}
              >
                {service.icon}
              </span>

              <span className="service-title">
                {getServiceTitle(service, lang)}
              </span>

              <span className="service-link">
                {copy.open}{" "}
                <span aria-hidden="true">→</span>
              </span>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}

/* =========================================================
   SERVICE PAGE
========================================================= */

function ServicePage({ slug, state, lang }) {
  const service = SERVICE_BY_SLUG[slug] || {
    slug,
    title: slug
      .replaceAll("-", " ")
      .replace(/\b\w/g, (character) =>
        character.toUpperCase()
      ),
    icon: "DL",
    tone: "blue",
  };

  const localizedService = {
    ...service,
    title: getServiceTitle(service, lang),
  };

  if (slug === "dl-status") {
    return (
      <LicenceLookup
        service={localizedService}
        state={state}
        lang={lang}
      />
    );
  }

  return (
    <ApplicationView
      service={localizedService}
      state={state}
      lang={lang}
    />
  );
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
          state
            ? `/driving-license?state=${state.code}`
            : "/driving-license"
        }
        className="back-link focus-ring"
      >
        {copy.back}
      </Link>

      <div className="flex gap-4 items-start mt-6">
        <span
          className={`service-icon service-icon-large tone-${service.tone}`}
        >
          {service.icon}
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
   APPLICATION VIEW
========================================================= */

function ApplicationView({
  service,
  state,
  lang,
}) {
  const { user } = useAuth();
  const location = useLocation();

  const copy = COPY[lang].common;

  const [myLicense, setMyLicense] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [applicationId, setApplicationId] =
    useState(null);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    api
      .get("/dl/mine")
      .then((response) =>
        setMyLicense(response.data.license)
      )
      .catch(() => setMyLicense(null));
  }, [user]);

  async function handleApply() {
    setError("");
    setLoading(true);

    try {
      const response = await api.post(
        `/dl/apply/${service.slug}`,
        {
          serviceName: `${service.title}${
            state
              ? ` — ${getStateName(state, lang)}`
              : ""
          }`,
        }
      );

      setApplicationId(
        response.data.applicationId
      );

      setSubmitted(true);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          copy.error
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 sm:py-14">
      <PageHeading
        service={service}
        state={state}
        lang={lang}
      />

      <div className="surface-card mt-8 p-6 sm:p-8">
        {submitted ? (
          <div className="success-state">
            <span
              className="success-mark"
              aria-hidden="true"
            >
              ✓
            </span>

            <div>
              <p className="text-lg font-semibold text-navy-950">
                {copy.submitted}
              </p>

              <p className="text-sm text-slate-600 mt-1">
                Reference #{applicationId}.{" "}
                {copy.reference}
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
            <span
              className="login-prompt-icon"
              aria-hidden="true"
            >
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
                state={{
                  from: `${location.pathname}${location.search}`,
                }}
                className="button-primary inline-flex mt-5 focus-ring"
              >
                {copy.login}
              </Link>

              <p className="text-xs text-slate-500 mt-3">
                {copy.username}:{" "}
                <strong>demo</strong> ·{" "}
                {copy.password}:{" "}
                <strong>demo1234</strong>
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 flex gap-3">
              <span
                className="text-lg"
                aria-hidden="true"
              >
                ℹ
              </span>

              <p className="text-sm text-slate-600 leading-relaxed">
                <strong className="text-navy-950">
                  {user.full_name}
                </strong>{" "}
                — {copy.signedIn}
              </p>
            </div>

            {myLicense && (
              <div className="mt-6">
                <h3 className="font-semibold text-navy-950 mb-3">
                  {copy.sampleLicence}
                </h3>

                <LicenseTable
                  license={myLicense}
                  lang={lang}
                />
              </div>
            )}

            <div className="mt-6 border-t border-slate-100 pt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-500">
                {copy.localDemo}
              </p>

              <button
                onClick={handleApply}
                disabled={loading}
                className="button-primary focus-ring disabled:opacity-60"
              >
                {loading
                  ? copy.submitting
                  : copy.submit}
              </button>
            </div>

            {error && (
              <p className="text-sm text-red-600 mt-4">
                {error}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   LICENCE LOOKUP
========================================================= */

function LicenceLookup({
  service,
  state,
  lang,
}) {
  const copy = COPY[lang].common;

  const [dlNumber, setDlNumber] =
    useState("");

  const [result, setResult] =
    useState(null);

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleSearch(event) {
    event.preventDefault();

    setError("");
    setResult(null);
    setLoading(true);

    try {
      const response = await api.post(
        "/dl/lookup",
        {
          dl_number: dlNumber,
        }
      );

      setResult(response.data.license);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          copy.noRecord
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 sm:py-14">
      <PageHeading
        service={service}
        state={state}
        lang={lang}
      />

      <div className="surface-card mt-8 p-6 sm:p-8">
        <p className="text-sm text-slate-600 mb-5">
          {copy.licenceDescription}
        </p>

        <form
          onSubmit={handleSearch}
          className="flex flex-col sm:flex-row gap-3"
        >
          <input
            value={dlNumber}
            onChange={(event) =>
              setDlNumber(event.target.value)
            }
            placeholder="e.g. WB0620230012345"
            className="form-input flex-1"
            required
          />

          <button
            type="submit"
            className="button-primary focus-ring"
            disabled={loading}
          >
            {loading
              ? copy.searching
              : copy.searchDetails}
          </button>
        </form>

        <p className="text-xs text-slate-500 mt-3">
          {copy.demoDl}{" "}
          <strong>
            WB0620230012345
          </strong>
        </p>

        {error && (
          <p className="text-sm text-red-600 mt-5">
            {error}
          </p>
        )}

        {result && (
          <div className="mt-7">
            <LicenseTable
              license={result}
              lang={lang}
            />
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================
   LICENCE TABLE
========================================================= */

function LicenseTable({
  license,
  lang,
}) {
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