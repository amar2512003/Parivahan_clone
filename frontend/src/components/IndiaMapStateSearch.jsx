import { useEffect, useMemo, useRef, useState } from "react";
import { INDIA_MAP_PATHS, INDIA_MAP_VIEWBOX } from "../data/indiaMapPaths";

/**
 * Maps our SERVICE_REGIONS state codes to the state/UT name used inside the
 * background SVG map data (a couple of names differ slightly from the
 * "official" modern name, e.g. Odisha -> "Orissa", Uttarakhand -> "Uttaranchal").
 */
const CODE_TO_MAP_NAME = {
  AP: "Andhra Pradesh",
  AR: "Arunachal Pradesh",
  AS: "Assam",
  BR: "Bihar",
  CG: "Chhattisgarh",
  GA: "Goa",
  GJ: "Gujarat",
  HR: "Haryana",
  HP: "Himachal Pradesh",
  JH: "Jharkhand",
  KA: "Karnataka",
  KL: "Kerala",
  MP: "Madhya Pradesh",
  MH: "Maharashtra",
  MN: "Manipur",
  ML: "Meghalaya",
  MZ: "Mizoram",
  NL: "Nagaland",
  OD: "Orissa",
  PB: "Punjab",
  RJ: "Rajasthan",
  SK: "Sikkim",
  TN: "Tamil Nadu",
  TS: "Telangana",
  TR: "Tripura",
  UK: "Uttaranchal",
  UP: "Uttar Pradesh",
  WB: "West Bengal",
  JK: "Jammu and Kashmir",
};

const MAP_NAME_TO_CODE = Object.fromEntries(
  Object.entries(CODE_TO_MAP_NAME).map(([code, name]) => [name, code])
);

const SELECT_DELAY_MS = 420;

/**
 * @param {{
 *   regions: { code: string, name: string }[],
 *   onSelectState: (state: { code: string, name: string }) => void,
 *   eyebrow?: string,
 *   title?: string,
 *   description?: string,
 *   placeholder?: string,
 *   noMatchLabel?: string,
 *   hintLabel?: string,
 * }} props
 */
