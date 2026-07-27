import type { Metadata } from "next";
import { Poppins, Lora } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
});

export const metadata: Metadata = {
  title: "Abibat Abdulraheem | Frontend Engineer",
  description:
    "Frontend developer building high-performance web apps for fintech and beyond. Fluent in React, Next.js, Tailwind, and turning ideas into shipped products.",
  metadataBase: new URL("https://abibee.vercel.app"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
  openGraph: {
    type: "website",
    url: "https://abibee.vercel.app",
    title: "Abibat Abdulraheem | Frontend Engineer",
    description:
      "Frontend developer building high-performance web apps for fintech and beyond. Fluent in React, Next.js, Tailwind, and turning ideas into shipped products.",
    siteName: "Abibat Abdulraheem",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Abibat Abdulraheem | Frontend Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abibat Abdulraheem | Frontend Engineer",
    description:
      "Frontend developer building high-performance web apps for fintech and beyond. Fluent in React, Next.js, Tailwind, and turning ideas into shipped products.",
    images: ["/images/logo.png"],
    creator: "@abibatdev",
  },
  keywords: [
    "Frontend Developer",
    "React Developer",
    "Next.js",
    "Tailwind CSS",
    "Framer Motion",
    "UI Engineer",
    "Web Developer Nigeria",
    "Fintech Frontend",
    "Abibat Abdulraheem",
  ],
  authors: [{ name: "Abibat Abdulraheem", url: "https://abibee.vercel.app" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${poppins.className} ${lora.variable} bg-bgPrimary text-white selection:bg-accentIndigo selection:text-white antialiased`}
      >
        {/* Subtle background noise overlay */}
        <div className="noise-overlay" />

        <Preloader />
        <CustomCursor />
        <Navbar />

        <main className="w-full min-h-screen">{children}</main>

        <Footer />
      </body>
    </html>
  );
}
