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
                    className="bg-[#15803D] hover:bg-[#166534] text-white font-medium px-8 py-4 rounded-lg transition-all shadow-lg shadow-green-700/20 active:scale-95 text-sm uppercase"
                >
                    Request a Quote
                </button>
            </div>

            <QuoteModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
}
