import { useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import api from "../api/axios";

const SERVICE_LABELS = {
  "new-registration": { en: "New Vehicle Registration", hi: "नया वाहन पंजीकरण" },
  "rc-renewal": { en: "Renewal of Registration (RC)", hi: "पंजीकरण का नवीनीकरण" },
  "transfer-ownership": { en: "Transfer of Ownership", hi: "स्वामित्व का हस्तांतरण" },
  "change-address": { en: "Change of Address", hi: "पते में परिवर्तन" },
  "duplicate-rc": { en: "Duplicate RC", hi: "डुप्लीकेट आरसी" },
  "vehicle-status": { en: "Know Your Vehicle Details", hi: "अपने वाहन का विवरण जानें" },
};

export default function VehicleRegistration() {
  const { slug } = useParams();
  const { i18n, t } = useTranslation();
  const lang = i18n.language === "hi" ? "hi" : "en";
  const label = SERVICE_LABELS[slug]?.[lang] || slug;

  if (slug === "vehicle-status") {
    return <VehicleLookup label={label} />;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <p className="text-xs text-slate-400 mb-2">
        {t("nav.registration")} <span className="mx-1">/</span> {label}
      </p>
      <h2 className="text-2xl font-semibold text-navy-900 mb-6">{label}</h2>
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm text-sm text-slate-600">
        This is a hackathon demo screen for <strong>{label}</strong>. In a full build,
        this would show a multi-step application form connected to the backend
        <code className="mx-1 bg-slate-100 px-1 rounded">/api/vehicles</code>
        endpoints, following the same pattern as the Driving Licence flow.
      </div>
    </div>
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
