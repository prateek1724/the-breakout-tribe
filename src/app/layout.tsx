import type { Metadata } from "next";
import { Montserrat, Playfair_Display, Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const montserrat = Montserrat({
  weight: ['700'],
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const playfairDisplay = Playfair_Display({
  weight: ['400', '700'],
  subsets: ["latin"],
  variable: "--font-playfair",
});

const poppins = Poppins({
  weight: ['300', '400', '500', '600'],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "The Breakout Tribe | Not a Trip. A Tribe.",
  description: "The Breakout Tribe - Travel experiences that connect you with like-minded individuals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${playfairDisplay.variable} ${poppins.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
