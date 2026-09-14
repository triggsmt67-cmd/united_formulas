import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SalesToolkit from "@/components/SalesToolkit";

export const metadata: Metadata = { title: "Field Sales Toolkit | United Formulas", description: "Plan regional routes, facility audits and structured seven-day product trials." };

export default function SalesToolkitPage() {
  return <div className="min-h-screen bg-slate-100 text-slate-900"><Navbar /><main className="pb-24 pt-32"><SalesToolkit /></main><Footer /></div>;
}
