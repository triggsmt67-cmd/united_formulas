"use client";

import { useState } from "react";
import Link from "next/link";

export interface JobProfile {
    id: string;
    name: string;
    categoryLabel: string;
    description: string;
    ratio: number; // e.g., 16 for 1:16
    ozPerGalText: string; // e.g., "8 oz / gal"
    defaultConcentratePrice: number; // 1-gallon concentrate price
    benchmarkRtuBottlePrice: number; // 32 oz spray bottle retail price
    benchmarkRtuGallonPrice: number; // 1 gallon RTU retail price
    benchmarkExamples: string; // e.g., "Dawn Pro Degreaser / Zep Fast 505"
}

export const JOB_PROFILES: JobProfile[] = [
    {
        id: "degreaser",
        name: "Heavy Kitchen Degreaser",
        categoryLabel: "Fryers, Grills & Vent Hoods",
        description: "Breaks down baked-on animal fats and grease traps.",
        ratio: 16,
        ozPerGalText: "8 oz / gal (1:16)",
        defaultConcentratePrice: 42.00,
        benchmarkRtuBottlePrice: 7.98,
        benchmarkRtuGallonPrice: 31.92,
        benchmarkExamples: "Dawn Pro Heavy Duty / Zep Commercial Fast 505",
    },
    {
        id: "restroom",
        name: "Restroom & Acid Descaler",
        categoryLabel: "Fixtures, Tile & Mineral Scale",
        description: "Dissolves 7.4–9.8 GPG hard water rings and uric salts.",
        ratio: 32,
        ozPerGalText: "4 oz / gal (1:32)",
        defaultConcentratePrice: 38.00,
        benchmarkRtuBottlePrice: 5.29,
        benchmarkRtuGallonPrice: 21.16,
        benchmarkExamples: "Lysol Power Bathroom / Clorox Commercial",
    },
    {
        id: "floor",
        name: "Daily Floor Cleaner & Warewash",
        categoryLabel: "Quarry Tile Mop & 3-Bay Sinks",
        description: "Lifts kitchen grease without leaving slick films.",
        ratio: 64,
        ozPerGalText: "2 oz / gal (1:64)",
        defaultConcentratePrice: 34.00,
        benchmarkRtuBottlePrice: 3.25,
        benchmarkRtuGallonPrice: 13.00,
        benchmarkExamples: "Pine-Sol Commercial RTU / Zep Neutral Floor",
    },
    {
        id: "glass",
        name: "Glass & Multi-Surface",
        categoryLabel: "Tables, Mirrors & Stainless",
        description: "Fast-drying, streak-free surface spray.",
        ratio: 128,
        ozPerGalText: "1 oz / gal (1:128)",
        defaultConcentratePrice: 28.00,
        benchmarkRtuBottlePrice: 4.98,
        benchmarkRtuGallonPrice: 19.92,
        benchmarkExamples: "Windex Commercial RTU / Simple Green RTU",
    },
    {
        id: "sanitizer",
        name: "Food-Contact Surface Sanitizer",
        categoryLabel: "Red Buckets & Prep Tables",
        description: "EPA-registered active sanitizing solution.",
        ratio: 512,
        ozPerGalText: "0.25 oz / gal (1:512)",
        defaultConcentratePrice: 45.00,
        benchmarkRtuBottlePrice: 6.49,
        benchmarkRtuGallonPrice: 25.96,
        benchmarkExamples: "Purell Foodservice RTU / Microban 24",
    },
];

