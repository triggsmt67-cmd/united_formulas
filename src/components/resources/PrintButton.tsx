"use client";

import React from "react";

interface PrintButtonProps {
  className?: string;
  label?: string;
}

export default function PrintButton({
  className = "",
  label = "Print / Save Field Sheet",
}: PrintButtonProps) {
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <button
      type="button"
      onClick={handlePrint}
      aria-label="Print the 10-minute checklist"
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-150 cursor-pointer ${className}`}
      title="Print the 10-minute checklist or save as PDF"
    >
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
        className="w-4 h-4"
      >
        <polyline points="6 9 6 2 18 2 18 9" />
        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
        <rect x="6" y="14" width="12" height="8" />
      </svg>
      <span>{label}</span>
    </button>
  );
}
