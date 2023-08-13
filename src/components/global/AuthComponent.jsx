import React, { useState } from "react";
import LoginModal from "../modals/LoginModal";
import RegisterModal from "../modals/RegisterModal";
import { Link } from "react-router-dom";

const AuthComponent = ({ login, register }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleLoginClose = () => setShowLogin(false);
  const handleLoginShow = () => setShowLogin(true);

  const handleRegisterClose = () => setShowRegister(false);
  const handleRegisterShow = () => setShowRegister(true);

  const goToRegister = () => {
    handleLoginClose();
    handleRegisterShow();
  };

  const goToLogin = () => {
    handleRegisterClose();
    handleLoginShow();
  };

  return (
    <>
      {login && (
        <Link to onClick={handleLoginShow}>
          Login
        </Link>
      )}
      {register && (
        <Link to onClick={handleRegisterShow}>
          Sign up
        </Link>
      )}

      <LoginModal
        show={showLogin}
        onClick={handleLoginShow}
        onClose={handleLoginClose}
        onClickLink={goToRegister}
      />

      <RegisterModal
        show={showRegister}
        onClick={handleRegisterShow}
        onClose={handleRegisterClose}
        onClickLink={goToLogin}
      />
    </>
  );
};

export default AuthComponent;
