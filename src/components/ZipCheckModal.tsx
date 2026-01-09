"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { ELIGIBLE_ZIP_CODES } from '@/data/delivery/zipcodes';

interface ZipCheckModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ZipCheckModal({ isOpen, onClose }: ZipCheckModalProps) {
    const [zipCode, setZipCode] = useState('');
    const [isChecking, setIsChecking] = useState(false);
    const [status, setStatus] = useState<'idle' | 'eligible' | 'ineligible'>('idle');

    // Handle escape key to close
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
            setStatus('idle');
            setZipCode('');
        }
        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const fireConfetti = () => {
        const count = 200;
        const defaults = {
            origin: { y: 0.7 },
            colors: ['#06b6d4', '#3b82f6', '#15803d'],
            zIndex: 100
        };

        function fire(particleRatio: number, opts: confetti.Options) {
            confetti({
                ...defaults,
                ...opts,
                particleCount: Math.floor(count * particleRatio)
            });
        }

        fire(0.25, {
            spread: 26,
            startVelocity: 55,
        });
        fire(0.2, {
            spread: 60,
        });
        fire(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8
        });
        fire(0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2
        });
        fire(0.1, {
            spread: 120,
            startVelocity: 45,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsChecking(true);
        setStatus('idle');

        // Simulate checking logic
        setTimeout(() => {
            setIsChecking(false);
            const isEligible = ELIGIBLE_ZIP_CODES.includes(zipCode);

            if (isEligible) {
                setStatus('eligible');
                fireConfetti();
            } else {
                setStatus('ineligible');
            }
        }, 800);
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity duration-300"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 animate-fade-up">
                {/* Header Ribbon */}
                <div className="h-2 w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500"></div>

                <div className="p-8 sm:p-10">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-bold uppercase tracking-widest mb-4">
                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
                                Route Verification
                            </span>
                            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                                {status === 'eligible' ? (
                                    <>Welcome <span className="text-emerald-600">Neighbor</span></>
                                ) : status === 'ineligible' ? (
                                    <>Service <span className="text-amber-600">Notice</span></>
                                ) : (
                                    <>Check <span className="text-cyan-600">Eligibility</span></>
                                )}
                            </h2>
                            <p className="text-slate-500 text-sm mt-2">
                                {status === 'eligible'
                                    ? "We can deliver to you! A representative will confirm your schedule."
                                    : status === 'ineligible'
                                        ? "We will be expanding our territory. Call us for more info."
                                        : "Input your code to confirm route eligibility."
                                }
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-slate-100 rounded-full transition-colors group"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 group-hover:text-slate-900">
                                <path d="M18 6 6 18" /><path d="m6 6 12 12" />
                            </svg>
                        </button>
                    </div>

                    {status === 'idle' && (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-700 uppercase tracking-tighter ml-1">Delivery Zip Code</label>
                                <input
                                    required
                                    type="text"
                                    pattern="[0-9]{5}"
                                    maxLength={5}
                                    placeholder="59401"
                                    className="w-full px-6 py-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 outline-none transition-all text-2xl font-mono tracking-widest text-slate-900 placeholder:text-slate-300"
                                    value={zipCode}
                                    onChange={(e) => setZipCode(e.target.value.replace(/[^0-9]/g, ''))}
                                    autoFocus
                                />
                            </div>

                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={isChecking || zipCode.length < 5}
                                    className="w-full bg-[#15803D] hover:bg-[#166534] disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-green-700/20 active:scale-[0.98] uppercase tracking-widest text-sm flex items-center justify-center gap-2"
                                >
                                    {isChecking ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Verifying Route...
                                        </>
                                    ) : (
                                        'Confirm Route Eligibility'
                                    )}
                                </button>
                                <p className="text-[10px] text-slate-400 text-center mt-6 uppercase tracking-[0.2em] font-medium leading-relaxed">
                                    Great Falls Hub • 100 Mile Radius Protocol<br />United Formulas Logistics
                                </p>
                            </div>
                        </form>
                    )}

                    {status === 'eligible' && (
                        <div className="space-y-6 animate-fade-up">
                            <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl flex flex-col items-center text-center">
                                <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-white mb-4 shadow-lg shadow-emerald-500/20">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                </div>
                                <h3 className="text-emerald-900 font-bold text-lg mb-2">Direct Route Available</h3>
                                <p className="text-emerald-700 text-sm leading-relaxed">
                                    Zip code <span className="font-bold underline">{zipCode}</span> is within our local delivery zone. Expect zero third-party freight charges.
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-full bg-[#15803D] hover:bg-[#166534] text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-green-700/20 active:scale-[0.98] uppercase tracking-widest text-sm"
                            >
                                Shop Inventory
                            </button>
                        </div>
                    )}

                    {status === 'ineligible' && (
                        <div className="space-y-6 animate-fade-up">
                            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl flex flex-col items-center text-center">
                                <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10" />
                                        <line x1="12" y1="8" x2="12" y2="12" />
                                        <line x1="12" y1="16" x2="12.01" y2="16" />
                                    </svg>
                                </div>
                                <h3 className="text-slate-900 font-bold text-lg mb-2">Outside Direct Area</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    We don&apos;t have a local truck route for <span className="font-bold underline">{zipCode}</span> yet, but we ship nationwide via freight.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 gap-3">
                                <Link
                                    href="/contact"
                                    onClick={onClose}
                                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition-all text-center uppercase tracking-widest text-sm"
                                >
                                    Contact Support
                                </Link>
                                <button
                                    onClick={() => setStatus('idle')}
                                    className="w-full text-slate-500 hover:text-slate-900 font-bold py-2 text-xs uppercase tracking-widest transition-colors"
                                >
                                    Try Another Code
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
