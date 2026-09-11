"use client";

import { useState } from "react";
import Link from "next/link";
import CarWashCalculator from "./CarWashCalculator";

export { CarWashCalculator };

export interface AutomotiveShopCalculatorProps {
    className?: string;
    id?: string;
    mode?: "car-wash" | "repair-shop";
}

interface ShopPreset {
    id: string;
    label: string;
    bays: number;
    washdowns: number;
    bottles: number;
    tanks: number;
    subtext: string;
}

const SHOP_PRESETS: ShopPreset[] = [
    {
        id: "general-repair",
        label: "General Repair Shop",
        bays: 4,
        washdowns: 1,
        bottles: 8,
        tanks: 1,
        subtext: "Brakes, suspension & routine service",
    },
    {
        id: "dealership-service",
        label: "Dealership Service Center",
        bays: 8,
        washdowns: 1,
        bottles: 16,
        tanks: 2,
        subtext: "Multi-bay OEM franchised service",
    },
    {
        id: "transmission-diesel",
        label: "Transmission & Diesel Bay",
        bays: 12,
        washdowns: 2,
        bottles: 24,
        tanks: 2,
        subtext: "Heavy gear oil, ATF & grease washdowns",
    },
    {
        id: "fleet-maintenance",
        label: "Fleet Maintenance Facility",
        bays: 16,
        washdowns: 2,
        bottles: 32,
        tanks: 3,
        subtext: "Municipal & commercial fleet maintenance",
    },
];

