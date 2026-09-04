import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="bg-navy-950 text-slate-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10 grid gap-8 sm:grid-cols-3">
        <div>
          <h3 className="text-white font-semibold mb-2">{t("brand.title")}</h3>
          <p className="text-sm text-slate-400">{t("brand.subtitle")}</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-2">{t("footer.links")}</h4>
          <ul className="text-sm space-y-1 text-slate-400">
            <li>
              <Link to="/driving-license" className="hover:text-white transition focus-ring rounded">
                {t("nav.drivingLicense")}
              </Link>
            </li>
            <li>
              <Link to="/vehicle-registration/rc-renewal" className="hover:text-white transition focus-ring rounded">
                {t("nav.registration")}
              </Link>
            </li>
            <li>
              <Link to="/online-services" className="hover:text-white transition focus-ring rounded">
                {t("nav.other")}
              </Link>
            </li>
            <li>
              <Link to="/rto-locator" className="hover:text-white transition focus-ring rounded">
                {t("hero.cta")}
              </Link>
            </li>
            <li>
              <a
                href="https://github.com/amar2512003/Parivahan_clone"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition focus-ring rounded"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-2">{t("footer.contact")}</h4>
          <p className="text-sm text-slate-400">sinhaamar178@gmail.com</p>
        </div>
      </div>
      <div className="border-t border-navy-800 py-4 text-center text-xs text-slate-500 px-4">
        {t("footer.rights")}
      </div>
    </footer>
  );
}