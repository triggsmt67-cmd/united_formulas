import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
    return (
        <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60 font-geist">
            <div className="flex h-16 max-w-7xl mr-auto ml-auto pr-6 pl-6 items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <Image
                        src="https://ufbackend.com/wp-content/uploads/2026/01/UFColorFinal-Logo-1-1.png"
                        alt="United Formulas Logo"
                        width={180}
                        height={40}
                        className="h-10 w-auto object-contain"
                        priority
                    />
                </Link>
                <div className="hidden md:flex items-center gap-8">
                    <Link
                        href="/"
                        className="text-sm font-medium text-slate-500 hover:text-cyan-600 transition-colors"
                    >
                        Home
                    </Link>
                    <Link
                        href="/products"
                        className="text-sm font-medium text-slate-500 hover:text-cyan-600 transition-colors"
                    >
                        Products
                    </Link>
                    <Link
                        href="/#categories"
                        className="text-sm font-medium text-slate-500 hover:text-cyan-600 transition-colors"
                    >
                        Categories
                    </Link>
                    <Link
                        href="/about"
                        className="text-sm font-medium text-slate-500 hover:text-cyan-600 transition-colors"
                    >
                        About Us
                    </Link>
                    <Link
                        href="/contact"
                        className="text-sm font-medium text-slate-500 hover:text-cyan-600 transition-colors"
                    >
                        Contact Us
                    </Link>
                </div>
                <a
                    href="tel:4067881614"
                    className="text-xs font-medium text-slate-500 hover:text-cyan-600 transition-colors"
                >
                    406.788.1614
                </a>
            </div>
        </nav>
    );
}
