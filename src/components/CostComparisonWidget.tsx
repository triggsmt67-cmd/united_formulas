"use client";

import { useState, useCallback } from "react";
import Link from "next/link";

// Parse dilution input: accepts "1:64", "64:1", "1 oz/gal", "64", etc.
// Returns the number of parts water per 1 part concentrate.
function parseDilution(raw: string): number | null {
  const s = raw.trim().toLowerCase().replace(/\s+/g, " ");

  // "1 oz/gal" or "2 oz per gallon" → ratio = 128/oz
  const ozMatch = s.match(/^([\d.]+)\s*(?:oz|ounce)s?\s*(?:\/|per)\s*gal(?:lon)?s?$/);
  if (ozMatch) {
    const oz = parseFloat(ozMatch[1]);
    if (oz > 0) return Math.round(128 / oz);
  }

  // "1:64" or "64:1" — normalise to parts-water per part-concentrate
  const ratioMatch = s.match(/^([\d.]+)\s*:\s*([\d.]+)$/);
  if (ratioMatch) {
    const a = parseFloat(ratioMatch[1]);
    const b = parseFloat(ratioMatch[2]);
    if (a <= 0 || b <= 0) return null;
    return a <= b ? Math.round(b / a) : Math.round(a / b);
  }

  // bare number like "64"
  const bare = parseFloat(s);
  if (!isNaN(bare) && bare > 0) return Math.round(bare);

  return null;
}

function calcCPG(
  containerPriceStr: string,
  sizeStr: string,
  dilutionStr: string
): number | null {
  const price = parseFloat(containerPriceStr.replace(/[$,]/g, ""));
  const size = parseFloat(sizeStr);
  const ratio = parseDilution(dilutionStr);

  if (isNaN(price) || price <= 0) return null;
  if (isNaN(size) || size <= 0) return null;
  if (ratio === null || ratio <= 0) return null;

  const usableGallons = size * (ratio + 1);
  return price / usableGallons;
}

function fmt(n: number): string {
  return `$${n.toFixed(2)}`;
}

// Delta Green Professional reference — locked
const UF_PRICE = "121.00";
const UF_SIZE = "5";
const UF_DILUTION = "1:64";
const UF_NAME = "Delta Green Professional (5-gal)";
const UF_CPG = calcCPG(UF_PRICE, UF_SIZE, UF_DILUTION)!;

// Visitor defaults — 1:4 concentrate at $60/5 gal (realistic category typical)
const DEFAULT_PRICE = "60.00";
const DEFAULT_SIZE = "5";
const DEFAULT_DILUTION = "1:4";

