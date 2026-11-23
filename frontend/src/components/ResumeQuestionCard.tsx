import { useState } from "react";
import { ChevronDown, ChevronUp, MessageSquare } from "lucide-react";

type Props = {
  question: string;
  index: number;
  jobRole: string;
  sessionId: number | null;
  onEvaluationSaved: (index: number, score: number) => void;
};

export default function ResumeQuestionCard({
  question,
  index,
  jobRole,
   sessionId,
   onEvaluationSaved,
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const [answer, setAnswer] = useState("");

  const [evaluating, setEvaluating] = useState(false);
  const [error, setError] = useState("");

  type Evaluation = {
    score: number;
    strengths: string[];
    missingPoints: string[];
    feedback: string;
    suggestedAnswer: string;
  };

  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);

  const evaluateMyAnswer = async () => {
    if (!answer.trim() || evaluating) return;

    setEvaluating(true);
    setError("");
    setEvaluation(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/evaluate-answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobRole,
          experience: "3-4 years",
          question,
          answer: answer.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          typeof data.detail === "string" ? data.detail : "Evaluation failed",
        );
      }

     
const result = data as Evaluation;

setEvaluation(result);

// Save evaluated answer to database
const saveResponse = await fetch(
  "http://127.0.0.1:8000/save-attempt",
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
      experience: "3-4 years",
      score: Math.round(result.score),
      strengths: result.strengths,
      missingPoints: result.missingPoints,
      feedback: result.feedback,
      suggestedAnswer: result.suggestedAnswer,
    }),
  }
);

if (!saveResponse.ok) {
  throw new Error(
    "AI evaluation completed, but saving the answer failed."
  );
}

const savedAttempt = await saveResponse.json();

console.log("Saved attempt:", savedAttempt);
onEvaluationSaved(index, result.score);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setEvaluating(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900 transition hover:border-indigo-500/30">
      <div className="p-5">
        <div className="mb-3 flex items-center justify-between">
          <span className="rounded-lg bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400">
            QUESTION {String(index + 1).padStart(2, "0")}
          </span>

          <MessageSquare className="h-5 w-5 text-slate-500" />
        </div>

        <p className="leading-7 text-slate-200">{question}</p>

        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="mt-5 flex items-center gap-2 text-sm font-medium text-indigo-400 hover:text-indigo-300"
        >
          {expanded ? "Hide Answer" : "Practice Answer"}

          {expanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>

        {expanded && (
          <div className="mt-5 border-t border-white/10 pt-5">
            <label className="mb-2 block text-sm font-medium text-slate-300">
              Your Answer
            </label>

            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              rows={5}
              placeholder="Write your interview answer here..."
              className="w-full resize-y rounded-xl border border-white/10 bg-slate-950 p-4 text-sm text-white outline-none focus:border-indigo-500"
            />

            <button
              type="button"
              onClick={evaluateMyAnswer}
              disabled={evaluating || !answer.trim()}
              className="mt-4 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:opacity-50"
            >
              {evaluating ? "Evaluating..." : "Evaluate My Answer"}
            </button>

            {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

            {evaluation && (
              <div className="mt-6 space-y-4 rounded-xl border border-white/10 bg-slate-950 p-5">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-white">AI Evaluation</h4>
                  <span className="text-xl font-bold text-indigo-400">
                    {evaluation.score}/10
                  </span>
                </div>

                <div>
                  <h5 className="mb-2 font-medium text-emerald-400">
                    Strengths
                  </h5>
                  {evaluation.strengths.map((item, i) => (
                    <p key={i} className="mb-1 text-sm text-slate-300">
                      • {item}
                    </p>
                  ))}
                </div>

                <div>
                  <h5 className="mb-2 font-medium text-amber-400">
                    Missing Points
                  </h5>
                  {evaluation.missingPoints.map((item, i) => (
                    <p key={i} className="mb-1 text-sm text-slate-300">
                      • {item}
                    </p>
                  ))}
                </div>

                <div>
                  <h5 className="mb-2 font-medium text-white">Feedback</h5>
                  <p className="text-sm leading-6 text-slate-300">
                    {evaluation.feedback}
                  </p>
                </div>

                <div>
                  <h5 className="mb-2 font-medium text-indigo-400">
                    Suggested Answer
                  </h5>
                  <p className="whitespace-pre-line text-sm leading-6 text-slate-300">
                    {evaluation.suggestedAnswer}
                  </p>
                </div>
              </div>
            )}

            <p className="mt-2 text-xs text-slate-500">
              Practice mode — your answer is not submitted yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
