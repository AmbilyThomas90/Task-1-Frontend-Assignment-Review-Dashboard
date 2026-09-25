import { createContext, useContext, useMemo, useCallback } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { seedUsers, seedAssignments, seedSubmissions } from "../data/mockData";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [users] = useLocalStorage("coursework.users", seedUsers);
  const [assignments, setAssignments] = useLocalStorage("coursework.assignments", seedAssignments);
  const [submissions, setSubmissions] = useLocalStorage("coursework.submissions", seedSubmissions);
  const [currentUserId, setCurrentUserId] = useLocalStorage("coursework.currentUserId", null);

  const currentUser = useMemo(
    () => users.find((u) => u.id === currentUserId) || null,
    [users, currentUserId]
  );

  const login = useCallback((userId) => setCurrentUserId(userId), [setCurrentUserId]);
  const logout = useCallback(() => setCurrentUserId(null), [setCurrentUserId]);

  // Create a new assignment (admin only, enforced in UI + here as a guard)
  const createAssignment = useCallback(
    ({ title, description, driveLink, dueDate }) => {
      if (!currentUser || currentUser.role !== "admin") return;
      const newAssignment = {
        id: `asg-${Date.now()}`,
        title: title.trim(),
        description: description.trim(),
        driveLink: driveLink.trim(),
        dueDate,
        createdBy: currentUser.id,
        createdAt: new Date().toISOString(),
      };
      setAssignments((prev) => [newAssignment, ...prev]);

      // Create a "not_submitted" row for every current student so the
      // admin's per-student progress view is complete from the start.
      const students = users.filter((u) => u.role === "student");
      setSubmissions((prev) => [
        ...prev,
        ...students.map((s) => ({
          assignmentId: newAssignment.id,
          studentId: s.id,
          status: "not_submitted",
          submittedAt: null,
        })),
      ]);
    },
    [currentUser, setAssignments, setSubmissions, users]
  );

  const deleteAssignment = useCallback(
    (assignmentId) => {
      if (!currentUser || currentUser.role !== "admin") return;
      setAssignments((prev) => prev.filter((a) => a.id !== assignmentId));
      setSubmissions((prev) => prev.filter((s) => s.assignmentId !== assignmentId));
    },
    [currentUser, setAssignments, setSubmissions]
  );

  // Student marks (or unmarks) their own submission. This is the action
  // fired only after the double-confirmation flow completes in the UI.
  const setSubmissionStatus = useCallback(
    (assignmentId, status) => {
      if (!currentUser || currentUser.role !== "student") return;
      setSubmissions((prev) => {
        const exists = prev.some(
          (s) => s.assignmentId === assignmentId && s.studentId === currentUser.id
        );
        const stamp = status === "submitted" ? new Date().toISOString() : null;
        if (!exists) {
          return [...prev, { assignmentId, studentId: currentUser.id, status, submittedAt: stamp }];
        }
        return prev.map((s) =>
          s.assignmentId === assignmentId && s.studentId === currentUser.id
            ? { ...s, status, submittedAt: stamp }
            : s
        );
      });
    },
    [currentUser, setSubmissions]
  );

  const value = {
    users,
    assignments,
    submissions,
    currentUser,
    login,
    logout,
    createAssignment,
    deleteAssignment,
    setSubmissionStatus,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within an AppProvider");
  return ctx;
}
