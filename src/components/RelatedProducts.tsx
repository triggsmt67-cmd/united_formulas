'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ProductNode } from '@/types';

interface RelatedProductsProps {
    products: ProductNode[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
    if (!products || products.length === 0) return null;

    return (
        <section className="mt-24 pt-16 border-t border-slate-100">
            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400 mb-12 text-center italic font-geist">
                Recommended <span className="text-cyan-600">For Your Facility</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {products.map((product) => (
                    <Link
                        key={product.id}
                        href={`/product/${product.slug}`}
                        className="group flex flex-col bg-white rounded-2xl border border-slate-100 p-4 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 hover:border-cyan-200"
                    >
                        <div className="aspect-square w-full bg-slate-50 rounded-xl overflow-hidden mb-4 relative p-8">
                            {product.image?.sourceUrl && (
                                <Image
                                    src={product.image.sourceUrl}
                                    alt={product.image.altText || product.name}
                                    fill
                                    className="object-contain transition-transform duration-500 group-hover:scale-110"
                                />
                            )}
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-cyan-600 transition-colors">
                                Industrial Batch
                            </span>
                            <h3 className="font-bold text-slate-900 group-hover:text-cyan-700 transition-colors line-clamp-1">
                                {product.name}
                            </h3>
                            <div className="flex items-center justify-between mt-2 pt-3 border-t border-slate-50">
                                <span className="text-sm font-black text-slate-900">{product.price || 'Request Price'}</span>
                                <div className="text-[10px] font-black uppercase tracking-tighter bg-slate-900 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                                    View Protocol
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
