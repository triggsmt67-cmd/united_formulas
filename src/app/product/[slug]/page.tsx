import { gql } from '@apollo/client';
import { getClient } from '@/lib/apollo-client';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductGallery from '@/components/ProductGallery';
import PurchaseOptions from '@/components/PurchaseOptions';
import POSubmitButton from '@/components/POSubmitButton';
import RelatedProducts from '@/components/RelatedProducts';
import { ProductNode, ProductImage } from '@/types';

type DetailedProduct = ProductNode & {
  galleryImages?: {
    nodes: ProductImage[];
  };
  description?: string;
  related?: {
    nodes: ProductNode[];
  };
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
        costPerOunce
      }
      related(first: 3) {
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
  }
`;

import { notFound } from 'next/navigation';
import productMetadata from '@/data/product_metadata.json';

export const revalidate = 3600;

export async function generateStaticParams() {
  return Object.keys(productMetadata as Record<string, unknown>).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const metaFallback = (productMetadata as unknown as Record<string, { displayName?: string; canonicalDescription?: string; sds?: string }>)[slug];

  let product: { name: string; shortDescription?: string; description?: string; image?: { sourceUrl: string; altText?: string } } | null = null;

  try {
    const { data } = await getClient().query<{
      product: {
        name: string;
        shortDescription?: string;
        description?: string;
        image?: {
          sourceUrl: string;
          altText?: string;
        };
      };
    }>({
      query: gql`
        query GetProductMeta($slug: ID!) {
          product(id: $slug, idType: SLUG) {
            name
            shortDescription
            description
            image {
              sourceUrl
              altText
            }
          }
        }
      `,
      variables: { slug },
    });

    product = data?.product || null;
  } catch {
    // If GraphQL is down or rate-limiting, use local metadata
  }

  if (!product && metaFallback) {
    product = {
      name: metaFallback.displayName || slug,
      shortDescription: metaFallback.canonicalDescription || '',
      description: metaFallback.canonicalDescription || '',
    };
  }

  if (!product) {
    return {
      title: "Product Not Found | United Formulas",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const rawTitle = `${product.name} | United Formulas`;
  const title = rawTitle.length <= 60 ? rawTitle : product.name;

  const rawDesc = product.shortDescription || product.description || '';
  const cleanDesc = rawDesc.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();

  let description = `Buy ${product.name} commercial concentrate direct from United Formulas in Montana. High-strength industrial cleaner in drums and 5-gal pails.`;
  if (cleanDesc && cleanDesc.length >= 40) {
    description = cleanDesc.length > 155 ? `${cleanDesc.substring(0, 152).trim()}...` : cleanDesc;
  }

  const canonicalUrl = `https://unitedformulas.com/product/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "United Formulas",
      type: "website",
      locale: "en_US",
      ...(product.image?.sourceUrl && {
        images: [
          {
            url: product.image.sourceUrl,
            alt: product.image.altText || product.name,
          },
        ],
      }),
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const metaFallback = (productMetadata as unknown as Record<string, { displayName?: string; canonicalDescription?: string; sds?: string }>)[slug];

  let product: DetailedProduct | null = null;
  try {
    const { data } = await getClient().query<{ product: DetailedProduct }>({
      query: GET_PRODUCT,
      variables: { slug: slug },
    });
    product = data?.product || null;
  } catch (err) {
    console.error(`Error fetching product [${slug}] from GraphQL:`, err);
  }

  if (!product && metaFallback) {
    product = {
      id: slug,
      name: metaFallback.displayName || slug,
      slug: slug,
      description: metaFallback.canonicalDescription || '',
      shortDescription: metaFallback.canonicalDescription || '',
      productData: {
        sdssheet: metaFallback.sds || null,
        costPerOunce: null,
      },
    };
  }

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen font-sans text-slate-900 selection:bg-cyan-100">
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
                costPerOunce={product.productData?.costPerOunce}
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

        {product.related?.nodes && product.related.nodes.length > 0 && (
          <RelatedProducts products={product.related.nodes} />
        )}
      </main>
      <Footer />
    </div>
  );
}
