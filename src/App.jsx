import { AppProvider, useApp } from "./context/AppContext";
import RoleSelect from "./pages/RoleSelect";
import StudentDashboard from "./components/student/StudentDashboard";
import AdminDashboard from "./components/admin/AdminDashboard";

function Root() {
  const { currentUser } = useApp();   // Get the currently logged-in user from AppContext

  if (!currentUser) return <RoleSelect />;   // If no user is logged in, show the Role Selection/Login page
  // If the logged-in user is an admin, show the Admin Dashboard
  // Otherwise, show the Student Dashboard
  return currentUser.role === "admin" ? <AdminDashboard /> : <StudentDashboard />;
}

export default function App() {
  return (
    <AppProvider>
      <Root />
    </AppProvider>
  );
}
