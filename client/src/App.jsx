import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import WorkspacePage from "./pages/workspace/WorkspacePage";
import ProjectPage from "./pages/projects/ProjectPage";

import { useAuth } from "./context/AuthContext";

function App() {
  const { token } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={!token ? <Login /> : <Navigate to="/" replace />}
      />
    
      <Route
        path="/register"
        element={!token ? <Register /> : <Navigate to="/" replace />}
      />

      <Route
        path="/"
        element={token ? <Dashboard /> : <Navigate to="/login" replace />}
      />

      <Route
        path="/dashboard"
        element={<Navigate to="/" replace />}
      />

      <Route
        path="/workspace/:workspaceId"
        element={token ? <WorkspacePage /> : <Navigate to="/login" replace />}
      />

      <Route
        path="/project/:projectId"
        element={token ? <ProjectPage /> : <Navigate to="/login" replace />}
      />
    </Routes>
  );
}

export default App;