"use client";

import { useState } from "react";
import Link from "next/link";

interface SchoolFacilityBudgetCalculatorProps {
    className?: string;
}

export default function SchoolFacilityBudgetCalculator({
    className = "",
}: SchoolFacilityBudgetCalculatorProps) {
    const [numBuildings, setNumBuildings] = useState<number>(3);
    const [sqFt, setSqFt] = useState<number>(65000);
    const [isWinterSeason, setIsWinterSeason] = useState<boolean>(true);

    const currencyFormatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    });

    // School Year metrics (180 instructional days, ~100 winter de-icing days in Montana)
    const schoolDaysPerYear = 180;
    const winterDays = 100;

    // Chemical cost math:
    // Retail ready-to-use / over-the-counter jugs = ~$0.48 per 1,000 sq ft per day
    // UF closed-loop high-yield concentrates = ~$0.09 per 1,000 sq ft per day
    const retailDailyRatePer1k = 0.48;
    const ufDailyRatePer1k = 0.09;

    const annualRetailChemicalCost = (sqFt / 1000) * schoolDaysPerYear * retailDailyRatePer1k;
    const annualUfChemicalCost = (sqFt / 1000) * schoolDaysPerYear * ufDailyRatePer1k;
    const annualChemicalSavings = Math.max(0, annualRetailChemicalCost - annualUfChemicalCost);

    // Standardized custodial closets (approx 2 to 3 closets per building)
    const standardizedClosets = Math.max(1, numBuildings * 2);

    // Winter salt labor calculation:
    // Single-pass salt neutralizer eliminates 2-pass rinse mopping (saving ~20 min or 0.33 hrs per 10,000 sq ft per winter day)
    const dailyHoursSaved = isWinterSeason ? (sqFt / 10000) * 0.33 : 0;
    const annualLaborHoursSaved = Math.round(dailyHoursSaved * winterDays);
    const hourlyCustodialWage = 22; // Typical MT public school district custodial wage
    const annualLaborValueRecovered = annualLaborHoursSaved * hourlyCustodialWage;

    // Combined District Value
    const totalAnnualDistrictValue = annualChemicalSavings + annualLaborValueRecovered;

    // Campus size presets
    const presets = [
        { label: "Elementary", sqFt: 35000, buildings: 1, desc: "Single Facility (~35K sq ft)" },
        { label: "Middle School", sqFt: 65000, buildings: 2, desc: "2 Wings (~65K sq ft)" },
        { label: "High School", sqFt: 125000, buildings: 4, desc: "Main + Gym + Arts (~125K sq ft)" },
        { label: "District Campus", sqFt: 220000, buildings: 7, desc: "Multi-School Campus (~220K sq ft)" },
    ];

    const applyPreset = (presetSqFt: number, presetBuildings: number) => {
        setSqFt(presetSqFt);
        setNumBuildings(presetBuildings);
    };

    return (
        <section
            id="school-budget-calculator"
            aria-labelledby="school-calculator-heading"
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/><path d="M6 6h10"/><path d="M6 10h10"/></svg>
                        District Facility & Safety Model
                    </div>
                    <h2
                        id="school-calculator-heading"
                        className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-3"
                    >
                        School Facility Budget & Safety Calculator
                    </h2>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                        See how converting your district to closed-loop dilution proportioners eliminates chemical spills, reduces plastic jug waste, and reclaims custodial hours during Montana winter de-icing season.
                    </p>
                </div>

                {/* Main Two-Column Tool */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    {/* Controls Column */}
                    <div className="lg:col-span-6 space-y-6 bg-slate-50/70 p-6 sm:p-8 rounded-3xl border border-slate-200 flex flex-col justify-between">
                        <div className="space-y-6">
                            {/* Preset Buttons */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                                    School Facility Presets
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    {presets.map((preset) => (
                                        <button
                                            key={preset.label}
                                            type="button"
                                            onClick={() => applyPreset(preset.sqFt, preset.buildings)}
                                            className={`p-2.5 rounded-xl text-left border transition-all text-xs cursor-pointer ${
                                                sqFt === preset.sqFt && numBuildings === preset.buildings
                                                    ? "bg-cyan-600 text-white border-cyan-600 font-bold shadow-xs"
                                                    : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 font-medium"
                                            }`}
                                        >
                                            <span className="block font-bold">{preset.label}</span>
                                            <span className={`block text-[10px] truncate ${
                                                sqFt === preset.sqFt && numBuildings === preset.buildings
                                                    ? "text-cyan-100"
                                                    : "text-slate-400"
                                            }`}>
                                                {preset.desc}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Input 1: Total Cleanable Square Feet */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label
                                        htmlFor="school-cleanable-sqft-slider"
                                        className="text-xs font-bold uppercase tracking-wider text-slate-700"
                                    >
                                        Total Cleanable Area
                                    </label>
                                    <span className="text-base font-extrabold text-cyan-800 bg-cyan-100/70 px-3 py-1 rounded-lg">
                                        {sqFt.toLocaleString()} sq ft
                                    </span>
                                </div>
                                <input
                                    id="school-cleanable-sqft-slider"
                                    type="range"
                                    min={15000}
                                    max={250000}
                                    step={5000}
                                    value={sqFt}
                                    onChange={(e) => setSqFt(Number(e.target.value))}
                                    className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                />
                                <div className="flex justify-between text-[11px] text-slate-400 font-semibold mt-1">
                                    <span>15,000 sq ft</span>
                                    <span>125,000 sq ft</span>
                                    <span>250,000 sq ft</span>
                                </div>
                            </div>

                            {/* Input 2: Number of Campus Buildings */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label
                                        htmlFor="school-buildings-slider"
                                        className="text-xs font-bold uppercase tracking-wider text-slate-700"
                                    >
                                        Campus Buildings / Facilities
                                    </label>
                                    <span className="text-base font-extrabold text-slate-800 bg-white border border-slate-200 px-3 py-1 rounded-lg">
                                        {numBuildings} {numBuildings === 1 ? "Building" : "Buildings"}
                                    </span>
                                </div>
                                <input
                                    id="school-buildings-slider"
                                    type="range"
                                    min={1}
                                    max={15}
                                    step={1}
                                    value={numBuildings}
                                    onChange={(e) => setNumBuildings(Number(e.target.value))}
                                    className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                />
                                <div className="flex justify-between text-[11px] text-slate-400 font-semibold mt-1">
                                    <span>1 Building</span>
                                    <span>7 Buildings</span>
                                    <span>15 Buildings</span>
                                </div>
                            </div>

                            {/* Input 3: Winter Salt Influx Season Toggle */}
                            <div className={`p-4 sm:p-5 rounded-2xl border transition-all duration-300 ${
                                isWinterSeason
                                    ? "bg-gradient-to-br from-cyan-50 to-blue-50/80 border-cyan-300 shadow-sm"
                                    : "bg-white border-slate-200"
                            }`}>
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                                                Winter Salt & De-Icer Season
                                            </span>
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                                                isWinterSeason
                                                    ? "bg-cyan-600 text-white shadow-xs"
                                                    : "bg-slate-200 text-slate-600"
                                            }`}>
                                                {isWinterSeason ? "Active (~100 Days)" : "Off"}
                                            </span>
                                        </div>
                                        <p className="text-xs text-slate-600 leading-relaxed">
                                            Boot track-in of magnesium chloride and gravel slag into school entryways.
                                        </p>

                                        {isWinterSeason ? (
                                            <div className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-100/90 text-emerald-800 text-xs font-bold">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                                                Single-Pass Salt Neutralizer saves ~20 min per 10k sq ft daily
                                            </div>
                                        ) : (
                                            <p className="text-[11px] text-slate-400 mt-1">
                                                Toggle on to calculate custodial hours recovered during winter de-icing months.
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
                            <span>Custodial wage basis: $22.00/hr</span>
                            <span>Annual basis: 180 school days</span>
                        </div>
                    </div>

                    {/* Dynamic Readouts Column */}
                    <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
                        {/* Primary KPI Card: Total Annual District Benefit */}
                        <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

                            <div className="relative z-10">
                                <div className="flex items-center justify-between gap-2 mb-2">
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
                                        Projected Annual District Benefit
                                    </span>
                                    <span className="text-xs font-semibold text-slate-300 bg-slate-800 px-2.5 py-0.5 rounded-full">
                                        {numBuildings} {numBuildings === 1 ? "Building" : "Buildings"}
                                    </span>
                                </div>

                                <div className="flex items-baseline gap-2 mb-1">
                                    <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                                        {currencyFormatter.format(totalAnnualDistrictValue)}
                                    </span>
                                    <span className="text-slate-400 text-sm font-semibold">/ school year</span>
                                </div>
                                <p className="text-xs text-slate-300 mb-6 font-medium">
                                    Direct Taxpayer Chemical Savings: <strong className="text-emerald-400 font-extrabold">{currencyFormatter.format(annualChemicalSavings)}</strong>
                                </p>

                                {/* Breakdown Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-800">
                                    {/* Annual Chemical Spend Card */}
                                    <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700/80">
                                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                                            UF Annual Chemical Spend
                                        </div>
                                        <div className="text-xl font-bold text-white">
                                            {currencyFormatter.format(annualUfChemicalCost)}
                                            <span className="text-xs font-normal text-slate-400"> / yr</span>
                                        </div>
                                        <p className="text-[11px] text-emerald-400 font-medium mt-0.5">
                                            Replaces {currencyFormatter.format(annualRetailChemicalCost)} retail jugs
                                        </p>
                                    </div>

                                    {/* Winter Labor Hours Recovered Card */}
                                    <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700/80">
                                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                                            Custodial Hours Recovered
                                        </div>
                                        <div className="text-xl font-bold text-white">
                                            {annualLaborHoursSaved} hrs
                                            <span className="text-xs font-normal text-slate-400"> / winter</span>
                                        </div>
                                        <p className="text-[11px] text-cyan-300 font-medium mt-0.5">
                                            {isWinterSeason ? `Worth ${currencyFormatter.format(annualLaborValueRecovered)} in custodial labor` : "0 hrs (Winter off)"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Secondary Safety & Facility Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Card 1: Standardized Closets & Lockable Dispensers */}
                            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-2xs flex items-start gap-3.5">
                                <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-800 flex items-center justify-center shrink-0 font-extrabold text-sm">
                                    {standardizedClosets}
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Closet Safety</h4>
                                    <p className="text-sm font-bold text-slate-900 leading-snug">
                                        {standardizedClosets} Closets Standardized
                                    </p>
                                    <p className="text-xs text-slate-500 mt-0.5">
                                        Tamper-proof, locked proportioners with zero open-jug hazards.
                                    </p>
                                </div>
                            </div>

                            {/* Card 2: Safe In-Use Cost */}
                            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-2xs flex items-start gap-3.5">
                                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 font-extrabold text-sm">
                                    $0.09
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Daily In-Use Rate</h4>
                                    <p className="text-sm font-bold text-slate-900 leading-snug">
                                        $0.09 Per 1,000 Sq Ft / Day
                                    </p>
                                    <p className="text-xs text-slate-500 mt-0.5">
                                        Eliminates freight markups on pre-diluted store jugs.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Inline CTA */}
                        <div className="p-5 rounded-2xl bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200/90 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="text-center sm:text-left">
                                <p className="text-sm font-bold text-cyan-950">
                                    Need a formal District PO quote or campus walkthrough?
                                </p>
                                <p className="text-xs text-cyan-800">
                                    We offer net-30 municipal billing, free closed-loop dispensers, and child-safe sample kits.
                                </p>
                            </div>
                            <Link
                                href="/contact?request=school-audit"
                                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs sm:text-sm font-bold shadow-sm hover:shadow-md transition-all shrink-0 active:scale-[0.98] cursor-pointer"
                            >
                                <span>Schedule District Audit & Sample Kit</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7l7 7l-7 7"/></svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
