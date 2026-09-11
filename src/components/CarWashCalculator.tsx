"use client";

import { useState } from "react";
import Link from "next/link";

type PackagingOption = "drum" | "pail";

interface FacilityTier {
    id: string;
    label: string;
    washes: number;
    subtext: string;
}

const FACILITY_TIERS: FacilityTier[] = [
    {
        id: "express-tunnel",
        label: "Express Wash Tunnel",
        washes: 8000,
        subtext: "Conveyor tunnel with multi-arch hydraulic injection",
    },
    {
        id: "in-bay-automatic",
        label: "In-Bay Automatic",
        washes: 3000,
        subtext: "Gas station & c-store rollover wash",
    },
    {
        id: "fleet-bay",
        label: "Commercial Fleet Bay",
        washes: 1500,
        subtext: "High-pressure drive-through fleet rack",
    },
    {
        id: "mega-tunnel",
        label: "High-Volume Mega Tunnel",
        washes: 15000,
        subtext: "Multi-lane express tunnel facility",
    },
];

export interface CarWashCalculatorProps {
    className?: string;
    id?: string;
}

export default function CarWashCalculator({
    className = "",
    id = "automotive-calculator",
}: CarWashCalculatorProps) {
    const [monthlyWashes, setMonthlyWashes] = useState<number>(5000);
    const [packaging, setPackaging] = useState<PackagingOption>("drum");

    const currencyFormatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    });

    // Trophy Car Wash authentic pricing and math specs:
    // 55-Gallon Drum: $2,116.00 ($38.47/gal | $0.300568/fl oz)
    // 5-Gallon Pail: $219.00 ($43.80/gal | $0.3421875/fl oz)
    // Draw: 0.75 fl oz / vehicle pass
    const isDrum = packaging === "drum";
    const ufCostPerCar = isDrum ? 0.23 : 0.26;
    const nationalDeliveredCost = 0.54;
    const savingsPerCar = nationalDeliveredCost - ufCostPerCar; // $0.31 (drum) or $0.28 (pail)

    const annualWashes = monthlyWashes * 12;
    const annualSavings = Math.round(annualWashes * savingsPerCar);
    const monthlySavings = Math.round(monthlyWashes * savingsPerCar);

    // Dynamic yield capacity
    const yieldWashes = isDrum ? 9380 : 850;
    const yieldLabel = isDrum ? "9,380 Washes" : "850 Washes";
    const yieldSubtext = isDrum
        ? "Per 55-gallon drum at calibrated 0.75 oz injector draw."
        : "Per 5-gallon pail at calibrated 0.75 oz injector draw.";

    return (
        <section
            id={id}
            aria-labelledby="automotive-calculator-heading"
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
                            <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                            <circle cx="7" cy="17" r="2" />
                            <path d="M9 17h6" />
                            <circle cx="17" cy="17" r="2" />
                        </svg>
                        Commercial Car Wash & Fleet ROI
                    </div>
                    <h2
                        id="automotive-calculator-heading"
                        className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-3"
                    >
                        Commercial Car Wash & Fleet Chemical Savings Calculator
                    </h2>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                        Calculate your exact operational cost-per-car with Montana-blended Trophy Car Wash concentrate vs. national catalog drums burdened by out-of-state freight surcharges.
                    </p>
                </div>

                {/* Main Two-Column Tool */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    {/* Controls Column */}
                    <div className="lg:col-span-6 space-y-6 bg-slate-50/70 p-6 sm:p-8 rounded-3xl border border-slate-200 flex flex-col justify-between">
                        <div className="space-y-6">
                            {/* Unified Facility Tier Selection */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                                    Wash Facility Profile
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    {FACILITY_TIERS.map((tier) => {
                                        const isSelected = monthlyWashes === tier.washes;
                                        return (
                                            <button
                                                key={tier.id}
                                                type="button"
                                                onClick={() => setMonthlyWashes(tier.washes)}
                                                className={`p-3 rounded-xl text-left border transition-all text-xs cursor-pointer ${
                                                    isSelected
                                                        ? "bg-cyan-600 text-white border-cyan-600 font-bold shadow-xs"
                                                        : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 font-medium"
                                                }`}
                                            >
                                                <span className="block font-bold leading-tight">{tier.label}</span>
                                                <span
                                                    className={`block text-[10px] mt-0.5 leading-tight ${
                                                        isSelected ? "text-cyan-100" : "text-slate-400"
                                                    }`}
                                                >
                                                    {tier.washes.toLocaleString()} washes/mo
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Monthly Vehicle Washes Slider */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label
                                        htmlFor="monthly-washes-slider"
                                        className="text-xs font-bold uppercase tracking-wider text-slate-700"
                                    >
                                        Monthly Vehicle Washes
                                    </label>
                                    <span className="text-base font-extrabold text-cyan-800 bg-cyan-100/70 px-3 py-1 rounded-lg">
                                        {monthlyWashes.toLocaleString()} Washes / Mo
                                    </span>
                                </div>
                                <input
                                    id="monthly-washes-slider"
                                    type="range"
                                    min="1000"
                                    max="20000"
                                    step="500"
                                    value={monthlyWashes}
                                    onChange={(e) => setMonthlyWashes(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                                />
                                <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-medium">
                                    <span>1,000 (Fleet Bay)</span>
                                    <span>8,000 (Conveyor Tunnel)</span>
                                    <span>20,000 (Mega Tunnel)</span>
                                </div>
                            </div>

                            {/* Dedicated Product Card: Trophy Car Wash */}
                            <div className="p-5 rounded-2xl bg-white border border-cyan-200/90 shadow-2xs relative overflow-hidden">
                                <div className="flex items-center justify-between gap-2 mb-3">
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-900 text-[10px] font-bold uppercase tracking-wider">
                                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-600 animate-pulse" />
                                        Featured Core System: Trophy Car Wash
                                    </span>
                                    <span className="text-[10px] font-mono font-bold text-slate-400">
                                        Lab Batch ID: TROPHY
                                    </span>
                                </div>

                                <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                                    Liquid concentrate engineered for automated feed systems, free-rinsing performance, and spot-free shine in Montana hard water. Prolongs high-pressure pump seal life.
                                </p>

                                {/* Packaging Option Toggle */}
                                <div className="space-y-1.5">
                                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                                        Select Packaging Unit
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setPackaging("drum")}
                                            className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                                                isDrum
                                                    ? "border-cyan-600 bg-cyan-50/70 text-cyan-950 font-bold ring-2 ring-cyan-500/20 shadow-xs"
                                                    : "border-slate-200 bg-slate-50/60 text-slate-700 hover:border-slate-300"
                                            }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-bold">55-Gal Drum</span>
                                                <span className="text-xs font-black text-cyan-700">$2,116</span>
                                            </div>
                                            <p className="text-[10px] text-slate-500 mt-0.5">$38.47/gal | $0.30/fl oz</p>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => setPackaging("pail")}
                                            className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                                                !isDrum
                                                    ? "border-cyan-600 bg-cyan-50/70 text-cyan-950 font-bold ring-2 ring-cyan-500/20 shadow-xs"
                                                    : "border-slate-200 bg-slate-50/60 text-slate-700 hover:border-slate-300"
                                            }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-bold">5-Gal Pail</span>
                                                <span className="text-xs font-black text-cyan-700">$219</span>
                                            </div>
                                            <p className="text-[10px] text-slate-500 mt-0.5">$43.80/gal | $0.34/fl oz</p>
                                        </button>
                                    </div>
                                </div>

                                {/* Dynamic Yield Callout */}
                                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                                    <span className="text-slate-500 text-[11px] font-medium">Unit Yield (0.75 oz draw):</span>
                                    <span className="font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md text-[11px]">
                                        Yields ~{yieldWashes.toLocaleString()} vehicle washes (${ufCostPerCar.toFixed(2)}/wash)
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Operations Volume Summary */}
                        <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-600">
                            <span className="font-medium">Annual Vehicle Throughput:</span>
                            <span className="font-extrabold text-slate-900 bg-white px-2.5 py-1 rounded-md border border-slate-200">
                                {annualWashes.toLocaleString()} washes / year
                            </span>
                        </div>
                    </div>

                    {/* Readouts & Value Breakdown Column */}
                    <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
                        {/* Hero Primary Savings Card */}
                        <div className="bg-gradient-to-br from-emerald-900 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-500/30 relative overflow-hidden">
                            <div
                                className="absolute -right-8 -bottom-8 w-44 h-44 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"
                                aria-hidden="true"
                            />

                            <div className="flex items-center justify-between mb-3">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-500/30">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    Projected Annual Chemical Savings
                                </span>
                                <span className="text-xs text-slate-400">{monthlyWashes.toLocaleString()} Washes/Mo</span>
                            </div>

                            <div className="mb-2">
                                <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
                                    {currencyFormatter.format(annualSavings)}
                                </span>
                                <span className="text-emerald-300/90 text-sm font-semibold ml-2">/ year</span>
                            </div>

                            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                                Saves approximately {currencyFormatter.format(monthlySavings)} per month on wash soap alone. Calculated at {monthlyWashes.toLocaleString()} vehicles/mo using Trophy Car Wash ({isDrum ? "55-gal drum" : "5-gal pail"}) at a calibrated 0.75 oz draw vs. national commercial delivered drum baseline ($0.54/car).
                            </p>
                        </div>

                        {/* 3 Metric Breakdown Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                            {/* Metric 1: Cost Per Car */}
                            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-cyan-400 hover:shadow-sm transition-all flex flex-col justify-between">
                                <div>
                                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                                        Cost Per Vehicle
                                    </p>
                                    <div className="flex items-baseline gap-1.5">
                                        <p className="text-xl sm:text-2xl font-black text-emerald-700">
                                            ${ufCostPerCar.toFixed(2)}
                                        </p>
                                        <span className="text-[11px] text-slate-400 line-through">
                                            $0.54
                                        </span>
                                    </div>
                                    <span className="inline-block mt-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded">
                                        vs. $0.54 National Delivered Drum Avg
                                    </span>
                                </div>
                                <div className="mt-3 pt-2 border-t border-slate-100">
                                    <p className="text-[10px] text-slate-500 leading-tight">
                                        {isDrum
                                            ? "Based on Trophy Car Wash 55-gal drum ($2,116.00) at 0.75 oz/car draw rate."
                                            : "Based on Trophy Car Wash 5-gal pail ($219.00) at 0.75 oz/car draw rate."}
                                    </p>
                                </div>
                            </div>

                            {/* Metric 2: Authentic Operational Drum Yield */}
                            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-cyan-400 hover:shadow-sm transition-all flex flex-col justify-between">
                                <div>
                                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                                        {isDrum ? "DRUM YIELD CAPACITY" : "PAIL YIELD CAPACITY"}
                                    </p>
                                    <p className="text-xl sm:text-2xl font-black text-slate-900">
                                        {yieldLabel}
                                    </p>
                                    <span className="inline-block mt-1 text-[10px] font-bold text-cyan-800 bg-cyan-50 px-1.5 py-0.5 rounded">
                                        0.75 fl oz Injector Draw
                                    </span>
                                </div>
                                <div className="mt-3 pt-2 border-t border-slate-100">
                                    <p className="text-[10px] text-slate-500 leading-tight">
                                        {yieldSubtext}
                                    </p>
                                </div>
                            </div>

                            {/* Metric 3: Local Supply Route Delivery */}
                            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-cyan-400 hover:shadow-sm transition-all flex flex-col justify-between">
                                <div>
                                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                                        Supply Logistics
                                    </p>
                                    <div className="flex items-center gap-1.5 text-emerald-700 font-extrabold text-sm sm:text-base">
                                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                                        <span>Local MT Route</span>
                                    </div>
                                    <span className="inline-block mt-1 text-[10px] font-bold text-blue-800 bg-blue-50 px-1.5 py-0.5 rounded">
                                        Zero Inbound Freight
                                    </span>
                                </div>
                                <div className="mt-3 pt-2 border-t border-slate-100">
                                    <p className="text-[10px] text-slate-500 leading-tight">
                                        Direct route trucks from Great Falls & Billings warehouses.
                                    </p>
                                </div>
                            </div>
                        </div>

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
                                    <strong>High-Yield Concentrated Draw:</strong> Metered at 0.75 to 1.0 fl oz per vehicle pass through automatic hydraulic feed systems.
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
                                    <strong>Engineered for Montana Hard Water:</strong> Free-rinsing formula protects pump seals and prevents water spotting under tunnel blowers.
                                </span>
                            </div>
                        </div>

                        {/* Audit Methodology Footnote */}
                        <div className="p-3.5 rounded-xl bg-slate-100/70 border border-slate-200 text-[11px] text-slate-500 leading-relaxed font-normal">
                            Cost-per-car calculations based on United Formulas Trophy Car Wash (55-gallon drum, $2,116.00) metered at 0.75 fl oz per vehicle pass through standard hydraulic proportioners. Baseline comparison ($0.54/car) reflects average delivered costs for national commercial brand drums (1.75 oz draw rate) including freight into Central Montana.
                        </div>

                        {/* Quick CTA inside calculator */}
                        <div className="pt-2">
                            <Link
                                href="/contact?request=audit"
                                className="w-full inline-flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm sm:text-base py-3.5 px-6 rounded-xl shadow-md shadow-cyan-600/20 hover:scale-[1.01] transition-all text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 cursor-pointer"
                            >
                                <span>Request a Wash Tunnel Chemical Audit & Sample Kit</span>
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
