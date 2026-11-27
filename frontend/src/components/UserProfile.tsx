import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { LogOut, UserRound } from "lucide-react";

export default function UserProfile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="flex items-center gap-4">

      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-400">
        <UserRound size={20} />
      </div>

      <div className="hidden sm:block">
        <p className="text-sm font-semibold text-white">
          {user?.full_name}
        </p>

        <p className="text-xs text-slate-400">
          {user?.email}
        </p>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-400 transition-all hover:bg-red-500/20"
      >
        <LogOut size={17} />
        Logout
      </button>

    </div>
  );
}