"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Upload, Loader2, XCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useTicketConfig } from "@/hooks/useTicketConfig";
import { ticketConfig } from "@/config/ticketConfig"; // ← TAMBAH INI

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwRI21VPRj8bl89PNJZot0YWIO7I4qdDO-3gVZFvqH5hVvahrXYSRX-8Xuk2baEvUZ3gA/exec";

export default function DaftarMandiriPage() {
  const { getActivePackage, formatPrice } = useTicketConfig();
  const packageData = getActivePackage("mandiri");

  const [formData, setFormData] = useState({
    namaLengkap: "",
    asalInstansi: "",
    status: "Mahasiswa",
    jurusan: "",
    nim: "",
    nomorWA: "",
    email: "",
  });

  const [buktiPembayaran, setBuktiPembayaran] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);

  const [isFormOpen, setIsFormOpen] = useState<boolean | null>(null);
  const [isPresale, setIsPresale] = useState<boolean>(true); // ← TAMBAH INI
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

      // Call the Next.js API route instead of directly calling Google Apps Script
      // This avoids CORS issues since the API route runs on the same origin
      const response = await fetch("/api/check-quota", {
        method: "GET",
        cache: "no-cache",
      });

      console.log("Response status:", response.status);

      const data = await response.json();

      console.log("Form status data:", data);

      if (data && typeof data.mandiriOpen !== "undefined") {
        setIsFormOpen(data.mandiriOpen); // ← Ganti ke mandiriOpen
        setIsPresale(data.isPresale || false); // ← TAMBAH INI
        setQuotaInfo({
          totalPeserta: data.totalPeserta || 0,
          maxPeserta: data.maxPeserta || 45,
          sisaKuota: data.sisaKuota || 0,
        });
      } else {
        console.error("Invalid data format:", data);
        setIsFormOpen(true);
      }
    } catch (error) {
      console.error("Error checking form status:", error);
      setIsFormOpen(true);
    }
  };

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
        "Terjadi kesalahan saat mengirim data. Silakan coba lagi. Hubungi 0881037192867 (Tria) Apabila Pendaftaran Gagal!"
      );
      setShowErrorModal(true);
      setIsSubmitting(false);
    }
  };

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

  // ===== FORM TUTUP - PESAN DINAMIS =====
  if (!isFormOpen) {
    // Tentukan pesan berdasarkan mode
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

  // ===== FORM BUKA - RENDER NORMAL (sisanya sama) =====
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full bg-white rounded-3xl p-8 border-2 border-black shadow-2xl text-center"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="font-heading font-bold text-3xl text-gray-800 mb-4">
              Pendaftaran Berhasil! 🎉
            </h2>
            <p className="text-gray-600 mb-6">
              Data kamu sudah kami terima. Kami akan menghubungi kamu melalui
              WhatsApp untuk konfirmasi selanjutnya.
            </p>
            <button
              onClick={() => {
                setShowSuccessModal(false);
                window.location.href = "/";
              }}
              className="w-full bg-biru hover:bg-blue-700 text-white font-heading font-bold py-3 px-6 rounded-2xl transition-all border-2 border-black shadow-lg"
            >
              Kembali ke Home
            </button>
          </motion.div>
        </div>
      )}

      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full bg-white rounded-3xl p-8 border-2 border-black shadow-2xl text-center"
          >
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-10 h-10 text-red-600" />
            </div>
            <h2 className="font-heading font-bold text-3xl text-gray-800 mb-4">
              Terjadi Kesalahan
            </h2>
            <p className="text-gray-600 mb-6">{errorMessage}</p>
            <button
              onClick={() => setShowErrorModal(false)}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-heading font-bold py-3 px-6 rounded-2xl transition-all border-2 border-black"
            >
              Tutup
            </button>
          </motion.div>
        </div>
      )}

      {/* Form content - sama seperti sebelumnya */}
      <div className="max-w-6xl mx-auto">
        <Link
          href="/daftar"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-biru mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Kembali
        </Link>

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
          </div>

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl p-6 border-2 border-black shadow-xl sticky top-8"
            >
              <h3 className="font-heading font-bold text-xl text-gray-800 mb-4">
                Informasi Pembayaran
              </h3>

              <div className="bg-biru/10 rounded-2xl p-4 mb-6">
                <p className="text-sm text-gray-600 mb-2">
                  {packageData.participants} •{" "}
                  {formatPrice(packageData.currentPrice)}
                </p>
                <div className="border-t-2 border-gray-200 pt-3 mt-3">
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-bold text-gray-800">
                      Total Pembayaran
                    </span>
                    <span className="font-heading font-bold text-2xl text-biru">
                      {formatPrice(packageData.currentPrice)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-heading font-bold text-sm text-gray-800 mb-3">
                  {packageData.name}
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  {packageData.participants}
                </p>
                <Image
                  src="/qris.png"
                  alt="QRIS Payment"
                  width={300}
                  height={300}
                  className="w-full rounded-xl border-2 border-gray-200"
                />
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Scan kode QR di atas dengan aplikasi pembayaran kamu
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
