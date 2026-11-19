
import {
  FileQuestion,
  TrendingUp,
  Trophy,
  ArrowUpRight,
} from "lucide-react";

type DashboardStats = {
  totalAttempts: number;
  averageScore: number;
  bestScore: number;
};

type StatsCardsProps = {
  stats: DashboardStats;
};

function StatsCards({ stats }: StatsCardsProps) {
  const statsData = [
    {
      title: "Answers Evaluated",
      value: stats.totalAttempts,
      icon: FileQuestion,
      iconColor: "text-indigo-400",
      iconBg: "bg-indigo-500/10",
      description: "Total evaluated answers",
    },
    {
      title: "Average Score",
      value: `${stats.averageScore}/10`,
      icon: TrendingUp,
      iconColor: "text-cyan-400",
      iconBg: "bg-cyan-500/10",
      description: "Average interview performance",
    },
    {
      title: "Best Score",
      value: `${stats.bestScore}/10`,
      icon: Trophy,
      iconColor: "text-emerald-400",
      iconBg: "bg-emerald-500/10",
      description: "Highest evaluation score",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      {statsData.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#111A2E] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/30 hover:shadow-xl hover:shadow-indigo-950/20"
          >
            {/* Background Glow */}
            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-indigo-500/5 blur-3xl" />

            <div className="relative flex items-start justify-between">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.iconBg}`}
              >
                <Icon size={23} className={stat.iconColor} />
              </div>

              <ArrowUpRight
                size={18}
                className="text-slate-600 transition group-hover:text-indigo-400"
              />
            </div>

            <div className="relative mt-6">
              <p className="text-sm font-medium text-slate-400">
                {stat.title}
              </p>

              <h3 className="mt-2 text-3xl font-bold tracking-tight text-white">
                {stat.value}
              </h3>

              <p className="mt-2 text-xs text-slate-500">
                {stat.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default StatsCards;
