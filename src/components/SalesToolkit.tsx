"use client";

import { useMemo, useState } from "react";
import { SALES_ROUTES } from "@/config/sales-strategy";

const today = () => new Date().toISOString().slice(0, 10);

export default function SalesToolkit() {
  const [route, setRoute] = useState(SALES_ROUTES[0].name);
  const [facility, setFacility] = useState("");
  const [contact, setContact] = useState("");
  const [product, setProduct] = useState("");
  const [location, setLocation] = useState("");
  const [problem, setProblem] = useState("");
  const [successMeasure, setSuccessMeasure] = useState("");
  const [startDate, setStartDate] = useState(today());
  const [accountStage, setAccountStage] = useState("Target prospect");
  const [nextAction, setNextAction] = useState("");

  const followUp = useMemo(() => {
    const date = new Date(`${startDate}T12:00:00`);
    if (Number.isNaN(date.getTime())) return "";
    date.setDate(date.getDate() + 3);
    return date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
  }, [startDate]);

  const selectedRoute = SALES_ROUTES.find((item) => item.name === route) || SALES_ROUTES[0];
  const copySummary = async () => {
    const summary = `United Formulas 7-Day Trial\nFacility: ${facility}\nContact: ${contact}\nAccount stage: ${accountStage}\nRoute: ${route}\nProduct: ${product}\nTest location: ${location}\nProblem: ${problem}\nSuccess measure: ${successMeasure}\nStart: ${startDate}\n72-hour follow-up: ${followUp}\nNext action: ${nextAction || 'Confirm performance, usage and next decision.'}`;
    await navigator.clipboard.writeText(summary);
  };

  return <div className="mx-auto max-w-7xl px-6 lg:px-8">
    <div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[.22em] text-cyan-700">United Formulas field system</p><h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">Audit first. Test one result. Follow up.</h1><p className="mt-6 text-lg leading-relaxed text-slate-600">A lightweight field worksheet for planning geographic calls and turning every sample into a defined seven-day trial.</p></div>
    <div className="mt-12 grid gap-8 lg:grid-cols-[.75fr_1.25fr]">
      <aside className="rounded-3xl bg-slate-950 p-7 text-white"><label className="text-xs font-bold uppercase tracking-widest text-cyan-300" htmlFor="sales-route">Today&apos;s route</label><select id="sales-route" value={route} onChange={(e)=>setRoute(e.target.value)} className="mt-3 w-full rounded-xl border border-white/15 bg-white/10 p-3">{SALES_ROUTES.map((item)=><option className="text-slate-900" key={item.name}>{item.name}</option>)}</select><h2 className="mt-8 text-2xl font-bold">{selectedRoute.focus}</h2><p className="mt-4 leading-relaxed text-slate-300">{selectedRoute.cue}</p><p className="mt-6 border-t border-white/10 pt-5 text-sm font-semibold text-cyan-200">{selectedRoute.cadence}</p><div className="mt-8 rounded-2xl bg-white/5 p-5"><p className="font-bold">Opening question</p><p className="mt-2 text-sm leading-relaxed text-slate-300">“Would you be open to a quick review of where cleaning product, labor or inconsistent results may be costing the operation more than expected?”</p></div></aside>
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"><div className="flex flex-col justify-between gap-4 sm:flex-row"><div><p className="text-xs font-bold uppercase tracking-widest text-cyan-700">Structured sample placement</p><h2 className="mt-2 text-2xl font-bold">Seven-day trial plan</h2></div><span className="self-start rounded-full bg-amber-50 px-4 py-2 text-xs font-bold text-amber-800">72-hour follow-up: {followUp}</span></div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2"><label className="text-sm font-bold text-slate-700">Account stage<select value={accountStage} onChange={(e)=>setAccountStage(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 p-3 font-normal outline-none focus:ring-2 focus:ring-cyan-500"><option>Target prospect</option><option>Facility visited</option><option>Sample placed</option><option>Opportunity</option><option>Current customer</option></select></label>{[
          ["Facility",facility,setFacility,"Business or facility name"],["Contact",contact,setContact,"Decision maker or operator"],["Product being tested",product,setProduct,"One product per trial"],["Where it will be used",location,setLocation,"Machine, room, surface or route"],["Problem it should solve",problem,setProblem,"Current failure, waste or cost"],["Success measure",successMeasure,setSuccessMeasure,"What must improve to continue"],
        ].map(([label,value,setter,placeholder])=><label key={label as string} className="text-sm font-bold text-slate-700">{label as string}<input value={value as string} onChange={(e)=>(setter as (value:string)=>void)(e.target.value)} placeholder={placeholder as string} className="mt-2 w-full rounded-xl border border-slate-200 p-3 font-normal outline-none focus:ring-2 focus:ring-cyan-500" /></label>)}<label className="text-sm font-bold text-slate-700">Trial start<input type="date" value={startDate} onChange={(e)=>setStartDate(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-200 p-3 font-normal outline-none focus:ring-2 focus:ring-cyan-500" /></label><label className="text-sm font-bold text-slate-700">Next action<input value={nextAction} onChange={(e)=>setNextAction(e.target.value)} placeholder="Call, revisit, quote or expand trial" className="mt-2 w-full rounded-xl border border-slate-200 p-3 font-normal outline-none focus:ring-2 focus:ring-cyan-500" /></label></div>
        <div className="mt-8 grid gap-4 rounded-2xl bg-slate-50 p-5 sm:grid-cols-3">{[["Day 0","Set dosage, train the user and record the baseline."],["72 hours","Check performance, usage and operator feedback."],["Day 7","Confirm the result and agree on the next action."]].map(([day,copy])=><div key={day}><p className="font-black text-cyan-700">{day}</p><p className="mt-1 text-sm leading-relaxed text-slate-600">{copy}</p></div>)}</div>
        <div className="mt-6 flex flex-wrap gap-3"><button onClick={copySummary} type="button" className="rounded-xl bg-cyan-600 px-5 py-3 font-bold text-white hover:bg-cyan-500">Copy trial summary</button><button onClick={()=>window.print()} type="button" className="rounded-xl border border-slate-300 px-5 py-3 font-bold hover:bg-slate-50">Print field sheet</button></div>
      </section>
    </div>
    <section className="mt-10 rounded-3xl border border-slate-200 bg-white p-7 sm:p-10"><p className="text-xs font-bold uppercase tracking-widest text-cyan-700">Facility audit checklist</p><h2 className="mt-3 text-3xl font-semibold">Earn the right to recommend.</h2><div className="mt-7 grid gap-3 md:grid-cols-2 lg:grid-cols-3">{["List the cleaning tasks that fail or require rework","Record current product, dilution and monthly usage","Note labor, handling, storage and delivery problems","Check dispensers, labels and accessible SDS documents","Choose one location and one measurable trial result","Schedule the 72-hour contact and seven-day review"].map((item)=><label key={item} className="flex gap-3 rounded-xl bg-slate-50 p-4 text-sm font-semibold text-slate-700"><input type="checkbox" className="mt-0.5 h-5 w-5 accent-cyan-600" />{item}</label>)}</div></section>
  </div>;
}
