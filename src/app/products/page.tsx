import client from "@/lib/apollo-client";
export const dynamic = 'force-dynamic';
export const revalidate = 0;
import { gql } from "@apollo/client";
import ProductGrid from "@/components/ProductGrid";
import Navbar from "@/components/Navbar";
import PromotionGrid from "@/components/PromotionGrid";
import { ProductNode } from "@/types";
import Footer from "@/components/Footer";

const GET_PRODUCTS_DATA = gql`
  query GetProductsData {
    featuredProducts: products(first: 3, where: { featured: true }) {
      nodes {
        id
        name
        slug
        shortDescription
        image {
          sourceUrl
          altText
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
  let products: ProductNode[] = [];
  let featuredProducts: ProductNode[] = [];
  try {
    const { data } = await client.query<{
      allProducts: { nodes: ProductNode[] },
      featuredProducts: { nodes: ProductNode[] }
    }>({
      query: GET_PRODUCTS_DATA,
      fetchPolicy: "no-cache"
    });
    products = data?.allProducts?.nodes || [];
    featuredProducts = data?.featuredProducts?.nodes || [];
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  return (
    <div className="bg-white min-h-screen text-slate-900 font-geist antialiased selection:bg-cyan-100">
      <Navbar />

      <main className="pt-24 pb-24 max-w-7xl mx-auto px-6 lg:px-8">
        {/* High Impact Promotion Grid */}
        <PromotionGrid featuredProducts={featuredProducts} />

        {/* Main Content */}
        <div className="mb-12">
          <div className="max-w-3xl mb-12">
            <p className="text-lg text-slate-600 leading-relaxed font-medium">
              We formulate and stock industrial concentrates in <span className="text-slate-900 font-bold">Great Falls and Billings</span> for local route delivery. Every order includes audit-ready compliance, live local support, and an unconditional refund guarantee.
            </p>
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
              <span className="text-2xl font-bold text-slate-900 mb-1">100%</span>
              <span className="text-xs text-slate-500 uppercase font-semibold">Concentrated</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-slate-900 mb-1">0%</span>
              <span className="text-xs text-slate-500 uppercase font-semibold">Residue</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-slate-900 mb-1">USA</span>
              <span className="text-xs text-slate-500 uppercase font-semibold">Formulated</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-slate-900 mb-1">PRO</span>
              <span className="text-xs text-slate-500 uppercase font-semibold">Support</span>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
