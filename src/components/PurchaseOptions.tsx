'use client';

import React from 'react';
import { usePO } from '@/context/POContext';

interface Variant {
    id: string;
    price: string;
    name: string;
    attributes?: {
        nodes: Array<{
            name: string;
            value: string;
        }>;
    };
}

interface PurchaseOptionsProps {
    productName: string;
    variants: Variant[];
    costPerOunce?: string | null;
}

export default function PurchaseOptions({ productName, variants, costPerOunce }: PurchaseOptionsProps) {
    const { poDraft, addToPO } = usePO();

    const isAdded = (sku: string) => poDraft.some((item) => item.sku === sku);

    const handleSelect = (variant: Variant) => {
        const variantName = variant.attributes?.nodes?.[0]?.value || variant.name.replace(productName, '').trim() || 'Standard Option';
        addToPO({
            productName,
            variantName,
            price: variant.price,
            sku: variant.id
        });
    };

    return (
        <div className="space-y-6">
            <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">Purchase Options</h3>
                {costPerOunce && (
                    <div className="text-sm font-bold text-black uppercase tracking-wide">
                        COST AS LOW AS {costPerOunce}
                    </div>
                )}
                <div className="grid gap-3">
                    {variants.map((variant) => {
                        const added = isAdded(variant.id);
                        const variantLabel = variant.attributes?.nodes?.[0]?.value || variant.name.replace(productName, '').trim() || 'Standard Option';
                        const isPopular = variantLabel.toLowerCase().includes('5 gal') || 
                                          variantLabel.toLowerCase().includes('5-gal') || 
                                          variantLabel.toLowerCase().includes('55 gal') ||
                                          (variants.length === 1);

                        return (
                            <div
                                key={variant.id}
                                className={`group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border transition-all shadow-xs gap-3 ${added
                                    ? 'border-emerald-300 bg-emerald-50/60 ring-1 ring-emerald-200'
                                    : isPopular
                                    ? 'border-cyan-200 bg-white hover:border-cyan-400 shadow-sm'
                                    : 'border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white'
                                    }`}
                            >
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className={`font-bold ${added ? 'text-emerald-950' : 'text-slate-900'}`}>
                                            {variantLabel}
                                        </span>
                                        {isPopular && (
                                            <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-cyan-800 bg-cyan-50 border border-cyan-200 px-2 py-0.5 rounded-full">
                                                ★ Standard Route Size
                                            </span>
                                        )}
                                    </div>
                                    <span className="text-xs text-slate-500 uppercase tracking-wider font-medium mt-0.5">
                                        Commercial Strength Concentrate
                                    </span>
                                </div>
                                <div className="flex items-center justify-between sm:justify-end gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                                    <span className={`text-lg font-black ${added ? 'text-emerald-700' : 'text-slate-900'}`}>{variant.price}</span>
                                    {added ? (
                                        <div className="px-3.5 py-2 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg uppercase tracking-tight border border-emerald-300/80 flex items-center gap-1.5 shadow-2xs">
                                            <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                            Added to PO
                                        </div>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() => handleSelect(variant)}
                                            className="px-4 py-2 bg-slate-900 hover:bg-cyan-600 active:bg-cyan-700 text-white text-xs font-bold rounded-lg transition-colors uppercase tracking-tight shadow-xs flex items-center gap-1.5 cursor-pointer"
                                        >
                                            <span>+ Add to PO</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
