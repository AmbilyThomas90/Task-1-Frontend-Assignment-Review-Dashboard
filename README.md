# Coursework — Assignment & Review Dashboard

A responsive, role-based dashboard for managing student assignments. Students track and confirm
their own submissions through a two-step verification flow; admins (professors) create assignments
and monitor each student's status with per-assignment progress bars.

No backend — all data is simulated and persisted to `localStorage`, seeded from mock data on first run.

## Demo flow

There's no real authentication. On load you get a **role picker**: choose an admin (Dr. Meera Rao) or
one of four students. Switch users any time from the sidebar ("Switch user").

## Login Codes
Admin Login
ADMIN_CODE = "ADMIN2026"

Use this code when logging in as an administrator/professor.

Student Login
STUDENT_CODE = "STUDENT2026"
- **As a student** — see only your own assignments and completion %. Click **Mark as submitted** →
  confirm **"Yes, I have submitted"** → a final **"Confirm submission"** step. Both steps must be
  completed before the status changes; closing the dialog at any point cancels it.
- **As the admin** — see every assignment you created, each with a live progress bar
  (`submitted / total students`). Expand a card to see per-student status, or create a new
  assignment (title, description, due date, Drive link) via **New assignment**.

## Getting started

```bash
npm install
npm run dev       # starts a dev server at http://localhost:5173
```

Other scripts:

```bash
npm run build      # production build to dist/
npm run preview    # serve the production build locally
```

Requires Node 18+.

## Tech stack

- **React 19** (function components, hooks only — `useState`, `useEffect`, `useMemo`, `useCallback`)
- **Context API** (`AppContext`) for shared app state — no external state library needed at this scale
- **Tailwind CSS v4** for styling and responsive layout
- **Vite** for tooling
- **lucide-react** for icons

## Folder structure

```
src/
├── components/
│   ├── layout/          # Sidebar, Topbar, DashboardLayout — shared shell for both roles
│   ├── common/           # ProgressBar, Badge, Modal — small, reusable, role-agnostic UI
│   ├── student/           # StudentDashboard, AssignmentCard, ConfirmSubmitFlow
│   └── admin/             # AdminDashboard, AssignmentManageCard, CreateAssignmentForm, StudentProgressList
├── context/
│   └── AppContext.jsx    # current user, assignments, submissions + all mutating actions
├── data/
│   └── mockData.js       # seed users / assignments / submissions
├── hooks/
│   └── useLocalStorage.js
├── pages/
│   └── RoleSelect.jsx    # simulated "login" — pick which user to act as
├── App.jsx                # routes to RoleSelect / StudentDashboard / AdminDashboard by role
└── main.jsx
```

## Data model

Three flat collections, kept intentionally simple and relational (like normalized tables), so the
UI logic mirrors what a real API/database would return:

```js
users        = [{ id, name, role: 'student' | 'admin', initials }]
assignments  = [{ id, title, description, driveLink, dueDate, createdBy, createdAt }]
submissions  = [{ assignmentId, studentId, status: 'submitted' | 'not_submitted', submittedAt }]
```

`submissions` is the join table between students and assignments — this is what makes "each user
sees only their own data" straightforward: the student view filters by `studentId === currentUser.id`,
and the admin view filters assignments by `createdBy === currentUser.id` then joins in every
student's row for progress bars.

## Component & design decisions

- **Role separation, not role-based conditionals everywhere.** `App.jsx` renders exactly one of
  `RoleSelect`, `StudentDashboard`, or `AdminDashboard` based on `currentUser.role`. Each dashboard
  owns its own component tree, so student and admin UI never fight over the same conditional logic.
- **One shared context, not prop drilling.** `AppContext` exposes both state and the actions that
  mutate it (`createAssignment`, `setSubmissionStatus`, etc.), and every mutation is guarded by
  `currentUser.role` so a student can't accidentally call an admin-only action even if a component
  tried to.
- **`useLocalStorage` as the single persistence seam.** All three collections and the logged-in
  user id go through one small hook, so swapping this for a real API later means changing one file,
  not every component.
- **Double-verification is a dedicated component, not a `window.confirm`.** `ConfirmSubmitFlow` is a
  two-step modal (`step` state) so the "are you sure, really" language and irreversible/"notifies
  your professor" copy are distinct from a simple confirmation — this was a specific requirement, so
  it's implemented as its own reusable piece rather than folded into `AssignmentCard`.
- **Progress bars are one component (`ProgressBar`) used three ways**: a student's overall
  completion, an admin's per-assignment class progress, and the admin summary stat cards — all driven
  by a single `value`/`tone` prop, avoiding three near-duplicate implementations.
- **Mobile-first shell.** `Sidebar` is an off-canvas drawer under `lg:` breakpoint (hamburger in
  `Topbar`) and a static column above it; cards reflow via CSS grid so the assignment/board list goes
  1 → 2 → 3 columns as the viewport grows.

## Design notes

Palette and type are intentionally not the generic SaaS dashboard defaults: an ink-navy/gold pairing
(academic, closer to a university's brand than a startup's) with `Sora` for headings and `Inter` for
body text, set on a warm off-white rather than pure white or grey.

## What's simulated vs. what a real backend would add

- Auth is a plain role picker, not real login — swap `RoleSelect` + `login()` for real auth and the
  rest of the app is unaffected, since everything downstream reads from `currentUser`.
- All assignments are visible to all students (no per-class enrollment) — a real backend would add a
  `classId`/`enrollments` join, filtered the same way `submissions` already is.
- "Drive link" is stored as a plain URL string; a real system might validate/verify the link server-side.
