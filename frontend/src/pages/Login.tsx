// import { useState } from "react";
// import type { FormEvent } from "react";

// import {
//   BrainCircuit,
//   Mail,
//   LockKeyhole,
//   Eye,
//   EyeOff,
//   ArrowRight,
//   Sparkles,
//   ShieldCheck,
//   ChartNoAxesCombined,
//   LoaderCircle,
//   AlertCircle,
// } from "lucide-react";
// import { Link, useNavigate, useLocation } from "react-router-dom";

// export default function Login() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const location = useLocation();
//   const successMessage = location.state?.message;
//   const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     setError("");

//     if (!email.trim() || !password) {
//       setError("Please enter your email and password.");
//       return;
//     }

//     try {
//       setLoading(true);

//       const response = await fetch("http://127.0.0.1:8000/auth/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email: email.trim(),
//           password,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(
//           typeof data.detail === "string"
//             ? data.detail
//             : "Unable to login. Please check your credentials.",
//         );
//       }

//       // Store authentication details
//       sessionStorage.setItem("access_token", data.access_token);

//       sessionStorage.setItem("user", JSON.stringify(data.user));

//       // Redirect to dashboard
//       navigate("/dashboard", { replace: true });
//     } catch (err) {
//       setError(
//         err instanceof Error
//           ? err.message
//           : "Something went wrong. Please try again.",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="relative min-h-screen overflow-hidden bg-[#080D1B] text-white">
//       {/* Background Effects */}
//       <div className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-[120px]" />

//       <div className="pointer-events-none absolute -bottom-40 right-0 h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[120px]" />

//       <div className="relative grid min-h-screen lg:grid-cols-2">
//         {/* Left Section */}
//         <div className="hidden flex-col justify-between border-r border-white/5 bg-white/[0.015] p-14 lg:flex xl:p-20">
//           {/* Logo */}
//           <Link to="/" className="flex items-center gap-3">
//             <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 shadow-lg shadow-indigo-500/30">
//               <BrainCircuit size={27} />
//             </div>

//             <div>
//               <h1 className="text-2xl font-bold tracking-tight">
//                 Interview<span className="text-indigo-400">AI</span>
//               </h1>

//               <p className="text-xs text-slate-400">Your AI Interview Coach</p>
//             </div>
//           </Link>

//           {/* Hero Content */}
//           <div className="max-w-xl">
//             <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-xs font-medium text-indigo-300">
//               <Sparkles size={15} />
//               AI-Powered Interview Preparation
//             </div>

//             <h2 className="text-5xl font-bold leading-[1.15] tracking-tight xl:text-6xl">
//               Prepare smarter.
//               <br />
//               <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
//                 Interview better.
//               </span>
//             </h2>

//             <p className="mt-6 max-w-md text-lg leading-relaxed text-slate-400">
//               Build confidence with personalized interview questions,
//               intelligent feedback, and real-time performance analytics.
//             </p>

//             {/* Features */}
//             <div className="mt-10 space-y-4">
//               {[
//                 {
//                   icon: BrainCircuit,
//                   title: "AI-Powered Questions",
//                   description: "Personalized questions based on your resume.",
//                 },
//                 {
//                   icon: ShieldCheck,
//                   title: "Intelligent Evaluation",
//                   description: "Get detailed feedback on every answer.",
//                 },
//                 {
//                   icon: ChartNoAxesCombined,
//                   title: "Performance Analytics",
//                   description: "Track your progress with interactive charts.",
//                 },
//               ].map((feature) => (
//                 <div
//                   key={feature.title}
//                   className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.025] p-4"
//                 >
//                   <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
//                     <feature.icon size={21} />
//                   </div>

//                   <div>
//                     <h3 className="text-sm font-semibold">{feature.title}</h3>

//                     <p className="mt-1 text-xs text-slate-400">
//                       {feature.description}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <p className="mt-10 text-sm text-slate-500">
//             © {new Date().getFullYear()} InterviewAI. Built for your next
//             opportunity.
//           </p>
//         </div>

//         {/* Right Section */}
//         <div className="flex min-h-screen items-center justify-center px-6 py-12 sm:px-12">
//           <div className="w-full max-w-md">
//             {/* Mobile Logo */}
//             <Link to="/" className="mb-10 flex items-center gap-3 lg:hidden">
//               <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600">
//                 <BrainCircuit size={24} />
//               </div>

//               <span className="text-2xl font-bold">
//                 Interview<span className="text-indigo-400">AI</span>
//               </span>
//             </Link>

//             {/* Form Heading */}
//             <div className="mb-8">
//               <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
//                 Welcome back
//               </h2>

