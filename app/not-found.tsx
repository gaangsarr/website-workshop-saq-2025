"use client";
import Link from "next/link";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="font-heading font-bold text-9xl md:text-[12rem] text-biru text-stroke-mobile md:text-stroke leading-none">
            404
          </h1>
        </div>

        {/* Icon */}
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full border-2 border-black shadow-xl">
            <Search className="w-12 h-12 text-biru" />
          </div>
        </div>

        {/* Title & Description */}
        <div className="mb-8">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-gray-800 mb-4">
            Halaman Tidak Ditemukan
          </h2>
          <p className="text-gray-600 text-lg mb-2">
            Oops! Halaman yang kamu cari tidak ada atau telah dipindahkan.
          </p>
          <p className="text-gray-500 text-sm">
            Mungkin link-nya salah atau halaman sudah tidak tersedia.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <button className="inline-flex items-center gap-2 bg-biru hover:bg-blue-700 text-white font-heading font-bold py-4 px-8 rounded-2xl transition-all border-2 border-black shadow-lg hover:shadow-xl">
              <Home className="w-5 h-5" />
              Kembali ke Home
            </button>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-gray-800 font-heading font-bold py-4 px-8 rounded-2xl transition-all border-2 border-black shadow-lg hover:shadow-xl"
          >
            <ArrowLeft className="w-5 h-5" />
            Halaman Sebelumnya
          </button>
        </div>

        {/* Quick Links */}
        <div className="mt-12 pt-8 border-t-2 border-gray-200">
          <p className="text-gray-600 text-sm mb-4 font-heading font-bold">
            Atau coba kunjungi:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/#about"
              className="text-biru hover:text-blue-700 font-heading text-sm underline"
            >
              Tentang Workshop
            </Link>
            <span className="text-gray-400">•</span>
            <Link
              href="/#register"
              className="text-biru hover:text-blue-700 font-heading text-sm underline"
            >
              Daftar Sekarang
            </Link>
            <span className="text-gray-400">•</span>
            <Link
              href="/daftar"
              className="text-biru hover:text-blue-700 font-heading text-sm underline"
            >
              Pilihan Paket
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
