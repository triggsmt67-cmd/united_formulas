import Link from "next/link";

export default function OperationalProof() {
  return <section className="bg-white py-20">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
        <div><p className="text-xs font-bold uppercase tracking-[.22em] text-cyan-700">A trial with a clear finish line</p><h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-5xl">Know what success looks like before the test begins.</h2><p className="mt-5 text-lg leading-relaxed text-slate-600">Every trial starts with one cleaning problem and a result your team can evaluate. We check in at 72 hours, then compare performance and usage at the end of seven days.</p><Link href="/contact?request=audit" className="mt-7 inline-flex font-bold text-cyan-700 hover:text-cyan-900">Plan an on-site audit →</Link></div>
        <div className="grid gap-px overflow-hidden rounded-3xl border border-slate-200 bg-slate-200 sm:grid-cols-2">
          {[
            ["Establish the baseline", "Record the task, current product, dilution, usage, labor, and cleaning result."],
            ["Define the test", "Choose one product, one location, one problem, and the result you expect."],
            ["Check in at 72 hours", "Review operator feedback and dosage while there is still time to adjust."],
            ["Compare at seven days", "Look at performance and usage, then decide whether another step makes sense."],
          ].map(([title, copy], index) => <div key={title} className="bg-slate-50 p-6"><span className="text-xs font-black text-cyan-700">0{index + 1}</span><h3 className="mt-4 text-lg font-bold">{title}</h3><p className="mt-2 text-sm leading-relaxed text-slate-600">{copy}</p></div>)}
        </div>
      </div>
    </div>
  </section>;
}
