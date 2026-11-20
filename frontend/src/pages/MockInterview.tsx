import { useState } from "react";
import { BrainCircuit, Sparkles, AlertCircle, RotateCcw } from "lucide-react";

import InterviewSetup from "../components/Interview/InterviewSetup";

import type { InterviewConfig } from "../components/Interview/InterviewSetup";
import InterviewQuestion from "../components/Interview/InterviewQuestion";
import InterviewResults from "../components/Interview/InterviewResults";

type GenerateQuestionsResponse = {
  message: string;
  questions: string[];
};

export default function MockInterview() {
  const [config, setConfig] = useState<InterviewConfig | null>(null);

  const [questions, setQuestions] = useState<string[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<
    Record<
      number,
      {
        answer: string;
        evaluation: {
          score: number;
          strengths: string[];
          missingPoints: string[];
          feedback: string;
          suggestedAnswer: string;
        } | null;
      }
    >
  >({});
  // Generate questions using Gemini AI
  async function handleStart(selectedConfig: InterviewConfig) {
    setConfig(selectedConfig);
    setLoading(true);
    setError("");
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setResults({});
    setShowResults(false);

    try {
      const requestBody = {
        jobRole: selectedConfig.jobRole,
        experience: selectedConfig.experience,
        difficulty: "medium",
        numberOfQuestions: selectedConfig.questionCount,
        topics: selectedConfig.jobRole,
        questionType: "Mixed",
      };

      const response = await fetch("http://127.0.0.1:8000/generate-questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        throw new Error(
          typeof errorData?.detail === "string"
            ? errorData.detail
            : "Failed to generate interview questions",
        );
      }

      const result: GenerateQuestionsResponse = await response.json();

      if (
        !Array.isArray(result.questions) ||
        result.questions.length !== selectedConfig.questionCount ||
        !result.questions.every((question) => typeof question === "string")
      ) {
        throw new Error("Invalid questions received from server");
      }

      setQuestions(result.questions);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function handleNext() {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  }

  function handlePrevious() {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  }

  function handleReset() {
    setConfig(null);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setError("");
    setResults({});
    setShowResults(false);
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-[#080D1B] p-6 text-white md:p-8">
      <div className="mx-auto max-w-5xl">
        {/* Page Heading */}
        <div className="mb-8 flex items-center gap-3">
          <div className="rounded-xl bg-indigo-500/15 p-3">
            <BrainCircuit size={26} className="text-indigo-400" />
          </div>

          <div>
            <h1 className="text-3xl font-bold">AI Mock Interview</h1>

            <p className="mt-1 text-sm text-slate-400">
              Practice real interview questions with AI.
            </p>
          </div>
        </div>

        {/* Setup Form */}
        {!config && <InterviewSetup onStart={handleStart} />}

        {/* Loading */}
        {loading && (
          <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#111A2E] p-8">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-500/10">
              <Sparkles size={26} className="animate-pulse text-indigo-400" />
            </div>

            <div className="mb-5 h-9 w-9 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />

            <h2 className="text-xl font-semibold">Preparing Your Interview</h2>

            <p className="mt-3 text-center text-sm text-slate-400">
              Gemini AI is generating personalized interview questions for you.
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && config && (
          <div className="rounded-2xl border border-red-500/20 bg-[#111A2E] p-8">
            <div className="flex items-start gap-3">
              <AlertCircle size={24} className="shrink-0 text-red-400" />

              <div>
                <h2 className="text-lg font-semibold">
                  Unable to Start Interview
                </h2>

                <p className="mt-2 text-sm text-red-300">{error}</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => handleStart(config)}
                className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-medium hover:bg-indigo-500"
              >
                Try Again
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="rounded-xl border border-white/10 px-5 py-3 text-sm text-slate-300 hover:bg-white/5"
              >
                Back to Setup
              </button>
            </div>
          </div>
        )}

        {/* Interview Questions */}
        {!loading &&
          !error &&
          config &&
          questions.length > 0 &&
          !showResults && (
            <div className="space-y-6">
              {/* Interview Info */}
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#111A2E] p-5">
                <div>
                  <p className="text-sm font-semibold text-white">
                    {config.jobRole}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {config.experience} Experience
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/5"
                >
                  <RotateCcw size={16} />
                  New Interview
                </button>
              </div>

              {/* Question Card */}

              <InterviewQuestion
                key={currentQuestionIndex}
                question={currentQuestion}
                questionNumber={currentQuestionIndex + 1}
                totalQuestions={questions.length}
                jobRole={config.jobRole}
                experience={config.experience}
                onPrevious={handlePrevious}
                onNext={handleNext}
                isFirst={currentQuestionIndex === 0}
                isLast={currentQuestionIndex === questions.length - 1}
                savedResult={results[currentQuestionIndex]}
                onAnswerSaved={(result) => {
                  setResults((prev) => ({
                    ...prev,
                    [currentQuestionIndex]: result,
                  }));
                }}
                onFinish={() => {
                  const completed = questions.every(
                    (_, index) =>
                      results[index]?.evaluation !== null &&
                      results[index]?.evaluation !== undefined,
                  );

                  if (completed) {
                    setShowResults(true);
                  }
                }}
          
              />
            </div>
          )}

        {/* Final Interview Results */}
        {!loading &&
          !error &&
          config &&
          showResults &&
          questions.length > 0 && (
            <InterviewResults
              jobRole={config.jobRole}
              experience={config.experience}
              questions={questions}
              results={results}
              onRestart={handleReset}
            />
          )}

      </div>
    </div>
  );
}
