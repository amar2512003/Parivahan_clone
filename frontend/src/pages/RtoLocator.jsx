import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CircleMarker, MapContainer, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Building2, LocateFixed, MapPin, Navigation, Phone, Search, X } from "lucide-react";
import { RTO_OFFICES, RTO_STATES } from "../data/rtoOffices";

const INDIA_CENTER = [22.5937, 78.9629];

/* =========================================================
   COPY (bilingual UI chrome)
========================================================= */

const COPY = {
  en: {
    backToHome: "← Back to home",
    eyebrow: "RTO office locator",
    title: "Find an RTO office near you",
    description:
      "Choose a state to view its RTO offices, contact details and locations, or use your device location to identify the nearest seeded office.",
    step1: "Step 1",
    chooseState: "Choose a state",
    chooseStateHint: "Select a state to narrow the map and office list.",
    stateLabel: "State / UT",
    allStates: "All states and regions",
    viewAll: "View all locators",
    step2: "Step 2",
    nearestRto: "Nearest RTO",
    nearestHint: (stateName) =>
      `Share your location to find the closest office${stateName ? ` in ${stateName}` : ""}.`,
    useMyLocation: "Use my location",
    findingLocation: "Finding your location…",
    locationUnsupported:
      "Location is not supported by this browser. You can still choose a state below.",
    locationDenied:
      "We could not access your location. Allow location access, then try again.",
    nearestSeeded: "Nearest seeded office",
    kmAway: (km) => `${km} km away`,
    showOnMap: "Show on map",
    interactiveMap: "Interactive map",
    allLocators: "All RTO office locators",
    stateOffices: (stateName) => `${stateName} RTO offices`,
    officeCount: (n) => `${n} ${n === 1 ? "office" : "offices"}`,
    officeDirectory: "Office directory",
    allOffices: "All RTO offices",
    officesInState: (stateName) => `RTO offices in ${stateName}`,
    selectToFocus: "Select an office to focus it on the map.",
    searchPlaceholder: "Search office or city",
    searchSrLabel: "Search RTO offices",
    nearestBadge: "Nearest",
    noMatches: "No RTO offices match that search.",
    clearSearch: "Clear search",
    yourLocation: "Your location",
    footerNotice:
      "Demo locator: office locations, addresses and phone numbers are seeded sample data for this prototype. Confirm details with the relevant State Transport Department before visiting.",
  },

  hi: {
    backToHome: "← होम पर वापस जाएं",
    eyebrow: "आरटीओ कार्यालय लोकेटर",
    title: "अपने पास का आरटीओ कार्यालय खोजें",
    description:
      "आरटीओ कार्यालय, संपर्क विवरण और स्थान देखने के लिए एक राज्य चुनें, या अपने डिवाइस की लोकेशन का उपयोग करके निकटतम कार्यालय पहचानें।",
    step1: "चरण 1",
    chooseState: "राज्य चुनें",
    chooseStateHint: "मानचित्र और कार्यालय सूची को सीमित करने के लिए एक राज्य चुनें।",
    stateLabel: "राज्य / केंद्र शासित प्रदेश",
    allStates: "सभी राज्य और क्षेत्र",
    viewAll: "सभी लोकेटर देखें",
    step2: "चरण 2",
    nearestRto: "निकटतम आरटीओ",
    nearestHint: (stateName) =>
      `निकटतम कार्यालय खोजने के लिए अपनी लोकेशन साझा करें${stateName ? ` — ${stateName} में` : ""}।`,
    useMyLocation: "मेरी लोकेशन का उपयोग करें",
    findingLocation: "आपकी लोकेशन खोजी जा रही है…",
    locationUnsupported:
      "इस ब्राउज़र में लोकेशन समर्थित नहीं है। आप नीचे से एक राज्य चुन सकते हैं।",
    locationDenied:
      "हम आपकी लोकेशन तक नहीं पहुंच सके। लोकेशन एक्सेस की अनुमति दें, फिर पुनः प्रयास करें।",
    nearestSeeded: "निकटतम कार्यालय",
    kmAway: (km) => `${km} किमी दूर`,
    showOnMap: "मानचित्र पर दिखाएं",
    interactiveMap: "इंटरैक्टिव मानचित्र",
    allLocators: "सभी आरटीओ कार्यालय लोकेटर",
    stateOffices: (stateName) => `${stateName} के आरटीओ कार्यालय`,
    officeCount: (n) => `${n} ${n === 1 ? "कार्यालय" : "कार्यालय"}`,
    officeDirectory: "कार्यालय निर्देशिका",
    allOffices: "सभी आरटीओ कार्यालय",
    officesInState: (stateName) => `${stateName} में आरटीओ कार्यालय`,
    selectToFocus: "किसी कार्यालय को मानचित्र पर देखने के लिए उसे चुनें।",
    searchPlaceholder: "कार्यालय या शहर खोजें",
    searchSrLabel: "आरटीओ कार्यालय खोजें",
    nearestBadge: "निकटतम",
    noMatches: "इस खोज से कोई आरटीओ कार्यालय मेल नहीं खाता।",
    clearSearch: "खोज साफ़ करें",
    yourLocation: "आपकी लोकेशन",
    footerNotice:
      "डेमो लोकेटर: कार्यालयों के स्थान, पते और फोन नंबर इस प्रोटोटाइप के लिए बनाया गया नमूना डेटा हैं। जाने से पहले संबंधित राज्य परिवहन विभाग से विवरण की पुष्टि करें।",
  },
};

