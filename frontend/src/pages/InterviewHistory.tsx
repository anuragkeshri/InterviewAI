// import { useEffect, useState } from "react";
// import {
//   History,
//   Database,
//   ClipboardList,
//   ChartNoAxesColumn,
//   Trophy,
//   ChevronDown,
// ChevronUp,
// } from "lucide-react";

// import Sidebar from "../components/Sidebar";
// import Header from "../components/Header";

// import type {
//   InterviewAttempt,
//   InterviewHistoryResponse,
// } from "../types/interview";

// export default function InterviewHistory() {
//   const [attempts, setAttempts] = useState<InterviewAttempt[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
// const [expandedAttemptId, setExpandedAttemptId] =
//   useState<number | null>(null);
//   // Fetch saved interview attempts
//   useEffect(() => {
//     const controller = new AbortController();

//     const fetchAttempts = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const response = await fetch("http://127.0.0.1:8000/attempts", {
//           signal: controller.signal,
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch interview history");
//         }

//         const data: InterviewHistoryResponse = await response.json();

//         setAttempts(data.attempts);
//       } catch (err) {
//         if (controller.signal.aborted) return;

//         setError(err instanceof Error ? err.message : "Something went wrong");
//       } finally {
//         if (!controller.signal.aborted) {
//           setLoading(false);
//         }
//       }
//     };

//     fetchAttempts();

//     return () => controller.abort();
//   }, []);

//   const totalAttempts = attempts.length;

//   const averageScore =
//     totalAttempts > 0
//       ? (
//           attempts.reduce((sum, attempt) => sum + attempt.score, 0) /
//           totalAttempts
//         ).toFixed(1)
//       : "0.0";

//   const bestScore =
//     totalAttempts > 0
//       ? Math.max(...attempts.map((attempt) => attempt.score))
//       : 0;

//   return (
//     <div className="min-h-screen bg-[#080D1B] text-white">
//       <div className="flex">
//         <Sidebar />

//         <div className="min-w-0 flex-1">
//           <Header />

//           <main className="mx-auto max-w-7xl px-6 py-8">
//             {/* Page Heading */}
//             <div className="mb-8">
//               <div className="mb-3 flex items-center gap-3">
//                 <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-400">
//                   <History size={24} />
//                 </div>

//                 <div>
//                   <h1 className="text-3xl font-bold">Interview History</h1>

//                   <p className="mt-1 text-sm text-slate-400">
//                     Track your interview attempts and AI evaluation scores.
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* History Statistics */}
//             <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-3">
//               {/* Total Attempts */}
//               <div className="rounded-2xl border border-white/10 bg-[#111A2E] p-6">
//                 <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10">
//                   <ClipboardList size={22} className="text-violet-400" />
//                 </div>

//                 <p className="text-sm text-slate-400">Total Attempts</p>
//                 <h2 className="mt-2 text-3xl font-bold text-white">
//                   {totalAttempts}
//                 </h2>
//               </div>

//               {/* Average Score */}
//               <div className="rounded-2xl border border-white/10 bg-[#111A2E] p-6">
//                 <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-sky-500/10">
//                   <ChartNoAxesColumn size={22} className="text-sky-400" />
//                 </div>

//                 <p className="text-sm text-slate-400">Average Score</p>
//                 <h2 className="mt-2 text-3xl font-bold text-white">
//                   {averageScore}
//                   <span className="text-lg text-slate-500">/10</span>
//                 </h2>
//               </div>

//               {/* Best Score */}
//               <div className="rounded-2xl border border-white/10 bg-[#111A2E] p-6">
//                 <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10">
//                   <Trophy size={22} className="text-emerald-400" />
//                 </div>

//                 <p className="text-sm text-slate-400">Best Score</p>
//                 <h2 className="mt-2 text-3xl font-bold text-white">
//                   {bestScore}
//                   <span className="text-lg text-slate-500">/10</span>
//                 </h2>
//               </div>
//             </div>

//             {/* Empty State */}
//             {!loading && !error && attempts.length === 0 && (
//               <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#111A2E] p-8 text-center">
//                 <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10">
//                   <Database size={30} className="text-indigo-400" />
//                 </div>

