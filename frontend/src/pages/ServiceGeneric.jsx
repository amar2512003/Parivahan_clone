import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function ServiceGeneric() {
  const { slug } = useParams();
  const { t } = useTranslation();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <p className="text-xs text-slate-400 mb-2">
        {t("nav.other")} <span className="mx-1">/</span> {slug}
      </p>
      <h2 className="text-2xl font-semibold text-navy-900 mb-6 capitalize">
        {slug.replaceAll("-", " ")}
      </h2>
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm text-sm text-slate-600">
        Placeholder screen for this service — wire this up to a new backend
        route the same way <code className="bg-slate-100 px-1 rounded">/api/dl</code> is wired
        to the Driving Licence pages.
      </div>
    </div>
  );
}
