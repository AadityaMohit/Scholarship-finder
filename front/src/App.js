import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/Authcontext";
import Scholarships from "./pages/Scholarship";
// import Application from "../../backnd/models/Application";
import Applications from "./pages/Application";
import Register from "./pages/Register";
import Navbar from "./pages/Navbar";

function App() {
  return (
    <Router>
        <AuthProvider>
      <Navbar/>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/scholarships" element={<Scholarships />} />
          <Route path="/applications" element={<Applications />} />

          <Route
            path="/dashboard"
            element={<ProtectedRoute allowedRoles={["student", "agent", "admin"]}><Dashboard /></ProtectedRoute>}
          />
        </Routes>
    </AuthProvider>
      </Router>
  );
}

export default App;
