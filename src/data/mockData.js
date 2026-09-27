// Simulated backend data. In a real app this would come from an API;
// For this mock, we have a few users, assignments, and submissions.

export const seedUsers = [
  { id: "admin-1", name: "Dr. Meera Rao", role: "admin", initials: "MR" },
  { id: "stu-1", name: "Aarav Nair", role: "student", initials: "AN" },
  { id: "stu-2", name: "Diya Menon", role: "student", initials: "DM" },
  { id: "stu-3", name: "Kabir Singh", role: "student", initials: "KS" },
  { id: "stu-4", name: "Zara Fernandes", role: "student", initials: "ZF" },
];

export const seedAssignments = [
  {
    id: "asg-1",
    title: "Data Structures — Problem Set 4",
    description:
      "Implement a balanced binary search tree and analyze time complexity for insert, delete and search operations.",
    driveLink:
      "https://docs.google.com/document/d/1Tg5eXkUmlcRVxpZNd6J4EEVGiQ3-LZ57n2JX31sCilg/edit?usp=sharing",
    createdBy: "admin-1",
    dueDate: "2026-10-02",
    createdAt: "2026-09-18T09:00:00.000Z",
  },
  {
    id: "asg-2",
    title: "Operating Systems — Scheduling Report",
    description:
      "Compare round-robin and priority scheduling under simulated workloads and submit a 3-page report.",
    driveLink: "https://drive.google.com/drive/folders/1XdMA2l8BUoaOysRUoV5jIFFoqn-QHsGM?usp=sharing",
    createdBy: "admin-1",
    dueDate: "2026-10-06",
    createdAt: "2026-09-20T09:00:00.000Z",
  },
  {
    id: "asg-3",
    title: "Database Systems — Normalization Exercise",
    description:
      "Normalize the provided e-commerce schema to 3NF and justify each decomposition step.",
    driveLink: "https://drive.google.com/drive/folders/1mT3dWXALUQyyHwfsmzTrxwQ6Gd7hdXb6?usp=sharing",
    createdBy: "admin-1",
    dueDate: "2026-09-29",
    createdAt: "2026-09-15T09:00:00.000Z",
  },
];

// submissions: one row per (assignment, student) pair
export const seedSubmissions = [
  { assignmentId: "asg-1", studentId: "stu-1", status: "submitted", submittedAt: "2026-09-24T14:20:00.000Z" },
  { assignmentId: "asg-1", studentId: "stu-2", status: "not_submitted", submittedAt: null },
  { assignmentId: "asg-1", studentId: "stu-3", status: "submitted", submittedAt: "2026-09-25T08:05:00.000Z" },
  { assignmentId: "asg-1", studentId: "stu-4", status: "not_submitted", submittedAt: null },

  { assignmentId: "asg-2", studentId: "stu-1", status: "not_submitted", submittedAt: null },
  { assignmentId: "asg-2", studentId: "stu-2", status: "not_submitted", submittedAt: null },
  { assignmentId: "asg-2", studentId: "stu-3", status: "not_submitted", submittedAt: null },
  { assignmentId: "asg-2", studentId: "stu-4", status: "submitted", submittedAt: "2026-09-23T11:00:00.000Z" },

  { assignmentId: "asg-3", studentId: "stu-1", status: "submitted", submittedAt: "2026-09-20T10:00:00.000Z" },
  { assignmentId: "asg-3", studentId: "stu-2", status: "submitted", submittedAt: "2026-09-21T16:45:00.000Z" },
  { assignmentId: "asg-3", studentId: "stu-3", status: "not_submitted", submittedAt: null },
  { assignmentId: "asg-3", studentId: "stu-4", status: "submitted", submittedAt: "2026-09-22T09:30:00.000Z" },
];
