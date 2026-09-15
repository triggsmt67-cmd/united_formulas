import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getAllResources, ResourceArticle } from "@/lib/resources";

export const metadata: Metadata = {
  title: "Technical Resources & Water Chemistry Guides | United Formulas",
  description:
    "Authoritative field guides, municipal water hardness data (7.4 to 9.8 GPG in Great Falls), commercial dish machine troubleshooting, and chemical dilution math engineered for Montana facilities.",
  alternates: {
    canonical: "https://unitedformulas.com/resources",
  },
  openGraph: {
    title: "Technical Resources & Water Chemistry Guides | United Formulas",
    description:
      "Authoritative field guides, municipal water hardness data, commercial dish machine troubleshooting, and operational chemical engineering for Montana commercial facilities.",
    url: "https://unitedformulas.com/resources",
    siteName: "United Formulas",
    type: "website",
  },
};

export default function ResourcesIndexPage() {
  const articles: ResourceArticle[] = getAllResources();

  // Schema.org CollectionPage & BreadcrumbList structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://unitedformulas.com/resources",
        url: "https://unitedformulas.com/resources",
        name: "Technical Resources & Water Chemistry Guides | United Formulas",
        description:
          "Authoritative field guides, municipal water hardness data, commercial dish machine troubleshooting, and operational chemical engineering for Montana commercial facilities.",
        isPartOf: {
          "@type": "WebSite",
          "@id": "https://unitedformulas.com/#website",
          url: "https://unitedformulas.com",
          name: "United Formulas",
        },
        publisher: {
          "@type": "Organization",
          name: "United Formulas",
          url: "https://unitedformulas.com",
          logo: {
            "@type": "ImageObject",
            url: "https://ufbackend.com/wp-content/uploads/2026/01/UFColorFinal-Logo-1-1.png",
          },
        },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: articles.map((article, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            url: `https://unitedformulas.com/resources/${article.slug}`,
            name: article.title,
            description: article.description,
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://unitedformulas.com/resources#breadcrumb",
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

      <Navbar />

      {/* Ambient Top Glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-400/10 via-slate-50/40 to-transparent pointer-events-none -z-10"
        aria-hidden="true"
      />

      <main className="pt-28 pb-20 sm:pt-32 sm:pb-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-8">
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
                <span className="text-slate-700" aria-current="page">
                  Resources
                </span>
              </li>
            </ol>
          </nav>

          {/* Hero Header */}
          <header className="max-w-3xl mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200/90 text-cyan-800 text-xs font-bold uppercase tracking-wider mb-6 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" aria-hidden="true" />
              Technical Resources & Field Guides
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15] mb-4">
              Commercial Cleaning Chemistry & Water Intelligence
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed font-normal">
              Field-tested chemistry, verified municipal water hardness data, commercial dish machine diagnostic protocols, and dilution math engineered for Montana facilities by United Formulas chemists in Great Falls.
            </p>
          </header>

          {/* Flat, Reverse-Chronological Resource List (Per v2 plan: no empty category silos) */}
          <div className="space-y-6">
            {articles.map((article) => (
              <article
                key={article.slug}
                className="group relative p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 hover:border-cyan-400 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                {/* Top hover accent bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  aria-hidden="true"
                />

                <div className="flex flex-wrap items-center gap-2.5 mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-800 bg-cyan-50 border border-cyan-200/80 px-2.5 py-1 rounded-full">
                    {article.category}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    {article.locality} · {article.readingTime} read
                  </span>
                  <time className="text-xs text-slate-400 ml-auto font-medium" dateTime={article.date}>
                    {new Date(article.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 group-hover:text-cyan-900 transition-colors tracking-tight leading-snug">
                  <Link href={`/resources/${article.slug}`}>
                    {article.title}
                  </Link>
                </h2>

                <p className="mt-3 text-slate-600 leading-relaxed text-base">
                  {article.description}
                </p>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {article.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/resources/${article.slug}`}
                    className="text-xs font-bold uppercase tracking-wider text-cyan-700 group-hover:text-cyan-900 inline-flex items-center gap-1 transition-colors"
                  >
                    <span>Read Field Guide</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* On-Site Water Diagnostic CTA Block */}
          <div className="mt-16 rounded-3xl bg-slate-950 p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden border border-slate-800">
            <div
              className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/15 blur-3xl rounded-full pointer-events-none"
              aria-hidden="true"
            />
            <div className="relative z-10 max-w-2xl">
              <span className="text-[11px] font-bold uppercase tracking-widest text-cyan-300 bg-cyan-900/50 border border-cyan-500/30 px-3 py-1 rounded-full">
                Montana Technical Field Support
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-4">
                Need your facility water hardness tested in Montana?
              </h2>
              <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
                We test total hardness (GPG/PPM), temperature, and calibrate dispenser chemical concentration on-site in under 2 minutes. Free for commercial accounts in Great Falls, Billings, and route delivery zones.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <a
                  href="tel:4067274144"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm uppercase tracking-wider transition-colors shadow-md"
                >
                  Call (406) 727-4144
                </a>
                <Link
                  href="/contact?request=audit"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-colors border border-white/20"
                >
                  <span>Request Facility Audit</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
