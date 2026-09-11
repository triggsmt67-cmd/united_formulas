import { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import IndustryPage from "@/components/IndustryPage";
import {
    getIndustryBySlug,
    getAllIndustrySlugs,
} from "@/config/industries";

export const dynamicParams = false;

export function generateStaticParams() {
    return getAllIndustrySlugs().map((slug) => ({
        slug,
    }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const industry = getIndustryBySlug(slug);

    if (!industry) {
        return {};
    }

    const canonicalUrl = `https://unitedformulas.com/industries/${industry.slug}`;

    return {
        title: industry.seoTitle,
        description: industry.seoDescription,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title: industry.seoTitle,
            description: industry.seoDescription,
            url: canonicalUrl,
            siteName: "United Formulas",
            type: "website",
            locale: "en_US",
            images: [
                {
                    url: "https://ufbackend.com/wp-content/uploads/2026/01/the-graphic-space-kLZs4yoR0uU-unsplash.jpg",
                    width: 640,
                    height: 959,
                    alt: `${industry.schemaName || industry.hero.h1} - United Formulas`,
                },
            ],
        },
    };
}

export default async function IndustryPageRoute({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const industry = getIndustryBySlug(slug);

    if (!industry) {
        notFound();
    }

    if (slug !== industry.slug) {
        permanentRedirect(`/industries/${industry.slug}`);
    }

    return <IndustryPage industry={industry} />;
}
