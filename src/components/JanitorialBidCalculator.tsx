"use client";

import { useState } from "react";
import Link from "next/link";

interface JanitorialBidCalculatorProps {
    className?: string;
}

export default function JanitorialBidCalculator({ className = "" }: JanitorialBidCalculatorProps) {
    const [sqFt, setSqFt] = useState<number>(25000);
    const [frequency, setFrequency] = useState<3 | 5 | 7>(5);
    const [isWinterSeason, setIsWinterSeason] = useState<boolean>(true);

    const currencyFormatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    });

    // Shifts per month mapping
    const shiftsPerMonth = frequency === 3 ? 13 : frequency === 5 ? 22 : 30;

    // Chemical cost math ($0.10/1,000 sq ft for UF high-yield concentrate vs $0.52/1,000 sq ft for retail RTU)
    const concentrateCostPer1k = 0.10;
    const retailCostPer1k = 0.52;

    const monthlyUfChemicalCost = (sqFt / 1000) * shiftsPerMonth * concentrateCostPer1k;
    const monthlyRetailChemicalCost = (sqFt / 1000) * shiftsPerMonth * retailCostPer1k;
    const monthlyChemicalSavings = Math.max(0, monthlyRetailChemicalCost - monthlyUfChemicalCost);

    // Van bottles eliminated: A 3-product calibrated system replaces ~9 redundant aerosol cans and RTU bottles
    const bottlesEliminated = 9;

    // Winter labor hours saved math: 15 min (0.25 hrs) per 5,000 sq ft per shift
    const hoursSavedPerShift = isWinterSeason ? (sqFt / 5000) * 0.25 : 0;
    const monthlyLaborHoursSaved = Math.round(hoursSavedPerShift * shiftsPerMonth);
    const hourlyLaborRate = 20; // Loaded labor rate: $16/hr base + employer burden ($20/hr)
    const monthlyLaborCostSaved = monthlyLaborHoursSaved * hourlyLaborRate;

    const totalMonthlyValue = monthlyChemicalSavings + monthlyLaborCostSaved;
    // Seasonally weighted annual calculation: 12 months chemical savings + 7 months winter salt labor
    const projectedAnnualValue = Math.round(
        (monthlyChemicalSavings * 12) + (isWinterSeason ? monthlyLaborCostSaved * 7 : 0)
    );

    // Quick size presets
    const presets = [
        { label: "10K sq ft", value: 10000, desc: "Clinic / Medical" },
        { label: "25K sq ft", value: 25000, desc: "Multi-Tenant Office" },
        { label: "50K sq ft", value: 50000, desc: "School / Corporate" },
        { label: "75K sq ft", value: 75000, desc: "Commercial Campus" },
    ];

    return (
        <section
            id="janitorial-calculator"
            aria-labelledby="janitorial-calculator-heading"
            className={`bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm mt-12 mb-12 scroll-mt-24 relative overflow-hidden ${className}`}
        >
            {/* Ambient background glow */}
            <div
                className="absolute top-0 right-0 w-96 h-96 bg-cyan-50/60 rounded-full blur-3xl pointer-events-none -z-10"
                aria-hidden="true"
            />

            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-10">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold uppercase tracking-wider mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg>
                        Building Service Contractor (BSC) Bid Model
                    </div>
                    <h2
                        id="janitorial-calculator-heading"
                        className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-3"
                    >
                        Janitorial Chemical & Labor Margin Calculator
                    </h2>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                        Calculate how standardizing on Montana-formulated high-yield concentrates cuts your chemical spend and recovers lost labor hours spent mopping winter road salt residue.
                    </p>
                </div>

                {/* Main Two-Column Tool */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    {/* Controls Column */}
                    <div className="lg:col-span-6 space-y-6 bg-slate-50/70 p-6 sm:p-8 rounded-3xl border border-slate-200 flex flex-col justify-between">
                        <div className="space-y-6">
                            {/* Input 1: Square Footage Slider */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label
                                        htmlFor="cleanable-sqft-slider"
                                        className="text-xs font-bold uppercase tracking-wider text-slate-700"
                                    >
                                        Cleanable Commercial Area
                                    </label>
                                    <span className="text-base font-extrabold text-cyan-800 bg-cyan-100/70 px-3 py-1 rounded-lg">
                                        {sqFt.toLocaleString()} sq ft
                                    </span>
                                </div>
                                <input
                                    id="cleanable-sqft-slider"
                                    type="range"
                                    min={5000}
                                    max={100000}
                                    step={2500}
                                    value={sqFt}
                                    onChange={(e) => setSqFt(Number(e.target.value))}
                                    className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                />
                                <div className="flex justify-between text-[11px] text-slate-400 font-semibold mt-1">
                                    <span>5,000 sq ft</span>
                                    <span>50,000 sq ft</span>
                                    <span>100,000 sq ft</span>
                                </div>

                                {/* Preset Buttons */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
                                    {presets.map((preset) => (
                                        <button
                                            key={preset.value}
                                            type="button"
                                            onClick={() => setSqFt(preset.value)}
                                            className={`px-2.5 py-1.5 rounded-xl text-left border transition-all text-xs cursor-pointer ${
                                                sqFt === preset.value
                                                    ? "bg-cyan-600 text-white border-cyan-600 font-bold shadow-xs"
                                                    : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 font-medium"
                                            }`}
                                        >
                                            <span className="block font-semibold">{preset.label}</span>
                                            <span className={`block text-[10px] truncate ${sqFt === preset.value ? "text-cyan-100" : "text-slate-400"}`}>
                                                {preset.desc}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Input 2: Service Frequency */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                                    Service Frequency (Shifts per Week)
                                </label>
                                <div className="grid grid-cols-3 gap-2.5">
                                    {([3, 5, 7] as const).map((nights) => {
                                        const isSelected = frequency === nights;
                                        return (
                                            <button
                                                key={nights}
                                                type="button"
                                                onClick={() => setFrequency(nights)}
                                                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                                                    isSelected
                                                        ? "bg-cyan-600 text-white border-cyan-600 shadow-md font-bold"
                                                        : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 font-semibold"
                                                }`}
                                            >
                                                <span className="block text-sm font-bold">{nights} Nights/Wk</span>
                                                <span className={`block text-[10px] mt-0.5 ${isSelected ? "text-cyan-100" : "text-slate-400"}`}>
                                                    ~{nights === 3 ? 13 : nights === 5 ? 22 : 30} shifts/mo
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Input 3: Prominent Winter De-Icer Tracking Season Toggle */}
                            <div className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 ${
                                isWinterSeason 
                                    ? "bg-gradient-to-br from-cyan-50 to-blue-50/80 border-cyan-300 shadow-sm" 
                                    : "bg-white border-slate-200"
                            }`}>
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                                                Montana Winter Road Salt Season
                                            </span>
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                                                isWinterSeason
                                                    ? "bg-cyan-600 text-white shadow-xs"
                                                    : "bg-slate-200 text-slate-600"
                                            }`}>
                                                {isWinterSeason ? "Active (Oct–Apr)" : "Off"}
                                            </span>
                                        </div>
                                        <p className="text-xs text-slate-600 leading-relaxed">
                                            Tracks highway mag-chloride and road salt into building lobbies.
                                        </p>
                                        
                                        {/* Highlighted Benefit Badge */}
                                        {isWinterSeason ? (
                                            <div className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-100/90 text-emerald-800 text-xs font-bold">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                                                Single-Pass Neutralizer cuts out 2nd-pass mopping
                                            </div>
                                        ) : (
                                            <p className="text-[11px] text-slate-400 mt-1">
                                                Turn on to calculate labor hours saved by eliminating secondary salt rinses.
                                            </p>
                                        )}
                                    </div>

                                    {/* Toggle Switch */}
                                    <button
                                        type="button"
                                        role="switch"
                                        aria-checked={isWinterSeason}
                                        aria-label="Toggle Winter Tracking Season"
                                        onClick={() => setIsWinterSeason(!isWinterSeason)}
                                        className={`relative inline-flex h-7 w-13 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${
                                            isWinterSeason ? "bg-cyan-600" : "bg-slate-300"
                                        }`}
                                    >
                                        <span
                                            aria-hidden="true"
                                            className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                                                isWinterSeason ? "translate-x-6" : "translate-x-0"
                                            }`}
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Summary Footnote */}
                        <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-500">
                            <span>Labor rate basis: $20.00/hr loaded ($16/hr base + burden)</span>
                            <span>Yield: 1:128 to 1:256 dilution</span>
                        </div>
                    </div>

                    {/* Dynamic Readouts Column */}
                    <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
                        {/* Primary KPI Card: Total Monthly Margin Improvement */}
                        <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
                            
                            <div className="relative z-10">
                                <div className="flex items-center justify-between gap-2 mb-2">
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
                                        Estimated Monthly Bottom-Line Benefit
                                    </span>
                                    <span className="text-xs font-semibold text-slate-300 bg-slate-800 px-2.5 py-0.5 rounded-full">
                                        {frequency} Shifts/Wk
                                    </span>
                                </div>

                                <div className="flex items-baseline gap-2 mb-1">
                                    <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                                        {currencyFormatter.format(totalMonthlyValue)}
                                    </span>
                                    <span className="text-slate-400 text-sm font-semibold">/ month</span>
                                </div>
                                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 mb-6">
                                    <p className="text-xs text-slate-300 font-medium">
                                        Projected Annual Contractor Advantage:{" "}
                                        <strong className="text-emerald-400 font-extrabold">
                                            {currencyFormatter.format(projectedAnnualValue)}
                                        </strong>
                                    </p>
                                    {isWinterSeason ? (
                                        <span className="inline-flex items-center text-[10px] font-semibold text-cyan-300 bg-cyan-950/80 border border-cyan-800/80 px-2.5 py-0.5 rounded-full">
                                            Reflects 7-month Montana winter de-icing season (Oct–Apr)
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center text-[10px] font-semibold text-slate-400 bg-slate-800 border border-slate-700 px-2.5 py-0.5 rounded-full">
                                            12-month chemical savings (winter labor off)
                                        </span>
                                    )}
                                </div>

                                {/* Breakdown Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-800">
                                    {/* Chemical Savings Breakdown */}
                                    <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700/80">
                                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                                            Chemical Spend
                                        </div>
                                        <div className="text-xl font-bold text-white">
                                            {currencyFormatter.format(monthlyUfChemicalCost)}
                                            <span className="text-xs font-normal text-slate-400"> / mo</span>
                                        </div>
                                        <p className="text-[11px] text-emerald-400 font-medium mt-0.5">
                                            Saves {currencyFormatter.format(monthlyChemicalSavings)} vs retail RTU
                                        </p>
                                    </div>

                                    {/* Labor Hours Saved Breakdown */}
                                    <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700/80">
                                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                                            Winter Salt Labor
                                        </div>
                                        <div className="text-xl font-bold text-white">
                                            {monthlyLaborHoursSaved} hrs
                                            <span className="text-xs font-normal text-slate-400"> / mo</span>
                                        </div>
                                        <p className="text-[11px] text-cyan-300 font-medium mt-0.5">
                                            {isWinterSeason
                                                ? `Worth ${currencyFormatter.format(monthlyLaborCostSaved)}/mo in loaded labor (${monthlyLaborHoursSaved} hrs @ $16/hr base + employer burden)`
                                                : "0 hrs (Winter off)"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Secondary Metric Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Card 1: Van SKU Elimination */}
                            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-2xs flex items-start gap-3.5">
                                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 font-extrabold text-sm">
                                    -{bottlesEliminated}
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Van SKU Bloat</h4>
                                    <p className="text-sm font-bold text-slate-900 leading-snug">
                                        {bottlesEliminated} Redundant Spray Cans Eliminated
                                    </p>
                                    <p className="text-xs text-slate-500 mt-0.5">
                                        Replaced by a 3-product calibrated dispensing system.
                                    </p>
                                </div>
                            </div>

                            {/* Card 2: Cost Per 1,000 Sq Ft */}
                            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-2xs flex items-start gap-3.5">
                                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 font-extrabold text-sm">
                                    $0.10
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">In-Use Yield</h4>
                                    <p className="text-sm font-bold text-slate-900 leading-snug">
                                        $0.10 Per 1,000 Sq Ft Cleaned
                                    </p>
                                    <p className="text-xs text-slate-500 mt-0.5">
                                        Vs. $0.52/1,000 sq ft for retail RTU solutions.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Inline CTA */}
                        <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200/90 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="text-center sm:text-left">
                                <p className="text-sm font-bold text-cyan-950">
                                    Put these custodial savings to the test
                                </p>
                                <p className="text-xs text-cyan-800">
                                    We provide a free job-site chemical audit and commercial sample kit for your crew.
                                </p>
                            </div>
                            <Link
                                href="/contact?request=janitorial-audit"
                                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs sm:text-sm font-bold shadow-sm hover:shadow-md transition-all shrink-0 active:scale-[0.98] cursor-pointer"
                            >
                                <span>Request Custodial Audit & Free Sample Kit</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7l7 7l-7 7"/></svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
