import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";
import AuthComponent from "../global/AuthComponent";

const GuestModal = ({ show, onClose }) => {
  return (
    <>
      <Modal size="sm" centered show={show}>
        <Modal.Body className="p-0">
          <button
            type="button"
            onClick={onClose}
            className="position-absolute top-0 end-0 m-3 btn btn-close border-0 p-0"
          />
          <div className="p-4 text-center">
            <h5 className="fw-bold mb-3 px-3">
              Would you like to Login or continue as Guest.
            </h5>
            <div className="d-flex flex-column gap-2">
              <button className="btn btn_md btn-outline-primary flex-fill">
                {" "}
                <AuthComponent login />
              </button>

              <button
                onClick={onClose}
                className="btn btn_md btn-outline-primary flex-fill"
              >
                Continue as Guest
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default GuestModal;
