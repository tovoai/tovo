"use client";

import React, { useState } from "react";
import DesignA from "./components/DesignA";
import DesignB from "./components/DesignB";
import { Sparkles, Layers, CheckCircle2 } from "lucide-react";

export default function Page() {
  const [activeVersion, setActiveVersion] = useState<"A" | "B">("B");

  return (
    <div className="relative min-h-screen bg-slate-950">
      {/* Top Floating A/B Design Switcher Bar */}
      <div className="fixed top-0 left-0 right-0 z-[100] bg-slate-900/90 border-b border-indigo-500/30 backdrop-blur-md px-4 py-2 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2 text-indigo-300">
          <Layers className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="font-bold tracking-wider hidden sm:inline">TOVOAI A/B DESIGN STUDIO:</span>
          <span className="text-slate-400">시안을 선택해 비교해보세요</span>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => setActiveVersion("A")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeVersion === "A"
                ? "bg-indigo-600 text-white font-bold shadow-[0_0_12px_rgba(99,102,241,0.6)]"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            {activeVersion === "A" && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-300" />}
            <span>시안 A (Compact Studio)</span>
          </button>

          <button
            onClick={() => setActiveVersion("B")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeVersion === "B"
                ? "bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-bold shadow-[0_0_12px_rgba(34,211,238,0.6)]"
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
          >
            {activeVersion === "B" && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />}
            <span>시안 B (Enterprise High-Density)</span>
          </button>
        </div>
      </div>

      {/* Render Selected Design */}
      {activeVersion === "A" ? <DesignA /> : <DesignB />}
    </div>
  );
}