export default function CostComparisonWidget() {
  const [price, setPrice] = useState(DEFAULT_PRICE);
  const [size, setSize] = useState(DEFAULT_SIZE);
  const [dilution, setDilution] = useState(DEFAULT_DILUTION);

  const theirCPG = calcCPG(price, size, dilution);
  const dilutionRatio = parseDilution(dilution);
  const theirUsable = (() => {
    const s = parseFloat(size);
    const r = dilutionRatio;
    if (!isNaN(s) && s > 0 && r !== null && r > 0)
      return (s * (r + 1)).toFixed(0);
    return null;
  })();

  const savings =
    theirCPG !== null && theirCPG > UF_CPG ? theirCPG - UF_CPG : null;
  const savingsPct =
    savings !== null && theirCPG !== null
      ? Math.round((savings / theirCPG) * 100)
      : null;

  const dilutionInvalid =
    dilution.trim() !== "" && parseDilution(dilution) === null;

  // silence lint
  const _hint = useCallback(() => {}, []);

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden shadow-sm">
      <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200">

        {/* LEFT — United Formulas, locked */}
        <div className="p-6 sm:p-8 bg-white">
          <div className="flex items-center gap-2 mb-5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-cyan-50 text-cyan-800 border border-cyan-200">
              <span
                className="w-1.5 h-1.5 rounded-full bg-cyan-500"
                aria-hidden="true"
              />
              United Formulas
            </span>
            <span className="text-[11px] text-slate-400 font-medium">Locked</span>
          </div>

          <p className="text-sm font-semibold text-slate-700 mb-4">{UF_NAME}</p>

          <dl className="space-y-0 text-sm mb-5">
            {[
              ["Container price", `$${UF_PRICE}`],
              ["Container size", `${UF_SIZE} gal`],
              ["Dilution ratio", UF_DILUTION],
              ["Usable gallons", "325 gal"],
            ].map(([label, val]) => (
              <div
                key={label}
                className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0"
              >
                <dt className="text-slate-500">{label}</dt>
                <dd className="font-semibold text-slate-900 font-mono">{val}</dd>
              </div>
            ))}
          </dl>

          <div className="rounded-xl bg-cyan-950 px-5 py-4 text-center">
            <p className="text-[11px] font-bold uppercase tracking-widest text-cyan-400 mb-1">
              Cost per working gallon
            </p>
            <p className="text-4xl font-black text-white tracking-tight">
              {fmt(UF_CPG)}
            </p>
          </div>
        </div>

        {/* RIGHT — Their product, editable */}
        <div className="p-6 sm:p-8">
          <div className="mb-5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200">
              What you&apos;re buying now
            </span>
          </div>

          <p className="text-sm text-slate-500 mb-4">
            Fill in your current product details.
          </p>

          <div className="space-y-4 mb-5">
            {/* Price */}
            <label className="block">
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide block mb-1.5">
                Container price
              </span>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm select-none">
                  $
                </span>
                <input
                  type="text"
                  inputMode="decimal"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full pl-7 pr-3 py-2.5 border border-slate-200 rounded-lg text-sm font-mono text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition"
                  placeholder="60.00"
                  aria-label="Container price"
                />
              </div>
            </label>

            {/* Size */}
            <label className="block">
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide block mb-1.5">
                Container size
              </span>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm font-mono text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition pr-12"
                  placeholder="5"
                  aria-label="Container size in gallons"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs select-none">
                  gal
                </span>
              </div>
            </label>

            {/* Dilution */}
            <label className="block">
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wide block mb-1.5">
                Dilution ratio
              </span>
              <input
                type="text"
                value={dilution}
                onChange={(e) => setDilution(e.target.value)}
                onFocus={_hint}
                className={`w-full px-3 py-2.5 border rounded-lg text-sm font-mono text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition ${
                  dilutionInvalid
                    ? "border-rose-400 bg-rose-50"
                    : "border-slate-200"
                }`}
                placeholder="1:64"
                aria-label="Dilution ratio"
                aria-describedby="dilution-hint"
              />
              <p
                id="dilution-hint"
                className="mt-1.5 text-[11px] text-slate-400 leading-snug"
              >
                Use <strong>1:64</strong> or <strong>64:1</strong> — or ounces
                per gallon like <strong>2 oz/gal</strong>.{" "}
                <span className="whitespace-nowrap">
                  1&nbsp;oz/gal = 1:128.
                </span>
                {dilutionInvalid && (
                  <span className="block text-rose-500 font-medium mt-0.5">
                    Check the format above.
                  </span>
                )}
              </p>
            </label>
          </div>

          {/* Result */}
          <div
            className={`rounded-xl px-5 py-4 text-center transition-colors ${
              theirCPG === null
                ? "bg-slate-100"
                : savings !== null
                ? "bg-rose-950"
                : "bg-slate-800"
            }`}
          >
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-300 mb-1">
              Cost per working gallon
            </p>
            {theirCPG !== null ? (
              <>
                <p
                  className={`text-4xl font-black tracking-tight ${
                    savings !== null ? "text-rose-300" : "text-white"
                  }`}
                >
                  {fmt(theirCPG)}
                </p>
                {theirUsable && (
                  <p className="text-xs text-slate-400 mt-1">
                    {theirUsable} usable gallons from this container
                  </p>
                )}
              </>
            ) : (
              <p className="text-2xl font-bold text-slate-400">—</p>
            )}
          </div>
        </div>
      </div>

      {/* Savings banner */}
      {savings !== null && savingsPct !== null && (
        <div className="bg-cyan-950 border-t border-cyan-900 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-sm text-cyan-100">
            <span className="font-bold text-white">{fmt(savings)} cheaper per gallon.</span>{" "}
            That&apos;s{" "}
            <span className="font-bold text-cyan-300">{savingsPct}% less</span> per
            working gallon — before freight, storage, or labor is counted.
          </p>
        </div>
      )}

      {/* CTAs */}
      <div className="border-t border-slate-200 px-6 sm:px-8 py-5 bg-white flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <Link
          href="/contact?request=audit"
          className="inline-flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors shadow-sm whitespace-nowrap"
        >
          Get these numbers checked at your building — free
          <span aria-hidden="true">↗</span>
        </Link>
        <Link
          href="/cost-calculator"
          className="text-sm font-medium text-slate-500 hover:text-cyan-700 transition-colors inline-flex items-center gap-1.5"
        >
          See the full cost picture including freight and labor
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
