import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import TrafficAnimation from "../components/TrafficAnimation"; // adjust path if needed

export default function Home() {
  const { t } = useTranslation();

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy-900 to-navy-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-14 items-center">

            {/* Left Content */}
            <div className="max-w-xl">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5">
                {t("hero.title")}
              </h2>

              <p className="text-slate-200 text-base sm:text-lg leading-relaxed mb-7 max-w-lg">
                {t("hero.subtitle")}
              </p>

              <Link
                to="/rto-locator"
                className="rto-cta focus-ring"
              >
                <MapPin size={18} aria-hidden="true" />
                {t("hero.cta")}
              </Link>
            </div>

            {/* Right Video */}
            <div className="hidden md:flex justify-end">
              <div className="w-full max-w-[600px] aspect-[16/7] rounded-3xl overflow-hidden border border-navy-700 shadow-2xl bg-navy-800/60">
                <video
                  src="/videos/parivahan.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Quick Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <h3 className="text-xl font-semibold mb-6">
          {t("home.quickServices")}
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ServiceCard
            title={t("home.dlCardTitle")}
            desc={t("home.dlCardDesc")}
            to="/driving-license"
            accent="bg-saffron"
          />

          <ServiceCard
            title={t("home.rcCardTitle")}
            desc={t("home.rcCardDesc")}
            to="/vehicle-registration/rc-renewal"
            accent="bg-saffron"
          />

          <ServiceCard
            title={t("home.lookupTitle")}
            desc={t("home.lookupDesc")}
            to="/driving-license/dl-status"
            accent="bg-indiagreen"
          />

          <ServiceCard
            title={t("home.onlineCardTitle")}
            desc={t("home.onlineCardDesc")}
            to="/online-services"
            accent="bg-indiagreen"
          />
        </div>

        <p className="text-xs text-slate-500 mt-10 border-t pt-4">
          {t("home.notice")}
        </p>
      </section>

      {/* On the Move — animated traffic strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        <h3 className="text-xl font-semibold mb-6">
          {t("home.onTheMove", "On the move")}
        </h3>

        <TrafficAnimation />
      </section>
    </div>
  );
}

function ServiceCard({ title, desc, to, accent }) {
  return (
    <Link
      to={to}
      className="quick-service-card block bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition focus-ring"
    >
      <div className={`h-1.5 w-10 rounded-full ${accent} mb-4`} />

      <h4 className="font-semibold text-navy-900 mb-1">
        {title}
      </h4>

      <p className="text-sm text-slate-500">
        {desc}
      </p>
    </Link>
  );
}