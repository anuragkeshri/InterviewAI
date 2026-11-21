import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import DashboardHero from "../components/DashboardHero";
import StatsCards from "../components/StatsCards";
import QuestionGenerator from "../components/QuestionGenerator";
import { useEffect, useState } from "react";
import PerformanceChart from "../components/PerformanceChart";
import { useNavigate } from "react-router-dom";
import { FileText, ArrowRight } from "lucide-react";

function Dashboard() {
  type DashboardStats = {
    totalAttempts: number;
    averageScore: number;
    bestScore: number;
  };
  const navigate = useNavigate();
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
          {/* AI Resume Interview */}
          <div
            onClick={() => navigate("/resume-upload")}
            className="group cursor-pointer rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/10 via-slate-900 to-slate-950 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/50 hover:shadow-xl hover:shadow-indigo-500/10"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="rounded-xl bg-indigo-500/15 p-3">
                <FileText className="h-7 w-7 text-indigo-400" />
              </div>

              <ArrowRight className="h-5 w-5 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-indigo-400" />
            </div>

            <h3 className="mt-5 text-xl font-semibold text-white">
              AI Resume Interview
            </h3>

            <p className="mt-2 max-w-lg text-sm leading-relaxed text-slate-400">
              Upload your resume and generate personalized technical interview
              questions using AI-powered semantic search and RAG.
            </p>

            <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-indigo-400">
              Analyze Your Resume
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
          <QuestionGenerator />
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
