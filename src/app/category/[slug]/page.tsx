import Link from "next/link";
import Navbar from "@/components/Navbar";
import client from "@/lib/apollo-client";
import { gql } from "@apollo/client";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";

const GET_CATEGORY_PRODUCTS = gql`
  query GetCategoryProducts($slug: ID!) {
    productCategory(id: $slug, idType: SLUG) {
      id
      name
      description
      products(first: 50) {
        nodes {
          id
          name
          slug
          shortDescription
          sdsSheet
          image {
            sourceUrl
            altText
          }
          ... on SimpleProduct {
            price
          }
        }
      }
    }
  }
`;

export default async function CategoryPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    let category = null;
    try {
        const { data } = await client.query<any>({
            query: GET_CATEGORY_PRODUCTS,
            variables: { slug: slug },
        });
        category = data?.productCategory;
    } catch (error) {
        console.error("Error fetching category products:", error);
    }

    if (!category) {
        notFound();
    }

    const products = category.products?.nodes || [];

    return (
        <div className="bg-white min-h-screen text-slate-900 font-geist antialiased selection:bg-cyan-100">
            <Navbar />

            <main className="pt-32 pb-24 max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header Section */}
                <div className="mb-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-medium mb-8">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
                        Chemical Solutions Array
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-6">
                        {category.name}
                    </h1>
                    {category.description && (
                        <div
                            className="text-xl text-slate-600 leading-relaxed max-w-2xl prose prose-slate"
                            dangerouslySetInnerHTML={{ __html: category.description }}
                        />
                    )}
                </div>

                {/* Product Grid */}
                <div className="relative">
                    {/* Grid Background Decoration */}
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-100/30 rounded-full blur-3xl -z-10 animate-pulse"></div>
                    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-slate-100/50 rounded-full blur-3xl -z-10"></div>

                    {products.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {products.map((product: any, idx: number) => (
                                <ProductCard key={product.id} product={product} delay={idx} />
                            ))}
                        </div>
                    ) : (
                        <div className="py-32 text-center bg-slate-50 border border-slate-200 rounded-3xl">
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mx-auto mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                                </svg>
                            </div>
                            <p className="text-slate-500 text-lg font-medium">No specialized formulas found in this category.</p>
                            <Link href="/" className="inline-flex items-center mt-6 text-cyan-600 hover:text-cyan-500 font-semibold gap-2 transition-all hover:gap-3">
                                View all categories
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7l7 7l-7 7" /></svg>
                            </Link>
                        </div>
                    )}
                </div>
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
                            <span className="text-2xl font-bold text-slate-900 mb-1">SDS</span>
                            <span className="text-xs text-slate-500 uppercase font-semibold">Included</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
