import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const base = "block px-4 py-2 rounded-lg transition";

  return (
    <aside className="w-64 bg-slate-900 border-r border-white/10 p-4">
      <h1 className="text-xl font-bold mb-6">IoT Monitor</h1>

      <nav className="space-y-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${base} ${isActive ? "bg-blue-600" : "hover:bg-white/10"}`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/visualisasi"
          className={({ isActive }) =>
            `${base} ${isActive ? "bg-blue-600" : "hover:bg-white/10"}`
          }
        >
          Visualisasi Data
        </NavLink>
      </nav>
    </aside>
  );
}
