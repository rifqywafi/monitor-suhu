import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

export default function HistogramChart({ data = [] }) {
  const bins = {};

  data.forEach(d => {
    const key = Math.floor(d.temperature);
    bins[key] = (bins[key] || 0) + 1;
  });

  const histogramData = Object.keys(bins).map(k => ({
    range: `${k}°C`,
    count: bins[k],
  }));

  return (
    <section className="rounded-2xl bg-white/5 border border-white/10 p-6">
      <h2 className="font-semibold mb-4">Histogram Suhu</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={histogramData}>
          <XAxis dataKey="range" />
          <YAxis />
          <Bar fill="#42548F" dataKey="count" />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}
