
import {
  Bell,
  Search,
  Sparkles,
  LogOut,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Generate initials from logged-in user's name
  const initials =
    user?.full_name
      ?.trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((name) => name.charAt(0))
      .join("")
      .toUpperCase() || "U";

  // Logout functionality
  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

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

            <Sparkles
              size={20}
              className="text-violet-400"
            />
          </div>

          <p className="mt-1 text-sm text-slate-400">
            Your AI-powered interview workspace
          </p>
        </div>

        {/* Right Actions */}
        <div className="flex flex-wrap items-center gap-4">

          {/* Search */}
          <div className="hidden items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 xl:flex">

            <Search
              size={18}
              className="text-slate-400"
            />

            <input
              type="text"
              placeholder="Search your workspace..."
              className="w-40 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
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

          {/* Divider */}
          <div className="hidden h-10 w-px bg-white/10 sm:block" />

          {/* Logged-in User Profile */}
          <div className="flex items-center gap-3">

            {/* Dynamic Avatar */}
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20">
              {initials}
            </div>

            {/* User Details */}
            <div className="hidden max-w-[180px] sm:block">

              <p className="truncate text-sm font-semibold text-white">
                {user?.full_name || "User"}
              </p>

              <p className="mt-0.5 truncate text-xs text-slate-400">
                {user?.email}
              </p>

            </div>
          </div>

          {/* Logout Button */}
          <button
            type="button"
            onClick={handleLogout}
            title="Logout"
            aria-label="Logout"
            className="group flex items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-400 transition-all duration-200 hover:border-red-500/40 hover:bg-red-500/20 active:scale-95"
          >
            <LogOut
              size={18}
              className="transition-transform group-hover:translate-x-0.5"
            />

            <span className="hidden sm:inline">
              Logout
            </span>
          </button>

        </div>
      </div>
    </header>
  );
}

export default Header;
