"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Loader2, XCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useTicketConfig } from "@/hooks/useTicketConfig";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyKgPjLSsrkabDwU3S2ptOJY4nmsoG-E5e-2CMrmk_ch0xfngs5xiaNuyA3fQK3kNg9/exec"; // ← GANTI DENGAN SCRIPT ID KAMU
const FORM_URL = "https://forms.gle/KUfxExGxvoeJJXVn6";

export default function DaftarMandiriPage() {
  const { getActivePackage, formatPrice } = useTicketConfig();
  const packageData = getActivePackage("mandiri");

  const [isFormOpen, setIsFormOpen] = useState<boolean | null>(null);
  const [isPresale, setIsPresale] = useState<boolean>(true);
  const [quotaInfo, setQuotaInfo] = useState({
    totalPeserta: 0,
    maxPeserta: 45,
    sisaKuota: 45,
  });

  useEffect(() => {
    checkFormStatus();
  }, []);

  const checkFormStatus = async () => {
    try {
      console.log("Fetching form status from:", SCRIPT_URL);

      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "checkStatus" }),

      });

      const data = await response.json();

      if (data && typeof data.mandiriOpen !== "undefined") {
        setIsFormOpen(data.mandiriOpen);
        setIsPresale(data.isPresale || false);
        setQuotaInfo({
          totalPeserta: data.totalPeserta || 0,
          maxPeserta: data.maxPeserta || 45,
          sisaKuota: data.sisaKuota || 0,
        });
      } else {
        setIsFormOpen(true);
      }
    } catch (error) {
      console.error("Error checking form status:", error);
      setIsFormOpen(true);
    }
  };

  // Loading
  if (isFormOpen === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-biru mx-auto mb-4" />
          <p className="text-gray-600">Memuat informasi pendaftaran...</p>
        </div>
      </div>
    );
  }

  // Form tutup
  if (!isFormOpen) {
    const closedTitle = isPresale
      ? "Kuota Pre-Sale Penuh"
      : "Kuota Pendaftaran Penuh";

    const closedMessage = isPresale
      ? `Maaf, kuota pre-sale ${
          packageData?.name || "paket ini"
        } sudah penuh (${quotaInfo.totalPeserta}/${
          quotaInfo.maxPeserta
        } peserta). Nantikan pembukaan pendaftaran normal!`
      : `Maaf, kuota pendaftaran ${
          packageData?.name || "paket ini"
        } sudah penuh (${quotaInfo.totalPeserta}/${
          quotaInfo.maxPeserta
        } peserta). Terima kasih atas minat Anda!`;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-3xl p-8 border-2 border-black shadow-xl text-center"
        >
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-10 h-10 text-red-600" />
          </div>
          <h2 className="font-heading font-bold text-3xl text-gray-800 mb-4">
            {closedTitle}
          </h2>
          <p className="text-gray-600 mb-6">{closedMessage}</p>
          <Link href="/daftar">
            <button className="w-full bg-biru hover:bg-blue-700 text-white font-heading font-bold py-3 px-6 rounded-2xl transition-all mb-3 border-2 border-black shadow-lg">
              Lihat Paket Lain
            </button>
          </Link>
          <Link href="/">
            <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-heading font-bold py-3 px-6 rounded-2xl transition-all">
              Kembali ke Home
            </button>
          </Link>
        </motion.div>
      </div>
    );
  }

  if (!packageData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-gray-600">Pendaftaran tidak tersedia saat ini.</p>
          <Link
            href="/daftar"
            className="text-biru hover:underline mt-4 inline-block"
          >
            Kembali ke pilihan paket
          </Link>
        </div>
      </div>
    );
  }

  // Form buka - Redirect ke Google Form
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/daftar"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-biru mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Kembali
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-8 border-2 border-black shadow-xl text-center"
        >
          <div className="w-20 h-20 bg-biru/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <ExternalLink className="w-10 h-10 text-biru" />
          </div>

          <h1 className="font-heading font-bold text-3xl text-gray-800 mb-4">
            Formulir Pendaftaran {packageData.name}
          </h1>

          <p className="text-gray-600 mb-2">
            {packageData.participants} • {formatPrice(packageData.currentPrice)}
          </p>

          <div className="bg-yellow-50 border-2 border-yellow-400 rounded-2xl p-4 mb-6 inline-block">
            <p className="text-sm font-bold text-yellow-800">
              ⚡ Sisa Kuota: {quotaInfo.sisaKuota} dari {quotaInfo.maxPeserta}{" "}
              peserta
            </p>
          </div>

          <p className="text-gray-600 mb-8">
            Kamu akan diarahkan ke Google Form untuk mengisi data pendaftaran.
          </p>

          <a
            href={FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-biru hover:bg-blue-700 text-white font-heading font-bold py-4 px-8 rounded-2xl transition-all border-2 border-black shadow-lg hover:shadow-xl"
          >
            Buka Form Pendaftaran
            <ExternalLink className="w-5 h-5" />
          </a>

          <div className="mt-8 pt-8 border-t-2 border-gray-200">
            <h3 className="font-heading font-bold text-lg text-gray-800 mb-4">
              Informasi Pembayaran
            </h3>
            <Image
              src="/qris.png"
              alt="QRIS Payment"
              width={300}
              height={300}
              className="w-64 mx-auto rounded-xl border-2 border-gray-200 mb-4"
            />
            <p className="text-sm text-gray-600 mb-2">
              Scan QRIS di atas untuk pembayaran
            </p>
            <p className="text-xl font-heading font-bold text-biru">
              {formatPrice(packageData.currentPrice)}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
