import Hero from "@/components/Hero";
import MengulikWS from "@/components/MengulikWS";
import ScrollingText from "@/components/ScrollingText";
import Sambutan from "@/components/Sambutan";
import Tiket from "@/components/Tiket";
import FAQ from "@/components/FAQ";
import SpecialThanks from "@/components/SpecialThanks";
import ScrollingText1 from "@/components/ScrollingText-KURSITERBATAS";
import GamePromo from "@/components/GamePromo";
import ChatBot from "@/components/ChatBot";
import RegistrationStats from "@/components/RegistrationStats";
import LocationMap from "@/components/LocationMap";

export default function Home() {
  return (
    <main>
      <ChatBot />
      <Hero />
      <MengulikWS />
      <Sambutan />
      <ScrollingText />
      <Tiket />
      <RegistrationStats />
      <ScrollingText1 />
      <LocationMap />
      <GamePromo />
      <FAQ />
      <SpecialThanks />
    </main>
  );
}
