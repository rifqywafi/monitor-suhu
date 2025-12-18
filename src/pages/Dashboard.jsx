import { useEffect, useState, Suspense, lazy } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import LoadingScreen from "../components/LoadingScreen";

const KpiSection = lazy(() => import("../components/KpiSection"));
const StorySection = lazy(() => import("../components/StorySection"));

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [risk, setRisk] = useState(null);
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

          const [statRes, riskRes] = await Promise.all([
            instance.get("/api/sensor/stats"),
            instance.get("/api/sensor/sbs-risk"),
          ]);

          setStats(statRes.data || null);
          setRisk(riskRes.data || null);
          setServerDown(false);

          // Setup socket only untuk server yang berhasil
          setupSocket(url);
          return;
        } catch (err) {
          console.warn(`Server at ${url} unreachable, trying next fallback..., error:`, err.message);
        }
      }

      // Jika semua gagal
      setServerDown(true);
      setStats(null);
      setRisk(null);
    }

    function setupSocket(baseURL) {
      const socket = io(baseURL);
      socket.on("connect", () => console.log("Connected to socket:", socket.id));

      socket.on("sensorUpdate", (data) => {
        console.log("Realtime data:", data);
        setRisk((prev) => ({
          ...prev,
          temperature: data.temperature,
          humidity: data.humidity,
        }));
        setStats((prev) => (prev ? { ...prev } : prev));
      });

      return () => socket.disconnect();
    }

    fetchData();

    // Cleanup socket saat component unmount
    return () => io().disconnect();
  }, []);

  if (serverDown) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100">
        <div className="bg-red-700 p-6 rounded-lg shadow-lg text-center space-y-4">
          <h1 className="text-2xl font-bold">Server Down</h1>
          <p>Tidak dapat terhubung ke server lokal maupun server NGROK.</p>
        </div>
      </div>
    );
  }

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
