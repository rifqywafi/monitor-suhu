import {
  AlertTriangle,
  Thermometer,
  Droplets,
  ShieldAlert,
  Activity,
} from "lucide-react";

export default function StorySection({ stats, risk }) {
  if (!stats || !risk) {
    return (
      <section className="rounded-2xl bg-white/5 border border-white/10 p-6 animate-pulse">
        <div className="h-6 w-56 bg-slate-700 rounded mb-4" />
        <div className="space-y-3">
          <div className="h-4 bg-slate-700 rounded w-full" />
          <div className="h-4 bg-slate-700 rounded w-5/6" />
          <div className="h-4 bg-slate-700 rounded w-4/6" />
        </div>
      </section>
    );
  }

  const tempAvg = stats.temperature?.avg ?? 0;
  const humAvg = stats.humidity?.avg ?? 0;

  const riskLevel = risk.risk;

  const riskColor =
    riskLevel === "HIGH"
      ? "text-red-400"
      : riskLevel === "MEDIUM"
      ? "text-yellow-400"
      : "text-green-400";

  const riskNarrative = {
    HIGH: {
      title: "Risiko SBS Tinggi",
      text:
        "Kondisi suhu dan kelembapan saat ini berada di luar rentang ideal, " +
        "yang berpotensi memicu gejala Sick Building Syndrome seperti sakit kepala, " +
        "iritasi mata, kelelahan, dan gangguan pernapasan.",
    },
    MEDIUM: {
      title: "Risiko SBS Sedang",
      text:
        "Lingkungan menunjukkan indikasi awal yang dapat berkontribusi terhadap SBS. " +
        "Pemantauan berkala dan perbaikan sirkulasi udara sangat disarankan.",
    },
    LOW: {
      title: "Risiko SBS Rendah",
      text:
        "Kondisi lingkungan berada dalam batas aman dan belum menunjukkan indikasi signifikan " +
        "terhadap Sick Building Syndrome.",
    },
  };

  const currentRisk = riskNarrative[riskLevel] ?? riskNarrative.LOW;

  return (
    <section className="rounded-2xl bg-white/5 backdrop-blur border border-white/10 p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <ShieldAlert className="text-cyan-400" />
        <h2 className="text-lg font-semibold">
          Sick Building Syndrome Analysis
        </h2>
      </div>

      {/* Context */}
      <p className="text-slate-300 leading-relaxed">
        Sick Building Syndrome (SBS) merupakan kondisi di mana penghuni bangunan
        mengalami gangguan kesehatan yang berkaitan dengan kualitas lingkungan
        dalam ruangan. Dua faktor utama yang berpengaruh adalah suhu dan
        kelembapan udara.
      </p>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InsightCard
          icon={<Thermometer className="text-red-400" />}
          title="Suhu Lingkungan"
          text={`Suhu rata-rata ruangan tercatat sebesar ${tempAvg.toFixed(
            2
          )}°C. Suhu di atas kisaran ideal (24–27°C) dapat meningkatkan rasa tidak nyaman, kelelahan, dan menurunkan produktivitas.`}
        />

        <InsightCard
          icon={<Droplets className="text-blue-400" />}
          title="Kelembapan Udara"
          text={`Kelembapan rata-rata berada pada ${humAvg.toFixed(
            2
          )}%. Kelembapan tinggi (>70%) dapat memicu pertumbuhan jamur dan mikroorganisme yang berkontribusi terhadap SBS.`}
        />
      </div>

      {/* Risk Assessment */}
      <div className="flex items-start gap-4 p-4 rounded-xl bg-black/30 border border-white/10">
        <AlertTriangle className={`${riskColor} mt-1`} />
        <div>
          <p className={`font-semibold ${riskColor}`}>
            {currentRisk.title}
          </p>
          <p className="text-sm text-slate-300 mt-1">
            {currentRisk.text}
          </p>
        </div>
      </div>

      {/* Recommendation */}
      <div className="flex items-start gap-4 p-4 rounded-xl bg-black/30 border border-white/10">
        <Activity className="text-emerald-400 mt-1" />
        <div>
          <p className="font-semibold text-emerald-400">
            Rekomendasi Mitigasi
          </p>
          <ul className="text-sm text-slate-300 list-disc ml-4 mt-1 space-y-1">
            <li>Meningkatkan ventilasi dan sirkulasi udara dalam ruangan</li>
            <li>Menjaga suhu ideal antara 24–27°C</li>
            <li>Mengontrol kelembapan agar berada di bawah 60%</li>
            <li>Melakukan pemantauan kualitas udara secara berkelanjutan</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function InsightCard({ icon, title, text }) {
  return (
    <div className="rounded-xl bg-black/30 border border-white/10 p-4 space-y-2">
      <div className="flex items-center gap-2">
        {icon}
        <h3 className="font-semibold">{title}</h3>
      </div>
      <p className="text-sm text-slate-300">{text}</p>
    </div>
  );
}
