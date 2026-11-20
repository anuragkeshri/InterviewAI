import {
  BrainCircuit,
  LayoutDashboard,
  // WandSparkles,
  History,
  Settings,
  CircleHelp,
  ChevronsUpDown,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/" },
  // { label: "Generate Questions", icon: WandSparkles, path: "/generate" },
  { label: "Mock Interview", icon: BrainCircuit, path: "/mock-interview" },
  { label: "History", icon: History, path: "/history" },
];

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
          const Icon = item.icon;

          return (
            <NavLink
              key={item.label}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "border border-indigo-500/20 bg-indigo-500/15 text-indigo-300"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <Icon size={19} />
              {item.label}
            </NavLink>
          );
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
            <p className="text-xs text-slate-500">Free Plan</p>
          </div>

          <ChevronsUpDown size={16} className="text-slate-500" />
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
