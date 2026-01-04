import Image from "next/image";
import Link from "next/link";
import client from "@/lib/apollo-client";
import { gql } from "@apollo/client";
import ProductCard from "@/components/ProductCard";
import CategoryCard from "@/components/CategoryCard";
import { CATEGORY_METADATA, DEFAULT_CATEGORY_METADATA } from "@/config/categories";
import Navbar from "@/components/Navbar";

const GET_HOME_DATA = gql`
  query GetHomeData {
    products(first: 3, where: { featured: true }) {
      nodes {
        id
        name
        slug
        shortDescription
        image {
          sourceUrl
          altText
        }
        ... on SimpleProduct {
          price
        }
        ... on VariableProduct {
          price
        }
      }
    }
    productCategories(first: 100) {
      nodes {
        id
        name
        slug
        description
        image {
          sourceUrl
          altText
        }
      }
    }
  }
`;

import { ProductNode, ProductCategory, HomeData } from "@/types";

export default async function Home() {
  let products: ProductNode[] = [];
  let categories: ProductCategory[] = [];
  try {
    const { data } = await client.query<HomeData>({
      query: GET_HOME_DATA,
    });

    products = data?.products?.nodes || [];

    // Select 10 diverse categories, ensuring we include what the user mentioned
    const allCats = data?.productCategories?.nodes || [];
    const targetSlugs = [
      "all-purpose",
      "automotive",
      "bathroom",
      "carpet-care",
      "disinfectant",
      "degreaser",
      "floor-care",
      "glass-cleaner",
      "heavy-duty-cleaner",
      "industrial-cleaner-degreaser",
      "enzymatic-cleaners",
      "disinfectants-deodorizers"
    ];

    // Create a set of categories based on targets if they exist, otherwise fill with first available
    const selectedCats = [];
    const usedSlugs = new Set();

    // First pass: get targets in order of preference
    for (const slug of targetSlugs) {
      const cat = allCats.find((c: ProductCategory) => c.slug === slug);
      if (cat && selectedCats.length < 10) {
        selectedCats.push(cat);
        usedSlugs.add(slug);
      }
    }

    // Second pass: fill to 10 if needed from all available categories
    for (const cat of allCats) {
      if (selectedCats.length >= 10) break;
      if (!usedSlugs.has(cat.slug)) {
        // Skip variants ONLY if we already have the main version and it's a very similar name
        const isAllPurposeVariant = cat.slug.includes("all-purpose") && usedSlugs.has("all-purpose");
        const isAutomotiveVariant = cat.slug.includes("automotive") && usedSlugs.has("automotive");

        if (isAllPurposeVariant || isAutomotiveVariant) continue;

        selectedCats.push(cat);
        usedSlugs.add(cat.slug);
      }
    }

    categories = selectedCats;
  } catch (error) {
    console.error("Error fetching home data:", error);
  }

  return (
    <div className="bg-white text-slate-900 antialiased selection:bg-orange-100 selection:text-orange-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden font-geist">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-16 items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-medium mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
                Labor Cost Analysis
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl tracking-tight text-slate-900 leading-[1.1] mb-6 font-semibold">
                If you have to scrub it twice,{" "}
                <span className="text-slate-400">you paid too much.</span>
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-10 max-w-lg">
                Weak chemicals inflate your labor costs and kill your
                efficiency. We formulate industrial-strength concentrates that
                work on contact—so your team gets the job done right the first
                time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <button className="group inline-flex items-center justify-center bg-[#15803D] hover:bg-[#166534] text-white text-sm font-medium px-8 py-4 rounded-lg transition-all shadow-lg shadow-green-700/20 active:scale-95">
                  Stop Wasting Labor
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    className="iconify ml-2 group-hover:translate-x-1 transition-transform"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 12h14m-7-7l7 7l-7 7"
                    />
                  </svg>
                </button>
              </div>

              <div className="mt-12 pt-8 border-t border-slate-100 flex flex-wrap gap-8 text-xs font-medium text-slate-500 uppercase tracking-wide">
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    className="iconify text-slate-900 text-lg"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2M6.453 15h11.094M8.5 2h7"
                    />
                  </svg>
                  Proprietary Formulas
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    className="iconify text-slate-900 text-lg"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5S5 13 5 15a7 7 0 0 0 7 7"
                    />
                  </svg>
                  Ultra-Concentrated
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                    className="iconify text-slate-900 text-lg"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    >
                      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                      <path d="m9 12l2 2l4-4" />
                    </g>
                  </svg>
                  100% Guaranteed
                </div>
              </div>
            </div>

            <div className="relative h-[600px] w-full rounded-[2.5rem] shadow-2xl overflow-hidden hidden lg:block group border border-slate-200/50 bg-slate-950">
              {/* Floating Image Container with extra padding to prevent gaps during animation */}
              <div className="absolute -inset-4 animate-float">
                <Image
                  src="https://ufbackend.com/wp-content/uploads/2026/01/the-graphic-space-kLZs4yoR0uU-unsplash.jpg"
                  alt="Precision Industrial Formulation"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-[3000ms] ease-out opacity-90"
                  priority
                />
              </div>

              {/* Technical Scan Animation - Layered above image but below data cards */}
              <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:30px_30px]"></div>
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan shadow-[0_0_15px_rgba(34,211,238,0.8)]"></div>
              </div>

              {/* Sophisticated Overlays */}
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/60 via-transparent to-transparent mix-blend-multiply z-10"></div>

              {/* Data Badges - Highest Layer */}
              <div className="absolute top-8 right-8 bg-slate-900/90 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full z-20 flex items-center gap-2 shadow-2xl">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[10px] font-bold text-white uppercase tracking-widest leading-none">System Active: Formulation Verified</span>
              </div>

              <div className="absolute bottom-10 left-10 bg-white/95 backdrop-blur-md border border-slate-200 p-6 rounded-2xl shadow-2xl max-w-xs z-20 transform group-hover:-translate-y-2 transition-transform duration-500">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-cyan-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-cyan-500/30">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <div>
                    <span className="block text-[10px] font-black text-slate-400 uppercase tracking-tighter">Surface Purity Score</span>
                    <span className="text-xl font-bold text-slate-900">100.0% Grade A</span>
                  </div>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 rounded-full animate-shimmer bg-[length:200%_100%] shadow-[0_0_10px_rgba(34,211,238,0.4)]"></div>
                </div>
                <p className="mt-4 text-[11px] text-slate-500 leading-relaxed font-medium">
                  Autonomous analysis confirms zero microbial residue across all high-touch surface zones.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section id="categories" className="py-24 bg-white border-t border-slate-100 font-geist">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-20">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-6">
              <div className="opacity-0 animate-fade-up" style={{ animationDelay: '100ms' }}>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-[0.25em]">
                  <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
                  Comprehensive Inventory
                </span>
              </div>

              <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 leading-tight opacity-0 animate-fade-up" style={{ animationDelay: '200ms' }}>
                Search by <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">Application</span>
              </h2>

              <div className="h-1.5 w-32 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 rounded-full opacity-0 animate-fade-up shadow-sm" style={{ animationDelay: '300ms' }}></div>

              <p className="text-xl text-slate-600 leading-relaxed font-light opacity-0 animate-fade-up" style={{ animationDelay: '400ms' }}>
                Our proprietary formulas are engineered for specific soil loads and surfaces, ensuring maximum efficiency and cost-savings across your entire facility.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat: ProductCategory, idx: number) => {
              const meta = CATEGORY_METADATA[cat.slug] || DEFAULT_CATEGORY_METADATA;

              return (
                <div key={cat.id} className="opacity-0 animate-fade-up" style={{ animationDelay: `${500 + (idx * 100)}ms` }}>
                  <CategoryCard
                    title={cat.name}
                    slug={cat.slug}
                    image={cat.image?.sourceUrl || "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop"}
                    alt={cat.image?.altText || cat.name}
                    icon={meta.icon}
                    accentColor={meta.accentColor}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-[#1E3A8A] relative overflow-hidden font-geist">
        {/* Ambient Light Blobs */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 blur-[150px] rounded-full animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>

          {/* Tech Grid Overlays */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>

          {/* Technical Measurement Lines */}
          <div className="absolute left-[5%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-slate-800 to-transparent opacity-30"></div>
          <div className="absolute right-[5%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-slate-800 to-transparent opacity-30"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="mb-24">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-6">
              <div className="opacity-0 animate-fade-up" style={{ animationDelay: '100ms' }}>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-[0.25em]">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)] animate-pulse"></span>
                  Proprietary Formulation
                </span>
              </div>

              <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight opacity-0 animate-fade-up" style={{ animationDelay: '200ms' }}>
                Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-[length:200%_auto] animate-gradient-border">Solutions</span>
              </h2>

              <div className="h-1.5 w-32 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 rounded-full opacity-0 animate-fade-up shadow-[0_0_20px_rgba(34,211,238,0.3)]" style={{ animationDelay: '300ms' }}></div>

              <p className="text-xl text-slate-400 leading-relaxed font-light opacity-0 animate-fade-up" style={{ animationDelay: '400ms' }}>
                Industrial performance, reformulated. Our concentrates are engineered to replace multiple drums of standard solution, slashing labor costs and environmental impact.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {products.length > 0 ? (
              products.map((product: ProductNode, idx: number) => (
                <div key={product.id} className="opacity-0 animate-fade-up" style={{ animationDelay: `${500 + (idx * 150)}ms` }}>
                  <div className="relative group/wrapper h-full">
                    {/* Floating Glow Behind Card */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 blur-3xl opacity-0 group-hover/wrapper:opacity-100 transition-all duration-700 -z-10"></div>
                    <ProductCard product={product} delay={idx * 0.2} />
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-24 text-slate-500 bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-slate-800/50 border-dashed">
                <p className="text-lg">Awaiting batch shipment data...</p>
              </div>
            )}
          </div>

          <div className="mt-24 flex justify-center opacity-0 animate-fade-up" style={{ animationDelay: '1000ms' }}>
            <Link
              href="/products"
              className="inline-flex items-center gap-3 text-slate-400 hover:text-white transition-all duration-300 group/all"
            >
              <span className="text-sm font-bold uppercase tracking-[0.3em]">Examine Full Inventory</span>
              <div className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center group-hover/all:border-cyan-500/50 group-hover/all:text-cyan-400 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover/all:translate-x-1 transition-transform">
                  <path d="M5 12h14m-7-7l7 7l-7 7" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-24 bg-white text-slate-900 relative overflow-hidden font-geist">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        ></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl tracking-tight mb-6 font-semibold">
              Your janitorial closet is{" "}
              <span className="text-cyan-600">leaking money.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <ProblemCard
              title='The "Cheap" Product Trap'
              description="You saved $5 on a drum of cleaner, but it’s 90% water. Now your crew spends double the time scrubbing."
              highlight="You didn't save money. You just moved the cost to your payroll."
              icon={
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                >
                  <path d="M16 17h6v-6" />
                  <path d="m22 17l-8.5-8.5l-5 5L2 7" />
                </g>
              }
              iconColor="green"
            />
            <ProblemCard
              title='The "Eco" Compromise'
              description="You bought the green product to stay compliant, but it’s too weak to cut industrial grease."
              highlight="You use three times as much product to get the same result."
              icon={
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                >
                  <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8c0 5.5-4.78 10-10 10" />
                  <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                </g>
              }
              iconColor="cyan"
            />
          </div>
        </div>
      </section>

      {/* The Guide */}
      <section className="overflow-hidden bg-slate-50 border-y border-slate-200 pt-24 pb-24 font-geist">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl tracking-tight text-slate-900 mb-6 font-semibold">
                We don&apos;t sell water. We sell results.
              </h2>
              <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                <p>
                  At <span className="font-semibold text-slate-900">United Formulas</span>,
                  we believe that if a product says it cleans, it should clean.
                  Period.
                </p>
                <p>
                  We are a Montana-based team of chemists and problem solvers.
                  We don&apos;t focus on marketing fluff; we focus on{" "}
                  <span className="text-slate-900 font-medium border-b-2 border-cyan-200">
                    yield
                  </span>
                  .
                </p>
              </div>
              <div className="mt-10 space-y-8">
                <FeatureItem
                  title="Concentrated Power"
                  description="We pack maximum active ingredients into every gallon. One pail of our concentrate often replaces 12 drums of a competitor's pre-mix."
                  icon={
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"
                    />
                  }
                />
                <FeatureItem
                  title="Smart Safety"
                  description="We proved that you don't need harsh toxins to get heavy-duty results. Our biodegradable formulas are designed to perform better than anything on the market."
                  icon={
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1zm-8-5v4m0 4h.01"
                    />
                  }
                />
                <FeatureItem
                  title="Honest Performance"
                  description="We test everything. If it doesn't exceed expectations, it doesn't leave our dock."
                  icon={
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18h8M3 22h18m-7 0a7 7 0 1 0 0-14h-1m-4 6h2m-2-2a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Zm3-6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"
                    />
                  }
                />
              </div>
            </div>
            <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-sm">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-white relative group shadow-lg border border-slate-200">
                  <Image
                    src="https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800&q=80"
                    alt="Fast moving mountain stream"
                    fill
                    className="group-hover:grayscale-0 transition-all duration-700 ease-in-out object-cover grayscale"
                  />
                  <div className="absolute inset-0 bg-slate-900/10 mix-blend-multiply pointer-events-none"></div>
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded text-xs font-semibold text-slate-900 border border-white/20">
                    Made in Montana
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Plan */}
      <section className="py-24 bg-white font-geist">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl tracking-tight text-slate-900 font-semibold">
              Three steps to a more efficient facility
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-px bg-slate-100 z-0"></div>
            <StepItem
              number="1"
              title="Diagnose"
              description="Call 406.788.1614. Tell a live Montana expert what you’re trying to clean (and what’s failing)."
              icon={
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233a14 14 0 0 0 6.392 6.384"
                />
              }
            />
            <StepItem
              number="2"
              title="Prescribe"
              description="We recommend a specific, concentrated formula that targets that exact soil load."
              icon={
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                >
                  <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2m4 7h4m-4 5h4m-8-5h.01M8 16h.01" />
                </g>
              }
            />
            <StepItem
              number="3"
              title="Solve"
              description="You switch. Your freight bills drop. Your labor hours go down. Your facility gets cleaner."
              icon={
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                >
                  <path d="M16 7h6v6" />
                  <path d="m22 7l-8.5 8.5l-5-5L2 17" />
                </g>
              }
            />
          </div>
        </div>
      </section>

      {/* The Commitment */}
      <section className="py-24 bg-slate-50 border-t border-slate-200 font-geist">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="bg-[#1E3A8A] rounded-3xl p-10 md:p-16 text-center md:text-left flex flex-col md:flex-row gap-12 items-center shadow-2xl">
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl tracking-tight text-white mb-6 font-semibold">
                A partner, not just a vendor.
              </h2>
              <p className="text-slate-400 mb-8 leading-relaxed">
                We know that switching suppliers is a hassle. That’s why we make
                it worth your while.
              </p>
              <div className="space-y-4 text-left">
                <CommitmentItem
                  text="No robots. No scripts. Just friendly, personal service from people who know your name."
                  icon={
                    <g
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M16 3.128a4 4 0 0 1 0 7.744M22 21v-2a4 4 0 0 0-3-3.87" />
                      <circle cx="9" cy="7" r="4" />
                    </g>
                  }
                />
                <CommitmentItem
                  text="If a product doesn't meet your needs, we exchange it or refund your money. Whichever you prefer."
                  icon={
                    <g
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    >
                      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77a4 4 0 0 1 6.74 0a4 4 0 0 1 4.78 4.78a4 4 0 0 1 0 6.74a4 4 0 0 1-4.77 4.78a4 4 0 0 1-6.75 0a4 4 0 0 1-4.78-4.77a4 4 0 0 1 0-6.76" />
                      <path d="m9 12l2 2l4-4" />
                    </g>
                  }
                />
              </div>
            </div>
            <div className="flex-shrink-0 relative">
              <div className="w-48 h-48 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-700 flex items-center justify-center shadow-lg shadow-cyan-900/50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  className="iconify text-white text-6xl opacity-90"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                    <path d="m11 17l2 2a1 1 0 1 0 3-3" />
                    <path d="m14 14l2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
                    <path d="m21 3l1 11h-2M3 3L2 14l6.5 6.5a1 1 0 1 0 3-3M3 4h8" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 pt-24 pb-12 font-geist">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl tracking-tighter text-slate-900 mb-8 font-semibold">
            Clean it once. Clean it right.
          </h2>
          <div className="flex justify-center mb-16">
            <Link href="/contact" className="bg-[#15803D] hover:bg-[#166534] text-white font-medium px-8 py-4 rounded-lg transition-all shadow-lg shadow-green-700/20 active:scale-95 text-sm uppercase">
              Request a Quote
            </Link>
          </div>
          <div className="border-t border-slate-100 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2 opacity-80">
              <Image
                src="https://ufbackend.com/wp-content/uploads/2026/01/UFColorFinal-Logo-1-1.png"
                alt="United Formulas Logo"
                width={140}
                height={32}
                className="h-8 w-auto object-contain"
              />
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Exceeding Expectations in Every Way.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-slate-400 hover:text-cyan-600 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  className="iconify"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6c2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4c-.9-4.2 4-6.6 7-3.8c1.1 0 3-1.2 3-1.2"
                  />
                </svg>
              </a>
              <a href="#" className="text-slate-400 hover:text-cyan-600 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  className="iconify"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2a2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6M2 9h4v12H2z" />
                    <circle cx="4" cy="4" r="2" />
                  </g>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}



interface ProblemCardProps {
  title: string;
  description: string;
  highlight: string;
  icon: React.ReactNode;
  iconColor: string;
}

function ProblemCard({ title, description, highlight, icon, iconColor }: ProblemCardProps) {
  return (
    <div className="bg-slate-50 border border-slate-200 p-8 rounded-2xl hover:border-slate-300 transition-colors shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-medium tracking-tight text-slate-900">
          {title}
        </h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          className={`text-${iconColor}-600 text-2xl`}
        >
          {icon}
        </svg>
      </div>
      <p className="text-slate-600 mb-6 leading-relaxed">{description}</p>
      <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
        <p className="text-sm text-amber-800">{highlight}</p>
      </div>
    </div>
  );
}

interface FeatureItemProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

function FeatureItem({ title, description, icon }: FeatureItemProps) {
  return (
    <div className="flex gap-4">
      <div className="flex-none mt-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          className="text-cyan-600 text-xl"
        >
          {icon}
        </svg>
      </div>
      <div>
        <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-1">
          {title}
        </h4>
        <p className="text-sm text-slate-600">{description}</p>
      </div>
    </div>
  );
}

interface StepItemProps {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

function StepItem({ number, title, description, icon }: StepItemProps) {
  return (
    <div className="relative z-10 flex flex-col items-center text-center">
      <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm flex items-center justify-center mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          className="text-2xl text-cyan-600"
        >
          {icon}
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-slate-900 mb-3">
        {number}. {title}
      </h3>
      <p className="text-sm text-slate-600 leading-relaxed px-4">{description}</p>
    </div>
  );
}

interface CommitmentItemProps {
  text: string;
  icon: React.ReactNode;
}

function CommitmentItem({ text, icon }: CommitmentItemProps) {
  return (
    <div className="flex items-start gap-3">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        className="text-cyan-500 mt-1 flex-shrink-0"
      >
        {icon}
      </svg>
      <p className="text-sm text-slate-300">{text}</p>
    </div>
  );
}
