"use client";

import React, { useState } from 'react';
import QuoteModal from './QuoteModal';

export default function RequestQuoteCTA() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="flex justify-center mb-16">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="group relative bg-[#EA580C] hover:bg-[#C2410C] text-white font-black px-12 py-5 rounded-xl shadow-2xl shadow-orange-900/20 active:scale-95 text-lg uppercase tracking-[0.2em] font-geist transition-all duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] overflow-hidden"
                >
                    <span className="relative z-10 flex items-center gap-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 9v4" />
                            <path d="M12 17h.01" />
                            <path d="m12.8 2.2 9 16c.3.5.3 1.1 0 1.6s-.8.8-1.4.8H3.6c-.6 0-1.1-.3-1.4-.8s-.3-1.1 0-1.6l9-16c.3-.5.9-.5 1.2 0" />
                        </svg>
                        Check Stock & Price
                    </span>
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]" />
                </button>
            </div>

            <QuoteModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
}
