"use client";

import { ticketConfig } from "@/config/ticketConfig";
import { useMemo } from "react";

export interface Package {
  id: string;
  name: string;
  participants: string;
  badge?: string;
  preSale: {
    enabled: boolean;
    price: number;
    originalPrice: number;
    quota: string;
    availableSlots: number;
    soldSlots: number;
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

export function useTicketConfig() {
  const config = ticketConfig;

  // Get current sale type - memoized untuk konsistensi
  const getCurrentSaleType = useMemo(() => {
    return () => {
      if (config.salesStatus.isPreSaleOpen) return "preSale";
      if (config.salesStatus.isNormalSaleOpen) return "normalSale";
      return "closed";
    };
  }, []);

  // Check if sales are open - memoized
  const isSalesOpen = useMemo(() => {
    return () => {
      return (
        config.salesStatus.isPreSaleOpen || config.salesStatus.isNormalSaleOpen
      );
    };
  }, []);

  // Get active package data - memoized untuk menghindari re-render berbeda
  const getActivePackage = useMemo(() => {
    return (packageId: keyof typeof config.packages) => {
      const pkg = config.packages[packageId];
      const saleType = getCurrentSaleType();

      if (saleType === "closed") return null;

      return {
        ...pkg,
        currentPrice:
          saleType === "preSale" ? pkg.preSale.price : pkg.normalSale.price,
        originalPrice:
          saleType === "preSale"
            ? pkg.preSale.originalPrice
            : pkg.normalSale.price,
        quota:
          saleType === "preSale" ? pkg.preSale.quota : pkg.normalSale.quota,
        isPreSale: saleType === "preSale",
        badge: (pkg as any).badge,
      };
    };
  }, []);

  // Format price to IDR - stable function
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return {
    config,
    getCurrentSaleType,
    isSalesOpen,
    getActivePackage,
    formatPrice,
  };
}
