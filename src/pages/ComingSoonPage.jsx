import React from "react";
import { Link } from "react-router-dom";

const ComingSoonPage = () => {
  return (
    <section
      id="common_banner"
      className="min-vh-100 d-flex justify-content-center align-items-center"
      style={{ backgroundImage: `url(/assets/img/coming-soon.jpg)` }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="common_bannner_text">
              <div className="h-50 w-50 mx-auto mb-3">
                <img
                  className="d-block h-100 w-100"
                  src="assets/img/logo.svg"
                  alt="logo"
                />
              </div>
              <h1 className="mb-3 display-2 text-white fw-bold text-uppercase">
                COMING SOON !!
              </h1>
              <Link to="/" className="btn btn_theme btn_md">
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComingSoonPage;
