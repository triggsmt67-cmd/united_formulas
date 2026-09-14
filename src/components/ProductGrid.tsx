"use client";

import { useState, useMemo } from "react";
import { ProductNode } from "@/types";
import ProductCard from "./ProductCard";

const APPLICATION_FILTERS = [
    { id: "all", label: "All applications", terms: [] },
    { id: "grease", label: "Grease & heavy soil", terms: ["degreas", "grease", "stripper", "industrial"] },
    { id: "floor", label: "Floors", terms: ["floor", "carpet", "finish", "wax"] },
    { id: "warewash", label: "Kitchen & warewash", terms: ["dish", "ware", "rinse", "kitchen", "delime"] },
    { id: "laundry", label: "Laundry", terms: ["laundry", "fabric", "detergent", "softener", "bleach"] },
    { id: "restroom", label: "Restrooms & odor", terms: ["restroom", "bath", "odor", "urine", "toilet", "hand soap"] },
    { id: "vehicle", label: "Vehicle & fleet", terms: ["car wash", "vehicle", "road film", "windshield", "tire"] },
    { id: "surface", label: "Glass & surfaces", terms: ["glass", "window", "surface", "all-purpose", "all purpose"] },
];

export default function ProductGrid({ initialProducts }: { initialProducts: ProductNode[] }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("name-asc");
    const [application, setApplication] = useState("all");

    const filteredAndSortedProducts = useMemo(() => {
        let result = [...initialProducts];

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(p =>
                p.name?.toLowerCase().includes(query) ||
                p.shortDescription?.toLowerCase().includes(query)
            );
        }

        if (application !== "all") {
            const filter = APPLICATION_FILTERS.find((item) => item.id === application);
            result = result.filter((product) => {
                const searchable = `${product.name} ${product.shortDescription || ""}`.toLowerCase();
                return filter?.terms.some((term) => searchable.includes(term));
            });
        }

        // Sort
        result.sort((a, b) => {
            if (sortBy === "name-asc") return a.name.localeCompare(b.name);
            if (sortBy === "name-desc") return b.name.localeCompare(a.name);
            if (sortBy === "price-asc") {
                const priceA = parseFloat(a.price?.replace(/[^0-9.]/g, "") || "0");
                const priceB = parseFloat(b.price?.replace(/[^0-9.]/g, "") || "0");
                return priceA - priceB;
            }
            if (sortBy === "price-desc") {
                const priceA = parseFloat(a.price?.replace(/[^0-9.]/g, "") || "0");
                const priceB = parseFloat(b.price?.replace(/[^0-9.]/g, "") || "0");
                return priceB - priceA;
            }
            return 0;
        });

        return result;
    }, [initialProducts, searchQuery, sortBy, application]);

    return (
        <div className="space-y-8">
            {/* Search and Sort Controls */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm sticky top-20 z-40 backdrop-blur-md bg-white/90">
              <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="relative w-full md:w-96">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    >
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.3-4.3" />
                    </svg>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <span className="text-sm font-medium text-slate-500 whitespace-nowrap">Sort by:</span>
                    <select
                        className="w-full md:w-auto px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all bg-white"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="name-asc">Name (A-Z)</option>
                        <option value="name-desc">Name (Z-A)</option>
                        <option value="price-asc">Price (Low to High)</option>
                        <option value="price-desc">Price (High to Low)</option>
                    </select>
                </div>
              </div>
              <div className="mt-4 flex gap-2 overflow-x-auto pb-1" aria-label="Filter products by application">
                {APPLICATION_FILTERS.map((filter) => (
                    <button key={filter.id} type="button" onClick={() => setApplication(filter.id)} aria-pressed={application === filter.id} className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold transition ${application === filter.id ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                        {filter.label}
                    </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-semibold text-slate-500">Showing {filteredAndSortedProducts.length} of {initialProducts.length} products</p>
                {(searchQuery || application !== "all") && <button type="button" onClick={() => { setSearchQuery(""); setApplication("all"); }} className="text-sm font-bold text-cyan-700 hover:text-cyan-900">Clear filters</button>}
            </div>

            {/* Grid */}
            {filteredAndSortedProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredAndSortedProducts.map((product: ProductNode, idx: number) => (
                        <ProductCard key={product.id} product={product} delay={idx * 0.1} />
                    ))}
                </div>
            ) : (
                <div className="py-20 text-center bg-slate-50 border border-slate-200 border-dashed rounded-3xl">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mx-auto mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
                        </svg>
                    </div>
                    <p className="text-slate-500 text-lg font-medium">No products match your search criteria.</p>
                    <button
                        onClick={() => { setSearchQuery(""); setApplication("all"); }}
                        className="mt-4 text-cyan-600 font-semibold hover:text-cyan-500 transition-colors"
                    >
                        Clear search filters
                    </button>
                </div>
            )}
        </div>
    );
}
