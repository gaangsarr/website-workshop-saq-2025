import type { Metadata } from "next";
import { poppins, lato } from "./fonts";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Workshop SAQ 2025",
  description: "Build Your First AI Agent - Workshop SAQ 2025",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${lato.variable}`}>
      <head>
        <link rel="shortcut icon" href="icon-saq-ws.png" type="image/x-icon" />
      </head>
      <body className="overflow-x-hidden">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
