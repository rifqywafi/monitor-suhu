import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-100">
 
      <aside className="fixed inset-y-0 left-0 w-64 bg-slate-900 border-r border-white/10">
        <Sidebar />
      </aside>

      <main className="ml-64 flex-1 h-screen overflow-y-auto px-6 py-8 space-y-10">
        <Header />
        <Outlet />
        <Footer />
      </main>
    </div>
  );
}
