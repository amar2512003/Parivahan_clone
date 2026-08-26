import { useTranslation } from "react-i18next";

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
            <li>{t("nav.drivingLicense")}</li>
            <li>{t("nav.registration")}</li>
            <li>{t("nav.other")}</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-2">{t("footer.contact")}</h4>
          <p className="text-sm text-slate-400">helpdesk@example.local</p>
        </div>
      </div>
      <div className="border-t border-navy-800 py-4 text-center text-xs text-slate-500 px-4">
        {t("footer.rights")}
      </div>
    </footer>
  );
}
