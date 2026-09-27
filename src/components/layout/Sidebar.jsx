import { LayoutGrid, LogOut, X, GraduationCap } from "lucide-react";
import { useApp } from "../../context/AppContext";
// SIDEBAR COMPONENT
export default function Sidebar({ open, onClose }) {
  const { currentUser, logout } = useApp();

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-ink-950/40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={`fixed z-40 inset-y-0 left-0 w-64 bg-ink-900 text-paper-50 flex flex-col transition-transform duration-200 ease-out
          lg:static lg:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-5 h-16 border-b border-paper-50/10">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gold-500 text-ink-950">
              <GraduationCap size={18} />
            </span>
            <span className="font-display font-semibold tracking-tight">Coursework</span>
          </div>
          <button className="lg:hidden text-paper-50/70" onClick={onClose} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-5 space-y-1">
          <div className="flex items-center gap-2 rounded-lg bg-paper-50/10 px-3 py-2.5 text-sm font-medium">
            <LayoutGrid size={16} className="text-gold-500" />
            {currentUser?.role === "admin" ? "Admin overview" : "My assignments"}
          </div>
        </nav>

        <div className="px-3 pb-5">
          <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 mb-2">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-paper-50/10 text-sm font-semibold">
              {currentUser?.initials}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium">{currentUser?.name}</p>
              <p className="text-xs capitalize text-paper-50/60">{currentUser?.role}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-paper-50/70 hover:bg-paper-50/10 hover:text-paper-50 transition-colors"
          >
            <LogOut size={16} />
            Switch user
          </button>
        </div>
      </aside>
    </>
  );
}
