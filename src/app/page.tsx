import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Industrial Cleaning Chemicals & Wholesale Supplies | Montana",
  description: "Commercial cleaning concentrates, degreasers, and dish soaps made in Montana. Bulk drum delivery and route service from Great Falls and Billings warehouses.",
  alternates: {
    canonical: "https://unitedformulas.com",
  },
  openGraph: {
    title: "Industrial Cleaning Chemicals & Wholesale Supplies | Montana",
    description: "Commercial cleaning concentrates, degreasers, and dish soaps made in Montana. Bulk drum delivery and route service from Great Falls and Billings warehouses.",
    url: "https://unitedformulas.com",
    siteName: "United Formulas",
    type: "website",
    locale: "en_US",
  },
};
import client from "@/lib/apollo-client";
import { gql } from "@apollo/client";
import ProductCard from "@/components/ProductCard";
import CategoryCard from "@/components/CategoryCard";
import Navbar from "@/components/Navbar";
import HomeHero from "@/components/HomeHero";
import Footer from "@/components/Footer";
import JourneyChooser from "@/components/JourneyChooser";
import OperationalProof from "@/components/OperationalProof";
import { fallbackProducts } from "@/lib/product-fallback";

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

import { ProductNode, HomeData } from "@/types";

const HOMEPAGE_INDUSTRIES = [
  {
    title: "Restaurants & Food Service",
    description:
      "Products for kitchens, floors, restrooms, warewashing, and everyday restaurant cleaning.",
    href: "/industries/restaurants-food-service",
    image:
      "https://ufbackend.com/wp-content/uploads/2026/09/Restaurant-and-food-supplies-.jpg",
    alt: "Commercial kitchen and food service sanitation supplies",
  },
  {
    title: "Janitorial & Commercial Cleaning Companies",
    description:
      "Concentrated products for professional cleaning crews working across multiple facilities and surface types.",
    href: "/industries/commercial-janitorial",
    image:
      "https://ufbackend.com/wp-content/uploads/2026/09/Industrial-and-commercial-cleaning-.jpg",
    alt: "Professional janitorial and commercial cleaning supplies",
  },
  {
    title: "Schools & Educational Facilities",
    description:
      "Cleaning products for classrooms, cafeterias, restrooms, carpets, hard floors, and shared spaces.",
    href: "/industries/schools-educational-facilities",
    image:
      "https://ufbackend.com/wp-content/uploads/2026/09/School-and-educational-facilities-.jpg",
    alt: "Educational facility floor and classroom cleaning products",
  },
  {
    title: "Property Management & Hospitality",
    description:
      "Products for turnovers, guest areas, common spaces, restrooms, laundry, carpets, and floor care.",
    href: "/industries/property-management-hospitality",
    image:
      "https://ufbackend.com/wp-content/uploads/2026/09/MONTANA-LODGING-PROPERTY-MANAGEMENT.jpg",
    alt: "Hospitality and property turnover cleaning chemicals",
  },
  {
    title: "Commercial Car Wash & Fleet Operations",
    description:
      "Two-step road film pre-soaks, automatic wash tunnel concentrates, and fast-sheeting drying agents engineered for Montana grime.",
    href: "/industries/automotive",
    image: "https://ufbackend.com/wp-content/uploads/2026/01/automotive-1.jpeg",
    alt: "Commercial car wash and fleet cleaning chemicals",
  },
  {
    title: "Auto Repair & Service Bays",
    description:
      "Quick-break concrete floor degreasers, aqueous parts washer concentrates, and Montana DEQ separator-safe chemistry.",
    href: "/industries/auto-repair-service-bays",
    image:
      "https://ufbackend.com/wp-content/uploads/2026/09/Automotive-shops-in-industrial-clean-.jpg",
    alt: "Auto repair shop floor degreasers and service bay cleaning supplies",
  },
];

