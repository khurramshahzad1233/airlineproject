import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const LoginModal = ({ show, onClose, onClickLink }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((res) => {
        toast.success("Login Successfull!");
        onClose();
      })
      .catch((err) => {
        toast.error(err.message);
      });
    // dispatch(login(data));
  };

  return (
    <>
      <Modal centered show={show} onHide={onClose}>
        <Modal.Body className="p-0">
          <button
            type="button"
            onClick={onClose}
            className="position-absolute top-0 end-0 m-3 btn btn-close border-0 p-0"
          />
          <div className="common_author_boxed rounded-3">
            <div className="common_author_heading">
              <div className="logo-3 mx-auto mb-2">
                <img
                  className="d-block h-100 w-100"
                  src="assets/img/logo.svg"
                  alt="logo"
                />
              </div>
              <h3>Login your account</h3>
              <h2>Logged in to stay in touch</h2>
            </div>
            <div className="common_author_form mt-3 p-3">
              <form onSubmit={handleSubmit(onSubmit)} id="main_author_form">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Email"
                    required
                    {...register("email", { required: true })}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    required
                    {...register("password", { required: true })}
                  />
                  {/* <Link to >Forgot password?</Link> */}
                </div>
                <div className="common_form_submit">
                  <button type="submit" className="btn btn_theme btn_md">
                    Log in
                  </button>
                </div>
                <h4 className="text-center text-black-50 fw-normal my-2">or</h4>
                <button
                  type="button"
                  className="btn btn-outline-primary btn_md d-flex align-items-center mx-auto"
                >
                  <span className="me-2">
                    <i className="fab fa-google-plus"></i>
                  </span>
                  <span>Log in with Google</span>
                </button>
                <div className="have_acount_area">
                  <p>
                    Dont have an account?{" "}
                    <Link to onClick={onClickLink}>
                      Register now
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LoginModal;
