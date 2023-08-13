import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";

const DashboardSidebar = () => {
  const user = useSelector((state) => state.firebase.profile);
  return (
    <>
      <div className="dashboard_sidebar">
        <div className="dashboard_sidebar_user">
          <div className="avatar bg-white shadow-sm mx-auto d-flex justify-content-center align-items-center">
            <div className="display-3 fw-bold text-uppercase">
              {user?.firstName?.charAt(0)}
            </div>
          </div>
          <h3>
            {user?.firstName} {user?.lastName}
          </h3>
          <p>
            <a href="tel:+00-123-456-789">{user?.phoneNumber}</a>
          </p>
          <p>
            <a href="mailto:sherlyn@domain.com">{user?.email}</a>
          </p>
        </div>
        <div className="dashboard_menu_area">
          <ul>
            <li>
              <NavLink to="/my-bookings">
                <i className="fas fa-address-card" />
                My bookings
              </NavLink>
            </li>

            <li>
              <NavLink to="/my-profile">
                <i className="fas fa-user-circle" />
                My profile
              </NavLink>
            </li>
            <li>
              <Link to data-bs-toggle="modal" data-bs-target="#logoutModal">
                <i className="fas fa-sign-out-alt" />
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Logout Modal */}
      <div
        className="modal fade"
        id="logoutModal"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body logout_modal_content">
              <div className="btn_modal_closed">
                <button
                  type="button"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="fas fa-times" />
                </button>
              </div>
              <h3>
                Are you sure? <br />
                you want to log out.
              </h3>
              <div className="logout_approve_button">
                <button
                  data-bs-dismiss="modal"
                  className="btn btn_theme btn_md"
                >
                  Yes Confirm
                </button>
                <button
                  data-bs-dismiss="modal"
                  className="btn btn_border btn_md"
                >
                  No Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardSidebar;
