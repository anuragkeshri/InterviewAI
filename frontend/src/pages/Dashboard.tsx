import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import DashboardHero from "../components/DashboardHero";
import StatsCards from "../components/StatsCards";
import QuestionGenerator from "../components/QuestionGenerator";
import { useEffect, useState } from "react";
import PerformanceChart from "../components/PerformanceChart";

function Dashboard() {
  type DashboardStats = {
    totalAttempts: number;
    averageScore: number;
    bestScore: number;
  };

  const [stats, setStats] = useState<DashboardStats>({
    totalAttempts: 0,
    averageScore: 0,
    bestScore: 0,
  });

  useEffect(() => {
    const controller = new AbortController();

    const fetchStats = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/dashboard/stats", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch dashboard stats");
        }

        const data: DashboardStats = await response.json();
        setStats(data);
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("Dashboard stats error:", error);
        }
      }
    };

    fetchStats();

    return () => controller.abort();
  }, []);
  return (
    <div className="flex min-h-screen bg-[#080d1b] text-slate-100">
      <Sidebar />

      <main className="flex min-w-0 flex-1 flex-col">
        <Header />

        <section className="space-y-8 p-6 lg:p-8">
          <DashboardHero />
          <StatsCards stats={stats} />
          <PerformanceChart />
          <QuestionGenerator />
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
