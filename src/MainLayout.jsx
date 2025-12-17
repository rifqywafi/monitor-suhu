import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Menu } from "lucide-react";

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-100">
      {/* Sidebar desktop */}
      <aside className="hidden md:flex md:flex-col fixed inset-y-0 left-0 w-64 bg-slate-900 border-r border-white/10">
        <Sidebar />
      </aside>

      {/* Sidebar overlay mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          ></div>
          <div className="relative flex flex-col w-64 bg-slate-900 border-r border-white/10">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main content */}
      <main
        className={`flex-1 h-screen overflow-y-auto px-4 py-6 md:px-6 md:py-8 ml-0 md:ml-64`}
      >
        {/* Header dengan tombol hamburger di mobile */}
        <Header>
          <button
            className="md:hidden p-2 rounded-md bg-slate-800 hover:bg-slate-700"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-6 h-6 text-white" />
          </button>
        </Header>

        <Outlet />

        <Footer />
      </main>
    </div>
  );
}
