'use client';

import React, { useState, useEffect } from 'react';
import { usePO, POItem } from '@/context/POContext';

interface PORequisitionFormProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function PORequisitionForm({ isOpen, onClose }: PORequisitionFormProps) {
    const { poDraft, updateQuantity, clearPO } = usePO();
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        businessName: '',
        poNumber: '',
        deliveryWindow: '07:00–11:00',
        dockNotes: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    if (!isOpen) return null;

    const subtotal = poDraft.reduce((acc, item) => {
        const priceNum = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
        return acc + (priceNum * (item.quantity || 1));
    }, 0);

    const getNextBusinessDay = () => {
        const d = new Date();
        // Skip current day if late? Requirement doesn't say, but usually "next business day"
        // Let's just find next Mon-Fri
        let loops = 0;
        do {
            d.setDate(d.getDate() + 1);
            loops++;
        } while ((d.getDay() === 0 || d.getDay() === 6) && loops < 10);

        const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' };
        return d.toLocaleDateString('en-US', options);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const payload = {
            ...formData,
            items: poDraft.map(item => ({
                product: `${item.productName} (${item.variantName})`,
                sku: item.sku,
                quantity: item.quantity,
                price: item.price,
                total: `$${(parseFloat(item.price.replace(/[^0-9.]/g, '')) * (item.quantity || 1)).toFixed(2)}`
            })),
            grandTotal: `$${subtotal.toFixed(2)}`
        };

        try {
            const res = await fetch('/api/send-po', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                const nextDay = getNextBusinessDay();
                setSuccessMessage(`Order Received. Dispatched to Great Falls Queue. We will email your official Invoice and confirm your delivery window by ${nextDay}. No payment required today.`);
                clearPO();
            } else {
                alert('Failed to submit PO. Please try again.');
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (successMessage) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-slate-100 text-center">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Submission Successful</h2>
                    <p className="text-slate-600 leading-relaxed mb-8">
                        {successMessage}
                    </p>
                    <button
                        onClick={onClose}
                        className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all"
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
            <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl border border-slate-100 overflow-hidden my-8">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <h2 className="text-xl font-bold text-slate-900">PO Requisition Form</h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    {/* Line Item Review */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Line Item Review</h3>
                        <div className="divide-y divide-slate-100 border border-slate-100 rounded-2xl overflow-hidden">
                            {poDraft.map((item) => (
                                <div key={item.sku} className="p-4 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="flex-1">
                                        <h4 className="font-bold text-slate-900">{item.productName}</h4>
                                        <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">{item.variantName}</p>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Qty:</span>
                                            <input
                                                type="number"
                                                min="1"
                                                value={item.quantity || 1}
                                                onChange={(e) => updateQuantity(item.sku, parseInt(e.target.value) || 1)}
                                                className="w-16 p-2 border border-slate-200 rounded-lg text-center font-bold text-slate-900 focus:ring-2 focus:ring-cyan-500 outline-none"
                                            />
                                        </div>
                                        <div className="text-right min-w-[80px]">
                                            <p className="text-sm font-black text-slate-900">
                                                ${(parseFloat(item.price.replace(/[^0-9.]/g, '')) * (item.quantity || 1)).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between items-center p-4 bg-slate-950 rounded-2xl text-white">
                            <span className="text-sm font-bold uppercase tracking-widest text-slate-400">Grand Total</span>
                            <span className="text-2xl font-black">${subtotal.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* B2B Fields */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">B2B Contact Info</h3>
                            <div className="space-y-3">
                                <input
                                    required
                                    placeholder="Full Name"
                                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                                    value={formData.fullName}
                                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                                />
                                <input
                                    required
                                    placeholder="Direct Phone Number"
                                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                                    value={formData.phoneNumber}
                                    onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })}
                                />
                                <input
                                    required
                                    placeholder="Business Name"
                                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                                    value={formData.businessName}
                                    onChange={e => setFormData({ ...formData, businessName: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Logistics */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Logistics</h3>
                            <div className="space-y-3">
                                <input
                                    placeholder="PO Number (Optional)"
                                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                                    value={formData.poNumber}
                                    onChange={e => setFormData({ ...formData, poNumber: e.target.value })}
                                />
                                <select
                                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition-all appearance-none"
                                    value={formData.deliveryWindow}
                                    onChange={e => setFormData({ ...formData, deliveryWindow: e.target.value })}
                                >
                                    <option value="07:00–11:00">07:00–11:00</option>
                                    <option value="13:00–16:00">13:00–16:00</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Dock Notes</h3>
                        <textarea
                            placeholder="Gate code, forklift availability, side door access"
                            rows={3}
                            className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                            value={formData.dockNotes}
                            onChange={e => setFormData({ ...formData, dockNotes: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting || poDraft.length === 0}
                        className="w-full py-5 bg-slate-900 text-white font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl shadow-slate-900/20"
                    >
                        {isSubmitting ? 'Dispatching...' : 'Confirm & Submit PO'}
                    </button>
                </form>
            </div>
        </div>
    );
}
