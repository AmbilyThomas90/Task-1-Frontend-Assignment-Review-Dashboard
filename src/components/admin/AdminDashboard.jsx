import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import DashboardLayout from "../layout/DashboardLayout";
import AssignmentManageCard from "./AssignmentManageCard";
import CreateAssignmentForm from "./CreateAssignmentForm";
import { useApp } from "../../context/AppContext";

export default function AdminDashboard() {
  const { currentUser, users, assignments, submissions } = useApp();
  const [formOpen, setFormOpen] = useState(false);

  const students = useMemo(() => users.filter((u) => u.role === "student"), [users]);

  const myAssignments = useMemo(
    () =>
      assignments
        .filter((a) => a.createdBy === currentUser.id)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    [assignments, currentUser.id]
  );

  const totalSubmissions = submissions.filter(
    (s) => myAssignments.some((a) => a.id === s.assignmentId) && s.status === "submitted"
  ).length;
  const totalPossible = myAssignments.length * students.length;
  const classPct = totalPossible === 0 ? 0 : Math.round((totalSubmissions / totalPossible) * 100);

  return (
    <DashboardLayout
      title="Admin overview"
      subtitle={`${myAssignments.length} assignment${myAssignments.length === 1 ? "" : "s"} · ${students.length} students`}
      actions={
        <button
          onClick={() => setFormOpen(true)}
          className="flex items-center gap-1.5 rounded-lg bg-ink-900 px-3.5 py-2 text-sm font-medium text-paper-50 hover:bg-ink-800 transition-colors"
        >
          <Plus size={16} />
          <span className="hidden sm:inline">New assignment</span>
        </button>
      }
    >
      <section className="mb-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-xl border border-ink-900/10 bg-white p-4">
          <p className="text-xs text-slate-500">Assignments</p>
          <p className="font-display text-xl font-semibold text-ink-900">{myAssignments.length}</p>
        </div>
        <div className="rounded-xl border border-ink-900/10 bg-white p-4">
          <p className="text-xs text-slate-500">Students</p>
          <p className="font-display text-xl font-semibold text-ink-900">{students.length}</p>
        </div>
        <div className="rounded-xl border border-ink-900/10 bg-white p-4">
          <p className="text-xs text-slate-500">Submitted</p>
          <p className="font-display text-xl font-semibold text-ink-900">{totalSubmissions}</p>
        </div>
        <div className="rounded-xl border border-ink-900/10 bg-white p-4">
          <p className="text-xs text-slate-500">Class completion</p>
          <p className="font-display text-xl font-semibold text-ink-900">{classPct}%</p>
        </div>
      </section>

      {myAssignments.length === 0 ? (
        <div className="rounded-xl border border-dashed border-ink-900/15 p-10 text-center text-sm text-slate-500">
          You haven't created any assignments yet.
          <button onClick={() => setFormOpen(true)} className="block mx-auto mt-3 text-ink-900 font-medium hover:underline">
            Create your first assignment
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {myAssignments.map((a, i) => (
            <AssignmentManageCard
              key={a.id}
              assignment={a}
              students={students}
              submissions={submissions}
              defaultOpen={i === 0}
            />
          ))}
        </div>
      )}

      <CreateAssignmentForm open={formOpen} onClose={() => setFormOpen(false)} />
    </DashboardLayout>
  );
}
