import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SolutionFinder from "@/components/SolutionFinder";

export const metadata: Metadata = {
  title: "Find the Right Commercial Cleaning Solution | United Formulas",
  description: "Start with your cleaning problem and get a practical United Formulas product and on-site trial recommendation.",
  alternates: { canonical: "https://unitedformulas.com/find-a-solution" },
};

export default function FindASolutionPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <main className="pb-24 pt-32">
        <section className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-700">Problem-first product guidance</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-6xl">Tell us what is not working.</h1>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">You do not need to know a product name. Choose the cleaning result you need, review a practical starting point, and turn it into a structured seven-day trial with local follow-up.</p>
          </div>
          <div className="mt-12"><SolutionFinder /></div>
        </section>

        <section className="mx-auto mt-20 max-w-7xl px-6 lg:px-8">
          <div className="grid gap-6 rounded-3xl border border-slate-200 bg-slate-50 p-6 md:grid-cols-3 md:p-10">
            {[
              ["1", "Diagnose", "Document the surface, soil, process, product use and labor involved."],
              ["2", "Test", "Set one product, one location, one expected result and a seven-day window."],
              ["3", "Verify", "Review performance, usage and next cost-saving action with a local specialist."],
            ].map(([step, title, copy]) => <div key={step}><span className="text-sm font-black text-cyan-700">STEP {step}</span><h2 className="mt-3 text-xl font-bold">{title}</h2><p className="mt-2 text-sm leading-relaxed text-slate-600">{copy}</p></div>)}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
