import React from "react";
import { Dropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import firebase from "../../config/fbConfig";

const UserDropdown = () => {
  return (
    <Dropdown>
      <Dropdown.Toggle
        className="p-0 border-0 text-white d-flex align-items-center"
        variant="..."
      >
        <div
          className="rounded-circle bg-primary shadow-sm mx-auto d-flex justify-content-center align-items-center"
          style={{ height: 36, width: 36 }}
        >
          <div className="fs-5 fw-bold text-uppercase">S</div>
        </div>
      </Dropdown.Toggle>

      <Dropdown.Menu variant="light">
        <Dropdown.Item as={NavLink} to="/my-bookings">
          My bookings
        </Dropdown.Item>
        <Dropdown.Item as={NavLink} to="/my-profile">
          My profile
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={() => firebase.logout()}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UserDropdown;
