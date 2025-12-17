import { useEffect, useState } from "react";
import axios from "axios";
import { Activity, Thermometer, Droplets, AlertTriangle } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

// =============================
// MAIN APP
// =============================
export default function App() {
  const [chartData, setChartData] = useState([]);
  const [stats, setStats] = useState(null);
  const [risk, setRisk] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [vizRes, statRes, sbsRes] = await Promise.all([
          axios.get("http://localhost:5000/api/sensor/visualization"),
          axios.get("http://localhost:5000/api/sensor/stats"),
          axios.get("http://localhost:5000/api/sensor/sbs-risk")
        ]);

        setChartData(vizRes.data);
        setStats(statRes.data);
        setRisk(sbsRes.data);
      } catch (err) {
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <p className="animate-pulse text-slate-400">Loading sensor data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 space-y-6">
      <Header />

      <KpiSection stats={stats} risk={risk} />

      <ChartSection data={chartData} />

      <Storytelling stats={stats} risk={risk} />

      <Footer />
    </div>
  );
}

// =============================
// HEADER
// =============================
function Header() {
  return (
    <div className="flex items-center gap-3">
      <Activity className="text-cyan-400" size={32} />
      <h1 className="text-3xl font-bold">Smart Building IoT Dashboard</h1>
    </div>
  );
}

// =============================
// KPI SECTION
// =============================
function KpiSection({ stats, risk }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <KpiCard
        icon={<Thermometer className="text-red-400" />}
        title="Average Temperature"
        value={`${stats.temperature.avg.toFixed(2)} °C`}
      />

      <KpiCard
        icon={<Droplets className="text-blue-400" />}
        title="Average Humidity"
        value={`${stats.humidity.avg.toFixed(2)} %`}
      />

      <KpiCard
        icon={<AlertTriangle className="text-yellow-400" />}
        title="SBS Risk Level"
        value={risk.risk}
        highlight={risk.risk}
      />
    </div>
  );
}

function KpiCard({ icon, title, value, highlight }) {
  const color =
    highlight === "HIGH"
      ? "text-red-500"
      : highlight === "MEDIUM"
      ? "text-yellow-400"
      : "text-green-400";

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center gap-4 shadow-lg">
      {icon}
      <div>
        <p className="text-sm text-slate-400">{title}</p>
        <p className={`text-xl font-bold ${highlight ? color : ""}`}>{value}</p>
      </div>
    </div>
  );
}

// =============================
// CHART SECTION
// =============================
function ChartSection({ data }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg">
      <h2 className="font-semibold mb-3">Temperature & Humidity Trend</h2>
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data}>
          <XAxis dataKey="time" hide />
          <YAxis />
          <Tooltip />
          <Line dataKey="temperature" strokeWidth={2} />
          <Line dataKey="humidity" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// =============================
// STORYTELLING
// =============================
function Storytelling({ stats, risk }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-slate-300 leading-relaxed shadow-lg">
      <h2 className="font-semibold text-white mb-2">Building Health Insight</h2>
      <p>
        Berdasarkan data sensor IoT, suhu ruangan tercatat memiliki rata-rata
        <strong className="text-white"> {stats.temperature.avg.toFixed(2)}°C</strong>
        dengan kelembaban udara sebesar
        <strong className="text-white"> {stats.humidity.avg.toFixed(2)}%</strong>.
        Kondisi lingkungan ini dianalisis menggunakan model prediktif
        Sick Building Syndrome (SBS), yang menunjukkan tingkat risiko
        <strong className="text-cyan-400"> {risk.risk}</strong>.
      </p>
      <p className="mt-2">
        Risiko SBS yang meningkat dapat berdampak pada kenyamanan dan kesehatan
        penghuni bangunan, seperti kelelahan, iritasi saluran pernapasan,
        dan penurunan produktivitas kerja.
      </p>
    </div>
  );
}

// =============================
// FOOTER
// =============================
function Footer() {
  return (
    <footer className="text-center text-slate-500 text-sm pt-4">
      IoT Smart Building Dashboard © 2025
    </footer>
  );
}
