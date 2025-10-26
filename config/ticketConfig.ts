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
    isPreSaleOpen: false,
    isNormalSaleOpen: true,
    closedMessage:
      "Penjualan tiket Pre-Sale sudah HABIS. Coming Soon NORMAL SALE!",
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
        originalPrice: 55000,
        quota: "Kuota Terbatas",
      },
      normalSale: {
        enabled: true,
        price: 55000,
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
        originalPrice: 155000,
        quota: "Kuota Terbatas",
      },
      normalSale: {
        enabled: true,
        price: 155000,
        quota: "Kuota Tersedia",
      },
      features: [
        "Free Konsumsi (Makan Siang)",
        "Akses materi lengkap",
        "Sertifikat hardskill peserta",
        "Grup WhatsApp",
        "Pre-Workshop",
        "Hemat Rp 10.000!",
      ],
      color: "bg-pink",
      hoverColor: "hover:bg-pink-500",
    },
  },
} as const;

export type TicketConfig = typeof ticketConfig;
