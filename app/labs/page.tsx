import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Terminal, Play, ExternalLink } from "lucide-react";

export const metadata = {
  title: "Labs & R&D — VePlexity Network Engineering",
  description: "Independent hardware capture rigs, C++ runtime memory injection, and analog audio mastering chains.",
};

export default function LabsPage() {
  const labProjects = [
    {
      id: "LAB-01",
      title: "VePlexity Cam & Studio Rig",
      domain: "HARDWARE VIDEO & BROADCAST AUTOMATION",
      status: "OPERATIONAL",
      description: "A customized multi-angle hardware camera capture rig paired with dynamic OBS automation. Switches camera scenes based on audio thresholds, game telemetry hooks, and real-time controller triggers for YouTube broadcasts.",
      specs: [
        { label: "Pipeline", value: "Low-latency 1080p60 HDMI Matrix" },
        { label: "Switching", value: "Automated Python / OBS-WebSocket Daemon" },
        { label: "Telemetry", value: "Real-time stream health & bit-rate monitoring" },
        { label: "Production", value: "VePlexity Comeback Stream Archive" },
      ],
      showVideo: true,
      videoId: "dZvvx4SIkbM",
      videoUrl: "https://www.youtube.com/watch?v=dZvvx4SIkbM",
    },
    {
      id: "LAB-02",
      title: "Game Engine Runtime & C++ Injection",
      domain: "REVERSE ENGINEERING & LOW-LEVEL SYSTEMS",
      status: "ACTIVE RESEARCH",
      description: "Custom runtime memory hooking and dynamic render interception targeting Grand Theft Auto and open-world sandbox engines. Manipulates internal entity coordinates, free-cam matrix offsets, and renders diagnostic HUD overlays directly via DirectX.",
      specs: [
        { label: "Architecture", value: "C++20 / Assembly x64 Hooking" },
        { label: "Memory Pipeline", value: "Dynamic pattern scanning & pointer resolution" },
        { label: "Render Engine", value: "DirectX 11/12 ImGui overlay injection" },
        { label: "Safety", value: "Offline sandboxed memory inspection" },
      ],
      showVideo: false,
    },
    {
      id: "LAB-03",
      title: "Audio Mastering & DSP Signal Chains",
      domain: "DIGITAL SIGNAL PROCESSING & STUDIO ACOUSTICS",
      status: "DEPLOYED IN BOT & MEDIA",
      description: "Custom digital signal processing chains delivering studio-grade broadcast sound. Features multi-band dynamic compression, vintage tube harmonic saturation, and automatic ITU-R BS.1770-4 LUFS loudness normalization for Discord voice nodes and YouTube mastering.",
      specs: [
        { label: "Standard", value: "-14 LUFS integrated / -1.0 dB True Peak" },
        { label: "Algorithm", value: "Adaptive lookahead limiter & phase alignment" },
        { label: "Integration", value: "VePlexity Bot audio filter pipeline" },
        { label: "Sampling", value: "48kHz 24-bit floating point processing" },
      ],
      showVideo: false,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#08040d] text-[#fafafa]">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-12 sm:py-20">
        
        {/* Header */}
        <div className="border-b border-fuchsia-500/20 pb-8 mb-12">
          <div className="flex items-center gap-2 font-mono text-xs text-orange-400 uppercase tracking-widest mb-3">
            <Terminal className="w-4 h-4 text-orange-400" />
            <span>RESEARCH & DEVELOPMENT // DIVISION</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Software & Media Labs<span className="text-fuchsia-500">.</span>
          </h1>
          <p className="text-zinc-300 mt-2 max-w-2xl text-sm leading-relaxed">
            Technical laboratory specifications covering studio video hardware, low-level C++ game runtime engineering, and digital signal processing.
          </p>
        </div>

        {/* Lab Modules */}
        <div className="space-y-12">
          {labProjects.map((lab) => (
            <section
              key={lab.id}
              className="p-6 sm:p-8 rounded-xl bg-[#0e0717] border border-white/10 transition-all hover:border-fuchsia-500/40 hover:bg-[#12091e]"
            >
              {/* Meta row */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4 font-mono text-xs text-zinc-400 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-orange-400 bg-orange-500/10 border border-orange-500/30 px-2.5 py-0.5 rounded">
                    {lab.id}
                  </span>
                  <span className="text-zinc-300">{lab.domain}</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{lab.status}</span>
                </div>
              </div>

              {/* Title & Desc */}
              <h2 className="text-2xl font-bold text-white mb-3">
                {lab.title}
              </h2>
              <p className="text-zinc-300 text-sm leading-relaxed mb-6">
                {lab.description}
              </p>

              {/* Specs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 bg-[#150a22] p-4 rounded-lg border border-fuchsia-500/20">
                {lab.specs.map((spec, idx) => (
                  <div key={idx} className="font-mono text-xs">
                    <span className="text-fuchsia-400/80 block mb-0.5">{spec.label}:</span>
                    <span className="text-white font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>

              {/* Optional Video Embed */}
              {lab.showVideo && lab.videoId && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                    <span className="flex items-center gap-1.5">
                      <Play className="w-3.5 h-3.5 text-red-400" />
                      Live Laboratory Broadcast:
                    </span>
                    <a
                      href={lab.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-300 hover:text-white flex items-center gap-1 transition-colors"
                    >
                      <span>Open on YouTube</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-fuchsia-500/30 bg-black shadow-xl">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube-nocookie.com/embed/${lab.videoId}`}
                      title={lab.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </div>
              )}
            </section>
          ))}
        </div>

      </main>

      <Footer />
    </div>
  );
}
