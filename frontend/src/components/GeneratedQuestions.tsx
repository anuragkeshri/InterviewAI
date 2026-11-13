
// import { Sparkles } from "lucide-react";

// const sampleQuestions = [
//   "What is the Virtual DOM in React?",
//   "Explain the difference between props and state.",
//   "What is the purpose of Redux?",
//   "What are React Hooks?",
//   "How does useEffect work in React?",
// ];

// export default function GeneratedQuestions() {
//   return (
//     <section className="rounded-3xl border border-white/10 bg-[#111A2E] p-6 lg:p-8">
//       <div className="mb-6 flex items-center gap-3">
//         <div className="rounded-xl bg-violet-500/10 p-3">
//           <Sparkles
//             className="text-violet-400"
//             size={22}
//           />
//         </div>

//         <div>
//           <h2 className="text-xl font-bold text-white">
//             Generated Interview Questions
//           </h2>

//           <p className="text-sm text-slate-400">
//             Your interview questions will appear here
//           </p>
//         </div>
//       </div>

//       <div className="space-y-4">
//         {sampleQuestions.map((question, index) => (
//           <div
//             key={index}
//             className="rounded-2xl border border-white/10 bg-[#0B1222] p-5 transition hover:border-violet-500/30"
//           >
//             <div className="mb-3 flex items-center gap-3">
//               <span className="rounded-lg bg-violet-500/10 px-3 py-2 text-xs font-semibold text-violet-300">
//                 Q{index + 1}
//               </span>

//               <span className="text-xs text-slate-400">
//                 Interview Question
//               </span>
//             </div>

//             <p className="font-medium leading-relaxed text-white">
//               {question}
//             </p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }


// import { Sparkles } from "lucide-react";

// type GeneratedQuestionsProps = {
//   questions: string[];
// };

// export default function GeneratedQuestions({
//   questions,
// }: GeneratedQuestionsProps) {
//   return (
//     <section className="rounded-3xl border border-white/10 bg-[#111A2E] p-6 lg:p-8">
//       <div className="mb-6 flex items-center gap-3">
//         <div className="rounded-xl bg-violet-500/10 p-3">
//           <Sparkles className="text-violet-400" size={22} />
//         </div>

//         <div>
//           <h2 className="text-xl font-bold text-white">
//             Generated Interview Questions
//           </h2>
//           <p className="text-sm text-slate-400">
//             {questions.length} questions generated successfully
//           </p>
//         </div>
//       </div>

//       <div className="space-y-4">
//         {questions.map((question, index) => (
//           <div
//             key={index}
//             className="rounded-2xl border border-white/10 bg-[#0B1222] p-5 transition hover:border-violet-500/30"
//           >
//             <div className="mb-3 flex items-center gap-3">
//               <span className="rounded-lg bg-violet-500/10 px-3 py-2 text-xs font-semibold text-violet-300">
//                 Q{index + 1}
//               </span>
//               <span className="text-xs text-slate-400">
//                 Interview Question
//               </span>
//             </div>

//             <p className="font-medium leading-relaxed text-white">
//               {question}
//             </p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }



import { useState } from "react";
import { Check, Copy, Sparkles } from "lucide-react";

type GeneratedQuestionsProps = {
  questions: string[];
};

export default function GeneratedQuestions({
  questions,
}: GeneratedQuestionsProps) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState("");

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
          </div>
        ))}
      </div>
    </div>
  );
}
