'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface POItem {
    productName: string;
    variantName: string;
    price: string;
    sku: string;
    quantity?: number;
}

interface POContextType {
    poDraft: POItem[];
    addToPO: (item: POItem) => void;
    removeFromPO: (sku: string) => void;
    updateQuantity: (sku: string, quantity: number) => void;
    clearPO: () => void;
}

const POContext = createContext<POContextType | undefined>(undefined);

export function POProvider({ children }: { children: React.ReactNode }) {
    const [poDraft, setPoDraft] = useState<POItem[]>([]);

    // Optional: Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('united_formulas_po_draft');
        if (saved) {
            try {
                setPoDraft(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse PO draft", e);
            }
        }
    }, []);

    // Save to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('united_formulas_po_draft', JSON.stringify(poDraft));
    }, [poDraft]);

    const addToPO = (item: POItem) => {
        setPoDraft((prev) => {
            if (prev.find((i) => i.sku === item.sku)) return prev;
            return [...prev, { ...item, quantity: 1 }];
        });
    };

    const removeFromPO = (sku: string) => {
        setPoDraft((prev) => prev.filter((i) => i.sku !== sku));
    };

    const updateQuantity = (sku: string, quantity: number) => {
        setPoDraft((prev) =>
            prev.map((i) => (i.sku === sku ? { ...i, quantity } : i))
        );
    };

    const clearPO = () => {
        setPoDraft([]);
        localStorage.removeItem('united_formulas_po_draft');
    };

    return (
        <POContext.Provider value={{ poDraft, addToPO, removeFromPO, updateQuantity, clearPO }}>
            {children}
        </POContext.Provider>
    );
}

export function usePO() {
    const context = useContext(POContext);
    if (context === undefined) {
        throw new Error('usePO must be used within a POProvider');
    }
    return context;
}
