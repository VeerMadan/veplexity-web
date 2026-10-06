import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import NewsWire from "./components/NewsWire";
import FeaturedBot from "./components/FeaturedBot";
import YouTubeFeed from "./components/YouTubeFeed";
import Labs from "./components/Labs";
import SupportHub from "./components/SupportHub";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#070308] text-white selection:bg-fuchsia-500/30 overflow-hidden flex flex-col font-sans">
      <Navbar />
      <Hero />
      <NewsWire />
      <FeaturedBot />
      <YouTubeFeed />
      <Labs />
      <SupportHub />
      <Footer />
    </main>
  );
}