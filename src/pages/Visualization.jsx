import { useEffect, useState, Suspense, lazy } from "react";
import axios from "axios";
import LoadingScreen from "../components/LoadingScreen";

import TimeSeriesChart from "../charts/TimeSeriesChart";
import HistogramChart from "../charts/HistogramChart";
import ScatterChart from "../charts/ScatterChart";
import BarChart from "../charts/BarChart";

const Header = lazy(() => import("../components/Header"));
const Sidebar = lazy(() => import("../components/Sidebar"));
const Footer = lazy(() => import("../components/Footer"));

export default function Visualization() {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const api = axios.create({
      baseURL: "https://chery-coetaneous-unintegrally.ngrok-free.dev",
      headers: { "ngrok-skip-browser-warning": "true" },
    });

    async function fetchData() {
      try {
        const res = await api.get("/api/sensor/visualization");
        setChartData(res.data || []);
      } catch (err) {
        console.error("Visualization fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <Suspense fallback={<LoadingScreen />}>
      <div className="min-h-screen flex bg-slate-950 text-slate-100">

        <main className="flex-1 px-6 py-8 space-y-12">

          <h1 className="text-2xl font-bold">
            Visualisasi Data Sensor Lingkungan
          </h1>

          <TimeSeriesChart data={chartData} />
          <HistogramChart data={chartData} />
          <ScatterChart data={chartData} />
          <BarChart data={chartData} />

        </main>
      </div>
    </Suspense>
  );
}
