import { useEffect, useState, Suspense } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import LoadingScreen from "../components/LoadingScreen";

import TimeSeriesChart from "../charts/TimeSeriesChart";
import HistogramChart from "../charts/HistogramChart";
import ScatterChart from "../charts/ScatterChart";
import BarChart from "../charts/BarChart";

export default function Visualization() {
  const [stats, setStats] = useState(null);       // Statistik suhu & kelembaban
  const [chartData, setChartData] = useState([]); // Data untuk chart
  const [loading, setLoading] = useState(true);
  const [serverDown, setServerDown] = useState(false);

  const LOCAL_URL = "http://localhost:5000";
  const NGROK_URL = "https://chery-coetaneous-unintegrally.ngrok-free.dev";

  useEffect(() => {
    async function fetchData(baseURLs = [LOCAL_URL, NGROK_URL]) {
      for (let url of baseURLs) {
        try {
          const instance = axios.create({
            baseURL: url,
            headers: { "ngrok-skip-browser-warning": "true" },
          });

          // Ambil stats untuk card dan visualization untuk chart
          const [statsRes, vizRes] = await Promise.all([
            instance.get("/api/sensor/stats"),
            instance.get("/api/sensor/visualization"),
          ]);

          setStats(statsRes.data || []);
          setChartData(vizRes.data || []);
          setServerDown(false);

          // Setup socket untuk update chart realtime
          setupSocket(url);
          return;
        } catch (err) {
          console.warn(`Server at ${url} unreachable, trying next fallback..., error:`, err.message);
        }
      }

      // Semua server gagal
      setServerDown(true);
      setStats(null);
      setChartData([]);
    }

    function setupSocket(baseURL) {
      const socket = io(baseURL);
      socket.on("connect", () => console.log("Connected to socket:", socket.id));

      socket.on("sensorUpdate", (newData) => {
        console.log("Realtime chart data:", newData);
        setChartData((prev) => [...prev, newData]);
      });

      return () => socket.disconnect();
    }

    fetchData().finally(() => setLoading(false));

    return () => io().disconnect();
  }, []);

  if (loading) return <LoadingScreen />;

  if (serverDown) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100">
        <div className="bg-red-700 p-6 rounded-lg shadow-lg text-center space-y-4">
          <h1 className="text-2xl font-bold">⚠️ Server Down</h1>
          <p>Tidak dapat terhubung ke server lokal maupun server fallback.</p>
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={<LoadingScreen />}>
      <div className="min-h-screen flex bg-slate-950 text-slate-100">
        <main className="flex-1 px-6 py-8 space-y-12">
          <h1 className="text-2xl font-bold">Visualisasi Statistik Sensor Lingkungan</h1>

          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <StatCard
                title="Suhu (°C)"
                avg={stats.temperature.avg}
                min={stats.temperature.min}
                max={stats.temperature.max}
                color="text-red-400"
              />
              <StatCard
                title="Kelembaban (%)"
                avg={stats.humidity.avg}
                min={stats.humidity.min}
                max={stats.humidity.max}
                color="text-blue-400"
              />
            </div>
          )}

          {/* Chart */}
          <div className="space-y-12">
            <TimeSeriesChart data={chartData} />
            <HistogramChart data={chartData} />
            <ScatterChart data={chartData} />
            <BarChart data={chartData} />
          </div>
        </main>
      </div>
    </Suspense>
  );
}

function StatCard({ title, avg, min, max, color }) {
  return (
    <div className="rounded-xl bg-black/30 border border-white/10 p-4 space-y-2 flex flex-col">
      <h3 className={`font-semibold ${color}`}>{title}</h3>
      <p className="text-sm text-slate-300">Rata-rata: {avg?.toFixed(2)}</p>
      <p className="text-sm text-slate-300">Min: {min}</p>
      <p className="text-sm text-slate-300">Max: {max}</p>
    </div>
  );
}
