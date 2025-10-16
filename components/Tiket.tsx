import Link from "next/link";

interface TiketCardProps {
  title: string;
  originalPrice: string;
  discountPrice: string;
  quota: string;
  type: "pre-sale" | "normal";
  route: string;
}

function TiketCard({
  title,
  originalPrice,
  discountPrice,
  quota,
  type,
  route,
}: TiketCardProps) {
  return (
    <div
      className="relative rounded-[2rem] bg-biru overflow-hidden"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='32' ry='32' stroke='black' stroke-width='3' stroke-dasharray='15, 15' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
      }}
    >
      {/* Badge Pre-Sale atau Normal */}
      <div className="absolute top-4 right-4 z-10">
        <span
          className={`font-heading font-bold text-sm px-6 py-2 rounded-full ${
            type === "pre-sale"
              ? "bg-merah text-white"
              : "bg-gray-600 text-white"
          }`}
        >
          {type === "pre-sale" ? "Pre-Sale" : "Normal"}
        </span>
      </div>

      <div className="p-6 space-y-4">
        {/* Title */}
        <h4 className="font-heading font-bold text-2xl md:text-3xl text-white">
          {title}
        </h4>

        {/* Original Price (Strikethrough) */}
        <p className="text-white text-sm md:text-base line-through opacity-80">
          Rp {originalPrice}
        </p>

        {/* Discount Price (Large Yellow) */}
        <p className="font-heading font-bold text-3xl md:text-4xl text-kuning text-stroke-tipis">
          Rp {discountPrice}
        </p>

        {/* Quota */}
        <p className="text-white text-sm md:text-base">{quota}</p>

        {/* Button Daftar */}
        <Link
          href={route}
          className={`block text-center font-heading font-bold text-lg py-3 rounded-2xl transition-all ${
            type === "pre-sale"
              ? "bg-pink text-white hover:bg-[#D93D7B]"
              : "bg-gray-400 text-gray-700 cursor-not-allowed"
          }`}
        >
          Daftar
        </Link>
      </div>
    </div>
  );
}

export default function Tiket() {
  return (
    <section className="relative py-16 md:py-24 bg-hijau">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h2 className="text-center font-heading font-bold text-4xl md:text-5xl lg:text-6xl text-kuning text-stroke-mobile mb-12 md:mb-16 text-stroke-desktop">
          Pilihan Paket
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {/* Pre-Sale Mandiri */}
          <TiketCard
            title="Paket Mandiri"
            originalPrice="55.000,00"
            discountPrice="45.000,00"
            quota="Untuk 1 Orang Peserta"
            type="pre-sale"
            route="/daftar/mandiri"
          />

          {/* Pre-Sale Bertiga */}
          <TiketCard
            title="Paket Bertiga"
            originalPrice="135.000,00"
            discountPrice="120.000,00"
            quota="Untuk 3 Orang Peserta"
            type="pre-sale"
            route="/daftar/bertiga"
          />

          {/* Normal Mandiri */}
          <TiketCard
            title="Paket Mandiri"
            originalPrice="XX.000,00"
            discountPrice="XX.000,00"
            quota="Untuk 1 Orang Peserta"
            type="normal"
            route="/daftar/mandiri"
          />

          {/* Normal Bertiga */}
          <TiketCard
            title="Paket Bertiga"
            originalPrice="XXX.000,00"
            discountPrice="XXX.000,00"
            quota="Untuk 3 Orang Peserta"
            type="normal"
            route="/daftar/bertiga"
          />
        </div>

        {/* Kursi Terbatas Text */}
        <div className="text-center mt-12">
          <p className="font-heading font-black text-4xl md:text-5xl lg:text-6xl text-merah text-stroke-mobile text-stroke-desktop">
            KURSI TERBATAS!
          </p>
        </div>
      </div>
    </section>
  );
}
