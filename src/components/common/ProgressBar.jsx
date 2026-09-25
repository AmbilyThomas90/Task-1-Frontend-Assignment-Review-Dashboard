export default function ProgressBar({ value, label, tone = "gold", size = "md" }) {
  const pct = Math.max(0, Math.min(100, value));

  const toneClasses = {
    gold: "bg-gold-500",
    good: "bg-good-600",
    ink: "bg-ink-700",
  }[tone];

  const height = size === "sm" ? "h-1.5" : "h-2.5";

  return (
    <div className="w-full">
      {label && (
        <div className="mb-1.5 flex items-center justify-between text-xs">
          <span className="text-slate-500">{label}</span>
          <span className="font-medium text-ink-900">{pct}%</span>
        </div>
      )}
      <div className={`w-full ${height} rounded-full bg-ink-900/8 overflow-hidden`}>
        <div
          className={`${height} ${toneClasses} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}
