import { useState } from "react";
import Modal from "../common/Modal";
import { useApp } from "../../context/AppContext";

const empty = { title: "", description: "", driveLink: "", dueDate: "" };
// CREATE ASSIGNMENT FORM
export default function CreateAssignmentForm({ open, onClose }) {
  const { createAssignment } = useApp(); 
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");
  // UPDATE FORM FIELD
  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  // SUBMIT FORM
  const submit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.dueDate || !form.driveLink.trim()) {
      setError("Title, due date and Drive link are required.");
      return;
    }
    createAssignment(form);
    setForm(empty);
    setError("");
    onClose();
  };
 // CLOSE FORM
  const handleClose = () => {
    setForm(empty);
    setError("");
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} title="New assignment" maxWidth="max-w-lg">
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1.5">Title</label>
          <input
            value={form.title}
            onChange={update("title")}
            placeholder="e.g. Algorithms — Problem Set 5"
            className="w-full rounded-lg border border-ink-900/15 bg-paper-50 px-3.5 py-2.5 text-sm text-ink-900 outline-none focus:border-ink-700 focus:ring-2 focus:ring-ink-700/15"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1.5">Description</label>
          <textarea
            value={form.description}
            onChange={update("description")}
            rows={3}
            placeholder="What should students do for this assignment?"
            className="w-full resize-none rounded-lg border border-ink-900/15 bg-paper-50 px-3.5 py-2.5 text-sm text-ink-900 outline-none focus:border-ink-700 focus:ring-2 focus:ring-ink-700/15"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">Due date</label>
            <input
              type="date"
              value={form.dueDate}
              onChange={update("dueDate")}
              className="w-full rounded-lg border border-ink-900/15 bg-paper-50 px-3.5 py-2.5 text-sm text-ink-900 outline-none focus:border-ink-700 focus:ring-2 focus:ring-ink-700/15"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1.5">Drive link</label>
            <input
              value={form.driveLink}
              onChange={update("driveLink")}
              placeholder="https://drive.google.com/..."
              className="w-full rounded-lg border border-ink-900/15 bg-paper-50 px-3.5 py-2.5 text-sm text-ink-900 outline-none focus:border-ink-700 focus:ring-2 focus:ring-ink-700/15"
            />
          </div>
        </div>

        {error && <p className="text-xs text-bad-600">{error}</p>}

        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-1">
          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg px-4 py-2.5 text-sm font-medium text-slate-500 hover:bg-ink-900/5"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-lg bg-ink-900 px-4 py-2.5 text-sm font-medium text-paper-50 hover:bg-ink-800 transition-colors"
          >
            Create assignment
          </button>
        </div>
      </form>
    </Modal>
  );
}
