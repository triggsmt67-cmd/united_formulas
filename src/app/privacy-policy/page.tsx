import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPolicyPage() {
    return (
        <div className="bg-white min-h-screen text-slate-900 font-geist antialiased selection:bg-cyan-100">
            <Navbar />

            <main className="pt-32 pb-24 max-w-4xl mx-auto px-6 lg:px-8">
                <div className="border-b border-slate-100 pb-12 mb-12">
                    <h1 className="text-5xl font-black tracking-tighter text-slate-900 mb-6 uppercase">
                        Privacy <span className="text-slate-400">Policy</span>
                    </h1>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
                        Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                </div>

                <div className="prose prose-slate max-w-none space-y-12 text-slate-600 leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4 uppercase tracking-tight">1. Overview</h2>
                        <p>
                            United Formulas (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website and use our services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4 uppercase tracking-tight">2. Information Collection</h2>
                        <p>
                            We collect information that you provide directly to us when you:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-4">
                            <li>Submit a Credit Application</li>
                            <li>Request a quote or technical support</li>
                            <li>Place a purchase order</li>
                            <li>Contact us via phone or email</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4 uppercase tracking-tight">3. Use of Information</h2>
                        <p>
                            We use the information we collect to:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 mt-4">
                            <li>Process and evaluate credit applications</li>
                            <li>Fulfill orders and manage logistics</li>
                            <li>Provide technical support and safety documentation (SDS)</li>
                            <li>Communicate regarding your account or inquiries</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4 uppercase tracking-tight">4. Data Security</h2>
                        <p>
                            We implement industrial-standard security measures, including 256-bit SSL encryption for data transmission, to protect your sensitive business information. Access to your personal data is restricted to employees who need it to perform their jobs.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-slate-900 mb-4 uppercase tracking-tight">5. Contact Us</h2>
                        <p>
                            If you have questions about this policy, please contact us at:
                        </p>
                        <div className="mt-4 p-6 bg-slate-50 rounded-2xl border border-slate-100 italic">
                            United Formulas<br />
                            PO BOX 2589<br />
                            Great Falls, MT 59403<br />
                            406.727.4144
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
