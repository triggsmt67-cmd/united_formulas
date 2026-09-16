"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [isIndustriesOpen, setIsIndustriesOpen] = useState(false);
    const [isMobileIndustriesOpen, setIsMobileIndustriesOpen] = useState(false);

    // Close menu when resizing to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Prevent scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMenuOpen]);

    const industryLinks = [
        {
            title: "Restaurants & Food Service",
            desc: "Warewash, grill degreasers & kitchen sanitizers",
            href: "/industries/restaurants-food-service",
        },
        {
            title: "Commercial Janitorial",
            desc: "High-yield concentrates & winter salt neutralizers",
            href: "/industries/commercial-janitorial",
        },
        {
            title: "Schools & Educational Facilities",
            desc: "Safe concentrates & locked closed-loop dispensers",
            href: "/industries/schools-educational-facilities",
        },
        {
            title: "Property Management & Hospitality",
            desc: "Rapid room turn descalers & commercial laundry",
            href: "/industries/property-management-hospitality",
        },
        {
            title: "Commercial Car Wash & Fleet",
            desc: "Two-step road film pre-soaks & fast drying agents",
            href: "/industries/automotive",
        },
        {
            title: "Auto Repair & Service Bays",
            desc: "Quick-break floor degreasers & aqueous parts wash",
            href: "/industries/auto-repair-service-bays",
        },
        { title: "Healthcare & Senior Care", desc: "Consistent protocols, training and local support", href: "/industries/healthcare-senior-care" },
        { title: "Industrial & Manufacturing", desc: "Heavy soil, process cleaning and downtime control", href: "/industries/industrial-manufacturing" },
        { title: "Agribusiness & Food Processing", desc: "Reliable programs for regional production facilities", href: "/industries/agribusiness-food-processing" },
        { title: "Government & Public Facilities", desc: "Documentation, consistency and dependable supply", href: "/industries/government-public-facilities" },
    ];

    return (
        <>
            <nav className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/60 font-sans">
                <div className="flex h-20 max-w-7xl mx-auto px-4 sm:px-6 items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group z-[60]">
                        <Image
                            src="https://ufbackend.com/wp-content/uploads/2026/01/UFColorFinal-Logo-1-1.png"
                            alt="United Formulas Logo"
                            width={180}
                            height={40}
                            className="h-12 w-auto object-contain"
                            priority
                        />
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-7 lg:gap-8">
                        <Link
                            href="/find-a-solution"
                            className="text-sm font-medium text-slate-900 hover:text-cyan-600 transition-colors"
                        >
                            Find a Solution
                        </Link>
                        <Link
                            href="/products"
                            className="text-sm font-medium text-slate-900 hover:text-cyan-600 transition-colors"
                        >
                            Products
                        </Link>
                        {/* Industries Dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => setIsIndustriesOpen(true)}
                            onMouseLeave={() => setIsIndustriesOpen(false)}
                        >
                            <button
                                type="button"
                                onClick={() => setIsIndustriesOpen(!isIndustriesOpen)}
                                className="flex items-center gap-1.5 text-sm font-medium text-slate-900 hover:text-cyan-600 transition-colors py-2 focus:outline-none"
                                aria-expanded={isIndustriesOpen}
                                aria-haspopup="true"
                            >
                                <span>Industries</span>
                                <svg
                                    className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isIndustriesOpen ? 'rotate-180 text-cyan-600' : ''}`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* Dropdown Menu Container */}
                            <div
                                className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[520px] transition-all duration-200 z-50 ${
                                    isIndustriesOpen
                                        ? 'opacity-100 visible translate-y-0'
                                        : 'opacity-0 invisible -translate-y-2 pointer-events-none'
                                }`}
                            >
                                <div className="bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-5 overflow-hidden">
                                    <div className="px-2 pb-3 mb-2 border-b border-slate-100 flex items-center justify-between">
                                        <div>
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-600">Industry Programs</span>
                                            <p className="text-xs text-slate-500 font-medium">Custom chemical solutions formulated for Montana facilities</p>
                                        </div>
                                        <Link
                                            href="/#industries"
                                            onClick={() => setIsIndustriesOpen(false)}
                                            className="text-xs font-bold text-slate-600 hover:text-cyan-600 transition-colors"
                                        >
                                            View Overview →
                                        </Link>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2">
                                        {industryLinks.map((item) => (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                onClick={() => setIsIndustriesOpen(false)}
                                                className="group flex flex-col p-3 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100"
                                            >
                                                <span className="text-xs font-bold text-slate-900 group-hover:text-cyan-600 transition-colors mb-0.5">
                                                    {item.title}
                                                </span>
                                                <span className="text-[11px] text-slate-500 line-clamp-1 leading-snug">
                                                    {item.desc}
                                                </span>
                                            </Link>
                                        ))}
                                    </div>

                                    <div className="mt-3 pt-3 border-t border-slate-100 bg-slate-50/80 -mx-5 -mb-5 p-4 flex items-center justify-between">
                                        <span className="text-[11px] text-slate-500 font-medium">
                                            Need on-site testing for hard water or dosage?
                                        </span>
                                        <Link
                                            href="/contact?request=audit"
                                            onClick={() => setIsIndustriesOpen(false)}
                                            className="text-xs font-bold text-cyan-600 hover:text-cyan-700 flex items-center gap-1"
                                        >
                                            Request Free On-Site Audit →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Link
                            href="/local-delivery"
                            className="text-sm font-medium text-slate-900 hover:text-cyan-600 transition-colors"
                        >
                            Local Delivery
                        </Link>
                        <Link
                            href="/resources"
                            className="text-sm font-medium text-slate-900 hover:text-cyan-600 transition-colors"
                        >
                            Resources
                        </Link>
                        <Link
                            href="/cost-calculator"
                            className="text-sm font-medium text-slate-900 hover:text-cyan-600 transition-colors"
                        >
                            Cost Calculator
                        </Link>
                        <Link
                            href="/about"
                            className="text-sm font-medium text-slate-900 hover:text-cyan-600 transition-colors"
                        >
                            About Us
                        </Link>
                    </div>

                    {/* Actions Area */}
                    <div className="flex items-center gap-3 sm:gap-5">
                        <Link
                            href="/contact?request=audit"
                            className="hidden sm:inline-flex items-center justify-center bg-cyan-600 hover:bg-cyan-700 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
                        >
                            Request an Audit
                        </Link>

                        <a
                            href="tel:4067274144"
                            className="flex items-center gap-2 text-sm md:text-base font-bold text-slate-900 hover:text-cyan-600 transition-colors"
                        >
                            <div className="w-10 h-10 md:hidden rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600 shadow-sm border border-cyan-100">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                </svg>
                            </div>
                            <span className="hidden sm:inline">406.727.4144</span>
                        </a>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 text-slate-900 focus:outline-none z-[110] relative"
                            aria-label="Toggle Menu"
                        >
                            <div className="w-6 h-5 relative flex flex-col justify-between">
                                <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                                <span className={`w-full h-0.5 bg-current transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                                <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                            </div>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay - MOVED OUTSIDE NAV TO AVOID BACKDROP-FILTER CONSTRAINTS */}
            <div
                className={`fixed inset-0 bg-white z-[100] transition-all duration-300 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
                    }`}
                style={{ visibility: isMenuOpen ? 'visible' : 'hidden' }}
            >
                <div className="flex flex-col h-full pt-28 px-8 pb-12 overflow-y-auto">
                    <div className="flex flex-col gap-5">
                        <Link
                            href="/find-a-solution"
                            onClick={() => setIsMenuOpen(false)}
                            className="text-2xl sm:text-3xl font-bold text-slate-900 hover:text-cyan-600 transition-colors"
                        >
                            Find a Solution
                        </Link>
                        <Link
                            href="/products"
                            onClick={() => setIsMenuOpen(false)}
                            className="text-2xl sm:text-3xl font-bold text-slate-900 hover:text-cyan-600 transition-colors"
                        >
                            Products
                        </Link>
                        <Link
                            href="/sds-sheets"
                            onClick={() => setIsMenuOpen(false)}
                            className="text-2xl sm:text-3xl font-bold text-slate-900 hover:text-cyan-600 transition-colors"
                        >
                            SDS Sheets
                        </Link>
                        <Link
                            href="/cost-calculator"
                            onClick={() => setIsMenuOpen(false)}
                            className="text-2xl sm:text-3xl font-bold text-slate-900 hover:text-cyan-600 transition-colors"
                        >
                            Cost Calculator
                        </Link>
                        <Link href="/local-delivery" onClick={() => setIsMenuOpen(false)} className="text-2xl sm:text-3xl font-bold text-slate-900 hover:text-cyan-600 transition-colors">Local Delivery</Link>

                        {/* Mobile Industries Accordion */}
                        <div>
                            <button
                                type="button"
                                onClick={() => setIsMobileIndustriesOpen(!isMobileIndustriesOpen)}
                                className="w-full flex items-center justify-between text-2xl sm:text-3xl font-bold text-slate-900 hover:text-cyan-600 transition-colors py-1 focus:outline-none"
                            >
                                <span>Industries</span>
                                <svg
                                    className={`w-6 h-6 text-slate-400 transition-transform duration-200 ${isMobileIndustriesOpen ? 'rotate-180 text-cyan-600' : ''}`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {isMobileIndustriesOpen && (
                                <div className="pl-4 pt-3 pb-2 flex flex-col gap-3 border-l-2 border-cyan-500 mt-2">
                                    {industryLinks.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="text-base font-semibold text-slate-700 hover:text-cyan-600 transition-colors"
                                        >
                                            {item.title}
                                        </Link>
                                    ))}
                                    <Link
                                        href="/#industries"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="text-xs font-bold text-cyan-600 hover:text-cyan-700 pt-1 uppercase tracking-wider"
                                    >
                                        View All Programs Overview →
                                    </Link>
                                </div>
                            )}
                        </div>

                        <Link
                            href="/resources"
                            onClick={() => setIsMenuOpen(false)}
                            className="text-2xl sm:text-3xl font-bold text-slate-900 hover:text-cyan-600 transition-colors"
                        >
                            Resources
                        </Link>
                        <Link
                            href="/about"
                            onClick={() => setIsMenuOpen(false)}
                            className="text-2xl sm:text-3xl font-bold text-slate-900 hover:text-cyan-600 transition-colors"
                        >
                            About Us
                        </Link>
                        <Link
                            href="/contact"
                            onClick={() => setIsMenuOpen(false)}
                            className="text-2xl sm:text-3xl font-bold text-slate-900 hover:text-cyan-600 transition-colors"
                        >
                            Contact Us
                        </Link>
                    </div>

                    <div className="mt-8">
                        <Link
                            href="/contact?request=audit"
                            onClick={() => setIsMenuOpen(false)}
                            className="inline-flex items-center justify-center w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3.5 px-6 rounded-xl text-center transition-colors shadow-sm text-lg"
                        >
                            Request an Audit
                        </Link>
                    </div>

                    <div className="mt-6 pt-6 border-t border-slate-100 italic">
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Direct Support</p>
                        <a
                            href="tel:4067274144"
                            className="text-2xl font-black text-slate-900 hover:text-cyan-600 transition-colors flex items-center gap-3"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                </svg>
                            </div>
                            406.727.4144
                        </a>
                        <p className="text-sm text-slate-500 mt-4 leading-relaxed font-bold">
                            Personalized formulation service from Montana experts.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
