"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

const money = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);

export default function TotalCostCalculator() {
  const [concentratePrice, setConcentratePrice] = useState(42);
  const [ratio, setRatio] = useState(64);
  const [rtuPrice, setRtuPrice] = useState(18);
  const [monthlyGallons, setMonthlyGallons] = useState(30);
  const [currentFreight, setCurrentFreight] = useState(600);
  const [proposedFreight, setProposedFreight] = useState(0);
  const [hoursSaved, setHoursSaved] = useState(2);
  const [hourlyCost, setHourlyCost] = useState(24);

  const result = useMemo(() => {
    const usableYield = Math.max(1, ratio + 1);
    const ufPerGallon = concentratePrice / usableYield;
    const annualUse = monthlyGallons * 12;
    const currentAnnual = annualUse * rtuPrice + currentFreight;
    const proposedAnnual = annualUse * ufPerGallon + proposedFreight;
    const labor = hoursSaved * hourlyCost * 12;
    return { usableYield, ufPerGallon, annualUse, currentAnnual, proposedAnnual, labor, savings: currentAnnual - proposedAnnual + labor, concentrateGallons: annualUse / usableYield };
  }, [concentratePrice, ratio, rtuPrice, monthlyGallons, currentFreight, proposedFreight, hoursSaved, hourlyCost]);

  const fields = [
    ["Concentrate price per gallon", concentratePrice, setConcentratePrice, 1],
    ["Dilution ratio: 1 part to", ratio, setRatio, 1],
    ["Current ready-to-use cost per gallon", rtuPrice, setRtuPrice, 1],
    ["Ready-to-use gallons used each month", monthlyGallons, setMonthlyGallons, 1],
    ["Current annual freight", currentFreight, setCurrentFreight, 25],
    ["Estimated UF annual freight", proposedFreight, setProposedFreight, 25],
    ["Labor hours saved each month", hoursSaved, setHoursSaved, .5],
    ["Loaded hourly labor cost", hourlyCost, setHourlyCost, 1],
  ] as const;

  return <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr]">
    <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8"><h2 className="text-2xl font-bold">Build the comparison</h2><p className="mt-2 text-sm leading-relaxed text-slate-600">Use invoice and usage numbers when available. Every assumption remains visible and editable.</p><div className="mt-7 grid gap-4 sm:grid-cols-2">{fields.map(([label,value,setter,step]) => <label key={label} className="text-sm font-bold text-slate-700">{label}<input type="number" min="0" step={step} value={value} onChange={(e)=>setter(Number(e.target.value))} className="mt-2 w-full rounded-xl border border-slate-200 p-3 font-normal outline-none focus:ring-2 focus:ring-cyan-500" /></label>)}</div></div>
    <div className="rounded-3xl bg-slate-950 p-6 text-white sm:p-8"><p className="text-xs font-bold uppercase tracking-[.2em] text-cyan-300">Estimated operating impact</p><div className="mt-6 grid grid-cols-2 gap-4"><Result label="Cost per usable gallon" value={`$${result.ufPerGallon.toFixed(2)}`} /><Result label="Usable yield" value={`${result.usableYield} gal`} /><Result label="Current annual product + freight" value={money(result.currentAnnual)} /><Result label="UF product + freight estimate" value={money(result.proposedAnnual)} /></div><div className="mt-6 rounded-2xl bg-cyan-500 p-6 text-slate-950"><p className="text-xs font-black uppercase tracking-widest">Potential annual impact</p><p className="mt-2 text-4xl font-black">{money(result.savings)}</p><p className="mt-2 text-sm font-semibold">Includes {money(result.labor)} in entered labor savings.</p></div><div className="mt-6 text-sm leading-relaxed text-slate-300"><p>Annual ready-to-use volume: <strong className="text-white">{result.annualUse.toFixed(0)} gallons</strong></p><p>Estimated concentrate required: <strong className="text-white">{result.concentrateGallons.toFixed(1)} gallons</strong></p><p className="mt-3 text-xs text-slate-400">Planning estimate only. Dilution ratios assume water conditioners neutralize local mineral hardness (7.4–9.8 GPG in Great Falls; higher on rural wells). Validate price, water hardness, dilution, and cleaning performance during an on-site audit.</p></div><Link href="/contact?request=audit" className="mt-6 inline-flex rounded-xl bg-white px-5 py-3 font-bold text-slate-950">Validate this with an audit</Link></div>
  </div>;
}

function Result({ label, value }: { label: string; value: string }) { return <div className="rounded-2xl border border-white/10 bg-white/5 p-4"><p className="text-xs leading-snug text-slate-400">{label}</p><p className="mt-2 text-2xl font-bold">{value}</p></div>; }
