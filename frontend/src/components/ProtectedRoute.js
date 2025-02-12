import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/Authcontext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user || !allowedRoles.includes(user.role)) {
      return <Navigate to="/login" />;
    }
  }, [user, allowedRoles]);

  return user ? children : null;
};

export default ProtectedRoute;
