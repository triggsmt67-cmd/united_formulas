import client from "@/lib/apollo-client";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Commercial Cleaning Chemicals & Concentrates | United Formulas",
    description: "Browse our full catalog of Montana-made degreasers, floor cleaners, dish machine soaps, and vehicle washes. Available in 5-gal pails, drums, and totes.",
    alternates: {
        canonical: "https://unitedformulas.com/products",
    },
    openGraph: {
        title: "Commercial Cleaning Chemicals & Concentrates | United Formulas",
        description: "Browse our full catalog of Montana-made degreasers, floor cleaners, dish machine soaps, and vehicle washes. Available in 5-gal pails, drums, and totes.",
        url: "https://unitedformulas.com/products",
        siteName: "United Formulas",
        type: "website",
        locale: "en_US",
    },
};
import { gql } from "@apollo/client";
import ProductGrid from "@/components/ProductGrid";
import Navbar from "@/components/Navbar";
import PromotionGrid from "@/components/PromotionGrid";
import { ProductNode } from "@/types";
import Footer from "@/components/Footer";
import Link from "next/link";
import { fallbackProducts } from "@/lib/product-fallback";

const GET_PRODUCTS_DATA = gql`
  query GetProductsData {
    featuredProducts: products(first: 6, where: { featured: true }) {
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
    allProducts: products(first: 100) {
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
  }
`;

export default async function ProductsPage() {
  let products: ProductNode[] = fallbackProducts;
  let featuredProducts: ProductNode[] = fallbackProducts.slice(0, 6);
  try {
    const { data } = await client.query<{
      allProducts: { nodes: ProductNode[] },
      featuredProducts: { nodes: ProductNode[] }
    }>({
      query: GET_PRODUCTS_DATA,
    });
    products = data?.allProducts?.nodes?.length ? data.allProducts.nodes : products;
    featuredProducts = data?.featuredProducts?.nodes?.length
      ? data.featuredProducts.nodes
      : featuredProducts;
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  return (
    <div className="bg-white min-h-screen text-slate-900 font-sans antialiased selection:bg-cyan-100">
      <Navbar />

      <main className="pt-24 pb-24 max-w-7xl mx-auto px-6 lg:px-8">
        {/* High Impact Promotion Grid */}
        <PromotionGrid featuredProducts={featuredProducts} />

        {/* Main Content */}
        <div className="mb-12">
          <div className="max-w-3xl mb-12">
            <p className="text-lg text-slate-600 leading-relaxed font-medium">
              We formulate and stock industrial concentrates in <span className="text-slate-900 font-bold">Great Falls and Billings</span> for local route delivery. Start with the application filters below or use our guided finder when you know the problem but not the product name.
            </p>
            <Link href="/find-a-solution" className="mt-5 inline-flex rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-cyan-700">I know the problem, not the product →</Link>
          </div>

          <h1 className="text-3xl font-black uppercase tracking-tighter text-slate-900 mb-2">
            Full Product <span className="text-slate-400">Inventory</span>
          </h1>
          <div className="h-1 w-20 bg-[#15803D]"></div>
        </div>
        <ProductGrid initialProducts={products} />
      </main>

      {/* Footer Trust Signal */}
      <section className="py-20 border-t border-slate-100 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400 mb-12">United Formulas Quality Guarantee</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-slate-900 mb-1">LOCAL</span>
              <span className="text-xs text-slate-500 uppercase font-semibold">Montana Support</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-slate-900 mb-1">SDS</span>
              <span className="text-xs text-slate-500 uppercase font-semibold">Documentation</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-slate-900 mb-1">7 DAY</span>
              <span className="text-xs text-slate-500 uppercase font-semibold">Structured Trials</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-slate-900 mb-1">DIRECT</span>
              <span className="text-xs text-slate-500 uppercase font-semibold">Phone Support</span>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
