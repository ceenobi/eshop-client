import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export const ProtectedUser = ({ isAuth, children }) => {
  const { search, pathname } = useLocation();
  const from = search ? search.split("=")[1] : "/login";

  if (!isAuth) {
    return (
      <>
        <Navigate
          to={pathname === "/checkout" ? "/login" : "/"}
          state={{ from }}
          replace
        />
        {pathname === "/checkout" &&
          toast.info("You are unathenticated", {
            toastId: "warning",
          })}
      </>
    );
  }
  return children;
};
