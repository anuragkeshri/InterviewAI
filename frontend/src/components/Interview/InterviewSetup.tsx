
import { useState } from "react";
import {
  BriefcaseBusiness,
  GraduationCap,
  ListOrdered,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export type InterviewConfig = {
  jobRole: string;
  experience: string;
  questionCount: number;
};

type InterviewSetupProps = {
  onStart: (config: InterviewConfig) => void;
};

export default function InterviewSetup({
  onStart,
}: InterviewSetupProps) {
  const [jobRole, setJobRole] = useState("Frontend Developer");
  const [experience, setExperience] = useState("3-5 years");
  const [questionCount, setQuestionCount] = useState(5);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    onStart({
      jobRole,
      experience,
      questionCount,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-white/10 bg-[#111A2E] p-6 md:p-8"
    >
      <div className="mb-7 flex items-center gap-3">
        <div className="rounded-xl bg-indigo-500/15 p-3">
          <Sparkles size={22} className="text-indigo-400" />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white">
            Configure Your Interview
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Personalize your AI-powered mock interview.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Job Role */}
        <div>
          <label
            htmlFor="jobRole"
            className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300"
          >
            <BriefcaseBusiness size={17} />
            Job Role
          </label>

          <select
            id="jobRole"
            value={jobRole}
            onChange={(e) => setJobRole(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#080D1B] px-4 py-3 text-sm text-white outline-none focus:border-indigo-500"
          >
            <option>Frontend Developer</option>
            <option>React Developer</option>
            <option>Full Stack Developer</option>
            <option>Python Developer</option>
            <option>AI Engineer</option>
            <option>Full Stack AI Developer</option>
          </select>
        </div>

        {/* Experience */}
        <div>
          <label
            htmlFor="experience"
            className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300"
          >
            <GraduationCap size={17} />
            Experience Level
          </label>

          <select
            id="experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#080D1B] px-4 py-3 text-sm text-white outline-none focus:border-indigo-500"
          >
            <option>Fresher</option>
            <option>0-1 years</option>
            <option>1-3 years</option>
            <option>3-5 years</option>
            <option>5-8 years</option>
            <option>8+ years</option>
          </select>
        </div>

        {/* Question Count */}
        <div>
          <label
            htmlFor="questionCount"
            className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-300"
          >
            <ListOrdered size={17} />
            Number of Questions
          </label>

          <select
            id="questionCount"
            value={questionCount}
            onChange={(e) =>
              setQuestionCount(Number(e.target.value))
            }
            className="w-full rounded-xl border border-white/10 bg-[#080D1B] px-4 py-3 text-sm text-white outline-none focus:border-indigo-500"
          >
            <option value={3}>3 Questions</option>
            <option value={5}>5 Questions</option>
            <option value={10}>10 Questions</option>
          </select>
        </div>
      </div>

      <div className="mt-8 border-t border-white/10 pt-6">
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
        >
          <Sparkles size={18} />
          Start AI Interview
          <ArrowRight size={18} />
        </button>
      </div>
    </form>
  );
}