//               <p className="mt-3 text-sm leading-relaxed text-slate-400">
//                 Sign in to continue your interview preparation journey.
//               </p>
//             </div>

//             {/* Login Card */}
//             <div className="rounded-3xl border border-white/10 bg-[#111A2E]/80 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
//               {successMessage && !error && (
//                 <div
//                   role="status"
//                   className="mb-6 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-400"
//                 >
//                   {successMessage}
//                 </div>
//               )}

//               {error && (
//                 <div
//                   role="alert"
//                   className="mb-6 flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400"
//                 >
//                   <AlertCircle size={19} className="mt-0.5 shrink-0" />

//                   <span>{error}</span>
//                 </div>
//               )}

//               <form onSubmit={handleLogin} className="space-y-6">
//                 {/* Email */}
//                 <div>
//                   <label
//                     htmlFor="email"
//                     className="mb-2 block text-sm font-medium text-slate-200"
//                   >
//                     Email address
//                   </label>

//                   <div className="relative">
//                     <Mail
//                       size={19}
//                       className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
//                     />

//                     <input
//                       id="email"
//                       type="email"
//                       autoComplete="email"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       placeholder="you@example.com"
//                       required
//                       disabled={loading}
//                       className="w-full rounded-xl border border-white/10 bg-[#080D1B] py-3.5 pl-12 pr-4 text-sm text-white outline-none transition-all placeholder:text-slate-600 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
//                     />
//                   </div>
//                 </div>

//                 {/* Password */}
//                 <div>
//                   <label
//                     htmlFor="password"
//                     className="mb-2 block text-sm font-medium text-slate-200"
//                   >
//                     Password
//                   </label>

//                   <div className="relative">
//                     <LockKeyhole
//                       size={19}
//                       className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
//                     />

//                     <input
//                       id="password"
//                       type={showPassword ? "text" : "password"}
//                       autoComplete="current-password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       placeholder="Enter your password"
//                       required
//                       disabled={loading}
//                       className="w-full rounded-xl border border-white/10 bg-[#080D1B] py-3.5 pl-12 pr-12 text-sm text-white outline-none transition-all placeholder:text-slate-600 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
//                     />

//                     <button
//                       type="button"
//                       aria-label={
//                         showPassword ? "Hide password" : "Show password"
//                       }
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors hover:text-white"
//                     >
//                       {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
//                     </button>
//                   </div>
//                 </div>

//                 {/* Login Button */}
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
//                 >
//                   {loading ? (
//                     <>
//                       <LoaderCircle size={19} className="animate-spin" />
//                       Signing in...
//                     </>
//                   ) : (
//                     <>
//                       Sign In
//                       <ArrowRight size={18} />
//                     </>
//                   )}
//                 </button>
//               </form>

//               {/* Signup Link */}
//               <div className="mt-7 border-t border-white/10 pt-6 text-center">
//                 <p className="text-sm text-slate-400">
//                   Don't have an account?{" "}
//                   <Link
//                     to="/signup"
//                     className="font-semibold text-indigo-400 transition-colors hover:text-indigo-300"
//                   >
//                     Create an account
//                   </Link>
//                 </p>
//               </div>
//             </div>

//             <div className="mt-7 flex items-center justify-center gap-2 text-xs text-slate-500">
//               <ShieldCheck size={15} />
//               Passwords are securely hashed on our server.
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import { useState } from "react";
import type { FormEvent } from "react";

