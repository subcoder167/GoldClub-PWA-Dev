import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();
  const auth = {
    // roles: localStorage.getItem("roles"),
    // token: localStorage.getItem("sm-token"),
    roles: "customer",
    token:
      localStorage.getItem(`vjw-${window.location.hostname}user`) &&
      JSON.parse(localStorage.getItem(`vjw-${window.location.hostname}user`))
        .token,
  };

  if (auth && auth.token && auth.roles === allowedRoles) {
    return <Outlet />;
  } else if (auth && auth.token) {
    return <Navigate to='/unauthorized' state={{ from: location }} replace />;
  } else {
    sessionStorage.setItem("beforeLogin", location.pathname);
    console.log("beforeLogin", location.pathname);
    return (
      <Navigate
        to={"/login?redirectTo=" + location?.pathname}
        state={{ from: location }}
        replace={false}
      />
    );
  }
};

export default RequireAuth;
