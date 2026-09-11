import Image from "next/image";
import Link from "next/link";

interface CategoryCardProps {
    title: string;
    slug?: string;
    href?: string;
    description?: string;
    image: string;
    alt?: string;
    icon?: React.ReactNode;
    accentColor?: string;
}

export default function CategoryCard({
    title,
    slug,
    href,
    description,
    image,
    alt,
    icon,
    accentColor = "cyan",
}: CategoryCardProps) {
    const colorMap: Record<string, string> = {
        amber: "hover:border-amber-400 hover:shadow-amber-400/50 text-amber-400",
        cyan: "hover:border-cyan-400 hover:shadow-cyan-400/50 text-cyan-400",
        emerald: "hover:border-emerald-400 hover:shadow-emerald-400/50 text-emerald-400",
        violet: "hover:border-violet-400 hover:shadow-violet-400/50 text-violet-400",
        rose: "hover:border-rose-400 hover:shadow-rose-400/50 text-rose-400",
        orange: "hover:border-orange-400 hover:shadow-orange-400/50 text-orange-400",
    };

    const colorClasses = colorMap[accentColor] || colorMap.cyan;
    const textColor = colorClasses.split(" ").find((c) => c.startsWith("text-")) || "text-cyan-400";
    const destination = href || (slug ? `/category/${slug}` : "/products");

    return (
        <Link
            href={destination}
            className="block group rounded-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-4 focus-visible:ring-offset-[#1E3A8A] transition-shadow"
        >
            <div
                className={`relative ${
                    description ? "h-[22rem] sm:h-[23rem] lg:h-[24rem]" : "h-64"
                } overflow-hidden rounded-3xl border border-white/15 bg-slate-900 transition-all duration-500 group-hover:-translate-y-1.5 group-hover:border-cyan-400/50 group-hover:shadow-2xl group-hover:shadow-cyan-950/50`}
            >
                {/* Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src={image}
                        alt={alt || title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105 opacity-90"
                    />
                    {/* Deep contrast gradient ensuring full legibility across all background imagery */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/65 to-slate-900/10" />
                </div>

                {/* Card Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 z-10">
                    <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug group-hover:text-cyan-400 transition-colors">
                            {title}
                        </h3>
                        {icon && (
                            <div
                                className={`flex-shrink-0 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center ${textColor} text-xl transition-all group-hover:bg-white group-hover:scale-110`}
                                aria-hidden="true"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 24 24"
                                    className="iconify"
                                >
                                    {icon}
                                </svg>
                            </div>
                        )}
                    </div>

                    {description && (
                        <p className="text-sm text-slate-200 leading-relaxed font-normal">
                            {description}
                        </p>
                    )}
                </div>
            </div>
        </Link>
    );
}

