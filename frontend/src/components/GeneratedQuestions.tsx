import { useState } from "react";
import { Check, Copy, Sparkles, BrainCircuit } from "lucide-react";
import type { AnswerEvaluation } from "../types/interview";

type GeneratedQuestionsProps = {
  questions: string[];
  jobRole: string;
  experience: string;
};

export default function GeneratedQuestions({
  questions,
  jobRole,
  experience,
}: GeneratedQuestionsProps) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState("");
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const [evaluations, setEvaluations] = useState<
    Record<number, AnswerEvaluation>
  >({});

  const [evaluatingIndex, setEvaluatingIndex] = useState<number | null>(null);

  const [evaluationErrors, setEvaluationErrors] = useState<
    Record<number, string>
  >({});

  const handleCopyAll = async () => {
    const formattedQuestions = questions
      .map((question, index) => `${index + 1}. ${question}`)
      .join("\n\n");

    try {
      await navigator.clipboard.writeText(formattedQuestions);
      setCopied(true);
      setCopyError("");
    } catch {
      setCopied(false);
      setCopyError("Unable to copy questions. Please try again.");
    }
  };
  const handleAnswerChange = (index: number, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [index]: value,
    }));

    // Clear previous evaluation when answer changes
    setEvaluations((prev) => {
      const updated = { ...prev };
      delete updated[index];
      return updated;
    });

    // Clear previous error
    setEvaluationErrors((prev) => ({
      ...prev,
      [index]: "",
    }));
  };

  const handleEvaluateAnswer = async (index: number, question: string) => {
    const answer = answers[index]?.trim();

    if (!answer || evaluatingIndex !== null) return;

    setEvaluatingIndex(index);

    setEvaluationErrors((prev) => ({
      ...prev,
      [index]: "",
    }));

    try {
      const response = await fetch("http://127.0.0.1:8000/evaluate-answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
          answer,
          jobRole,
          experience,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to evaluate answer");
      }

      const evaluation: AnswerEvaluation = await response.json();

      setEvaluations((prev) => ({
        ...prev,
        [index]: evaluation,
      }));

      // Save evaluation to SQLite database
try {
  const saveResponse = await fetch(
    "http://127.0.0.1:8000/save-attempt",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question,
        answer: answers[index].trim(),
        jobRole,
        experience,
        score: evaluation.score,
        strengths: evaluation.strengths,
        missingPoints: evaluation.missingPoints,
        feedback: evaluation.feedback,
        suggestedAnswer: evaluation.suggestedAnswer,
      }),
    }
  );

  if (!saveResponse.ok) {
    throw new Error("Failed to save interview attempt");
  }

  console.log("Interview attempt saved successfully");
} catch (saveError) {
  console.error("Database save failed:", saveError);
}

      console.log("AI Evaluation:", evaluation);
    } catch (error) {
      console.error(error);

      setEvaluationErrors((prev) => ({
        ...prev,
        [index]: "Unable to evaluate answer. Please try again.",
      }));
    } finally {
      setEvaluatingIndex(null);
    }
  };

  return (
    <div className="mt-8 rounded-2xl border border-white/10 bg-[#111A2E] p-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-violet-400" />
            <h2 className="text-xl font-semibold text-white">
              Generated Interview Questions
            </h2>
          </div>

          <p className="mt-2 text-sm text-slate-400">
            {questions.length} AI-generated interview questions
          </p>
        </div>

        <button
          type="button"
          onClick={handleCopyAll}
          disabled={questions.length === 0}
          className="flex items-center gap-2 rounded-xl border border-violet-500/30 bg-violet-500/10 px-4 py-2.5 text-sm font-medium text-violet-300 transition hover:bg-violet-500/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}

          {copied ? "Copied!" : "Copy All Questions"}
        </button>
      </div>

      {copyError && (
        <p role="alert" className="mb-4 text-sm text-red-400">
          {copyError}
        </p>
      )}

      <div className="space-y-4">
        {questions.map((question, index) => (
          <div
            key={index}
            className="rounded-xl border border-white/10 bg-[#080d1b] p-5"
          >
            <div className="flex items-start gap-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-sm font-semibold text-violet-400">
                {String(index + 1).padStart(2, "0")}
              </span>

              <p className="pt-1.5 text-sm leading-7 text-slate-200">
                {question}
              </p>
            </div>
            <div className="mt-5">
              <label
                htmlFor={`answer-${index}`}
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Your Answer
              </label>

              <textarea
                id={`answer-${index}`}
                value={answers[index] ?? ""}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
                placeholder="Write your interview answer here..."
                rows={5}
                className="w-full resize-y rounded-xl border border-white/10 bg-[#111A2E] p-4 text-sm leading-6 text-white outline-none transition placeholder:text-slate-500 focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/10"
              />

              <div className="mt-4 flex items-center justify-end">
                <button
                  type="button"
                  disabled={!answers[index]?.trim() || evaluatingIndex !== null}
                  onClick={() => handleEvaluateAnswer(index, question)}
                  className="inline-flex h-11 w-auto shrink-0 items-center justify-center gap-2 self-start whitespace-nowrap rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 text-sm font-semibold text-white shadow-lg shadow-violet-500/10 transition hover:from-violet-500 hover:to-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <BrainCircuit className="h-4 w-4 shrink-0" />

                  {evaluatingIndex === index
                    ? "Evaluating..."
                    : "Evaluate Answer"}
                </button>
              </div>

              {evaluationErrors[index] && (
                <p role="alert" className="mt-3 text-sm text-red-400">
                  {evaluationErrors[index]}
                </p>
              )}

              {evaluations[index] && (
                <div className="mt-6 rounded-2xl border border-violet-500/20 bg-[#111A2E] p-5">
                  {/* Header */}
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-violet-400" />
                      <h3 className="text-lg font-semibold text-white">
                        AI Evaluation Result
                      </h3>
                    </div>

                    <span className="rounded-full bg-violet-500/10 px-4 py-2 text-sm font-semibold text-violet-300">
                      {evaluations[index].score}/10
                    </span>
                  </div>

                  {/* Score Progress */}
                  <div className="mb-6 h-2 overflow-hidden rounded-full bg-slate-700">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all"
                      style={{
                        width: `${evaluations[index].score * 10}%`,
                      }}
                    />
                  </div>

                  {/* Strengths */}
                  <div className="mb-5">
                    <h4 className="mb-2 font-semibold text-emerald-400">
                      Strengths
                    </h4>

                    <ul className="space-y-2">
                      {evaluations[index].strengths.map((item, i) => (
                        <li key={i} className="text-sm text-slate-300">
                          ✓ {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Missing Points */}
                  <div className="mb-5">
                    <h4 className="mb-2 font-semibold text-amber-400">
                      Missing Points
                    </h4>

                    <ul className="space-y-2">
                      {evaluations[index].missingPoints.map((item, i) => (
                        <li key={i} className="text-sm text-slate-300">
                          • {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Feedback */}
                  <div className="mb-5 rounded-xl bg-white/5 p-4">
                    <h4 className="mb-2 font-semibold text-white">
                      AI Feedback
                    </h4>

                    <p className="text-sm leading-7 text-slate-300">
                      {evaluations[index].feedback}
                    </p>
                  </div>

                  {/* Suggested Answer */}
                  <div className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-4">
                    <h4 className="mb-2 font-semibold text-violet-300">
                      Suggested Answer
                    </h4>

                    <p className="whitespace-pre-line text-sm leading-7 text-slate-300">
                      {evaluations[index].suggestedAnswer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