import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import {
  BrainCircuit,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  ChartNoAxesCombined,
  LoaderCircle,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  // AuthContext
  const { login } = useAuth();

  // Signup success message
  const successMessage = location.state?.message;

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Login API
  const handleLogin = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setError("");

    // Form validation
    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://127.0.0.1:8000/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          typeof data.detail === "string"
            ? data.detail
            : "Unable to login. Please check your credentials."
        );
      }

      if (!data.access_token || !data.user) {
        throw new Error("Invalid authentication response.");
      }

      // Update global authentication state
      login(data.access_token, data.user);

      // Redirect to Dashboard
      navigate("/dashboard", { replace: true });

    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: BrainCircuit,
      title: "AI-Powered Questions",
      description:
        "Personalized questions based on your resume.",
    },
    {
      icon: ShieldCheck,
      title: "Intelligent Evaluation",
      description:
        "Get detailed feedback on every answer.",
    },
    {
      icon: ChartNoAxesCombined,
      title: "Performance Analytics",
      description:
        "Track your progress with interactive charts.",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#080D1B] text-white">

      {/* Background Effects */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-[120px]" />

      <div className="pointer-events-none absolute -bottom-40 right-0 h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[120px]" />

      <div className="relative grid min-h-screen lg:grid-cols-2">

        {/* ================= LEFT SECTION ================= */}

        <div className="hidden flex-col justify-between border-r border-white/5 bg-white/[0.015] p-14 lg:flex xl:p-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 shadow-lg shadow-indigo-500/30">
              <BrainCircuit size={27} />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Interview
                <span className="text-indigo-400">AI</span>
              </h1>

              <p className="text-xs text-slate-400">
                Your AI Interview Coach
              </p>
            </div>
          </Link>

          {/* Hero Content */}
          <div className="max-w-xl">

            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-xs font-medium text-indigo-300">
              <Sparkles size={15} />
              AI-Powered Interview Preparation
            </div>

            <h2 className="text-5xl font-bold leading-[1.15] tracking-tight xl:text-6xl">
              Prepare smarter.
              <br />

              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Interview better.
              </span>
            </h2>

            <p className="mt-6 max-w-md text-lg leading-relaxed text-slate-400">
              Build confidence with personalized interview
              questions, intelligent feedback, and real-time
              performance analytics.
            </p>

            {/* Feature Cards */}
            <div className="mt-10 space-y-4">

              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.025] p-4 transition-all hover:border-indigo-500/20 hover:bg-indigo-500/5"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                    <feature.icon size={21} />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold">
                      {feature.title}
                    </h3>

                    <p className="mt-1 text-xs text-slate-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}

            </div>
          </div>

          {/* Footer */}
          <p className="mt-10 text-sm text-slate-500">
            © {new Date().getFullYear()} InterviewAI.
            Built for your next opportunity.
          </p>
        </div>

        {/* ================= RIGHT SECTION ================= */}

        <div className="flex min-h-screen items-center justify-center px-6 py-12 sm:px-12">

          <div className="w-full max-w-md">

            {/* Mobile Logo */}
            <Link
              to="/"
              className="mb-10 flex items-center gap-3 lg:hidden"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600">
                <BrainCircuit size={24} />
              </div>

              <span className="text-2xl font-bold">
                Interview
                <span className="text-indigo-400">AI</span>
              </span>
            </Link>

            {/* Form Heading */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Welcome back
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                Sign in to continue your interview preparation
                journey.
              </p>
            </div>

            {/* Login Card */}
            <div className="rounded-3xl border border-white/10 bg-[#111A2E]/80 p-6 shadow-2xl backdrop-blur-xl sm:p-8">

              {/* Signup Success Message */}
              {successMessage && !error && (
                <div
                  role="status"
                  className="mb-6 flex items-start gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-400"
                >
                  <CheckCircle2
                    size={19}
                    className="mt-0.5 shrink-0"
                  />

                  <span>{successMessage}</span>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div
                  role="alert"
                  className="mb-6 flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400"
                >
                  <AlertCircle
                    size={19}
                    className="mt-0.5 shrink-0"
                  />

                  <span>{error}</span>
                </div>
              )}

              {/* Login Form */}
              <form
                onSubmit={handleLogin}
                className="space-y-6"
              >

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-slate-200"
                  >
                    Email address
                  </label>

                  <div className="relative">
                    <Mail
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                    />

                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      placeholder="you@example.com"
                      required
                      disabled={loading}
                      className="w-full rounded-xl border border-white/10 bg-[#080D1B] py-3.5 pl-12 pr-4 text-sm text-white outline-none transition-all placeholder:text-slate-600 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 disabled:opacity-60"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-slate-200"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <LockKeyhole
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                    />

                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                      placeholder="Enter your password"
                      required
                      maxLength={128}
                      disabled={loading}
                      className="w-full rounded-xl border border-white/10 bg-[#080D1B] py-3.5 pl-12 pr-12 text-sm text-white outline-none transition-all placeholder:text-slate-600 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 disabled:opacity-60"
                    />

                    {/* Show / Hide Password */}
                    <button
                      type="button"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                      onClick={() =>
                        setShowPassword((prev) => !prev)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors hover:text-white"
                    >
                      {showPassword ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <LoaderCircle
                        size={19}
                        className="animate-spin"
                      />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>

              {/* Signup Link */}
              <div className="mt-7 border-t border-white/10 pt-6 text-center">
                <p className="text-sm text-slate-400">
                  Don't have an account?{" "}

                  <Link
                    to="/signup"
                    className="font-semibold text-indigo-400 transition-colors hover:text-indigo-300"
                  >
                    Create an account
                  </Link>
                </p>
              </div>
            </div>

            {/* Security Information */}
            <div className="mt-7 flex items-center justify-center gap-2 text-xs text-slate-500">
              <ShieldCheck size={15} />
              Passwords are securely hashed on our server.
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
