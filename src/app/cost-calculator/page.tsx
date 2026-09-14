import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TotalCostCalculator from "@/components/TotalCostCalculator";

export const metadata: Metadata = { title: "Commercial Cleaning Total Cost Calculator | United Formulas", description: "Compare cost per usable gallon, annual product usage, freight and labor assumptions." };

export default function CostCalculatorPage() { return <div className="min-h-screen bg-slate-100 text-slate-900"><Navbar /><main className="pb-24 pt-32"><div className="mx-auto max-w-7xl px-6 lg:px-8"><div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[.22em] text-cyan-700">Total cost comparison</p><h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">Compare usable chemistry, freight and labor.</h1><p className="mt-6 text-lg leading-relaxed text-slate-600">Container price tells only part of the story. Enter the assumptions you can verify, then use an on-site test to validate performance and actual usage.</p></div><div className="mt-12"><TotalCostCalculator /></div></div></main><Footer /></div>; }
