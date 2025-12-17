import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import LoadingScreen from "./components/LoadingScreen";

const MainLayout = lazy(() => import("./MainLayout"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Visualization = lazy(() => import("./pages/Visualization"));

export default function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>

        {/* PAKAI MAINLAYOUT */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/visualisasi" element={<Visualization />} />
        </Route>

      </Routes>
    </Suspense>
  );
}