//                 <h2 className="text-xl font-semibold">
//                   No Interview Attempts Yet
//                 </h2>

//                 <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
//                   Your saved interview attempts, scores and AI feedback will
//                   appear here.
//                 </p>
//               </div>
//             )}

//             {/* Interview History Cards */}
//             <div className="rounded-2xl border border-white/10 bg-[#111A2E] p-6">
//               <div className="mb-6 flex items-center justify-between">
//                 <div>
//                   <h2 className="text-xl font-semibold text-white">
//                     Recent Attempts
//                   </h2>
//                   <p className="mt-1 text-sm text-slate-400">
//                     Review your previous interview evaluations.
//                   </p>
//                 </div>

//                 <span className="rounded-lg bg-indigo-500/15 px-3 py-1.5 text-sm text-indigo-300">
//                   {attempts.length} Attempts
//                 </span>
//               </div>

//               {/* Loading */}
//               {loading && (
//                 <p className="py-10 text-center text-slate-400">
//                   Loading interview history...
//                 </p>
//               )}

//               {/* Error */}
//               {!loading && error && (
//                 <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
//                   {error}
//                 </div>
//               )}

//               {/* History List */}
//               {!loading && !error && attempts.length > 0 && (
//                 <div className="space-y-4">
//                   {attempts.map((attempt) => (
//                     <div
//                       key={attempt.id}
//                       className="rounded-xl border border-white/10 bg-[#080D1B] p-5"
//                     >
//                       <div className="flex items-start justify-between gap-4">
//                         <div>
//                           <h3 className="text-base font-semibold text-white">
//                             {attempt.question}
//                           </h3>

//                           <p className="mt-2 text-xs text-slate-400">
//                             {attempt.jobRole} · {attempt.experience} ·{" "}
//                             {new Date(attempt.createdAt).toLocaleDateString(
//                               "en-IN",
//                               {
//                                 day: "2-digit",
//                                 month: "short",
//                                 year: "numeric",
//                               },
//                             )}
//                           </p>
//                         </div>

//                         <span className="shrink-0 rounded-lg bg-indigo-500/15 px-3 py-1.5 text-sm font-semibold text-indigo-300">
//                           {attempt.score}/10
//                         </span>
//                       </div>

//                       {/* Score Progress */}
//                       <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-700">
//                         <div
//                           className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
//                           style={{
//                             width: `${Math.min(
//                               100,
//                               Math.max(0, attempt.score * 10),
//                             )}%`,
//                           }}
//                         />
//                       </div>

//                       {/* Short Feedback */}
                    
// {/* Short Feedback */}
// <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-400">
//   {attempt.feedback}
// </p>

// {/* Expand / Collapse Button */}
// <button
//   type="button"
//   onClick={() =>
//     setExpandedAttemptId(
//       expandedAttemptId === attempt.id ? null : attempt.id
//     )
//   }
//   aria-expanded={expandedAttemptId === attempt.id}
//   className="mt-4 flex items-center gap-2 text-sm font-medium text-indigo-400 transition hover:text-indigo-300"
// >
//   {expandedAttemptId === attempt.id ? (
//     <>
//       Hide Evaluation
//       <ChevronUp size={16} />
//     </>
//   ) : (
//     <>
//       View Evaluation
//       <ChevronDown size={16} />
//     </>
//   )}
// </button>

// {/* Expanded Evaluation Details */}
// {expandedAttemptId === attempt.id && (
//   <div className="mt-5 space-y-5 border-t border-white/10 pt-5">

//     {/* Candidate Answer */}
//     <div>
//       <h4 className="mb-2 text-sm font-semibold text-white">
//         Your Answer
//       </h4>
//       <p className="whitespace-pre-wrap rounded-xl bg-[#111A2E] p-4 text-sm leading-6 text-slate-300">
//         {attempt.answer}
//       </p>
//     </div>

//     {/* Strengths */}
//     <div>
//       <h4 className="mb-2 text-sm font-semibold text-emerald-400">
//         Strengths
//       </h4>
//       <ul className="space-y-2 text-sm text-slate-300">
//         {attempt.strengths.map((strength, index) => (
//           <li key={index} className="flex items-start gap-2">
//             <span className="text-emerald-400">✓</span>
//             <span>{strength}</span>
//           </li>
//         ))}
//       </ul>
//     </div>

