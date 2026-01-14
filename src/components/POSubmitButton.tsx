'use client';

import React, { useState } from 'react';
import { usePO } from '@/context/POContext';
import PORequisitionForm from './PORequisitionForm';

export default function POSubmitButton() {
    const { poDraft } = usePO();
    const [isFormOpen, setIsFormOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => poDraft.length > 0 && setIsFormOpen(true)}
                disabled={poDraft.length === 0}
                className={`w-full py-5 font-black uppercase tracking-[0.2em] rounded-2xl transition-all shadow-xl animate-fade-up ${poDraft.length > 0
                    ? 'bg-cyan-600 text-white hover:bg-cyan-700 shadow-cyan-600/20'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                    }`}
            >
                Submit PO to Warehouse
            </button>
            <PORequisitionForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
        </>
    );
}
