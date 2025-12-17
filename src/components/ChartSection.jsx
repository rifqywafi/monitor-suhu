import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

/* ISO STRING -> Date */
function parseISO(value) {
  if (!value) return null;
  const d = new Date(value);
  return isNaN(d) ? null : d;
}

function formatTime(value) {
  const d = parseISO(value);
  if (!d) return "-";

  return d.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDate(value) {
  const d = parseISO(value);
  if (!d) return "-";

  return d.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function ChartSection({ data }) {
  const lastTime = data?.length ? data[data.length - 1].time : null;

  return (
    <section className="rounded-2xl bg-white/5 backdrop-blur border border-white/10 p-6 shadow-xl">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Environmental Trends</h2>
        {lastTime && (
          <span className="text-sm text-slate-400">
            {formatDate(lastTime)}
          </span>
        )}
      </div>

      {/* CHART */}
      <ResponsiveContainer width="100%" height={360}>
        <LineChart data={data}>
          <XAxis
            dataKey="time"
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
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="humidity"
            stroke="#60a5fa"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
}
