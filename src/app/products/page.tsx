import client from "@/lib/apollo-client";
export const dynamic = 'force-dynamic';
import { gql } from "@apollo/client";
import ProductGrid from "@/components/ProductGrid";
import Navbar from "@/components/Navbar";
import { ProductNode } from "@/types";

const GET_ALL_PRODUCTS = gql`
  query GetAllProducts {
    products(first: 100) {
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
    try {
        const { data } = await client.query<{ products: { nodes: ProductNode[] } }>({
            query: GET_ALL_PRODUCTS,
            fetchPolicy: "no-cache"
        });
        products = data?.products?.nodes || [];
    } catch (error) {
        console.error("Error fetching products:", error);
    }

    return (
        <div className="bg-white min-h-screen text-slate-900 font-geist antialiased selection:bg-cyan-100">
            <Navbar />

            <main className="pt-32 pb-24 max-w-7xl mx-auto px-6 lg:px-8">
                {/* Hero Section */}
                <div className="mb-16 relative">
                    <div className="absolute -top-24 -left-24 w-96 h-96 bg-cyan-100/30 rounded-full blur-3xl -z-10 animate-pulse"></div>

                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-medium mb-8">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
                        Complete Solution Catalog
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-6">
                        Industrial Strength <br />
                        <span className="text-slate-400">Inventory</span>
                    </h1>

                    <p className="text-xl text-slate-600 leading-relaxed max-w-2xl">
                        Browse our professional-grade chemical concentrates. Every formula is engineered for maximum performance and cost-efficiency.
                    </p>
                </div>

                {/* Main Content */}
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
        </div>
    );
}
