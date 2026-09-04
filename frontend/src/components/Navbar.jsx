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
    api
      .get("/services/menu")
      .then((res) => setMenu(res.data))
      .catch(() => {});
  }, []);

  const lang = i18n.language;

  function goToService(section, slug) {
    setOpenKey(null);

    if (section === "drivingLicense") {
      navigate(`/driving-license/${slug}`);
    } else if (section === "registration") {
      navigate(`/vehicle-registration/${slug}`);
    } else if (section === "onlineServices") {
      navigate(
        slug === "vehicle-related-services"
          ? "/online-services"
          : `/online-services/${slug}`
      );
    } else {
      navigate(`/service/${slug}`);
    }
  }

  return (
    <nav className="bg-navy-900 text-white relative z-30">
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-1">

        {/* HOME */}
        <Link
          to="/"
          className="px-4 py-3 text-sm font-medium hover:bg-navy-800 focus-ring"
        >
          {t("nav.home")}
        </Link>

        {/* DRIVING LICENCE */}
        <div
          className="relative"
          onMouseEnter={() => setOpenKey("drivingLicense")}
          onMouseLeave={() => setOpenKey(null)}
        >
          <Link
            to="/driving-license"
            className="block px-4 py-3 text-sm font-medium hover:bg-navy-800 focus-ring"
          >
            {t("nav.drivingLicense")}
          </Link>

          {openKey === "drivingLicense" &&
            menu?.drivingLicense && (
              <div className="absolute left-0 top-full bg-white text-navy-950 shadow-xl rounded-b-md min-w-[280px] py-2 border border-slate-200">
                {menu.drivingLicense.items.map((item) => (
                  <button
                    key={item.slug}
                    onClick={() =>
                      goToService("drivingLicense", item.slug)
                    }
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-slate-100 focus-ring"
                  >
                    {item[lang] || item.en}
                  </button>
                ))}
              </div>
            )}
        </div>

        {/* VEHICLE SERVICES */}
        <div
          className="relative"
          onMouseEnter={() => setOpenKey("onlineServices")}
          onMouseLeave={() => setOpenKey(null)}
        >
          <Link
            to="/online-services"
            className="block px-4 py-3 text-sm font-medium hover:bg-navy-800 focus-ring"
          >
            {t("nav.vehicleServices")}
          </Link>

          {openKey === "onlineServices" &&
            menu?.onlineServices && (
              <div className="absolute left-0 top-full bg-white text-navy-950 shadow-xl rounded-b-md min-w-[280px] py-2 border border-slate-200">
                {menu.onlineServices.items.map((item) => (
                  <button
                    key={item.slug}
                    onClick={() =>
                      goToService("onlineServices", item.slug)
                    }
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-slate-100 focus-ring"
                  >
                    {item[lang] || item.en}
                  </button>
                ))}
              </div>
            )}
        </div>

      </div>
    </nav>
  );
}