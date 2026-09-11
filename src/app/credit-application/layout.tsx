import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "B2B Commercial Credit Application | United Formulas",
    description: "Apply for commercial credit terms and route delivery accounts with United Formulas. Fast approval for Montana businesses, schools, and contractors.",
    alternates: {
        canonical: "https://unitedformulas.com/credit-application",
    },
    openGraph: {
        title: "B2B Commercial Credit Application | United Formulas",
        description: "Apply for commercial credit terms and route delivery accounts with United Formulas. Fast approval for Montana businesses, schools, and contractors.",
        url: "https://unitedformulas.com/credit-application",
        siteName: "United Formulas",
        type: "website",
        locale: "en_US",
    },
};

export default function CreditApplicationLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
