"use client";

import { useState } from "react";
import Link from "next/link";

interface HospitalityTurnoverCalculatorProps {
    className?: string;
}

export default function HospitalityTurnoverCalculator({
    className = "",
}: HospitalityTurnoverCalculatorProps) {
    const [units, setUnits] = useState<number>(40);
    const [weeklyTurns, setWeeklyTurns] = useState<number>(3);
    const [hasLaundry, setHasLaundry] = useState<boolean>(true);

    const currencyFormatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    });

    // Preset configurations
    const presets = [
        {
            label: "Boutique / B&B",
            units: 15,
            weeklyTurns: 4,
            hasLaundry: true,
            desc: "Historic or boutique inn",
        },
        {
            label: "Vacation Rentals",
            units: 35,
            weeklyTurns: 2,
            hasLaundry: false,
            desc: "Cabin & STR turnover portfolio",
        },
        {
            label: "Midscale Hotel",
            units: 65,
            weeklyTurns: 4,
            hasLaundry: true,
            desc: "Commercial lodging property",
        },
        {
            label: "Resort Complex",
            units: 120,
            weeklyTurns: 5,
            hasLaundry: true,
            desc: "Full-service lodge & multi-wing resort",
        },
    ];

    const applyPreset = (presetUnits: number, presetTurns: number, presetLaundry: boolean) => {
        setUnits(presetUnits);
        setWeeklyTurns(presetTurns);
        setHasLaundry(presetLaundry);
    };

    // Mathematical modeling:
    // 1. Total turnovers per year
    const annualTurnovers = units * weeklyTurns * 52;

    // 2. Housekeeping labor savings:
    // Commercial acid descaling dissolves 7.4–9.8 GPG hard water scale and soap scum in <2 min dwell time,
    // eliminating 6 minutes (0.1 hours) of manual scrubbing per bathroom turn.
    const hoursSavedPerTurn = 0.1; // 6 minutes
    const annualHousekeepingHoursSaved = Math.round(annualTurnovers * hoursSavedPerTurn);
    const BASE_HOUSEKEEPER_WAGE = 15.50; // Reflects verified Great Falls lodging average of $12.62–$16.50/hr
    const LOADED_LABOR_RATE = 19.25; // Base wage + 24% employer payroll tax, UI, and workers' comp burden
    const annualLaborSavingsValue = Math.round(annualHousekeepingHoursSaved * LOADED_LABOR_RATE);

    // 3. Extended linen life value:
    // Unconditioned hard water traps calcium in fibers, causing sheets/towels to gray within 30-45 washes.
    // Chelated laundry builders & neutralizer sours extend linen life by 30%.
    // Base replacement cost: ~$400 per room/year in lodging.
    // If hasLaundry is FALSE (external laundry), this is excluded from the total benefit and set to $0.
    const annualLinenReplacementCostPerUnit = 400;
    const linenLifeReductionRate = 0.30;
    const annualLinenSavingsValue = hasLaundry
        ? Math.round(units * annualLinenReplacementCostPerUnit * linenLifeReductionRate)
        : 0;

    // 4. Chemical cost per room turnover:
    // Retail ready-to-use jugs (descalers, glass, neutral cleaner, aerosol freshener) = ~$4.85 per turn.
    // UF high-yield commercial concentrates = ~$0.28 per turn.
    const retailCostPerTurn = 4.85;
    const ufCostPerTurn = 0.28;
    const chemicalSavingsPerTurn = retailCostPerTurn - ufCostPerTurn; // $4.57
    const annualChemicalSavingsValue = Math.round(annualTurnovers * chemicalSavingsPerTurn);

    // 5. Total Annual Combined Benefit (Linen savings dynamically included ONLY if hasLaundry is true)
    const totalAnnualBenefit = annualLaborSavingsValue + annualLinenSavingsValue + annualChemicalSavingsValue;

    return (
        <section
            id="hospitality-calculator"
            aria-labelledby="hospitality-calculator-heading"
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
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8" />
                            <path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" />
                            <path d="M12 4v6" />
                            <path d="M2 18h20" />
                        </svg>
                        Lodging & Property Turnover Model
                    </div>
                    <h2
                        id="hospitality-calculator-heading"
                        className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-3"
                    >
                        Property Turnover & Linen Life Calculator
                    </h2>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                        Calculate how fast-acting hard water descalers, chelated laundry chemistry, and concentrated multi-surface cleaners accelerate room turnover times and protect your property investment.
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
                                    Property Type Presets
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    {presets.map((preset) => {
                                        const isSelected =
                                            units === preset.units &&
                                            weeklyTurns === preset.weeklyTurns &&
                                            hasLaundry === preset.hasLaundry;
                                        return (
                                            <button
                                                key={preset.label}
                                                type="button"
                                                onClick={() => applyPreset(preset.units, preset.weeklyTurns, preset.hasLaundry)}
                                                className={`p-2.5 rounded-xl text-left border transition-all text-xs cursor-pointer ${
                                                    isSelected
                                                        ? "bg-cyan-600 text-white border-cyan-600 font-bold shadow-xs"
                                                        : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 font-medium"
                                                }`}
                                            >
                                                <span className="block font-bold">{preset.label}</span>
                                                <span
                                                    className={`block text-[10px] truncate ${
                                                        isSelected ? "text-cyan-100" : "text-slate-400"
                                                    }`}
                                                >
                                                    {preset.desc}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Input 1: Property Size / Units */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label
                                        htmlFor="units-slider"
                                        className="text-xs font-bold uppercase tracking-wider text-slate-700"
                                    >
                                        Managed Rooms / Rental Units
                                    </label>
                                    <span className="text-base font-extrabold text-cyan-800 bg-cyan-100/70 px-3 py-1 rounded-lg">
                                        {units} Units
                                    </span>
                                </div>
                                <input
                                    id="units-slider"
                                    type="range"
                                    min="10"
                                    max="200"
                                    step="5"
                                    value={units}
                                    onChange={(e) => setUnits(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                                />
                                <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-medium">
                                    <span>10 Units (Boutique)</span>
                                    <span>65 Units (Hotel)</span>
                                    <span>200 Units (Resort)</span>
                                </div>
                            </div>

                            {/* Input 2: Weekly Turnovers Per Unit */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label
                                        htmlFor="turns-slider"
                                        className="text-xs font-bold uppercase tracking-wider text-slate-700"
                                    >
                                        Average Weekly Turns / Unit
                                    </label>
                                    <span className="text-base font-extrabold text-cyan-800 bg-cyan-100/70 px-3 py-1 rounded-lg">
                                        {weeklyTurns} turns / week
                                    </span>
                                </div>
                                <input
                                    id="turns-slider"
                                    type="range"
                                    min="1"
                                    max="7"
                                    step="1"
                                    value={weeklyTurns}
                                    onChange={(e) => setWeeklyTurns(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                                />
                                <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-medium">
                                    <span>1 (Weekly Turnover)</span>
                                    <span>3 (Avg Midscale)</span>
                                    <span>7 (High Occupancy)</span>
                                </div>
                            </div>

                            {/* Input 3: On-Premise Laundry Operation Toggle */}
                            <div className="pt-2 border-t border-slate-200/80">
                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <label
                                            htmlFor="laundry-toggle"
                                            className="text-xs font-bold uppercase tracking-wider text-slate-700 block cursor-pointer"
                                        >
                                            On-Premise Laundry (OPL)
                                        </label>
                                        <p className="text-[11px] text-slate-500 mt-0.5">
                                            {hasLaundry
                                                ? "In-house wash wheels active (chelated sequestrant & sour formulas applied)."
                                                : "Off-site or outsourced commercial laundry service (linen savings excluded)."}
                                        </p>
                                    </div>
                                    <button
                                        id="laundry-toggle"
                                        type="button"
                                        role="switch"
                                        aria-checked={hasLaundry}
                                        onClick={() => setHasLaundry(!hasLaundry)}
                                        className={`relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${
                                            hasLaundry ? "bg-cyan-600" : "bg-slate-300"
                                        }`}
                                    >
                                        <span
                                            aria-hidden="true"
                                            className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                                                hasLaundry ? "translate-x-7" : "translate-x-0"
                                            }`}
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Turn Velocity Summary Pill */}
                        <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-600">
                            <span className="font-medium">Total Projected Room Turns:</span>
                            <span className="font-extrabold text-slate-900 bg-white px-2.5 py-1 rounded-md border border-slate-200">
                                {annualTurnovers.toLocaleString()} turns / year
                            </span>
                        </div>
                    </div>

                    {/* Readouts & Value Breakdown Column */}
                    <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
                        {/* Hero Primary Card */}
                        <div className="bg-gradient-to-br from-emerald-900 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-500/30 relative overflow-hidden">
                            <div
                                className="absolute -right-8 -bottom-8 w-44 h-44 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"
                                aria-hidden="true"
                            />

                            <div className="flex items-center justify-between mb-3">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-500/30">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    Total Projected Annual Benefit
                                </span>
                                <span className="text-xs text-slate-400">Turnover Efficiency</span>
                            </div>

                            <div className="mb-2">
                                <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
                                    {currencyFormatter.format(totalAnnualBenefit)}
                                </span>
                                <span className="text-emerald-300/90 text-sm font-semibold ml-2">/ year</span>
                            </div>

                            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                                Combined savings across faster bathroom turnaround labor, direct concentrate chemical costs, and {hasLaundry ? "30% extended linen replacement life." : "chemical supply savings (linen excluded for external laundry)."}
                            </p>
                        </div>

                        {/* 3 Metric Breakdown Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                            {/* Metric 1: Housekeeping Labor Hours Saved */}
                            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-cyan-400 hover:shadow-sm transition-all flex flex-col justify-between">
                                <div>
                                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                                        Turnover Labor Saved
                                    </p>
                                    <p className="text-xl sm:text-2xl font-black text-slate-900">
                                        {annualHousekeepingHoursSaved.toLocaleString()}{" "}
                                        <span className="text-xs font-semibold text-slate-500">hrs</span>
                                    </p>
                                </div>
                                <div className="mt-3 pt-2 border-t border-slate-100">
                                    <p className="text-[11px] font-semibold text-emerald-700">
                                        {currencyFormatter.format(annualLaborSavingsValue)} value recovered
                                    </p>
                                    <p className="text-[10px] text-slate-400">@ 6 min saved / turn ($19.25/hr loaded)</p>
                                </div>
                            </div>

                            {/* Metric 2: Extended Linen Life Value (OPL Dependent) */}
                            <div
                                className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                                    hasLaundry
                                        ? "bg-white border-slate-200 shadow-2xs hover:border-cyan-400 hover:shadow-sm"
                                        : "bg-slate-100/70 border-slate-200/80 text-slate-400"
                                }`}
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-1">
                                        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                            Linen Life Savings
                                        </p>
                                    </div>
                                    <p
                                        className={`text-xl sm:text-2xl font-black ${
                                            hasLaundry ? "text-slate-900" : "text-slate-500"
                                        }`}
                                    >
                                        {hasLaundry ? currencyFormatter.format(annualLinenSavingsValue) : "$0"}
                                    </p>
                                </div>
                                <div className="mt-3 pt-2 border-t border-slate-200/60">
                                    {hasLaundry ? (
                                        <>
                                            <p className="text-[11px] font-semibold text-cyan-800">
                                                +30% Linen Life Extension
                                            </p>
                                            <p className="text-[10px] text-slate-400">Locks out 7.4–9.8 GPG calcium</p>
                                        </>
                                    ) : (
                                        <>
                                            <span className="inline-block px-1.5 py-0.5 rounded bg-slate-200 text-[10px] font-semibold text-slate-600 mb-0.5">
                                                External laundry selected
                                            </span>
                                            <p className="text-[10px] text-slate-400">OPL inactive; excluded from total</p>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Metric 3: Chemical Cost per Turnover */}
                            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-cyan-400 hover:shadow-sm transition-all flex flex-col justify-between">
                                <div>
                                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                                        Chemical Cost / Turn
                                    </p>
                                    <div className="flex items-baseline gap-1.5">
                                        <p className="text-xl sm:text-2xl font-black text-emerald-700">$0.28</p>
                                        <span className="text-[11px] text-slate-400 line-through">$4.85 retail</span>
                                    </div>
                                </div>
                                <div className="mt-3 pt-2 border-t border-slate-100">
                                    <p className="text-[11px] font-semibold text-emerald-700">
                                        {currencyFormatter.format(annualChemicalSavingsValue)} saved
                                    </p>
                                    <p className="text-[10px] text-slate-400">High-yield MT concentrates</p>
                                </div>
                            </div>
                        </div>

                        {/* Explanatory Labor Note */}
                        <p className="text-[11px] text-slate-500 leading-normal px-1">
                            Labor savings calculated at ${BASE_HOUSEKEEPER_WAGE.toFixed(2)}/hr average Great Falls housekeeper wage (${LOADED_LABOR_RATE.toFixed(2)}/hr fully loaded with employer taxes &amp; insurance).
                        </p>

                        {/* Operational Advantages Checklist */}
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 text-xs text-slate-700 space-y-2">
                            <div className="flex items-center gap-2">
                                <svg
                                    className="w-4 h-4 text-emerald-600 shrink-0"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span>
                                    <strong>No abrasive glass scratching:</strong> Foaming descalers dissolve calcium scale in 60 seconds without pumice or green scrub pads.
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg
                                    className="w-4 h-4 text-emerald-600 shrink-0"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span>
                                    <strong>Zero lingering smoke or pet odors:</strong> Bio-enzymatic counteractants digest odor molecules permanently before the next check-in.
                                </span>
                            </div>
                        </div>

                        {/* Quick CTA inside calculator */}
                        <div className="pt-2">
                            <Link
                                href="/contact?request=audit"
                                className="w-full inline-flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm sm:text-base py-3.5 px-6 rounded-xl shadow-md shadow-cyan-600/20 hover:scale-[1.01] transition-all text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 cursor-pointer"
                            >
                                <span>Request a Property Chemical Audit & Sample Kit</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M5 12h14m-7-7l7 7l-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
