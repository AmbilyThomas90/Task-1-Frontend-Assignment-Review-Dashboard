import { useState } from "react";
import { CalendarDays, ExternalLink, RotateCcw } from "lucide-react";
import Badge from "../common/Badge";
import ConfirmSubmitFlow from "./ConfirmSubmitFlow";
import { useApp } from "../../context/AppContext";

function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
}

function isOverdue(dueDate, status) {
  return status !== "submitted" && new Date(dueDate) < new Date();
}

export default function AssignmentCard({ assignment, submission }) {
  const { setSubmissionStatus } = useApp();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const status = submission?.status || "not_submitted";
  const overdue = isOverdue(assignment.dueDate, status);

  return (
    <div className="rounded-xl border border-ink-900/10 bg-white p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-display font-semibold text-ink-900 leading-snug">{assignment.title}</h3>
          <p className="mt-1 text-sm text-slate-500 line-clamp-2">{assignment.description}</p>
        </div>
        <Badge status={status} />
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
        <span className={`flex items-center gap-1.5 ${overdue ? "text-bad-600 font-medium" : ""}`}>
          <CalendarDays size={14} />
          Due {formatDate(assignment.dueDate)}
          {overdue && " · overdue"}
        </span>
        {submission?.submittedAt && (
          <span>Submitted {formatDate(submission.submittedAt)}</span>
        )}
        <a
          href={assignment.driveLink}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 text-ink-700 hover:text-ink-900 hover:underline"
        >
          <ExternalLink size={14} />
          Submission folder
        </a>
      </div>

      <div className="mt-auto pt-1">
        {status === "submitted" ? (
          <button
            onClick={() => setSubmissionStatus(assignment.id, "not_submitted")}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-ink-900"
          >
            <RotateCcw size={13} />
            Undo submission
          </button>
        ) : (
          <button
            onClick={() => setConfirmOpen(true)}
            className="w-full sm:w-auto rounded-lg bg-ink-900 px-4 py-2.5 text-sm font-medium text-paper-50 hover:bg-ink-800 transition-colors"
          >
            Mark as submitted
          </button>
        )}
      </div>

      <ConfirmSubmitFlow
        open={confirmOpen}
        assignmentTitle={assignment.title}
        onCancel={() => setConfirmOpen(false)}
        onConfirmed={() => {
          setSubmissionStatus(assignment.id, "submitted");
          setConfirmOpen(false);
        }}
      />
    </div>
  );
}
