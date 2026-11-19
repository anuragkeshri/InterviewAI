
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { BarChart3, Box, Activity } from "lucide-react";
import Performance3DChart from "./Performance3DChart";

type PerformancePoint = {
  attempt: number;
  score: number;
};

export default function PerformanceChart() {
  const [data, setData] = useState<PerformancePoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [viewMode, setViewMode] = useState<"2d" | "3d">("2d");

  useEffect(() => {
    const controller = new AbortController();

    async function loadPerformance() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://127.0.0.1:8000/dashboard/performance",
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Failed to load performance");
        }

        const result: PerformancePoint[] = await response.json();

        if (!controller.signal.aborted) {
          setData(result);
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          console.error("Performance chart error:", err);
          setError("Unable to load performance chart");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadPerformance();

    return () => controller.abort();
  }, []);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#111A2E] p-6">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-indigo-500/5 blur-3xl" />

      {/* Header */}
      <div className="relative flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Activity size={21} className="text-indigo-400" />

            <h2 className="text-xl font-semibold text-white">
              Interview Performance
            </h2>
          </div>

          <p className="mt-2 text-sm text-slate-400">
            Track your AI interview evaluation scores
          </p>
        </div>

        {/* 2D / 3D Toggle */}
        <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-[#080D1B] p-1">
          <button
            type="button"
            onClick={() => setViewMode("2d")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              viewMode === "2d"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                : "text-slate-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <BarChart3 size={16} />
            2D View
          </button>

          <button
            type="button"
            onClick={() => setViewMode("3d")}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              viewMode === "3d"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                : "text-slate-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            <Box size={16} />
            3D View
          </button>
        </div>
      </div>

      {/* Chart Content */}
      <div className="relative mt-6 h-80 w-full">
        {loading ? (
          <div className="flex h-full items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="h-9 w-9 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
              <p className="text-sm text-slate-400">
                Loading performance data...
              </p>
            </div>
          </div>
        ) : error ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        ) : data.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-3">
            <Activity size={36} className="text-slate-600" />

            <p className="text-sm text-slate-400">
              No performance data available yet.
            </p>

            <p className="text-xs text-slate-500">
              Evaluate an answer to see your performance.
            </p>
          </div>
        ) : viewMode === "3d" ? (
          <Performance3DChart data={data} />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 15,
                right: 20,
                left: -15,
                bottom: 5,
              }}
            >
              <CartesianGrid
                stroke="#334155"
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis
                dataKey="attempt"
                stroke="#94A3B8"
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
                tick={{ fontSize: 12 }}
              />

              <YAxis
                stroke="#94A3B8"
                domain={[0, 10]}
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#0F172A",
                  border: "1px solid #334155",
                  borderRadius: "12px",
                  color: "#FFFFFF",
                }}
                labelFormatter={(label) => `Attempt ${label}`}
                formatter={(value) => [`${value}/10`, "Score"]}
              />

              <Line
                type="monotone"
                dataKey="score"
                stroke="#818CF8"
                strokeWidth={3}
                dot={{
                  r: 5,
                  fill: "#818CF8",
                  stroke: "#111A2E",
                  strokeWidth: 2,
                }}
                activeDot={{
                  r: 7,
                  fill: "#A5B4FC",
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Footer */}
      {!loading && !error && data.length > 0 && (
        <div className="relative mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-4">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-indigo-400" />

            <span className="text-xs text-slate-400">
              Evaluation Score (0–10)
            </span>
          </div>

          <span className="text-xs text-slate-500">
            {viewMode === "3d"
              ? `Showing last ${Math.min(data.length, 10)} attempts • Drag to rotate`
              : `${data.length} total attempts`}
          </span>
        </div>
      )}
    </div>
  );
}
