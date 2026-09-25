import { useEffect } from "react";
import { X } from "lucide-react";

export default function Modal({ open, onClose, title, children, maxWidth = "max-w-md" }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4">
      <div
        className="absolute inset-0 bg-ink-950/50 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`relative w-full ${maxWidth} rounded-t-2xl sm:rounded-2xl bg-paper-50 border border-ink-900/10 shadow-xl p-6 animate-[modal-in_0.18s_ease-out]`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <h3 id="modal-title" className="font-display text-lg font-semibold text-ink-900">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="shrink-0 rounded-full p-1 text-slate-500 hover:bg-ink-900/5 hover:text-ink-900 transition-colors"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