export default function RtuCostCalculator() {
    const [selectedProfileId, setSelectedProfileId] = useState<string>("degreaser");
    const [concentratePrice, setConcentratePrice] = useState<number>(JOB_PROFILES[0].defaultConcentratePrice);
    const [dilutionRatio, setDilutionRatio] = useState<number>(JOB_PROFILES[0].ratio);
    const [monthlyBottles, setMonthlyBottles] = useState<number>(40);

    const activeProfile = JOB_PROFILES.find((p) => p.id === selectedProfileId) || JOB_PROFILES[0];

    // Dilution Math
    const rtuGallonsYield = dilutionRatio || 1;
    const rtuBottlesYield = rtuGallonsYield * 4; // 1 gallon = 128 oz = 4 x 32oz bottles
    const costPerRtuGallon = concentratePrice / rtuGallonsYield;
    const costPerRtuBottle = costPerRtuGallon / 4;

    // Benchmark comparison (32oz RTU spray bottle)
    const benchmarkBottlePrice = activeProfile.benchmarkRtuBottlePrice;
    const savingsPerBottle = Math.max(0, benchmarkBottlePrice - costPerRtuBottle);
    const savingsPercent = Math.max(0, Math.round((savingsPerBottle / benchmarkBottlePrice) * 100));

    // Defensible Annual Savings Projection
    const estimatedAnnualSavings = Math.max(0, Math.round(savingsPerBottle * monthlyBottles * 12));

    const handleSelectProfile = (profile: JobProfile) => {
        setSelectedProfileId(profile.id);
        setConcentratePrice(profile.defaultConcentratePrice);
        setDilutionRatio(profile.ratio);
    };

    return (
        <section
            id="calculator"
            className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm mt-12 mb-12 scroll-mt-24 relative overflow-hidden"
        >
            {/* Ambient background glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-50/60 rounded-full blur-3xl pointer-events-none -z-10" />

            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-10">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold uppercase tracking-wider mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg>
                        Realistic ROI Comparison
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-3">
                        Concentrate vs. Ready-to-Use Cost Calculator
                    </h2>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                        Stop paying high shipping markups for pre-diluted water. Compare your true cost of mixing concentrates on-site against verified third-party retail brand benchmarks.
                    </p>
                </div>

                {/* Job Profiles Selector */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                            Select Commercial Cleaning Job Profile:
                        </p>
                        <span className="text-[11px] text-slate-400 font-medium">
                            Backed by current commercial retail benchmarks
                        </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                        {JOB_PROFILES.map((profile) => {
                            const isSelected = selectedProfileId === profile.id;
                            return (
                                <button
                                    key={profile.id}
                                    type="button"
                                    onClick={() => handleSelectProfile(profile)}
                                    className={`p-3.5 rounded-2xl text-left border transition-all duration-200 cursor-pointer hover:-translate-y-0.5 active:scale-[0.98] flex flex-col justify-between ${
                                        isSelected
                                            ? "bg-cyan-50/90 border-cyan-500 ring-2 ring-cyan-500/30 shadow-md scale-[1.02]"
                                            : "bg-slate-50/70 border-slate-200/90 hover:bg-white hover:border-cyan-300 hover:shadow-sm"
                                    }`}
                                >
                                    <div>
                                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1 line-clamp-1">
                                            {profile.categoryLabel}
                                        </div>
                                        <div className="font-bold text-xs sm:text-sm text-slate-900 leading-tight mb-1">
                                            {profile.name}
                                        </div>
                                        <div className="text-[11px] text-slate-500 line-clamp-2 leading-snug">
                                            {profile.description}
                                        </div>
                                    </div>

                                    <div className="pt-2.5 mt-2.5 border-t border-slate-200/80 flex items-center justify-between">
                                        <span className="text-[11px] font-bold text-cyan-700 flex items-center gap-1">
                                            {profile.ozPerGalText}
                                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-cyan-600 animate-ping" />}
                                        </span>
                                        <span className="text-[10px] font-semibold text-slate-600 bg-slate-200/60 px-1.5 py-0.5 rounded">
                                            ${profile.benchmarkRtuBottlePrice.toFixed(2)} RTU
                                        </span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    {/* Inputs Side */}
                    <div className="lg:col-span-6 space-y-6 bg-slate-50/60 p-6 sm:p-8 rounded-3xl border border-slate-200 flex flex-col justify-between">
                        <div className="space-y-6">
                            {/* Active Task Summary Card */}
                            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
                                <div className="flex items-center justify-between text-xs mb-1">
                                    <span className="font-bold text-slate-900">{activeProfile.name}</span>
                                    <span className="text-cyan-700 font-bold bg-cyan-50 px-2 py-0.5 rounded-md border border-cyan-100">
                                        1:{dilutionRatio} ({activeProfile.ozPerGalText.split(" ")[0]} oz/gal)
                                    </span>
                                </div>
                                <p className="text-xs text-slate-500 leading-relaxed">
                                    {activeProfile.description}
                                </p>
                                <div className="mt-2 text-[11px] text-slate-600 bg-slate-50 p-2 rounded-xl border border-slate-100 flex items-center gap-1.5">
                                    <span className="font-bold text-slate-700">Retail Brand Benchmark:</span>
                                    <span className="text-slate-600 truncate">{activeProfile.benchmarkExamples}</span>
                                </div>
                            </div>

                            {/* Concentrate Gallon Price Input */}
                            <div>
                                <label htmlFor="price" className="block text-sm font-bold text-slate-800 mb-2">
                                    Price for 1 Gallon of Concentrate ($)
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                                    <input
                                        id="price"
                                        type="number"
                                        min="1"
                                        step="1.00"
                                        value={concentratePrice}
                                        onChange={(e) => setConcentratePrice(Number(e.target.value) || 0)}
                                        className="w-full pl-8 pr-4 py-3 bg-white border border-slate-300 rounded-xl font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all shadow-inner"
                                    />
                                </div>
                                <p className="text-xs text-slate-500 mt-1.5">
                                    UF default formula price: <strong className="text-slate-700">${activeProfile.defaultConcentratePrice.toFixed(2)}/gal</strong>. You can adjust this to test other pricing.
                                </p>
                            </div>

                            {/* Dilution Ratio Select */}
                            <div>
                                <label htmlFor="ratio" className="block text-sm font-bold text-slate-800 mb-2">
                                    Dilution Mix Ratio (1 Part Concentrate : X Parts Water)
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">1 :</span>
                                    <select
                                        id="ratio"
                                        value={dilutionRatio}
                                        onChange={(e) => setDilutionRatio(Number(e.target.value) || 1)}
                                        className="w-full pl-10 pr-10 py-3 bg-white border border-slate-300 rounded-xl font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all appearance-none cursor-pointer shadow-inner"
                                    >
                                        <option value="16">1:16 (Heavy Grill & Hood Degreaser - 8 oz/gal)</option>
                                        <option value="32">1:32 (Restroom & Heavy Cleaner - 4 oz/gal)</option>
                                        <option value="64">1:64 (Daily Floor & Warewash - 2 oz/gal)</option>
                                        <option value="128">1:128 (Glass & Multi-Surface - 1 oz/gal)</option>
                                        <option value="256">1:256 (Floor Neutralizers & Rinse Aid - 0.5 oz/gal)</option>
                                        <option value="512">1:512 (Active Food-Contact Sanitizer - 0.25 oz/gal)</option>
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                                    </div>
                                </div>
                            </div>

                            {/* Monthly Usage Estimator */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label htmlFor="usage" className="block text-sm font-bold text-slate-800">
                                        Estimated Monthly Bottle Usage (32oz)
                                    </label>
                                    <span className="text-xs font-bold text-cyan-800 bg-cyan-100/70 px-2 py-0.5 rounded">
                                        {monthlyBottles} bottles/mo ({monthlyBottles / 4} gal/mo)
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    {[20, 40, 80, 120].map((count) => (
                                        <button
                                            key={count}
                                            type="button"
                                            onClick={() => setMonthlyBottles(count)}
                                            className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold border transition-all ${
                                                monthlyBottles === count
                                                    ? "bg-cyan-600 text-white border-cyan-600 shadow-xs"
                                                    : "bg-white text-slate-700 border-slate-300 hover:bg-slate-100"
                                            }`}
                                        >
                                            {count} btl
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Yield Summary Pill */}
                        <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-600">
                            <span>Ready-to-Use Output Yield:</span>
                            <span className="text-cyan-800 bg-cyan-100/70 px-2.5 py-1 rounded-md font-bold">
                                {rtuGallonsYield} Gallons ({rtuBottlesYield} Spray Bottles)
                            </span>
                        </div>

                        {/* Water Hardness Calibration Callout */}
                        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] leading-relaxed text-slate-600">
                            <strong className="text-slate-800 font-bold block mb-1">
                                💧 Why Water Hardness Decides Your Real Cost per Gallon:
                            </strong>
                            A dilution ratio like 1:64 only delivers on paper if water conditioners neutralize dissolved minerals. In Great Falls (7.4–9.8 GPG municipal tap) and surrounding Golden Triangle well water, unconditioned cleaners lose active surfactants to the calcium &quot;soap-scum reaction&quot; before cleaning begins, forcing crews to overdose. United Formulas formulates concentrates with active chelating sequestrants so your dilution ratio and cost-per-bottle hold true in real Montana water.
                        </div>
                    </div>

                    {/* Outputs Side */}
                    <div className="lg:col-span-6 bg-slate-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-xl border border-slate-800">
                        {/* Ambient glow decoration */}
                        <div className="absolute -top-24 -right-24 w-60 h-60 bg-cyan-500/20 blur-3xl rounded-full pointer-events-none" />

                        <div className="relative z-10 space-y-6">
                            {/* Comparison Header Badge */}
                            <div className="flex items-center justify-between text-xs font-semibold border-b border-slate-800/80 pb-3">
                                <span className="text-slate-400">Task: {activeProfile.name}</span>
                                <span className="text-emerald-400 font-bold bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                                    Save {savingsPercent}% vs Retail
                                </span>
                            </div>

                            {/* Spray Bottle Cost (The key daily unit) */}
                            <div>
                                <p className="text-slate-400 text-xs font-bold tracking-wider uppercase mb-1">
                                    Your Cost Per 32oz Spray Bottle
                                </p>
                                <div className="flex items-baseline gap-3">
                                    <div className="flex items-baseline gap-1 text-cyan-400">
                                        <span className="text-2xl font-bold">$</span>
                                        <span className="text-4xl sm:text-5xl font-black tracking-tight">
                                            {costPerRtuBottle.toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="text-xs text-slate-400">
                                        <span className="line-through text-slate-500 font-semibold text-sm mr-1">
                                            ${benchmarkBottlePrice.toFixed(2)}
                                        </span>
                                        retail store bottle
                                    </div>
                                </div>
                            </div>

                            {/* Gallon Cost */}
                            <div className="flex items-end justify-between border-t border-slate-800/80 pt-4">
                                <div>
                                    <p className="text-slate-400 text-xs font-bold tracking-wider uppercase mb-1">
                                        Cost Per Mixed Ready-to-Use Gallon
                                    </p>
                                    <div className="flex items-baseline gap-1 text-white">
                                        <span className="text-xl font-bold text-slate-300">$</span>
                                        <span className="text-3xl font-black tracking-tight text-white">
                                            {costPerRtuGallon.toFixed(2)}
                                        </span>
                                        <span className="text-xs text-slate-400 ml-2">
                                            (vs ${activeProfile.benchmarkRtuGallonPrice.toFixed(2)} retail gallon)
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Visual Comparison Bar */}
                            <div className="space-y-2 pt-2">
                                <div className="flex justify-between text-xs text-slate-300 font-medium">
                                    <span>United Formulas (${costPerRtuBottle.toFixed(2)})</span>
                                    <span>Store RTU (${benchmarkBottlePrice.toFixed(2)})</span>
                                </div>
                                <div className="h-3.5 w-full bg-slate-800 rounded-full overflow-hidden flex p-0.5 border border-slate-700">
                                    <div
                                        className="bg-cyan-400 h-full rounded-full transition-all duration-500"
                                        style={{ width: `${Math.max(4, Math.min(100, (costPerRtuBottle / benchmarkBottlePrice) * 100))}%` }}
                                    />
                                </div>
                                <p className="text-[11px] text-slate-400">
                                    <strong>Retail Benchmark:</strong> {activeProfile.benchmarkExamples}
                                </p>
                            </div>

                            {/* Defensible Annual Facility Savings Card */}
                            <div className="p-4 rounded-2xl bg-slate-900/90 border border-emerald-500/30 hover:border-emerald-400/60 transition-colors shadow-lg shadow-emerald-950/20 flex items-center justify-between group">
                                <div>
                                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                        Projected Annual Task Savings
                                    </p>
                                    <p className="text-2xl font-bold text-emerald-400 group-hover:text-emerald-300 transition-colors">
                                        ~${estimatedAnnualSavings.toLocaleString()} / year
                                    </p>
                                    <p className="text-[10px] text-slate-500 mt-0.5">
                                        Based on ~{monthlyBottles} bottles/month vs. store RTU brand pricing
                                    </p>
                                </div>
                                <span className="text-3xl group-hover:scale-110 transition-transform duration-200" aria-hidden="true">💰</span>
                            </div>
                        </div>

                        {/* CTA Link */}
                        <div className="relative z-10 pt-6 mt-6 border-t border-slate-800">
                            <Link
                                href="/contact?request=audit"
                                className="inline-flex items-center justify-center w-full gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm px-5 py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 hover:scale-[1.01] active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                            >
                                <span>Get a Free Invoice Review, Water Test & Sample Kit</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform"><path d="M5 12h14m-7-7l7 7l-7 7"/></svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
