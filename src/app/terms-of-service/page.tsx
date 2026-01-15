import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsOfServicePage() {
    return (
        <div className="bg-white min-h-screen text-slate-900 font-geist antialiased selection:bg-cyan-100">
            <Navbar />

            <main className="pt-32 pb-24 max-w-4xl mx-auto px-6 lg:px-8">
                <div className="border-b border-slate-100 pb-12 mb-12">
                    <h1 className="text-5xl font-black tracking-tighter text-slate-900 mb-6 uppercase">
                        Terms of <span className="text-slate-400">Service</span>
                    </h1>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
                        Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                </div>

                <div className="prose prose-slate max-w-none space-y-12 text-slate-600 leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4 uppercase tracking-tight">1. Acceptance of Terms</h2>
                        <p>
                            By accesssing and using the United Formulas website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4 uppercase tracking-tight">2. Use License</h2>
                        <p>
                            Permission is granted to temporarily download one copy of the Safety Data Sheets (SDS) or Technical Data Sheets (TDS) on United Formulas&apos; website for industrial and commercial use only. This is the grant of a license, not a transfer of title.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4 uppercase tracking-tight">3. Credit & Payments</h2>
                        <p>
                            Standard accounts are subject to 30-day net terms from the date of invoice. Late payments may be subject to interest and collection costs as outlined in our
                            <a href="/credit-application" className="text-cyan-600 hover:underline mx-1">Credit Application</a>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4 uppercase tracking-tight">4. Returns & RMA</h2>
                        <p>
                            Returned items require a 20% restocking fee and customer prepaying the freight. Returned items will not be accepted without an RMA number. All claims for shortage or credit must be made within two (2) business days.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4 uppercase tracking-tight">5. Disclaimer</h2>
                        <p>
                            The materials on United Formulas&apos; website are provided on an &apos;as is&apos; basis. United Formulas makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability or fitness for a particular purpose.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4 uppercase tracking-tight">6. Governing Law</h2>
                        <p>
                            Any claim relating to United Formulas&apos; website shall be governed by the laws of the State of Montana without regard to its conflict of law provisions.
                        </p>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
