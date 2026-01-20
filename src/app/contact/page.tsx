"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
    const [formState, setFormState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        subject: 'Product Inquiries',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const res = await fetch('/api/send-inquiry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fullName: `${formState.firstName} ${formState.lastName}`,
                    email: formState.email,
                    interest: formState.subject,
                    message: formState.message,
                    company: 'General Inquiry',
                    phone: 'N/A',
                    items: [],
                    formName: 'Contact Form'
                })
            });

            if (res.ok) {
                setIsSuccess(true);
                setFormState({ firstName: '', lastName: '', email: '', subject: 'Product Inquiries', message: '' });
            } else {
                alert('Failed to send message. Please try again or call us directly.');
            }
        } catch (error) {
            console.error('Contact error:', error);
            alert('An unexpected error occurred.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white min-h-screen text-slate-900 font-geist antialiased selection:bg-cyan-100">
            <Navbar />

            <main className="pt-32 pb-24 max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    {/* Left Column: Contact Info */}
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-700 text-xs font-semibold mb-8 uppercase tracking-wider">
                            Get in Touch
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 leading-tight mb-6">
                            How can we <br />
                            <span className="text-slate-400">help you?</span>
                        </h1>
                        <p className="text-lg text-slate-600 leading-relaxed mb-12 max-w-md">
                            Whether you need a custom formulation, a product quote, or technical advice, our Montana-based experts are ready to assist.
                        </p>

                        <div className="space-y-8">
                            <ContactMethod
                                icon={<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />}
                                title="Call Us"
                                detail="406.727.4144"
                                description="Mon-Fri, 8am-5pm MT"
                            />
                            <ContactMethod
                                icon={<><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></>}
                                title="Email Us"
                                detail="sales@unitedformulas.com"
                                description="We respond within 24 hours"
                            />
                            <ContactMethod
                                icon={<><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></>}
                                title="Visit Us"
                                detail="Great Falls, Montana"
                                description="Proudly American Formulated"
                            />
                        </div>
                    </div>

                    {/* Right Column: Contact Form */}
                    <div className="bg-slate-50 border border-slate-200 p-8 md:p-12 rounded-3xl shadow-xl">
                        {isSuccess ? (
                            <div className="text-center py-12 animate-fade-up">
                                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                                </div>
                                <h2 className="text-3xl font-bold text-slate-900 mb-4">Message Sent!</h2>
                                <p className="text-slate-500 mb-8">Our Montana team will review your inquiry and get back to you within 24 hours.</p>
                                <button
                                    onClick={() => setIsSuccess(false)}
                                    className="text-cyan-600 font-bold uppercase tracking-widest text-xs hover:text-cyan-700 transition-colors"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="first-name" className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">First Name</label>
                                        <input
                                            required
                                            type="text"
                                            id="first-name"
                                            placeholder="John"
                                            value={formState.firstName}
                                            onChange={(e) => setFormState({ ...formState, firstName: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all bg-white"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="last-name" className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Last Name</label>
                                        <input
                                            required
                                            type="text"
                                            id="last-name"
                                            placeholder="Doe"
                                            value={formState.lastName}
                                            onChange={(e) => setFormState({ ...formState, lastName: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all bg-white"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Email Address</label>
                                    <input
                                        required
                                        type="email"
                                        id="email"
                                        placeholder="john@example.com"
                                        value={formState.email}
                                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all bg-white"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="subject" className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Subject</label>
                                    <select
                                        id="subject"
                                        value={formState.subject}
                                        onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all bg-white"
                                    >
                                        <option>Product Inquiries</option>
                                        <option>Custom Formulation</option>
                                        <option>Bulk Quote Request</option>
                                        <option>Technical Support</option>
                                        <option>Other</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Message</label>
                                    <textarea
                                        required
                                        id="message"
                                        rows={4}
                                        placeholder="Tell us about your cleaning challenges..."
                                        value={formState.message}
                                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all bg-white resize-none"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-cyan-600/20 transition-all active:scale-[0.98] uppercase tracking-widest text-sm disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

interface ContactMethodProps {
    icon: React.ReactNode;
    title: string;
    detail: string;
    description: string;
}

function ContactMethod({ icon, title, detail, description }: ContactMethodProps) {
    return (
        <div className="flex gap-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-50 border border-cyan-100 flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-600">
                    {icon}
                </svg>
            </div>
            <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-1">{title}</h3>
                <p className="text-lg font-semibold text-slate-900">{detail}</p>
                <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
            </div>
        </div>
    );
}
