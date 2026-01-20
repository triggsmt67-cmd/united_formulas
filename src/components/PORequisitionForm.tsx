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
        email: '',
        businessName: '',
        poNumber: '',
        deliveryWindow: '07:00–11:00',
        dockNotes: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [finalOrder, setFinalOrder] = useState<{ items: POItem[], total: number } | null>(null);

    if (!isOpen) return null;

    const subtotal = poDraft.reduce((acc, item) => {
        const priceNum = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
        return acc + (priceNum * (item.quantity || 1));
    }, 0);

    const getNextBusinessDay = () => {
        const d = new Date();
        let loops = 0;
        do {
            d.setDate(d.getDate() + 1);
            loops++;
        } while ((d.getDay() === 0 || d.getDay() === 6) && loops < 10);

        const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' };
        return d.toLocaleDateString('en-US', options);
    };

    const handlePrint = () => {
        if (!finalOrder) return;

        const nextDay = getNextBusinessDay();
        const pageTitle = `Purchase Order - ${formData.businessName || 'United Formulas'}`;

        const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${pageTitle}</title>
    <style>
        @media print {
            @page { margin: 0; size: auto; }
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; padding: 40px; color: #1e293b; line-height: 1.6; max-width: 800px; margin: 0 auto; background-color: white; }
        .page { background: white; padding: 20px; }
        .header { border-bottom: 3px solid #0f172a; padding-bottom: 24px; margin-bottom: 40px; display: flex; justify-content: space-between; align-items: flex-end; }
        .logo { color: #0f172a; font-size: 32px; font-weight: 900; text-transform: uppercase; letter-spacing: -0.02em; line-height: 1; }
        .status { background: #0ea5e9; padding: 8px 16px; border-radius: 99px; font-size: 11px; font-weight: 800; color: white; text-transform: uppercase; letter-spacing: 0.1em; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        .details-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 50px; }
        .section-label { font-size: 10px; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 8px; }
        .value { font-size: 15px; font-weight: 500; color: #1e293b; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 40px; }
        th { text-align: left; padding: 16px; border-bottom: 2px solid #e2e8f0; font-size: 11px; text-transform: uppercase; color: #64748b; letter-spacing: 0.05em; font-weight: 700; }
        td { padding: 16px; border-bottom: 1px solid #f1f5f9; vertical-align: top; }
        .item-name { font-weight: 700; color: #0f172a; font-size: 16px; }
        .item-meta { font-size: 12px; color: #64748b; margin-top: 4px; }
        .grand-total { background: #0f172a; color: white; padding: 24px; border-radius: 16px; display: flex; justify-content: space-between; align-items: center; margin-top: 20px; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        .total-label { font-weight: 800; text-transform: uppercase; letter-spacing: 0.15em; font-size: 14px; }
        .total-value { font-size: 28px; font-weight: 900; }
        .notes { background: #f1f5f9; padding: 24px; border-radius: 16px; border: 1px solid #e2e8f0; margin-top: 40px; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        .footer { text-align: center; font-size: 11px; color: #94a3b8; margin-top: 60px; padding-top: 20px; border-top: 1px solid #e2e8f0; }
    </style>
</head>
<body>
    <div class="page">
        <div class="header">
            <div>
                <div class="logo">United Formulas</div>
                <div style="font-size: 14px; color: #64748b; margin-top: 6px; font-weight: 600;">Dispatch System Requisition</div>
            </div>
            <div class="status">Dispatch Confirmed</div>
        </div>
        
        <div class="details-grid">
            <div>
                <div class="section-label">B2B Contact</div>
                <div class="value">
                    <strong style="color: #0f172a; font-size: 17px;">${formData.businessName}</strong><br>
                    <span style="display: block; margin-top: 4px;">${formData.fullName}</span>
                    <span>${formData.email}</span><br>
                    <span>${formData.phoneNumber}</span>
                </div>
            </div>
            <div>
                <div class="section-label">Order Reference</div>
                <div class="value">
                    <div style="margin-bottom: 4px;"><strong>P.O. Number:</strong> ${formData.poNumber || 'WEB-QUEUED'}</div>
                    <div style="margin-bottom: 4px;"><strong>Date:</strong> ${new Date().toLocaleDateString()}</div>
                    <div style="margin-bottom: 4px;"><strong>Time Window:</strong> ${formData.deliveryWindow}</div>
                    <div><strong>Expected Invoice:</strong> ${nextDay}</div>
                </div>
            </div>
        </div>

        <table>
            <thead>
                <tr>
                    <th>Description</th>
                    <th style="text-align: center">Qty</th>
                    <th style="text-align: right">Price</th>
                    <th style="text-align: right">Total</th>
                </tr>
            </thead>
            <tbody>
                ${finalOrder.items.map(item => `
                <tr>
                    <td>
                        <div class="item-name">${item.productName}</div>
                        <div class="item-meta">${item.variantName} • SKU: ${item.sku}</div>
                    </td>
                    <td style="text-align: center; font-weight: 700;">${item.quantity}</td>
                    <td style="text-align: right; color: #64748b;">${item.price}</td>
                    <td style="text-align: right; font-weight: 800; color: #0f172a;">$${(parseFloat(item.price.replace(/[^0-9.]/g, '')) * (item.quantity || 1)).toFixed(2)}</td>
                </tr>
                `).join('')}
            </tbody>
        </table>

        <div class="grand-total">
            <div class="total-label">Grand Total</div>
            <div class="total-value">$${finalOrder.total.toFixed(2)}</div>
        </div>

        <div class="notes">
            <div class="section-label">Dock Instructions</div>
            <div class="value" style="color: #475569;">${formData.dockNotes || 'N/A'}</div>
        </div>

        <div class="footer">
            Official Requisition Summary • United Formulas Warehouse Dispatch<br>
            A formal invoice will be mailed to ${formData.email}.
        </div>
    </div>
    <script>
        // Auto-trigger print when loaded
        setTimeout(() => { window.print(); }, 500);
    </script>
</body>
</html>`;

        const printWindow = window.open('', '_blank', 'width=900,height=800');
        if (printWindow) {
            printWindow.document.write(htmlContent);
            printWindow.document.close();
            // Focus is important for certain browsers to trigger print immediately
            printWindow.focus();
        } else {
            alert('Please allow popups to view the Purchase Order.');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const orderCopy = {
            items: [...poDraft],
            total: subtotal
        };

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
                if (typeof window !== 'undefined' && (window as any).dataLayer) {
                    (window as any).dataLayer.push({
                        event: 'po_dispatch_success',
                        grandTotal: subtotal,
                        itemCount: poDraft.length
                    });
                }

                setFinalOrder(orderCopy);
                const nextDay = getNextBusinessDay();
                setSuccessMessage(`Order Received. Dispatched to Great Falls Queue. We will email your official Invoice by ${nextDay}.`);
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
                    <div className="flex flex-col gap-3">
                        <button
                            onClick={handlePrint}
                            className="w-full py-4 bg-cyan-600 text-white font-bold rounded-xl hover:bg-cyan-700 transition-all flex items-center justify-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
                            Print or Save PDF
                        </button>
                        <p className="text-[10px] text-slate-400 leading-tight">
                            Tip: Select &quot;Save to PDF&quot; in the print window to save a digital copy.
                        </p>
                        <button
                            onClick={onClose}
                            className="w-full py-4 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition-all"
                        >
                            Close
                        </button>
                    </div>
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
                                    placeholder="Full Name *"
                                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                                    value={formData.fullName}
                                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                                />
                                <input
                                    required
                                    type="tel"
                                    placeholder="Phone *"
                                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                                    value={formData.phoneNumber}
                                    onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })}
                                />
                                <input
                                    required
                                    type="email"
                                    placeholder="Email Address *"
                                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                />
                                <input
                                    required
                                    placeholder="Business Name *"
                                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                                    value={formData.businessName}
                                    onChange={e => setFormData({ ...formData, businessName: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Logistics */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Logistics</h3>
                            <div className="space-y-4">
                                <input
                                    placeholder="PO Number (Optional)"
                                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                                    value={formData.poNumber}
                                    onChange={e => setFormData({ ...formData, poNumber: e.target.value })}
                                />

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Preferred Time Window</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, deliveryWindow: '07:00–11:00' })}
                                            className={`py-3 px-2 rounded-xl border text-[10px] font-bold uppercase tracking-widest transition-all ${formData.deliveryWindow === '07:00–11:00' ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-slate-50 text-slate-500 border-slate-200 hover:border-slate-300'}`}
                                        >
                                            Morning (07-11)
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, deliveryWindow: '13:00–16:00' })}
                                            className={`py-3 px-2 rounded-xl border text-[10px] font-bold uppercase tracking-widest transition-all ${formData.deliveryWindow === '13:00–16:00' ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-slate-50 text-slate-500 border-slate-200 hover:border-slate-300'}`}
                                        >
                                            Afternoon (13-16)
                                        </button>
                                    </div>
                                </div>
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
                        id="submit-po-btn"
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
