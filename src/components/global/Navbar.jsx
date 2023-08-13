import React, { useEffect, useState } from "react";
import SearchModal from "../modals/SearchModal";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Offcanvas } from "react-bootstrap";
import SelectFlag from "../inputs/SelectFlag";
import SelectCurrency from "../inputs/SelectCurrency";
import LoginModal from "../modals/LoginModal";
import RegisterModal from "../modals/RegisterModal";
import UserDropdown from "../inputs/UserDropdown";
import { useSelector } from "react-redux";
import AuthComponent from "./AuthComponent";

const navItems = [
  {
    to: "/",
    text: "Home",
  },
  {
    to: "/flight",
    text: "Flight",
  },
  {
    to: "/hotel",
    text: "Hotel",
  },
  {
    to: "/promo",
    text: "Promo",
  },
  {
    to: "/orders",
    text: "Orders",
  },

  // {
  //   to: "/about",
  //   text: "About us",
  // },
  // {
  //   to: "/faq",
  //   text: "Faqs",
  // },
  // {
  //   to: "/airlines",
  //   text: "Airlines",
  // },
  // Add more items here if needed
];

const Navbar = () => {
  const location = useLocation();
  const [showSearch, setShowSearch] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const auth = useSelector((state) => state.firebase.auth);
  const profile = useSelector((state) => state.firebase.profile);

  const navbarDark =
    location.pathname === "/flight-search" ||
    location.pathname === "/terms-of-use" ||
    location.pathname === "/terms-and-conditions" ||
    location.pathname === "/faq";

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Header Area */}
      <header
        className={`main_header_arae position-sticky ${
          navbarDark && "position-relative"
        }`}
      >
        {/* Navbar Bar */}
        <div
          className={`navbar-area sticky-top bg-white ${
            isSticky && "is-sticky"
          }`}
        >
          <div className="main-responsive-nav">
            <div className="container">
              <div className="main-responsive-menu d-flex align-items-center justify-content-between">
                <div className="logo">
                  <Link to="/">
                    <img src="assets/img/logo.svg" alt="logo" />
                  </Link>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setShowSearch(!showSearch)}
                    className="btn p-0 search-box"
                  >
                    <i className="fas fa-search fs-2" />
                  </button>
                  <button
                    onClick={() => setShowSidebar(!showSidebar)}
                    type="button"
                    className="btn p-0"
                  >
                    <i className="fas fa-bars fs-1"></i>
                  </button>
                  {/* <UserDropdown /> */}

                  {auth?.uid && <UserDropdown />}
                </div>
              </div>
            </div>
          </div>
          <div className={`main-navbar`}>
            <div className="container">
              <nav className="navbar navbar-expand-md navbar-light">
                <Link className="navbar-brand logo-2" to="/">
                  <img src="assets/img/logo.svg" alt="logo" />
                </Link>
                <div
                  className="collapse navbar-collapse mean-menu"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav">
                    {navItems.map((item, index) => (
                      <li key={`link-${index}`} className="nav-item">
                        <NavLink to={item.to} className="nav-link">
                          {item.text}
                        </NavLink>
                      </li>
                    ))}
                  </ul>

                  <ul className="topbar-others-options ms-auto">
                    {auth?.uid ? null : (
                      <>
                        <li>
                          <AuthComponent login />
                        </li>
                        <li>
                          <AuthComponent register />
                        </li>
                      </>
                    )}

                    <li>
                      <SelectFlag />
                    </li>
                    <li>
                      <SelectCurrency />
                    </li>
                  </ul>
                  <div className="others-options d-flex align-items-center">
                    <div className="option-item">
                      <button
                        type="button"
                        onClick={() => setShowSearch(!showSearch)}
                        className="btn p-0 search-box"
                      >
                        <i className="fas fa-search" />
                      </button>
                    </div>
                    <div className="option-item d-flex align-items-center gap-4">
                      {auth?.uid && <UserDropdown />}
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
      {/* search */}
      <SearchModal show={showSearch} onClose={() => setShowSearch(false)} />

      {/* sidebar for mobile */}
      <Offcanvas show={showSidebar} onHide={() => setShowSidebar(false)}>
        <Offcanvas.Header closeButton>
          <Link className="navbar-brand logo-2" to="/">
            <img src="assets/img/logo.svg" alt="logo" />
          </Link>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className="nav flex-column flex-nowrap gap-3">
            {navItems.map((item, index) => (
              <li key={`link-${index}`}>
                <NavLink to={item.to}>{item.text}</NavLink>
              </li>
            ))}
            {auth.uid ? null : (
              <>
                <li>
                  <AuthComponent login />
                </li>
                <li>
                  <AuthComponent register />
                </li>
              </>
            )}

            <li>
              <div className="d-flex align-items-center gap-3">
                <SelectFlag />
                <div className="bg-primary py-1 px-2 rounded-3">
                  <SelectCurrency />
                </div>
              </div>
            </li>
            <li></li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Navbar;
