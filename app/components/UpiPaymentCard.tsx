"use client";

import React, { useState } from "react";
import { Check, Copy, QrCode, Sparkles, Smartphone, ShieldCheck, Heart } from "lucide-react";
import { dashboardAudio } from "@/lib/dashboardAudio";

interface UpiPaymentCardProps {
  variant?: "compact" | "full" | "inline";
  className?: string;
}

export default function UpiPaymentCard({ variant = "full", className = "" }: UpiPaymentCardProps) {
  const [copied, setCopied] = useState(false);
  const upiId = "madan.45@superyes";

  const handleCopy = () => {
    try {
      dashboardAudio.playClick();
      navigator.clipboard.writeText(upiId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const qrUrl = "https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=upi%3A%2F%2Fpay%3Fpa%3Dmadan.45%40superyes%26pn%3DVeer%2520Madan%26cu%3DINR";

  if (variant === "compact" || variant === "inline") {
    return (
      <div className={`p-4 rounded-2xl bg-[#0e0717] border border-orange-500/25 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg ${className}`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 shrink-0">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-white uppercase tracking-wider">UPI Direct Payment</span>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">ZERO FEES</span>
            </div>
            <p className="text-xs font-mono text-orange-300 font-bold">{upiId}</p>
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="w-full sm:w-auto px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-black text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-md"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-black" />
              <span>Copied UPI ID!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-black" />
              <span>Copy UPI ID</span>
            </>
          )}
        </button>
      </div>
    );
  }

  return (
    <div className={`p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0f071a] via-[#090510] to-black border-2 border-orange-500/30 shadow-[0_0_40px_rgba(249,115,22,0.12)] relative overflow-hidden ${className}`}>
      {/* Background ambient sunset aura */}
      <div className="absolute -top-24 -right-24 w-60 h-60 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left Information */}
        <div className="md:col-span-7 space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/15 border border-orange-500/35 text-orange-400 font-mono text-xs font-black tracking-wider uppercase">
              <span>🇮🇳 DIRECT UPI PAYMENT</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] font-bold">
              <ShieldCheck className="w-3 h-3" />
              <span>INSTANT • ZERO FEES</span>
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
            Support Hosting via UPI
          </h3>

          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
            Support directly from any Indian UPI app without card declines or currency conversion fees. 100% of contributions keep our 24/7 cloud servers and lossless music online!
          </p>

          {/* Copyable UPI Box */}
          <div className="p-3.5 rounded-2xl bg-black/60 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="space-y-0.5 text-center sm:text-left w-full sm:w-auto">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block font-bold">UPI ID (VPA)</span>
              <span className="text-sm sm:text-base font-mono font-black text-orange-400 tracking-wide select-all">
                {upiId}
              </span>
            </div>

            <button
              onClick={handleCopy}
              className={`w-full sm:w-auto px-5 py-2.5 rounded-xl font-black text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                copied
                  ? "bg-emerald-400 text-black font-bold"
                  : "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-black"
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-black" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-black" />
                  <span>Copy UPI ID</span>
                </>
              )}
            </button>
          </div>

          {/* Supported Apps Pills */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block font-bold">Supported Apps:</span>
            <div className="flex flex-wrap items-center gap-1.5">
              {["Google Pay", "PhonePe", "Paytm", "BHIM", "CRED", "Navi", "Superyes", "Any Bank UPI"].map((app) => (
                <span
                  key={app}
                  className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-medium text-zinc-300"
                >
                  {app}
                </span>
              ))}
            </div>
          </div>

          <p className="text-[11px] text-zinc-400 font-mono">
            💡 <strong className="text-zinc-200">Claim VIP Perks:</strong> Send any tip and share the screenshot in <a href="https://discord.gg/R6ZrqpWEcc" target="_blank" rel="noopener noreferrer" className="text-orange-400 underline font-bold">Discord HQ</a> for instant VIP role unlock!
          </p>
        </div>

        {/* Right QR Code Scanner */}
        <div className="md:col-span-5 flex flex-col items-center justify-center p-6 bg-black/80 rounded-2xl border border-orange-500/20 text-center space-y-3">
          <div className="w-48 h-48 bg-white p-3 rounded-2xl shadow-xl border-4 border-orange-500/40 flex items-center justify-center">
            <img
              src={qrUrl}
              alt="UPI QR Code - madan.45@superyes"
              className="w-full h-full object-contain"
              loading="lazy"
            />
          </div>

          <div className="space-y-1">
            <div className="text-xs text-orange-400 flex items-center gap-1.5 justify-center font-bold uppercase tracking-wider font-mono">
              <QrCode className="w-4 h-4 text-orange-400" />
              <span>SCAN WITH ANY UPI APP</span>
            </div>
            <p className="text-[10px] text-zinc-500 font-mono">GPay • PhonePe • Paytm • BHIM</p>
          </div>
        </div>
      </div>
    </div>
  );
}
