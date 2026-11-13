// import {
//   Sparkles,
//   ArrowUpRight,
//   WandSparkles,

//   Zap,
// } from "lucide-react";
// import AIOrb from "./three/AIOrb";

// function DashboardHero() {
//   return (
//     <div className="relative isolate overflow-hidden rounded-3xl border border-indigo-400/20 bg-gradient-to-br from-[#171B3D] via-[#11172E] to-[#0E1528] p-7 shadow-2xl shadow-indigo-950/20 lg:p-10">
//       {/* Background Glow */}
//       <div className="pointer-events-none absolute -right-20 -top-28 h-80 w-80 rounded-full bg-violet-600/20 blur-[100px]" />
//       <div className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-indigo-500/10 blur-[100px]" />

//       <div className="relative z-10 grid items-center gap-10 lg:grid-cols-2">
//         {/* Left Content */}
//         <div>
//           <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-4 py-2 text-xs font-medium text-violet-300">
//             <Sparkles size={15} />
//             YOUR INTELLIGENT INTERVIEW ASSISTANT
//           </div>

//           <h2 className="max-w-xl text-4xl font-bold leading-tight tracking-tight text-white lg:text-5xl">
//             Hire smarter.
//             <span className="block bg-gradient-to-r from-indigo-300 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
//               Create with AI.
//             </span>
//           </h2>

//           <p className="mt-6 max-w-lg text-base leading-7 text-slate-400">
//             Transform interview preparation with intelligent, role-specific
//             questions tailored to every candidate. Generate, customize, and
//             evaluate with confidence.
//           </p>

//           <div className="mt-8 flex flex-wrap items-center gap-3">
//             <a
//               href="#question-generator"
//               className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:brightness-110"
//             >
//               <WandSparkles size={18} />
//               Generate Questions
//               <ArrowUpRight size={17} />
//             </a>

//             <a
//               href="#how-it-works"
//               className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-medium text-slate-300 transition hover:bg-white/10"
//             >
//               How it works
//             </a>
//           </div>

//           <div className="mt-10 flex flex-wrap gap-5 text-xs text-slate-400">
//             <span className="flex items-center gap-2">
//               <Zap size={15} className="text-amber-400" />
//               Instant Generation
//             </span>
//             <span className="flex items-center gap-2">
//               <Sparkles size={15} className="text-violet-400" />
//               AI-Powered
//             </span>
//           </div>
//         </div>

//         {/* Right Visual */}
//         <div className="relative mx-auto flex w-full max-w-sm items-center justify-center">
//           <div className="absolute h-64 w-64 rounded-full border border-indigo-400/15" />
//           <div className="absolute h-48 w-48 rounded-full border border-violet-400/20" />
//           <div className="absolute h-32 w-32 rounded-full bg-indigo-500/15 blur-3xl" />

//           <div className="relative flex h-40 w-40 items-center justify-center rounded-[2.5rem] border border-indigo-400/30 bg-gradient-to-br from-indigo-500/30 to-violet-600/10 shadow-[0_0_80px_rgba(99,102,241,0.2)]">
//             <BrainCircuit
//               size={85}
//               strokeWidth={1.2}
//               className="text-indigo-200"
//             />
//           </div>

//           <div className="absolute -bottom-8 right-0 flex items-center gap-2 rounded-xl border border-white/10 bg-[#1B2442]/90 px-4 py-3 shadow-xl backdrop-blur-xl">
//             <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
//             <span className="text-xs font-medium text-slate-200">
//               AI Engine Ready
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DashboardHero;


import {
  Sparkles,
  ArrowUpRight,
  WandSparkles,
  Zap,
} from "lucide-react";

import AIOrb from "./three/AIOrb";

function DashboardHero() {
  return (
    <div className="relative isolate overflow-hidden rounded-3xl border border-indigo-400/20 bg-gradient-to-br from-[#171B3D] via-[#11172E] to-[#0E1528] p-7 shadow-2xl shadow-indigo-950/20 lg:p-10">

      {/* Background Glow */}
      <div className="pointer-events-none absolute -right-20 -top-28 h-80 w-80 rounded-full bg-violet-600/20 blur-[100px]" />

      <div className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-indigo-500/10 blur-[100px]" />

      {/* Main Hero Layout */}
      <div className="relative z-10 grid items-center gap-10 lg:grid-cols-2">

        {/* LEFT CONTENT */}
        <div>

          {/* Top Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-4 py-2 text-xs font-medium text-violet-300">
            <Sparkles size={15} />
            YOUR INTELLIGENT INTERVIEW ASSISTANT
          </div>

          {/* Heading */}
          <h2 className="max-w-xl text-4xl font-bold leading-tight tracking-tight text-white lg:text-5xl">
            Hire smarter.

            <span className="block bg-gradient-to-r from-indigo-300 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
              Create with AI.
            </span>
          </h2>

          {/* Description */}
          <p className="mt-6 max-w-lg text-base leading-7 text-slate-400">
            Transform interview preparation with intelligent,
            role-specific questions tailored to every candidate.
            Generate, customize, and evaluate with confidence.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-3">

            <a
              href="#question-generator"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:brightness-110"
            >
              <WandSparkles size={18} />
              Generate Questions
              <ArrowUpRight size={17} />
            </a>

            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-medium text-slate-300 transition hover:bg-white/10"
            >
              How it works
            </a>

          </div>

          {/* Features */}
          <div className="mt-10 flex flex-wrap gap-5 text-xs text-slate-400">

            <span className="flex items-center gap-2">
              <Zap size={15} className="text-amber-400" />
              Instant Generation
            </span>

            <span className="flex items-center gap-2">
              <Sparkles size={15} className="text-violet-400" />
              AI-Powered
            </span>

          </div>
        </div>

        {/* RIGHT CONTENT - THREE.JS AI ORB */}
        <div className="relative mx-auto flex h-[350px] w-full max-w-md items-center justify-center">

          {/* Purple Glow */}
          {/* <div className="pointer-events-none absolute h-72 w-72 rounded-full bg-violet-600/20 blur-[90px]" /> */}
<div className="pointer-events-none absolute h-72 w-72 rounded-full bg-orange-500/10 blur-[100px]" />
          {/* Outer Decorative Ring */}
          <div className="pointer-events-none absolute h-72 w-72 rounded-full border border-indigo-400/10" />

          {/* Inner Decorative Ring */}
          <div className="pointer-events-none absolute h-56 w-56 rounded-full border border-violet-400/15" />

          {/* Three.js Animated Orb */}
          <div className="relative z-10 h-full w-full">
            <AIOrb />
          </div>

          {/* AI Engine Status */}
          <div className="pointer-events-none absolute bottom-4 right-2 z-20 flex items-center gap-2 rounded-xl border border-white/10 bg-[#1B2442]/90 px-4 py-3 shadow-xl backdrop-blur-xl">

            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />

            <span className="text-xs font-medium text-slate-200">
              AI Engine Ready
            </span>

          </div>
        </div>

      </div>
    </div>
  );
}

export default DashboardHero;

