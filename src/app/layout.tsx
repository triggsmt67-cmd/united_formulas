import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { GoogleTagManager } from '@next/third-parties/google';

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://unitedformulas.com"),
  title: "Industrial Cleaning Chemicals & Wholesale Supplies | Montana",
  description: "Commercial cleaning concentrates, degreasers, and dish soaps made in Montana. Bulk drum delivery and route service from Great Falls and Billings warehouses.",
};

import dynamic from "next/dynamic";
import { POProvider } from "@/context/POContext";

const ChatWidget = dynamic(() => import("@/chemist-module/ui/ChatWidget"));
const GlobalPOContainer = dynamic(() => import("@/components/GlobalPOContainer"));

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${outfit.variable} antialiased`}
      >
        <GoogleTagManager gtmId="GTM-KZPZ7VZT" />
        {process.env.NODE_ENV === 'development' && (
          <script
            dangerouslySetInnerHTML={{
              __html: `console.log('GTM Initialized: GTM-KZPZ7VZT')`,
            }}
          />
        )}
        <POProvider>
          {children}
          <ChatWidget />
          <GlobalPOContainer />
        </POProvider>
      </body>
    </html>
  );
}
