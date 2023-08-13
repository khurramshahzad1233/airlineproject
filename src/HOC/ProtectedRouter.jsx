import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";

import { useEffect } from "react";

const ProtectedRoutes = ({ children }) => {
  const auth = useSelector((state) => state.firebase.auth);

  const dispatch = useDispatch();

  const history = useNavigate();

  const Redirect = () => {
    history("/");
  };

  useEffect(() => {
    if (!auth?.uid && auth.isLoaded === true) {
      Redirect();
    }
  }, [auth]);

  return (
    <>
      {auth?.uid && auth?.isLoaded === true ? (
        <>
          <div className="overflow-y-auto h-100vh">
            <Outlet />
          </div>
        </>
      ) : (
        <>{Redirect()}</>
      )}
    </>
  );
};
export default ProtectedRoutes;
