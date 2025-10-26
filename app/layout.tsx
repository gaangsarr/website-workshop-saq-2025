import type { Metadata } from "next";
import { poppins, lato } from "./fonts";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Workshop SAQ 2025",
  description:
    "Workshop n8n untuk Mahasiswa & Umum. Belajar bikin AI Agent, dapat Sertifikat. Kuota Terbatas 125 Orang!",
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
        <Analytics />
      </body>
    </html>
  );
}
