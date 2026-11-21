
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ResumeUpload from "../components/ResumeUpload";
import { FileText, Sparkles } from "lucide-react";

export default function ResumeAnalyzer() {
  return (
    <div className="flex min-h-screen bg-[#080d1b] text-slate-100">
      <Sidebar />

      <main className="flex min-w-0 flex-1 flex-col">
        <Header />

        <section className="space-y-8 p-6 lg:p-8">
          {/* Page Heading */}
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-indigo-400">
              <Sparkles className="h-4 w-4" />
              AI-Powered Resume Analysis
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-white">
              Resume Interview Generator
            </h1>

            <p className="mt-3 max-w-2xl text-slate-400">
              Upload your resume and generate personalized
              interview questions based on your real skills,
              experience and projects.
            </p>
          </div>

          {/* Resume Upload Section */}
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <ResumeUpload
                onUpload={(file) =>
                  console.log("Selected resume:", file.name)
                }
              />
            </div>

            {/* Information Panel */}
            <div className="h-fit rounded-2xl border border-white/10 bg-slate-900 p-6">
              <div className="mb-5 flex items-center gap-3">
                <FileText className="h-6 w-6 text-indigo-400" />
                <h2 className="text-lg font-semibold">
                  How It Works
                </h2>
              </div>

              <div className="space-y-6">
                {[
                  {
                    step: "01",
                    title: "Upload Resume",
                    description: "Select your PDF resume.",
                  },
                  {
                    step: "02",
                    title: "AI Analysis",
                    description:
                      "AI analyzes your skills, experience and projects.",
                  },
                  {
                    step: "03",
                    title: "Generate Questions",
                    description:
                      "Get personalized technical interview questions.",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-sm font-semibold text-indigo-400">
                      {item.step}
                    </div>

                    <div>
                      <h3 className="font-medium text-white">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-slate-400">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
