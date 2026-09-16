'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function ProductBreadcrumb() {
    const searchParams = useSearchParams();
    const from = searchParams.get('from');
    const cat = searchParams.get('cat');

    if (from === 'category' && cat) {
        // Format the category slug into a readable name, e.g. "floor-care" → "Floor Care"
        const categoryName = cat
            .split('-')
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(' ');

        return (
            <div className="mb-6 flex items-center gap-2 text-sm text-slate-500">
                <Link href="/products" className="hover:text-cyan-600 transition-colors font-semibold">
                    Products
                </Link>
                <span className="text-slate-300">/</span>
                <Link
                    href={`/category/${cat}`}
                    className="hover:text-cyan-600 transition-colors font-semibold"
                >
                    {categoryName}
                </Link>
            </div>
        );
    }

    return (
        <div className="mb-6">
            <Link
                href="/products"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-cyan-600 transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5M12 5l-7 7 7 7" />
                </svg>
                Back to Products
            </Link>
        </div>
    );
}
