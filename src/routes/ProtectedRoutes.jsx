import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export const ProtectedUser = ({ isAuth, children }) => {
  const location = useLocation();

  if (!isAuth) {
    return (
      <>
        <Navigate to="/login" state={{ from: location }} replace />
        {location.pathname === "/checkout" &&
          toast.info("You are unathenticated", {
            toastId: "warning",
          })}
      </>
    );
  }
  return children;
};
