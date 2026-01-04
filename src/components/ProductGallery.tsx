"use client";

import { useState } from "react";
import Image from "next/image";

import { ProductImage } from "@/types";

interface ProductGalleryProps {
    mainImage?: ProductImage;
    galleryImages?: {
        nodes: ProductImage[];
    };
    productName: string;
}

export default function ProductGallery({ mainImage, galleryImages, productName }: ProductGalleryProps) {
    const allImages = [
        ...(mainImage ? [mainImage] : []),
        ...(galleryImages?.nodes || [])
    ];

    const [activeImage, setActiveImage] = useState(allImages[0]);

    if (allImages.length === 0) {
        return (
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-slate-50 border border-slate-200 shadow-xl flex items-center justify-center p-8 md:p-12">
                <div className="w-full h-full flex items-center justify-center text-slate-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                    </svg>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Main Display */}
            <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-slate-50 border border-slate-200 shadow-2xl flex items-center justify-center p-8 md:p-12 transition-all duration-500">
                <Image
                    src={activeImage.sourceUrl}
                    alt={activeImage.altText || productName}
                    fill
                    priority
                    className="object-contain transition-all duration-500 transform hover:scale-105"
                />
            </div>

            {/* Thumbnails */}
            {allImages.length > 1 && (
                <div className="grid grid-cols-4 md:grid-cols-5 gap-4">
                    {allImages.map((img: ProductImage, idx: number) => (
                        <button
                            key={img.id || idx}
                            onClick={() => setActiveImage(img)}
                            className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-300 ${activeImage.sourceUrl === img.sourceUrl
                                ? 'border-cyan-500 shadow-lg shadow-cyan-500/10 scale-95'
                                : 'border-slate-100 hover:border-slate-300 opacity-70 hover:opacity-100'
                                }`}
                        >
                            <Image
                                src={img.sourceUrl}
                                alt={img.altText || `${productName} Gallery ${idx + 1}`}
                                fill
                                className="object-contain p-2"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
