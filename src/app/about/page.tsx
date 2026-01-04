import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function AboutPage() {
    return (
        <div className="bg-white min-h-screen text-slate-900 font-geist antialiased selection:bg-cyan-100">
            <Navbar />

            <main className="pt-32 pb-24">
                {/* Hero Section */}
                <section className="bg-slate-50 border-y border-slate-200 py-24 mb-24 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-cyan-500/5 blur-3xl rounded-full translate-x-1/2"></div>
                    <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                        <div className="max-w-3xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-700 text-xs font-semibold mb-8 uppercase tracking-wider">
                                Our Montana Heritage
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-8">
                                Exceptional products, <br />
                                <span className="text-slate-400">honest Montana service.</span>
                            </h1>
                            <p className="text-xl text-slate-600 leading-relaxed max-w-2xl">
                                United Formulas is a Montana, USA based company entirely focused on formulating and developing unique cleaning products that exceed expectations in every way.
                            </p>
                        </div>
                    </div>
                </section>

                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
                        <div className="space-y-8">
                            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Formulated for Performance & Safety</h2>
                            <p className="text-lg text-slate-600 leading-relaxed">
                                Our chemists understand how critical the need is to focus on creating products safe for the environment, while at the same time perform better than anything on the market.
                            </p>
                            <div className="p-8 bg-slate-50 border border-slate-200 rounded-3xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-100 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-cyan-200 transition-colors"></div>
                                <p className="text-slate-800 font-medium relative z-10">
                                    &quot;We are customer-focused and driven to provide you with friendly, honest, personal service. In fact, when you reach out to us at United Formulas, you will be talking to a live Montana service representative.&quot;
                                </p>
                            </div>
                        </div>
                        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 shadow-2xl group">
                            {/* Image Placeholder */}
                            <Image
                                src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=2070&auto=format&fit=crop"
                                alt="Montana Laboratory"
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-slate-900/10 mix-blend-multiply"></div>
                            <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur px-4 py-2 rounded-xl border border-slate-200 shadow-lg text-xs font-bold uppercase tracking-widest text-slate-900">
                                Proudly American Formulated
                            </div>
                        </div>
                    </div>

                    <div className="mb-32">
                        <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900 mb-16">Our Core Goals</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <GoalCard
                                title="Effectiveness"
                                text="Every product does what it says it will do, and more!"
                                icon={<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />}
                                color="cyan"
                            />
                            <GoalCard
                                title="Concentrated"
                                text="Reduce waste & increase efficiency by packing more power into every gallon."
                                icon={<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />}
                                color="amber"
                            />
                            <GoalCard
                                title="Environment Friendly"
                                text="Cutting our impact through biodegradable, smart chemical engineering."
                                icon={<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8c0 5.5-4.78 10-10 10" />}
                                color="emerald"
                            />
                        </div>
                    </div>

                    {/* Guarantee Section */}
                    <section className="bg-[#1E3A8A] rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl">
                        {/* Ambient Light Blobs */}
                        <div className="absolute inset-0 z-0">
                            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 blur-[150px] rounded-full animate-pulse"></div>
                            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                        </div>

                        <div className="relative z-10 max-w-3xl mx-auto">
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-8">100% Satisfaction Guarantee</h2>
                            <p className="text-xl text-slate-300 leading-relaxed mb-12">
                                Our customer commitment is backed up by our guarantee. We will take back any product that does not meet your needs and either exchange it for an alternative product or refund your money – whichever you prefer.
                            </p>
                            <p className="text-lg text-cyan-400 font-medium italic">
                                We will work hard to earn your trust and to see that you become a regular member of our Montana family.
                            </p>
                            <div className="mt-12">
                                <Link href="/contact" className="inline-flex items-center justify-center bg-[#15803D] hover:bg-[#166534] text-white font-bold px-10 py-5 rounded-2xl transition-all shadow-xl shadow-green-900/20 active:scale-95 uppercase tracking-widest text-sm">
                                    Join the Family
                                </Link>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}

interface GoalCardProps {
    title: string;
    text: string;
    icon: React.ReactNode;
    color: "cyan" | "amber" | "emerald";
}

function GoalCard({ title, text, icon, color }: GoalCardProps) {
    const colors: Record<string, string> = {
        cyan: "bg-cyan-50 text-cyan-600 border-cyan-100",
        amber: "bg-amber-50 text-amber-600 border-amber-100",
        emerald: "bg-emerald-50 text-emerald-600 border-emerald-100"
    };

    return (
        <div className="p-10 rounded-3xl border border-slate-200 bg-white hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/5 transition-all group">
            <div className={`w-14 h-14 rounded-2xl ${colors[color]} border flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {icon}
                </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">{title}</h3>
            <p className="text-slate-600 leading-relaxed">{text}</p>
        </div>
    );
}
