import { useMemo, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import ProgressBar from "../common/ProgressBar";
import AssignmentCard from "./AssignmentCard";
import { useApp } from "../../context/AppContext";
// FILTER OPTIONS
// all       → Show all assignments
// pending   → Show assignments not submitted yet
// submitted → Show submitted assignments
const FILTERS = [
  { id: "all", label: "All" },
  { id: "pending", label: "Pending" },
  { id: "submitted", label: "Submitted" },
];
// STUDENT DASHBOARD COMPONENT
export default function StudentDashboard() {
  const { currentUser, assignments, submissions } = useApp();
  const [filter, setFilter] = useState("all");

  const mySubmissions = useMemo(
    () => submissions.filter((s) => s.studentId === currentUser.id),
    [submissions, currentUser.id]
  );
// CREATE A MAP OF SUBMISSIONS BY ASSIGNMENT
  const submissionByAssignment = useMemo(() => {
    const map = new Map();
    mySubmissions.forEach((s) => map.set(s.assignmentId, s));
    return map;
  }, [mySubmissions]);
  // SORT ASSIGNMENTS BY DUE DATE
  const sortedAssignments = useMemo(
    () => [...assignments].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)),
    [assignments]
  );
// FILTER VISIBLE ASSIGNMENTS
  const visibleAssignments = sortedAssignments.filter((a) => {
    const status = submissionByAssignment.get(a.id)?.status || "not_submitted";
    if (filter === "pending") return status !== "submitted";   // PENDING FILTER
    if (filter === "submitted") return status === "submitted";  // SUBMITTED FILTER
    return true;
  });
 // COUNT SUBMITTED ASSIGNMENTS
  const submittedCount = assignments.filter(
    (a) => submissionByAssignment.get(a.id)?.status === "submitted"
  ).length;
  const total = assignments.length;
  const pct = total === 0 ? 0 : Math.round((submittedCount / total) * 100);

  return (
    <DashboardLayout title="My assignments" subtitle={`Welcome back, ${currentUser.name.split(" ")[0]}`}>
      <section className="mb-6 rounded-xl border border-ink-900/10 bg-white p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-sm text-slate-500">Overall completion</p>
            <p className="font-display text-2xl font-semibold text-ink-900">
              {submittedCount} <span className="text-slate-500 font-normal text-lg">/ {total} submitted</span>
            </p>
          </div>
          <div className="w-full sm:w-64">
            <ProgressBar value={pct} tone="good" />
          </div>
        </div>
      </section>

      <div className="mb-4 flex items-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
              filter === f.id
                ? "bg-ink-900 text-paper-50"
                : "bg-ink-900/5 text-slate-500 hover:bg-ink-900/10"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {visibleAssignments.length === 0 ? (
        <div className="rounded-xl border border-dashed border-ink-900/15 p-10 text-center text-sm text-slate-500">
          Nothing here yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {visibleAssignments.map((a) => (
            <AssignmentCard key={a.id} assignment={a} submission={submissionByAssignment.get(a.id)} />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
