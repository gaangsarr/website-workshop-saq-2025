interface PackageConfig {
  id: string;
  name: string;
  participants: string;
  badge?: string; // ← Optional
  preSale: {
    enabled: boolean;
    price: number;
    originalPrice: number;
    quota: string;
  };
  normalSale: {
    enabled: boolean;
    price: number;
    quota: string;
  };
  features: string[];
  color: string;
  hoverColor: string;
}

export const ticketConfig = {
  salesStatus: {
    isPreSaleOpen: true,
    isNormalSaleOpen: false,
    closedMessage:
      "Penjualan tiket sementara ditutup. Normal sale akan dibuka segera!",
    preSaleEndDate: "2025-10-10T23:59:59",
  },
  packages: {
    mandiri: {
      id: "mandiri",
      name: "Paket Mandiri",
      participants: "1 Orang",
      preSale: {
        enabled: true,
        price: 45000,
        originalPrice: 50000,
        quota: "Kuota Terbatas",
      },
      normalSale: {
        enabled: true,
        price: 50000,
        quota: "Kuota Tersedia",
      },
      features: [
        "Free Konsumsi (Makan Siang)",
        "Akses materi lengkap",
        "Sertifikat hardskill peserta",
        "Grup WhatsApp",
        "Pre-Workshop",
      ],
      color: "bg-biru",
      hoverColor: "hover:bg-blue-500",
    },
    bertiga: {
      id: "bertiga",
      name: "Paket Bertiga",
      participants: "3 Orang",
      badge: "Populer",
      preSale: {
        enabled: true,
        price: 130000,
        originalPrice: 150000,
        quota: "Kuota Terbatas",
      },
      normalSale: {
        enabled: true,
        price: 150000,
        quota: "Kuota Tersedia",
      },
      features: [
        "Free Konsumsi (Makan Siang)",
        "Akses materi lengkap",
        "Sertifikat hardskill peserta",
        "Grup WhatsApp",
        "Pre-Workshop",
        "Hemat Rp 20.000!",
      ],
      color: "bg-pink",
      hoverColor: "hover:bg-pink-500",
    },
    berlima: {
      id: "berlima",
      name: "Paket Berlima",
      participants: "5 Orang",
      badge: "Best Value",
      preSale: {
        enabled: true,
        price: 210000,
        originalPrice: 250000,
        quota: "Kuota Terbatas",
      },
      normalSale: {
        enabled: true,
        price: 250000,
        quota: "Kuota Tersedia",
      },
      features: [
        "Free Konsumsi (Makan Siang)",
        "Akses materi lengkap",
        "Sertifikat hardskill peserta",
        "Grup WhatsApp",
        "Pre-Workshop",
        "Hemat Rp 40.000!",
      ],
      color: "bg-kuning",
      hoverColor: "hover:bg-yellow-500",
    },
  },
} as const;

export type TicketConfig = typeof ticketConfig;
