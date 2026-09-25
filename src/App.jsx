import { AppProvider, useApp } from "./context/AppContext";
import RoleSelect from "./pages/RoleSelect";
import StudentDashboard from "./components/student/StudentDashboard";
import AdminDashboard from "./components/admin/AdminDashboard";

function Root() {
  const { currentUser } = useApp();

  if (!currentUser) return <RoleSelect />;
  return currentUser.role === "admin" ? <AdminDashboard /> : <StudentDashboard />;
}

export default function App() {
  return (
    <AppProvider>
      <Root />
    </AppProvider>
  );
}
