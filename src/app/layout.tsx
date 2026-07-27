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
  title: "Abibat Abdulraheem — Frontend Engineer Portfolio",
  description:
    "Personal portfolio of Abibat Abdulraheem — Frontend Developer turning ideas into real life products with Next.js, React, and Framer Motion.",
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
