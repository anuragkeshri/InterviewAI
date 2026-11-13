
// import {
//   LayoutDashboard,
//   Sparkles,
//   History,
//   Settings,
//   HelpCircle,
//   Bot,
// } from 'lucide-react'

// function Sidebar() {
//   return (
//     <aside className="flex min-h-screen w-64 flex-col border-r border-slate-200 bg-white p-5">

//       {/* Logo */}
//       <div className="mb-10 flex items-center gap-3">
//         <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
//           <Bot size={24} />
//         </div>

//         <div>
//           <h2 className="text-lg font-bold text-slate-900">
//             InterviewAI
//           </h2>
//           <p className="text-xs text-slate-500">
//             Smart Interview Platform
//           </p>
//         </div>
//       </div>

//       {/* Navigation */}
//       <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
//         Workspace
//       </p>

//       <nav className="flex flex-col gap-2">
//         <a href="#" className="flex items-center gap-3 rounded-xl bg-indigo-50 px-4 py-3 font-medium text-indigo-600">
//           <LayoutDashboard size={19} />
//           Dashboard
//         </a>

//         <a href="#" className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-600 transition hover:bg-slate-100">
//           <Sparkles size={19} />
//           Generate Questions
//         </a>

//         <a href="#" className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-600 transition hover:bg-slate-100">
//           <History size={19} />
//           History
//         </a>
//       </nav>

//       {/* Bottom Navigation */}
//       <div className="mt-auto flex flex-col gap-2 border-t border-slate-200 pt-5">
//         <a href="#" className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-600 hover:bg-slate-100">
//           <Settings size={19} />
//           Settings
//         </a>

//         <a href="#" className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-600 hover:bg-slate-100">
//           <HelpCircle size={19} />
//           Help & Support
//         </a>
//       </div>

//     </aside>
//   )
// }

// export default Sidebar



import {
  BrainCircuit,
  LayoutDashboard,
  WandSparkles,
  History,
  Settings,
  CircleHelp,
  ChevronsUpDown,
} from 'lucide-react'

const menuItems = [
  { label: 'Dashboard', icon: LayoutDashboard, active: true },
  { label: 'Generate Questions', icon: WandSparkles, active: false },
  { label: 'History', icon: History, active: false },
]

function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-white/10 bg-[#0B1222] px-4 py-6 lg:flex">

      {/* Brand */}
      <div className="mb-12 flex items-center gap-3 px-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-700 shadow-lg shadow-indigo-500/20">
          <BrainCircuit size={25} className="text-white" />
        </div>

        <div>
          <h2 className="text-lg font-bold tracking-tight text-white">
            InterviewAI
          </h2>
          <p className="text-[10px] tracking-wider text-slate-500">
            INTELLIGENT WORKSPACE
          </p>
        </div>
      </div>

      {/* Navigation */}
      <p className="mb-4 px-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
        Workspace
      </p>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon

          return (
            <div
              key={item.label}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                item.active
                  ? 'border border-indigo-500/20 bg-indigo-500/15 text-indigo-300'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon size={19} />
              {item.label}
            </div>
          )
        })}
      </nav>

      {/* Bottom Area */}
      <div className="mt-auto space-y-5">

        <div className="space-y-1 border-t border-white/10 pt-5">
          <div className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 hover:bg-white/5 hover:text-white">
            <Settings size={19} />
            Settings
          </div>

          <div className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 hover:bg-white/5 hover:text-white">
            <CircleHelp size={19} />
            Help & Support
          </div>
        </div>

        {/* Workspace Profile */}
        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white">
            AK
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-white">
              My Workspace
            </p>
            <p className="text-xs text-slate-500">
              Free Plan
            </p>
          </div>

          <ChevronsUpDown size={16} className="text-slate-500" />
        </div>

      </div>
    </aside>
  )
}

export default Sidebar
