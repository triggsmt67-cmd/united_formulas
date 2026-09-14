import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SALES_ROUTES } from "@/config/sales-strategy";

export const metadata: Metadata = {
  title: "Local Commercial Chemical Delivery | Great Falls & Billings",
  description: "See how United Formulas supports Montana businesses with local inventory, planned routes and direct service.",
  alternates: { canonical: "https://unitedformulas.com/local-delivery" },
};

export default function LocalDeliveryPage() {
  return <div className="min-h-screen bg-white text-slate-900"><Navbar /><main className="pb-24 pt-32">
    <section className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
        <div><p className="text-xs font-bold uppercase tracking-[.22em] text-cyan-700">Local inventory. Planned routes. Direct help.</p><h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">A supplier close enough to show up.</h1><p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">United Formulas serves regional businesses from Great Falls and Billings. Route planning helps us group service, delivery and follow-up so customers spend less time waiting on distant suppliers.</p></div>
        <div className="rounded-3xl bg-slate-950 p-7 text-white"><p className="text-sm font-bold text-cyan-300">CHECK YOUR LOCATION</p><h2 className="mt-3 text-2xl font-semibold">Tell us where you operate.</h2><p className="mt-3 text-slate-300">We will confirm delivery options, likely route timing and the right local contact.</p><Link href="/contact?request=delivery" className="mt-6 inline-flex rounded-xl bg-cyan-500 px-5 py-3 font-bold text-slate-950">Check delivery availability</Link></div>
      </div>
      <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{SALES_ROUTES.map((route) => <article key={route.name} className="rounded-2xl border border-slate-200 p-6"><p className="text-xs font-bold uppercase tracking-widest text-cyan-700">Regional service area</p><h2 className="mt-3 text-xl font-bold">{route.name}</h2><p className="mt-3 text-sm leading-relaxed text-slate-600">{route.focus}</p><p className="mt-5 border-t border-slate-100 pt-4 text-sm font-semibold text-slate-800">{route.cadence}</p></article>)}</div>
      <div className="mt-16 rounded-3xl bg-cyan-50 p-8 md:p-12"><h2 className="text-3xl font-semibold">What local service changes</h2><div className="mt-8 grid gap-6 md:grid-cols-3">{[["Fewer supply surprises","Plan replenishment around actual usage and route timing."],["Faster equipment support","Talk directly with a nearby team when dilution or dispensing needs attention."],["A simpler switch","Use an audit and structured product trial before changing the whole program."]].map(([h,p]) => <div key={h}><h3 className="font-bold">{h}</h3><p className="mt-2 text-sm leading-relaxed text-slate-600">{p}</p></div>)}</div></div>
    </section>
  </main><Footer /></div>;
}
