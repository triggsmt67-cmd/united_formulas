import Link from "next/link";
import Image from "next/image";
import RequestQuoteCTA from "./RequestQuoteCTA";

export default function Footer() {
    return (
        <footer className="bg-white border-t border-slate-100 pt-24 pb-12 font-sans">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Upper Footer: CTA & Tagline */}
                <div className="text-center mb-20 animate-fade-up">
                    <h2 className="text-4xl md:text-5xl tracking-tighter text-slate-900 mb-8 font-semibold">
                        Clean it once. Clean it right.
                    </h2>
                    <RequestQuoteCTA />
                </div>

                {/* Main Footer: Links Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-8 mb-20 border-t border-slate-100 pt-20">
                    {/* Brand Column */}
                    <div className="space-y-6 sm:col-span-2 lg:col-span-1">
                        <Link href="/" className="block">
                            <Image
                                src="https://ufbackend.com/wp-content/uploads/2026/01/UFColorFinal-Logo-1-1.png"
                                alt="United Formulas Logo"
                                width={180}
                                height={40}
                                className="h-10 w-auto object-contain"
                            />
                        </Link>
                        <p className="text-slate-500 text-sm leading-relaxed">
                            Weak chemicals inflate your labor costs and kill your efficiency. We formulate industrial-strength concentrates that work on contact.
                        </p>
                        <div className="pt-2">
                            <span className="text-slate-900 text-xs font-bold uppercase tracking-[0.2em] relative flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                Montana Proud
                            </span>
                        </div>
                    </div>

                    {/* Industry Solutions Column */}
                    <div>
                        <h4 className="text-slate-900 text-xs font-bold uppercase tracking-widest mb-6">Industry Solutions</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/industries/restaurants-food-service" className="text-slate-500 hover:text-cyan-600 text-sm transition-colors block">
                                    Restaurants & Food Service
                                </Link>
                            </li>
                            <li>
                                <Link href="/industries/commercial-janitorial" className="text-slate-500 hover:text-cyan-600 text-sm transition-colors block">
                                    Commercial Janitorial
                                </Link>
                            </li>
                            <li>
                                <Link href="/industries/schools-educational-facilities" className="text-slate-500 hover:text-cyan-600 text-sm transition-colors block">
                                    Schools & Facilities
                                </Link>
                            </li>
                            <li>
                                <Link href="/industries/property-management-hospitality" className="text-slate-500 hover:text-cyan-600 text-sm transition-colors block">
                                    Property & Hospitality
                                </Link>
                            </li>
                            <li>
                                <Link href="/industries/automotive" className="text-slate-500 hover:text-cyan-600 text-sm transition-colors block">
                                    Commercial Car Wash & Fleet
                                </Link>
                            </li>
                            <li>
                                <Link href="/industries/auto-repair-service-bays" className="text-slate-500 hover:text-cyan-600 text-sm transition-colors block">
                                    Auto Repair & Service Bays
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Products Column */}
                    <div>
                        <h4 className="text-slate-900 text-xs font-bold uppercase tracking-widest mb-6">Products & Catalog</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/" className="text-slate-500 hover:text-cyan-600 text-sm transition-colors block">Home</Link>
                            </li>
                            <li>
                                <Link href="/products" className="text-slate-500 hover:text-cyan-600 text-sm transition-colors block">All Products</Link>
                            </li>
                            <li>
                                <Link href="/sds-sheets" className="text-slate-500 hover:text-cyan-600 text-sm transition-colors block">SDS Sheets Database</Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-slate-500 hover:text-cyan-600 text-sm transition-colors block">About United Formulas</Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-slate-500 hover:text-cyan-600 text-sm transition-colors block">Contact Chemical Specialists</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Commercial Services Column */}
                    <div>
                        <h4 className="text-slate-900 text-xs font-bold uppercase tracking-widest mb-6">Commercial Services</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/credit-application" className="text-slate-500 hover:text-cyan-600 text-sm transition-colors block">Commercial Credit App</Link>
                            </li>
                            <li>
                                <Link href="/contact?request=audit" className="text-slate-500 hover:text-cyan-600 text-sm transition-colors block">Free On-Site Facility Audit</Link>
                            </li>
                            <li>
                                <a href="https://quickquote.firstwesternef.com/Credit/Apply/fwef" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-cyan-600 text-sm transition-colors block">Distributor Equipment Leasing</a>
                            </li>
                            <li className="pt-2">
                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block mb-1">Route Delivery</span>
                                <span className="text-slate-600 text-xs font-medium">Great Falls & Billings Dispatch</span>
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
                                    <a href="https://www.facebook.com/profile.php?id=61585925686938" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-slate-400 hover:text-cyan-600 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Lower Footer: Copyright & Legal */}
                <div className="border-t border-slate-100 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                            © {new Date().getFullYear()} United Formulas. Exceeding Expectations in Every Way.
                        </p>
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider opacity-70">
                            Powered by <a href="https://truepath406.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 transition-colors">True Path Digital</a>
                        </p>
                    </div>
                    <div className="flex gap-8">
                        <Link href="/privacy-policy" className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] hover:text-slate-600 transition-colors">Privacy Policy</Link>
                        <Link href="/terms-of-service" className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] hover:text-slate-600 transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
