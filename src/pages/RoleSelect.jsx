import { GraduationCap, ShieldCheck, User } from "lucide-react";
import { useApp } from "../context/AppContext";

export default function RoleSelect() {
  const { users, login } = useApp();
  const students = users.filter((u) => u.role === "student");
  const admins = users.filter((u) => u.role === "admin");

  return (
    <div className="min-h-screen bg-ink-950 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <span className="inline-grid h-12 w-12 place-items-center rounded-xl bg-gold-500 text-ink-950 mb-4">
            <GraduationCap size={24} />
          </span>
          <h1 className="font-display text-2xl font-semibold text-paper-50">Coursework</h1>
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
              <UserRow key={a.id} user={a} onClick={() => login(a.id)} />
            ))}
          </div>

          <p className="mb-2.5 flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-paper-50/40">
            <User size={14} />
            Students
          </p>
          <div className="space-y-2">
            {students.map((s) => (
              <UserRow key={s.id} user={s} onClick={() => login(s.id)} />
            ))}
          </div>
        </div>

        <p className="mt-5 text-center text-xs text-paper-50/40">
          Demo mode — data is simulated and stored in your browser's local storage.
        </p>
      </div>
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
      <span className="text-sm font-medium text-paper-50">{user.name}</span>
    </button>
  );
}
