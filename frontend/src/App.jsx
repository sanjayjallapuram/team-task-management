import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";

import Navbar from "./components/Navbar";

import ProtectedRoute from "./routes/ProtectedRoute";

// APP CONTENT
function AppContent() {

  const location = useLocation();

  // HIDE NAVBAR
  const hideNavbar =
    location.pathname === "/login"
    ||
    location.pathname === "/signup"
    ||
    location.pathname === "/";

  return (

    <div>

      {/* GLOBAL NAVBAR */}
      {!hideNavbar && <Navbar />}

      <Routes>

        <Route path="/" element={<Signup />} />

        {/* PUBLIC ROUTES */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* PROTECTED ROUTES */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects"
          element={
            <ProtectedRoute>
              <Projects />
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects/:id"
          element={
            <ProtectedRoute>
              <ProjectDetails />
            </ProtectedRoute>
          }
        />

      </Routes>

    </div>
  );
}

// MAIN APP
function App() {

  return (

    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;