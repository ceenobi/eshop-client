import { Navigate, useLocation } from "react-router-dom";

export const ProtectedUser = ({ isAuth, children }) => {
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export const PublicRoutes = ({ isAuth, children }) => {
  if (isAuth) {
    return <Navigate to="/" replace />;
  }
  return children;
};