/* -------------------------------------------------------------------------- */
/* Auto Repair Shop & Service Bay Calculator                                  */
/* -------------------------------------------------------------------------- */
export function RepairShopCalculator({
    className = "",
    id = "shop-calculator",
}: {
    className?: string;
    id?: string;
}) {
    // 1. Core Calculator Inputs
    const [serviceBays, setServiceBays] = useState<number>(6);
    const [washdownsPerDay, setWashdownsPerDay] = useState<number>(1);
    const [sprayBottlesPerWeek, setSprayBottlesPerWeek] = useState<number>(12);
    const [solventTanks, setSolventTanks] = useState<number>(1);

    const currencyFormatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    });

    // 2. Verified Calculation Engine & Constants:
    // A. Multi-Surface & Bench Spray Cleaning (Dynamo-X Professional)
    // 5-Gallon Pail = $65.00 ($13.00/gal | $3.25 per 32 oz refill)
    // Parts-Counter Baseline = $7.99 RTU
    // Savings per Bottle = $7.99 - $3.25 = $4.74
    // Monthly Spray Savings = (bottlesPerWeek * 4.33) * 4.74
    const sprayCostPerBottle = 3.25;
    const sprayBaseline = 7.99;
    const spraySavingsPerBottle = sprayBaseline - sprayCostPerBottle; // $4.74
    const monthlySpraySavings = sprayBottlesPerWeek * 4.33 * spraySavingsPerBottle;

    // B. Concrete Bay Floor Scrubbing & Degreasing
    // High-Dilution Industrial Concentrate = $0.18 per clean bay
    // Retail RTU Pre-Mix Baseline = $1.75 per clean bay
    // Monthly Floor Savings = (serviceBays * washdownsPerDay * 22 working days) * (1.75 - 0.18)
    const floorCostPerBay = 0.18;
    const floorBaseline = 1.75;
    const floorSavingsPerBay = floorBaseline - floorCostPerBay; // $1.57
    const workingDaysPerMonth = 22;
    const monthlyFloorSavings = serviceBays * washdownsPerDay * workingDaysPerMonth * floorSavingsPerBay;

    // C. Solvent Parts Washer Replacement (Aqueous Conversion)
    // Avoided Third-Party Hazardous Hauling & Solvent Contract = $150.00 / mo per tank ($1,800.00 / yr per tank)
    // Monthly Solvent Savings = solventTanks * 150.00
    const monthlySolventSavings = solventTanks * 150.0;

    // D. Total Monthly & Annual Contractor Benefit
    const monthlyBottomLineBenefit = monthlySpraySavings + monthlyFloorSavings + monthlySolventSavings;
    const projectedAnnualBenefit = monthlyBottomLineBenefit * 12;

    const applyPreset = (preset: ShopPreset) => {
        setServiceBays(preset.bays);
        setWashdownsPerDay(preset.washdowns);
        setSprayBottlesPerWeek(preset.bottles);
        setSolventTanks(preset.tanks);
    };

    return (
        <section
            id={id}
            aria-labelledby="shop-calculator-heading"
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
                            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                        </svg>
                        Service Bay & Degreaser ROI Engine
                    </div>
                    <h2
                        id="shop-calculator-heading"
                        className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-3"
                    >
                        Calculate Your Bay Degreasing & Solvent Savings
                    </h2>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                        See how switching from parts-counter spray cans and hazardous solvent sinks to Great Falls factory-direct concentrates impacts your monthly shop ledger.
                    </p>
                </div>

                {/* Preset Selector */}
                <div className="mb-8">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5 text-center">
                        Quick Shop Profile Presets
                    </label>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
                        {SHOP_PRESETS.map((preset) => {
                            const isSelected =
                                serviceBays === preset.bays &&
                                washdownsPerDay === preset.washdowns &&
                                sprayBottlesPerWeek === preset.bottles &&
                                solventTanks === preset.tanks;

                            return (
                                <button
                                    key={preset.id}
                                    type="button"
                                    onClick={() => applyPreset(preset)}
                                    className={`p-3 rounded-xl text-left border transition-all text-xs cursor-pointer ${
                                        isSelected
                                            ? "bg-cyan-600 text-white border-cyan-600 font-bold shadow-xs"
                                            : "bg-slate-50/80 text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-white font-medium"
                                    }`}
                                >
                                    <span className="block font-bold leading-tight">{preset.label}</span>
                                    <span
                                        className={`block text-[11px] mt-1 leading-tight ${
                                            isSelected ? "text-cyan-100" : "text-slate-500"
                                        }`}
                                    >
                                        {preset.bays} bays • {preset.washdowns}x wash • {preset.bottles} btls/wk
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Main Two-Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    {/* Controls Column */}
                    <div className="lg:col-span-6 space-y-6 bg-slate-50/70 p-6 sm:p-8 rounded-3xl border border-slate-200 flex flex-col justify-between">
                        <div className="space-y-6">
                            {/* Input 1: Active Service Bays */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label
                                        htmlFor="service-bays-slider"
                                        className="text-xs font-bold uppercase tracking-wider text-slate-700"
                                    >
                                        Active Service Bays
                                    </label>
                                    <span className="text-base font-extrabold text-cyan-800 bg-cyan-100/70 px-3 py-1 rounded-lg">
                                        {serviceBays} {serviceBays === 1 ? "Bay" : "Bays"}
                                    </span>
                                </div>
                                <input
                                    id="service-bays-slider"
                                    type="range"
                                    min="2"
                                    max="20"
                                    step="1"
                                    value={serviceBays}
                                    onChange={(e) => setServiceBays(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                                />
                                <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-medium">
                                    <span>2 Bays (Specialty Shop)</span>
                                    <span>6 Bays (Average)</span>
                                    <span>20 Bays (Dealership / Fleet)</span>
                                </div>
                            </div>

                            {/* Input 2: Daily Bay Floor Washdowns */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                                    Daily Bay Floor Washdowns
                                </label>
                                <div className="grid grid-cols-2 gap-2.5">
                                    <button
                                        type="button"
                                        onClick={() => setWashdownsPerDay(1)}
                                        className={`p-3 rounded-xl text-center border transition-all text-xs cursor-pointer ${
                                            washdownsPerDay === 1
                                                ? "bg-cyan-600 text-white border-cyan-600 font-bold shadow-xs"
                                                : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 font-semibold"
                                        }`}
                                    >
                                        <span className="block text-sm font-bold">1 Wash / Day</span>
                                        <span
                                            className={`block text-[11px] mt-0.5 ${
                                                washdownsPerDay === 1 ? "text-cyan-100" : "text-slate-400"
                                            }`}
                                        >
                                            End-of-shift mop / scrubber
                                        </span>
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setWashdownsPerDay(2)}
                                        className={`p-3 rounded-xl text-center border transition-all text-xs cursor-pointer ${
                                            washdownsPerDay === 2
                                                ? "bg-cyan-600 text-white border-cyan-600 font-bold shadow-xs"
                                                : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 font-semibold"
                                        }`}
                                    >
                                        <span className="block text-sm font-bold">2 Washes / Day</span>
                                        <span
                                            className={`block text-[11px] mt-0.5 ${
                                                washdownsPerDay === 2 ? "text-cyan-100" : "text-slate-400"
                                            }`}
                                        >
                                            Midday turn + end-of-shift
                                        </span>
                                    </button>
                                </div>
                            </div>

                            {/* Input 3: Technician Spray Bottles Used / Week */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label
                                        htmlFor="spray-bottles-slider"
                                        className="text-xs font-bold uppercase tracking-wider text-slate-700"
                                    >
                                        Technician Spray Bottles Used / Week
                                    </label>
                                    <span className="text-base font-extrabold text-cyan-800 bg-cyan-100/70 px-3 py-1 rounded-lg">
                                        {sprayBottlesPerWeek} Bottles / Wk
                                    </span>
                                </div>
                                <input
                                    id="spray-bottles-slider"
                                    type="range"
                                    min="5"
                                    max="40"
                                    step="1"
                                    value={sprayBottlesPerWeek}
                                    onChange={(e) => setSprayBottlesPerWeek(Number(e.target.value))}
                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                                />
                                <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-medium">
                                    <span>5 Bottles (1-2 Techs)</span>
                                    <span>12 Bottles (Standard 6-Bay)</span>
                                    <span>40 Bottles (Heavy Shop)</span>
                                </div>
                            </div>

                            {/* Input 4: Solvent Parts Tanks in Operation */}
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                                    Solvent Parts Tanks in Operation
                                </label>
                                <div className="grid grid-cols-4 gap-2">
                                    {[
                                        { count: 0, label: "0 Tanks" },
                                        { count: 1, label: "1 Tank" },
                                        { count: 2, label: "2 Tanks" },
                                        { count: 3, label: "3+ Tanks" },
                                    ].map((option) => {
                                        const isSelected = solventTanks === option.count;
                                        return (
                                            <button
                                                key={option.count}
                                                type="button"
                                                onClick={() => setSolventTanks(option.count)}
                                                className={`py-2.5 px-2 rounded-xl text-center border transition-all text-xs cursor-pointer ${
                                                    isSelected
                                                        ? "bg-cyan-600 text-white border-cyan-600 font-bold shadow-xs"
                                                        : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 font-semibold"
                                                }`}
                                            >
                                                {option.label}
                                            </button>
                                        );
                                    })}
                                </div>
                                <p className="text-[11px] text-slate-500 mt-1.5">
                                    Mineral spirit solvent sinks with recurring third-party hazardous hauling contracts.
                                </p>
                            </div>
                        </div>

                        {/* Operational Monthly Run-Rate Callout */}
                        <div className="pt-4 border-t border-slate-200 text-xs text-slate-600 flex items-center justify-between">
                            <span className="font-medium">Monthly Active Cleaning Volume:</span>
                            <span className="font-extrabold text-slate-900 bg-white px-2.5 py-1 rounded-md border border-slate-200">
                                {serviceBays * washdownsPerDay * workingDaysPerMonth} bay cleans • ~{Math.round(sprayBottlesPerWeek * 4.33)} spray bottles/mo
                            </span>
                        </div>
                    </div>

                    {/* Readouts & Value Breakdown Column */}
                    <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
                        {/* 1. Headline Metric Card (Dark Theme / High Contrast) */}
                        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-cyan-500/30 relative overflow-hidden">
                            <div
                                className="absolute -right-10 -bottom-10 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none"
                                aria-hidden="true"
                            />

                            <div className="flex items-center justify-between mb-3">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold uppercase tracking-wider border border-cyan-500/30">
                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                                    ESTIMATED MONTHLY SHOP SAVINGS
                                </span>
                                <span className="text-xs text-slate-400">{serviceBays} Bays Active</span>
                            </div>

                            <div className="mb-2">
                                <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
                                    {currencyFormatter.format(Math.round(monthlyBottomLineBenefit))}
                                </span>
                                <span className="text-cyan-300/90 text-sm font-semibold ml-2">/ month</span>
                            </div>

                            <p className="text-cyan-200 text-sm font-bold mb-2">
                                Projected Annual Advantage: {currencyFormatter.format(Math.round(projectedAnnualBenefit))} / year
                            </p>

                            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                                Based on local factory-direct bulk pails and eliminated hazardous solvent pickup contracts.
                            </p>

                            {/* Dynamic Sub-Component Breakdown */}
                            <div className="mt-4 pt-4 border-t border-slate-800 grid grid-cols-3 gap-2 text-center text-xs">
                                <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                                    <span className="block text-[10px] text-slate-400 uppercase font-bold">Spray Benches</span>
                                    <span className="font-black text-cyan-400">+{currencyFormatter.format(Math.round(monthlySpraySavings))}/mo</span>
                                </div>
                                <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                                    <span className="block text-[10px] text-slate-400 uppercase font-bold">Bay Floors</span>
                                    <span className="font-black text-emerald-400">+{currencyFormatter.format(Math.round(monthlyFloorSavings))}/mo</span>
                                </div>
                                <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800">
                                    <span className="block text-[10px] text-slate-400 uppercase font-bold">Parts Washers</span>
                                    <span className="font-black text-blue-400">+{currencyFormatter.format(Math.round(monthlySolventSavings))}/mo</span>
                                </div>
                            </div>
                        </div>

                        {/* 2. Supporting Highlight Cards (3-Column Grid) */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                            {/* Card 1: Spray Bottle Refills (Dynamo-X Pro) */}
                            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-cyan-400 hover:shadow-sm transition-all flex flex-col justify-between">
                                <div>
                                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                                        Spray Bottle Refills
                                    </p>
                                    <div className="flex items-baseline gap-1.5">
                                        <p className="text-xl sm:text-2xl font-black text-cyan-700">
                                            $3.25
                                        </p>
                                        <span className="text-xs font-semibold text-slate-600">/ bottle</span>
                                    </div>
                                    <span className="inline-block mt-1 text-[10px] font-bold text-slate-400 line-through">
                                        vs. $7.99 Parts-Counter RTU
                                    </span>
                                </div>
                                <div className="mt-3 pt-2 border-t border-slate-100">
                                    <p className="text-[10px] text-slate-500 leading-tight">
                                        Refilled from 5-gal pails ($65.00) for benches & machinery
                                    </p>
                                </div>
                            </div>

                            {/* Card 2: Bay Floor Degreasing */}
                            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-cyan-400 hover:shadow-sm transition-all flex flex-col justify-between">
                                <div>
                                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                                        Bay Floor Degreasing
                                    </p>
                                    <div className="flex items-baseline gap-1.5">
                                        <p className="text-xl sm:text-2xl font-black text-emerald-700">
                                            $0.18
                                        </p>
                                        <span className="text-xs font-semibold text-slate-600">/ bay clean</span>
                                    </div>
                                    <span className="inline-block mt-1 text-[10px] font-bold text-slate-400 line-through">
                                        vs. $1.75 Pre-Mixed Jugs
                                    </span>
                                </div>
                                <div className="mt-3 pt-2 border-t border-slate-100">
                                    <p className="text-[10px] text-slate-500 leading-tight">
                                        High-alkaline concentrate via wall proportioner
                                    </p>
                                </div>
                            </div>

                            {/* Card 3: Hazardous Waste Manifests */}
                            <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:border-cyan-400 hover:shadow-sm transition-all flex flex-col justify-between">
                                <div>
                                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                                        Hazardous Waste Manifests
                                    </p>
                                    <div className="flex items-baseline gap-1.5">
                                        <p className="text-xl sm:text-2xl font-black text-slate-900">
                                            $0
                                        </p>
                                        <span className="text-xs font-semibold text-slate-600">/ year</span>
                                    </div>
                                    <span className="inline-block mt-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded">
                                        Eliminates $1,800/tank hauling fees
                                    </span>
                                </div>
                                <div className="mt-3 pt-2 border-t border-slate-100">
                                    <p className="text-[10px] text-slate-500 leading-tight">
                                        Heated aqueous wash replaces solvent sinks
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* 3. Audit Methodology Footnote */}
                        <div className="p-3.5 rounded-xl bg-slate-100/70 border border-slate-200 text-[11px] text-slate-500 leading-relaxed font-normal">
                            Savings based on United Formulas Dynamo-X Professional 5-gallon pails ($65.00 yielding 20 quarts @ $3.25/qt) refilled into reusable secondary bottles versus regional commercial parts-counter RTU degreasers ($7.99 avg). Floor savings reflect high-active concentrate proportioned for auto-scrubbers and mops. Parts washer figures reflect eliminated third-party hazardous solvent hauling contracts.
                        </div>

                        {/* 4. Primary Action CTA */}
                        <div className="pt-2">
                            <Link
                                href="/contact?request=audit"
                                className="w-full inline-flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm sm:text-base py-3.5 px-6 rounded-xl shadow-md shadow-cyan-600/20 hover:scale-[1.01] transition-all text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 cursor-pointer"
                            >
                                <span>Request a Free Shop Bay Chemical Audit & Sample Kit →</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* -------------------------------------------------------------------------- */
/* Main Component Dispatcher                                                  */
/* -------------------------------------------------------------------------- */
export default function AutomotiveShopCalculator({
    className = "",
    id,
    mode,
}: AutomotiveShopCalculatorProps) {
    if (mode === "car-wash" || id === "automotive-calculator") {
        return <CarWashCalculator className={className} id={id || "automotive-calculator"} />;
    }
    return <RepairShopCalculator className={className} id={id || "shop-calculator"} />;
}
