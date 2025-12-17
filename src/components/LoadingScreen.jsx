export default function LoadingScreen() {
  return (
    <div className="h-screen flex items-center justify-center bg-slate-950">
      <div className="w-full max-w-4xl px-6 space-y-6 animate-pulse">
        <div className="h-10 w-64 bg-slate-800 rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-32 bg-slate-800 rounded-2xl" />
          <div className="h-32 bg-slate-800 rounded-2xl" />
          <div className="h-32 bg-slate-800 rounded-2xl" />
        </div>
        <div className="h-96 bg-slate-800 rounded-2xl" />
      </div>
    </div>
  );
}
