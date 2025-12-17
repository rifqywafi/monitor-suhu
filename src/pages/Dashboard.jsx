import { useEffect, useState, Suspense, lazy } from "react";
import axios from "axios";
import LoadingScreen from "../components/LoadingScreen";

const Header = lazy(() => import("../components/Header"));
const Sidebar = lazy(() => import("../components/Sidebar"));
const KpiSection = lazy(() => import("../components/KpiSection"));
const StorySection = lazy(() => import("../components/StorySection"));
const Footer = lazy(() => import("../components/Footer"));

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [risk, setRisk] = useState(null);

  useEffect(() => {
    const api = axios.create({
      baseURL: "https://chery-coetaneous-unintegrally.ngrok-free.dev",
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
