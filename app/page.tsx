import Hero from "@/components/Hero";
import MengulikWS from "@/components/MengulikWS";
import ScrollingText from "@/components/ScrollingText";
import Sambutan from "@/components/Sambutan";
import Tiket from "@/components/Tiket";
import FAQ from "@/components/FAQ";
import SpecialThanks from "@/components/SpecialThanks";
import ScrollingText1 from "@/components/ScrollingText-KURSITERBATAS";
import GamePromo from "@/components/GamePromo";

export default function Home() {
  return (
    <main>
      <Hero />
      <MengulikWS />
      <Sambutan />
      <ScrollingText />
      <Tiket />
      <ScrollingText1 />
      <GamePromo />
      <FAQ />
      <SpecialThanks />
    </main>
  );
}
