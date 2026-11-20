
import {
  Trophy,
  Target,
  CheckCircle2,
  RotateCcw,
  MessageSquareText,
} from "lucide-react";

type Evaluation = {
  score: number;
  strengths: string[];
  missingPoints: string[];
  feedback: string;
  suggestedAnswer: string;
};

type QuestionResult = {
  answer: string;
  evaluation: Evaluation | null;
};

type InterviewResultsProps = {
  jobRole: string;
  experience: string;
  questions: string[];
  results: Record<number, QuestionResult>;
  onRestart: () => void;
};

export default function InterviewResults({
  jobRole,
  experience,
  questions,
  results,
  onRestart,
}: InterviewResultsProps) {
  const completedResults = questions
    .map((question, index) => ({
      question,
      answer: results[index]?.answer ?? "",
      evaluation: results[index]?.evaluation,
    }))
    .filter((item) => item.evaluation != null);

  const totalAnswered = completedResults.length;

  const totalScore = completedResults.reduce(
    (sum, item) => sum + (item.evaluation?.score ?? 0),
    0
  );

  const averageScore =
    totalAnswered > 0 ? totalScore / totalAnswered : 0;

  const percentage = Math.round(averageScore * 10);

  const performance =
    averageScore >= 8
      ? "Excellent Performance"
      : averageScore >= 6
        ? "Good Performance"
        : averageScore >= 4
          ? "Needs Improvement"
          : "Keep Practicing";

  return (
    <div className="space-y-6">
      {/* Result Header */}
      <div className="rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-[#182345] to-[#111A2E] p-8 text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/15">
          <Trophy size={32} className="text-indigo-400" />
        </div>

        <h2 className="text-3xl font-bold text-white">
          Interview Completed!
        </h2>

        <p className="mt-3 text-sm text-slate-400">
          {jobRole} • {experience}
        </p>

        <p className="mt-5 text-lg font-semibold text-indigo-400">
          {performance}
        </p>

        <button
          type="button"
          onClick={onRestart}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
        >
          <RotateCcw size={17} />
          Start New Interview
        </button>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-[#111A2E] p-6">
          <Trophy size={23} className="mb-4 text-amber-400" />
          <p className="text-sm text-slate-400">
            Average Score
          </p>
          <h3 className="mt-2 text-3xl font-bold text-white">
            {averageScore.toFixed(1)}/10
          </h3>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#111A2E] p-6">
          <CheckCircle2
            size={23}
            className="mb-4 text-emerald-400"
          />
          <p className="text-sm text-slate-400">
            Questions Answered
          </p>
          <h3 className="mt-2 text-3xl font-bold text-white">
            {totalAnswered}/{questions.length}
          </h3>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#111A2E] p-6">
          <Target size={23} className="mb-4 text-indigo-400" />
          <p className="text-sm text-slate-400">
            Performance Score
          </p>
          <h3 className="mt-2 text-3xl font-bold text-white">
            {percentage}%
          </h3>
        </div>
      </div>

      {/* Question Wise Review */}
      <div className="rounded-2xl border border-white/10 bg-[#111A2E] p-6 md:p-8">
        <div className="mb-6 flex items-center gap-3">
          <MessageSquareText
            size={23}
            className="text-indigo-400"
          />

          <h3 className="text-xl font-semibold text-white">
            Question-wise Performance
          </h3>
        </div>

        <div className="space-y-4">
          {completedResults.map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/10 bg-[#080D1B] p-5"
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <h4 className="text-sm font-semibold leading-6 text-white">
                  Q{index + 1}. {item.question}
                </h4>

                <span className="shrink-0 rounded-lg bg-indigo-500/15 px-3 py-1.5 text-sm font-bold text-indigo-400">
                  {item.evaluation?.score}/10
                </span>
              </div>

              <p className="mb-3 text-sm leading-6 text-slate-300">
                <span className="font-semibold text-slate-200">
                  Your Answer:
                </span>{" "}
                {item.answer}
              </p>

              <p className="text-sm leading-6 text-slate-400">
                <span className="font-semibold text-slate-200">
                  AI Feedback:
                </span>{" "}
                {item.evaluation?.feedback}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
