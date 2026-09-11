"use client";

import React, { useState, useRef, useEffect } from 'react';
import ZipCheckModal from './ZipCheckModal';

interface ZipCheckCTAProps {
    variant?: 'button' | 'text-link';
    label?: string;
    className?: string;
}

export default function ZipCheckCTA({
    variant = 'button',
    label,
    className,
}: ZipCheckCTAProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const wasOpenRef = useRef(false);

    useEffect(() => {
        if (wasOpenRef.current && !isModalOpen) {
            buttonRef.current?.focus();
        }
        wasOpenRef.current = isModalOpen;
    }, [isModalOpen]);

    return (
        <>
            {variant === 'text-link' ? (
                <button
                    ref={buttonRef}
                    type="button"
                    aria-haspopup="dialog"
                    aria-controls="zip-check-modal"
                    onClick={() => setIsModalOpen(true)}
                    className={
                        className ||
                        "inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-cyan-700 underline underline-offset-4 decoration-slate-300 hover:decoration-cyan-600 transition-colors py-1 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded"
                    }
                >
                    <span>{label || "Check Delivery Availability"}</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-transform"
                    >
                        <path d="M5 12h14m-7-7l7 7l-7 7" />
                    </svg>
                </button>
            ) : (
                <button
                    ref={buttonRef}
                    type="button"
                    aria-haspopup="dialog"
                    aria-controls="zip-check-modal"
                    onClick={() => setIsModalOpen(true)}
                    className={
                        className ||
                        "group inline-flex items-center justify-center bg-[#15803D] hover:bg-[#166534] text-white text-sm font-medium px-8 py-4 rounded-lg transition-all shadow-lg shadow-green-700/20 active:scale-95"
                    }
                >
                    {label || "CHECK DELIVERY ZIP"}
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
            )}

            <ZipCheckModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
}

