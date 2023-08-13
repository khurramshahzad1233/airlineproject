import React from "react";
import { Link } from "react-router-dom";

const CommonBannerSection = ({ title, pageName, link, linkName }) => {
  return (
    <section id="common_banner">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="common_bannner_text">
              <h2>{title}</h2>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                {link && (
                  <li>
                    <span className="mx-1 px-0">
                      <i className="fas fa-circle" />
                    </span>
                    <Link to={link}>{linkName}</Link>
                  </li>
                )}
                <li>
                  <span className="mx-1 px-0">
                    <i className="fas fa-circle" />
                  </span>
                  {pageName}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommonBannerSection;
