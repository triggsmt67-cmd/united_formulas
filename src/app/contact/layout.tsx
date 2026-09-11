import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact United Formulas | Great Falls & Billings, MT",
    description: "Get in touch with our Montana chemical specialists. Call (406) 727-4144 or request a free on-site facility audit and custom chemical sample kit.",
    alternates: {
        canonical: "https://unitedformulas.com/contact",
    },
    openGraph: {
        title: "Contact United Formulas | Great Falls & Billings, MT",
        description: "Get in touch with our Montana chemical specialists. Call (406) 727-4144 or request a free on-site facility audit and custom chemical sample kit.",
        url: "https://unitedformulas.com/contact",
        siteName: "United Formulas",
        type: "website",
        locale: "en_US",
    },
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
