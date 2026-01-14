"use client";

import React, { useState, useEffect } from 'react';

interface QuoteModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
    const [formState, setFormState] = useState({
        fullName: '',
        company: '',
        email: '',
        phone: '',
        interest: 'Industrial Cleaner',
        message: ''
    });

    // Handle escape key to close
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Logic for CRM connection will go here later
        console.log('Form submitted:', formState);
        alert('Request Dispatched. Inventory verification is in progress. A technician will contact you shortly with stock availability and pricing.');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity duration-300"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 animate-fade-up">
                {/* Header Ribbon */}
                <div className="h-2 w-full bg-[#EA580C]"></div>

                <div className="p-8 sm:p-10">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-[10px] font-bold uppercase tracking-widest mb-4">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C] animate-pulse"></span>
                                Inventory & Pricing Protocol
                            </span>
                            <h2 className="text-3xl font-black tracking-tight text-slate-900 font-geist uppercase italic">
                                Check <span className="text-[#EA580C]">Stock & Price</span>
                            </h2>
                            <p className="text-slate-500 text-sm mt-2 font-medium">
                                Provide your facility details for a specialized inventory check and volume-based pricing estimate.
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

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-700 uppercase tracking-tighter ml-1">Full Name</label>
                                <input
                                    required
                                    type="text"
                                    placeholder="John Doe"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-[#EA580C] outline-none transition-all text-slate-900 placeholder:text-slate-400"
                                    value={formState.fullName}
                                    onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-700 uppercase tracking-tighter ml-1">Company</label>
                                <input
                                    required
                                    type="text"
                                    placeholder="Acme Industrial"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-[#EA580C] outline-none transition-all text-slate-900 placeholder:text-slate-400"
                                    value={formState.company}
                                    onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-700 uppercase tracking-tighter ml-1">Email Address</label>
                                <input
                                    required
                                    type="email"
                                    placeholder="john@example.com"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-[#EA580C] outline-none transition-all text-slate-900 placeholder:text-slate-400"
                                    value={formState.email}
                                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-700 uppercase tracking-tighter ml-1">Phone Number</label>
                                <input
                                    required
                                    type="tel"
                                    placeholder="(406) 555-0123"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-[#EA580C] outline-none transition-all text-slate-900 placeholder:text-slate-400"
                                    value={formState.phone}
                                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 uppercase tracking-tighter ml-1">Primary Interest</label>
                            <div className="relative">
                                <select
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-[#EA580C] outline-none transition-all text-slate-900 appearance-none cursor-pointer"
                                    value={formState.interest}
                                    onChange={(e) => setFormState({ ...formState, interest: e.target.value })}
                                >
                                    <option>Industrial Cleaner</option>
                                    <option>Automotive Chemicals</option>
                                    <option>Hospitality Sanitizers</option>
                                    <option>Food Service Degreasers</option>
                                    <option>Custom Formulation</option>
                                    <option>Other</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 uppercase tracking-tighter ml-1">Inquiry Details</label>
                            <textarea
                                rows={4}
                                placeholder="Tell us about your facility requirements and volume needs..."
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-[#EA580C] outline-none transition-all text-slate-900 placeholder:text-slate-400 resize-none"
                                value={formState.message}
                                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                            ></textarea>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                className="w-full bg-[#EA580C] hover:bg-[#C2410C] text-white font-black py-5 rounded-xl transition-all shadow-lg shadow-orange-900/20 active:scale-[0.98] uppercase tracking-[0.2em] text-sm font-geist [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]"
                            >
                                Dispatch System Request
                            </button>
                            <p className="text-[10px] text-slate-400 text-center mt-4 uppercase tracking-[0.2em] font-medium">
                                Inventory Verification Protocol • United Formulas
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
