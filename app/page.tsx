import Hero from "./components/Hero";
import YouTubeFeed from "./components/YouTubeFeed";
import Ecosystem from "./components/Ecosystem";
import Labs from "./components/Labs"; // NEW EXTENSION
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#070308] text-white selection:bg-fuchsia-500/30 overflow-hidden flex flex-col font-sans">
      <Hero />
      <YouTubeFeed />
      <Labs /> 
      <Ecosystem />
      <Footer />
    </main>
  );
}