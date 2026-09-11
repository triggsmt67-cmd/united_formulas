import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found | United Formulas',
  description: 'The requested commercial cleaning chemical, industry solution, or page could not be located.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="bg-white min-h-screen font-sans text-slate-900 flex flex-col justify-between">
      <Navbar />

      <main className="pt-40 pb-24 max-w-4xl mx-auto px-6 text-center flex-grow flex flex-col justify-center items-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-widest mb-6 border border-slate-200">
          <span className="w-2 h-2 rounded-full bg-amber-500"></span>
          Error 404: Page Not Found
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 mb-6">
          Looking for a specific chemical formula?
        </h1>

        <p className="text-lg text-slate-600 max-w-xl mb-10 leading-relaxed">
          The page or product you requested may have moved, been discontinued, or had its URL updated. Use the links below to find our active Montana concentrates or contact our technical team.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg mb-12">
          <Link
            href="/products"
            className="flex items-center justify-center gap-2 px-6 py-4 bg-cyan-600 text-white rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-cyan-700 transition-all shadow-lg shadow-cyan-600/20"
          >
            Browse Full Catalog
          </Link>
          <Link
            href="/sds-sheets"
            className="flex items-center justify-center gap-2 px-6 py-4 bg-slate-900 text-white rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-slate-800 transition-all shadow-md"
          >
            Safety Data Sheets (SDS)
          </Link>
          <Link
            href="/#industries"
            className="flex items-center justify-center gap-2 px-6 py-4 bg-slate-100 text-slate-700 rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-slate-200 transition-all border border-slate-200"
          >
            Industry Solutions
          </Link>
          <Link
            href="/contact"
            className="flex items-center justify-center gap-2 px-6 py-4 bg-slate-100 text-slate-700 rounded-xl font-bold text-sm uppercase tracking-wider hover:bg-slate-200 transition-all border border-slate-200"
          >
            Contact Chemical Support
          </Link>
        </div>

        <p className="text-xs text-slate-400 font-medium">
          Need immediate assistance? Call our Great Falls blending facility directly at{' '}
          <a href="tel:4067274144" className="text-cyan-600 font-bold hover:underline">
            406.727.4144
          </a>
        </p>
      </main>

      <Footer />
    </div>
  );
}
