import { gql } from '@apollo/client';
import { getClient } from '@/lib/apollo-client';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import ProductGallery from '@/components/ProductGallery';
import { ProductNode, ProductImage } from '@/types';

type DetailedProduct = ProductNode & {
    galleryImages?: {
        nodes: ProductImage[];
    };
    description?: string;
};

const GET_PRODUCT = gql`
  query GetProduct($slug: ID!) {
    product(id: $slug, idType: SLUG) {
      name
      description
      shortDescription
      slug
      image {
        sourceUrl
        altText
      }
      ... on SimpleProduct {
        price
      }
      ... on VariableProduct {
        price
        variations {
          nodes {
            id
            price
            name
            attributes {
              nodes {
                name
                value
              }
            }
          }
        }
      }
      galleryImages {
        nodes {
          id
          sourceUrl
          altText
        }
      }
    }
  }
`;

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const { data } = await getClient().query<{ product: DetailedProduct }>({
        query: GET_PRODUCT,
        variables: { slug: slug },
        context: {
            fetchOptions: {
                next: { revalidate: 0 },
            },
        },
    });

    const product = data?.product;

    if (!product) {
        return (
            <div className="min-h-screen bg-white font-geist">
                <Navbar />
                <div className="pt-40 text-center text-slate-800">
                    <h1 className="text-2xl font-bold">Product Not Found</h1>
                    <Link href="/products" className="text-cyan-600 underline mt-4 block">
                        Back to Catalog
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen font-geist text-slate-900 selection:bg-cyan-100">
            <Navbar />

            <main className="pt-32 pb-24 max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

                    {/* Left: Product Gallery */}
                    <ProductGallery
                        mainImage={product.image}
                        galleryImages={product.galleryImages}
                        productName={product.name}
                    />

                    {/* Right: Info */}
                    <div className="flex flex-col gap-8">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 text-cyan-700 text-xs font-bold uppercase tracking-wider mb-6 border border-cyan-100">
                                Professional Grade
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-[1.1] mb-6">
                                {product.name}
                            </h1>

                            {product.price && (
                                <div className="flex flex-col gap-1">
                                    {product.variations?.nodes && product.variations.nodes.length > 0 && (
                                        <span className="text-xs font-bold text-cyan-600 uppercase tracking-widest">Starting at</span>
                                    )}
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-3xl font-bold text-slate-900">
                                            {product.price}
                                        </span>
                                        <span className="text-slate-500 text-sm font-medium uppercase tracking-widest">
                                            USD / Unit
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="prose prose-slate prose-lg text-slate-600 leading-relaxed">
                            {product.shortDescription && (
                                <div dangerouslySetInnerHTML={{ __html: product.shortDescription }} className="mb-4" />
                            )}
                            {product.description && product.description !== product.shortDescription && (
                                <div dangerouslySetInnerHTML={{ __html: product.description }} />
                            )}
                        </div>

                        {/* Pricing Breakdown / Options */}
                        {product.variations?.nodes && product.variations.nodes.length > 0 && (
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">Purchase Options</h3>
                                <div className="grid gap-3">
                                    {product.variations.nodes.map((variant) => (
                                        <div
                                            key={variant.id}
                                            className="group flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-slate-50 hover:border-cyan-500/50 hover:bg-white transition-all shadow-sm"
                                        >
                                            <div className="flex flex-col">
                                                <span className="font-bold text-slate-900">
                                                    {variant.attributes?.nodes?.[0]?.value || variant.name.replace(product.name, '').trim() || 'Standard Option'}
                                                </span>
                                                <span className="text-xs text-slate-500 uppercase tracking-wider font-medium">
                                                    Professional Formulation
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className="text-lg font-black text-slate-900">{variant.price}</span>
                                                <button className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-tighter">
                                                    Select
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="mt-4 flex flex-col sm:flex-row gap-4">
                            <button className="flex-[2] bg-slate-900 text-white font-semibold py-4 px-8 rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10 flex items-center justify-center gap-2">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
