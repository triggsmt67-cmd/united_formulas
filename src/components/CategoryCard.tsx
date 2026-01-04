import Image from "next/image";
import Link from "next/link";

export default function CategoryCard({ title, slug, image, alt, icon, accentColor }: any) {
    const colorMap: Record<string, string> = {
        amber: "hover:border-amber-400 hover:shadow-amber-400/50 text-amber-400",
        cyan: "hover:border-cyan-400 hover:shadow-cyan-400/50 text-cyan-400",
        emerald: "hover:border-emerald-400 hover:shadow-emerald-400/50 text-emerald-400",
        violet: "hover:border-violet-400 hover:shadow-violet-400/50 text-violet-400",
        rose: "hover:border-rose-400 hover:shadow-rose-400/50 text-rose-400",
        orange: "hover:border-orange-400 hover:shadow-orange-400/50 text-orange-400",
    };

    const colorClasses = colorMap[accentColor] || colorMap.cyan;
    const textColor = colorClasses.split(" ").find(c => c.startsWith("text-")) || "text-cyan-400";
    const hoverClasses = colorClasses.split(" ").filter(c => c.startsWith("hover:")).join(" ");

    return (
        <Link href={`/category/${slug || ""}`} className="block group">
            <div className={`relative h-64 overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-100`}>
                <div className="absolute inset-0">
                    <Image
                        src={image}
                        alt={alt || title}
                        fill
                        className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    {/* Darker, more precise overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
                </div>

                <div className="absolute inset-0 flex flex-col justify-end p-8">
                    <div className="flex items-center justify-between gap-4">
                        <h3 className="text-2xl font-bold text-white tracking-tight leading-tight group-hover:text-cyan-400 transition-colors">
                            {title}
                        </h3>
                        <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center ${textColor} text-xl transition-all group-hover:bg-white group-hover:scale-110`}>
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
                    </div>
                </div>
            </div>
        </Link>
    );
}
