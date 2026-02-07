import type { Metadata } from "next";
import localFont from "next/font/local";
import LenisProvider from "./components/LenisProvider";
import CustomCursor from "./components/CustomCursor";
import "./globals.css";

const boone = localFont({
  src: "../public/BOONE.otf",
  variable: "--font-display",
});

const productSans = localFont({
  src: [
    { path: "../public/google sans/ProductSans-Thin.ttf", weight: "100", style: "normal" },
    { path: "../public/google sans/ProductSans-ThinItalic.ttf", weight: "100", style: "italic" },
    { path: "../public/google sans/ProductSans-Light.ttf", weight: "300", style: "normal" },
    { path: "../public/google sans/ProductSans-LightItalic.ttf", weight: "300", style: "italic" },
    { path: "../public/google sans/ProductSans-Regular.ttf", weight: "400", style: "normal" },
    { path: "../public/google sans/ProductSans-Italic.ttf", weight: "400", style: "italic" },
    { path: "../public/google sans/ProductSans-Medium.ttf", weight: "500", style: "normal" },
    { path: "../public/google sans/ProductSans-MediumItalic.ttf", weight: "500", style: "italic" },
    { path: "../public/google sans/ProductSans-Bold.ttf", weight: "700", style: "normal" },
    { path: "../public/google sans/ProductSans-BoldItalic.ttf", weight: "700", style: "italic" },
    { path: "../public/google sans/ProductSans-Black.ttf", weight: "900", style: "normal" },
    { path: "../public/google sans/ProductSans-BlackItalic.ttf", weight: "900", style: "italic" },
  ],
  variable: "--font-product-sans",
});

export const metadata: Metadata = {
  title: "Haloweave — AI Product Studio",
  description:
    "We work with founders and teams to design and build AI products that feel inevitable.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${boone.variable} ${productSans.variable} antialiased`}
      >
        <LenisProvider>
          {children}
        </LenisProvider>
        <CustomCursor />
      </body>
    </html>
  );
}
