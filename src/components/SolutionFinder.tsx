"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { SOLUTION_PATHS } from "@/config/sales-strategy";

export default function SolutionFinder({ compact = false }: { compact?: boolean }) {
  const [selectedId, setSelectedId] = useState(SOLUTION_PATHS[0].id);
  const selected = useMemo(() => SOLUTION_PATHS.find((item) => item.id === selectedId) || SOLUTION_PATHS[0], [selectedId]);

  return (
    <div className={`grid lg:grid-cols-[0.9fr_1.1fr] gap-6 ${compact ? "" : "lg:gap-10"}`}>
      <div className="space-y-3" role="list" aria-label="Cleaning challenges">
        {SOLUTION_PATHS.map((path) => (
          <button
            key={path.id}
            type="button"
            onClick={() => setSelectedId(path.id)}
            aria-pressed={selectedId === path.id}
            className={`w-full text-left rounded-2xl border p-4 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 ${selectedId === path.id ? "border-cyan-500 bg-cyan-50 shadow-sm" : "border-slate-200 bg-white hover:border-slate-300"}`}
          >
            <span className="block font-bold text-slate-900">{path.label}</span>
            {!compact && <span className="mt-1 block text-sm leading-relaxed text-slate-500">{path.description}</span>}
          </button>
        ))}
      </div>

      <div className="rounded-3xl bg-slate-950 p-6 text-white sm:p-8" aria-live="polite">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">Recommended starting point</p>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight">{selected.label}</h3>
        <p className="mt-3 leading-relaxed text-slate-300">{selected.auditPrompt}</p>
        <div className="mt-6 grid gap-3">
          {selected.products.map((product) => (
            <Link key={product.slug} href={`/product/${product.slug}`} className="group rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-cyan-400/50 hover:bg-white/10">
              <span className="flex items-center justify-between gap-4 font-bold">
                {product.name}<span className="text-cyan-300 transition group-hover:translate-x-1">→</span>
              </span>
              <span className="mt-1 block text-sm leading-relaxed text-slate-400">{product.reason}</span>
            </Link>
          ))}
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link href={`/contact?request=sample&challenge=${selected.id}`} className="inline-flex justify-center rounded-xl bg-cyan-500 px-5 py-3 font-bold text-slate-950 transition hover:bg-cyan-300">Build a 7-Day Trial</Link>
          <Link href={`/contact?request=audit&challenge=${selected.id}`} className="inline-flex justify-center rounded-xl border border-white/20 px-5 py-3 font-bold transition hover:bg-white/10">Request an Audit</Link>
        </div>
      </div>
    </div>
  );
}
