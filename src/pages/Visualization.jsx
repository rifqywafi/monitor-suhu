import { useEffect, useState, Suspense } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import LoadingScreen from "../components/LoadingScreen";

import TimeSeriesChart from "../charts/TimeSeriesChart";
import HistogramChart from "../charts/HistogramChart";
import ScatterChart from "../charts/ScatterChart";
import BarChart from "../charts/BarChart";

export default function Visualization() {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [serverDown, setServerDown] = useState(false);

  useEffect(() => {
    const LOCAL_URL = "http://localhost:5000";
    const NGROK_URL = "https://chery-coetaneous-unintegrally.ngrok-free.dev";

    async function fetchData(baseURLs = [LOCAL_URL, NGROK_URL]) {
      for (let url of baseURLs) {
        try {
          const instance = axios.create({
            baseURL: url,
            headers: { "ngrok-skip-browser-warning": "true" },
          });

          const res = await instance.get("/api/sensor/visualization");
          setChartData(res.data || []);
          setServerDown(false);

          // Setup socket untuk server yang berhasil
          setupSocket(url);
          return;
        } catch (err) {
          console.warn(`Server at ${url} unreachable, trying next fallback..., error:`, err.message);
        }
      }

      // Jika semua gagal
      setServerDown(true);
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

    // Cleanup socket saat component unmount
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
