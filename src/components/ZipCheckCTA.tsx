"use client";

import React, { useState } from 'react';
import ZipCheckModal from './ZipCheckModal';

export default function ZipCheckCTA() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="group inline-flex items-center justify-center bg-[#15803D] hover:bg-[#166534] text-white text-sm font-medium px-8 py-4 rounded-lg transition-all shadow-lg shadow-green-700/20 active:scale-95"
            >
                CHECK DELIVERY ZIP
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    className="iconify ml-2 group-hover:translate-x-1 transition-transform"
                >
                    <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 12h14m-7-7l7 7l-7 7"
                    />
                </svg>
            </button>

            <ZipCheckModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
}