//     {/* Missing Points */}
//     <div>
//       <h4 className="mb-2 text-sm font-semibold text-amber-400">
//         Missing Points
//       </h4>
//       <ul className="space-y-2 text-sm text-slate-300">
//         {attempt.missingPoints.map((point, index) => (
//           <li key={index} className="flex items-start gap-2">
//             <span className="text-amber-400">•</span>
//             <span>{point}</span>
//           </li>
//         ))}
//       </ul>
//     </div>

//     {/* Complete Feedback */}
//     <div>
//       <h4 className="mb-2 text-sm font-semibold text-indigo-400">
//         AI Feedback
//       </h4>
//       <p className="whitespace-pre-wrap text-sm leading-6 text-slate-300">
//         {attempt.feedback}
//       </p>
//     </div>

//     {/* Suggested Answer */}
//     <div>
//       <h4 className="mb-2 text-sm font-semibold text-violet-400">
//         Suggested Answer
//       </h4>
//       <p className="whitespace-pre-wrap rounded-xl border border-violet-500/20 bg-violet-500/5 p-4 text-sm leading-6 text-slate-300">
//         {attempt.suggestedAnswer}
//       </p>
//     </div>

//   </div>
// )}

//                     </div>
//                   ))}
//                 </div>
//               )}

//               {/* No Attempts */}
//               {!loading && !error && attempts.length === 0 && (
//                 <p className="py-10 text-center text-slate-400">
//                   No saved interview attempts found.
//                 </p>
//               )}
//             </div>
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// }



