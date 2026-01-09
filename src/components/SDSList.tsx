'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ProductNode } from '@/types';

interface SDSListProps {
    products: ProductNode[];
}

export default function SDSList({ products }: SDSListProps) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredProducts = products.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-12">
            {/* Search Section */}
            <div className="relative max-w-2xl mx-auto">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                </div>
                <input
                    type="text"
                    placeholder="Search by product name..."
                    className="block w-full pl-11 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 shadow-sm transition-all text-slate-900 placeholder-slate-400"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Grid Section */}
            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProducts.map((product, idx) => (
                        <div
                            key={product.id}
                            className="group relative bg-white border border-slate-200 rounded-[2rem] p-6 hover:shadow-2xl hover:border-cyan-500/30 transition-all duration-500 opacity-0 animate-fade-up"
                            style={{ animationDelay: `${idx * 50}ms` }}
                        >
                            <div className="flex flex-col h-full">
                                {/* Image Container */}
                                <div className="aspect-square w-full bg-slate-50 rounded-2xl mb-6 relative overflow-hidden flex items-center justify-center p-8">
                                    {product.image?.sourceUrl ? (
                                        <Image
                                            src={product.image.sourceUrl}
                                            alt={product.image.altText || product.name}
                                            fill
                                            className="object-contain p-4 group-hover:scale-110 transition-transform duration-700"
                                        />
                                    ) : (
                                        <div className="text-slate-300 font-black text-4xl uppercase tracking-tighter opacity-20 rotate-[-15deg]">
                                            United Formulas
                                        </div>
                                    )}

                                    {/* Tech Overlay */}
                                    <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[size:20px_20px] pointer-events-none"></div>
                                </div>

                                {/* Content */}
                                <div className="flex-grow">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="px-2 py-0.5 rounded bg-emerald-50 text-[10px] font-bold text-emerald-600 uppercase tracking-wider">
                                            Current Batch
                                        </span>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                            SDS-REF: {product.slug.substring(0, 4).toUpperCase()}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-6 group-hover:text-cyan-600 transition-colors">
                                        {product.name}
                                    </h3>
                                </div>

                                {/* Download Action */}
                                {product.productData?.sdssheet ? (
                                    <a
                                        href={product.productData.sdssheet}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-3 w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-sm tracking-tight hover:bg-cyan-600 transition-all shadow-lg shadow-slate-900/10 group/btn"
                                    >
                                        <svg className="w-5 h-5 flex-shrink-0 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        DOWNLOAD PDF
                                    </a>
                                ) : (
                                    <a
                                        href="/contact"
                                        className="inline-flex items-center justify-center gap-3 w-full py-4 bg-white border-2 border-slate-100 text-slate-400 rounded-xl font-bold text-sm tracking-tight hover:border-slate-200 hover:text-slate-600 transition-all"
                                    >
                                        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        REQUEST SDS
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                searchQuery !== '' && (
                    <div className="text-center py-24 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                        <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
                            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">No sheets found</h3>
                        <p className="text-slate-500">We couldn't find any safety sheets matching your search for "{searchQuery}".</p>
                    </div>
                )
            )}
        </div>
    );
}
