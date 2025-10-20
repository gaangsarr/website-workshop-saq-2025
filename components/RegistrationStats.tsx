"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, TrendingUp, Clock, Loader2, AlertCircle } from "lucide-react";

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbw71puyUC_d9FU_GWi7Ksb1Hlw4h34mOJ907lpcRaZ7UUwMs5_uIrDmM-06FHmsbTwKSA/exec";

interface StatsData {
  totalPeserta: number;
  maxPeserta: number;
  sisaKuota: number;
  countMandiri: number;
  countBertiga: number;
  isPresale: boolean;
  mandiriOpen: boolean;
  bertigaOpen: boolean;
}

export default function RegistrationStats() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const fetchStats = async () => {
    try {
      const response = await fetch(`${SCRIPT_URL}?action=checkStatus`, {
        method: "GET",
        cache: "no-cache",
      });

      const data = await response.json();

      if (data) {
        setStats({
          totalPeserta: data.totalPeserta || 0,
          maxPeserta: data.maxPeserta || 45,
          sisaKuota: data.sisaKuota || 0,
          countMandiri: data.countMandiri || 0,
          countBertiga: data.countBertiga || 0,
          isPresale: data.isPresale || false,
          mandiriOpen: data.mandiriOpen || false,
          bertigaOpen: data.bertigaOpen || false,
        });
        setLastUpdate(new Date());
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();

    // Auto refresh every 30 seconds
    const interval = setInterval(() => {
      fetchStats();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[2.5rem] p-8 border-2 border-black shadow-xl md:m-13 m-4"
      >
        <div className="flex items-center justify-center py-12 md:m-13 m-4">
          <Loader2 className="w-8 h-8 animate-spin text-biru" />
        </div>
      </motion.div>
    );
  }

  if (!stats) return null;

  const percentage = (stats.totalPeserta / stats.maxPeserta) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[2.5rem] p-6 md:p-8 border-2 border-black shadow-xl md:m-13 m-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-biru mb-2">
            Status Pendaftaran
          </h2>
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border-2 border-black">
            <div
              className={`w-2 h-2 rounded-full ${
                stats.isPresale ? "bg-merah animate-pulse" : "bg-green-500"
              }`}
            />
            <p className="text-sm font-heading font-bold text-gray-700">
              {stats.isPresale ? "Pre-Sale Aktif" : "Pendaftaran Normal"}
            </p>
          </div>
        </div>
        <div className="bg-biru rounded-2xl p-4 border-2 border-black shadow-lg">
          <Users className="w-7 h-7 text-white" />
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-2xl p-6 mb-6 border-2 border-black shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <span className="font-heading font-bold text-gray-700">
            Total Pendaftar
          </span>
          <span className="font-heading font-bold text-2xl text-biru">
            {stats.totalPeserta}/{stats.maxPeserta}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden border-2 border-black shadow-md">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`h-full ${
              percentage >= 90
                ? "bg-gradient-to-r from-red-500 to-red-600"
                : percentage >= 70
                ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                : "bg-gradient-to-r from-green-500 to-green-600"
            }`}
          />
        </div>
        <p className="text-sm text-gray-600 mt-2 text-right font-heading font-bold">
          {percentage.toFixed(1)}% Terisi
        </p>
      </div>

      {/* Stats Cards - 2 Paket */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Paket Mandiri */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-2xl p-6 border-2 border-black shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="bg-biru/10 rounded-xl p-2">
              <Users className="w-5 h-5 text-biru" />
            </div>
            <span
              className={`font-heading font-bold text-xs px-3 py-1 rounded-full border-2 border-black ${
                stats.mandiriOpen
                  ? "bg-green-400 text-white"
                  : "bg-red-400 text-white"
              }`}
            >
              {stats.mandiriOpen ? "✓ Buka" : "✗ Tutup"}
            </span>
          </div>
          <h3 className="font-heading font-bold text-sm text-gray-600 mb-2">
            Paket Mandiri
          </h3>
          <p className="font-heading font-bold text-4xl text-biru mb-1">
            {stats.countMandiri}
          </p>
          <p className="text-sm text-gray-600">Peserta Terdaftar</p>
        </motion.div>

        {/* Paket Bertiga */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-2xl p-6 border-2 border-black shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="bg-pink/10 rounded-xl p-2">
              <Users className="w-5 h-5 text-pink" />
            </div>
            <span
              className={`font-heading font-bold text-xs px-3 py-1 rounded-full border-2 border-black ${
                stats.bertigaOpen
                  ? "bg-green-400 text-white"
                  : "bg-red-400 text-white"
              }`}
            >
              {stats.bertigaOpen ? "✓ Buka" : "✗ Tutup"}
            </span>
          </div>
          <h3 className="font-heading font-bold text-sm text-gray-600 mb-2">
            Paket Bertiga
          </h3>
          <p className="font-heading font-bold text-4xl text-pink mb-1">
            {stats.countBertiga * 3}
          </p>
          <p className="text-sm text-gray-600">
            Peserta ({stats.countBertiga} Grup)
          </p>
        </motion.div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-5 border-2 border-black shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-green-100 rounded-lg p-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <h4 className="font-heading font-bold text-xs text-gray-600">
              Sisa Kuota
            </h4>
          </div>
          <p className="font-heading font-bold text-3xl text-green-600 mb-1">
            {stats.sisaKuota}
          </p>
          <p className="text-xs text-gray-600">slot tersedia</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border-2 border-black shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-blue-100 rounded-lg p-2">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <h4 className="font-heading font-bold text-xs text-gray-600">
              Update Terakhir
            </h4>
          </div>
          <p className="font-heading font-bold text-xl text-blue-600 mb-1">
            {lastUpdate.toLocaleTimeString("id-ID", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <p className="text-xs text-gray-600">Auto-refresh 30s</p>
        </div>
      </div>

      {/* Alerts */}
      {stats.sisaKuota <= 10 && stats.sisaKuota > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-yellow-100 border-2 border-yellow-400 rounded-2xl p-5 flex items-start gap-3"
        >
          <AlertCircle className="w-5 h-5 text-yellow-700 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-heading font-bold text-yellow-800 text-sm">
              ⚠️ Kuota hampir penuh!
            </p>
            <p className="text-xs text-yellow-700 mt-1">
              Hanya tersisa {stats.sisaKuota} slot lagi. Daftar sekarang sebelum
              kehabisan!
            </p>
          </div>
        </motion.div>
      )}

      {stats.sisaKuota === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-100 border-2 border-red-400 rounded-2xl p-5 flex items-start gap-3"
        >
          <AlertCircle className="w-5 h-5 text-red-700 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-heading font-bold text-red-800 text-sm">
              🔴 Kuota Penuh!
            </p>
            <p className="text-xs text-red-700 mt-1">
              Kuota {stats.isPresale ? "pre-sale" : "pendaftaran"} sudah terisi
              penuh.
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
