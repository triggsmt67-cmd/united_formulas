import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PrintButton from "@/components/resources/PrintButton";
import ProductCard from "@/components/ProductCard";
import { getAllResources, getResourceBySlug } from "@/lib/resources";
import { renderMarkdown } from "@/lib/markdown";
import { getFallbackProduct } from "@/lib/product-fallback";
import type { ProductNode } from "@/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const resources = getAllResources();
  return resources.map((r) => ({
    slug: r.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);

  if (!resource) {
    return {
      title: "Resource Not Found | United Formulas",
    };
  }

  const { meta } = resource;
  const url = `https://unitedformulas.com/resources/${meta.slug}`;
  const baseTitle = meta.metaTitle || meta.title;
  const pageTitle = baseTitle.includes("United Formulas") ? baseTitle : `${baseTitle} | United Formulas`;

  const ogImageUrl = meta.ogImage
    ? meta.ogImage.startsWith("http")
      ? meta.ogImage
      : `https://unitedformulas.com${meta.ogImage}`
    : "https://unitedformulas.com/images/og/hard-water-dish-machine.jpg";

  return {
    title: pageTitle,
    description: meta.description,
    keywords: [
      meta.primaryKeyword,
      ...meta.secondaryKeywords,
      ...meta.tags,
      "United Formulas",
      "Montana commercial cleaning",
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url,
      siteName: "United Formulas",
      type: "article",
      publishedTime: meta.date,
      authors: [meta.author],
      tags: meta.tags,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [ogImageUrl],
    },
  };
}

const RELATED_PRODUCT_SLUGS = [
  "high-temp-detergent",
  "sparkle-rinse",
  "delime",
];

const PRODUCT_IMAGE_FALLBACKS: Record<string, string> = {
  "high-temp-detergent": "https://ufbackend.com/wp-content/uploads/2026/01/HighTempDetergent-1gallon-scaled-1.jpg",
  "sparkle-rinse": "https://ufbackend.com/wp-content/uploads/2026/01/1gallon-SparkleRinse-scaled-1.jpg",
  "delime": "https://ufbackend.com/wp-content/uploads/2026/01/DeLime-1gallon.jpg",
};

export default async function ResourceArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);

  if (!resource) {
    notFound();
  }

  const { meta, body } = resource;
  const contentHtml = await renderMarkdown(body);

  // Load exactly 3 related warewash products with live image support
  const relatedProducts: ProductNode[] = RELATED_PRODUCT_SLUGS.map((pSlug) => {
    const fallback = getFallbackProduct(pSlug);
    const imageUrl = PRODUCT_IMAGE_FALLBACKS[pSlug];

    if (fallback) {
      const cleanDesc = (fallback.shortDescription || "")
        .replace(/\s+\./g, ".")
        .replace(/—/g, ":");
      return {
        ...fallback,
        shortDescription: cleanDesc,
        image: fallback.image || (imageUrl ? { sourceUrl: imageUrl, altText: fallback.name } : undefined),
      };
    }

    return {
      id: `fallback-${pSlug}`,
      name: pSlug
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" "),
      slug: pSlug,
      shortDescription: "Commercial formulation engineered for Montana water conditions.",
      image: imageUrl ? { sourceUrl: imageUrl, altText: pSlug } : undefined,
    } as ProductNode;
  });

  const canonicalUrl = `https://unitedformulas.com/resources/${meta.slug}`;
  const articleImageUrl = meta.ogImage
    ? meta.ogImage.startsWith("http")
      ? meta.ogImage
      : `https://unitedformulas.com${meta.ogImage}`
    : "https://unitedformulas.com/images/og/hard-water-dish-machine.jpg";

  // Schema.org Article Structured Data with Google SERP BreadcrumbList
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${canonicalUrl}#article`,
        isPartOf: {
          "@type": "WebPage",
          "@id": canonicalUrl,
          url: canonicalUrl,
          name: meta.title,
        },
        headline: meta.title,
        description: meta.description,
        image: [articleImageUrl],
        datePublished: meta.date,
        dateModified: meta.date,
        inLanguage: "en-US",
        articleSection: meta.category,
        keywords: [meta.primaryKeyword, ...meta.secondaryKeywords, ...meta.tags].join(", "),
        author: {
          "@type": "Organization",
          name: meta.author || "United Formulas",
          url: "https://unitedformulas.com",
        },
        publisher: {
          "@type": "Organization",
          name: "United Formulas",
          url: "https://unitedformulas.com",
          telephone: "+1-406-727-4144",
          logo: {
            "@type": "ImageObject",
            url: "https://ufbackend.com/wp-content/uploads/2026/01/UFColorFinal-Logo-1-1.png",
          },
        },
        about: {
          "@type": "Place",
          name: meta.locality || "Great Falls, Montana",
        },
        mainEntityOfPage: canonicalUrl,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://unitedformulas.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Resources",
            item: "https://unitedformulas.com/resources",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: meta.title,
            item: canonicalUrl,
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-cyan-100 selection:text-cyan-900 relative">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Navbar (Hidden on print) */}
      <div className="print:hidden">
        <Navbar />
      </div>

      {/* Top Ambient Glow (Matches IndustryPage) */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-400/10 via-slate-50/40 to-transparent pointer-events-none -z-10 print:hidden"
        aria-hidden="true"
      />

      <main className="pt-28 pb-20 sm:pt-32 sm:pb-24 print:pt-0 print:pb-0">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 print:px-0 print:max-w-none">
          {/* Breadcrumb Navigation (Hidden on print) */}
          <nav aria-label="Breadcrumb" className="mb-8 print:hidden">
            <ol className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <li>
                <Link href="/" className="hover:text-cyan-600 transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-slate-300 select-none">
                /
              </li>
              <li>
                <Link href="/resources" className="hover:text-cyan-600 transition-colors">
                  Resources
                </Link>
              </li>
              <li aria-hidden="true" className="text-slate-300 select-none">
                /
              </li>
              <li>
                <span className="text-slate-700 truncate max-w-[200px] sm:max-w-[360px] inline-block align-bottom" aria-current="page">
                  {meta.title}
                </span>
              </li>
            </ol>
          </nav>

          {/* Article Header */}
          <header className="mb-12 print:mb-6">
            {/* Badges Bar */}
            <div className="flex flex-wrap items-center gap-2.5 mb-6 print:hidden">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-50 border border-cyan-200/90 text-cyan-800 text-xs font-bold uppercase tracking-wider shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" aria-hidden="true" />
                {meta.category}
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                {meta.locality} · {meta.readingTime} read
              </span>
              <time className="text-xs text-slate-400 ml-auto font-medium" dateTime={meta.date}>
                {new Date(meta.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
            </div>

            {/* Exactly One H1 on the Page */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15] mb-6 print:text-2xl print:mb-3 print:text-black">
              {meta.title}
            </h1>

            {/* Subhead / Lead Description */}
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-normal print:text-sm print:text-black">
              {meta.description}
            </p>

            {/* Action Bar (Print button with aria-label) */}
            <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 print:hidden">
              <div className="flex items-center gap-3">
                <PrintButton
                  className="bg-white border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 shadow-2xs"
                  label="Print 10-Minute Checklist"
                />
                <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                  Single-page rep leave-behind format
                </span>
              </div>
              <Link
                href="/contact?request=audit"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-2xs"
              >
                Request On-Site Water Test →
              </Link>
            </div>
          </header>

          {/* Rendered Markdown Body */}
          <article className="article-body prose prose-slate max-w-none text-slate-800 text-base sm:text-lg leading-relaxed print:text-black print:text-sm">
            <div
              className="markdown-content"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          </article>

          {/* Print-Only Footer for Field Sheet / Leave-Behind */}
          <div className="hidden print:block border-t-2 border-black pt-4 mt-8 text-xs text-black">
            <p className="font-bold text-sm mb-1">United Formulas: Commercial Warewashing & Water Chemistry</p>
            <p className="mb-0.5">Local Great Falls Dispatch & Technical Support: <strong>(406) 727-4144</strong></p>
            <p className="mb-0.5">Online Field Guide: {canonicalUrl}</p>
            <p className="text-[10px] text-slate-600 mt-2">Printed Diagnostic Protocol · Verify tap hardness and titration before adjusting dosage.</p>
          </div>

          {/* CTA Section - Elevated High-Trust Dark Card (Hidden on print) */}
          <section
            aria-labelledby="cta-heading"
            className="my-16 sm:my-20 bg-slate-950 text-white rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden border border-slate-800 print:hidden"
          >
            {/* Background cyan glow */}
            <div
              className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/15 blur-3xl rounded-full pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-900/50 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-6">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                Direct Montana Chemical Partnership
              </div>

              <h2
                id="cta-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white mb-4 leading-tight"
              >
                Get Your Dish Machine Water Tested on Site: Free in Great Falls & Billings
              </h2>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl font-normal">
                Don’t guess your titration or wait on an out-of-state lab. United Formulas technicians carry calibrated conductivity meters and 2-minute total hardness test strips on our local route trucks.
              </p>

              {/* 3 High-Trust Micro Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-10">
                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all group">
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 font-bold text-xs group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                    ✓
                  </div>
                  <span className="text-xs sm:text-sm text-slate-300 font-medium leading-snug">
                    On-Site Hardness Test (2-Minute Strip)
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all group">
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 font-bold text-xs group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                    ✓
                  </div>
                  <span className="text-xs sm:text-sm text-slate-300 font-medium leading-snug">
                    Dispenser Calibration & Line Check
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all group">
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 font-bold text-xs group-hover:bg-cyan-500 group-hover:text-slate-950 transition-colors">
                    ✓
                  </div>
                  <span className="text-xs sm:text-sm text-slate-300 font-medium leading-snug">
                    Custom Montana Warewash Sample Kit
                  </span>
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                  <Link
                    href="/contact?request=audit"
                    className="inline-flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-base px-8 py-4 rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                  >
                    <span>Schedule Free On-Site Water Test</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7l7 7l-7 7"/></svg>
                  </Link>

                  <a
                    href="tel:4067274144"
                    className="inline-flex items-center justify-center gap-2 bg-slate-800/80 hover:bg-slate-800 text-white font-semibold text-base px-6 py-4 rounded-xl border border-slate-700 hover:border-slate-600 transition-all"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400"><path d="M22 16.92v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                    <span>Direct Call: (406) 727-4144</span>
                  </a>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-slate-400 text-xs font-semibold pt-2">
                  <span>No contracts or long-term commitments required.</span>
                  <span className="hidden sm:inline text-slate-700">|</span>
                  <span>Direct delivery from Great Falls & Billings manufacturing plant.</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Related Products Strip - Wide 3-Card Container Matching Homepage (Hidden on print) */}
        <section
          aria-labelledby="related-products-heading"
          className="my-16 sm:my-20 py-16 sm:py-20 bg-white border-y border-slate-200/80 relative overflow-hidden font-sans print:hidden"
        >
          {/* Subtle Ambient Glow */}
          <div
            className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-100/30 rounded-full blur-3xl -z-10 pointer-events-none"
            aria-hidden="true"
          />

          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-6 mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-[0.25em]">
                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" aria-hidden="true" />
                Commercial Concentrates
              </span>

              <h2
                id="related-products-heading"
                className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight"
              >
                Formulas Matched to Montana Water
              </h2>

              <div
                className="h-1.5 w-32 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 rounded-full shadow-xs"
                aria-hidden="true"
              />

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-light">
                Explore concentrated warewash formulas engineered for 7.4 to 9.8 GPG Great Falls municipal water, then ask us about on-site dispenser calibration for your kitchen.
              </p>
            </div>

            {/* Exactly 3 Product Cards matching Homepage Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProducts.map((prod, idx) => (
                <div key={prod.slug} className="h-full">
                  <div className="relative group/wrapper h-full flex flex-col">
                    <ProductCard product={prod} delay={idx * 0.2} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 flex justify-center">
              <Link
                href="/category/kitchen-warewash"
                className="inline-flex items-center gap-3 text-slate-700 hover:text-cyan-600 transition-all duration-300 group/all font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-lg py-1 px-3"
              >
                <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em]">
                  Browse Full Warewash Catalog
                </span>
                <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center group-hover/all:border-cyan-500/50 group-hover/all:bg-cyan-50 group-hover/all:text-cyan-600 transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover/all:translate-x-1 transition-transform">
                    <path d="M5 12h14m-7-7l7 7l-7 7" />
                  </svg>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Official Sources & Technical Citations (Very Bottom of Page) */}
        <section
          aria-labelledby="sources-heading"
          className="pt-4 pb-12 print:pt-4 print:pb-0"
        >
          <div className="max-w-4xl mx-auto px-6 lg:px-8 print:px-0">
            <div className="flex items-center gap-2 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-600"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
              <h3 id="sources-heading" className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Official Sources & Technical Citations
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <a
                href="https://blog.hobartcorp.com/blog/protecting-your-commercial-dishwasher-from-hard-water"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-cyan-400 hover:shadow-md transition-all flex items-start justify-between gap-3"
              >
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-900 group-hover:text-cyan-600 transition-colors">
                    Hobart Corporation
                  </span>
                  <p className="text-xs text-slate-600 leading-snug">
                    Protecting Your Commercial Dishwasher from Hard Water: Manufacturer specification guide (3.5 GPG recommended limit).
                  </p>
                </div>
                <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-500 group-hover:bg-cyan-50 group-hover:text-cyan-600 flex items-center justify-center shrink-0 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                </div>
              </a>

              <a
                href="https://greatfallsmt.net/publicworks/water-treatment-commonly-asked-questions"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-cyan-400 hover:shadow-md transition-all flex items-start justify-between gap-3"
              >
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-900 group-hover:text-cyan-600 transition-colors">
                    City of Great Falls Public Works
                  </span>
                  <p className="text-xs text-slate-600 leading-snug">
                    Water Treatment Facility: Commonly Asked Questions and Annual Drinking Water Quality Report (127 to 167 mg/L hardness).
                  </p>
                </div>
                <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-500 group-hover:bg-cyan-50 group-hover:text-cyan-600 flex items-center justify-center shrink-0 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                </div>
              </a>

              <a
                href="https://ehs.dph.ncdhhs.gov/faf/docs/foodprot/RM-2-2020-TestStrips.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-cyan-400 hover:shadow-md transition-all flex items-start justify-between gap-3"
              >
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-900 group-hover:text-cyan-600 transition-colors">
                    NC DHHS Food Protection Division
                  </span>
                  <p className="text-xs text-slate-600 leading-snug">
                    Sanitization for Food Safety: Chemical test strip protocols and temperature verification standards.
                  </p>
                </div>
                <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-500 group-hover:bg-cyan-50 group-hover:text-cyan-600 flex items-center justify-center shrink-0 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                </div>
              </a>

              <a
                href="https://www.ecfr.gov/current/title-40/chapter-I/subchapter-E/part-180/subpart-D/section-180.940"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-cyan-400 hover:shadow-md transition-all flex items-start justify-between gap-3"
              >
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-900 group-hover:text-cyan-600 transition-colors">
                    U.S. Environmental Protection Agency (EPA)
                  </span>
                  <p className="text-xs text-slate-600 leading-snug">
                    40 CFR § 180.940: Tolerance requirements and 500 ppm hardness boundaries for food-contact surface sanitizers.
                  </p>
                </div>
                <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-500 group-hover:bg-cyan-50 group-hover:text-cyan-600 flex items-center justify-center shrink-0 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                </div>
              </a>
            </div>

            {/* Back to Resources Footer Nav (Hidden on print) */}
            <div className="mt-12 pt-8 border-t border-slate-200 flex items-center justify-between print:hidden">
              <Link
                href="/resources"
                className="text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-cyan-700 inline-flex items-center gap-1.5 transition-colors"
              >
                ← Back to All Technical Resources & Field Guides
              </Link>
              <PrintButton
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs"
                label="Print Field Sheet"
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer (Hidden on print) */}
      <div className="print:hidden">
        <Footer />
      </div>

      {/* Scoped CSS for Markdown Typography, Steal This Callout, Checklists & Print Rules */}
      <style>{`
        /* Steal This Blockquote Treatment: Bordered Callout (not italic quote) */
        .article-body blockquote {
          background-color: #f0fdfa !important; /* cyan-50 */
          border-left: 4px solid #0891b2 !important; /* cyan-600 */
          border-radius: 0 1rem 1rem 0 !important;
          padding: 1.5rem 2rem !important;
          margin: 2rem 0 !important;
          font-style: normal !important;
          font-size: 1.125rem !important;
          line-height: 1.75 !important;
          color: #0f172a !important; /* slate-900 */
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05) !important;
        }
        .article-body blockquote p {
          margin: 0 !important;
          font-style: normal !important;
        }

        /* GFM Task List Checklist Panel Treatment */
        .article-body ul.contains-task-list {
          list-style: none !important;
          padding: 1.5rem 2rem !important;
          background-color: #f8fafc !important; /* slate-50 */
          border: 2px solid #e2e8f0 !important; /* slate-200 */
          border-radius: 1rem !important;
          margin: 2rem 0 !important;
        }
        .article-body li.task-list-item {
          display: flex !important;
          align-items: flex-start !important;
          gap: 0.75rem !important;
          margin-bottom: 0.875rem !important;
          font-size: 1rem !important;
          line-height: 1.6 !important;
          color: #1e293b !important;
        }
        .article-body li.task-list-item input[type="checkbox"] {
          margin-top: 0.35rem !important;
          width: 1.15rem !important;
          height: 1.15rem !important;
          accent-color: #0891b2 !important;
          cursor: not-allowed !important;
          pointer-events: none !important;
          flex-shrink: 0 !important;
        }

        /* Common Mistakes List: Distinct Visual Treatment */
        #common-mistakes + ul {
          background-color: #fff1f2 !important; /* rose-50 */
          border: 1px solid #fecdd3 !important; /* rose-200 */
          border-radius: 1rem !important;
          padding: 1.5rem 2rem !important;
          margin: 1.5rem 0 !important;
        }
        #common-mistakes + ul li {
          margin-bottom: 0.75rem !important;
          color: #881337 !important; /* rose-900 */
        }
        #common-mistakes + ul li strong {
          color: #9f1239 !important; /* rose-800 */
        }

        /* Headings scale and anchor targets */
        .article-body h2 {
          font-size: 1.75rem !important;
          font-weight: 800 !important;
          color: #0f172a !important;
          margin-top: 2.75rem !important;
          margin-bottom: 1rem !important;
          padding-bottom: 0.5rem !important;
          border-bottom: 1px solid #e2e8f0 !important;
          letter-spacing: -0.025em !important;
        }
        .article-body h3 {
          font-size: 1.35rem !important;
          font-weight: 700 !important;
          color: #0f172a !important;
          margin-top: 1.75rem !important;
          margin-bottom: 0.5rem !important;
        }
        .article-body p {
          margin-top: 1.25rem !important;
          margin-bottom: 1.25rem !important;
        }
        .article-body hr {
          margin: 2.5rem 0 !important;
          border-color: #e2e8f0 !important;
        }
        .article-body a {
          color: #0891b2 !important;
          text-decoration: underline !important;
          text-underline-offset: 3px !important;
          font-weight: 600 !important;
          word-break: break-word !important;
        }
        .article-body a:hover {
          color: #0e7490 !important;
        }

        /* Sources & Citations Block (Rendered visibly with working links) */
        #sources--citations + ol,
        #sources-citations + ol,
        #sources + ol {
          background-color: #f8fafc !important;
          border: 1px solid #e2e8f0 !important;
          border-radius: 0.75rem !important;
          padding: 1.25rem 2rem !important;
          font-size: 0.875rem !important;
          line-height: 1.6 !important;
        }

        /* Print Media Stylesheet */
        @media print {
          @page {
            margin: 1.5cm;
          }
          nav, footer, .print\\:hidden, button, [aria-label*="Print"] {
            display: none !important;
          }
          body, main, article, .article-body {
            background: #ffffff !important;
            color: #000000 !important;
            padding: 0 !important;
            margin: 0 !important;
            font-size: 10.5pt !important;
            line-height: 1.45 !important;
          }
          .article-body blockquote {
            background: transparent !important;
            border-left: 3px solid #000 !important;
            box-shadow: none !important;
            padding: 0.5rem 1rem !important;
            margin: 1rem 0 !important;
          }
          .article-body ul.contains-task-list {
            background: transparent !important;
            border: 1px solid #000 !important;
            box-shadow: none !important;
            padding: 0.75rem 1rem !important;
            margin: 1rem 0 !important;
          }
          #common-mistakes + ul {
            background: transparent !important;
            border: 1px solid #000 !important;
            padding: 0.75rem 1rem !important;
            color: #000 !important;
          }
          #common-mistakes + ul li {
            color: #000 !important;
          }
          #common-mistakes + ul li strong {
            color: #000 !important;
          }
          .article-body h2 {
            border-bottom: 1px solid #000 !important;
            margin-top: 1.5rem !important;
            margin-bottom: 0.5rem !important;
            font-size: 14pt !important;
          }
          .article-body h3 {
            margin-top: 1rem !important;
            font-size: 12pt !important;
          }
          .article-body a {
            color: #000 !important;
            text-decoration: underline !important;
          }
        }
      `}</style>
    </div>
  );
}
