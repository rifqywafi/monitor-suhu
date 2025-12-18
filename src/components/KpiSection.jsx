import { Thermometer, Droplets, AlertTriangle } from "lucide-react";

const getRiskIndonesian = (risk) => {
  const translations = {
    HIGH: "Tinggi",
    MEDIUM: "Sedang",
    LOW: "Rendah",
  };
  return translations[risk] ?? "-";
};

export default function KpiSection({ latest, risk }) {
  
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card
        title="Temperature"
        value={latest?.temperature?.toFixed(2) ?? "-"}
        unit="°C"
        icon={<Thermometer />}
        color="red"
      />
      <Card
        title="Humidity"
        value={latest?.humidity?.toFixed(2) ?? "-"}
        unit="%"
        icon={<Droplets />}
        color="blue"
      />
      <Card
        title="Risiko SBS (Sick Building Syndrome)"
        value={getRiskIndonesian(risk?.risk) ?? "-"}
        icon={<AlertTriangle />}
        color={
          risk?.risk === "HIGH"
            ? "red"
            : risk?.risk === "MEDIUM"
            ? "yellow"
            : "green"
        }
      />
    </section>
  );
}

function Card({ title, value, unit, icon, color }) {
  const map = {
    red: "text-red-400",
    blue: "text-blue-400",
    yellow: "text-yellow-400",
    green: "text-green-400",
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur border border-white/10 p-6 shadow-xl">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl bg-black/30 ${map[color]}`}>
          {icon}
        </div>
        <div>
          <p className="text-sm text-slate-400 uppercase">{title}</p>
          <p className={`text-3xl font-bold ${map[color]}`}>
            {value} {unit}
          </p>
        </div>
      </div>
    </div>
  );
}
