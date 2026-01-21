export interface ProductImage {
    id?: string;
    sourceUrl: string;
    altText: string;
}

export interface ProductCategory {
    id: string;
    name: string;
    slug: string;
    description?: string;
    image?: ProductImage;
}

export interface ProductNode {
    id: string;
    name: string;
    slug: string;
    shortDescription?: string;
    image?: ProductImage;
    price?: string;
    variations?: {
        nodes: Array<{
            id: string;
            price: string;
            name: string;
            description?: string;
            attributes?: {
                nodes: Array<{
                    name: string;
                    value: string;
                }>;
            };
        }>;
    };
    productData?: {
        sdssheet?: string | null;
        costPerOunce?: string | null;
    };
}

export interface HomeData {
    products: {
        nodes: ProductNode[];
    };
    productCategories: {
        nodes: ProductCategory[];
    };
}
