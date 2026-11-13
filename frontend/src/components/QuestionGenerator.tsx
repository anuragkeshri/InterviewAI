import { useState } from "react";
import { WandSparkles, AlertCircle } from "lucide-react";
import type { InterviewFormData } from "../types/interview";
import GeneratedQuestions from "./GeneratedQuestions";

function QuestionGenerator() {
  const [formData, setFormData] = useState<InterviewFormData>({
    jobRole: "",
    experience: "",
    difficulty: "",
    numberOfQuestions: 5,
    topics: "",
    questionType: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof InterviewFormData, string>>
  >({});

  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [questions, setQuestions] = useState<string[]>([]);

  const inputStyle =
    "w-full rounded-xl border border-white/10 bg-[#0B1222] px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 placeholder:text-slate-600";

  const labelStyle = "mb-2 block text-sm font-medium text-slate-300";

  const handleChange = <K extends keyof InterviewFormData>(
    field: K,
    value: InterviewFormData[K],
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));
  };

  //   const handleGenerate = () => {
  //     const newErrors: Partial<Record<keyof InterviewFormData, string>> = {};

  //     if (!formData.jobRole.trim()) {
  //       newErrors.jobRole = "Please enter a Job Role";
  //     }

  //     if (!formData.experience) {
  //       newErrors.experience = "Please select Experience Level";
  //     }

  //     if (!formData.difficulty) {
  //       newErrors.difficulty = "Please select Difficulty";
  //     }

  //     if (!formData.topics.trim()) {
  //       newErrors.topics = "Please enter Topics / Skills";
  //     }

  //     if (![5, 10, 15, 20].includes(formData.numberOfQuestions)) {
  //       newErrors.numberOfQuestions = "Invalid question count";
  //     }

  //     setErrors(newErrors);

  //     if (Object.keys(newErrors).length > 0) {
  //       return;
  //     }

  //     console.log("Validated Form Data:", formData);
  //   };

  const handleGenerate = async () => {
    const newErrors: Partial<Record<keyof InterviewFormData, string>> = {};

    if (!formData.jobRole.trim()) {
      newErrors.jobRole = "Please enter a Job Role";
    }

    if (!formData.experience) {
      newErrors.experience = "Please select Experience Level";
    }

    if (!formData.difficulty) {
      newErrors.difficulty = "Please select Difficulty";
    }

    if (!formData.topics.trim()) {
      newErrors.topics = "Please enter Topics / Skills";
    }

    if (![5, 10, 15, 20].includes(formData.numberOfQuestions)) {
      newErrors.numberOfQuestions = "Invalid question count";
    }
    if (!formData.questionType) {
      newErrors.questionType = "Please select Question Type";
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setApiError(null);
    setShowResults(false);
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:8000/generate-questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data: { message: string; questions: string[] } =
        await response.json();

      console.log("Backend Response:", data);

      if (
        !Array.isArray(data.questions) ||
        !data.questions.every((question) => typeof question === "string")
      ) {
        throw new Error("Invalid questions received from server");
      }

      setQuestions(data.questions);
      setShowResults(true);
    } catch (error) {
      console.error("Failed to generate questions:", error);
      setApiError("Unable to connect to the server. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const questionTypes = [
    "Technical",
    "Coding",
    "Scenario-Based",
    "Behavioral",
    "Mixed",
  ];

  return (
    <>
      <div
        id="question-generator"
        className="rounded-3xl border border-white/10 bg-[#111A2E] p-6 shadow-2xl shadow-black/10 lg:p-8"
      >
        {/* Form Header */}
        <div className="mb-8 flex items-center gap-4 border-b border-white/10 pb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
            <WandSparkles size={24} />
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">
              Generate Interview Questions
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Configure your AI interview session
            </p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Job Role */}
          <div>
            <label htmlFor="job-role" className={labelStyle}>
              Job Role
            </label>
            <input
              id="job-role"
              type="text"
              placeholder="e.g. React Developer"
              value={formData.jobRole}
              onChange={(e) => handleChange("jobRole", e.target.value)}
              className={`${inputStyle} ${
                errors.jobRole ? "border-red-500" : ""
              }`}
            />
            {errors.jobRole && (
              <p className="mt-2 text-xs text-red-400">{errors.jobRole}</p>
            )}
          </div>

          {/* Experience */}
          <div>
            <label htmlFor="experience" className={labelStyle}>
              Experience Level
            </label>
            <select
              id="experience"
              value={formData.experience}
              onChange={(e) => handleChange("experience", e.target.value)}
              className={`${inputStyle} ${errors.experience ? "border-red-500" : ""}`}
            >
              <option value="" disabled>
                Select Experience
              </option>
              <option value="fresher">Fresher</option>
              <option value="junior">1–2 Years</option>
              <option value="mid">3–5 Years</option>
              <option value="senior">5+ Years</option>
            </select>
            {errors.experience && (
              <p className="mt-2 text-xs text-red-400">{errors.experience}</p>
            )}
          </div>

          {/* Difficulty */}
          <div>
            <label htmlFor="difficulty" className={labelStyle}>
              Difficulty
            </label>
            <select
              id="difficulty"
              value={formData.difficulty}
              onChange={(e) => handleChange("difficulty", e.target.value)}
              className={`${inputStyle} ${errors.difficulty ? "border-red-500" : ""}`}
            >
              <option value="" disabled>
                Select Difficulty
              </option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            {errors.difficulty && (
              <p className="mt-2 text-xs text-red-400">{errors.difficulty}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="questionType"
              className="block text-sm font-medium text-slate-300"
            >
              Question Type
            </label>

            <select
              id="questionType"
              name="questionType"
              value={formData.questionType}
              onChange={(e) => handleChange("questionType", e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#080d1b] px-4 py-3 text-sm text-white outline-none transition focus:border-violet-500"
            >
              <option value="">Select Question Type</option>

              {questionTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.questionType && (
              <p className="mt-2 text-xs text-red-400">{errors.questionType}</p>
            )}
          </div>

          {/* Number of Questions */}
          <div>
            <label htmlFor="question-count" className={labelStyle}>
              Number of Questions
            </label>
            <select
              id="question-count"
              value={formData.numberOfQuestions}
              onChange={(e) =>
                handleChange("numberOfQuestions", Number(e.target.value))
              }
              className={`${inputStyle} ${errors.numberOfQuestions ? "border-red-500" : ""}`}
            >
              <option value="5">5 Questions</option>
              <option value="10">10 Questions</option>
              <option value="15">15 Questions</option>
              <option value="20">20 Questions</option>
            </select>
            {errors.numberOfQuestions && (
              <p className="mt-2 text-xs text-red-400">
                {errors.numberOfQuestions}
              </p>
            )}
          </div>
        </div>

        {/* Topics */}
        <div className="mt-6">
          <label htmlFor="topics" className={labelStyle}>
            Topics / Skills
          </label>
          <input
            id="topics"
            type="text"
            placeholder="e.g. React Hooks, Redux, JavaScript"
            value={formData.topics}
            onChange={(e) => handleChange("topics", e.target.value)}
            className={`${inputStyle} ${errors.topics ? "border-red-500" : ""}`}
          />
          {errors.topics && (
            <p className="mt-2 text-xs text-red-400">{errors.topics}</p>
          )}
        </div>

        <div className="mt-8 flex flex-col gap-4">
          {/* Generate Button */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleGenerate}
              disabled={isLoading}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-4 font-semibold text-white transition hover:from-indigo-500 hover:to-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Generating Questions...
                </>
              ) : (
                <>
                  <WandSparkles size={18} />
                  Generate Questions
                </>
              )}
            </button>
          </div>

          {/* API Error Message */}
          {apiError && (
            <div
              role="alert"
              className="flex w-full items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-300"
            >
              <AlertCircle size={20} className="mt-0.5 shrink-0" />

              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">Something went wrong</p>

                <p className="mt-1 text-sm">{apiError}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {showResults && (
        <div className="mt-8">
          <GeneratedQuestions questions={questions} />
        </div>
      )}
    </>
  );
}

export default QuestionGenerator;
