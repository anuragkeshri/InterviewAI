// import { Bell, Search, ChevronDown } from "lucide-react";

// function Header() {
//   return (
//     <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8">
//       {/* Page Title */}
//       <div>
//         <h1 className="text-xl font-bold text-slate-900">Dashboard</h1>
//         <p className="text-sm text-slate-500">
//           Welcome back! Let's create something amazing.
//         </p>
//       </div>

//       {/* Right Section */}
//       <div className="flex items-center gap-5">
//         {/* Search */}
//         <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
//           <Search size={18} className="text-slate-400" />
//           <input
//             type="text"
//             placeholder="Search..."
//             className="w-36 bg-transparent text-sm outline-none"
//           />
//         </div>

//         {/* Notification */}
//         <button className="relative rounded-xl p-2 text-slate-600 transition hover:bg-slate-100">
//           <Bell size={21} />
//           <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
//         </button>

//         {/* Profile */}
//         <button className="flex items-center gap-2">
//           <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-600">
//             AK
//           </div>
//           <ChevronDown size={16} className="text-slate-500" />
//         </button>
//       </div>
//     </header>
//   );
// }

// export default Header;



import {
  Bell,
  Search,
  ChevronDown,
  Sparkles,
} from 'lucide-react'

function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-[#0B1222]/90 px-6 py-5 backdrop-blur-xl lg:px-8">

      <div className="flex flex-wrap items-center justify-between gap-5">

        {/* Page Title */}
        <div>
          <p className="mb-1 text-xs text-slate-500">
            Workspace / Dashboard
          </p>

          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Overview
            </h1>
            <Sparkles size={20} className="text-violet-400" />
          </div>

          <p className="mt-1 text-sm text-slate-400">
            Your AI-powered interview workspace
          </p>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">

          {/* Search */}
          <div className="hidden items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 md:flex">
            <Search size={18} className="text-slate-400" />

            <input
              type="text"
              placeholder="Search your workspace..."
              className="w-48 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
            />

            <span className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs text-slate-500">
              Ctrl K
            </span>
          </div>

          {/* Notifications */}
          <button
            type="button"
            aria-label="Notifications"
            className="relative rounded-xl border border-white/10 bg-white/5 p-3 text-slate-300 transition hover:bg-white/10"
          >
            <Bell size={19} />
          </button>

          {/* Profile */}
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-semibold text-white">
              AK
            </div>

            <ChevronDown
              size={16}
              className="hidden text-slate-400 sm:block"
            />
          </div>

        </div>
      </div>
    </header>
  )
}

export default Header