export default async function Home() {
  let products: ProductNode[] = fallbackProducts.slice(0, 3);
  try {
    const { data } = await client.query<HomeData>({
      query: GET_HOME_DATA,
    });

    products = data?.products?.nodes?.length ? data.products.nodes : products;
  } catch (error) {
    console.error("Error fetching home data:", error);
  }

  return (
    <div className="bg-white text-slate-900 antialiased selection:bg-orange-100 selection:text-orange-900">
      <Navbar />

      <HomeHero />

      <JourneyChooser />
      <OperationalProof />

      {/* Who We Serve - Industry Solutions */}
      <section id="industries" className="py-20 lg:py-24 bg-[#1E3A8A] relative overflow-hidden font-sans">
        {/* Solid grounded background */}

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="mb-16 sm:mb-20">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-6">
              <div className="opacity-0 animate-fade-up" style={{ animationDelay: '100ms' }}>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-[0.25em]">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)] animate-pulse" aria-hidden="true"></span>
                  WHO WE SERVE
                </span>
              </div>

              <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight opacity-0 animate-fade-up" style={{ animationDelay: '200ms' }}>
                Cleaning systems for the work you actually do
              </h2>

              <div className="h-1.5 w-32 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 rounded-full opacity-0 animate-fade-up shadow-[0_0_20px_rgba(34,211,238,0.3)]" aria-hidden="true" style={{ animationDelay: '300ms' }}></div>

              <p className="text-xl text-blue-100 leading-relaxed font-light opacity-0 animate-fade-up" style={{ animationDelay: '400ms' }}>
                Start with your industry to find products for the surfaces, soil, equipment, and daily demands your team handles.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {HOMEPAGE_INDUSTRIES.map((item, idx: number) => (
              <div key={item.href} className="opacity-0 animate-fade-up" style={{ animationDelay: `${500 + (idx * 100)}ms` }}>
                <CategoryCard
                  title={item.title}
                  description={item.description}
                  href={item.href}
                  image={item.image}
                  alt={item.alt}
                />
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Healthcare & Senior Care", "/industries/healthcare-senior-care"],
              ["Industrial & Manufacturing", "/industries/industrial-manufacturing"],
              ["Agribusiness & Food Processing", "/industries/agribusiness-food-processing"],
              ["Government & Public Facilities", "/industries/government-public-facilities"],
            ].map(([title, href]) => <Link key={href} href={href} className="rounded-xl border border-white/15 bg-white/10 px-4 py-4 text-center text-sm font-bold text-white transition hover:border-cyan-300 hover:bg-white/15">{title} →</Link>)}
          </div>

          {/* Product-browsing link */}
          <div className="mt-16 text-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm sm:text-base font-semibold text-cyan-300 hover:text-white transition-colors group/link py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg"
            >
              <span>Know what you need? Browse the complete product catalog</span>
              <span className="group-hover/link:translate-x-1 transition-transform" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 lg:py-24 bg-white border-t border-slate-100 relative overflow-hidden font-sans">
        {/* Grounded background */}

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="mb-16">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-6">
              <div className="opacity-0 animate-fade-up" style={{ animationDelay: '100ms' }}>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-[0.25em]">
                  <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" aria-hidden="true"></span>
                  Commercial Concentrates
                </span>
              </div>

              <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 leading-tight opacity-0 animate-fade-up" style={{ animationDelay: '200ms' }}>
                A practical place to start
              </h2>

              <div className="h-1.5 w-32 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 rounded-full opacity-0 animate-fade-up shadow-sm" aria-hidden="true" style={{ animationDelay: '300ms' }}></div>

              <p className="text-xl text-slate-600 leading-relaxed font-light opacity-0 animate-fade-up" style={{ animationDelay: '400ms' }}>
                Explore concentrated formulas for common commercial cleaning problems, then ask us about the right dilution and test for your facility.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.length > 0 ? (
              products.map((product: ProductNode, idx: number) => (
                <div key={product.id} className="opacity-0 animate-fade-up h-full" style={{ animationDelay: `${500 + (idx * 150)}ms` }}>
                  <div className="relative group/wrapper h-full flex flex-col">
                    <ProductCard product={product} delay={idx * 0.2} />
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-24 text-slate-500 bg-slate-50 rounded-2xl border border-slate-200 border-dashed">
                <p className="text-lg">Awaiting batch shipment data...</p>
              </div>
            )}
          </div>

          <div className="mt-16 flex justify-center opacity-0 animate-fade-up" style={{ animationDelay: '1000ms' }}>
            <Link
              href="/products"
              className="inline-flex items-center gap-3 text-slate-700 hover:text-cyan-600 transition-all duration-300 group/all font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-lg py-1 px-3"
            >
              <span className="text-sm font-bold uppercase tracking-[0.3em]">Browse Full Catalog</span>
              <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center group-hover/all:border-cyan-500/50 group-hover/all:bg-cyan-50 group-hover/all:text-cyan-600 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover/all:translate-x-1 transition-transform">
                  <path d="M5 12h14m-7-7l7 7l-7 7" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-24 bg-white text-slate-900 relative overflow-hidden font-sans">
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
              The container price is only{" "}
              <span className="text-cyan-600">part of the cost.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <ProblemCard
              title="Cost per usable gallon"
              description="A lower container price can still cost more when the dilution, freight, storage, and amount used are included."
              highlight="Compare the cost of the working solution—not just the price on the container."
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
              title="Labor and repeat cleaning"
              description="If a product needs extra passes, more scrubbing, or frequent rework, the added labor can outweigh a small chemical savings."
              highlight="Measure the time and result along with the amount of product used."
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
      <section className="overflow-hidden bg-slate-50 border-y border-slate-200 pt-24 pb-24 font-sans">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl tracking-tight text-slate-900 mb-6 font-semibold">
                Concentration matters when the result holds up.
              </h2>
              <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                <p>
                  At <span className="font-semibold text-slate-900">United Formulas</span>, we match the formula and dilution to the job your team needs to complete.
                </p>
                <p>
                  Our goal is a working solution that performs consistently without using more product or labor than the job requires. That is why we focus on{" "}
                  <span className="text-slate-900 font-medium border-b-2 border-cyan-200">
                    yield
                  </span>
                  .
                </p>
              </div>
              <div className="mt-10 space-y-8">
                <FeatureItem
                  title="Dilution That Fits the Job"
                  description="Concentrates let you prepare the working strength the task requires instead of shipping and storing ready-to-use water."
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
                  title="Clear Product Guidance"
                  description="We help your team choose the product, dilution, and process for the surface and soil involved."
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
                  title="Results You Can Compare"
                  description="A defined trial gives your operators time to evaluate cleaning performance, usage, and the day-to-day experience."
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
                    // Free Pexels photo by Mohan Nannapaneni: pexels.com/photo/farm-in-summer-12356263
                    src="/images/montana-working-landscape.jpg"
                    alt="Montana farmland and agricultural buildings beneath a wide blue sky"
                    fill
                    sizes="(min-width: 1024px) 384px, 100vw"
                    className="group-hover:scale-[1.03] transition-transform duration-700 ease-out object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none"></div>
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded text-xs font-semibold text-slate-900 border border-white/20">
                    Built for Montana work
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Plan */}
      <section className="py-24 bg-white font-sans">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl tracking-tight text-slate-900 font-semibold">
              A practical way to test before you switch
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-8 left-[16%] right-[16%] h-px bg-slate-100 z-0"></div>
            <StepItem
              number="1"
              title="Assess"
              description="Show us the surface, soil, current process, and result your team is getting."
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
              title="Test"
              description="Try one recommended product in one defined area with the right dilution and a clear goal."
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
              title="Compare"
              description="Review performance, usage, and operator feedback before deciding on the next step."
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
      <section className="py-24 bg-slate-50 border-t border-slate-200 font-sans">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="bg-[#1E3A8A] rounded-3xl p-10 md:p-16 text-center md:text-left flex flex-col md:flex-row gap-12 items-center shadow-2xl">
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl tracking-tight text-white mb-6 font-semibold">
                Local support after the delivery.
              </h2>
              <p className="text-slate-400 mb-8 leading-relaxed">
                Product performance depends on what happens in the facility. Our local team stays involved when you need help with dilution, application, or equipment.
              </p>
              <div className="space-y-4 text-left">
                <CommitmentItem
                  text="Call and speak with a local team that knows the products and the region."
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
                  text="If a product does not meet your needs, we will exchange it or refund your money."
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

      <Footer />
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
