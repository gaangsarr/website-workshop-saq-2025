import type { Metadata } from "next";
import { poppins, lato } from "./fonts";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Workshop SAQ 2025",
  description: "Website Workshop Lab. SAQ ITPLN 2025",
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
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
