import { useMemo, useState } from "react";
import { CalendarDays, ChevronDown, ExternalLink, Trash2 } from "lucide-react";
import ProgressBar from "../common/ProgressBar";// Progress bar component used to show submission progress.
import StudentProgressList from "./StudentProgressList";
import { useApp } from "../../context/AppContext";
// FORMAT DATE
function formatDate(iso) {
  return new Date(iso).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
}
// ASSIGNMENT MANAGE CARD
export default function AssignmentManageCard({ assignment, students, submissions, defaultOpen = false }) {
  const { deleteAssignment } = useApp();
  const [open, setOpen] = useState(defaultOpen);

  const submissionByStudent = useMemo(() => {
    const map = new Map();
    submissions
      .filter((s) => s.assignmentId === assignment.id)
      .forEach((s) => map.set(s.studentId, s));
    return map;
  }, [submissions, assignment.id]);
  // COUNT SUBMITTED STUDENTS
  const submittedCount = students.filter( 
    (s) => submissionByStudent.get(s.id)?.status === "submitted"
  ).length;
   // CALCULATE SUBMISSION PERCENTAGE
  const pct = students.length === 0 ? 0 : Math.round((submittedCount / students.length) * 100);

  return (
    <div className="rounded-xl border border-ink-900/10 bg-white overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 p-5 text-left"
      >
        <div className="min-w-0 flex-1">
          <h3 className="font-display font-semibold text-ink-900">{assignment.title}</h3>
          <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <CalendarDays size={13} />
              Due {formatDate(assignment.dueDate)}
            </span>
            <a
              href={assignment.driveLink}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 text-ink-700 hover:underline"
            >
              <ExternalLink size={13} />
              Drive folder
            </a>
          </div>
        </div>

        <div className="flex items-center gap-4 sm:w-56 shrink-0">
          <div className="flex-1">
            <ProgressBar value={pct} label={`${submittedCount}/${students.length} submitted`} size="sm" />
          </div>
          <ChevronDown
            size={18}
            className={`shrink-0 text-slate-500 transition-transform ${open ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      {open && (
        <div className="border-t border-ink-900/8 px-5 pb-5">
          <p className="pt-4 text-sm text-slate-500">{assignment.description}</p>
          <div className="mt-3">
            <StudentProgressList students={students} submissionByStudent={submissionByStudent} />
          </div>
          <button
            onClick={() => {
              if (confirm(`Delete "${assignment.title}"? This cannot be undone.`)) {
                deleteAssignment(assignment.id);
              }
            }}
            className="mt-3 flex items-center gap-1.5 text-xs font-medium text-bad-600 hover:underline"
          >
            <Trash2 size={13} />
            Delete assignment
          </button>
        </div>
      )}
    </div>
  );
}
