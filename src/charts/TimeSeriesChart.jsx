import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { formatTime, formatDate } from "../utils/time";

export default function TimeSeriesChart({ data = [] }) {
  // 1️⃣ Ambil 50 data TERBARU
  const latestData = [...data]
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)) // ASC
    .slice(-50); // window terakhir

  // 2️⃣ Ambil timestamp TERBARU
  const lastDate =
    latestData.length > 0
      ? formatDate(latestData[latestData.length - 1].timestamp)
      : "-";

  return (
    <section className="rounded-2xl bg-white/5 border border-white/10 p-6">
      <div className="flex justify-between mb-4">
        <h2 className="font-semibold text-lg">Grafik Time Series</h2>
        <span className="text-sm text-slate-400">
          Data Terbaru · {lastDate}
        </span>
      </div>

      <ResponsiveContainer width="100%" height={360}>
        <LineChart data={latestData}>
          <XAxis
            dataKey="timestamp"
            tickFormatter={formatTime}
            stroke="#94a3b8"
          />
          <YAxis stroke="#94a3b8" />

          <Tooltip
            labelFormatter={formatTime}
            contentStyle={{
              backgroundColor: "#020617",
              border: "1px solid #1e293b",
              borderRadius: 8,
            }}
          />

          <Legend />

          <Line
            type="monotone"
            dataKey="temperature"
            stroke="#f87171"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="humidity"
            stroke="#60a5fa"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
}
