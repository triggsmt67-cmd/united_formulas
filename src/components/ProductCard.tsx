import Image from "next/image";
import Link from "next/link";

import { ProductNode } from "@/types";

interface ProductCardProps {
    product: ProductNode;
    delay: number;
}

export default function ProductCard({ product, delay }: ProductCardProps) {
    return (
        <div className="group relative rounded-2xl p-[1px] h-full">
            <div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-border"
                style={{ animationDelay: `${-delay}s` }}
            ></div>
            <Link
                href={`/product/${product.slug}`}
                className="relative h-full bg-slate-900/50 backdrop-blur-sm bg-gradient-to-br from-slate-900 to-[#1e293b] rounded-2xl p-6 flex flex-col z-10 border border-white/5 group-hover:border-cyan-500/30 transition-all duration-500 shadow-2xl cursor-pointer"
            >
                <div className="aspect-square w-full overflow-hidden rounded-xl bg-white/[0.03] border border-white/5 mb-6 relative group/img shadow-inner">
                    {/* Scanning Overlay Effect */}
                    <div className="absolute inset-0 z-10 opacity-0 group-hover/wrapper:opacity-100 pointer-events-none transition-opacity duration-500 overflow-hidden">
                        <div className="absolute inset-x-0 h-[2px] bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)] animate-scan"></div>
                    </div>

                    {product.image?.sourceUrl && (
                        <Image
                            src={product.image.sourceUrl}
                            alt={product.image.altText || product.name}
                            fill
                            className="object-contain p-8 transition-all duration-700 group-hover/img:scale-110 group-hover/img:brightness-110"
                        />
                    )}
                </div>
                <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-bold tracking-[0.2em] text-cyan-500/80 uppercase">
                        Lab Batch ID: {product.slug?.substring(0, 6).toUpperCase()}
                    </span>
                </div>
                <h3 className="text-xl text-white font-semibold tracking-tight mb-3">
                    {product.name}
                </h3>
                <div
                    className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: product.shortDescription || "" }}
                />
                <div
                    className="w-full py-3 rounded-lg border border-slate-700/50 bg-slate-800/50 text-slate-300 group-hover:text-white group-hover:border-cyan-500/50 group-hover:bg-slate-800 transition-all text-sm font-medium text-center"
                >
                    More Info
                </div>
            </Link>
        </div>
    );
}
