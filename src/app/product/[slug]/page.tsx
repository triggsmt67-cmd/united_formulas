import { gql } from '@apollo/client';
import { getClient } from '@/lib/apollo-client';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductGallery from '@/components/ProductGallery';
import PurchaseOptions from '@/components/PurchaseOptions';
import POSubmitButton from '@/components/POSubmitButton';
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
      productData {
        sdssheet
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
                <Footer />
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
                        </div>

                        {/* Pricing Breakdown / Options */}
                        {product.variations?.nodes && product.variations.nodes.length > 0 && (
                            <PurchaseOptions
                                productName={product.name}
                                variants={product.variations.nodes}
                            />
                        )}

                        <div className="prose prose-slate prose-lg text-slate-600 leading-relaxed">
                            {product.shortDescription && (
                                <div dangerouslySetInnerHTML={{ __html: product.shortDescription }} className="mb-4" />
                            )}
                            {product.description && product.description !== product.shortDescription && (
                                <div dangerouslySetInnerHTML={{ __html: product.description }} />
                            )}
                        </div>

                        <div className="mt-4 flex flex-col gap-4">
                            <POSubmitButton />
                            {product.productData?.sdssheet && (
                                <a
                                    href={product.productData.sdssheet}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full bg-white border-2 border-slate-200 text-slate-900 font-semibold py-4 px-8 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2 text-center"
                                >
                                    Download SDS Sheet
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