export default function IndiaMapStateSearch({
  regions,
  onSelectState,
  eyebrow = "Driving licence services",
  title = "Start with your state",
  description = "Search for your state and we'll take you straight to its services.",
  placeholder = "Search a state\u2026",
  noMatchLabel = "No state matches",
  hintLabel = `${regions?.length ?? 0} states / regions available`,
}) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [hoverName, setHoverName] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const inputRef = useRef(null);
  const rootRef = useRef(null);

  const filteredRegions = useMemo(() => {
    const search = query.trim().toLowerCase();
    if (!search) return regions;
    return regions.filter((state) =>
      state.name.toLowerCase().includes(search)
    );
  }, [query, regions]);

  useEffect(() => {
    setActiveIndex(filteredRegions.length ? 0 : -1);
  }, [filteredRegions]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function commitSelection(state) {
    if (!state || selectedState) return;
    setSelectedState(state);
    setQuery(state.name);
    setIsOpen(false);
    inputRef.current?.blur();
    window.setTimeout(() => {
      onSelectState(state);
    }, SELECT_DELAY_MS);
  }

  function handleKeyDown(event) {
    if (!isOpen && (event.key === "ArrowDown" || event.key === "ArrowUp")) {
      setIsOpen(true);
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((prev) =>
        filteredRegions.length ? (prev + 1) % filteredRegions.length : -1
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((prev) =>
        filteredRegions.length
          ? (prev - 1 + filteredRegions.length) % filteredRegions.length
          : -1
      );
    } else if (event.key === "Enter") {
      event.preventDefault();
      const target = filteredRegions[activeIndex] || filteredRegions[0];
      if (target) commitSelection(target);
    } else if (event.key === "Escape") {
      setIsOpen(false);
    }
  }

  // Live highlight priority: a state that's mid-selection (about to navigate)
  // beats whatever's hovered, which beats an unambiguous typed match.
  // Resolve through CODE_TO_MAP_NAME since a few names differ from the map
  // data (e.g. Odisha -> "Orissa", Uttarakhand -> "Uttaranchal").
  const autoMatchState =
    !hoverName && query.trim() && filteredRegions.length === 1
      ? filteredRegions[0]
      : null;

  const activeMapName = selectedState
    ? CODE_TO_MAP_NAME[selectedState.code]
    : hoverName || (autoMatchState ? CODE_TO_MAP_NAME[autoMatchState.code] : null);

  function handlePathEnter(mapName) {
    if (selectedState) return;
    if (!MAP_NAME_TO_CODE[mapName]) return;
    setHoverName(mapName);
  }

  function handlePathLeave() {
    setHoverName(null);
  }

  function handlePathClick(mapName) {
    const code = MAP_NAME_TO_CODE[mapName];
    if (!code) return;
    const state = regions.find((r) => r.code === code);
    if (state) commitSelection(state);
  }

  return (
    <section className="imss-root" ref={rootRef}>
      <div className="imss-copy">
        <p className="imss-eyebrow">{eyebrow}</p>
        <h2 className="imss-title">{title}</h2>
        <p className="imss-description">{description}</p>
      </div>

      <div className="imss-stage">
        <svg
          className="imss-svg"
          viewBox={INDIA_MAP_VIEWBOX}
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Map of India"
        >
          {INDIA_MAP_PATHS.map((state) => {
            const code = MAP_NAME_TO_CODE[state.name];
            const isSelectable = Boolean(code);
            const isActive = activeMapName === state.name;
            const isSelected = Boolean(
              selectedState && CODE_TO_MAP_NAME[selectedState.code] === state.name
            );

            const classNames = [
              "imss-path",
              isSelectable ? "imss-path--selectable" : "imss-path--muted",
              isActive ? "imss-path--active" : "",
              isSelected ? "imss-path--selected" : "",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <path
                key={state.name}
                d={state.d}
                className={classNames}
                onMouseEnter={
                  isSelectable ? () => handlePathEnter(state.name) : undefined
                }
                onMouseLeave={isSelectable ? handlePathLeave : undefined}
                onClick={
                  isSelectable ? () => handlePathClick(state.name) : undefined
                }
              >
                {isSelectable && <title>{state.name}</title>}
              </path>
            );
          })}
        </svg>

        <div className="imss-search-wrap">
          <div className={`imss-search ${isOpen ? "imss-search--open" : ""}`}>
            <span className="imss-search-icon" aria-hidden="true">
              ⌕
            </span>
            <input
              ref={inputRef}
              className="imss-input"
              value={query}
              placeholder={placeholder}
              disabled={Boolean(selectedState)}
              onChange={(event) => {
                setQuery(event.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              onKeyDown={handleKeyDown}
              role="combobox"
              aria-expanded={isOpen}
              aria-controls="imss-listbox"
              aria-autocomplete="list"
              aria-label="Search for a state"
            />
            {query && !selectedState && (
              <button
                type="button"
                className="imss-clear"
                aria-label="Clear search"
                onClick={() => {
                  setQuery("");
                  setIsOpen(true);
                  inputRef.current?.focus();
                }}
              >
                ×
              </button>
            )}
          </div>

          {isOpen && !selectedState && (
            <ul id="imss-listbox" role="listbox" className="imss-listbox">
              {filteredRegions.length === 0 && (
                <li className="imss-empty">
                  {noMatchLabel} “{query}”.
                </li>
              )}
              {filteredRegions.map((state, index) => (
                <li
                  key={state.code}
                  role="option"
                  aria-selected={index === activeIndex}
                  className={`imss-option ${
                    index === activeIndex ? "imss-option--active" : ""
                  }`}
                  onMouseEnter={() => {
                    setActiveIndex(index);
                    setHoverName(CODE_TO_MAP_NAME[state.code]);
                  }}
                  onMouseLeave={() => setHoverName(null)}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => commitSelection(state)}
                >
                  <span className="imss-option-code">{state.code}</span>
                  <span>{state.name}</span>
                </li>
              ))}
            </ul>
          )}

          {!isOpen && !selectedState && (
            <p className="imss-hint">{hintLabel}</p>
          )}

          {selectedState && (
            <p className="imss-hint imss-hint--selected">
              {selectedState.name} selected — opening services…
            </p>
          )}
        </div>
      </div>

      <style>{`
        .imss-root {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .imss-copy { max-width: 42rem; }
        .imss-eyebrow {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #2563eb;
          margin: 0 0 0.35rem;
        }
        .imss-title {
          font-size: 1.75rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          color: #0b1d3a;
          margin: 0 0 0.5rem;
        }
        .imss-description {
          color: #64748b;
          line-height: 1.55;
          margin: 0;
        }

        .imss-stage {
          position: relative;
          width: 100%;
          min-height: 560px;
          border-radius: 1.5rem;
          background: radial-gradient(120% 120% at 50% 0%, #eef3fb 0%, #e2e8f0 60%, #dbe4f0 100%);
          border: 1px solid #e2e8f0;
          overflow: hidden;
        }
        @media (min-width: 640px) {
          .imss-stage { min-height: 680px; }
        }

        .imss-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          padding: 2rem 0;
        }

        .imss-path {
          transition: fill 0.25s ease, stroke 0.25s ease, stroke-width 0.25s ease, filter 0.25s ease;
        }
        .imss-path--muted {
          fill: #e7ecf3;
          stroke: #d3dbe6;
          stroke-width: 0.6;
          pointer-events: none;
        }
        .imss-path--selectable {
          fill: #c7d2e1;
          stroke: #94a3b8;
          stroke-width: 0.6;
          cursor: pointer;
        }
        .imss-path--selectable:hover {
          fill: #a9bad6;
        }
        .imss-path--active {
          fill: #5b8def;
          stroke: #1d4ed8;
          stroke-width: 2.6;
          filter: drop-shadow(0 0 6px rgba(29, 78, 216, 0.55));
        }
        .imss-path--selected {
          fill: #1d4ed8;
          stroke: #0b1d3a;
          stroke-width: 3;
          filter: drop-shadow(0 0 10px rgba(29, 78, 216, 0.75));
          animation: imss-pulse 0.9s ease-in-out infinite;
        }
        @keyframes imss-pulse {
          0%, 100% { filter: drop-shadow(0 0 6px rgba(29, 78, 216, 0.55)); }
          50% { filter: drop-shadow(0 0 16px rgba(29, 78, 216, 0.9)); }
        }

        .imss-search-wrap {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: min(420px, 88%);
          display: flex;
          flex-direction: column;
          align-items: stretch;
          z-index: 2;
        }

        .imss-search {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(6px);
          border: 1px solid #cbd5e1;
          border-radius: 999px;
          padding: 0.85rem 1.1rem;
          box-shadow: 0 10px 30px -8px rgba(15, 23, 42, 0.25);
          transition: box-shadow 0.2s ease, border-color 0.2s ease;
        }
        .imss-search--open,
        .imss-search:focus-within {
          border-color: #2563eb;
          box-shadow: 0 14px 34px -10px rgba(37, 99, 235, 0.4);
        }
        .imss-search-icon {
          font-size: 1.1rem;
          color: #64748b;
          transform: rotate(90deg);
        }
        .imss-input {
          flex: 1;
          border: none;
          outline: none;
          background: transparent;
          font-size: 1rem;
          color: #0b1d3a;
        }
        .imss-input::placeholder { color: #94a3b8; }
        .imss-input:disabled { color: #1d4ed8; font-weight: 600; }
        .imss-clear {
          border: none;
          background: #eef2f7;
          color: #64748b;
          width: 1.5rem;
          height: 1.5rem;
          border-radius: 999px;
          font-size: 1rem;
          line-height: 1;
          cursor: pointer;
        }
        .imss-clear:hover { background: #e2e8f0; }

        .imss-listbox {
          list-style: none;
          margin: 0.6rem 0 0;
          padding: 0.4rem;
          max-height: 15rem;
          overflow-y: auto;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 1rem;
          box-shadow: 0 16px 32px -12px rgba(15, 23, 42, 0.3);
        }
        .imss-option {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.55rem 0.7rem;
          border-radius: 0.65rem;
          font-size: 0.92rem;
          color: #1e293b;
          cursor: pointer;
        }
        .imss-option--active { background: #eaf1ff; }
        .imss-option-code {
          font-size: 0.7rem;
          font-weight: 700;
          color: #2563eb;
          background: #dbe6ff;
          border-radius: 0.4rem;
          padding: 0.15rem 0.4rem;
          min-width: 2rem;
          text-align: center;
        }
        .imss-empty {
          padding: 0.75rem;
          font-size: 0.85rem;
          color: #64748b;
          text-align: center;
        }

        .imss-hint {
          margin: 0.6rem auto 0;
          font-size: 0.8rem;
          color: #64748b;
          text-align: center;
        }
        .imss-hint--selected {
          color: #1d4ed8;
          font-weight: 600;
        }
      `}</style>
    </section>
  );
}
