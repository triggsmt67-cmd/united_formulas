import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Local Commercial Chemical Delivery | Great Falls & Billings",
  description: "See how United Formulas supports Montana businesses with local inventory, planned routes and direct service.",
  alternates: { canonical: "https://unitedformulas.com/local-delivery" },
};

// Customer-facing route descriptions written at a 9th-grade reading level.
// Internal sales cues are kept in sales-strategy.ts; this data is for public display only.
const ROUTE_CARDS = [
  {
    name: "10th Avenue South",
    area: "Great Falls, MT",
    who: "Restaurants, hotels, retail shops, and commercial kitchens",
    what:
      "This is one of our most active routes. We stop regularly at restaurants and food-service businesses along the 10th Ave corridor. If you run a kitchen or a hotel dining room, we can often fit you into an existing delivery run — which means faster restocking and less waiting.",
    cadence: "Weekly service stops",
    icon: "🍽️",
  },
  {
    name: "East Industrial & AgriTech",
    area: "Great Falls, MT",
    who: "Manufacturing plants, food processors, trucking companies, and farms",
    what:
      "Industrial and agricultural facilities have heavy cleaning demands. We bring high-concentration products built for that kind of work — degreasers, floor cleaners, and process wash chemicals. We plan visits around your operation schedule so we're not in the way.",
    cadence: "Planned industrial route days",
    icon: "🏭",
  },
  {
    name: "Airport & I-15 Logistics",
    area: "Great Falls, MT",
    who: "Fleet operators, warehouses, transport companies, and lodging near I-15",
    what:
      "Businesses along the I-15 and Airport corridor often need chemicals for wash bays, large floors, and vehicle cleaning. We group our stops in this area to keep delivery costs low and response times quick. If something isn't working right, we can get someone out fast.",
    cadence: "Clustered delivery runs",
    icon: "🚛",
  },
  {
    name: "Downtown & Healthcare",
    area: "Great Falls, MT",
    who: "Clinics, senior care facilities, offices, and hospitality businesses",
    what:
      "Healthcare and professional settings need consistent products and proper documentation. We keep records for every product we supply, offer training when you bring on new staff, and show up on a schedule you can count on. No surprises.",
    cadence: "Appointment-based route",
    icon: "🏥",
  },
  {
    name: "Golden Triangle Rural",
    area: "North-Central Montana",
    who: "Schools, county facilities, farms, and rural businesses",
    what:
      "Rural water is different from city water — often much harder — and national chemical brands are not set up for it. We test your water on-site and adjust product recommendations to match what's actually coming out of your tap. We pre-book stops so the drive is efficient for everyone.",
    cadence: "Pre-booked route with grouped follow-ups",
    icon: "🌾",
  },
];

export default function LocalDeliveryPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <main className="pb-16 pt-28">
        <section className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Hero */}
          <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.22em] text-cyan-700">
                Local inventory. Planned routes. Direct help.
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-6xl">
                A supplier close enough to show up.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">
                United Formulas serves regional businesses from Great Falls and
                Billings. Route planning lets us group delivery, service, and
                follow-up visits — so you spend less time waiting on a distant
                supplier.
              </p>
            </div>
            <div className="rounded-3xl bg-slate-950 p-7 text-white">
              <p className="text-sm font-bold text-cyan-300">CHECK YOUR LOCATION</p>
              <h2 className="mt-3 text-2xl font-semibold">
                Tell us where you operate.
              </h2>
              <p className="mt-3 text-slate-300">
                We will confirm delivery options, likely route timing, and the
                right local contact for your area.
              </p>
              <Link
                href="/contact?request=delivery"
                className="mt-6 inline-flex rounded-xl bg-cyan-500 px-5 py-3 font-bold text-slate-950 hover:bg-cyan-400 transition-colors"
              >
                Check delivery availability
              </Link>
            </div>
          </div>

          {/* Route Cards */}
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {ROUTE_CARDS.map((route) => (
              <article
                key={route.name}
                className="rounded-2xl border border-slate-200 bg-white p-6 flex flex-col gap-3 hover:border-cyan-200 hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-cyan-700">
                      {route.area}
                    </p>
                    <h2 className="mt-1.5 text-lg font-bold text-slate-900">
                      {route.name}
                    </h2>
                  </div>
                  <span className="text-2xl" aria-hidden="true">
                    {route.icon}
                  </span>
                </div>

                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                  {route.who}
                </p>

                <p className="text-sm leading-relaxed text-slate-600">
                  {route.what}
                </p>

                <p className="mt-auto border-t border-slate-100 pt-3 text-sm font-semibold text-slate-800">
                  {route.cadence}
                </p>
              </article>
            ))}
          </div>

          {/* What local service changes */}
          <div className="mt-12 rounded-3xl bg-cyan-50 p-8 md:p-10">
            <h2 className="text-3xl font-semibold">What local service changes</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {[
                [
                  "Fewer supply surprises",
                  "We plan restocking around your actual usage and route timing — so you're not scrambling when you run low.",
                ],
                [
                  "Faster equipment support",
                  "When a dispenser needs adjusting or a dilution ratio is off, you talk directly to a nearby team, not a call center.",
                ],
                [
                  "A simpler switch",
                  "We run a structured product trial before you change your whole program, so you know what works before committing.",
                ],
              ].map(([h, p]) => (
                <div key={h}>
                  <h3 className="font-bold text-slate-900">{h}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
