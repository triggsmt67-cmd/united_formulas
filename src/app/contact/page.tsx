import Navbar from "@/components/Navbar";

export default function ContactPage() {
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
                                detail="406.788.1614"
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
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="first-name" className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">First Name</label>
                                    <input
                                        type="text"
                                        id="first-name"
                                        placeholder="John"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all bg-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="last-name" className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Last Name</label>
                                    <input
                                        type="text"
                                        id="last-name"
                                        placeholder="Doe"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all bg-white"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="john@example.com"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all bg-white"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Subject</label>
                                <select
                                    id="subject"
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
                                    id="message"
                                    rows={4}
                                    placeholder="Tell us about your cleaning challenges..."
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all bg-white resize-none"
                                ></textarea>
                            </div>

                            <button className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-cyan-600/20 transition-all active:scale-[0.98] uppercase tracking-widest text-sm">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </main>
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
