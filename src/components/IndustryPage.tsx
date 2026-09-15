/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ZipCheckCTA from "@/components/ZipCheckCTA";
import { IndustryConfig } from "@/config/industries";
import RecommendedCategories from "@/components/RecommendedCategories";
import RtuCostCalculator from "@/components/RtuCostCalculator";
import JanitorialBidCalculator from "@/components/JanitorialBidCalculator";
import SchoolFacilityBudgetCalculator from "@/components/SchoolFacilityBudgetCalculator";
import HospitalityTurnoverCalculator from "@/components/HospitalityTurnoverCalculator";
import AutomotiveShopCalculator from "@/components/AutomotiveShopCalculator";
import CarWashCalculator from "@/components/CarWashCalculator";
import { Suspense } from "react";

interface IndustryPageProps {
    industry: IndustryConfig;
}

export default function IndustryPage({ industry }: IndustryPageProps) {
    const jsonLdData: any[] = [
        {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "United Formulas",
            telephone: industry.ctaSection.phone,
            url: `https://unitedformulas.com/industries/${industry.slug}`,
            description: industry.seoDescription,
            address: {
                "@type": "PostalAddress",
                addressLocality: industry.geoTarget.split(",")[0].trim(),
                addressRegion: industry.geoTarget.split(",")[1]?.trim() || "MT",
                addressCountry: "US",
            },
            areaServed: {
                "@type": "State",
                name: "Montana",
            },
        },
        {
            "@context": "https://schema.org",
            "@type": "Service",
            name: industry.schemaName || industry.hero.h1,
            description: industry.seoDescription,
            provider: {
                "@type": "LocalBusiness",
                name: "United Formulas",
                telephone: industry.ctaSection.phone,
                address: {
                    "@type": "PostalAddress",
                    addressLocality: industry.geoTarget.split(",")[0].trim(),
                    addressRegion: industry.geoTarget.split(",")[1]?.trim() || "MT",
                },
            },
            areaServed: {
                "@type": "City",
                name: industry.geoTarget.split(",")[0].trim(),
            },
        }
    ];

    if (industry.faqs && industry.faqs.length > 0) {
        jsonLdData.push({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: industry.faqs.map(faq => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: faq.answer
                }
            }))
        });
    }

    return (
        <div className="bg-slate-50 min-h-screen text-slate-900 font-sans antialiased selection:bg-cyan-100 relative">
            {jsonLdData.map((schema, idx) => (
                <script
                    key={idx}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            ))}
            
            <Navbar />

            {/* Ambient Background Glow on Top Fold */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[650px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-400/10 via-slate-50/50 to-transparent pointer-events-none -z-10"
                aria-hidden="true"
            />

            <main className="pt-28 pb-20 sm:pt-32 sm:pb-24">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    {/* Breadcrumb Navigation */}
                    <nav aria-label="Breadcrumb" className="mb-8 sm:mb-10">
                        <ol className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                            <li>
                                <Link href="/" className="hover:text-cyan-600 transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li aria-hidden="true" className="text-slate-300 select-none">
                                /
                            </li>
                            <li>
                                <span className="text-slate-700" aria-current="page">
                                    {industry.geoTarget}
                                </span>
                            </li>
                        </ol>
                    </nav>

                    {/* Hero Section */}
                    <header className="max-w-4xl mb-16 sm:mb-20">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200/90 text-cyan-800 text-xs font-bold uppercase tracking-wider mb-6 shadow-xs">
                            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" aria-hidden="true" />
                            {industry.hero.badge || `${industry.geoTarget.toUpperCase()} COMMERCIAL SOLUTIONS`}
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900 leading-[1.12] mb-6">
                            {industry.hero.h1}
                        </h1>

                        <p className="text-lg sm:text-xl text-slate-600 leading-relaxed mb-8 max-w-3xl">
                            {industry.hero.subhead}
                        </p>

                        {/* Dual Primary Call-to-Actions */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
                            <Link
                                href="/contact?request=audit"
                                className="inline-flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-base px-8 py-4 rounded-xl shadow-lg shadow-cyan-600/20 hover:shadow-cyan-600/30 hover:scale-[1.01] transition-all active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                            >
                                <span>{industry.hero.primaryCtaText || "Schedule a Free On-Site Audit"}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7l7 7l-7 7"/></svg>
                            </Link>
                            
                            {industry.hero.secondaryCtaText && industry.hero.secondaryCtaHref ? (
                                <a
                                    href={industry.hero.secondaryCtaHref}
                                    className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-base px-6 py-4 rounded-xl border border-slate-300 shadow-xs hover:border-slate-400 hover:scale-[1.01] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
                                >
                                    {industry.hero.secondaryCtaHref === "#shop-calculator" ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-600"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-600"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
                                    )}
                                    <span>{industry.hero.secondaryCtaText}</span>
                                </a>
                            ) : industry.showShopCalculator ? (
                                <a
                                    href="#shop-calculator"
                                    className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-base px-6 py-4 rounded-xl border border-slate-300 shadow-xs hover:border-slate-400 hover:scale-[1.01] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-600"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
                                    <span>Calculate Bay & Solvent Savings</span>
                                </a>
                            ) : industry.showAutomotiveCalculator ? (
                                <a
                                    href="#automotive-calculator"
                                    className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-base px-6 py-4 rounded-xl border border-slate-300 shadow-xs hover:border-slate-400 hover:scale-[1.01] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-600"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>
                                    <span>Calculate Cost-Per-Vehicle Savings</span>
                                </a>
                            ) : industry.showHospitalityCalculator ? (
                                <a
                                    href="#hospitality-calculator"
                                    className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-base px-6 py-4 rounded-xl border border-slate-300 shadow-xs hover:border-slate-400 hover:scale-[1.01] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-600"><path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8"/><path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4"/><path d="M12 4v6"/><path d="M2 18h20"/></svg>
                                    <span>Calculate Turnover & Linen Savings</span>
                                </a>
                            ) : industry.showSchoolCalculator ? (
                                <a
                                    href="#school-budget-calculator"
                                    className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-base px-6 py-4 rounded-xl border border-slate-300 shadow-xs hover:border-slate-400 hover:scale-[1.01] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-600"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/><path d="M6 6h10"/><path d="M6 10h10"/></svg>
                                    <span>Calculate District Budget & Safety Savings</span>
                                </a>
                            ) : industry.showJanitorialCalculator ? (
                                <a
                                    href="#janitorial-calculator"
                                    className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-base px-6 py-4 rounded-xl border border-slate-300 shadow-xs hover:border-slate-400 hover:scale-[1.01] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-600"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg>
                                    <span>Calculate Chemical & Labor Savings</span>
                                </a>
                            ) : industry.showRtuCalculator ? (
                                <a
                                    href="#calculator"
                                    className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-base px-6 py-4 rounded-xl border border-slate-300 shadow-xs hover:border-slate-400 hover:scale-[1.01] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-600"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="18"/><path d="M16 10h.01"/><path d="M12 10h.01"/><path d="M8 10h.01"/><path d="M12 14h.01"/><path d="M8 14h.01"/><path d="M12 18h.01"/><path d="M8 18h.01"/></svg>
                                    <span>Calculate Chemical Savings</span>
                                </a>
                            ) : (
                                <a
                                    href="#categories"
                                    className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-base px-6 py-4 rounded-xl border border-slate-300 shadow-xs hover:border-slate-400 hover:scale-[1.01] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-600"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
                                    <span>Explore Recommended Products</span>
                                </a>
                            )}
                        </div>

                        {/* Trust Bar (no dividing line, clean natural flow) */}
                        <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-slate-700 pt-2">
                            {industry.hero.trustBar.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2">
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
                                        className="text-cyan-600 shrink-0"
                                        aria-hidden="true"
                                    >
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                    {item.toLowerCase().includes('call') || /[\d-]{7,}/.test(item) ? (
                                        <a href={`tel:${item.replace(/[^\d+]/g, '')}`} className="hover:text-cyan-600 transition-colors font-bold">
                                            {item}
                                        </a>
                                    ) : (
                                        <span>{item}</span>
                                    )}
                                    {idx < industry.hero.trustBar.length - 1 && (
                                        <span className="text-slate-300 ml-2 select-none" aria-hidden="true">•</span>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Highlight Metric Pills with Micro-Interactions */}
                        {(() => {
                            const metrics = (industry.hero.highlightMetrics && industry.hero.highlightMetrics.length > 0)
                                ? industry.hero.highlightMetrics
                                : [
                                    { value: "30%+", title: "Cost Savings", description: "Cut monthly bills by mixing water on-site", color: "emerald" as const },
                                    { value: "100%", title: "Commercial Grade", description: "Industrial formulas built for Montana water", color: "cyan" as const },
                                    { value: "MT", title: "Local Delivery", description: "Dispatched from Great Falls & Billings", color: "blue" as const },
                                ];

                            return (
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 mt-6">
                                    {metrics.map((metric, idx) => {
                                        const colorClasses = metric.color === "emerald"
                                            ? { bg: "bg-emerald-100", text: "text-emerald-800", ring: "group-hover:ring-emerald-100", border: "hover:border-emerald-400", shadow: "hover:shadow-emerald-950/5" }
                                            : metric.color === "blue"
                                            ? { bg: "bg-blue-100", text: "text-blue-800", ring: "group-hover:ring-blue-100", border: "hover:border-blue-400", shadow: "hover:shadow-blue-950/5" }
                                            : { bg: "bg-cyan-100", text: "text-cyan-800", ring: "group-hover:ring-cyan-100", border: "hover:border-cyan-400", shadow: "hover:shadow-cyan-950/5" };

                                        return (
                                            <div
                                                key={idx}
                                                className={`group flex flex-col justify-between gap-3 p-4 sm:p-5 rounded-2xl bg-slate-50/90 border border-slate-200/80 shadow-2xs hover:bg-white ${colorClasses.border} hover:shadow-lg ${colorClasses.shadow} hover:-translate-y-1 transition-all duration-300 cursor-default`}
                                            >
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2.5 flex-wrap">
                                                        <span className={`inline-flex items-center py-1 px-2.5 rounded-lg ${colorClasses.bg} ${colorClasses.text} font-extrabold text-xs sm:text-sm group-hover:scale-105 group-hover:ring-2 ${colorClasses.ring} transition-all duration-300 whitespace-normal`}>
                                                            {metric.value}
                                                        </span>
                                                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 whitespace-normal">
                                                            {metric.title}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-slate-950 transition-colors leading-snug whitespace-normal">
                                                        {metric.description}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })()}
                    </header>

                    {/* Operational Challenges - Redesigned as High-Utility Interactive Cards */}
                    <section aria-labelledby="challenges-heading" className="py-14 sm:py-20">
                        <div className="max-w-3xl mb-12">
                            <span className="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 border border-rose-100 px-3 py-1 rounded-full mb-3 inline-block">
                                {industry.challengesSection.badge || "Local Facility Diagnostics"}
                            </span>
                            <h2 id="challenges-heading" className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
                                {industry.challengesSection.heading}
                            </h2>
                        </div>

                        <div className={industry.challengesSection.items.length === 2 ? "grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl" : "grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8"}>
                            {industry.challengesSection.items.map((challenge, idx) => (
                                <div
                                    key={idx}
                                    className="group relative bg-white rounded-3xl border border-slate-200/90 shadow-2xs hover:border-cyan-400 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between overflow-hidden"
                                >
                                    {/* Top hover accent line */}
                                    <div
                                        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 via-cyan-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                        aria-hidden="true"
                                    />

                                    <div>
                                        {/* Card Header & Stat Badge */}
                                        <div className="flex items-start justify-between gap-3 mb-4">
                                            <span className="text-xs font-extrabold text-rose-700 bg-rose-50 border border-rose-100 px-2.5 py-1 rounded-md shrink-0 group-hover:bg-rose-100 group-hover:scale-105 transition-all duration-200">
                                                Problem 0{idx + 1}
                                            </span>
                                            {challenge.problemStat && (
                                                <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md text-right">
                                                    {challenge.problemStat}
                                                </span>
                                            )}
                                        </div>

                                        <h3 className="text-lg font-bold text-slate-900 mb-3 leading-snug group-hover:text-cyan-950 transition-colors">
                                            {challenge.title}
                                        </h3>

                                        {/* The Problem */}
                                        <div className="mb-4">
                                            <p className="text-xs font-bold uppercase tracking-wider text-rose-800 mb-1.5 flex items-center gap-1.5">
                                                <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                                                Why It Happens
                                            </p>
                                            <p className="text-sm text-slate-600 leading-relaxed">
                                                {challenge.description}
                                            </p>
                                        </div>

                                        {/* The Fix - High-Impact Solution Sub-Card */}
                                        {challenge.solutionText && (
                                            <div className="mt-4 p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100/80 group-hover:bg-emerald-50 group-hover:border-emerald-200 group-hover:shadow-xs transition-all duration-300">
                                                <p className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1.5 flex items-center gap-1.5">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                                                    The Local Montana Fix
                                                </p>
                                                <p className="text-sm text-slate-800 font-medium leading-relaxed">
                                                    {challenge.solutionText}
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Clickable Citation */}
                                    {challenge.citation && (
                                        <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-medium text-slate-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-cyan-600"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
                                            {challenge.citationUrl ? (
                                                <a
                                                    href={challenge.citationUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-cyan-700 hover:text-cyan-600 underline underline-offset-2 decoration-cyan-300 hover:decoration-cyan-600 font-semibold inline-flex items-center gap-1 transition-colors truncate"
                                                    title={`Open source: ${challenge.citation}`}
                                                >
                                                    <span className="truncate">{challenge.citation}</span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                                                </a>
                                            ) : (
                                                <span className="truncate">{challenge.citation}</span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Recommended Cleaning Products (Above the comparison table) */}
                    <section id="categories" aria-labelledby="categories-heading" className="py-14 sm:py-20">
                        <div className="max-w-2xl mb-12">
                            <span className="text-xs font-bold uppercase tracking-wider text-cyan-800 bg-cyan-50 border border-cyan-100 px-3 py-1 rounded-full mb-3 inline-block">
                                Direct Product Lines
                            </span>
                            <h2 id="categories-heading" className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
                                {industry.recommendedProductsHeading || "Recommended Cleaning Products"}
                            </h2>
                            <p className="text-sm sm:text-base text-slate-500 mt-2">
                                {industry.recommendedProductsSubhead || "Commercial-grade formulas engineered for high-demand facilities and Montana water conditions."}
                            </p>
                        </div>
                        
                        <Suspense fallback={<div className="h-48 flex items-center justify-center text-slate-400">Loading categories...</div>}>
                            <RecommendedCategories slugs={industry.recommendedCategorySlugs} />
                        </Suspense>

                        {/* RTU Cost Calculator (Optional) */}
                        {industry.showRtuCalculator && (
                            <RtuCostCalculator />
                        )}

                        {/* Janitorial Bid & Margin Calculator (Optional) */}
                        {industry.showJanitorialCalculator && (
                            <JanitorialBidCalculator />
                        )}

                        {/* School Facility Budget & Safety Calculator (Optional) */}
                        {industry.showSchoolCalculator && (
                            <SchoolFacilityBudgetCalculator />
                        )}

                        {/* Hospitality Turnover & Linen Life Calculator (Optional) */}
                        {industry.showHospitalityCalculator && (
                            <HospitalityTurnoverCalculator />
                        )}

                        {/* Automotive / Car Wash Calculator (Optional) */}
                        {industry.showAutomotiveCalculator && (
                            <CarWashCalculator id="automotive-calculator" />
                        )}

                        {/* Auto Repair Shop Degreasing & Solvent Elimination Calculator (Optional) */}
                        {industry.showShopCalculator && (
                            <AutomotiveShopCalculator id="shop-calculator" />
                        )}
                    </section>

                    {/* Comparison Table (If Available) */}
                    {(() => {
                        const comparison = industry.comparisonTable || industry.warewashingComparison;
                        if (!comparison) return null;

                        return (
                            <section aria-labelledby="comparison-heading" className="py-14 sm:py-20">
                                <div className="max-w-3xl mb-12">
                                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-800 bg-cyan-50 border border-cyan-100 px-3 py-1 rounded-full mb-3 inline-block">
                                        {comparison.badge || "Equipment & System Guide"}
                                    </span>
                                    <h2 id="comparison-heading" className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
                                        {comparison.heading}
                                    </h2>
                                    {comparison.subhead && (
                                        <p className="text-sm sm:text-base text-slate-500 mt-3 leading-relaxed">
                                            {comparison.subhead}
                                        </p>
                                    )}
                                </div>

                                <div className="overflow-x-auto rounded-3xl border border-slate-200/90 shadow-sm bg-white">
                                    <table className="w-full text-left min-w-[640px] border-collapse">
                                        <thead className="bg-slate-50 text-slate-700 text-sm uppercase tracking-wider font-bold border-b border-slate-200">
                                            <tr>
                                                <th className="py-4 px-6 font-bold w-1/3">
                                                    {comparison.featureHeader || "Machine / System Feature"}
                                                </th>
                                                {comparison.systems.map((sys, idx) => (
                                                    <th key={idx} className="py-4 px-6 font-bold w-1/3 border-l border-slate-200">
                                                        <div className="flex items-center gap-2">
                                                            <span className="w-2 h-2 rounded-full bg-cyan-500" />
                                                            {sys.name}
                                                        </div>
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {comparison.features.map((feature, featureIdx) => {
                                                const isChemicalFitRow = 
                                                    feature.toLowerCase().includes("chemical setup") || 
                                                    feature.toLowerCase().includes("fit") ||
                                                    feature.toLowerCase().includes("formulation") ||
                                                    feature.toLowerCase().includes("recommended");

                                                return (
                                                    <tr
                                                        key={featureIdx}
                                                        className={`transition-colors duration-150 ${
                                                            isChemicalFitRow
                                                                ? "bg-cyan-50/70 font-semibold"
                                                                : "hover:bg-slate-50/60"
                                                        }`}
                                                    >
                                                        <td className="py-4 px-6 text-sm font-semibold text-slate-900">
                                                            {feature}
                                                            {isChemicalFitRow && (
                                                                <span className="block text-[10px] uppercase font-bold text-cyan-700 tracking-wider mt-0.5">
                                                                    UF Formulations
                                                                </span>
                                                            )}
                                                        </td>
                                                        {comparison.systems.map((sys, sysIdx) => (
                                                            <td key={sysIdx} className="py-4 px-6 text-sm text-slate-700 border-l border-slate-100 leading-relaxed">
                                                                {sys.values[featureIdx]}
                                                            </td>
                                                        ))}
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </section>
                        );
                    })()}

                    {/* The Supply Chain Advantage */}
                    <section aria-labelledby="why-uf-heading" className="py-14 sm:py-20">
                        <div className="max-w-2xl mb-12">
                            <span className="text-xs font-bold uppercase tracking-wider text-cyan-800 bg-cyan-50 border border-cyan-100 px-3 py-1 rounded-full mb-3 inline-block">
                                {industry.valuePropSection.badge || "The Local Advantage"}
                            </span>
                            <h2 id="why-uf-heading" className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
                                {industry.valuePropSection.heading}
                            </h2>
                            {industry.valuePropSection.subhead && (
                                <p className="text-base text-slate-500 mt-3 leading-relaxed">
                                    {industry.valuePropSection.subhead}
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                            {industry.valuePropSection.points.map((point, idx) => (
                                <div
                                    key={idx}
                                    className="group relative p-8 rounded-3xl bg-slate-50/80 border border-slate-200/90 flex flex-col justify-start hover:bg-white hover:border-cyan-400 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
                                >
                                    {/* Top hover accent */}
                                    <div
                                        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                        aria-hidden="true"
                                    />

                                    <div
                                        className="w-12 h-12 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-600 mb-6 shrink-0 shadow-2xs group-hover:bg-cyan-500 group-hover:text-white group-hover:scale-110 group-hover:shadow-md transition-all duration-300"
                                        aria-hidden="true"
                                    >
                                        {idx === 0 ? (
                                            /* Zero Freight / Truck Icon */
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>
                                        ) : idx === 1 ? (
                                            /* Calibration / Gauge Icon */
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
                                        ) : (
                                            /* Blizzard / Warehouse Shield Icon */
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                                        )}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-cyan-950 transition-colors">
                                        {point.title}
                                    </h3>
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        {point.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* FAQ Section - Interactive Accessible Accordion */}
                    {industry.faqs && industry.faqs.length > 0 && (
                        <section aria-labelledby="faq-heading" className="py-14 sm:py-20">
                            <div className="max-w-2xl mb-12">
                                <span className="text-xs font-bold uppercase tracking-wider text-cyan-800 bg-cyan-50 border border-cyan-100 px-3 py-1 rounded-full mb-3 inline-block">
                                    Knowledge Base
                                </span>
                                <h2 id="faq-heading" className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
                                    {industry.faqsHeading || "Frequently Asked Questions"}
                                </h2>
                                <p className="text-sm sm:text-base text-slate-500 mt-2">
                                    {industry.faqsSubhead || "Straightforward answers to the most common questions from Montana facility and business operators."}
                                </p>
                            </div>
                            <div className="space-y-4 max-w-4xl">
                                {industry.faqs.map((faq, idx) => (
                                    <details
                                        key={idx}
                                        open={idx === 0}
                                        className="group bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs hover:border-cyan-400 hover:shadow-md hover:-translate-y-0.5 open:border-cyan-400/80 open:shadow-md open:bg-slate-50/20 transition-all duration-300 [&_summary::-webkit-details-marker]:hidden"
                                    >
                                        <summary className="flex items-center justify-between cursor-pointer list-none font-bold text-base sm:text-lg text-slate-900">
                                            <span className="pr-4 group-hover:text-cyan-950 transition-colors">{faq.question}</span>
                                            <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-cyan-500 group-hover:text-white flex items-center justify-center text-slate-500 shrink-0 transition-all duration-300 group-open:rotate-180 group-open:bg-cyan-600 group-open:text-white">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                                            </div>
                                        </summary>
                                        <div className="pt-4 mt-4 border-t border-slate-100 group-open:border-cyan-100 transition-colors text-slate-600 leading-relaxed text-sm sm:text-base">
                                            {faq.answer}
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* References & Citations */}
                    {((industry.citations && industry.citations.length > 0) || (industry.references && industry.references.length > 0)) && (
                        <section aria-labelledby="references-heading" className="py-10 sm:py-14">
                            <h3 id="references-heading" className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-600"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
                                <span>Official Sources & Standards</span>
                            </h3>

                            {industry.citations && industry.citations.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                                    {industry.citations.map((item, idx) => (
                                        <a
                                            key={idx}
                                            href={item.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group p-4 rounded-2xl bg-slate-50/90 border border-slate-200/90 hover:border-cyan-400 hover:bg-white hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex items-start justify-between gap-3"
                                        >
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-900 group-hover:text-cyan-600 transition-colors">
                                                    <span>{item.sourceName}</span>
                                                </div>
                                                <p className="text-xs text-slate-600 leading-snug">
                                                    {item.text}
                                                </p>
                                            </div>
                                            <div className="w-7 h-7 rounded-lg bg-slate-200/60 text-slate-600 group-hover:bg-cyan-50 group-hover:text-cyan-600 flex items-center justify-center shrink-0 transition-colors">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            ) : (
                                <ul className="list-decimal list-inside space-y-2.5">
                                    {industry.references!.map((ref, idx) => {
                                        const isObj = typeof ref === "object" && ref !== null;
                                        const text = isObj ? ref.text : ref;
                                        const url = isObj ? ref.url : undefined;

                                        return (
                                            <li key={idx} className="text-xs text-slate-600 leading-relaxed">
                                                {url ? (
                                                    <a
                                                        href={url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-cyan-700 hover:text-cyan-600 underline underline-offset-2 decoration-cyan-300 hover:decoration-cyan-600 inline-flex items-center gap-1 font-medium transition-colors"
                                                    >
                                                        <span>{text}</span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-cyan-600"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                                                    </a>
                                                ) : (
                                                    <span>{text}</span>
                                                )}
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </section>
                    )}

                    {/* CTA Section - Elevated High-Trust Dark Card */}
                    <section
                        aria-labelledby="perform-heading"
                        className="my-16 sm:my-20 bg-slate-950 text-white rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden border border-slate-800"
                    >
                        {/* Background glow */}
                        <div
                            className="absolute top-0 right-0 w-[550px] h-[550px] bg-cyan-500/15 blur-3xl rounded-full pointer-events-none"
                            aria-hidden="true"
                        />

                        <div className="relative z-10 max-w-3xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-900/50 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-6">
                                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                                {industry.ctaSection.badge || `Direct Montana ${industry.geoTarget} Partnership`}
                            </div>

                            <h2
                                id="cta-heading"
                                className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white mb-6 leading-tight"
                            >
                                {industry.ctaSection.heading}
                            </h2>
                            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-8 max-w-2xl font-normal">
                                {industry.ctaSection.lead}
                            </p>

                            {/* What We Do - High-Trust Micro-Cards (No dividing line) */}
                            {(() => {
                                const auditChecklist = (industry.ctaSection.auditPoints && industry.ctaSection.auditPoints.length > 0)
                                    ? industry.ctaSection.auditPoints
                                    : [
                                        "On-Site Water Hardness Test (2-Minute Strip)",
                                        "Dispenser Calibration & Leak Check",
                                        "Custom Chemical Sample Kit",
                                    ];

                                return (
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-10">
                                        {auditChecklist.map((item, idx) => (
                                            <div key={idx} className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900 transition-all duration-300 group">
                                                <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 font-bold text-xs group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                                                    ✓
                                                </div>
                                                <span className="text-xs sm:text-sm text-slate-300 font-medium leading-snug">
                                                    {item}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                );
                            })()}

                            <div className="space-y-6">
                                <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                                    <Link
                                        href="/contact?request=audit"
                                        className="inline-flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-base px-8 py-4 rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.01] transition-all text-center active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                                    >
                                        <span>{industry.ctaSection.buttonText}</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7l7 7l-7 7"/></svg>
                                    </Link>
                                    
                                    <a
                                        href={`tel:${industry.ctaSection.phone.replace(/-/g, '')}`}
                                        className="inline-flex items-center justify-center gap-2 bg-slate-800/80 hover:bg-slate-800 text-white font-semibold text-base px-6 py-4 rounded-xl border border-slate-700 hover:border-slate-600 hover:scale-[1.01] transition-all"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400"><path d="M22 16.92v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                                        <span>Direct Call: {industry.ctaSection.phone}</span>
                                    </a>
                                </div>
                                
                                <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-slate-400 text-xs font-semibold pt-4">
                                    <span>No contracts or long-term commitments required.</span>
                                    <span className="hidden sm:inline text-slate-700">|</span>
                                    <ZipCheckCTA
                                        variant="text-link"
                                        label="Check Route Delivery Availability"
                                        className="inline-flex items-center gap-2 hover:text-white underline underline-offset-4 decoration-slate-600 hover:decoration-cyan-400 transition-colors py-1 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
