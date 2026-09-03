import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CircleMarker, MapContainer, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Building2, LocateFixed, MapPin, Navigation, Phone, Search, X } from "lucide-react";
import { RTO_OFFICES, RTO_STATES } from "../data/rtoOffices";

const INDIA_CENTER = [22.5937, 78.9629];

function distanceInKilometres([lat1, lon1], [lat2, lon2]) {
  const earthRadiusKm = 6371;
  const toRadians = (value) => (value * Math.PI) / 180;
  const latitudeDelta = toRadians(lat2 - lat1);
  const longitudeDelta = toRadians(lon2 - lon1);
  const a =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(longitudeDelta / 2) ** 2;

  return earthRadiusKm * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function MapViewport({ offices, userLocation, focusedOffice }) {
  const map = useMap();

  useEffect(() => {
    const focus = focusedOffice?.coordinates;
    if (focus) {
      map.flyTo(focus, 13, { duration: 0.7 });
      return;
    }

    const locations = [
      ...offices.map((office) => office.coordinates),
      ...(userLocation ? [userLocation] : []),
    ];

    if (locations.length === 1) {
      map.flyTo(locations[0], 11, { duration: 0.7 });
    } else if (locations.length > 1) {
      map.fitBounds(locations, { padding: [32, 32], maxZoom: 7 });
    }
  }, [map, offices, userLocation, focusedOffice]);

  return null;
}

function RtoMap({ offices, userLocation, focusedOffice, onOfficeSelect }) {
  return (
    <MapContainer
      center={INDIA_CENTER}
      zoom={4}
      minZoom={3}
      className="rto-map"
      scrollWheelZoom
      aria-label="RTO office map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapViewport
        offices={offices}
        userLocation={userLocation}
        focusedOffice={focusedOffice}
      />

      {offices.map((office) => {
        const isFocused = focusedOffice?.id === office.id;
        return (
          <CircleMarker
            key={office.id}
            center={office.coordinates}
            radius={isFocused ? 10 : 7}
            pathOptions={{
              color: "#ffffff",
              weight: 2,
              fillColor: isFocused ? "#ea580c" : "#0f5e9b",
              fillOpacity: 1,
            }}
            eventHandlers={{ click: () => onOfficeSelect(office) }}
          >
            <Popup>
              <strong>{office.shortName}</strong>
              <br />
              {office.address}
              <br />
              {office.phone}
            </Popup>
          </CircleMarker>
        );
      })}

      {userLocation && (
        <CircleMarker
          center={userLocation}
          radius={9}
          pathOptions={{ color: "#ffffff", weight: 3, fillColor: "#2563eb", fillOpacity: 1 }}
        >
          <Popup>Your location</Popup>
        </CircleMarker>
      )}
    </MapContainer>
  );
}

export default function RtoLocator() {
  const [stateCode, setStateCode] = useState("");
  const [officeQuery, setOfficeQuery] = useState("");
  const [userLocation, setUserLocation] = useState(null);
  const [locationStatus, setLocationStatus] = useState("idle");
  const [locationError, setLocationError] = useState("");
  const [focusedOffice, setFocusedOffice] = useState(null);

  const selectedState = RTO_STATES.find((state) => state.code === stateCode);

  const stateOffices = useMemo(
    () =>
      stateCode
        ? RTO_OFFICES.filter((office) => office.stateCode === stateCode)
        : RTO_OFFICES,
    [stateCode]
  );

  const visibleOffices = useMemo(() => {
    const search = officeQuery.trim().toLowerCase();
    if (!search) return stateOffices;
    return stateOffices.filter((office) =>
      [office.name, office.state, office.address, office.phone].some((value) =>
        value.toLowerCase().includes(search)
      )
    );
  }, [officeQuery, stateOffices]);

  const nearestOffice = useMemo(() => {
    if (!userLocation || stateOffices.length === 0) return null;

    return stateOffices.reduce((nearest, office) => {
      const distance = distanceInKilometres(userLocation, office.coordinates);
      return !nearest || distance < nearest.distance ? { office, distance } : nearest;
    }, null);
  }, [stateOffices, userLocation]);

  function chooseState(event) {
    setStateCode(event.target.value);
    setOfficeQuery("");
    setFocusedOffice(null);
  }

  function showAllOffices() {
    setStateCode("");
    setOfficeQuery("");
    setFocusedOffice(null);
  }

  function requestLocation() {
    if (!navigator.geolocation) {
      setLocationError("Location is not supported by this browser. You can still choose a state below.");
      return;
    }

    setLocationStatus("loading");
    setLocationError("");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
        setLocationStatus("ready");
      },
      () => {
        setLocationStatus("idle");
        setLocationError("We could not access your location. Allow location access, then try again.");
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
    );
  }

  function focusNearestOffice() {
    if (nearestOffice) setFocusedOffice(nearestOffice.office);
  }

  return (
    <div className="min-h-[calc(100vh-12rem)] bg-slate-50">
      <section className="rto-hero text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <Link to="/" className="inline-flex text-sm text-blue-100 hover:text-white focus-ring rounded">
            ← Back to home
          </Link>
          <div className="mt-7 max-w-3xl">
            <p className="eyebrow eyebrow-light">RTO office locator</p>
            <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
              Find an RTO office near you
            </h1>
            <p className="mt-4 max-w-2xl text-blue-100 leading-relaxed">
              Choose a state to view its RTO offices, contact details and locations, or use your device location to identify the nearest seeded office.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)]">
          <aside className="surface-card p-5 sm:p-6 h-fit">
            <div className="flex items-start gap-3">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-navy-800">
                <Building2 size={22} aria-hidden="true" />
              </span>
              <div>
                <p className="eyebrow">Step 1</p>
                <h2 className="mt-1 text-xl font-bold text-navy-950">Choose a state</h2>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                  Select a state to narrow the map and office list.
                </p>
              </div>
            </div>

            <label className="mt-6 block text-sm font-semibold text-navy-950" htmlFor="rto-state">
              State / UT
            </label>
            <select
              id="rto-state"
              value={stateCode}
              onChange={chooseState}
              className="mt-2 form-input w-full"
            >
              <option value="">All states and regions</option>
              {RTO_STATES.map((state) => (
                <option key={state.code} value={state.code}>
                  {state.name}
                </option>
              ))}
            </select>

            {selectedState && (
              <button
                type="button"
                onClick={showAllOffices}
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-700 hover:text-navy-950 focus-ring rounded"
              >
                <X size={15} aria-hidden="true" /> View all locators
              </button>
            )}

            <div className="mt-7 border-t border-slate-100 pt-6">
              <div className="flex items-start gap-3">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-700">
                  <LocateFixed size={21} aria-hidden="true" />
                </span>
                <div>
                  <p className="eyebrow">Step 2</p>
                  <h2 className="mt-1 text-lg font-bold text-navy-950">Nearest RTO</h2>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    Share your location to find the closest office{selectedState ? ` in ${selectedState.name}` : ""}.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={requestLocation}
                disabled={locationStatus === "loading"}
                className="button-primary mt-5 inline-flex w-full gap-2 focus-ring"
              >
                <Navigation size={16} aria-hidden="true" />
                {locationStatus === "loading" ? "Finding your location…" : "Use my location"}
              </button>
              {locationError && <p className="mt-3 text-sm text-red-700">{locationError}</p>}

              {nearestOffice && (
                <button
                  type="button"
                  onClick={focusNearestOffice}
                  className="nearest-rto-card mt-5 w-full text-left focus-ring"
                >
                  <span className="nearest-rto-label">Nearest seeded office</span>
                  <span className="mt-1 block font-bold text-navy-950">{nearestOffice.office.shortName}</span>
                  <span className="mt-1 block text-sm text-slate-600">
                    {nearestOffice.distance.toFixed(1)} km away
                  </span>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-navy-800">
                    Show on map <span aria-hidden="true">→</span>
                  </span>
                </button>
              )}
            </div>
          </aside>

          <div className="surface-card overflow-hidden">
            <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div>
                <p className="eyebrow">Interactive map</p>
                <h2 className="mt-1 text-xl font-bold text-navy-950">
                  {selectedState ? `${selectedState.name} RTO offices` : "All RTO office locators"}
                </h2>
              </div>
              <span className="inline-flex w-fit rounded-full bg-blue-50 px-3 py-1.5 text-sm font-semibold text-navy-800">
                {visibleOffices.length} {visibleOffices.length === 1 ? "office" : "offices"}
              </span>
            </div>
            <RtoMap
              offices={visibleOffices}
              userLocation={userLocation}
              focusedOffice={focusedOffice}
              onOfficeSelect={setFocusedOffice}
            />
          </div>
        </div>

        <div className="mt-8 surface-card overflow-hidden">
          <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-5 sm:px-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="eyebrow">Office directory</p>
              <h2 className="mt-1 text-xl font-bold text-navy-950">
                {selectedState ? `RTO offices in ${selectedState.name}` : "All RTO offices"}
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Select an office to focus it on the map.
              </p>
            </div>
            <label className="relative block w-full lg:max-w-sm" htmlFor="office-search">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} aria-hidden="true" />
              <span className="sr-only">Search RTO offices</span>
              <input
                id="office-search"
                value={officeQuery}
                onChange={(event) => {
                  setOfficeQuery(event.target.value);
                  setFocusedOffice(null);
                }}
                placeholder="Search office or city"
                className="form-input w-full pl-9"
              />
            </label>
          </div>

          {visibleOffices.length ? (
            <div className="grid divide-y divide-slate-100 md:grid-cols-2 md:divide-y-0 md:divide-x xl:grid-cols-3">
              {visibleOffices.map((office) => {
                const isNearest = nearestOffice?.office.id === office.id;
                const isFocused = focusedOffice?.id === office.id;
                return (
                  <button
                    type="button"
                    key={office.id}
                    onClick={() => setFocusedOffice(office)}
                    className={`rto-office-card text-left focus-ring ${isFocused ? "rto-office-card--active" : ""}`}
                  >
                    <div className="flex gap-3">
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-navy-800">
                        <MapPin size={19} aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-bold text-navy-950">{office.shortName}</h3>
                          {isNearest && <span className="nearest-rto-label">Nearest</span>}
                        </div>
                        <p className="mt-1 text-sm font-medium text-slate-600">{office.state}</p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-slate-600">{office.address}</p>
                    <p className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-navy-800">
                      <Phone size={15} aria-hidden="true" /> {office.phone}
                    </p>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="px-6 py-12 text-center">
              <p className="font-semibold text-navy-950">No RTO offices match that search.</p>
              <button type="button" onClick={() => setOfficeQuery("")} className="mt-3 text-sm font-semibold text-navy-700 underline">
                Clear search
              </button>
            </div>
          )}
        </div>

        <p className="mt-5 text-xs leading-relaxed text-slate-500">
          Demo locator: office locations, addresses and phone numbers are seeded sample data for this prototype. Confirm details with the relevant State Transport Department before visiting.
        </p>
      </section>
    </div>
  );
}
