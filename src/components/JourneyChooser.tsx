import Link from "next/link";

const journeys = [
  { title: "Solve a cleaning problem", detail: "Start with the surface, soil, or result that is costing you time.", href: "/find-a-solution", icon: "01" },
  { title: "Compare your real costs", detail: "Calculate dilution, product use, freight, labor, and cost per usable gallon.", href: "/cost-calculator", icon: "02" },
  { title: "Find a product or SDS", detail: "Search by product name, cleaning task, or application.", href: "/products", icon: "03" },
  { title: "Plan a facility audit", detail: "Tell our local team what is happening so the visit starts with the right questions.", href: "/contact?request=audit", icon: "04" },
];

export default function JourneyChooser() {
  return (
    <section className="border-y border-slate-200 bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-8 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-700">Start with what you need</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">What brought you here today?</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {journeys.map((journey) => (
            <Link key={journey.title} href={journey.href} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-cyan-400 hover:shadow-lg">
              <span className="text-xs font-black tracking-widest text-cyan-600">{journey.icon}</span>
              <h3 className="mt-5 text-lg font-bold text-slate-950 group-hover:text-cyan-700">{journey.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{journey.detail}</p>
              <span className="mt-5 inline-block font-bold text-slate-900">Get started →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
