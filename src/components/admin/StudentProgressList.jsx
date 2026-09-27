import Badge from "../common/Badge";  // Badge component is used to display the student's submission status

function formatDate(iso) {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString(undefined, { day: "numeric", month: "short" });
}
// STUDENT PROGRESS LIST
export default function StudentProgressList({ students, submissionByStudent }) {
  return (
    <ul className="divide-y divide-ink-900/8">
      {students.map((student) => {
        const sub = submissionByStudent.get(student.id);
        const status = sub?.status || "not_submitted";
        return (
          <li key={student.id} className="flex items-center justify-between gap-3 py-2.5">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ink-900/8 text-xs font-semibold text-ink-900">
                {student.initials}
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm text-ink-900">{student.name}</p>
                {sub?.submittedAt && (
                  <p className="text-xs text-slate-500">Submitted {formatDate(sub.submittedAt)}</p>
                )}
              </div>
            </div>
            <Badge status={status} />
          </li>
        );
      })}
    </ul>
  );
}
