import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Check } from "lucide-react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const SERVICE_LABELS = {
  "new-registration": { en: "New Vehicle Registration", hi: "नया वाहन पंजीकरण" },
  "rc-renewal": { en: "Renewal of Registration (RC)", hi: "पंजीकरण का नवीनीकरण" },
  "transfer-ownership": { en: "Transfer of Ownership", hi: "स्वामित्व का हस्तांतरण" },
  "change-address": { en: "Change of Address", hi: "पते में परिवर्तन" },
  "duplicate-rc": { en: "Duplicate RC", hi: "डुप्लीकेट आरसी" },
  "vehicle-status": { en: "Know Your Vehicle Details", hi: "अपने वाहन का विवरण जानें" },
};

const APPLY_COPY = {
  en: {
    signIn: "Sign in to continue",
    signInDescription:
      "This service is interactive in demo mode. Sign in with the supplied sample account to submit it.",
    login: "Login with demo account",
    username: "Username",
    password: "Password",
    signedIn: "Review the sample details and submit a dummy request.",
    sampleVehicle: "Your sample vehicle",
    noVehicle:
      "No sample vehicle found on this account — you can still submit a demo application.",
    regLabel: "Registration number",
    regPlaceholder: "e.g. WB06AB1234",
    localDemo: "This only records a local demo application.",
    submitting: "Submitting…",
    submit: "Submit demo application",
    submitted: "Demo application submitted",
    reference: "No real application, payment, or document has been created.",
    backServices: "Back to services",
    error: "We couldn't submit the demo application. Please try again.",
  },
  hi: {
    signIn: "जारी रखने के लिए साइन इन करें",
    signInDescription:
      "यह सेवा डेमो मोड में इंटरैक्टिव है। इसे जमा करने के लिए दिए गए नमूना खाते से साइन इन करें।",
    login: "डेमो खाते से लॉगिन करें",
    username: "उपयोगकर्ता नाम",
    password: "पासवर्ड",
    signedIn: "नमूना विवरण की समीक्षा करें और डमी अनुरोध जमा करें।",
    sampleVehicle: "आपका नमूना वाहन",
    noVehicle: "इस खाते पर कोई नमूना वाहन नहीं मिला — आप फिर भी डेमो आवेदन जमा कर सकते हैं।",
    regLabel: "पंजीकरण संख्या",
    regPlaceholder: "जैसे WB06AB1234",
    localDemo: "यह केवल एक स्थानीय डेमो आवेदन दर्ज करता है।",
    submitting: "जमा किया जा रहा है…",
    submit: "डेमो आवेदन जमा करें",
    submitted: "डेमो आवेदन जमा हो गया",
    reference: "कोई वास्तविक आवेदन, भुगतान या दस्तावेज़ नहीं बनाया गया है।",
    backServices: "सेवाओं पर वापस जाएं",
    error: "डेमो आवेदन जमा नहीं हो सका। कृपया फिर से प्रयास करें।",
  },
};

const VEHICLE_TABLE_LABELS = {
  en: {
    reg: "Registration number",
    owner: "Owner name",
    vclass: "Vehicle class",
    model: "Maker / model",
    fitness: "Fitness valid till",
    insurance: "Insurance valid till",
    puc: "PUC valid till",
  },
  hi: {
    reg: "पंजीकरण संख्या",
    owner: "मालिक का नाम",
    vclass: "वाहन श्रेणी",
    model: "निर्माता / मॉडल",
    fitness: "फिटनेस वैधता",
    insurance: "बीमा वैधता",
    puc: "पीयूसी वैधता",
  },
};

export default function VehicleRegistration() {
  const { slug } = useParams();
  const { i18n, t } = useTranslation();
  const lang = i18n.language === "hi" ? "hi" : "en";
  const label = SERVICE_LABELS[slug]?.[lang] || slug;

  if (slug === "vehicle-status") {
    return <VehicleLookup label={label} />;
  }

  return <VehicleApplicationView slug={slug} label={label} lang={lang} t={t} />;
}

