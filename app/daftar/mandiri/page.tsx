"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Loader2, XCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useTicketConfig } from "@/hooks/useTicketConfig";

const SCRIPT_URL =
<<<<<<< HEAD
  "https://script.google.com/macros/s/AKfycbyKgPjLSsrkabDwU3S2ptOJY4nmsoG-E5e-2CMrmk_ch0xfngs5xiaNuyA3fQK3kNg9/exec"; // ← GANTI DENGAN SCRIPT ID KAMU
const FORM_URL = "https://forms.gle/KUfxExGxvoeJJXVn6";
=======
  "https://script.google.com/macros/s/AKfycbw0YbOZFRWhWe928TRLjPtdNxWHJXaoCfWN1ri2An8WUShWiLYZiTS8fpIguT34wrYU-A/exec";
>>>>>>> update-open-normal-v1

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
      console.log("Fetching form status from API proxy");

<<<<<<< HEAD
      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "checkStatus" }),
=======
      // Call the Next.js API route instead of directly calling Google Apps Script
      // This avoids CORS issues since the API route runs on the same origin
      const response = await fetch("/api/check-quota", {
        method: "GET",
        cache: "no-cache",
      });
>>>>>>> update-open-normal-v1

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

<<<<<<< HEAD
  // Loading
=======
  // ... handleInputChange, handleFileChange, handleSubmit sama seperti sebelumnya

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBuktiPembayaran(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let fileBase64 = "";
      let fileName = "";
      let fileType = "";

      if (buktiPembayaran) {
        const reader = new FileReader();
        fileBase64 = await new Promise<string>((resolve, reject) => {
          reader.onload = () => {
            const result = reader.result as string;
            resolve(result.split(",")[1]);
          };
          reader.onerror = reject;
          reader.readAsDataURL(buktiPembayaran);
        });
        fileName = buktiPembayaran.name;
        fileType = buktiPembayaran.type;
      }

      // ✅ SUBMIT TO API PROXY (instead of direct form submission)
      // This avoids iOS Safari CORS issues by using server-to-server communication
      const response = await fetch("/api/submit-registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jumlahPeserta: "1",
          namaLengkap: formData.namaLengkap,
          asalInstansi: formData.asalInstansi,
          jurusan: formData.jurusan || "-",
          nim: formData.nim || "-",
          nomorWA: formData.nomorWA,
          email: formData.email,
          status: formData.status,
          buktiPembayaranBase64: fileBase64,
          buktiPembayaranName: fileName,
          buktiPembayaranType: fileType,
        }),
      });

      console.log("Submission response status:", response.status);
      const result = await response.json();
      console.log("Submission result:", result);

      if (response.ok && result.success) {
        setIsSubmitting(false);
        setShowSuccessModal(true);
      } else {
        throw new Error(result.error || "Submission failed");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(
        "Terjadi kesalahan saat mengirim data. Silakan coba lagi."
      );
      setShowErrorModal(true);
      setIsSubmitting(false);
    }
  };

>>>>>>> update-open-normal-v1
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

<<<<<<< HEAD
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-8 border-2 border-black shadow-xl text-center"
        >
          <div className="w-20 h-20 bg-biru/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <ExternalLink className="w-10 h-10 text-biru" />
=======
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl p-6 md:p-8 border-2 border-black shadow-xl"
            >
              <h1 className="font-heading font-bold text-3xl text-biru mb-2">
                Formulir Pendaftaran
              </h1>
              <p className="text-gray-600 mb-6">{packageData.name}</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    name="namaLengkap"
                    value={formData.namaLengkap}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-biru focus:outline-none text-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Asal Instansi *
                  </label>
                  <input
                    type="text"
                    name="asalInstansi"
                    value={formData.asalInstansi}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-biru focus:outline-none text-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Status *
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-biru focus:outline-none text-gray-800"
                  >
                    <option value="Mahasiswa">Mahasiswa</option>
                    <option value="Pelajar">Pelajar</option>
                    <option value="Umum">Umum</option>
                  </select>
                </div>

                {formData.status === "Mahasiswa" && (
                  <>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Jurusan *
                      </label>
                      <input
                        type="text"
                        name="jurusan"
                        value={formData.jurusan}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-biru focus:outline-none text-gray-800"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        NIM *
                      </label>
                      <input
                        type="text"
                        name="nim"
                        value={formData.nim}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-biru focus:outline-none text-gray-800"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Nomor WhatsApp *
                  </label>
                  <input
                    type="tel"
                    name="nomorWA"
                    value={formData.nomorWA}
                    onChange={handleInputChange}
                    required
                    placeholder="08xxxxxxxxxx"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-biru focus:outline-none text-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-biru focus:outline-none text-gray-800"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Upload Bukti Pembayaran *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-biru transition-colors">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                      id="bukti-pembayaran"
                      required
                    />
                    <label
                      htmlFor="bukti-pembayaran"
                      className="cursor-pointer"
                    >
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">
                        {buktiPembayaran
                          ? buktiPembayaran.name
                          : "Klik untuk upload file"}
                      </p>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-biru hover:bg-blue-700 text-white font-heading font-bold py-4 px-6 rounded-2xl transition-all border-2 border-black shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Mengirim...
                    </>
                  ) : (
                    "Daftar Sekarang"
                  )}
                </button>
              </form>
            </motion.div>
>>>>>>> update-open-normal-v1
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
