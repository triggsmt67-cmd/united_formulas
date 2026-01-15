import Link from "next/link";
import Image from "next/image";
import RequestQuoteCTA from "./RequestQuoteCTA";

export default function Footer() {
    return (
        <footer className="bg-white border-t border-slate-100 pt-24 pb-12 font-geist">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Upper Footer: CTA & Tagline */}
                <div className="text-center mb-20 animate-fade-up">
                    <h2 className="text-4xl md:text-5xl tracking-tighter text-slate-900 mb-8 font-semibold">
                        Clean it once. Clean it right.
                    </h2>
                    <RequestQuoteCTA />
                </div>

                {/* Main Footer: Links Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20 border-t border-slate-100 pt-20">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <Link href="/" className="block">
                            <Image
                                src="https://ufbackend.com/wp-content/uploads/2026/01/UFColorFinal-Logo-1-1.png"
                                alt="United Formulas Logo"
                                width={180}
                                height={40}
                                className="h-10 w-auto object-contain"
                            />
                        </Link>
                        <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                            Weak chemicals inflate your labor costs and kill your efficiency. We formulate industrial-strength concentrates that work on contact.
                        </p>
                        <div className="pt-4">
                            <span className="text-slate-900 text-xs font-bold uppercase tracking-[0.2em] relative flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                Montana Proud
                            </span>
                        </div>
                    </div>

                    {/* Navigation Column */}
                    <div>
                        <h4 className="text-slate-900 text-xs font-bold uppercase tracking-widest mb-6">Navigation</h4>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/" className="text-slate-500 hover:text-cyan-600 text-sm transition-colors">Home</Link>
                            </li>
                            <li>
                                <Link href="/products" className="text-slate-500 hover:text-cyan-600 text-sm transition-colors">All Products</Link>
                            </li>
                            <li>
                                <Link href="/#categories" className="text-slate-500 hover:text-cyan-600 text-sm transition-colors">Shop Categories</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support Column */}
                    <div>
                        <h4 className="text-slate-900 text-xs font-bold uppercase tracking-widest mb-6">Support & Compliance</h4>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/sds-sheets" className="text-slate-500 hover:text-cyan-600 text-sm transition-colors">SDS Sheets Database</Link>
                            </li>
                            <li>
                                <Link href="/credit-application" className="text-slate-500 hover:text-cyan-600 text-sm transition-colors">Credit Application</Link>
                            </li>
                            <li>
                                <a href="https://quickquote.firstwesternef.com/Credit/Apply/fwef" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-cyan-600 text-sm transition-colors">Distributor Credit App</a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h4 className="text-slate-900 text-xs font-bold uppercase tracking-widest mb-6">Connect</h4>
                        <ul className="space-y-4">
                            <li className="flex flex-col">
                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Headquarters</span>
                                <span className="text-slate-600 text-sm font-medium">PO BOX 2589, Great Falls, MT 59403</span>
                            </li>
                            <li className="flex flex-col">
                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Phone Line</span>
                                <a href="tel:4067274144" className="text-slate-600 text-sm font-medium hover:text-cyan-600 transition-colors">406.727.4144</a>
                            </li>
                            <li className="flex flex-col">
                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Social Networks</span>
                                <div className="flex gap-4 mt-2">
                                    <a href="#" className="text-slate-400 hover:text-cyan-600 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                                    </a>
                                    <a href="#" className="text-slate-400 hover:text-cyan-600 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                                    </a>
                                    <a href="#" className="text-slate-400 hover:text-cyan-600 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2a2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6M2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Lower Footer: Copyright & Legal */}
                <div className="border-t border-slate-100 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                        © {new Date().getFullYear()} United Formulas. Exceeding Expectations in Every Way.
                    </p>
                    <div className="flex gap-8">
                        <Link href="/privacy-policy" className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] hover:text-slate-600 transition-colors">Privacy Policy</Link>
                        <Link href="/terms-of-service" className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] hover:text-slate-600 transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
