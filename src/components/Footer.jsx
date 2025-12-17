import { Wifi, Database, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-10 rounded-2xl bg-white/5 backdrop-blur border border-white/10 px-6 py-4 shadow-xl">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">
        
        {/* Left */}
        <div className="flex items-center gap-2">
          <Database size={16} />
          <span>
            Kelompok 5 - Big Data
            <span className="text-slate-500"> © 2025</span>
          </span>
        </div>

        {/* Center */}
        <div className="flex items-center gap-2">
          <Wifi size={16} className="text-emerald-400" />
          <span className="text-emerald-400 font-medium">
            Data Real-Time
          </span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <Clock size={16} />
          <span>
            Pembaruan Terakhir:{" "}
            <span className="text-slate-300">
              {new Date().toLocaleTimeString("id-ID")}
            </span>
          </span>
        </div>

      </div>
    </footer>
  );
}
