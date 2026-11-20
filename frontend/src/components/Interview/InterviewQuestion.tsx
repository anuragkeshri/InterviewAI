


import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Send,
  AlertCircle,
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

type InterviewQuestionProps = {
  question: string;
  questionNumber: number;
  totalQuestions: number;
  jobRole: string;
  experience: string;
  onPrevious: () => void;
  onNext: () => void;
  isFirst: boolean;
  isLast: boolean;
  savedResult?: QuestionResult;
  onAnswerSaved: (result: QuestionResult) => void;
  onFinish: () => void;
  isFinishing?: boolean;
  sessionId: number;

};

const API_URL = "http://127.0.0.1:8000";

export default function InterviewQuestion({
  question,
  questionNumber,
  totalQuestions,
  jobRole,
  experience,
  onPrevious,
  onNext,
  isFirst,
  isLast,
  savedResult,
  onAnswerSaved,
  onFinish,
  isFinishing = false,
  sessionId,
}: InterviewQuestionProps) {
  const [answer, setAnswer] = useState(
    savedResult?.answer ?? ""
  );

  const [evaluation, setEvaluation] = useState<Evaluation | null>(
    savedResult?.evaluation ?? null
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit() {
    if (!answer.trim() || loading || evaluation) return;

    setLoading(true);
    setError("");

    try {
      // Step 1: Evaluate answer using Gemini
      const evaluateResponse = await fetch(
        `${API_URL}/evaluate-answer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sessionId,
            question,
            answer: answer.trim(),
            jobRole,
            experience,
          }),
        }
      );

      if (!evaluateResponse.ok) {
        throw new Error("AI evaluation failed");
      }

      const result: Evaluation =
        await evaluateResponse.json();

      // Step 2: Save evaluation to SQLite
      const saveResponse = await fetch(
        `${API_URL}/save-attempt`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sessionId,
            question,
            answer: answer.trim(),
            jobRole,
            experience,
            ...result,
          }),
        }
      );

      if (!saveResponse.ok) {
        throw new Error("Failed to save interview attempt");
      }

      setEvaluation(result);

      onAnswerSaved({
        answer: answer.trim(),
        evaluation: result,
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-[#111A2E] p-6 md:p-8">
      {/* Question Header */}
      <div className="mb-6 flex items-center justify-between">
        <span className="text-sm font-semibold text-indigo-400">
          Question {questionNumber} of {totalQuestions}
        </span>

        {evaluation && (
          <span className="flex items-center gap-2 text-sm text-emerald-400">
            <CheckCircle2 size={16} />
            Evaluated
          </span>
        )}
      </div>

      <h2 className="mb-7 text-xl font-semibold leading-8 text-white">
        {question}
      </h2>

      {/* Answer Input */}
      <label
        htmlFor="interview-answer"
        className="mb-3 block text-sm font-medium text-slate-300"
      >
        Your Answer
      </label>

      <textarea
        id="interview-answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        disabled={loading || isFinishing || !!evaluation}
        placeholder="Write your interview answer here..."
        rows={6}
        className="w-full resize-y rounded-xl border border-white/10 bg-[#080D1B] p-4 text-sm leading-7 text-white outline-none placeholder:text-slate-500 focus:border-indigo-500 disabled:opacity-70"
      />

      {/* Error */}
      {error && (
        <div
          role="alert"
          className="mt-4 flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300"
        >
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      {/* Submit Button */}
      {!evaluation && (
        <button
          type="button"
          onClick={handleSubmit}
          disabled={
            loading || isFinishing || !answer.trim()
          }
          className="mt-5 flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2
                size={18}
                className="animate-spin"
              />
              Evaluating Answer...
            </>
          ) : (
            <>
              <Send size={18} />
              Submit Answer
            </>
          )}
        </button>
      )}

      {/* AI Evaluation */}
      {evaluation && (
        <div className="mt-8 space-y-5 border-t border-white/10 pt-7">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">
              AI Evaluation
            </h3>

            <span className="rounded-xl bg-indigo-500/15 px-4 py-2 text-xl font-bold text-indigo-400">
              {evaluation.score}/10
            </span>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#080D1B] p-5">
            <h4 className="mb-2 font-semibold text-white">
              Feedback
            </h4>
            <p className="text-sm leading-7 text-slate-300">
              {evaluation.feedback}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5">
              <h4 className="mb-3 font-semibold text-emerald-400">
                Strengths
              </h4>
              <ul className="space-y-2 text-sm text-slate-300">
                {evaluation.strengths.map(
                  (item, index) => (
                    <li key={index}>• {item}</li>
                  )
                )}
              </ul>
            </div>

            <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-5">
              <h4 className="mb-3 font-semibold text-amber-400">
                Missing Points
              </h4>
              <ul className="space-y-2 text-sm text-slate-300">
                {evaluation.missingPoints.map(
                  (item, index) => (
                    <li key={index}>• {item}</li>
                  )
                )}
              </ul>
            </div>
          </div>

          <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-5">
            <h4 className="mb-3 font-semibold text-indigo-400">
              Suggested Answer
            </h4>
            <p className="text-sm leading-7 text-slate-300">
              {evaluation.suggestedAnswer}
            </p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
        <button
          type="button"
          onClick={onPrevious}
          disabled={isFirst || loading || isFinishing}
          className="flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm text-slate-300 disabled:opacity-40"
        >
          <ArrowLeft size={17} />
          Previous
        </button>

        <button
          type="button"
          onClick={isLast ? onFinish : onNext}
          disabled={
            loading || isFinishing || !evaluation
          }
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isFinishing ? (
            <>
              <Loader2
                size={17}
                className="animate-spin"
              />
              Saving Interview...
            </>
          ) : (
            <>
              {isLast
                ? "Finish Interview"
                : "Next Question"}
              <ArrowRight size={17} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
