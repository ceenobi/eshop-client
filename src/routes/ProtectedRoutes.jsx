import { Navigate, useLocation } from "react-router-dom";

export const ProtectedUser = ({ isAuth, children }) => {
  const { search } = useLocation();
  const from = search ? search.split("=")[1] : "/login";

  if (!isAuth) {
    return <Navigate to="/" state={{ from }} replace />;
  }
  return children;
};
