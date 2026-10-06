import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BotPlayground from "./components/BotPlayground";
import CommandArsenal from "./components/CommandArsenal";
import SupportHub from "./components/SupportHub";
import YouTubeFeed from "./components/YouTubeFeed";
import Ecosystem from "./components/Ecosystem";
import Labs from "./components/Labs";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050208] text-white selection:bg-fuchsia-500/30 overflow-x-hidden flex flex-col font-sans">
      <Navbar />
      <Hero />
      <BotPlayground />
      <CommandArsenal />
      <SupportHub />
      <YouTubeFeed />
      <Ecosystem />
      <Labs />
      <Footer />
    </main>
  );
}