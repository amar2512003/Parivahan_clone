import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center">
      <h2 className="text-4xl font-bold text-navy-900 mb-3">404</h2>
      <p className="text-slate-500 mb-6">Page not found.</p>
      <Link to="/" className="text-navy-700 underline">
        {t("common.goBack")}
      </Link>
    </div>
  );
}