// Standard English -> Hindi names for Indian states/UTs. This lets the page
// localize state names for display without needing the underlying
// data/rtoOffices.js file itself to carry bilingual data.
const STATE_NAME_HI = {
  "Andhra Pradesh": "आंध्र प्रदेश",
  "Arunachal Pradesh": "अरुणाचल प्रदेश",
  Assam: "असम",
  Bihar: "बिहार",
  Chhattisgarh: "छत्तीसगढ़",
  Goa: "गोवा",
  Gujarat: "गुजरात",
  Haryana: "हरियाणा",
  "Himachal Pradesh": "हिमाचल प्रदेश",
  Jharkhand: "झारखंड",
  Karnataka: "कर्नाटक",
  Kerala: "केरल",
  "Madhya Pradesh": "मध्य प्रदेश",
  Maharashtra: "महाराष्ट्र",
  Manipur: "मणिपुर",
  Meghalaya: "मेघालय",
  Mizoram: "मिज़ोरम",
  Nagaland: "नागालैंड",
  Odisha: "ओडिशा",
  Punjab: "पंजाब",
  Rajasthan: "राजस्थान",
  Sikkim: "सिक्किम",
  "Tamil Nadu": "तमिलनाडु",
  "Tamilnadu": "तमिलनाडु",
  Telangana: "तेलंगाना",
  Tripura: "त्रिपुरा",
  "Uttar Pradesh": "उत्तर प्रदेश",
  Uttarakhand: "उत्तराखंड",
  "West Bengal": "पश्चिम बंगाल",
  "Andaman and Nicobar Islands": "अंडमान और निकोबार द्वीप समूह",
  Chandigarh: "चंडीगढ़",
  "Dadra and Nagar Haveli and Daman and Diu":
    "दादरा और नगर हवेली और दमन और दीव",
  Delhi: "दिल्ली",
  "NCT of Delhi": "दिल्ली",
  "Jammu and Kashmir": "जम्मू और कश्मीर",
  Ladakh: "लद्दाख",
  Lakshadweep: "लक्षद्वीप",
  Puducherry: "पुडुचेरी",
};

function localizeStateName(name, lang) {
  if (lang !== "hi" || !name) return name;
  return STATE_NAME_HI[name] || name;
}

function localizeShortName(shortName, lang) {
  if (lang !== "hi" || !shortName) return shortName;
  return shortName.replace(/^RTO\s+/i, "आरटीओ ");
}

function localizeAddress(address, lang) {
  if (lang !== "hi" || !address) return address;
  return address
    .split(",")
    .map((part) => {
      const trimmed = part.trim();
      if (trimmed === "Transport Department Campus") return "परिवहन विभाग परिसर";
      return STATE_NAME_HI[trimmed] || trimmed;
    })
    .join(", ");
}

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

function RtoMap({ offices, userLocation, focusedOffice, onOfficeSelect, lang, copy }) {
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
              <strong>{localizeShortName(office.shortName, lang)}</strong>
              <br />
              {localizeAddress(office.address, lang)}
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
          <Popup>{copy.yourLocation}</Popup>
        </CircleMarker>
      )}
    </MapContainer>
  );
}

