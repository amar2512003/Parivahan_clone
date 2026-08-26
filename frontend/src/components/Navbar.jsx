import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [menu, setMenu] = useState(null);
  const [openKey, setOpenKey] = useState(null);

  useEffect(() => {
    api.get("/services/menu").then((res) => setMenu(res.data)).catch(() => {});
  }, []);

  const lang = i18n.language === "hi" ? "hi" : "en";

  function goToService(section, slug) {
    setOpenKey(null);
    if (section === "drivingLicense") {
      navigate(`/driving-license/${slug}`);
    } else if (section === "registration") {
      navigate(`/vehicle-registration/${slug}`);
    } else if (section === "onlineServices") {
      navigate(slug === "vehicle-related-services" ? "/online-services" : `/online-services/${slug}`);
    } else {
      navigate(`/service/${slug}`);
    }
  }

  const sections = menu
    ? [
        { key: "drivingLicense", label: t("nav.drivingLicense"), data: menu.drivingLicense },
        { key: "registration", label: t("nav.registration"), data: menu.registration },
        { key: "onlineServices", label: t("nav.onlineServices"), data: menu.onlineServices },
      ].filter((section) => section.data)
    : [];

  return (
    <nav className="bg-navy-900 text-white relative z-30">
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-1">
        <Link
          to="/"
          className="px-4 py-3 text-sm font-medium hover:bg-navy-800 focus-ring"
        >
          {t("nav.home")}
        </Link>

        <Link
          to="/driving-license"
          className="px-4 py-3 text-sm font-medium hover:bg-navy-800 focus-ring"
        >
          {t("nav.drivingLicense")}
        </Link>

        <Link
          to="/online-services"
          className="px-4 py-3 text-sm font-medium hover:bg-navy-800 focus-ring"
        >
          {t("nav.vehicleServices")}
        </Link>

        {sections.map((s) => (
          <div
            key={s.key}
            className="relative"
            onMouseEnter={() => setOpenKey(s.key)}
            onMouseLeave={() => setOpenKey(null)}
          >
            <button
              className="px-4 py-3 text-sm font-medium hover:bg-navy-800 focus-ring"
              onClick={() => setOpenKey(openKey === s.key ? null : s.key)}
            >
              {s.label}
            </button>

            {openKey === s.key && (
              <div className="absolute left-0 top-full bg-white text-navy-950 shadow-xl rounded-b-md min-w-[280px] py-2 border border-slate-200">
                {s.data.items.map((item) => (
                  <button
                    key={item.slug}
                    onClick={() => goToService(s.key, item.slug)}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-slate-100 focus-ring"
                  >
                    {item[lang]}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}
