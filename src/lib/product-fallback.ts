import productMetadata from '@/data/product_metadata.json';
import searchableProducts from '@/data/searchable_products.json';
import type { ProductNode } from '@/types';

interface ProductMetadataEntry {
    displayName?: string;
    canonicalDescription?: string;
    sds?: string;
}

const VALID_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const searchableProductRows = searchableProducts as Array<{
    productName?: string;
    variantName: string;
    sku: string;
    price: string;
}>;
const SEARCH_NAME_BY_SLUG: Record<string, string> = {
    'delta-green': 'Delta Green Slip Free Floor Cleaner',
    'delta-green-concentrate': 'Delta Green Concentrate 300',
    'dynamo-x': 'Dynamo-X Degreaser/Stripper',
    'x-coat-nano': 'X Coat Nano 22',
};

export const fallbackProducts: ProductNode[] = Object.entries(
    productMetadata as Record<string, ProductMetadataEntry>
)
    .filter(([slug]) => VALID_SLUG.test(slug))
    .map(([slug, product]) => {
        const name = product.displayName || slug;
        const searchName = SEARCH_NAME_BY_SLUG[slug] || name;
        const matchingVariants = searchableProductRows.filter(
            (variant) => variant.productName?.toLowerCase() === searchName.toLowerCase()
        );

        return {
            id: `fallback-${slug}`,
            name,
            slug,
            shortDescription: product.canonicalDescription || '',
            price: matchingVariants[0]?.price,
            variations: matchingVariants.length > 0 ? {
                nodes: matchingVariants.map((variant) => ({
                    id: variant.sku,
                    price: variant.price,
                    name: `${name} - ${variant.variantName}`,
                    attributes: {
                        nodes: [{ name: 'Size', value: variant.variantName }],
                    },
                })),
            } : undefined,
            productData: {
                sdssheet: product.sds || null,
                costPerOunce: null,
            },
        } satisfies ProductNode;
    });

export function getFallbackProduct(slug: string): ProductNode | undefined {
    return fallbackProducts.find((product) => product.slug === slug);
}
