/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import Image from "next/image";
import { getClient } from "@/lib/apollo-client";
import { gql } from "@apollo/client";

interface RecommendedCategoriesProps {
    slugs: string[];
}

// Local metadata mapping with rich commercial copywriting tailored to Montana operations
const CATEGORY_META: Record<string, { image: string; description: string; tag?: string }> = {
    "kitchen-warewash": { 
        image: "/images/categories/kitchen-warewash-v2.jpg", 
        tag: "Hard Water Chemistry",
        description: "Formulated with active water-conditioning chelants that suspend Montana mineral scale. Keeps commercial dish machines, booster heaters, and glassware spot-free without manual hand-buffing." 
    },
    "degreaser": { 
        image: "/images/categories/degreaser-v2.jpg", 
        tag: "Carbon & Grease Solvents",
        description: "Penetrates baked-on carbon and polymerized fryer grease on contact. Liquefies heavy exhaust hood deposits into a free-rinsing emulsion so kitchen steel wipes clean without abrasive scouring." 
    },
    "floor-care": { 
        image: "/images/categories/floor-care-v2.jpg", 
        tag: "Slip-Resistant Formulas",
        description: "Deep-cleans commercial quarry tile and concrete grout lines. Emulsifies slick animal fats and tracked winter slush without leaving an oily soap film that risks slip-and-fall incidents." 
    },
    "bathroom": { 
        image: "/images/categories/bathroom-v2.jpg", 
        tag: "Restroom & Descaling",
        description: "Targeted organic acid descalers engineered to melt stubborn calcium crust, lime scale, and rust stains from commercial porcelain, flush valves, and chrome fixtures in 60 seconds." 
    },
    "restroom": { 
        image: "/images/categories/bathroom-v2.jpg", 
        tag: "Restroom & Descaling",
        description: "Targeted organic acid descalers engineered to melt stubborn calcium crust, lime scale, and rust stains from commercial porcelain, flush valves, and chrome fixtures in 60 seconds." 
    },
    "disinfectants-deodorizers": { 
        image: "/images/categories/disinfectants-deodorizers-v2.jpg", 
        tag: "EPA Pathogen & Odor Control",
        description: "EPA-registered hospital-grade disinfectants and molecular odor destroyers. Formulated to neutralize norovirus, bacteria, and kitchen odors on bar tops, prep tables, and shared contact points." 
    },
    "all-purpose": { 
        image: "/images/categories/all-purpose.jpg", 
        tag: "Multi-Surface Concentrates",
        description: "High-dilution multi-surface concentrates that lift fingerprints, oil smudges, and dirt from laminate, stainless, and vinyl surfaces at pennies per ready-to-use spray bottle." 
    },
    "all-purpose-cleaners": { 
        image: "/images/categories/all-purpose.jpg", 
        tag: "Multi-Surface Concentrates",
        description: "High-dilution multi-surface concentrates that lift fingerprints, oil smudges, and dirt from laminate, stainless, and vinyl surfaces at pennies per ready-to-use spray bottle." 
    },
    "carpet-care": { 
        image: "/images/categories/carpet-care.jpg", 
        tag: "Commercial Extraction",
        description: "Low-foaming extraction formulas and targeted spotters that dissolve tracked Montana mud, salt residue, and beverage spills from commercial carpets without leaving re-soiling residues." 
    },
    "glass-cleaner": { 
        image: "/images/categories/glass-cleaner.jpg", 
        tag: "Streak-Free Evaporation",
        description: "Ammonia-free, fast-evaporating formulas that dissolve grease film, smoke haze, and fingerprints on storefront windows, display sneeze guards, and mirrors without hazing or streaks." 
    },
    "laundry": { 
        image: "/images/categories/laundry.jpg", 
        tag: "Commercial Laundry",
        description: "Commercial detergents and builders engineered to strip food oils, wine, and coffee stains out of bar towels, aprons, and linens in Montana hard water without degrading fiber life." 
    },
    "automotive": { 
        image: "/images/categories/automotive.jpg", 
        tag: "Fleet & Wash Chemistry",
        description: "Two-step road film pre-soaks and high-lubricity detergents engineered to dissolve baked-on magnesium chloride and winter grime while protecting commercial vehicle clear coats." 
    },
    "heavy-duty-cleaner": { 
        image: "/images/categories/heavy-duty-cleaner.jpg", 
        tag: "High-Solvency Alkaline",
        description: "Fortified alkaline cleaning concentrates engineered to emulsify petroleum slicks, carbon soot, and dried workshop soils across equipment, tools, and industrial floors." 
    },
    "industrial-cleaner-degreaser": { 
        image: "/images/categories/industrial-cleaner-degreaser.jpg", 
        tag: "DEQ Separator Safe",
        description: "Quick-breaking, water-based degreasers that strip heavy motor oils, transmission fluid, and chassis grime while releasing oil at the weir to maintain Montana DEQ compliance." 
    },
};

