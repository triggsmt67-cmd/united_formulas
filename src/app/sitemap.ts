import type { MetadataRoute } from 'next';
import client from '@/lib/apollo-client';
import { gql } from '@apollo/client';
import { INDUSTRIES } from '@/config/industries';

import productMetadata from '@/data/product_metadata.json';

export const dynamic = 'force-dynamic';

const FALLBACK_CATEGORIES = [
  'automotive',
  'degreaser',
  'floor-care',
  'all-purpose',
  'laundry',
  'dish-washing',
  'sanitizers',
  'disinfectant',
  'specialty',
];

const VALID_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const KNOWN_PRODUCT_SLUGS = Object.keys(productMetadata as Record<string, unknown>)
  .filter((slug) => VALID_SLUG.test(slug));

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://unitedformulas.com';
  const now = new Date();

  // 1. Core static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sds-sheets`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/credit-application`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    { url: `${baseUrl}/find-a-solution`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/cost-calculator`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/local-delivery`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // 2. Industry landing pages (from config)
  const industryRoutes: MetadataRoute.Sitemap = INDUSTRIES.map((ind) => ({
    url: `${baseUrl}/industries/${ind.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // 3. Dynamic Products and Categories
  let productSlugs = KNOWN_PRODUCT_SLUGS;
  let categorySlugs = FALLBACK_CATEGORIES;

  try {
    const { data } = await client.query<{
      products?: { nodes: { slug: string }[] };
      productCategories?: { nodes: { slug: string }[] };
    }>({
      query: gql`
        query GetSitemapSlugs {
          products(first: 100) {
            nodes {
              slug
            }
          }
          productCategories(first: 50) {
            nodes {
              slug
            }
          }
        }
      `,
    });

    if (data?.products?.nodes && data.products.nodes.length > 0) {
      productSlugs = data.products.nodes.map((p) => p.slug);
    }
    if (data?.productCategories?.nodes && data.productCategories.nodes.length > 0) {
      categorySlugs = data.productCategories.nodes.map((c) => c.slug);
    }
  } catch (err) {
    console.warn('Using fallback catalog data for sitemap generation:', err);
  }

  const categoryRoutes: MetadataRoute.Sitemap = categorySlugs.map((slug) => ({
    url: `${baseUrl}/category/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.75,
  }));

  const productRoutes: MetadataRoute.Sitemap = productSlugs.map((slug) => ({
    url: `${baseUrl}/product/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...industryRoutes, ...categoryRoutes, ...productRoutes];
}