function VehicleApplicationView({ slug, label, lang, t }) {
  const { user } = useAuth();
  const copy = APPLY_COPY[lang];
  const needsRegNo = slug !== "new-registration";

  const [myVehicle, setMyVehicle] = useState(null);
  const [regNo, setRegNo] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    api
      .get("/vehicles/mine")
      .then((res) => {
        const vehicle = res.data.vehicles?.[0] || null;
        setMyVehicle(vehicle);
        if (vehicle) setRegNo(vehicle.registration_number);
      })
      .catch(() => setMyVehicle(null));
  }, [user]);

  async function handleApply() {
    setError("");
    setLoading(true);
    try {
      const res = await api.post(`/vehicles/apply/${slug}`, {
        serviceName: label,
        registration_number: needsRegNo ? regNo : undefined,
      });
      setApplicationId(res.data.applicationId);
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.error || copy.error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <p className="text-xs text-slate-400 mb-2">
        {t("nav.registration")} <span className="mx-1">/</span> {label}
      </p>
      <h2 className="text-2xl font-semibold text-navy-900 mb-6">{label}</h2>

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        {submitted ? (
          <div className="flex gap-3 items-start">
            <Check size={22} className="text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-lg font-semibold text-navy-900">{copy.submitted}</p>
              <p className="text-sm text-slate-600 mt-1">
                Reference #{applicationId}. {copy.reference}
              </p>
              <Link
                to="/vehicle-registration"
                className="inline-flex mt-5 bg-navy-900 text-white px-5 py-2 rounded-md font-medium hover:bg-navy-800 transition focus-ring"
              >
                {copy.backServices}
              </Link>
            </div>
          </div>
        ) : !user ? (
          <div className="flex gap-3 items-start">
            <span className="text-lg" aria-hidden="true">↗</span>
            <div>
              <h3 className="text-lg font-semibold text-navy-900">{copy.signIn}</h3>
              <p className="text-sm text-slate-600 mt-1">{copy.signInDescription}</p>
              <Link
                to="/login"
                className="inline-flex mt-5 bg-navy-900 text-white px-5 py-2 rounded-md font-medium hover:bg-navy-800 transition focus-ring"
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
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 flex gap-3 mb-6">
              <span className="text-lg" aria-hidden="true">ℹ</span>
              <p className="text-sm text-slate-600 leading-relaxed">
                <strong className="text-navy-900">{user.full_name}</strong> —{" "}
                {copy.signedIn}
              </p>
            </div>

            {myVehicle ? (
              <div className="mb-6">
                <h3 className="font-semibold text-navy-900 mb-3">{copy.sampleVehicle}</h3>
                <VehicleTable vehicle={myVehicle} lang={lang} />
              </div>
            ) : (
              <p className="text-sm text-slate-500 mb-6">{copy.noVehicle}</p>
            )}

            {needsRegNo && (
              <div className="mb-6">
                <label className="text-sm font-semibold text-navy-900 block mb-1.5">
                  {copy.regLabel}
                </label>
                <input
                  value={regNo}
                  onChange={(e) => setRegNo(e.target.value)}
                  placeholder={copy.regPlaceholder}
                  className="w-full border border-slate-300 rounded-md px-3 py-2 focus-ring"
                  required
                />
              </div>
            )}

            <div className="border-t border-slate-100 pt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-500">{copy.localDemo}</p>
              <button
                onClick={handleApply}
                disabled={loading || (needsRegNo && !regNo.trim())}
                className="bg-navy-900 text-white px-5 py-2 rounded-md font-medium hover:bg-navy-800 transition focus-ring disabled:opacity-60"
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

function VehicleTable({ vehicle, lang }) {
  const copy = VEHICLE_TABLE_LABELS[lang];
  const rows = [
    [copy.reg, vehicle.registration_number],
    [copy.owner, vehicle.owner_name],
    [copy.vclass, vehicle.vehicle_class],
    [copy.model, vehicle.maker_model],
    [copy.fitness, vehicle.fitness_valid_till],
    [copy.insurance, vehicle.insurance_valid_till],
    [copy.puc, vehicle.puc_valid_till],
  ];

  return (
    <table className="w-full text-sm">
      <tbody>
        {rows.map(([label, value]) => (
          <tr key={label} className="border-b last:border-0 border-slate-100">
            <td className="py-2 text-slate-500 w-1/2">{label}</td>
            <td className="py-2 font-medium text-navy-900">{value ?? "—"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function VehicleLookup({ label }) {
  const { t } = useTranslation();
  const [regNo, setRegNo] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  async function handleSearch(e) {
    e.preventDefault();
    setError("");
    setResult(null);
    try {
      const res = await api.post("/vehicles/lookup", { registration_number: regNo });
      setResult(res.data.vehicle);
    } catch (err) {
      setError(err.response?.data?.error || t("common.error"));
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <p className="text-xs text-slate-400 mb-2">
        {t("nav.registration")} <span className="mx-1">/</span> {label}
      </p>
      <h2 className="text-2xl font-semibold text-navy-900 mb-6">{label}</h2>

      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          value={regNo}
          onChange={(e) => setRegNo(e.target.value)}
          placeholder="Enter Registration Number"
          className="flex-1 border border-slate-300 rounded-md px-3 py-2 focus-ring"
        />
        <button
          type="submit"
          className="bg-navy-900 text-white px-5 py-2 rounded-md font-medium hover:bg-navy-800 transition focus-ring"
        >
          {t("dl.lookupBtn")}
        </button>
      </form>

      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
      {result && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <table className="w-full text-sm">
            <tbody>
              {Object.entries(result).map(([key, value]) => (
                <tr key={key} className="border-b last:border-0 border-slate-100">
                  <td className="py-2 text-slate-500 w-1/2 capitalize">
                    {key.replaceAll("_", " ")}
                  </td>
                  <td className="py-2 font-medium text-navy-900">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <p className="text-xs text-slate-400 mt-6">Try demo registration number: WB06AB1234</p>
    </div>
  );
}