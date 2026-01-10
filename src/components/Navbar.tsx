"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/products", label: "Products" },
        { href: "/sds-sheets", label: "SDS Sheets" },
        { href: "/#categories", label: "Categories" },
        { href: "/about", label: "About Us" },
        { href: "/contact", label: "Contact Us" },
    ];

    return (
        <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/60 font-geist">
            <div className="flex h-20 max-w-7xl mx-auto px-6 items-center justify-between">
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
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="text-sm font-medium text-slate-900 hover:text-cyan-600 transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Desktop Phone Number */}
                <a
                    href="tel:4067274144"
                    className="hidden md:block text-xs font-medium text-slate-900 hover:text-cyan-600 transition-colors"
                >
                    406.727.4144
                </a>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="md:hidden p-2 text-slate-900 focus:outline-none z-[60]"
                    aria-label="Toggle Menu"
                >
                    <div className="w-6 h-5 relative flex flex-col justify-between">
                        <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                        <span className={`w-full h-0.5 bg-current transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`w-full h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                    </div>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 bg-white z-[55] transition-transform duration-300 ease-in-out md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="flex flex-col h-full pt-28 px-8 pb-12 overflow-y-auto">
                    <div className="flex flex-col gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="text-3xl font-bold text-slate-900 hover:text-cyan-600 transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className="mt-auto pt-10 border-t border-slate-100 italic">
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Direct Support</p>
                        <a
                            href="tel:4067274144"
                            className="text-2xl font-black text-slate-900 hover:text-cyan-600 transition-colors flex items-center gap-3"
                        >
                            <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                                </svg>
                            </div>
                            406.727.4144
                        </a>
                        <p className="text-sm text-slate-500 mt-4 leading-relaxed font-medium">
                            Personalized formulation service from Montana experts.
                        </p>
                    </div>
                </div>
            </div>
        </nav>
    );
}
