import Image from "next/image";
import Link from "next/link";

export default function CategoryCard({ title, slug, image, description, ph, dilution, icon, accentColor }: any) {
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
            <div className={`relative h-72 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 transition-all duration-500 hover:-translate-y-1 ${hoverClasses} hover:shadow-2xl`}>
                <div className="absolute inset-0">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="h-full w-full object-cover opacity-90 transition-all duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                </div>
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <div className="mb-2 flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-white tracking-tight">
                            {title}
                        </h3>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1em"
                            height="1em"
                            viewBox="0 0 24 24"
                            className={`${textColor} text-xl`}
                        >
                            {icon}
                        </svg>
                    </div>
                    <p className="mb-4 text-sm leading-relaxed text-slate-300">
                        {description}
                    </p>
                    <div className="flex items-center justify-between border-t border-slate-800 pt-4">
                        <span className={`text-xs font-semibold uppercase tracking-wider ${textColor}`}>
                            {ph}
                        </span>
                        <span className="rounded bg-slate-900 border border-slate-800 px-2 py-1 text-xs font-medium text-slate-500">
                            Dilution: {dilution}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
