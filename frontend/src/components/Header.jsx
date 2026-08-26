import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();

  function switchLang(lang) {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  }

  return (
    <header className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 gap-4">
        <Link to="/" className="flex items-center gap-3 focus-ring rounded">
          <img src="/emblem.svg" alt="Emblem of India" className="h-12 w-12" />
          <div>
            <p className="text-xs text-slate-500 leading-none">{t("brand.govOfIndia")}</p>
            <h1 className="text-xl font-semibold text-navy-900 leading-tight">
              {t("brand.title")}
            </h1>
            <p className="text-xs text-slate-500 leading-none">{t("brand.subtitle")}</p>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <div className="flex rounded-full border border-slate-300 overflow-hidden text-sm">
            <button
              onClick={() => switchLang("en")}
              className={`px-3 py-1 focus-ring ${
                i18n.language === "en" ? "bg-navy-900 text-white" : "bg-white text-navy-900"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => switchLang("hi")}
              className={`px-3 py-1 focus-ring ${
                i18n.language === "hi" ? "bg-navy-900 text-white" : "bg-white text-navy-900"
              }`}
            >
              हिं
            </button>
          </div>

          {user ? (
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-sm text-slate-600">
                {user.full_name}
              </span>
              <button
                onClick={logout}
                className="text-sm px-3 py-1.5 rounded-md border border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white transition focus-ring"
              >
                {t("nav.logout")}
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="text-sm px-3 py-1.5 rounded-md bg-saffron text-white hover:opacity-90 transition focus-ring"
            >
              {t("nav.login")}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
