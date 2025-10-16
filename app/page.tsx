import Hero from "@/components/Hero";
import MengulikWS from "@/components/MengulikWS";
import Sambutan from "@/components/Sambutan";
import Tiket from "@/components/Tiket";
import FAQ from "@/components/FAQ";
import SpecialThanks from "@/components/SpecialThanks";

export default function Home() {
  return (
    <main>
      <Hero />
      <MengulikWS />
      <Sambutan />
      <Tiket />
      <FAQ />
      <SpecialThanks />
    </main>
  );
}
