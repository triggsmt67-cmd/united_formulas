"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ProductNode } from '@/types';

interface PromotionGridProps {
    featuredProducts: ProductNode[];
}

export default function PromotionGrid({ featuredProducts }: PromotionGridProps) {
    // We expect 3 featured products. If fewer, we'll use fallbacks
    const p1 = featuredProducts[0];
    const p2 = featuredProducts[1];
    const p3 = featuredProducts[2];

    return (
        <section className="mb-20 overflow-hidden font-geist">
            {/* Top Banner */}
            <div className="bg-[#1E3A8A] text-white py-3 text-center text-xs font-black uppercase tracking-[0.3em] border-b border-white/10">
                Free Delivery Within 100 Miles Of Great Falls
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-1 bg-slate-200 border-x border-slate-200">
                {/* Main Feature - Left */}
                <div className="md:col-span-8 relative min-h-[500px] h-full group overflow-hidden bg-white flex flex-col lg:flex-row">
                    {/* Text Area */}
                    <div className="flex-1 flex flex-col justify-center px-12 lg:px-16 py-12 bg-slate-900 relative z-10">
                        <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-slate-950/40 to-transparent pointer-events-none hidden lg:block"></div>

                        <div className="relative z-20">
                            <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tighter leading-none mb-4 uppercase">
                                {p1?.name || "Industrial Inventory"}
                            </h2>
                            <div className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                                Primary Solution Specialist
                            </div>

                            {p1?.shortDescription && (
                                <div
                                    className="text-slate-400 text-sm mb-10 line-clamp-3 leading-relaxed max-w-sm"
                                    dangerouslySetInnerHTML={{ __html: p1.shortDescription }}
                                />
                            )}

                            <Link
                                href={p1 ? `/product/${p1.slug}` : "/products"}
                                className="inline-flex items-center justify-center bg-[#15803D] hover:bg-[#166534] text-white font-black px-10 py-4 text-xs tracking-[0.2em] transition-all uppercase shadow-lg shadow-green-900/40 active:scale-95"
                            >
                                Shop This Solution
                            </Link>
                        </div>
                    </div>

                    {/* Image Area */}
                    <div className="flex-1 relative bg-slate-50 overflow-hidden min-h-[300px] lg:min-h-0">
                        {p1?.image?.sourceUrl ? (
                            <Image
                                src={p1.image.sourceUrl}
                                alt={p1.image.altText || p1.name}
                                fill
                                className="object-contain p-8 lg:p-12 group-hover:scale-110 transition-transform duration-[5s]"
                            />
                        ) : (
                            <div className="absolute inset-0 bg-slate-100"></div>
                        )}
                        {/* Technical Accent Grid for image side */}
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none"></div>
                    </div>
                </div>

                {/* Right Column (Stacked) */}
                <div className="md:col-span-4 flex flex-col gap-1">
                    {/* Top Right */}
                    <Link href={p2 ? `/product/${p2.slug}` : "#"} className="flex-1 relative min-h-[250px] group overflow-hidden bg-[#1E3A8A]">
                        {p2?.image?.sourceUrl && (
                            <div className="absolute inset-0 opacity-40 group-hover:scale-110 transition-transform duration-[3s]">
                                <Image
                                    src={p2.image.sourceUrl}
                                    alt={p2.image.altText || p2.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}
                        <div className="absolute inset-0 p-8 flex flex-col justify-between">
                            <span className="bg-white text-[#1E3A8A] self-start px-3 py-1 text-[10px] font-black uppercase tracking-widest">
                                Best Sellers
                            </span>
                            <div>
                                <h3 className="text-2xl font-black text-white uppercase tracking-tighter leading-none mb-2">
                                    {p2?.name || "Local Favorites"}
                                </h3>
                                {p2?.shortDescription && (
                                    <div
                                        className="text-blue-100/80 text-[10px] font-bold uppercase tracking-widest line-clamp-2 mb-2"
                                        dangerouslySetInnerHTML={{ __html: p2.shortDescription }}
                                    />
                                )}
                                <p className="text-[10px] text-blue-300 font-bold uppercase tracking-[0.2em]">
                                    Click to view detail
                                </p>
                            </div>
                        </div>
                    </Link>

                    {/* Bottom Right */}
                    <Link href={p3 ? `/product/${p3.slug}` : "#"} className="flex-1 relative min-h-[250px] group overflow-hidden bg-[#15803D]">
                        {p3?.image?.sourceUrl && (
                            <div className="absolute inset-0 opacity-40 group-hover:scale-110 transition-transform duration-[3s]">
                                <Image
                                    src={p3.image.sourceUrl}
                                    alt={p3.image.altText || p3.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        )}
                        <div className="absolute inset-0 p-8 flex flex-col justify-between">
                            <div className="bg-red-600 text-white self-start px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">
                                Seasonal
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-white uppercase tracking-tighter leading-none mb-2">
                                    {p3?.name || "Regional Solutions"}
                                </h3>
                                {p3?.shortDescription && (
                                    <div
                                        className="text-green-100/80 text-[10px] font-bold uppercase tracking-widest line-clamp-2 mb-2"
                                        dangerouslySetInnerHTML={{ __html: p3.shortDescription }}
                                    />
                                )}
                                <p className="text-[10px] text-green-300 font-bold uppercase tracking-[0.2em]">
                                    Order Today, Get Tomorrow
                                </p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>

            {/* Bottom Banner */}
            <div className="bg-red-600 text-white py-3 text-center text-[10px] font-black uppercase tracking-[0.4em]">
                Order By 4 PM For Same Day Route Delivery
            </div>
        </section>
    );
}
