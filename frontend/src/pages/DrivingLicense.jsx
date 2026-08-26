import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import {
  DRIVING_LICENCE_SERVICES,
  SERVICE_BY_SLUG,
  SERVICE_REGIONS,
} from "../data/drivingLicence";

export default function DrivingLicense() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const selectedState = useMemo(
    () => SERVICE_REGIONS.find((state) => state.code === searchParams.get("state")),
    [searchParams]
  );

  if (slug) return <ServicePage slug={slug} state={selectedState} />;
  return selectedState ? <ServicesDashboard state={selectedState} /> : <StateSelection />;
}

function StateSelection() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const filteredRegions = SERVICE_REGIONS.filter((state) =>
    state.name.toLowerCase().includes(query.toLowerCase())
  );

  function chooseState(state) {
    localStorage.setItem("dlSelectedState", state.code);
    navigate(`/driving-license?state=${state.code}`);
  }

  return (
    <div className="dl-page">
      <section className="dl-hero">
        <div className="max-w-6xl mx-auto px-4 py-10 sm:py-14">
          <p className="eyebrow eyebrow-light">Driving licence services</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight max-w-2xl">Start with your state</h2>
          <p className="mt-3 text-blue-100 max-w-xl leading-relaxed">
            Select the state or service region where you want to use the driving licence portal.
            You’ll see every demo service available for that region next.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 -mt-5 pb-14">
        <div className="surface-card state-panel">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-7">
            <div>
              <p className="eyebrow">Step 1 of 2</p>
              <h3 className="text-2xl font-semibold text-navy-950 mt-1">Choose your state / service region</h3>
              <p className="text-sm text-slate-500 mt-1">29 options are available in this demonstration.</p>
            </div>
            <label className="state-search">
              <span className="sr-only">Search states</span>
              <span aria-hidden="true">⌕</span>
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search a state" />
            </label>
          </div>

          <div className="state-grid" role="list">
            {filteredRegions.map((state) => (
              <button key={state.code} className="state-option focus-ring" onClick={() => chooseState(state)}>
                <span className="state-code">{state.code}</span>
                <span>{state.name}</span>
                <span className="state-arrow" aria-hidden="true">→</span>
              </button>
            ))}
          </div>
          {filteredRegions.length === 0 && <p className="text-center text-sm text-slate-500 py-10">No state matches “{query}”.</p>}
        </div>
      </section>
    </div>
  );
}

