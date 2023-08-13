import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebase from "../../config/fbConfig";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const RegisterModal = ({ show, onClose, onClickLink }) => {
  const [loading, setLoading] = useState(false);
  // const [data, setData] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // const onSubmit = (data) => {
  //   setData(data);

  // };

  const createUser = (data) => {
    setLoading(true);
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const userid = userCredential.user.uid;

        firebase
          .firestore()
          .collection("users")
          .doc(userid)
          .set({
            userId: userid,
            firstName: data.firstName,
            lastName: data.lastName,
            phoneNumber: data.contactNo,
            email: userCredential.user.email,
            username: data.username,
          })
          .then((res) => {
            //checkout goes here

            toast.success("Account Created Successfully!");
            onClose();
          })
          .catch((err) => {
            // toast.error(err.message);
            setLoading(false);
            toast.error(err.message);
            onClose();
          });

        // navigate("/home");
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <>
      <Modal className="p-0" size="lg" centered show={show} onHide={onClose}>
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
              <h3>Register account</h3>
              <h2>Register your account</h2>
            </div>
            <div className="common_author_form mt-3 p-3">
              <form onSubmit={handleSubmit(createUser)} id="main_author_form">
                <div className="row row-cols-1 row-cols-lg-2">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter first name*"
                      // required
                      {...register("firstName", { required: true })}
                    />
                    {errors.firstName && (
                      <span style={{ color: "red" }}>
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter last name*"
                      {...register("lastName", { required: true })}
                    />
                    {errors.lastName && (
                      <span style={{ color: "red" }}>
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email address*"
                      {...register("email", { required: true })}
                    />
                    {errors.email && (
                      <span style={{ color: "red" }}>
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="tel"
                      className="form-control"
                      placeholder="Mobile number*"
                      {...register("contactNo", { required: true })}
                    />
                    {errors.contactNo && (
                      <span style={{ color: "red" }}>
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="User name*"
                      {...register("username", { required: true })}
                    />
                    {errors.username && (
                      <span style={{ color: "red" }}>
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password*"
                      {...register("password", { required: true })}
                    />
                    {errors.password && (
                      <span style={{ color: "red" }}>
                        This field is required
                      </span>
                    )}
                  </div>
                </div>
                <div className="common_form_submit">
                  <button className="btn btn_theme btn_md" type="submit">
                    Register
                  </button>
                  <h4 className="text-center text-black-50 fw-normal my-2">
                    or
                  </h4>
                  <button
                    type="button"
                    className="btn btn-outline-primary btn_md d-flex align-items-center mx-auto"
                  >
                    <span className="me-2">
                      <i className="fab fa-google-plus"></i>
                    </span>
                    <span>Register with Google</span>
                  </button>
                  <div className="have_acount_area">
                    <p>
                      Already have an account?{" "}
                      <Link to onClick={onClickLink}>
                        Log in now
                      </Link>
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RegisterModal;