export default function RtoLocator() {
  const { i18n } = useTranslation();
  const lang = i18n.language === "hi" ? "hi" : "en";
  const copy = COPY[lang];

  const [stateCode, setStateCode] = useState("");
  const [officeQuery, setOfficeQuery] = useState("");
  const [userLocation, setUserLocation] = useState(null);
  const [locationStatus, setLocationStatus] = useState("idle");
  const [locationError, setLocationError] = useState("");
  const [focusedOffice, setFocusedOffice] = useState(null);

  const selectedState = RTO_STATES.find((state) => state.code === stateCode);
  const selectedStateName = selectedState ? localizeStateName(selectedState.name, lang) : "";

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
      setLocationError(copy.locationUnsupported);
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
        setLocationError(copy.locationDenied);
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
            {copy.backToHome}
          </Link>
          <div className="mt-7 max-w-3xl">
            <p className="eyebrow eyebrow-light">{copy.eyebrow}</p>
            <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
              {copy.title}
            </h1>
            <p className="mt-4 max-w-2xl text-blue-100 leading-relaxed">
              {copy.description}
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
                <p className="eyebrow">{copy.step1}</p>
                <h2 className="mt-1 text-xl font-bold text-navy-950">{copy.chooseState}</h2>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                  {copy.chooseStateHint}
                </p>
              </div>
            </div>

            <label className="mt-6 block text-sm font-semibold text-navy-950" htmlFor="rto-state">
              {copy.stateLabel}
            </label>
            <select
              id="rto-state"
              value={stateCode}
              onChange={chooseState}
              className="mt-2 form-input w-full"
            >
              <option value="">{copy.allStates}</option>
              {RTO_STATES.map((state) => (
                <option key={state.code} value={state.code}>
                  {localizeStateName(state.name, lang)}
                </option>
              ))}
            </select>

            {selectedState && (
              <button
                type="button"
                onClick={showAllOffices}
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-700 hover:text-navy-950 focus-ring rounded"
              >
                <X size={15} aria-hidden="true" /> {copy.viewAll}
              </button>
            )}

            <div className="mt-7 border-t border-slate-100 pt-6">
              <div className="flex items-start gap-3">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-700">
                  <LocateFixed size={21} aria-hidden="true" />
                </span>
                <div>
                  <p className="eyebrow">{copy.step2}</p>
                  <h2 className="mt-1 text-lg font-bold text-navy-950">{copy.nearestRto}</h2>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    {copy.nearestHint(selectedStateName)}
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
                {locationStatus === "loading" ? copy.findingLocation : copy.useMyLocation}
              </button>
              {locationError && <p className="mt-3 text-sm text-red-700">{locationError}</p>}

              {nearestOffice && (
                <button
                  type="button"
                  onClick={focusNearestOffice}
                  className="nearest-rto-card mt-5 w-full text-left focus-ring"
                >
                  <span className="nearest-rto-label">{copy.nearestSeeded}</span>
                  <span className="mt-1 block font-bold text-navy-950">
                    {localizeShortName(nearestOffice.office.shortName, lang)}
                  </span>
                  <span className="mt-1 block text-sm text-slate-600">
                    {copy.kmAway(nearestOffice.distance.toFixed(1))}
                  </span>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-navy-800">
                    {copy.showOnMap} <span aria-hidden="true">→</span>
                  </span>
                </button>
              )}
            </div>
          </aside>

          <div className="surface-card overflow-hidden">
            <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div>
                <p className="eyebrow">{copy.interactiveMap}</p>
                <h2 className="mt-1 text-xl font-bold text-navy-950">
                  {selectedState ? copy.stateOffices(selectedStateName) : copy.allLocators}
                </h2>
              </div>
              <span className="inline-flex w-fit rounded-full bg-blue-50 px-3 py-1.5 text-sm font-semibold text-navy-800">
                {copy.officeCount(visibleOffices.length)}
              </span>
            </div>
            <RtoMap
              offices={visibleOffices}
              userLocation={userLocation}
              focusedOffice={focusedOffice}
              onOfficeSelect={setFocusedOffice}
              lang={lang}
              copy={copy}
            />
          </div>
        </div>

        <div className="mt-8 surface-card overflow-hidden">
          <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-5 sm:px-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="eyebrow">{copy.officeDirectory}</p>
              <h2 className="mt-1 text-xl font-bold text-navy-950">
                {selectedState ? copy.officesInState(selectedStateName) : copy.allOffices}
              </h2>
              <p className="mt-1 text-sm text-slate-600">{copy.selectToFocus}</p>
            </div>
            <label className="relative block w-full lg:max-w-sm" htmlFor="office-search">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} aria-hidden="true" />
              <span className="sr-only">{copy.searchSrLabel}</span>
              <input
                id="office-search"
                value={officeQuery}
                onChange={(event) => {
                  setOfficeQuery(event.target.value);
                  setFocusedOffice(null);
                }}
                placeholder={copy.searchPlaceholder}
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
                          <h3 className="font-bold text-navy-950">
                            {localizeShortName(office.shortName, lang)}
                          </h3>
                          {isNearest && <span className="nearest-rto-label">{copy.nearestBadge}</span>}
                        </div>
                        <p className="mt-1 text-sm font-medium text-slate-600">
                          {localizeStateName(office.state, lang)}
                        </p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-slate-600">
                      {localizeAddress(office.address, lang)}
                    </p>
                    <p className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-navy-800">
                      <Phone size={15} aria-hidden="true" /> {office.phone}
                    </p>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="px-6 py-12 text-center">
              <p className="font-semibold text-navy-950">{copy.noMatches}</p>
              <button type="button" onClick={() => setOfficeQuery("")} className="mt-3 text-sm font-semibold text-navy-700 underline">
                {copy.clearSearch}
              </button>
            </div>
          )}
        </div>

        <p className="mt-5 text-xs leading-relaxed text-slate-500">{copy.footerNotice}</p>
      </section>
    </div>
  );
}