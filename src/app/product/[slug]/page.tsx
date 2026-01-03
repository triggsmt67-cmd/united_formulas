import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import client from "@/lib/apollo-client";
import { gql } from "@apollo/client";
import { notFound } from "next/navigation";
import ProductGallery from "@/components/ProductGallery";

const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(id: $id, idType: SLUG) {
      id
      name
      description
      shortDescription
      sdsSheet
      image {
        sourceUrl
        altText
      }
      galleryImages {
        nodes {
          id
          sourceUrl
          altText
        }
      }
      ... on SimpleProduct {
        price
        regularPrice
      }
      ... on VariableProduct {
        price
        regularPrice
        variations {
          nodes {
            id
            name
            price
            regularPrice
            attributes {
              nodes {
                name
                value
              }
            }
          }
        }
      }
    }
  }
`;

export default async function ProductPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    let product = null;
    try {
        const { data } = await client.query<any>({
            query: GET_PRODUCT,
            variables: { id: slug },
        });
        product = data?.product;
    } catch (error) {
        console.error("Error fetching product:", error);
    }

    if (!product) {
        notFound();
    }

    return (
        <div className="bg-white min-h-screen text-slate-900 font-geist">
            <Navbar />

            <main className="pt-32 pb-24 max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Image Column */}
                    <ProductGallery
                        mainImage={product.image}
                        galleryImages={product.galleryImages}
                        productName={product.name}
                    />

                    {/* Details Column */}
                    <div className="flex flex-col justify-center">
                        <div className="mb-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-700 text-xs font-semibold mb-4 uppercase tracking-wider">
                                Professional Formula
                            </div>
                            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-4 leading-tight">
                                {product.name}
                            </h1>
                            <p className="text-xl font-medium text-cyan-600 tracking-tight">
                                {product.price || "Contact for Pricing"}
                            </p>
                        </div>

                        {/* Variations Selection Display */}
                        {product.variations?.nodes?.length > 0 && (
                            <div className="mb-10">
                                <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-4">Available Sizes & Quantities</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {product.variations.nodes.map((variant: any) => (
                                        <div
                                            key={variant.id}
                                            className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm hover:border-cyan-500 hover:shadow-md transition-all cursor-pointer group"
                                        >
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm font-semibold text-slate-900 group-hover:text-cyan-600 transition-colors">
                                                    {variant.name.split(' - ').pop()}
                                                </span>
                                                <span className="text-sm font-bold text-cyan-600">
                                                    {variant.price}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div
                            className="text-lg text-slate-600 leading-relaxed mb-10 prose prose-slate"
                            dangerouslySetInnerHTML={{ __html: product.description || product.shortDescription || "" }}
                        />

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="flex-1 bg-slate-900 text-white font-semibold py-4 px-8 rounded-xl hover:bg-slate-800 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                                </svg>
                                Add to Cart
                            </button>

                            {product.sdsSheet && (
                                <a
                                    href={product.sdsSheet}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 bg-white border-2 border-slate-200 text-slate-900 font-semibold py-4 px-8 rounded-xl hover:border-cyan-500 hover:text-cyan-600 transition-all flex items-center justify-center gap-2 group shadow-sm"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-y-0.5 transition-transform">
                                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                                        <polyline points="14 2 14 8 20 8" />
                                    </svg>
                                    Download SDS
                                </a>
                            )}
                        </div>

                        {/* Trust Badges */}
                        <div className="mt-12 grid grid-cols-2 gap-6 p-6 rounded-2xl bg-slate-50 border border-slate-100">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white rounded-lg shadow-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="cyan" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                    </svg>
                                </div>
                                <span className="text-sm font-medium text-slate-700">EPA Registered</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white rounded-lg shadow-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="cyan" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 10c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8Z" /><path d="M12 14v.01" /><path d="M12 10v.01" />
                                    </svg>
                                </div>
                                <span className="text-sm font-medium text-slate-700">MT Chemist Formulated</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
