import { Activity } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  const titleMap = {
    "/": "Dashboard",
    "/visualisasi": "Visualisasi Data",
  };

  const title = titleMap[location.pathname] || "Aplikasi Sensor";

  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-cyan-500/10">
          <Activity className="text-cyan-400" size={26} />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {title}
          </h1>
          <p className="text-slate-400 text-sm">
            Monitor Kualitas Udara Dalam Ruangan
          </p>
        </div>
      </div>

      <span className="px-4 py-1 rounded-full text-xs bg-emerald-500/10 text-emerald-400">
        LIVE
      </span>
    </header>
  );
}
