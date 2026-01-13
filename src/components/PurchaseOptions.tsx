'use client';

import React, { useState } from 'react';
import { usePO } from '@/context/POContext';
import PORequisitionForm from './PORequisitionForm';

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
}

export default function PurchaseOptions({ productName, variants }: PurchaseOptionsProps) {
    const { poDraft, addToPO } = usePO();
    const [isFormOpen, setIsFormOpen] = useState(false);

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
                <div className="grid gap-3">
                    {variants.map((variant) => {
                        const added = isAdded(variant.id);
                        return (
                            <div
                                key={variant.id}
                                className={`group flex items-center justify-between p-4 rounded-xl border transition-all shadow-sm ${added
                                        ? 'border-emerald-200 bg-emerald-50/50'
                                        : 'border-slate-200 bg-slate-50 hover:border-cyan-500/50 hover:bg-white'
                                    }`}
                            >
                                <div className="flex flex-col">
                                    <span className={`font-bold ${added ? 'text-emerald-900' : 'text-slate-900'}`}>
                                        {variant.attributes?.nodes?.[0]?.value || variant.name.replace(productName, '').trim() || 'Standard Option'}
                                    </span>
                                    <span className="text-xs text-slate-500 uppercase tracking-wider font-medium">
                                        Professional Formulation
                                    </span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className={`text-lg font-black ${added ? 'text-emerald-600' : 'text-slate-900'}`}>{variant.price}</span>
                                    {added ? (
                                        <div className="px-4 py-2 bg-emerald-100 text-emerald-700 text-[10px] font-black rounded-lg uppercase tracking-tighter border border-emerald-200">
                                            Added to PO
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => handleSelect(variant)}
                                            className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-tighter"
                                        >
                                            Select
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Submit Trigger */}
            {poDraft.length > 0 && (
                <button
                    onClick={() => setIsFormOpen(true)}
                    className="w-full py-5 bg-cyan-600 text-white font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-cyan-700 transition-all shadow-xl shadow-cyan-600/20 animate-fade-up"
                >
                    Submit PO to Warehouse
                </button>
            )}

            <PORequisitionForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
        </div>
    );
}
