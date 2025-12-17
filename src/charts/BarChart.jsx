import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

export default function DailyBarChart({ data = [] }) {
  const map = {};

  data.forEach(d => {
    const day = d.timestamp.slice(0, 10);
    if (!map[day]) map[day] = { t: 0, h: 0, c: 0 };
    map[day].t += d.temperature;
    map[day].h += d.humidity;
    map[day].c++;
  });

  const chartData = Object.keys(map).map(d => ({
    date: d,
    temperature: map[d].t / map[d].c,
    humidity: map[d].h / map[d].c,
  }));

  return (
    <section className="rounded-2xl bg-white/5 border border-white/10 p-6">
      <h2 className="font-semibold mb-4">Rata-rata Harian</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="date" />
          <YAxis />
          <Bar fill="#42548F"  radius={[6, 6, 0, 0]} dataKey="temperature" />
          <Bar fill="#427A8F"  radius={[6, 6, 0, 0]} dataKey="humidity" />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}
