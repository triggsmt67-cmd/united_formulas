import Link from "next/link";

export default function OperationalProof() {
  return <section className="bg-white py-20">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
        <div><p className="text-xs font-bold uppercase tracking-[.22em] text-cyan-700">How we earn the next conversation</p><h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-5xl">Measure the work before asking you to switch.</h2><p className="mt-5 text-lg leading-relaxed text-slate-600">A useful comparison includes product usage, dilution, labor, delivery and the cleaning result. The first step is an operational baseline, not a sales pitch.</p><Link href="/contact?request=audit" className="mt-7 inline-flex font-bold text-cyan-700 hover:text-cyan-900">See what an audit includes →</Link></div>
        <div className="grid gap-px overflow-hidden rounded-3xl border border-slate-200 bg-slate-200 sm:grid-cols-2">
          {[
            ["Audit before recommendation", "Review the task, current product, usage and result before proposing a replacement."],
            ["One defined trial", "Identify one product, one location, one problem and one measurable result."],
            ["72-hour follow-up", "Check operator experience and dosage while the trial is still active."],
            ["Seven-day decision", "Compare performance and usage, then agree on the next action together."],
          ].map(([title, copy], index) => <div key={title} className="bg-slate-50 p-6"><span className="text-xs font-black text-cyan-700">0{index + 1}</span><h3 className="mt-4 text-lg font-bold">{title}</h3><p className="mt-2 text-sm leading-relaxed text-slate-600">{copy}</p></div>)}
        </div>
      </div>
    </div>
  </section>;
}
