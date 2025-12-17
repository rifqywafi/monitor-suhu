import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export default function ScatterPlot({ data = [] }) {
  return (
    <section className="rounded-2xl bg-white/5 border border-white/10 p-6">
      <h2 className="font-semibold mb-4">
        Scatter Plot Suhu vs Kelembaban
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <ScatterChart>
          <XAxis dataKey="temperature" name="Suhu" />
          <YAxis dataKey="humidity" name="Kelembaban" />
          <Tooltip />
          <Scatter fill="#42548F" fillOpacity={0.7} data={data} />
        </ScatterChart>
      </ResponsiveContainer>
    </section>
  );
}
