/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import Image from "next/image";
import { getClient } from "@/lib/apollo-client";
import { gql } from "@apollo/client";

interface RecommendedCategoriesProps {
    slugs: string[];
}

// Local metadata mapping since WPGraphQL might not have these specific custom images and descriptions
const CATEGORY_META: Record<string, { image: string; description: string }> = {
    "kitchen-warewash": { image: "/images/categories/kitchen-warewash.jpg", description: "Dish machine soaps, 3-bay sink detergents, and sanitizers built for hard water." },
    "degreaser": { image: "/images/categories/degreaser.jpg", description: "Heavy-duty degreasers that break down fryer grease, grill grime, and hood buildup." },
    "floor-care": { image: "/images/categories/floor-care.jpg", description: "No-slip cleaners that lift kitchen grease without leaving a slick film on tile." },
    "bathroom": { image: "/images/categories/bathroom.jpg", description: "Descalers and restroom cleaners that remove hard water buildup and keep restrooms spotless." },
    "restroom": { image: "/images/categories/bathroom.jpg", description: "Descalers and restroom cleaners that remove hard water buildup and keep restrooms spotless." },
    "disinfectants-deodorizers": { image: "/images/categories/disinfectants-deodorizers.jpg", description: "EPA-registered surface sanitizers for food prep tables, bar tops, and dining areas." },
    "all-purpose": { image: "/images/categories/all-purpose.jpg", description: "Everyday spray cleaners for counters, tables, and stainless steel." },
    "all-purpose-cleaners": { image: "/images/categories/all-purpose.jpg", description: "Everyday spray cleaners for counters, desks, and stainless steel." },
    "carpet-care": { image: "/images/categories/carpet-care.jpg", description: "Spot cleaners and shampoo for dining room carpets and entry rugs." },
    "glass-cleaner": { image: "/images/categories/glass-cleaner.jpg", description: "Fast-drying, streak-free cleaners for front windows, sneeze guards, and mirrors." },
    "laundry": { image: "/images/categories/laundry.jpg", description: "Commercial laundry detergents that lift food stains and grease from bar towels and aprons." },
    "automotive": { image: "/images/categories/automotive.jpg", description: "Specialized vehicle washes and fleet cleaners." },
    "heavy-duty-cleaner": { image: "/images/categories/heavy-duty-cleaner.jpg", description: "Tough cleaners for heavy grease and workshop grime." },
    "industrial-cleaner-degreaser": { image: "/images/categories/industrial-cleaner-degreaser.jpg", description: "Industrial solvents and degreasers for shop floors and equipment." },
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
                                    Product Line
                                </span>
                                <h3 className="text-xl font-bold text-slate-900 group-hover:text-cyan-700 transition-colors line-clamp-1 leading-snug mb-1">
                                    {category.name}
                                </h3>
                                {meta.description && (
                                    <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
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
