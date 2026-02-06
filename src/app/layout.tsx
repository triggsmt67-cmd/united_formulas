import type { Metadata } from "next";
import { Inter, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleTagManager } from '@next/third-parties/google'

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "United Formulas - Performance First",
  description: "Weak chemicals inflate your labor costs and kill your efficiency. We formulate industrial-strength concentrates that work on contact.",
};

import { POProvider } from "@/context/POContext";
// import ChatWidget from "@/components/ChatWidget";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
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
          {/* <ChatWidget /> */}
        </POProvider>
      </body>
    </html>
  );
}
