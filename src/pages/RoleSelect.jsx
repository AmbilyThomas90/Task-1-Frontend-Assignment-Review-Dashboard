import {
  GraduationCap,
  ShieldCheck,
  User,
  X,
  LockKeyhole,
  AlertCircle,
  
} from "lucide-react";
import { useState } from "react";
import { useApp } from "../context/AppContext";

export default function RoleSelect() {
  const { users, login } = useApp();   // Get users list 

  const students = users.filter((u) => u.role === "student");   // Get only users whose role is "student"
  const admins = users.filter((u) => u.role === "admin");        // Get only users whose role is "admin"

  // Secret login codes
  const ADMIN_CODE = "ADMIN2026";
  const STUDENT_CODE = "STUDENT2026";

  // Popup state
  const [selectedUser, setSelectedUser] = useState(null);
  const [secretCode, setSecretCode] = useState("");
  const [error, setError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = (user) => {
    setSelectedUser(user);
    setSecretCode("");
    setError("");
    setIsLoggingIn(false);
  };

  const closePopup = () => {
    if (isLoggingIn) return;

    setSelectedUser(null);
    setSecretCode("");
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLoggingIn) return;

    const correctCode =
      selectedUser.role === "admin"
        ? ADMIN_CODE
        : STUDENT_CODE;

    if (secretCode === correctCode) {
      setIsLoggingIn(true);
      setError("");

      // Show spinner before moving to dashboard
      setTimeout(() => {
        login(selectedUser.id);
        closePopup();
      }, 800);
    } else {
      setError("Incorrect secret code. Please try again.");
      setSecretCode("");
    }
  };

  return (
    <div className="min-h-screen bg-ink-950 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <span className="inline-grid h-12 w-12 place-items-center rounded-xl bg-gold-500 text-ink-950 mb-4">
            <GraduationCap size={24} />
          </span>

          <h1 className="font-display text-2xl font-semibold text-paper-50">
            Coursework
          </h1>

          <p className="mt-1.5 text-sm text-paper-50/60">
            Assignment &amp; review dashboard — choose who you're signing in as.
          </p>
        </div>

        <div className="rounded-2xl border border-paper-50/10 bg-paper-50/5 p-5">
          <p className="mb-2.5 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-paper-50/40">
            <ShieldCheck size={14} />
            Admin
          </p>

          <div className="space-y-2 mb-5">
            {admins.map((a) => (
              <UserRow
                key={a.id}
                user={a}
                onClick={() => handleLogin(a)}
              />
            ))}
          </div>

          <p className="mb-2.5 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-paper-50/40">
            <User size={14} />
            Students
          </p>

          <div className="space-y-2">
            {students.map((s) => (
              <UserRow
                key={s.id}
                user={s}
                onClick={() => handleLogin(s)}
              />
            ))}
          </div>
        </div>

        <p className="mt-5 text-center text-xs text-paper-50/40">
          Student Management System — Simple, secure, and easy to manage.
        </p>
      </div>

      {/* Login Popup */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border border-paper-50/10 bg-ink-950 p-6 shadow-2xl">

            {/* Popup Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gold-500/15 text-gold-500">
                  <LockKeyhole size={21} />
                </span>

                <div>
                  <h2 className="text-lg font-semibold text-paper-50">
                    User Login
                  </h2>

                  <p className="text-xs text-paper-50/50 mt-0.5">
                    {selectedUser.role === "admin"
                      ? "Admin access"
                      : "Student access"}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={closePopup}
                disabled={isLoggingIn}
                className="grid h-8 w-8 place-items-center rounded-lg text-paper-50/50 hover:bg-paper-50/10 hover:text-paper-50 transition-colors disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Close login popup"
              >
                <X size={18} />
              </button>
            </div>

            {/* User Information */}
            <div className="mt-5 flex items-center gap-3 rounded-xl border border-paper-50/10 bg-paper-50/5 p-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-gold-500/15 text-sm font-semibold text-gold-500">
                {selectedUser.initials}
              </span>

              <div>
                <p className="text-sm font-medium text-paper-50">
                  {selectedUser.name}
                </p>

                <p className="text-xs text-paper-50/40 capitalize">
                  {selectedUser.role}
                </p>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="mt-5">
              <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-paper-50/50">
                Secret Code
              </label>

              <input
                type="password"
                value={secretCode}
                disabled={isLoggingIn}
                onChange={(e) => {
                  setSecretCode(e.target.value);
                  setError("");
                }}
                placeholder="Enter secret code"
                autoFocus
                className={`w-full rounded-lg border bg-paper-50/5 px-3.5 py-3 text-sm text-paper-50 outline-none placeholder:text-paper-50/30 transition-colors ${
                  error
                    ? "border-red-500/60 focus:border-red-500"
                    : "border-paper-50/10 focus:border-gold-500"
                }`}
              />

              {/* Error Popup Message */}
              {error && (
                <div className="mt-3 flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2.5">
                  <AlertCircle
                    size={15}
                    className="shrink-0 text-red-400"
                  />

                  <p className="text-xs text-red-400">
                    {error}
                  </p>
                </div>
              )}

              {/* Buttons */}
              <div className="mt-5 flex gap-2">
                <button
                  type="button"
                  onClick={closePopup}
                  disabled={isLoggingIn}
                  className="flex-1 rounded-lg border border-paper-50/10 bg-paper-50/5 px-4 py-2.5 text-sm font-medium text-paper-50/70 transition-colors hover:bg-paper-50/10 hover:text-paper-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={!secretCode.trim() || isLoggingIn}
                  className="flex-1 rounded-lg bg-gold-500 px-4 py-2.5 text-sm font-semibold text-ink-950 transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {isLoggingIn ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-600 border-t-blue-500"></div>
                      Signing In...
                    </span>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function UserRow({ user, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-lg border border-paper-50/10 bg-paper-50/5 px-3.5 py-2.5 text-left hover:bg-paper-50/10 hover:border-paper-50/20 transition-colors"
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold-500/15 text-sm font-semibold text-gold-500">
        {user.initials}
      </span>

      <span className="text-sm font-medium text-paper-50">
        {user.name}
      </span>
    </button>
  );
}