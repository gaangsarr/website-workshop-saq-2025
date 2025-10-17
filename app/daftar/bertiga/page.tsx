"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Upload, ArrowLeft, Loader2, CheckCircle } from "lucide-react";

interface ParticipantData {
  namaLengkap: string;
  asalInstansi: string;
  jurusan: string;
  nim: string;
  nomorWA: string;
  email: string;
  status: string;
}

export default function DaftarBertiga() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    pemesanWA: "",
    pemesanEmail: "",
    buktiPembayaran: null as File | null,
    peserta1: {
      namaLengkap: "",
      asalInstansi: "",
      jurusan: "",
      nim: "",
      nomorWA: "",
      email: "",
      status: "Mahasiswa",
    } as ParticipantData,
    peserta2: {
      namaLengkap: "",
      asalInstansi: "",
      jurusan: "",
      nim: "",
      nomorWA: "",
      email: "",
      status: "Mahasiswa",
    } as ParticipantData,
    peserta3: {
      namaLengkap: "",
      asalInstansi: "",
      jurusan: "",
      nim: "",
      nomorWA: "",
      email: "",
      status: "Mahasiswa",
    } as ParticipantData,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleParticipantChange = (
    participantNum: number,
    field: keyof ParticipantData,
    value: string
  ) => {
    if (participantNum === 1) {
      setFormData((prev) => ({
        ...prev,
        peserta1: { ...prev.peserta1, [field]: value },
      }));
    } else if (participantNum === 2) {
      setFormData((prev) => ({
        ...prev,
        peserta2: { ...prev.peserta2, [field]: value },
      }));
    } else if (participantNum === 3) {
      setFormData((prev) => ({
        ...prev,
        peserta3: { ...prev.peserta3, [field]: value },
      }));
    }
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
        jumlahPeserta: "3",
        pemesanWA: formData.pemesanWA,
        pemesanEmail: formData.pemesanEmail,
        peserta1_namaLengkap: formData.peserta1.namaLengkap,
        peserta1_asalInstansi: formData.peserta1.asalInstansi,
        peserta1_status: formData.peserta1.status,
        peserta1_jurusan: formData.peserta1.jurusan || "-",
        peserta1_nim: formData.peserta1.nim || "-",
        peserta1_nomorWA: formData.peserta1.nomorWA,
        peserta1_email: formData.peserta1.email,
        peserta2_namaLengkap: formData.peserta2.namaLengkap,
        peserta2_asalInstansi: formData.peserta2.asalInstansi,
        peserta2_status: formData.peserta2.status,
        peserta2_jurusan: formData.peserta2.jurusan || "-",
        peserta2_nim: formData.peserta2.nim || "-",
        peserta2_nomorWA: formData.peserta2.nomorWA,
        peserta2_email: formData.peserta2.email,
        peserta3_namaLengkap: formData.peserta3.namaLengkap,
        peserta3_asalInstansi: formData.peserta3.asalInstansi,
        peserta3_status: formData.peserta3.status,
        peserta3_jurusan: formData.peserta3.jurusan || "-",
        peserta3_nim: formData.peserta3.nim || "-",
        peserta3_nomorWA: formData.peserta3.nomorWA,
        peserta3_email: formData.peserta3.email,
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

      await new Promise((resolve) => setTimeout(resolve, 1000));
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

  const renderParticipantForm = (num: number) => {
    const participant = formData[
      `peserta${num}` as keyof typeof formData
    ] as ParticipantData;

    return (
      <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-black">
        <h2 className="font-heading font-bold text-xl mb-6">
          Data Peserta {num}
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Nama Lengkap <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={participant.namaLengkap}
              onChange={(e) =>
                handleParticipantChange(num, "namaLengkap", e.target.value)
              }
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-biru focus:outline-none"
              placeholder="Masukkan nama lengkap"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Asal Instansi <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={participant.asalInstansi}
              onChange={(e) =>
                handleParticipantChange(num, "asalInstansi", e.target.value)
              }
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-biru focus:outline-none"
              placeholder="Contoh: Institut Teknologi PLN"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={participant.status}
              onChange={(e) =>
                handleParticipantChange(num, "status", e.target.value)
              }
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-biru focus:outline-none"
            >
              <option value="Mahasiswa">Mahasiswa</option>
              <option value="Pelajar">Pelajar</option>
              <option value="Umum">Umum</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Jurusan
            </label>
            <input
              type="text"
              value={participant.jurusan}
              onChange={(e) =>
                handleParticipantChange(num, "jurusan", e.target.value)
              }
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-biru focus:outline-none"
              placeholder='Isi "-" jika Pelajar/Umum'
            />
            <p className="text-xs text-gray-500 mt-1">
              Isi &quot;-&quot; apabila Pelajar/Umum
            </p>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              NIM
            </label>
            <input
              type="text"
              value={participant.nim}
              onChange={(e) =>
                handleParticipantChange(num, "nim", e.target.value)
              }
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-biru focus:outline-none"
              placeholder='Isi "-" jika Pelajar/Umum'
            />
            <p className="text-xs text-gray-500 mt-1">
              Isi &quot;-&quot; apabila Pelajar/Umum
            </p>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Nomor WhatsApp <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              required
              value={participant.nomorWA}
              onChange={(e) =>
                handleParticipantChange(num, "nomorWA", e.target.value)
              }
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-biru focus:outline-none"
              placeholder="08xxxxxxxxxx"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Email Aktif <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              required
              value={participant.email}
              onChange={(e) =>
                handleParticipantChange(num, "email", e.target.value)
              }
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-biru focus:outline-none"
              placeholder="email@example.com"
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-biru mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Kembali
          </Link>
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-biru mb-2">
            Pendaftaran Paket Bertiga
          </h1>
          <p className="text-gray-600">Untuk 3 orang peserta • Rp 120.000</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <div className="bg-pink rounded-2xl p-6 text-white border-2 border-black">
                <p className="text-sm opacity-90 mb-2">Total Pembayaran</p>
                <p className="font-heading font-bold text-3xl">Rp 120.000</p>
                <div className="mt-4 pt-4 border-t border-white/20">
                  <p className="text-xs opacity-75">Paket Bertiga</p>
                  <p className="text-sm">3 Orang Peserta</p>
                </div>
              </div>

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

          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Data Pemesan */}
              <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-black">
                <h2 className="font-heading font-bold text-xl mb-6">
                  Data Pemesan
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Nomor WhatsApp <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="pemesanWA"
                      required
                      value={formData.pemesanWA}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-biru focus:outline-none"
                      placeholder="08xxxxxxxxxx"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="pemesanEmail"
                      required
                      value={formData.pemesanEmail}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-biru focus:outline-none"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>
              </div>

              {/* Peserta 1, 2, 3 */}
              {renderParticipantForm(1)}
              {renderParticipantForm(2)}
              {renderParticipantForm(3)}

              {/* Bukti Pembayaran */}
              <div className="bg-white rounded-2xl p-6 md:p-8 border-2 border-black">
                <h2 className="font-heading font-bold text-xl mb-6">
                  Bukti Pembayaran
                </h2>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-biru transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    required
                    onChange={handleFileChange}
                    className="hidden"
                    id="bukti-pembayaran"
                  />
                  <label htmlFor="bukti-pembayaran" className="cursor-pointer">
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

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-pink hover:bg-pink/90 text-white font-heading font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-3 border-2 border-black disabled:opacity-50"
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
