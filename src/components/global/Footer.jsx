import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RegisterModal from "../modals/RegisterModal";
import OurPartnersSection from "../sections/OurPartnersSection";

const itinertripLinks = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "About Us",
    link: "/about",
  },
  {
    title: "Promo",
    link: "/promo",
  },

  {
    title: "Airline Information",
    link: "/airlines",
  },
  // {
  //   title: "All Flights",
  //   link: "/all-flights",
  // },
  // {
  //   title: "Careers",
  //   link: "/careers",
  // },
];

const accountLinks = [
  {
    title: "Sign Up",
    link: "/sign-up",
  },
  {
    title: "Forgot Password",
    link: "/forgot-password",
  },
];

const supportLinks = [
  {
    title: "itinertrip Guide",
    link: "/itinertrip-guide",
  },
  {
    title: "FAQ",
    link: "/faq",
  },
  {
    title: "How to Book",
    link: "/how-to-book",
  },
  {
    title: "Help Center",
    link: "/help-center",
  },
  {
    title: "Terms Of Use",
    link: "/terms-of-use",
  },
  {
    title: "Terms & Conditions",
    link: "/terms-and-conditions",
  },
];

const Footer = () => {
  const [isSticky, setIsSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <OurPartnersSection />
      <footer id="footer_area">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
              <div className="footer_heading_area">
                <h5>Need any help?</h5>
              </div>
              <div className="footer_first_area">
                {/* <div className="footer_inquery_area">
                  <h5>Call 24/7 for any help</h5>
                  <h3>
                    <a href="tel:+00-123-456-789">+00 123 456 789</a>
                  </h3>
                </div> */}
                <div className="footer_inquery_area">
                  <h5>Mail to our support team</h5>
                  <h5>
                    <a href="mailto:support@domain.com">
                      support@itinertrip.com
                    </a>
                  </h5>
                </div>
                <div className="footer_inquery_area">
                  <h5>Follow us on</h5>
                  <ul className="soical_icon_footer">
                    <li>
                      <a href="#!">
                        <i className="fab fa-facebook" />
                      </a>
                    </li>
                    <li>
                      <a href="#!">
                        <i className="fab fa-twitter-square" />
                      </a>
                    </li>
                    <li>
                      <a href="#!">
                        <i className="fab fa-instagram" />
                      </a>
                    </li>
                    <li>
                      <a href="#!">
                        <i className="fab fa-linkedin" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-2 offset-lg-1 col-md-6 col-sm-6 col-12">
              <div className="footer_heading_area">
                <h5 className="text-capitalize">itinertrip</h5>
              </div>
              <div className="footer_link_area">
                <ul>
                  {itinertripLinks.map((item, index) => (
                    <li key={index}>
                      <Link to={item.link}>{item.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* <div className="col-lg-2 col-md-4 col-sm-6 col-12">
              <div className="footer_heading_area">
                <h5>Account</h5>
              </div>
              <div className="footer_link_area">
                <ul>
                  <li>
                    <RegisterModal />
                  </li>
                  {accountLinks.map((item, index) => (
                    <li key={index}>
                      <Link to={item.link}>{item.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div> */}
            <div className="col-lg-2 col-md-4 col-sm-6 col-12">
              <div className="footer_heading_area">
                <h5>Support</h5>
              </div>
              <div className="footer_link_area">
                <ul>
                  {supportLinks.map((item, index) => (
                    <li key={index}>
                      <Link to={item.link}>{item.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-6 col-12">
              <div className="footer_heading_area">
                <h5>Our App</h5>
              </div>
              <div className="footer_link_area">
                <ul>
                  <li>
                    <a
                      href="https://play.google.com/store/games?hl=en&gl=US&pli=1"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src="https://cdn.airpaz.com/cdn-cgi/image/w=108,h=33/forerunner-next/img/playstore.svg"
                        width={108}
                        height={40}
                        alt="Google Playstore"
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://apps.apple.com/pk/app/airpaz-cheap-flight-tickets/1066890405"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src="https://cdn.airpaz.com/cdn-cgi/image/w=108,h=33/forerunner-next/img/appstore.svg"
                        width={108}
                        height={40}
                        alt="App Store"
                      />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <div className="copyright_area">
        <div className="container">
          <div className="row align-items-center">
            <div className="co-lg-10 col-md-10 col-sm-12 col-12">
              <div className="copyright_left">
                <p>Copyright © 2023 itinertrip.com All rights reserved</p>
                <p>
                  TINERTRIP B2B TRAVEL SOLUTION INC. OCN:1000408657 Address:
                  Toronto, Ontario, Canada, M5E 1J8 ITINERTRIP B2B TRAVEL
                  SOLUTION LIMITED Reg: COY-DBFJ2P Address: P. O. Box 20024
                  Lilongwe, Malawi
                </p>
              </div>
            </div>
            <div className="co-lg-2 col-md-2 col-sm-12 col-12">
              <div className="copyright_right d-flex justify-content-center justify-content-md-end gap-3">
                <div className="icon-3">
                  <img
                    className="h-100 w-100 object-cover"
                    src="/assets/img/f-logo-1.jpg"
                    alt="img"
                  />
                </div>
                <div className="icon-3">
                  <img
                    className="h-100 w-100"
                    src="/assets/img/f-logo-2.jpg"
                    alt="img"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div onClick={scrollToTop} className={`go-top ${isSticky && "active"}`}>
        <i className="fas fa-chevron-up" />
        <i className="fas fa-chevron-up" />
      </div>
    </>
  );
};

export default Footer;