const CATEGORIES_QUERY = gql`
    query GetCategories {
        productCategories(first: 100) {
            nodes {
                name
                slug
            }
        }
    }
`;

export default async function RecommendedCategories({ slugs }: RecommendedCategoriesProps) {
    const client = getClient();
    let allCategories: any[] = [];
    
    try {
        // Fetch categories dynamically from WPGraphQL
        const { data } = await client.query({
            query: CATEGORIES_QUERY,
        });
        allCategories = (data as any)?.productCategories?.nodes || [];
    } catch (error) {
        console.error("Failed to fetch categories from WPGraphQL:", error);
        // Fallback mapping so the page doesn't break if WP is down
        allCategories = slugs.map(slug => ({
            slug,
            name: slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
        }));
    }
    
    // Filter down to only the requested slugs and maintain order with fallback aliasing
    const displayCategories = slugs
        .map(slug => {
            const exact = allCategories.find((c: any) => c.slug === slug);
            if (exact) return exact;
            if (slug === "all-purpose-cleaners") {
                return allCategories.find((c: any) => c.slug === "all-purpose" || c.slug === "all-purpose-cleaner") || {
                    slug: "all-purpose",
                    name: "All Purpose Cleaner"
                };
            }
            if (slug === "restroom" || slug === "bathroom" || slug === "bathroom-cleaners") {
                return allCategories.find((c: any) => c.slug === "bathroom" || c.slug === "bathroom-cleaner" || c.slug === "restroom") || {
                    slug: "bathroom",
                    name: "Bathroom & Restroom Care"
                };
            }
            if (slug === "disinfectants-deodorizers" || slug === "sanitizers") {
                return allCategories.find((c: any) => c.slug === "disinfectant" || c.slug === "disinfectants-deodorizers") || {
                    slug: "disinfectant",
                    name: "Disinfectants & Sanitizers"
                };
            }
            return null;
        })
        .filter(Boolean);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayCategories.map((category: any) => {
                const meta = CATEGORY_META[category.slug] || { 
                    image: null, 
                    description: "" 
                };

                return (
                    <Link
                        key={category.slug}
                        href={`/category/${category.slug}`}
                        className="group relative flex flex-col rounded-2xl border border-slate-200/90 bg-white hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-950/5 hover:-translate-y-1.5 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 overflow-hidden"
                    >
                        {/* Top hover accent bar */}
                        <div
                            className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-teal-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none"
                            aria-hidden="true"
                        />

                        {meta.image && (
                            <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                                <Image
                                    src={meta.image}
                                    alt={category.name}
                                    fill
                                    className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent pointer-events-none" />
                                <div className="absolute top-3 left-3">
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/95 backdrop-blur-xs text-slate-800 shadow-xs border border-white/40 group-hover:bg-cyan-600 group-hover:text-white transition-colors duration-300">
                                        Commercial Grade
                                    </span>
                                </div>
                            </div>
                        )}
                        <div className="p-6 flex-1 flex flex-col justify-between">
                            <div className="flex flex-col gap-1 min-w-0">
                                <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-600 block line-clamp-1">
                                    {meta.tag || "Product Line"}
                                </span>
                                <h3 className="text-xl font-bold text-slate-900 group-hover:text-cyan-700 transition-colors line-clamp-1 leading-snug mb-1">
                                    {category.name}
                                </h3>
                                {meta.description && (
                                    <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
                                        {meta.description}
                                    </p>
                                )}
                            </div>
                            <div className="pt-4 mt-4 border-t border-slate-100 group-hover:border-cyan-100 transition-colors flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-500 group-hover:text-cyan-700 transition-colors">
                                    Explore Formulas
                                </span>
                                <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-cyan-500 group-hover:text-white group-hover:scale-110 group-hover:shadow-md group-hover:shadow-cyan-500/20 flex items-center justify-center text-slate-600 transition-all duration-300">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="group-hover:translate-x-0.5 transition-transform"
                                    >
                                        <path d="M5 12h14m-7-7l7 7l-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}
