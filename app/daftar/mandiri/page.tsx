"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Upload, ArrowLeft, Loader2, CheckCircle } from "lucide-react";

export default function DaftarMandiri() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    namaLengkap: "",
    asalInstansi: "",
    jurusan: "",
    nim: "",
    nomorWA: "",
    email: "",
    status: "Mahasiswa",
    buktiPembayaran: null as File | null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, buktiPembayaran: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Convert file to base64
      let fileBase64 = "";
      let fileName = "";
      let fileType = "";

      if (formData.buktiPembayaran) {
        const reader = new FileReader();
        fileBase64 = await new Promise<string>((resolve, reject) => {
          reader.onload = () => {
            const result = reader.result as string;
            resolve(result.split(",")[1]);
          };
          reader.onerror = reject;
          reader.readAsDataURL(formData.buktiPembayaran!);
        });
        fileName = formData.buktiPembayaran.name;
        fileType = formData.buktiPembayaran.type;
      }

      const payload = {
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
      };

      const SCRIPT_URL =
        "https://script.google.com/macros/s/AKfycbzwep3HUYLlTi63zMfUSz3l008VSY210dPtxX_OHpoij7pl2_KvoGNSUeTv_edWWf5dtg/exec";

      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      // NO response.json() because no-cors can't read response
      // Just assume success and show success message
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1s for processing
      setIsSuccess(true);
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center space-y-6"
        >
          <div className="inline-block p-4 bg-green-100 rounded-full">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>
          <h2 className="font-heading font-bold text-3xl text-gray-800">
            Pendaftaran Berhasil!
          </h2>
          <p className="text-gray-600">
            Data kamu sudah kami terima. Kami akan menghubungi kamu melalui
            WhatsApp untuk konfirmasi selanjutnya.
          </p>
          <Link href="/">
            <button className="bg-biru hover:bg-blue-700 text-white font-heading font-bold py-3 px-8 rounded-xl transition-all">
              Kembali ke Home
            </button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-biru mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Kembali
          </Link>
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-biru mb-2">
            Pendaftaran Paket Mandiri
          </h1>
          <p className="text-gray-600">Untuk 1 orang peserta • Rp 45.000</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Info Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Price Card */}
              <div className="bg-biru rounded-2xl p-6 text-white border-2 border-black">
                <p className="text-sm opacity-90 mb-2">Total Pembayaran</p>
                <p className="font-heading font-bold text-3xl">Rp 45.000</p>
                <div className="mt-4 pt-4 border-t border-white/20">
                  <p className="text-xs opacity-75">Paket Mandiri</p>
                  <p className="text-sm">1 Orang Peserta</p>
                </div>
              </div>

              {/* QRIS Card */}
              <div className="bg-white rounded-2xl p-6 border-2 border-black">
                <h3 className="font-heading font-bold text-lg mb-4">
                  Scan QRIS untuk Bayar
                </h3>
                <div className="bg-gray-100 rounded-xl p-4 mb-4">
                  <Image
                    src="/qris.png"
                    width={300}
                    height={300}
                    alt="QRIS Payment"
                    className="w-full h-auto"
                  />
                </div>
                <p className="text-sm text-gray-600 text-center">
                  Scan kode QR di atas dengan aplikasi pembayaran kamu
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-black">
                <h2 className="font-heading font-bold text-xl mb-6">
                  Data Peserta
                </h2>

                <div className="space-y-4">
                  {/* Nama Lengkap */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Nama Lengkap <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="namaLengkap"
                      required
                      value={formData.namaLengkap}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-biru focus:outline-none"
                      placeholder="Masukkan nama lengkap"
                    />
                  </div>

                  {/* Asal Instansi */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Asal Instansi <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="asalInstansi"
                      required
                      value={formData.asalInstansi}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-biru focus:outline-none"
                      placeholder="Contoh: Institut Teknologi PLN"
                    />
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Status <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="status"
                      required
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-biru focus:outline-none"
                    >
                      <option value="Mahasiswa">Mahasiswa</option>
                      <option value="Pelajar">Pelajar</option>
                      <option value="Umum">Umum</option>
                    </select>
                  </div>

                  {/* Jurusan */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Jurusan
                    </label>
                    <input
                      type="text"
                      name="jurusan"
                      value={formData.jurusan}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-biru focus:outline-none"
                      placeholder='Isi "-" jika Pelajar/Umum'
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Isi &quot;-&quot; apabila Pelajar/Umum
                    </p>
                  </div>

                  {/* NIM */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      NIM
                    </label>
                    <input
                      type="text"
                      name="nim"
                      value={formData.nim}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-biru focus:outline-none"
                      placeholder='Isi "-" jika Pelajar/Umum'
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Isi &quot;-&quot; apabila Pelajar/Umum
                    </p>
                  </div>

                  {/* Nomor WhatsApp */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Nomor WhatsApp <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="nomorWA"
                      required
                      value={formData.nomorWA}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-biru focus:outline-none"
                      placeholder="08xxxxxxxxxx"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Email Aktif <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-biru focus:outline-none"
                      placeholder="email@example.com"
                    />
                  </div>

                  {/* Bukti Pembayaran */}
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Bukti Pembayaran <span className="text-red-500">*</span>
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-biru transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        required
                        onChange={handleFileChange}
                        className="hidden"
                        id="bukti-pembayaran"
                      />
                      <label
                        htmlFor="bukti-pembayaran"
                        className="cursor-pointer"
                      >
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">
                          {formData.buktiPembayaran
                            ? formData.buktiPembayaran.name
                            : "Klik untuk upload bukti transfer"}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          Format: JPG, PNG (Max 5MB)
                        </p>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-pink hover:bg-pink/90 text-white font-heading font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-3 border-2 border-black disabled:opacity-50 disabled:cursor-not-allowed"
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
          </div>
        </div>
      </div>
    </div>
  );
}
