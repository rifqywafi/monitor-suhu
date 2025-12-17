import { useEffect, useState, Suspense, lazy } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import LoadingScreen from "../components/LoadingScreen";

const KpiSection = lazy(() => import("../components/KpiSection"));
const StorySection = lazy(() => import("../components/StorySection"));

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [risk, setRisk] = useState(null);

  useEffect(() => {
    const api = axios.create({
      // baseURL: "https://chery-coetaneous-unintegrally.ngrok-free.dev",
      baseURL: "http://localhost:5000",
      headers: { "ngrok-skip-browser-warning": "true" },
    });

    async function fetchData() {
      try {
        const [stat, sbs] = await Promise.all([
          api.get("/api/sensor/stats"),
          api.get("/api/sensor/sbs-risk"),
        ]);
        setStats(stat.data || null);
        setRisk(sbs.data || null);
      } catch (e) {
        console.error("Fetch error:", e);
      }
    }

    fetchData();

    // --- Socket.IO realtime connection ---
    const socket = io("http://localhost:5000");
    socket.on("connect", () => console.log("Connected to socket:", socket.id));

    // Update risk & stats realtime
    socket.on("sensorUpdate", (data) => {
      console.log("Realtime data:", data);

      // Update risk
      setRisk((prev) => ({
        ...prev,
        temperature: data.temperature,
        humidity: data.humidity,
        // jika ada fungsi predictSBS di frontend, bisa dipanggil di sini
      }));

      // Update stats sederhana (avg, min, max bisa dihitung ulang jika perlu)
      setStats((prev) => prev ? { ...prev } : prev); // contoh sederhana
    });

    return () => socket.disconnect();
  }, []);

  return (
    <Suspense fallback={<LoadingScreen />}>
      <div className="min-h-screen flex bg-slate-950 text-slate-100">
        <main className="flex-1 px-6 py-8 space-y-10">
          <KpiSection stats={stats} risk={risk} />
          <StorySection stats={stats} risk={risk} />
        </main>
      </div>
    </Suspense>
  );
}