import { useEffect, useMemo, useState } from "react";
import {
  History,
  Database,
  ClipboardList,
  ChartNoAxesColumn,
  Trophy,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import type {
  InterviewAttempt,
  InterviewHistoryResponse,
} from "../types/interview";

const PAGE_SIZE = 5;

type ScoreFilter = "all" | "high" | "medium" | "low";

export default function InterviewHistory() {
  const [attempts, setAttempts] = useState<InterviewAttempt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [expandedAttemptId, setExpandedAttemptId] =
    useState<number | null>(null);

  // Day 84 - Search, Filter and Pagination
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [scoreFilter, setScoreFilter] =
    useState<ScoreFilter>("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch interview history
  useEffect(() => {
    const controller = new AbortController();

    async function fetchAttempts() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://127.0.0.1:8000/attempts",
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch interview history");
        }

        const result: InterviewHistoryResponse =
          await response.json();

        if (!controller.signal.aborted) {
          setAttempts(result.attempts);
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(
            err instanceof Error
              ? err.message
              : "Something went wrong"
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchAttempts();

    return () => controller.abort();
  }, []);

  // Overall statistics
  const totalAttempts = attempts.length;

  const averageScore =
    totalAttempts > 0
      ? (
          attempts.reduce(
            (sum, attempt) => sum + attempt.score,
            0
          ) / totalAttempts
        ).toFixed(1)
      : "0.0";

  const bestScore =
    totalAttempts > 0
      ? Math.max(...attempts.map((attempt) => attempt.score))
      : 0;

  // Unique job roles from API data
  const jobRoles = useMemo(() => {
    return [...new Set(attempts.map((a) => a.jobRole))]
      .filter(Boolean)
      .sort((a, b) => a.localeCompare(b));
  }, [attempts]);

  // Search and combined filters
  const filteredAttempts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return attempts.filter((attempt) => {
      const matchesSearch =
        attempt.question.toLowerCase().includes(query);

      const matchesRole =
        selectedRole === "all" ||
        attempt.jobRole === selectedRole;

      let matchesScore = true;

      if (scoreFilter === "high") {
        matchesScore = attempt.score >= 8;
      } else if (scoreFilter === "medium") {
        matchesScore =
          attempt.score >= 5 && attempt.score < 8;
      } else if (scoreFilter === "low") {
        matchesScore = attempt.score < 5;
      }

      return matchesSearch && matchesRole && matchesScore;
    });
  }, [attempts, searchQuery, selectedRole, scoreFilter]);

  // Pagination
  const totalPages = Math.max(
    1,
    Math.ceil(filteredAttempts.length / PAGE_SIZE)
  );

  const safePage = Math.min(currentPage, totalPages);

  const startIndex = (safePage - 1) * PAGE_SIZE;

  const paginatedAttempts = filteredAttempts.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedRole !== "all" ||
    scoreFilter !== "all";

  function resetPagination() {
    setCurrentPage(1);
    setExpandedAttemptId(null);
  }

  function resetFilters() {
    setSearchQuery("");
    setSelectedRole("all");
    setScoreFilter("all");
    resetPagination();
  }

  function changePage(page: number) {
    setCurrentPage(page);
    setExpandedAttemptId(null);
  }

  return (
    <div className="min-h-screen bg-[#080D1B] text-white">
      <div className="flex">
        <Sidebar />

        <div className="min-w-0 flex-1">
          <Header />

          <main className="mx-auto max-w-7xl px-6 py-8">
            {/* Page Heading */}
            <div className="mb-8">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-400">
                  <History size={24} />
                </div>

                <div>
                  <h1 className="text-3xl font-bold">
                    Interview History
                  </h1>

                  <p className="mt-1 text-sm text-slate-400">
                    Track your interview attempts and AI
                    evaluation scores.
                  </p>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-[#111A2E] p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10">
                  <ClipboardList
                    size={22}
                    className="text-violet-400"
                  />
                </div>

                <p className="text-sm text-slate-400">
                  Total Attempts
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  {totalAttempts}
                </h2>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#111A2E] p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-sky-500/10">
                  <ChartNoAxesColumn
                    size={22}
                    className="text-sky-400"
                  />
                </div>

                <p className="text-sm text-slate-400">
                  Average Score
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  {averageScore}
                  <span className="text-lg text-slate-500">
                    /10
                  </span>
                </h2>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#111A2E] p-6">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10">
                  <Trophy
                    size={22}
                    className="text-emerald-400"
                  />
                </div>

                <p className="text-sm text-slate-400">
                  Best Score
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  {bestScore}
                  <span className="text-lg text-slate-500">
                    /10
                  </span>
                </h2>
              </div>
            </div>

            {/* History Container */}
            <div className="rounded-2xl border border-white/10 bg-[#111A2E] p-6">
              {/* Section Header */}
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold">
                    Recent Attempts
                  </h2>

                  <p className="mt-1 text-sm text-slate-400">
                    Review your previous interview evaluations.
                  </p>
                </div>

                <span className="rounded-lg bg-indigo-500/15 px-3 py-1.5 text-sm text-indigo-300">
                  {totalAttempts} Attempts
                </span>
              </div>

              {/* Search and Filters */}
              {!loading && !error && totalAttempts > 0 && (
                <div className="mb-7 space-y-4">
                  <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
                    {/* Search */}
                    <div className="relative">
                      <Search
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                      />

                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          resetPagination();
                        }}
                        placeholder="Search interview questions..."
                        aria-label="Search interview questions"
                        className="w-full rounded-xl border border-white/10 bg-[#080D1B] py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-500"
                      />
                    </div>

                    {/* Job Role */}
                    <div className="relative">
                      <Filter
                        size={17}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                      />

                      <select
                        value={selectedRole}
                        onChange={(e) => {
                          setSelectedRole(e.target.value);
                          resetPagination();
                        }}
                        aria-label="Filter by job role"
                        className="w-full appearance-none rounded-xl border border-white/10 bg-[#080D1B] py-3 pl-11 pr-9 text-sm text-white outline-none focus:border-indigo-500"
                      >
                        <option value="all">All Job Roles</option>

                        {jobRoles.map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>

                      <ChevronDown
                        size={16}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                      />
                    </div>

                    {/* Score Filter */}
                    <div className="relative">
                      <select
                        value={scoreFilter}
                        onChange={(e) => {
                          setScoreFilter(
                            e.target.value as ScoreFilter
                          );
                          resetPagination();
                        }}
                        aria-label="Filter by evaluation score"
                        className="w-full appearance-none rounded-xl border border-white/10 bg-[#080D1B] px-4 py-3 pr-9 text-sm text-white outline-none focus:border-indigo-500"
                      >
                        <option value="all">All Scores</option>
                        <option value="high">
                          High Score (8–10)
                        </option>
                        <option value="medium">
                          Medium Score (5–7.9)
                        </option>
                        <option value="low">
                          Low Score (Below 5)
                        </option>
                      </select>

                      <ChevronDown
                        size={16}
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                      />
                    </div>
                  </div>

                  {/* Results and Reset */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm text-slate-400">
                      Showing{" "}
                      <span className="font-semibold text-indigo-300">
                        {filteredAttempts.length}
                      </span>{" "}
                      of {totalAttempts} attempts
                    </p>

                    {hasActiveFilters && (
                      <button
                        type="button"
                        onClick={resetFilters}
                        className="flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
                      >
                        <RotateCcw size={15} />
                        Reset Filters
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Loading */}
              {loading && (
                <div className="flex min-h-60 flex-col items-center justify-center gap-4">
                  <div className="h-9 w-9 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />

                  <p className="text-sm text-slate-400">
                    Loading interview history...
                  </p>
                </div>
              )}

              {/* API Error */}
              {!loading && error && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400"
                >
                  {error}
                </div>
              )}

              {/* No Saved Attempts */}
              {!loading &&
                !error &&
                totalAttempts === 0 && (
                  <div className="flex min-h-72 flex-col items-center justify-center text-center">
                    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10">
                      <Database
                        size={30}
                        className="text-indigo-400"
                      />
                    </div>

                    <h3 className="text-lg font-semibold">
                      No Interview Attempts Yet
                    </h3>

                    <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
                      Your saved interview attempts, scores
                      and AI feedback will appear here.
                    </p>
                  </div>
                )}

              {/* No Matching Results */}
              {!loading &&
                !error &&
                totalAttempts > 0 &&
                filteredAttempts.length === 0 && (
                  <div className="flex min-h-64 flex-col items-center justify-center text-center">
                    <Search
                      size={36}
                      className="mb-4 text-slate-500"
                    />

                    <h3 className="text-lg font-semibold">
                      No Matching Interviews
                    </h3>

                    <p className="mt-2 text-sm text-slate-400">
                      Try changing your search or filters.
                    </p>

                    <button
                      type="button"
                      onClick={resetFilters}
                      className="mt-5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium transition hover:bg-indigo-500"
                    >
                      Clear All Filters
                    </button>
                  </div>
                )}

              {/* Paginated History Cards */}
              {!loading &&
                !error &&
                paginatedAttempts.length > 0 && (
                  <div className="space-y-4">
                    {paginatedAttempts.map((attempt) => (
                      <div
                        key={attempt.id}
                        className="rounded-xl border border-white/10 bg-[#080D1B] p-5 transition hover:border-indigo-500/30"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <h3 className="text-base font-semibold text-white">
                              {attempt.question}
                            </h3>

                            <p className="mt-2 text-xs text-slate-400">
                              {attempt.jobRole} ·{" "}
                              {attempt.experience} ·{" "}
                              {new Date(
                                attempt.createdAt
                              ).toLocaleDateString("en-IN", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })}
                            </p>
                          </div>

                          <span className="shrink-0 rounded-lg bg-indigo-500/15 px-3 py-1.5 text-sm font-semibold text-indigo-300">
                            {attempt.score}/10
                          </span>
                        </div>

                        {/* Score Progress */}
                        <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-700">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
                            style={{
                              width: `${Math.min(
                                100,
                                Math.max(
                                  0,
                                  attempt.score * 10
                                )
                              )}%`,
                            }}
                          />
                        </div>

                        {/* Short Feedback */}
                        <p className="mt-4 line-clamp-2 text-sm leading-6 text-slate-400">
                          {attempt.feedback}
                        </p>

                        {/* Expand / Collapse */}
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedAttemptId(
                              expandedAttemptId === attempt.id
                                ? null
                                : attempt.id
                            )
                          }
                          aria-expanded={
                            expandedAttemptId === attempt.id
                          }
                          className="mt-4 flex items-center gap-2 text-sm font-medium text-indigo-400 transition hover:text-indigo-300"
                        >
                          {expandedAttemptId === attempt.id ? (
                            <>
                              Hide Evaluation
                              <ChevronUp size={16} />
                            </>
                          ) : (
                            <>
                              View Evaluation
                              <ChevronDown size={16} />
                            </>
                          )}
                        </button>

                        {/* Evaluation Details */}
                        {expandedAttemptId === attempt.id && (
                          <div className="mt-5 space-y-5 border-t border-white/10 pt-5">
                            {/* Candidate Answer */}
                            <div>
                              <h4 className="mb-2 text-sm font-semibold text-white">
                                Your Answer
                              </h4>

                              <p className="whitespace-pre-wrap rounded-xl bg-[#111A2E] p-4 text-sm leading-6 text-slate-300">
                                {attempt.answer}
                              </p>
                            </div>

                            {/* Strengths */}
                            <div>
                              <h4 className="mb-2 text-sm font-semibold text-emerald-400">
                                Strengths
                              </h4>

                              <ul className="space-y-2 text-sm text-slate-300">
                                {attempt.strengths.map(
                                  (strength, index) => (
                                    <li
                                      key={index}
                                      className="flex items-start gap-2"
                                    >
                                      <span className="text-emerald-400">
                                        ✓
                                      </span>
                                      <span>{strength}</span>
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>

                            {/* Missing Points */}
                            <div>
                              <h4 className="mb-2 text-sm font-semibold text-amber-400">
                                Missing Points
                              </h4>

                              <ul className="space-y-2 text-sm text-slate-300">
                                {attempt.missingPoints.map(
                                  (point, index) => (
                                    <li
                                      key={index}
                                      className="flex items-start gap-2"
                                    >
                                      <span className="text-amber-400">
                                        •
                                      </span>
                                      <span>{point}</span>
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>

                            {/* AI Feedback */}
                            <div>
                              <h4 className="mb-2 text-sm font-semibold text-indigo-400">
                                AI Feedback
                              </h4>

                              <p className="whitespace-pre-wrap text-sm leading-6 text-slate-300">
                                {attempt.feedback}
                              </p>
                            </div>

                            {/* Suggested Answer */}
                            <div>
                              <h4 className="mb-2 text-sm font-semibold text-violet-400">
                                Suggested Answer
                              </h4>

                              <p className="whitespace-pre-wrap rounded-xl border border-violet-500/20 bg-violet-500/5 p-4 text-sm leading-6 text-slate-300">
                                {attempt.suggestedAnswer}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

              {/* Pagination */}
              {!loading &&
                !error &&
                filteredAttempts.length > 0 && (
                  <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
                    <p className="text-sm text-slate-400">
                      Showing{" "}
                      <span className="text-white">
                        {startIndex + 1}–
                        {Math.min(
                          startIndex + PAGE_SIZE,
                          filteredAttempts.length
                        )}
                      </span>{" "}
                      of {filteredAttempts.length}
                    </p>

                    {totalPages > 1 && (
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            changePage(safePage - 1)
                          }
                          disabled={safePage === 1}
                          aria-label="Previous page"
                          className="rounded-lg border border-white/10 bg-[#080D1B] p-2 text-slate-300 transition hover:border-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <ChevronLeft size={18} />
                        </button>

                        {Array.from(
                          { length: totalPages },
                          (_, index) => index + 1
                        ).map((page) => (
                          <button
                            key={page}
                            type="button"
                            onClick={() => changePage(page)}
                            aria-label={`Page ${page}`}
                            aria-current={
                              safePage === page
                                ? "page"
                                : undefined
                            }
                            className={`h-9 min-w-9 rounded-lg px-2 text-sm font-medium transition ${
                              safePage === page
                                ? "bg-indigo-600 text-white"
                                : "border border-white/10 bg-[#080D1B] text-slate-400 hover:text-white"
                            }`}
                          >
                            {page}
                          </button>
                        ))}

                        <button
                          type="button"
                          onClick={() =>
                            changePage(safePage + 1)
                          }
                          disabled={safePage === totalPages}
                          aria-label="Next page"
                          className="rounded-lg border border-white/10 bg-[#080D1B] p-2 text-slate-300 transition hover:border-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <ChevronRight size={18} />
                        </button>
                      </div>
                    )}
                  </div>
                )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
