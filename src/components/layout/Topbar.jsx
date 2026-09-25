import { Menu } from "lucide-react";

export default function Topbar({ title, subtitle, onMenuClick, actions }) {
  return (
    <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-ink-900/8 bg-paper-50/90 backdrop-blur px-4 sm:px-8 h-16">
      <button
        onClick={onMenuClick}
        className="lg:hidden shrink-0 rounded-lg p-2 text-ink-900 hover:bg-ink-900/5"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>
      <div className="min-w-0 flex-1">
        <h1 className="font-display text-base sm:text-lg font-semibold text-ink-900 truncate">
          {title}
        </h1>
        {subtitle && <p className="text-xs text-slate-500 truncate">{subtitle}</p>}
      </div>
      {actions}
    </header>
  );
}
