
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LoaderCircle, BrainCircuit } from "lucide-react";

export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();

  // Wait until authentication verification completes
  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#080D1B] text-white">

        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 shadow-lg shadow-indigo-500/30">
          <BrainCircuit size={32} />
        </div>

        <LoaderCircle
          size={28}
          className="animate-spin text-indigo-400"
        />

        <h2 className="mt-5 text-lg font-semibold">
          Verifying your session
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Please wait a moment...
        </p>

      </div>
    );
  }

  // Redirect unauthenticated users
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Allow access to protected routes
  return <Outlet />;
}
