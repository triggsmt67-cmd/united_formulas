"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function CreditApplicationPage() {
    const [directors, setDirectors] = useState([{ id: 1, name: "", title: "", address: "", ss: "" }]);
    const [references, setReferences] = useState([{ id: 1, name: "", address: "", email: "", contact: "" }]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submittedEmail, setSubmittedEmail] = useState("");

    const addDirector = () => setDirectors([...directors, { id: Date.now(), name: "", title: "", address: "", ss: "" }]);
    const addReference = () => setReferences([...references, { id: Date.now(), name: "", address: "", email: "", contact: "" }]);

    const removeDirector = (id: number) => {
        if (directors.length > 1) setDirectors(directors.filter(d => d.id !== id));
    };
    const removeReference = (id: number) => {
        if (references.length > 1) setReferences(references.filter(r => r.id !== id));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        const emailAddress = formData.get("email")?.toString() || "";
        setSubmittedEmail(emailAddress);

        // Construct the payload matching the API route
        const payload = {
            companyName: formData.get("companyName"),
            anticipatedPurchase: formData.get("anticipatedPurchase"),
            dateEstablished: formData.get("dateEstablished"),
            phoneFax: formData.get("phoneFax"),
            bizType: formData.get("bizType"),
            email: emailAddress,
            address: formData.get("address"),
            taxId: formData.get("taxId"),
            authorizedBuyers: formData.get("authorizedBuyers"),
            resalePermit: formData.get("resalePermit"),
            apContact: formData.get("apContact"),
            apPhoneEmail: formData.get("apPhoneEmail"),
            poRequired: formData.get("poRequired"),
            directors: directors.map((d, i) => ({
                name: formData.get(`directorName_${i}`),
                title: formData.get(`directorTitle_${i}`),
                address: formData.get(`directorAddress_${i}`),
                ss: formData.get(`directorSS_${i}`),
            })),
            references: references.map((r, i) => ({
                name: formData.get(`refName_${i}`),
                address: formData.get(`refLocation_${i}`),
                email: formData.get(`refEmail_${i}`),
                contact: formData.get(`refContact_${i}`),
            })),
            bankName: formData.get("bankName"),
            bankPhone: formData.get("bankPhone"),
            bankAddress: formData.get("bankAddress"),
            bankContact: formData.get("bankContact"),
            bankAccount: formData.get("bankAccount"),
            bankType: formData.get("bankType"),
            authSig: formData.get("authSig"),
            authTitle: formData.get("authTitle"),
            authPrintedName: formData.get("authPrintedName"),
            authDate: formData.get("authDate"),
            guarantorSig: formData.get("guarantorSig"),
            guarantorName: formData.get("guarantorName"),
        };

        try {
            const response = await fetch("/api/send-credit-app", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                setIsSubmitted(true);
                window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
                alert("There was an error submitting your application. Please try again or contact us.");
            }
        } catch (error) {
            console.error("Submission error:", error);
            alert("Connection error. Please check your internet and try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="bg-white min-h-screen text-slate-900 font-geist antialiased selection:bg-cyan-100">
                <Navbar />
                <main className="pt-48 pb-24 max-w-xl mx-auto px-6 text-center animate-fade-up">
                    <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                    </div>
                    <h1 className="text-4xl font-bold mb-4 tracking-tight">Inventory Protocol Initiated</h1>
                    <p className="text-slate-600 mb-12 leading-relaxed text-lg font-light">
                        A United Formulas specialist will follow up with you at <span className="font-bold text-slate-900">{submittedEmail}</span> within 24 hours to discuss your inquiry.
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-cyan-600 font-bold uppercase tracking-widest text-sm hover:gap-3 transition-all"
                    >
                        Return to Homepage
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7l7 7l-7 7" /></svg>
                    </Link>
                </main>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen text-slate-900 font-geist antialiased selection:bg-cyan-100">
            <Navbar />

            <main className="pt-32 pb-24 max-w-5xl mx-auto px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-16 animate-fade-up">
                    <div className="flex justify-center mb-6">
                        <Image
                            src="https://ufbackend.com/wp-content/uploads/2026/01/UFColorFinal-Logo-1-1.png"
                            alt="United Formulas Logo"
                            width={200}
                            height={50}
                            className="h-12 w-auto object-contain"
                            priority
                        />
                    </div>
                    <h1 className="text-5xl font-bold tracking-tighter text-slate-900 mb-4 leading-none uppercase tracking-[0.05em]">UF Credit Application</h1>
                    <div className="text-slate-400 font-medium space-y-1 tracking-wide uppercase text-[10px]">
                        <p>United Formulas</p>
                        <p>PO BOX 2589 GREAT FALLS, MT 59403</p>
                        <p>406.727.4144</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-12">
                    {/* Business Information */}
                    <section className="bg-slate-50 border border-slate-200 p-8 md:p-12 rounded-[2.5rem] shadow-sm animate-fade-up" style={{ animationDelay: "100ms" }}>
                        <div className="flex items-center gap-4 mb-10">
                            <div className="w-12 h-12 bg-white rounded-2xl border border-slate-200 flex items-center justify-center text-slate-900 shadow-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2" /><path d="M9 22v-4h6v4" /><path d="M8 6h.01" /><path d="M16 6h.01" /><path d="M12 6h.01" /><path d="M12 10h.01" /><path d="M12 14h.01" /><path d="M16 10h.01" /><path d="M16 14h.01" /><path d="M8 10h.01" /><path d="M8 14h.01" /></svg>
                            </div>
                            <h2 className="text-2xl font-bold tracking-tight text-slate-900 uppercase tracking-widest">Business Information</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            <FormField name="companyName" label="Company Name" placeholder="Full Legal Name" required />
                            <FormField name="anticipatedPurchase" label="Anticipated Monthly Purchase" placeholder="$ 0.00" required />
                            <FormField name="dateEstablished" label="Date Company Established" type="date" placeholder="mm/dd/yyyy" required />
                            <FormField name="phoneFax" label="Phone | Fax" placeholder="406.000.0000" required />

                            <div className="md:col-span-2 py-4">
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1 mb-4 block">Legal Structure</label>
                                <div className="flex flex-wrap gap-x-10 gap-y-4">
                                    <RadioButton label="Sole proprietorship" name="bizType" value="Sole Proprietor" defaultChecked />
                                    <RadioButton label="Corporation" name="bizType" value="Corporation" />
                                    <RadioButton label="Partnership" name="bizType" value="Partnership" />
                                    <RadioButton label="Other" name="bizType" value="Other" />
                                </div>
                            </div>

                            <FormField name="email" label="Email" type="email" placeholder="ap@company.com" required />
                            <FormField name="address" label="Address, City, State, ZIP" placeholder="123 Industrial Way, Great Falls, MT 59404" required />
                            <FormField name="taxId" label="Federal Tax ID Number" placeholder="XX-XXXXXXX" required />
                            <FormField name="authorizedBuyers" label="Authorized Buyers" placeholder="Names of persons allowed to purchase" required />
                            <FormField name="resalePermit" label="State Resale Permit Number" placeholder="Required for tax exemption" required />
                            <FormField name="apContact" label="AP Contact Name" placeholder="Accounts Payable Contact" required />
                            <FormField name="apPhoneEmail" label="AP Phone/E-mail" placeholder="Direct line or email" required />

                            <div className="md:col-span-2 py-4">
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1 mb-4 block">Purchase Orders Required?</label>
                                <div className="flex gap-10">
                                    <RadioButton label="Yes" name="poRequired" value="Yes" />
                                    <RadioButton label="No" name="poRequired" value="No" defaultChecked />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Company Directors, Officers & Guarantors */}
                    <section className="bg-slate-50 border border-slate-200 p-8 md:p-12 rounded-[2.5rem] shadow-sm animate-fade-up" style={{ animationDelay: "200ms" }}>
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white rounded-2xl border border-slate-200 flex items-center justify-center text-slate-900 shadow-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                                </div>
                                <h2 className="text-2xl font-bold tracking-tight text-slate-900 uppercase tracking-widest">Directors & Guarantors</h2>
                            </div>
                            <button
                                type="button"
                                onClick={addDirector}
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs font-bold uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm active:scale-[0.98]"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7v14" /></svg>
                                Add Director
                            </button>
                        </div>

                        <div className="space-y-6">
                            {directors.map((director, idx) => (
                                <div key={director.id} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-8 bg-white rounded-3xl border border-slate-100 shadow-sm relative group animate-fade-up">
                                    {directors.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeDirector(director.id)}
                                            className="absolute -top-3 -right-3 w-8 h-8 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 hover:border-red-100 transition-all shadow-md opacity-0 group-hover:opacity-100"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
                                        </button>
                                    )}
                                    <FormField name={`directorName_${idx}`} label="Full Name" placeholder="Director Name" dense required />
                                    <FormField name={`directorTitle_${idx}`} label="Title" placeholder="Position" dense required />
                                    <FormField name={`directorAddress_${idx}`} label="Address/Phone" placeholder="Home Info" dense required />
                                    <FormField name={`directorSS_${idx}`} label="SS #" placeholder="XXX-XX-XXXX" dense required />
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* 3 Trade References And Bank Reference */}
                    <section className="bg-slate-50 border border-slate-200 p-8 md:p-12 rounded-[2.5rem] shadow-sm animate-fade-up" style={{ animationDelay: "300ms" }}>
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white rounded-2xl border border-slate-200 flex items-center justify-center text-slate-900 shadow-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>
                                </div>
                                <h2 className="text-2xl font-bold tracking-tight text-slate-900 uppercase tracking-widest">Trade References</h2>
                            </div>
                            <button
                                type="button"
                                onClick={addReference}
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 text-xs font-bold uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm active:scale-[0.98]"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7v14" /></svg>
                                Add Reference
                            </button>
                        </div>

                        <div className="space-y-6 mb-16">
                            {references.map((ref, idx) => (
                                <div key={ref.id} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-8 bg-white rounded-3xl border border-slate-100 shadow-sm relative group animate-fade-up">
                                    {references.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeReference(ref.id)}
                                            className="absolute -top-3 -right-3 w-8 h-8 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 hover:border-red-100 transition-all shadow-md opacity-0 group-hover:opacity-100"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
                                        </button>
                                    )}
                                    <FormField name={`refName_${idx}`} label="Company Name" placeholder="Ref Name" dense required />
                                    <FormField name={`refLocation_${idx}`} label="City/State" placeholder="Location" dense required />
                                    <FormField name={`refEmail_${idx}`} label="Email" placeholder="ref@example.com" dense required />
                                    <FormField name={`refContact_${idx}`} label="Phone | Fax" placeholder="Contact Info" dense required />
                                </div>
                            ))}
                        </div>

                        <div className="pt-10 border-t border-slate-200/60">
                            <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-3 uppercase tracking-widest">
                                <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18" /><path d="M19 21V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v14" /><path d="M9 17h6" /><path d="M9 12h6" /><path d="M9 7h6" /></svg>
                                </div>
                                Bank Reference
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
                                <FormField name="bankName" label="Bank Name" placeholder="Operating Bank" required />
                                <FormField name="bankPhone" label="Bank Phone" placeholder="406.000.0000" required />
                                <FormField name="bankAddress" label="Bank Address" placeholder="Branch Address" required />
                                <FormField name="bankContact" label="Contact Name" placeholder="Point of Contact" required />
                                <FormField name="bankAccount" label="Account Number" placeholder="Business Account #" required />
                                <div className="space-y-3">
                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1 block">Account Type</label>
                                    <div className="flex gap-8 mt-1">
                                        <RadioButton label="Saving" name="bankType" value="Savings" />
                                        <RadioButton label="Checking" name="bankType" value="Checking" defaultChecked />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Agreement Section */}
                    <section className="bg-slate-950 text-white p-8 md:p-16 rounded-[2.5rem] shadow-2xl relative overflow-hidden animate-fade-up" style={{ animationDelay: "400ms" }}>
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full -mr-32 -mt-32"></div>
                        <h2 className="text-3xl font-bold mb-10 flex items-center gap-4 uppercase tracking-[0.2em]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>
                            Agreement
                        </h2>
                        <div className="prose prose-invert max-w-none text-slate-400 text-base leading-relaxed mb-12 bg-white/5 p-8 md:p-10 rounded-[2rem] border border-white/10 backdrop-blur-sm">
                            <p className="mb-6">
                                The undersigned agrees to pay for all goods purchased within 30 days from the date of invoice. TMS4, Inc is authorized to make inquiries into the banking and business trade references supplied above. It is understood that any information obtained will be used solely for granting credit.
                            </p>
                            <p className="mb-6">
                                Returned items require a 20% restocking fee and customer prepaying the freight. Returned items will not be accepted without an RMA number.
                            </p>
                            <p className="mb-6 leading-relaxed">
                                Should it become necessary to collect this account through an attorney, by legal proceedings, or otherwise, the undersigned, including endorsers, promise to pay all costs of collections, including reasonable attorney fees plus interest. All claims for shortage or credit must be made within two (2) business days. There will be a $25 charge on all NSF checks returned to TMS4, Inc.
                            </p>
                            <p className="font-semibold text-white italic border-l-4 border-cyan-500 pl-6 py-2 mt-8 text-lg">
                                Personal Guarantee: The undersigned, in consideration of TMS4, Inc extending credit to the above-named applicant, does unconditionally, personally, and individually guarantee payment of all amounts owed by the above-named business, including interest, costs and attorney fees.
                            </p>
                        </div>

                        <div className="flex items-center gap-4 bg-white/5 p-6 rounded-2xl border border-white/10 w-fit hover:bg-white/10 transition-all cursor-pointer group">
                            <input
                                type="checkbox"
                                id="agree"
                                name="agreement"
                                required
                                className="w-6 h-6 rounded border-white/20 bg-transparent text-cyan-500 focus:ring-cyan-500 transition-all cursor-pointer"
                            />
                            <label htmlFor="agree" className="text-sm font-bold uppercase tracking-[0.25em] cursor-pointer group-hover:text-cyan-400 transition-colors">I Agree to the Above Terms</label>
                        </div>
                    </section>

                    {/* Authorization Section */}
                    <section className="bg-slate-50 border border-slate-200 p-8 md:p-12 rounded-[2.5rem] shadow-sm animate-fade-up" style={{ animationDelay: "500ms" }}>
                        <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-10 border-b border-slate-200 pb-6 uppercase tracking-widest">Authorization</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-12">
                            <FormField name="authTitle" label="Title" placeholder="Your Official Title" required />
                            <FormField name="authPrintedName" label="Printed Name" placeholder="Your Full Name" required />
                            <FormField name="authSig" label="Authorized Signature" placeholder="Type name to sign" required />
                            <FormField name="authDate" label="Date" type="date" placeholder="mm/dd/yyyy" required />
                        </div>

                        <div className="pt-10 border-t border-slate-200">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">Guarantor Verification</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                <FormField name="guarantorSig" label="Guarantor Signature" placeholder="Signature" required />
                                <FormField name="guarantorName" label="Printed Name" placeholder="Full Legal Name" required />
                            </div>
                        </div>
                    </section>

                    <div className="flex flex-col items-center pt-12 animate-fade-up" style={{ animationDelay: "600ms" }}>
                        <button
                            type="submit"
                            id="submit-credit-app-btn"
                            disabled={isSubmitting}
                            className={`w-full md:w-80 bg-slate-900 hover:bg-slate-800 text-white font-bold py-6 rounded-2xl shadow-2xl transition-all active:scale-[0.98] uppercase tracking-[0.3em] text-sm flex items-center justify-center gap-3 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                    Processing...
                                </>
                            ) : (
                                "Submit Application"
                            )}
                        </button>
                        <p className="mt-6 text-[10px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                            Encrypted 256-Bit SSL Data Transmission
                        </p>
                    </div>
                </form>
            </main>

            <Footer />
        </div>
    );
}

// Helper Components
function FormField({ name, label, type = "text", placeholder, required = false, dense = false }: {
    name: string,
    label: string,
    type?: string,
    placeholder?: string,
    required?: boolean,
    dense?: boolean
}) {
    return (
        <div className={`space-y-2 ${dense ? 'mb-0' : 'mb-4'}`}>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">
                {label} {required && <span className="text-cyan-600">*</span>}
            </label>
            <input
                name={name}
                type={type}
                placeholder={placeholder}
                required={required}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all bg-white text-slate-900"
            />
        </div>
    );
}

function RadioButton({ label, name, value, defaultChecked = false }: { label: string, name: string, value: string, defaultChecked?: boolean }) {
    return (
        <label className="flex items-center gap-3 group cursor-pointer">
            <input
                type="radio"
                name={name}
                value={value}
                defaultChecked={defaultChecked}
                className="w-5 h-5 border-slate-200 text-cyan-600 focus:ring-cyan-500 transition-all cursor-pointer"
            />
            <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors uppercase tracking-wide">{label}</span>
        </label>
    );
}