function ServicesDashboard({ state }) {
  const navigate = useNavigate();

  return (
    <div className="dl-page">
      <section className="dl-hero dl-hero-compact">
        <div className="max-w-6xl mx-auto px-4 py-8 sm:py-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="eyebrow eyebrow-light">Sarathi-inspired demo portal</p>
            <h2 className="text-3xl font-bold tracking-tight">Driving Licence Services</h2>
            <p className="text-blue-100 mt-2">Choose a service to continue your application.</p>
          </div>
          <button className="state-chip state-chip-button focus-ring" onClick={() => navigate("/driving-license")}>
            <span className="state-code">{state.code}</span>
            <span>{state.name}</span>
            <span className="text-blue-200">Change</span>
          </button>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-10 sm:py-12">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between mb-7">
          <div>
            <p className="eyebrow">Step 2 of 2</p>
            <h3 className="text-2xl font-semibold text-navy-950 mt-1">What would you like to do?</h3>
          </div>
          <p className="text-sm text-slate-500">All services use sample data only.</p>
        </div>

        <div className="service-grid">
          {DRIVING_LICENCE_SERVICES.map((service) => (
            <button
              key={service.slug}
              className="service-card focus-ring"
              onClick={() => navigate(`/driving-license/${service.slug}?state=${state.code}`)}
            >
              <span className={`service-icon tone-${service.tone}`}>{service.icon}</span>
              <span className="service-title">{service.title}</span>
              <span className="service-link">Open service <span aria-hidden="true">→</span></span>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}

function ServicePage({ slug, state }) {
  const service = SERVICE_BY_SLUG[slug] || {
    slug,
    title: slug.replaceAll("-", " ").replace(/\b\w/g, (character) => character.toUpperCase()),
    icon: "DL",
    tone: "blue",
  };

  if (slug === "dl-status") return <LicenceLookup service={service} state={state} />;
  return <ApplicationView service={service} state={state} />;
}

function PageHeading({ service, state }) {
  return (
    <>
      <Link to={state ? `/driving-license?state=${state.code}` : "/driving-license"} className="back-link focus-ring">
        ← All driving licence services
      </Link>
      <div className="flex gap-4 items-start mt-6">
        <span className={`service-icon service-icon-large tone-${service.tone}`}>{service.icon}</span>
        <div>
          <p className="eyebrow">{state ? `${state.name} · demo portal` : "Demo portal"}</p>
          <h2 className="text-3xl font-bold text-navy-950 tracking-tight mt-1">{service.title}</h2>
        </div>
      </div>
    </>
  );
}

function ApplicationView({ service, state }) {
  const { user } = useAuth();
  const location = useLocation();
  const [myLicense, setMyLicense] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    api.get("/dl/mine").then((response) => setMyLicense(response.data.license)).catch(() => setMyLicense(null));
  }, [user]);

  async function handleApply() {
    setError("");
    setLoading(true);
    try {
      const response = await api.post(`/dl/apply/${service.slug}`, {
        serviceName: `${service.title}${state ? ` — ${state.name}` : ""}`,
      });
      setApplicationId(response.data.applicationId);
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.error || "We couldn’t submit the demo application. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 sm:py-14">
      <PageHeading service={service} state={state} />
      <div className="surface-card mt-8 p-6 sm:p-8">
        {submitted ? (
          <div className="success-state">
            <span className="success-mark" aria-hidden="true">✓</span>
            <div>
              <p className="text-lg font-semibold text-navy-950">Demo application submitted</p>
              <p className="text-sm text-slate-600 mt-1">Reference #{applicationId}. No real application, payment, or document has been created.</p>
              <Link to={state ? `/driving-license?state=${state.code}` : "/driving-license"} className="button-primary inline-flex mt-5 focus-ring">Back to services</Link>
            </div>
          </div>
        ) : !user ? (
          <div className="login-prompt">
            <span className="login-prompt-icon" aria-hidden="true">↗</span>
            <div>
              <h3 className="text-lg font-semibold text-navy-950">Sign in to continue</h3>
              <p className="text-sm text-slate-600 mt-1">This service is interactive in demo mode. Sign in with the supplied sample account to submit it.</p>
              <Link to="/login" state={{ from: `${location.pathname}${location.search}` }} className="button-primary inline-flex mt-5 focus-ring">Login with demo account</Link>
              <p className="text-xs text-slate-500 mt-3">Username: <strong>demo</strong> · Password: <strong>demo1234</strong></p>
            </div>
          </div>
        ) : (
          <>
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 flex gap-3">
              <span className="text-lg" aria-hidden="true">ℹ</span>
              <p className="text-sm text-slate-600 leading-relaxed">You are signed in as <strong className="text-navy-950">{user.full_name}</strong>. Review the sample details and submit a dummy request.</p>
            </div>
            {myLicense && (
              <div className="mt-6">
                <h3 className="font-semibold text-navy-950 mb-3">Your sample driving licence</h3>
                <LicenseTable license={myLicense} />
              </div>
            )}
            <div className="mt-6 border-t border-slate-100 pt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-500">This only records a local demo application.</p>
              <button onClick={handleApply} disabled={loading} className="button-primary focus-ring disabled:opacity-60">{loading ? "Submitting…" : "Submit demo application"}</button>
            </div>
            {error && <p className="text-sm text-red-600 mt-4">{error}</p>}
          </>
        )}
      </div>
    </div>
  );
}

function LicenceLookup({ service, state }) {
  const [dlNumber, setDlNumber] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSearch(event) {
    event.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);
    try {
      const response = await api.post("/dl/lookup", { dl_number: dlNumber });
      setResult(response.data.license);
    } catch (err) {
      setError(err.response?.data?.error || "No sample record was found.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 sm:py-14">
      <PageHeading service={service} state={state} />
      <div className="surface-card mt-8 p-6 sm:p-8">
        <p className="text-sm text-slate-600 mb-5">Enter a licence number to view the available sample record.</p>
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <input value={dlNumber} onChange={(event) => setDlNumber(event.target.value)} placeholder="e.g. WB0620230012345" className="form-input flex-1" required />
          <button type="submit" className="button-primary focus-ring" disabled={loading}>{loading ? "Searching…" : "Search details"}</button>
        </form>
        <p className="text-xs text-slate-500 mt-3">Try the demo DL number: <strong>WB0620230012345</strong></p>
        {error && <p className="text-sm text-red-600 mt-5">{error}</p>}
        {result && <div className="mt-7"><LicenseTable license={result} /></div>}
      </div>
    </div>
  );
}

function LicenseTable({ license }) {
  const rows = [
    ["Holder name", license.holder_name],
    ["Driving licence no.", license.dl_number],
    ["Valid till", license.valid_till],
    ["Vehicle classes", license.vehicle_classes],
    ["Status", license.status],
  ];

  return (
    <dl className="detail-list">
      {rows.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
    </dl>
  );
}
